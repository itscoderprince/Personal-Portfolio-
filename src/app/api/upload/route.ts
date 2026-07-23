import { NextResponse } from 'next/server';
import { uploadImageBuffer } from '@/lib/cloudinary';

/**
 * POST /api/upload
 * Handles file upload to Cloudinary (or local fallback) via FormData
 */
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = (formData.get('image') || formData.get('file') || formData.get('avatar')) as File | null;

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No image file provided in request body.' },
                { status: 400 }
            );
        }

        const folder = (formData.get('folder') as string) || 'portfolio_projects';
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await uploadImageBuffer(buffer, file.name, folder);

        if (!result.success) {
            return NextResponse.json(
                { success: false, message: result.message || 'Upload failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            url: result.url,
            message: result.message || 'Image uploaded successfully!',
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('API Upload error:', error);
        const message = error instanceof Error ? error.message : 'Server error uploading file.';
        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}
