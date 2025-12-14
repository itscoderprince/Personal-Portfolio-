'use client';

import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animation';
import SectionHeader from './SectionHeader';
import PrimaryButton from './ui/primary-button';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.2 }}
      variants={staggerContainer(0.4)}
      className='mt-30 scroll-mt-10'
      id='about'
    >
      <SectionHeader
        subtitle='About'
        title='Transforming ideas into clean and impactful web experiences'
      />

      <motion.p
        variants={fadeUp}
        className='mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed justify-smart'
      >
        I am a MERN Stack Developer who enjoys turning complex problems into
        simple, elegant solutions. I build fast, responsive, and user-centered
        applications using MongoDB, Express, React, and Node.js. My approach
        focuses on clean code, reusability, and meaningful UI design that
        creates a smooth and enjoyable experience for users.
      </motion.p>

      <motion.div
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className='mt-6'
      >
        <PrimaryButton href='#contact' className='flex w-fit items-center gap-2 h-11 px-6 text-base'>
          Contact <ArrowRight size={18} />
        </PrimaryButton>
      </motion.div>
    </motion.section>
  );
};

export default About;
