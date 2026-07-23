'use client';

import { motion } from 'motion/react';
import { staggerContainer } from '@/lib/animation';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useState, useEffect } from 'react';
import type { ProjectType } from '@/type/index';
import { Loader2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch((err: unknown) => {
        console.error('Failed to fetch projects from MongoDB:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-indigo-500" />
        </div>
      ) : (
        <motion.div
          className='grid md:grid-cols-3 gap-5 sm:gap-8 mt-10'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.5)}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              {...project}
              onClick={() => handleOpenModal(project)}
            />
          ))}
        </motion.div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </motion.section>
  );
};

export default Projects;
