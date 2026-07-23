import mongoose, { Schema, Document, Model } from 'mongoose';
import type { ProjectType } from '@/type/index';

export interface IProject extends Omit<ProjectType, 'imgSrc' | 'title' | 'projectLink'>, Document {
    imgSrc: string;
    title: string;
    projectLink: string;
    tags: string[];
    description?: string;
    features?: string[];
    order: number;
}

const ProjectSchema = new Schema<IProject>(
    {
        imgSrc: { type: String, required: true },
        title: { type: String, required: true },
        tags: { type: [String], default: [] },
        projectLink: { type: String, required: true },
        description: { type: String, default: '' },
        features: { type: [String], default: [] },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// Prevent overwrite model error in Next.js hot-reloading
const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
