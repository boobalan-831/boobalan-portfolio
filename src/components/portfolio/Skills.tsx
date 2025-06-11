import React from "react";
import {
  Code2, Database, Cloud, Users, Figma
} from "lucide-react";
import "@/styles/skills.css";


const skills = [
  {
    category: "Programming Languages",
    icon: Code2,
    color: "from-cyan-400 via-blue-400 to-purple-400",
    items: [
      { label: "C", icon: <Code2 className="w-6 h-6 text-cyan-300" /> },
      { label: "C++", icon: <Code2 className="w-6 h-6 text-blue-300" /> },
      { label: "Java", icon: <Code2 className="w-6 h-6 text-yellow-200" /> },
      { label: "Python", icon: <Code2 className="w-6 h-6 text-green-300" /> },
      { label: "JavaScript", icon: <Code2 className="w-6 h-6 text-yellow-300" /> },
      { label: "SQL", icon: <Database className="w-6 h-6 text-emerald-300" /> },
    ],
  },
  {
    category: "Web Technologies",
    icon: Code2,
    color: "from-blue-400 via-cyan-400 to-fuchsia-400",
    items: [
      { label: "HTML5", icon: <Code2 className="w-6 h-6 text-orange-300" /> },
      { label: "CSS3", icon: <Code2 className="w-6 h-6 text-blue-300" /> },
      { label: "Bootstrap", icon: <Code2 className="w-6 h-6 text-fuchsia-300" /> },
      { label: "JavaScript", icon: <Code2 className="w-6 h-6 text-yellow-300" /> },
      { label: "React.js", icon: <Code2 className="w-6 h-6 text-cyan-300" /> },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "from-purple-400 via-fuchsia-400 to-cyan-400",
    items: [
      { label: "Google Cloud (Basics)", icon: <Cloud className="w-6 h-6 text-blue-300" /> },
      { label: "AWS", icon: <Cloud className="w-6 h-6 text-orange-200" /> },
      { label: "Docker (beginner)", icon: <Cloud className="w-6 h-6 text-cyan-300" /> },
      { label: "Git", icon: <Users className="w-6 h-6 text-pink-300" /> },
    ],
  },
  {
    category: "UI Tools",
    icon: Figma,
    color: "from-fuchsia-400 via-blue-400 to-cyan-400",
    items: [
      { label: "Figma (Basic)", icon: <Figma className="w-6 h-6 text-pink-300" /> },
    ],
  }
];

const SkillBadge = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="skill-badge flex flex-col items-center mx-2 my-2 group">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#182241] border border-cyan-600/10 group-hover:scale-105 transition-transform shadow-md mb-1">
      {icon}
    </div>
    <span className="text-xs mt-1 text-cyan-100 font-medium font-stylish group-hover:text-cyan-300 transition">{label}</span>
  </div>
);

const SkillCategory = ({
  icon: Icon,
  category,
  color,
  items,
}: {
  icon: any;
  category: string;
  color: string;
  items: { icon: React.ReactNode; label: string }[];
}) => (
  <div className="skill-card w-full md:w-[calc(50%-32px)] lg:w-[calc(33%-32px)] xl:w-[calc(32%-32px)] bg-gradient-to-br rounded-2xl shadow-lg border border-white/10 mb-8 p-6 mx-4 backdrop-blur-md transition-transform hover:scale-[1.025]"
    style={{ background: "rgba(22, 33, 58, 0.93)" }}>
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-3 mb-1">
        <span className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${color} shadow`}>
          <Icon className="w-6 h-6 text-white drop-shadow" />
        </span>
        <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent font-title tracking-wide">
          {category}
        </h3>
      </div>
      {/* Light line below heading */}
      <div className="skill-title-line w-full flex justify-start mb-2">
        <span className="inline-block h-[2px] w-1/2 bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-300 opacity-60 rounded-full" />
      </div>
    </div>
    <div className="flex flex-wrap mt-2">
      {items.map(({ icon, label }) => (
        <SkillBadge icon={icon} label={label} key={label} />
      ))}
    </div>
  </div>
);

const Skills: React.FC = () => (
  <section className="skills-section relative py-24 px-2 md:px-0 min-h-screen bg-[#0e172a] overflow-x-hidden">
    <div className="mx-auto max-w-3xl text-center mb-10 z-20 relative">
      <span className="inline-flex items-center gap-2 bg-gradient-to-tr from-cyan-700 to-blue-700 py-1 px-4 rounded-full text-white text-xs font-bold uppercase shadow-md tracking-widest font-mono">
        <Code2 className="w-4 h-4" />
        My Skills
      </span>
      <h2 className="mt-4 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight font-title">
        Skillset at a Glance
      </h2>
      <p className="mt-4 text-lg text-slate-200 font-stylish font-medium">
        <span className="text-cyan-200 font-bold">From core programming to modern web</span> and <span className="text-fuchsia-200 font-bold">cloud technologies</span>
      </p>
    </div>
    <div className="w-full h-1 mb-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-[2.5px] opacity-30 animate-borderpan" />
    {/* Skills grid */}
    <div className="skills-grid flex flex-wrap justify-center items-stretch max-w-7xl mx-auto">
      {skills.map(({ icon, category, color, items }) => (
        <SkillCategory icon={icon} category={category} color={color} items={items} key={category} />
      ))}
    </div>
    {/* Subtle BG SVG for depth */}
    <svg className="absolute left-1/2 -translate-x-1/2 bottom-0 opacity-40 select-none pointer-events-none z-0" width="1100" height="190" viewBox="0 0 1100 190" fill="none">
      <ellipse cx="550" cy="95" rx="480" ry="55" fill="url(#skills_ellipse)" />
      <defs>
        <radialGradient id="skills_ellipse" cx="0" cy="0" r="1" gradientTransform="translate(550 95) scale(480 55)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#90cdf4" stopOpacity="0.10" />
          <stop offset="0.8" stopColor="#90cdf4" stopOpacity="0.01" />
          <stop offset="1" stopColor="#90cdf4" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </section>
);

export default Skills;