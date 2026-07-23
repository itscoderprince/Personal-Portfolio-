"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.span
        className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className="inline-flex justify-center items-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-200 px-3 py-1 text-lg font-medium leading-none tracking-tight text-neutral-900 shadow-sm ring shadow-black/10 ring-black/10 drop-shadow-lg md:text-2xl dark:bg-white dark:text-black dark:shadow-sm dark:ring-1 dark:shadow-white/10 dark:ring-white/10"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: -20, rotateX: 90 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: 0,
              x: [0, 0, -2, 2, 0], // Wiggle keyframes
            }}
            exit={{ opacity: 0, y: 20, rotateX: -90 }}
            transition={{
              // Default transition for flip (opacity, y, rotateX)
              duration: 0.5,
              ease: "easeInOut",
              // Specific transition for wiggle (x)
              x: {
                delay: 0.6, // Wait for flip (0.5s) + 0.1s pause
                duration: 0.4, // Fast wiggle
                times: [0, 0.25, 0.5, 0.75, 1],
              }
            }}
            className={cn("inline-block whitespace-nowrap")}
          >

            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
