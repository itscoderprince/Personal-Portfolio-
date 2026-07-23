'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { ProjectType } from '@/type/index';

// Path to the JSON data file
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'constant', 'projects.json');

/**
 * Save projects array to local projects.json file
 */
export async function saveProjectsAction(projects: ProjectType[]) {
    try {
        const jsonContent = JSON.stringify(projects, null, 2);
        await fs.writeFile(DATA_FILE_PATH, jsonContent, 'utf-8');
        
        // Revalidate the main landing page to show updated projects
        revalidatePath('/');
        return { success: true, message: 'Projects saved successfully!' };
    } catch (error: unknown) {
        console.error('Error saving projects:', error);
        const message = error instanceof Error ? error.message : 'Failed to save projects.';
        return { success: false, message };
    }
}

/**
 * Upload an image to the local public/images/uploads directory
 */
export async function uploadImageAction(formData: FormData) {
    try {
        const file = formData.get('image') as File;
        if (!file) {
            return { success: false, message: 'No file uploaded.' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Define upload directory path
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
        
        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        // Clean filename: timestamp_originalname
        const cleanName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(uploadDir, cleanName);

        // Write file
        await fs.writeFile(filePath, buffer);

        // Return path relative to public folder
        const relativeUrl = `/images/uploads/${cleanName}`;
        return { success: true, url: relativeUrl };
    } catch (error: unknown) {
        console.error('Error uploading image:', error);
        const message = error instanceof Error ? error.message : 'Failed to upload image.';
        return { success: false, message };
    }
}

/**
 * Update the profile avatar image by overwriting public/Avatar.webp
 */
export async function updateAvatarAction(formData: FormData) {
    try {
        const file = formData.get('avatar') as File;
        if (!file) {
            return { success: false, message: 'No file uploaded.' };
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const avatarPath = path.join(process.cwd(), 'public', 'Avatar.webp');

        // Write file (overwriting existing Avatar.webp)
        await fs.writeFile(avatarPath, buffer);

        // Revalidate both root layout and pages
        revalidatePath('/');
        return { success: true, url: `/Avatar.webp?t=${Date.now()}` };
    } catch (error: unknown) {
        console.error('Error updating avatar:', error);
        const message = error instanceof Error ? error.message : 'Failed to update avatar.';
        return { success: false, message };
    }
}
