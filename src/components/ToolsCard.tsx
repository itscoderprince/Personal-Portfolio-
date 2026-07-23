'use client';

import { motion } from "motion/react";
import type { ToolsType } from "@/type/index";

const ToolsCard = ({ tool }: { tool: ToolsType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative flex flex-col items-center justify-center p-6 bg-transparent border border-white/10 dark:border-white/20 rounded-2xl hover:border-sky-400/80 dark:hover:border-sky-400/80 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300 backdrop-blur-sm self-stretch h-full">
        <div className="size-12 sm:size-14 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
          <img
            src={tool.imgSrc}
            alt={tool.label}
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
        </div>

        <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
          {tool.label}
        </span>
      </div>
    </motion.div>
  );
};

export default ToolsCard;