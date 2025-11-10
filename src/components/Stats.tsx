import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../lib/animations';
import AnimatedCounter from './AnimatedCounter';
import { statsData } from '../constant';

const Stats = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.3 }}
      variants={staggerContainer(0.2)}
      className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-20'
      id='stats'
    >
      {statsData.map((stats, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className='border border-neutral-700 rounded-xl flex justify-center items-center flex-col py-6'
        >
          <p className='text-4xl font-bold lining-nums'>
            <AnimatedCounter value={Number(stats.number)} />
          </p>
          <p className='text-neutral-300'>{stats.label}</p>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default Stats;
