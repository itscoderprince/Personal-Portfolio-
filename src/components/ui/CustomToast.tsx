"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type ToastProps = {
    message: string;
    type: "success" | "error";
    duration?: number;
    onClose: () => void;
};

export const CustomToast = ({ message, type, duration = 3000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="fixed bottom-24 right-4 sm:bottom-4 sm:right-4 z-50 flex items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-lg p-4 min-w-[300px]"
            >
                {type === "success" ? (
                    <CheckCircle2 className="size-5 text-green-500" />
                ) : (
                    <XCircle className="size-5 text-red-500" />
                )}
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex-1">
                    {message}
                </p>
                <button
                    onClick={onClose}
                    className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                >
                    <X className="size-4" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};
