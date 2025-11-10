import { motion } from 'motion/react';
import { staggerContainer } from '../lib/animations';
import SectionHeader from './SectionHeader';
import { projectsData } from '../constant';
import ProjectCard from './ProjectCard';

const Projects = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0.4)}
      className='mt-30 scroll-mt-10'
      id='projects'
>
      <SectionHeader
        subtitle='Projects'
        title='My Features'
      />

      <motion.div
        className='grid md:grid-cols-2 gap-5 sm:gap-8 mt-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.5)}
      >
        {projectsData.map((project, i) => (
          <ProjectCard
            key={i}
            imgSrc={project.imgSrc}
            projectLink={project.projectLink}
            tags={project.tags}
            title={project.title}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
