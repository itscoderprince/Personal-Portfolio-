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
    Rocket,
    // Settings,
    Smartphone,
    Twitter,
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
    { icon: Twitter, label: 'Twitter', link: 'https://x.com/Princek11770069?t=o1obmYb1xTH3119RNuqEIg&s=08' },
    { icon: Linkedin, label: 'Linkedin', link: 'https://www.linkedin.com/in/prince-sharma-4/' },
    { icon: Github, label: 'Github', link: 'https://github.com/itscoderprince' },
    { icon: Youtube, label: 'Youtube', link: 'https://youtube.com/itscoderprince' },
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
        description: 'A dedicated platform for a non-profit organization to showcase their social initiatives and facilitate donations.',
        features: ['Donation Integration', 'Impact Showcase', 'Member Management', 'Event Gallery'],
    },
    {
        imgSrc: '/images/kanvei.png',
        title: 'Kanvei E-commerce Platform',
        tags: ['E-commerce', 'Fashion', 'Web Development'],
        projectLink: 'https://kanvei.in/',
        description: 'A full-featured e-commerce platform designed for modern fashion brands with seamless shopping experience.',
        features: ['Product Filtering', 'Secure Checkout', 'User Accounts', 'Order Tracking'],
    },
    {
        imgSrc: '/images/Life-care.PNG',
        title: 'Life Care Health Website',
        tags: ['Health', 'Web Development', 'Healthcare'],
        projectLink: 'https://life-care-ashen.vercel.app/',
        description: 'A comprehensive healthcare service website providing information about medical facilities and appointment booking.',
        features: ['Doctor Profiles', 'Appointment Booking', 'Service Overview', 'Health Blog'],
    },
    {
        imgSrc: '/images/Gym.PNG',
        title: 'Gym Management App',
        tags: ['Social', 'Web Development', 'Social Media'],
        projectLink: 'https://gym-with-react-js.vercel.app/',
        description: 'An interactive gym management application to track workouts, memberships, and trainer schedules.',
        features: ['Workout Tracker', 'Membership Plans', 'Trainer Dashboard', 'Progress Analytics'],
    },
    {
        imgSrc: '/images/Pea.png',
        title: 'Planedge Architect',
        tags: ['Residential', 'Commercial'],
        projectLink: 'https://plan-edge-jade.vercel.app/',
        description: 'Planedge Architect creates thoughtful spaces where design meets purpose and everyday living becomes extraordinary.',
        features: ['Residential | Commercial', 'Designing Spaces, Shaping Experiences', 'Thoughtful Space Creation', 'Purposeful Design'],
    },
    {
        imgSrc: '/images/project-ph-3.jpeg',
        title: 'Full Stack Social App',
        tags: ['Social', 'Web Development', 'Social Media'],
        projectLink: 'https://musify-5al0.onrender.com/',
        description: 'A modern social media application featuring real-time chat, post sharing, and user interactions.',
        features: ['Real-time Chat', 'Post Interactions', 'User Profiles', 'Image Sharing'],
    },
    {
        imgSrc: '/images/project-ph-4.jpeg',
        title: 'Full stack music app',
        tags: ['Music', 'Web Development'],
        projectLink: 'https://musify-5al0.onrender.com/',
        description: 'A feature-rich music streaming application with personalized playlists and high-quality audio playback.',
        features: ['Music Streaming', 'Playlist Management', 'Artist Discovery', 'Audio Visualizer'],
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
    { label: 'Next.js', imgSrc: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { label: 'React', imgSrc: 'https://cdn.simpleicons.org/react' },
    { label: 'TypeScript', imgSrc: 'https://cdn.simpleicons.org/typescript' },
    { label: 'JavaScript', imgSrc: 'https://cdn.simpleicons.org/javascript' },
    { label: 'Tailwind CSS', imgSrc: 'https://cdn.simpleicons.org/tailwindcss' },
    { label: 'CSS', imgSrc: '/images/tools/css3.svg' },
    { label: 'Node.js', imgSrc: 'https://cdn.simpleicons.org/nodedotjs' },
    { label: 'Express.js', imgSrc: 'https://cdn.simpleicons.org/express/white' },
    { label: 'MongoDB', imgSrc: 'https://cdn.simpleicons.org/mongodb' },
    { label: 'GSAP', imgSrc: 'https://cdn.simpleicons.org/greensock' },
    { label: 'Framer Motion', imgSrc: 'https://cdn.simpleicons.org/framer/white' },
    { label: 'Vercel', imgSrc: 'https://cdn.simpleicons.org/vercel/white' },
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
        icon: Layers,
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
    { number: "20", label: 'Projects' },
    { number: "15", label: 'Clients' },
    { number: "2", label: 'Years Experience' },
];

/**
 * Testimonials
 */
const testimonials: TestimonialsType[] = [
    {
        name: 'Alex Tomato',
        role: 'Brand Manager at Instant Design',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Working with Prince was an absolute pleasure. His attention to detail, creative insights, and ability to translate complex ideas into stunning visuals truly set him apart.',
        link: '#',
    },
    {
        name: 'Sara Bloom',
        role: 'Founder at Bloom Agency',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        text: 'Prince brought my brand vision to life better than I could have imagined. Professional, skilled, responsive, and collaborative.',
        link: '#',
    },
    {
        name: 'John Park',
        role: 'CEO at PixelFlow',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'From UI/UX design to front-end implementation, Prince handled every detail flawlessly. Highly recommended.',
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
