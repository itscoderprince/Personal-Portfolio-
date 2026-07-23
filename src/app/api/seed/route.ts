import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { connectDB } from '@/lib/db';
import Project from '@/models/Project';
import type { ProjectType } from '@/type/index';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'constant', 'projects.json');

/**
 * GET /api/seed
 * One-time migration: Seeds projects from projects.json into MongoDB.
 * Clears existing MongoDB records and re-inserts all from JSON file.
 */
export async function GET() {
    try {
        // 1. Connect to MongoDB
        const db = await connectDB();

        if (!db) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'MongoDB connection failed. Make sure MONGODB_URI is set in your .env file.',
                },
                { status: 500 }
            );
        }

        // 2. Read local projects.json
        const fileData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const localProjects: ProjectType[] = JSON.parse(fileData);

        if (!localProjects || localProjects.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No projects found in projects.json to seed.' },
                { status: 400 }
            );
        }

        // 3. Clear existing MongoDB records and re-insert all
        await Project.deleteMany({});

        const docsToInsert = localProjects.map((p, index) => ({
            imgSrc: p.imgSrc,
            title: p.title,
            tags: p.tags || [],
            projectLink: p.projectLink,
            description: p.description || '',
            features: p.features || [],
            order: index,
        }));

        await Project.insertMany(docsToInsert);

        return NextResponse.json(
            {
                success: true,
                message: `✅ Successfully seeded ${localProjects.length} projects from projects.json into MongoDB!`,
                seeded: localProjects.map((p) => p.title),
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Seed error:', error);
        const message = error instanceof Error ? error.message : 'Failed to seed projects.';
        return NextResponse.json({ success: false, message }, { status: 500 });
    }
}
