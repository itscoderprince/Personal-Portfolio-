"use client";
import {
    motion,
} from "motion/react";
import React from "react";

export const TracingList = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative w-full">
            <div className="relative pb-1 pl-6">
                {/* The static line */}
                <div className="absolute left-0 top-0 bottom-0 overflow-hidden w-[2px] bg-neutral-200 dark:bg-neutral-800">
                    {/* The animated meteor fix */}
                    <motion.div
                        initial={{ top: "-10%" }}
                        animate={{ top: "100%" }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 0.5,
                        }}
                        className="absolute left-0 w-[2px] h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    >
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_1px_rgba(59,130,246,0.8)]" />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
