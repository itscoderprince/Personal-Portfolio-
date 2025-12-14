'use client';

import { motion } from "motion/react";
import { fadeUp, staggerContainer } from '@/lib/animation';
import SectionHeader from "./SectionHeader";
import ExpCard from "./ExpCard";
import { education, experience, tools } from "../constant";
import ToolsCard from "./ToolsCard";
import { TracingList } from "./TracingList";

const Resume = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer(0)}
      className="mt-30 scroll-mt-10"
      id="resume"
    >
      <SectionHeader
        subtitle="Resume"
        title="Educational Background & Work Experience"
      />

      <motion.p
        variants={fadeUp}
        className="mt-4 text-neutral-600 dark:text-neutral-300 justify-smart"
      >
        I am a MERN Stack Developer with a strong foundation in both academic learning
        and real-world project experience. I enjoy building clean, scalable, and
        user-focused applications that solve meaningful problems. My journey combines
        continuous learning, hands-on practice, and the ability to translate ideas
        into full functional digital solutions.
      </motion.p>

      <div className="grid gap-x-10 my-16 md:grid-cols-2">
        <motion.div variants={fadeUp} className="mb-16 md:mb-0">
          <h2 className="text-3xl font-semibold mb-8">Education</h2>

          <TracingList>
            {education.map((item, i) => (
              <ExpCard key={i} item={item} />
            ))}
          </TracingList>
        </motion.div>

        <motion.div variants={fadeUp}>
          <h2 className="text-3xl font-semibold mb-8">Work Experience</h2>

          <TracingList>
            {experience.map((item, i) => (
              <ExpCard key={i} item={item} />
            ))}
          </TracingList>
        </motion.div>
      </div>

      <div className="my-16">
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-semibold mb-8 capitalize"
        >
          Favorite Tools & Technologies
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.5)}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5"
        >
          {tools.map((tool, i) => (
            <ToolsCard key={i} tool={tool} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Resume;
