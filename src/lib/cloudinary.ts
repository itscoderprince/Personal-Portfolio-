import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

// Configure Cloudinary from environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfsg5ylsb';
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    });
}

/**
 * Upload image buffer to Cloudinary or local upload fallback.
 */
export async function uploadImageBuffer(
    buffer: Buffer,
    originalName: string,
    folder: string = 'portfolio_projects'
): Promise<{ success: boolean; url?: string; message?: string }> {
    try {
        // If Cloudinary API credentials are system configured, upload directly to Cloudinary
        if (isCloudinaryConfigured) {
            return new Promise((resolve) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder,
                        resource_type: 'auto',
                    },
                    (error, result) => {
                        if (error || !result) {
                            console.error('Cloudinary upload error:', error);
                            resolve({
                                success: false,
                                message: error?.message || 'Cloudinary upload failed.',
                            });
                        } else {
                            resolve({
                                success: true,
                                url: result.secure_url,
                            });
                        }
                    }
                );
                uploadStream.end(buffer);
            });
        }

        // Fallback: Save to public/images/uploads if Cloudinary API keys are not provided yet
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        const cleanName = `${Date.now()}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(uploadDir, cleanName);

        await fs.writeFile(filePath, buffer);
        const relativeUrl = `/images/uploads/${cleanName}`;

        return {
            success: true,
            url: relativeUrl,
            message: 'Uploaded to local storage (Set CLOUDINARY_API_KEY & CLOUDINARY_API_SECRET in .env to upload directly to Cloudinary)',
        };
    } catch (err: unknown) {
        console.error('Error uploading image buffer:', err);
        const message = err instanceof Error ? err.message : 'Image upload failed.';
        return { success: false, message };
    }
}
