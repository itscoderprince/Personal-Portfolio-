import { motion } from 'motion/react';
import { socialLinks } from '../constant';
import { Button } from './ui/button';

const Profile = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='max-w-3xl border sm:m-6 m-3 border-neutral-600 bg-neutral-900 text-white p-3 rounded-lg lg:sticky lg:left-0 lg:top-6 lg:w-110'
    >
      <div className='flex flex-col gap-2.5 sm:gap-4'>
        <div className='flex items-center py-2 justify-between gap-x-10'>
          <h1 className='text-2xl font-bold'>Er. Prince</h1>
        </div>

        <motion.img
          src='/avatar2.png'
          alt=''
          className='w-85 rounded-full mx-auto lg:w-96 p-1.5 object-cover'
          // initial={{ opacity: 0, y: 20 }}
          // animate={{
          //   opacity: 1,
          //   y: [0, -8, 0, 8, 0], 
          // }}
          // transition={{
          //   duration: 6, 
          //   repeat: Infinity,
          //   ease: 'easeInOut',
          // }}
        />

        <div className='mt-6'>
          <p className='text-md text-neutral-300'>Specialization:</p>
          <p className='text-xl capitalize'>Frontend and Backend Developer</p>
        </div>

        <div>
          <p className='text-md text-neutral-300'>Based in:</p>
          <p className='text-xl capitalize'>Delhi india, CS</p>
        </div>

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

        <Button
          variant='softblue'
        >
          Let's Work !
        </Button>
      </div>
    </motion.aside>
  );
};

export default Profile;
