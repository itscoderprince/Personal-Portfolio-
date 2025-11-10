/**
 * @copyright 2025
 * @license Apache-2.0
 */

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
} from '../types/index.ts';

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
  { icon: Instagram, label: 'Instagram', link: '/#' },
  { icon: X, label: 'Twitter', link: '/#' },
  { icon: Linkedin, label: 'Linkedin', link: '/#' },
  { icon: Github, label: 'Youtube', link: 'https://github.com/' },
];

/**
 * Projects
 */
const projectsData: ProjectType[] = [
  {
    imgSrc: '/images/project-ph-1.jpeg',
    title: 'Full stack music app',
    tags: ['API', 'Development'],
    projectLink: 'https://musify-5al0.onrender.com/',
  },
  {
    imgSrc: '/images/project-ph-2.jpeg',
    title: 'Full stack music app',
    tags: ['API', 'Development'],
    projectLink: 'https://musify-5al0.onrender.com/',
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
    year: '2018 – 2020',
    title: 'Bachelor of Computer Science',
    institute: 'National University of Technology',
    desc: 'Focused on front-end development, UI design, and web application architecture.',
  },
  {
    year: '2021 – 2022',
    title: 'Frontend Development Bootcamp',
    institute: 'Udemy / Online Course',
    desc: 'Learned modern JavaScript, React, and responsive UI patterns through real-world projects.',
  },
  {
    year: '2023',
    title: 'Advanced UI/UX Design Course',
    institute: 'Design+Code',
    desc: 'Explored advanced design systems, motion design, and accessibility best practices.',
  },
];

/**
 * Experience
 */
const experience: ExperienceType[] = [
  {
    year: '2021 – 2022',
    title: 'Frontend Developer Intern',
    institute: 'PixelForge Studio',
    desc: 'Built and optimized responsive websites, collaborating closely with designers and backend teams.',
  },
  {
    year: '2022 – Present',
    title: 'UI Engineer',
    institute: 'Freelance / Remote Work',
    desc: 'Designed and developed web interfaces for SaaS startups using React, Tailwind, and Figma.',
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
    title: 'Brand Identity',
    desc: 'I craft modern visual identities that help brands stand out through strong typography, colors, and minimal design.',
    projects: '32 Projects',
    icon: <Palette className='h-6 w-6 text-green-400' />,
  },
  {
    title: 'UI/UX Design',
    desc: 'Designing clean, intuitive, and user-friendly interfaces that improve user experience and boost conversions.',
    projects: '47 Projects',
    icon: <Layers className='h-6 w-6 text-green-400' />,
  },
  {
    title: 'Web Development',
    desc: 'Building high-performance, SEO-friendly websites using Next.js, Tailwind, and modern web technologies.',
    projects: '58 Projects',
    icon: <Globe className='h-6 w-6 text-green-400' />,
  },
  {
    title: 'Mobile App Design',
    desc: 'Creating pixel-perfect app interfaces optimized for both iOS and Android devices with smooth usability.',
    projects: '21 Projects',
    icon: <Smartphone className='h-6 w-6 text-green-400' />,
  },
  {
    title: 'Product Launch Strategy',
    desc: 'Helping startups prepare their digital products for launch with design systems, marketing pages, and assets.',
    projects: '15 Projects',
    icon: <Rocket className='h-6 w-6 text-green-400' />,
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
