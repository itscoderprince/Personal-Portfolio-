import { motion } from 'motion/react';
import { fadeUp } from '../lib/animations';
import type { ProjectType } from '../types';

const ProjectCard = ({ imgSrc, tags, title }: ProjectType) => {
  return (
    <>
      <motion.div
        variants={fadeUp}
        className='relative'
      >
        <figure className='overflow-hidden rounded-md'>
          <img
            loading='lazy'
            src={imgSrc}
            alt={title}
            className='rounded-md transition duration-500 hover:scale-115 w-full'
          />
        </figure>

        <div className='absolute bottom-0 p-2 flex gap-2'>
          {tags.map((tag, i) => (
            <span
              className='bg-background hover:bg-primary hover:text-black py-1 px-2 rounded-sm text-sm cursor-pointer'
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
