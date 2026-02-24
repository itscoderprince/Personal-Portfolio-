'use client';

import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animation';
import AnimatedCounter from './AnimatedCounter';
import { statsData } from '../constant';

const Stats = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer(0.2)}
      className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14'
      id='stats'
    >
      {statsData.map((stats, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className='border border-neutral-700 rounded-xl flex justify-center items-center flex-col py-6'
        >
          <p className='text-4xl font-bold lining-nums flex items-center justify-center gap-0.5 text-neutral-900 dark:text-white'>
            <AnimatedCounter value={Number(stats.number)} /><span className='text-neutral-500 dark:text-neutral-300'>+</span>
          </p>
          <p className='text-neutral-600 dark:text-neutral-300'>{stats.label}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Stats;
