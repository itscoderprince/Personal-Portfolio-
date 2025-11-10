import { motion } from 'motion/react';
import { Button } from './ui/button';
import { socialLinks } from '../constant';

const Profile = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='max-w-3xl border sm:m-6 m-3 border-neutral-600 bg-neutral-900 text-white p-3 rounded-lg lg:sticky lg:left-0 lg:top-6 lg:w-110'
    >
      <div className='flex flex-col items-center gap-4 sm:gap-3'>
        <motion.img
          src='/avatar2.png'
          alt='Er Prince MERN Stack Developer'
          className='w-83 rounded-full mx-auto lg:w-96 p-1.5 object-cover'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <h1 className='text-4xl font-rubik uppercase  text-center font-bold'>
          Er. Prince <br /> sharma
        </h1>

        <div className='flex gap-3 pt-2 items-center justify-around'>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                href={link.link}
                key={link.label}
                className='hover:text-primary border-2 border-neutral-500 p-2 rounded-full hover:border-primary transition duration-200'
              >
                <Icon className='size-5' />
              </a>
            );
          })}
        </div>
        <p className='align-super text-center py-1 px-8'>
          With a passion for developing modern React web apps for commercial
          businesses.
        </p>

        <Button
          size='lg'
          className='rounded-4xl w-full'
          variant='softblue'
        >
          Let's Work !
        </Button>
      </div>
    </motion.aside>
  );
};

export default Profile;
