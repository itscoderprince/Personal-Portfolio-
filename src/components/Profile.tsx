'use client';

import { motion } from "motion/react";
import { socialLinks } from "../constant";
import { MapPin } from "lucide-react";
import PrimaryButton from "./ui/primary-button";

const Profile = () => {

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      // ✅ APPLIED YOUR EXACT CUSTOM CLASSES HERE:
      className="max-w-3xl border sm:m-6 m-3 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white p-3 rounded-lg lg:sticky lg:left-0 lg:top-6 lg:w-md h-fit shadow-2xl shadow-black/10 dark:shadow-black/50"
    >
      <div className="flex flex-col items-center gap-5">

        {/* 1. Avatar (Sized to fit your container) */}
        <div className="relative group w-full flex justify-center">
          <img
            src="/Avatar.webp"
            alt="Er Prince MERN Stack Developer"
            loading="lazy"
            decoding="async"
            className="w-full max-w-[18rem] lg:max-w-none aspect-square rounded-full p-1 object-cover bg-neutral-800 border-2 border-neutral-700 group-hover:border-primary transition-all duration-300"
          />
        </div>

        {/* Name */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-rubik uppercase font-bold tracking-wide">
            Dev. Prince
          </h1>
        </div>

        {/* 2. Location & Info */}
        <div className="w-auto bg-neutral-100 dark:bg-neutral-800/30 rounded-xl p-3 border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            <MapPin className="size-4 text-primary" />
            <span>Delhi, India</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed px-2">
          Self-taught Full Stack Developer with a passion for building scalable <span className="text-neutral-900 dark:text-white font-medium">MERN</span> applications. Currently building at <a href="https://webitya.com" target="_blank" className="text-black dark:text-white font-medium hover:underline underline-offset-2">Webitya</a>.
        </p>

        {/* 3. Social Links */}
        <div className="flex gap-3 items-center justify-evenly w-full">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                href={link.link}
                key={link.label}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-white hover:bg-black hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white border border-neutral-200 dark:border-neutral-600 p-2 rounded-full transition-all duration-300"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>

        {/* 4. Action Button */}
        <div className="w-full mx-auto">
          <PrimaryButton href="#contact" className="w-full py-2.5 h-auto text-base font-semibold tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98]">
            Let's Work Together!
          </PrimaryButton>
        </div>

      </div>
    </motion.aside >
  );
};

export default Profile;