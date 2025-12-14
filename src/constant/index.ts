/**
 * @copyright 2025
 * @license Apache-2.0
 */

import React from 'react';

/**
 * Types
 */
import type {
    ExperienceType,
    LinksType,
    ProjectType,
    ServiceType,
    StatsType,
    TestimonialsType,
    ToolsType,
} from '@/type/index';

/**
 * Assets
 */
import {
    Briefcase,
    FileText,
    Github,
    Globe,
    Home,
    Instagram,
    Layers,
    Linkedin,
    Mail,
    MessageCircle,
    Palette,
    Rocket,
    // Settings,
    Smartphone,
    User,
    X,
    Youtube,
} from 'lucide-react';

/**
 * Navigation Links
 */
const navLinks: LinksType[] = [
    { label: 'Home', link: '/', icon: Home },
    { label: 'Projects', link: '#projects', icon: Briefcase },
    { label: 'About', link: '#about', icon: User },
    // { label: 'Services', link: '#services', icon: Settings },
    { label: 'Resume', link: '#resume', icon: FileText },
    { label: 'Reviews', link: '#testimonials', icon: MessageCircle },
    { label: 'Contact', link: '#contact', icon: Mail },
];

/**
 * Social Links
 */
const socialLinks: LinksType[] = [
    { icon: Instagram, label: 'Instagram', link: 'https://www.instagram.com/prince_sharma_4/' },
    { icon: X, label: 'Twitter', link: 'https://x.com/Princek11770069?t=o1obmYb1xTH3119RNuqEIg&s=08' },
    { icon: Linkedin, label: 'Linkedin', link: 'https://www.linkedin.com/in/prince-sharma-4/' },
    { icon: Github, label: 'Github', link: 'https://github.com/itscoderprince' },
    { icon: Youtube, label: 'Youtube', link: 'https://youtube.com' },
];

/**
 * Projects
 */
const projectsData: ProjectType[] = [
    {
        imgSrc: '/images/Ngo.png',
        title: 'Prayas by Aarya Foundation Website',
        tags: ['NGO', 'Social Work', 'Web Development'],
        projectLink: 'https://prayasbyaaryafoundation.com/',
    },
    {
        imgSrc: '/images/kanvei.png',
        title: 'Kanvei E-commerce Platform',
        tags: ['E-commerce', 'Fashion', 'Web Development'],
        projectLink: 'https://kanvei.in/',
    },
    {
        imgSrc: '/images/project-ph-3.jpeg',
        title: 'Full stack music app',
        tags: ['API', 'Development'],
        projectLink: 'https://musify-5al0.onrender.com/',
    },
    {
        imgSrc: '/images/project-ph-4.jpeg',
        title: 'Full stack music app',
        tags: ['API', 'Development'],
        projectLink: 'https://musify-5al0.onrender.com/',
    },
];

/**
 * Education
 */
const education: ExperienceType[] = [
    {
        year: '2023 – Present',
        title: 'Full Stack Development',
        institute: 'Self-Taught / Online Resources',
        desc: 'Mastered the MERN stack (MongoDB, Express, React, Node.js) through hands-on project building and documentation.',
    },
    {
        year: '2022',
        title: 'Frontend Development & UI/UX',
        institute: 'Self-Paced Learning',
        desc: 'Deep dived into modern React patterns, Tailwind CSS, and user interface design principles.',
    },
];

/**
 * Experience
 */
const experience: ExperienceType[] = [
    {
        year: '2024 – Present',
        title: 'Full Stack Developer',
        institute: 'Webitya',
        desc: 'Building and maintaining scalable web applications, optimizing performance, and crafting intuitive user interfaces.',
    },
    {
        year: '2023 – 2024',
        title: 'Freelance Developer',
        institute: 'Remote',
        desc: 'Delivered custom web solutions for diverse clients, transforming innovative ideas into functional digital products.',
    },
];

/**
 * Tools
 */
const tools: ToolsType[] = [
    { label: 'Figma', imgSrc: '/images/tools/figma.svg' },
    { label: 'CSS', imgSrc: '/images/tools/css3.svg' },
    { label: 'Tailwind CSS', imgSrc: '/images/tools/tailwindcss.svg' },
    { label: 'React', imgSrc: '/images/tools/react.svg' },
    { label: 'JavaScript', imgSrc: '/images/tools/javascript.svg' },
    { label: 'Node.js', imgSrc: '/images/tools/nodejs.svg' },
    { label: 'Express.js', imgSrc: '/images/tools/expressjs.svg' },
    { label: 'Mongodb', imgSrc: '/images/tools/mongodb.svg' },
];

/**
 * Services
 */
const services: ServiceType[] = [
    {
        title: 'Full Stack Web Development',
        desc: 'Building scalable, high-performance web applications using the MERN stack (MongoDB, Express, React, Node.js) with a focus on code quality and best practices.',
        projects: '58 Projects',
        icon: Globe,
    },
    {
        title: 'Database Architecture',
        desc: 'Designing efficient and secure database schemas with MongoDB to ensure fast data retrieval, consistency, and integrity for data-driven applications.',
        projects: '32 Projects',
        icon: Layers,
    },
    {
        title: 'Backend API Development',
        desc: 'Creating robust RESTful APIs and microservices using Node.js and Express that power seamless communication between client and server.',
        projects: '47 Projects',
        icon: Rocket,
    },
    {
        title: 'Responsive UI/UX Implementation',
        desc: 'Translating designs into pixel-perfect, responsive front-end code using React and Tailwind CSS for exceptional user experiences across all devices.',
        projects: '21 Projects',
        icon: Palette,
    },
    {
        title: 'Performance Optimization',
        desc: 'Enhancing application speed and SEO rankings through code splitting, image optimization, and server-side rendering techniques.',
        projects: '15 Projects',
        icon: Smartphone,
    },
];

/**
 * Stats
 */
const statsData: StatsType[] = [
    { number: "25", label: 'Projects' },
    { number: "15", label: 'Clients' },
    { number: "3", label: 'Years Experience' },
];

/**
 * Testimonials
 */
const testimonials: TestimonialsType[] = [
    {
        name: 'Alex Tomato',
        role: 'Brand Manager at Instant Design',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Working with David was an absolute pleasure. His attention to detail, creative insights, and ability to translate complex ideas into stunning visuals truly set him apart.',
        link: '#',
    },
    {
        name: 'Sara Bloom',
        role: 'Founder at Bloom Agency',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        text: 'David brought my brand vision to life better than I could have imagined. Professional, skilled, responsive, and collaborative.',
        link: '#',
    },
    {
        name: 'John Park',
        role: 'CEO at PixelFlow',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'From UI/UX design to front-end implementation, David handled every detail flawlessly. Highly recommended.',
        link: '#',
    },
];

export {
    socialLinks,
    projectsData,
    education,
    experience,
    tools,
    services,
    navLinks,
    statsData,
    testimonials,
};
