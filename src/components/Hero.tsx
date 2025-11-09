import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../lib/animations';
import { SparkleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Typewriter } from 'react-simple-typewriter';
import FloatingMenu from './FloatingMenu';

const Hero = () => {
  return (
    <>
     <FloatingMenu />
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0)}
        className='pt-25'
        id='hero'
      >
        <motion.p
          variants={fadeUp}
          className='flex items-center justify-center p-2 gap-2 border border-neutral-600 rounded-sm w-38'
        >
          <SparkleIcon size={15} /> <span>Introduction</span>
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className='text-3xl md:text-5xl lg:text-6xl font-semibold capitalize mt-2 max-w-3xl md:leading-16'
        >
          I'm <span className='text-primary font-bold mx-2'>Er Prince</span>{' '}
          <br />
          <span className='text-primary font-bold'>
            <Typewriter
              words={[
                'Frontend Developer',
                'Backend Developer',
                'Full-Stack Developer',
              ]}
              loop={true}
              cursor
              cursorStyle='|'
              typeSpeed={85}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className='mt-5 flex gap-2'
        >
          <Button asChild>
            <a href='#projects'>My Projects</a>
          </Button>
          <Button variant='outline'>Download CV</Button>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
