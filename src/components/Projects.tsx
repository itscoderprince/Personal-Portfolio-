'use client';

import { motion } from 'motion/react';
import { staggerContainer } from '@/lib/animation';
import SectionHeader from './SectionHeader';
import { projectsData } from '../constant';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useState } from 'react';
import type { ProjectType } from '@/type/index';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        className='grid md:grid-cols-3 gap-5 sm:gap-8 mt-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.5)}
      >
        {projectsData.map((project, i) => (
          <ProjectCard
            key={i}
            {...project}
            onClick={() => handleOpenModal(project)}
          />
        ))}
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

export default Projects;
