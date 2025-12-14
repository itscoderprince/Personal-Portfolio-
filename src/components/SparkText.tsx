'use client';

import { SparkleIcon } from "lucide-react";
import { motion } from 'motion/react';
import { cn } from "@/lib/utils";

interface SparkTextProps {
    text?: string;
    className?: string;
}

const SparkText = ({ text = "Open to Work", className }: SparkTextProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'mb-2 inline-flex items-center gap-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 px-4 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 backdrop-blur-md',
                className
            )}
        >
            <SparkleIcon size={14} className="text-yellow-500 fill-yellow-500 animate-pulse" />
            <span className="font-medium tracking-wide">{text}</span>
        </motion.div>
    );
};

export default SparkText;
