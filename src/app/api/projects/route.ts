import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import type { ProjectType } from '@/type/index';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'constant', 'projects.json');

/**
 * Helper to read fallback local projects.json
 */
async function getLocalProjects(): Promise<ProjectType[]> {
    const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileData);
}

/**
 * Helper to save local projects.json
 */
async function saveLocalProjects(projects: ProjectType[]): Promise<void> {
    const jsonContent = JSON.stringify(projects, null, 2);
    await fs.writeFile(DATA_FILE_PATH, jsonContent, 'utf-8');
}

/**
 * GET /api/projects
 * Fetches projects from MongoDB (or fallback to local projects.json)
 */
export async function GET() {
    try {
        const db = await connectDB();

        if (db) {
            // MongoDB connected: check if DB has records
            let dbProjects = await Project.find({}).sort({ order: 1, createdAt: 1 }).lean();

            // Auto-seed MongoDB from projects.json if DB collection is empty
            if (!dbProjects || dbProjects.length === 0) {
                const localProjects = await getLocalProjects();
                if (localProjects && localProjects.length > 0) {
                    const seedData = localProjects.map((p, index) => ({ ...p, order: index }));
                    await Project.insertMany(seedData);
                    dbProjects = await Project.find({}).sort({ order: 1, createdAt: 1 }).lean();
                }
            }

            // Map MongoDB documents to clean ProjectType objects
            const projects: ProjectType[] = dbProjects.map((doc) => ({
                imgSrc: doc.imgSrc,
                title: doc.title,
                tags: doc.tags || [],
                projectLink: doc.projectLink,
                description: doc.description || '',
                features: doc.features || [],
            }));

            return NextResponse.json(
                { success: true, projects, source: 'mongodb' },
                {
                    status: 200,
                    headers: {
                        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    },
                }
            );
        }

        // Fallback to local JSON file if MONGODB_URI is not set or DB fails
        const projects = await getLocalProjects();
        return NextResponse.json(
            { success: true, projects, source: 'local_json' },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                },
            }
        );
    } catch (error: unknown) {
        console.error('Error in GET /api/projects:', error);
        try {
            const projects = await getLocalProjects();
            return NextResponse.json({ success: true, projects, source: 'local_json_fallback' });
        } catch {
            return NextResponse.json(
                { success: false, message: 'Failed to read projects data.' },
                { status: 500 }
            );
        }
    }
}

/**
 * POST /api/projects
 * Saves updated projects to MongoDB (and syncs local projects.json backup)
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        let updatedProjects: ProjectType[];

        if (Array.isArray(body)) {
            updatedProjects = body;
        } else if (body && typeof body === 'object' && body.title) {
            const current = await getLocalProjects();
            if (typeof body.index === 'number' && body.index >= 0 && body.index < current.length) {
                const { index, ...projectData } = body;
                current[index] = projectData as ProjectType;
                updatedProjects = current;
            } else {
                const { index, ...projectData } = body;
                current.push(projectData as ProjectType);
                updatedProjects = current;
            }
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid payload. Expected an array of projects or a project object.' },
                { status: 400 }
            );
        }

        // 1. Sync to local projects.json backup
        await saveLocalProjects(updatedProjects);

        // 2. Sync to MongoDB if connected
        const db = await connectDB();
        if (db) {
            await Project.deleteMany({});
            const docsToInsert = updatedProjects.map((p, idx) => ({
                imgSrc: p.imgSrc,
                title: p.title,
                tags: p.tags || [],
                projectLink: p.projectLink,
                description: p.description || '',
                features: p.features || [],
                order: idx,
            }));
            await Project.insertMany(docsToInsert);
        }

        // Revalidate Next.js cache
        revalidatePath('/');

        return NextResponse.json(
            {
                success: true,
                message: db ? 'Projects saved to MongoDB successfully!' : 'Projects saved to local file successfully!',
                projects: updatedProjects,
                source: db ? 'mongodb' : 'local_json',
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Error in POST /api/projects:', error);
        const message = error instanceof Error ? error.message : 'Failed to update projects.';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}

/**
 * DELETE /api/projects?title=...
 * Deletes a project from MongoDB by title (and syncs local JSON backup)
 */
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title');

        if (!title) {
            return NextResponse.json(
                { success: false, message: 'Project title is required for deletion.' },
                { status: 400 }
            );
        }

        // 1. Delete from MongoDB if connected
        const db = await connectDB();
        if (db) {
            await Project.deleteOne({ title });
        }

        // 2. Delete from local JSON backup
        const currentProjects = await getLocalProjects();
        const updatedProjects = currentProjects.filter((p) => p.title !== title);
        await saveLocalProjects(updatedProjects);

        // Revalidate landing page cache
        revalidatePath('/');

        return NextResponse.json({
            success: true,
            message: `Project "${title}" deleted successfully from MongoDB!`,
            projects: updatedProjects,
        });

    } catch (error: unknown) {
        console.error('Error in DELETE /api/projects:', error);
        const message = error instanceof Error ? error.message : 'Failed to delete project.';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
