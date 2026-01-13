'use client';

import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animation';
import Image from 'next/image';
import type { ProjectType } from '@/type/index';
import { ArrowUpRight, Github } from 'lucide-react';
import PrimaryButton from './ui/primary-button';

const ProjectCard = ({ imgSrc, tags, title, projectLink, description, features, onClick }: ProjectType & { onClick: () => void }) => {
  return (
    <motion.div
      variants={fadeUp}
      className='relative group rounded-md overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 shadow-sm dark:shadow-none cursor-pointer'
      onClick={onClick}
    >
      {/* Image Container */}
      <figure className='relative overflow-hidden aspect-video'>
        <Image
          src={imgSrc}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Project Details
          </p>
        </div>
      </figure>

      {/* Content */}
      <div className='p-2 pt-2'>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-md text-neutral-900 dark:text-neutral-100 truncate">{title}</h3>
        </div>

        <div className='flex flex-wrap gap-2 mt-2'>
          {tags.map((tag, i) => (
            <span
              className='bg-neutral-800 text-neutral-300 px-2 py-1 rounded text-xs font-medium border border-neutral-700'
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
