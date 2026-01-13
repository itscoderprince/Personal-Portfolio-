'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { ProjectType } from '@/type/index';
import PrimaryButton from './ui/primary-button';

interface ProjectModalProps {
    project: ProjectType | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Top: Image Section (Full Width) */}
                        <div className="relative w-full h-64 sm:h-96 shrink-0 overflow-hidden">
                            <Image
                                src={project.imgSrc}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                                <h2 className="text-2xl sm:text-3xl font-bold font-rubik leading-tight text-white">{project.title}</h2>
                                <PrimaryButton
                                    href={project.projectLink}
                                    target="_blank"
                                    className="shrink-0 px-5 py-2 text-sm bg-white text-black hover:bg-white/90 border-transparent flex items-center gap-1.5 shadow-lg"
                                >
                                    Visit <ArrowUpRight size={16} />
                                </PrimaryButton>
                            </div>
                        </div>

                        {/* Bottom: Info Section (Scrollable) */}
                        <div className="flex-1 custom-scrollbar p-5">
                            {/* Description */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 font-rubik">
                                    About the Project
                                </h4>
                                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-mono text-sm sm:text-base">
                                    {project.description || "Building impactful digital experiences with modern technologies."}
                                </p>
                            </div>

                            {/* Features */}
                            {project.features && project.features.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 font-rubik">
                                        Features & Functionality
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                                <CheckCircle2 size={16} className="text-primary shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
