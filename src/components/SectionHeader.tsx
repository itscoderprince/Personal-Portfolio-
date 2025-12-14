'use client';

import { motion } from 'motion/react';
import { fadeUp } from '@/lib/animation';
import SparkText from './SparkText';

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <SparkText text={subtitle} className="w-fit" />
      <motion.h2
        variants={fadeUp}
        className='text-3xl sm:text-4xl font-bold capitalize mt-2 md:max-w-3xl'
      >
        {title}
      </motion.h2>
    </>
  );
};

export default SectionHeader;
