'use client';

import { AnimatePresence, motion } from 'motion/react';
import { fadeUp } from '@/lib/animation';
import { cn } from '@/lib/utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from 'lucide-react';
import SparkText from './SparkText';
import { testimonials } from '../constant';
import { useState } from 'react';

const Testimonials = () => {
  const [curSlide, setCurSlide] = useState(0);

  const next = () => setCurSlide((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="mt-30 scroll-mt-10"
      id="testimonials"
    >
      {/* Header */}
      <div className="flex flex-col items-start gap-2 mb-10">
        <SparkText text="Testimonials" className="w-fit" />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Client Feedback
        </h2>
      </div>

      {/* Main Container */}
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={curSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "relative flex flex-col md:flex-row gap-8 p-6 md:p-10",
              "bg-transparent border border-white/10 dark:border-white/20 rounded-[2rem]",
              "backdrop-blur-sm self-stretch min-h-[300px]"
            )}
          >
            {/* Left side: Profile Info */}
            <div className="flex flex-col items-center md:items-start md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 dark:border-white/10 pb-6 md:pb-0 md:pr-8">
              <div className="relative mb-4 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img
                  src={testimonials[curSlide].image}
                  alt={testimonials[curSlide].name}
                  className="relative size-24 rounded-full object-cover border-2 border-white/50 dark:border-neutral-800 shadow-xl"
                />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                  {testimonials[curSlide].name}
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
                  {testimonials[curSlide].role}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Testimonial Text */}
            <div className="flex flex-col justify-between flex-1 py-2 lg:py-4">
              <div className="relative">
                <span className="absolute -top-6 -left-2 text-6xl text-blue-500/20 font-serif leading-none">"</span>
                <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed italic pr-4">
                  {testimonials[curSlide].text}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <a
                  href={testimonials[curSlide].link}
                  className="group flex items-center gap-2 text-sm font-semibold text-blue-500 transition-all hover:gap-3"
                >
                  View Case Study
                  <ChevronRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                </a>

                {/* Dots inside the card for mobile/tablet feel */}
                <div className="flex gap-1.5 px-3">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "size-1.5 rounded-full transition-all duration-300",
                        curSlide === i ? "w-4 bg-blue-500" : "bg-neutral-300 dark:bg-neutral-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="group size-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:border-blue-500 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon size={20} className="text-neutral-600 dark:text-neutral-400 group-hover:text-blue-500 transition-colors" />
          </button>
          <button
            onClick={next}
            className="group size-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 hover:border-blue-500 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon size={20} className="text-neutral-600 dark:text-neutral-400 group-hover:text-blue-500 transition-colors" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;