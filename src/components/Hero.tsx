'use client';

import { motion } from 'motion/react';
import { fadeUp, staggerContainer } from '@/lib/animation';
import { Download, ArrowRight, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import PrimaryButton from './ui/primary-button';
import { LayoutTextFlip } from './ui/layout-text-flip';
import { TextGenerateEffect } from './ui/text-generate-effect';
import SparkText from './SparkText';

const Hero = () => {
    return (
        <section className="relative w-full flex flex-col justify-center overflow-hidden bg-background pt-2">

            {/* BACKGROUND: Grid Pattern */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Radial Fade for Background */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer(0.2)}
                className='container relative mx-auto px-4 mt-4 flex flex-col items-start text-left z-10'
                id='hero'
            >

                {/* 1. Badge */}
                <SparkText />

                {/* 2. Main Headline */}
                <motion.h1
                    variants={fadeUp}
                    className='text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-7xl'
                >
                    Hi, I'm <span className='text-primary'>Prince</span>
                    <br />
                    {/* Flip Text Container */}
                    <span className='block h-auto overflow-hidden text-2xl font-medium text-muted-foreground sm:text-xl md:text-2xl'>
                        <LayoutTextFlip
                            text=""
                            words={[
                                'Front-end Engineer',
                                'Backend Engineer',
                                'Full-Stack Engineer',
                                'Vibe Coding Engineer',
                                'Problem Solver'
                            ]}
                        />
                    </span>
                </motion.h1>

                {/* 3. Description (Text Generate Effect) */}
                <motion.div variants={fadeUp} className="max-w-3xl mt-4 w-full">
                    <TextGenerateEffect
                        words="I build accessible, pixel-perfect, and performant web experiences. Currently focused on building comprehensive e-commerce solutions and tools for NGOs."
                        className="text-left text-base md:text-xl font-normal text-neutral-400 leading-relaxed"
                    />
                </motion.div>

                {/* 4. Buttons & Socials */}
                <motion.div
                    variants={fadeUp}
                    className='mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full'
                >
                    {/* Buttons */}
                    <div className="flex gap-4 mb-2">
                        <PrimaryButton href="#projects" className="h-11 px-6 text-base group flex items-center gap-2">
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </PrimaryButton>
                        <Button className="h-11 px-6 text-base flex items-center gap-2 bg-transparent dark:bg-transparent text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 shadow-none hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            Download CV <Download className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Social Separator (Hidden on mobile, visible on desktop) */}
                    <div className="hidden sm:block h-8 w-[1px] bg-neutral-800"></div>

                    {/* Social Icons */}
                    <div className="flex gap-6 text-neutral-400">
                        <a href="https://github.com/itscoderprince" target="_blank" className="hover:text-primary hover:-translate-y-1 transition-all"><Github size={24} /></a>
                        <a href="https://www.linkedin.com/in/prince-sharma-4/" target="_blank" className="hover:text-primary hover:-translate-y-1 transition-all"><Linkedin size={24} /></a>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero; 