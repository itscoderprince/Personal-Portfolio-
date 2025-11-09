import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '../lib/animations';
import SectionHeader from './SectionHeader';
import { services } from '../constant';
import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <>
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0)}
        className='mt-30 scroll-mt-10'
        id='service'
      >
        <SectionHeader
          subtitle='Services'
          title='Building with purpose & precision'
        />

        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.5)}
          className='grid md:grid-cols-2 gap-10 mt-10'
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
};

export default Services;
