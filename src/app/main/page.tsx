'use client'

import About from '@/components/About';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import FloatingMenu from '@/components/FloatingMenu';
import Lenis from 'lenis';
import { useEffect } from 'react';


export default function Main() {

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <main className="flex flex-col container mx-auto p-4 max-w-4xl lg:pr-10 lg:pl-0 lg:max-w-6xl">
                <FloatingMenu />
                <Hero />
                <Stats />
                <Services />
                <Projects />
                <About />
                <Resume />
                <Testimonials />
                <Contact />
            </main>
        </>
    );
};
