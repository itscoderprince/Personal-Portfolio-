import { AnimatePresence, motion } from 'motion/react';
import { fadeUp } from '../lib/animations';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SparkleIcon,
  StarIcon,
} from 'lucide-react';
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
      <p className="flex w-fit items-center py-1 gap-2 border border-neutral-600 rounded-sm px-2">
        <SparkleIcon size={15} /> Reviews
      </p>

      <h2 className="text-4xl font-bold mt-2">
        What clients say about me
      </h2>

      {/* Full-width container */}
      <div className="mt-10 w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={curSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            
            className="
              border border-neutral-800 rounded-3xl bg-neutral-900/20 
              p-4 sm:p-8 
              w-full 
              flex flex-col md:flex-row gap-4 md:gap-8
            "
          >
            {/* Left Section (avatar + meta) */}
            <div className="flex items-start gap-3 md:flex-col md:gap-4 md:w-[260px] md:min-w-[220px] md:flex-none">
              <img
                src={testimonials[curSlide].image}
                alt={testimonials[curSlide].name}
                className="size-20 rounded-full object-cover border border-neutral-700 p-1"
              />

              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {testimonials[curSlide].name}
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {testimonials[curSlide].role}
                </p>

                <div className="mt-2 flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section (review text) */}
            <div className="flex-1">
              <p className="text-neutral-300 leading-relaxed mb-3 break-words">
                {testimonials[curSlide].text}
              </p>
              <a
                href={testimonials[curSlide].link}
                className="text-sm text-primary hover:underline"
              >
                View Project →
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="size-10 flex items-center justify-center rounded-full border border-neutral-700 hover:bg-neutral-800 transition"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            onClick={next}
            className="size-10 flex items-center justify-center rounded-full border border-neutral-700 hover:bg-neutral-800 transition"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
