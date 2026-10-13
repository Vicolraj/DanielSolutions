export type ProjectItem = {
  id: string;
  title: string;
  desc: string;
  category: 'website' | 'animation' | 'component';
  tags: [string, string][];
  year: string;
  tech: string[];
  link?: string;
  github?: string;
  placeholder: string;
  accentColor: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "Infinix Hot 60",
    desc: "A product landing page for infinix hot 60",
    category: "website",
    tags: [["Marketing", "rust"], ["React", "blue"], ["Framer Motion", "purple"], ["Animated Landing-Page", "warm"]],
    year: "2025",
    tech: ["React", "TypeScript", "IntersectionObserver", "CSSAnimation"],
    placeholder: "https://vicolraj.github.io/Pictures/infinixhot60.webp",
    link: "https://infinixhot60.vercel.app/",
    github: "https://github.com/Vicolraj/Infinixhot60",
    accentColor: "#e0692b"
  },
  {
    id: "2",
    title: "PrayPersian",
    desc: "Corrected API calling and Deployment Fixing",
    category: "website",
    tags: [["Fixing", "green"], ["React", "rust"], ["Vercel", "purple"], ["Animated Landing-Page", "warm"]],
    year: "2026",
    tech: ["React", "TypeScript", "IntersectionObserver"],
    placeholder: "https://vicolraj.github.io/Pictures/praypersian.png",
    link: "https://praypersian.com",
    github: "",
    accentColor: "#60a5fa"
  },
  {
    id: "3",
    title: "Isimemen",
    desc: "dodonfndf",
    category: "website",
    tags: [["Fixing", "green"], ["React", "rust"], ["Vercel", "purple"], ["Animated Landing-Page", "warm"]],
    year: "2026",
    tech: ["React", "TypeScript", "IntersectionObserver"],
    placeholder: "https://vicolraj.github.io/Pictures/isimemen.webp",
    link: "https://www.isimemen.com",
    github: "",
    accentColor: "#5bc47a"
  },
  {
    id: "4",
    title: "VicAutos",
    desc: "Conversion of an automobile website design concept, from Instagram, into a functional and live landing page.",
    category: "website",
    tags: [["Fixing", "green"], ["React", "rust"], ["Vercel", "purple"], ["Animated Landing-Page", "warm"]],
    year: "2024",
    tech: ["React", "TypeScript", "IntersectionObserver"],
    placeholder: "https://vicolraj.github.io/Pictures/vicautos.webp",
    link: "https://vicolraj.github.io/VicAutos",
    github: "https://github.com/Vicolraj/VicAutos",
    accentColor: "#a78bfa"
  },
  {
    id: "5",
    title: "Smoothie Juicy",
    desc: "Bringing an animation-rich beverage marketing website design concept to life as a fully functional live site.",
    category: "animation",
    tags: [["Fixing", "green"], ["React", "rust"], ["Vercel", "purple"], ["Animated Landing-Page", "warm"]],
    year: "2025",
    tech: ["React", "TypeScript", "IntersectionObserver"],
    placeholder: "https://vicolraj.github.io/Pictures/SmoothieJuicy.webp",
    link: "https://smoothie-juicy.vercel.app/",
    github: "https://github.com/Vicolraj/SmoothieJuicy",
    accentColor: "#00d4aa"
  },
];

export const TECH_STACK = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Blazor', 'TailwindCSS'] },
  { group: 'Backend', items: ['C# / ASP.NET core', 'Node.js / Express', 'SQL Server', 'Firebase', 'SUPABASE', 'NEONDB'] },
  { group: 'Animation', items: ['Rive', 'Framer Motion', 'After Effects', 'CSS Animation', 'Three.js', 'Lottie', 'GSap']},
  { group: 'Design & Tools', items: ['Figma', 'Photoshop', 'CorelDraw', 'Git / GitHub', 'Vite', 'Vercel'] },
];
