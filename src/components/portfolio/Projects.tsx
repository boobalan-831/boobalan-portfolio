import React, { useRef, useEffect, useState } from "react";
import { Github, Bot, Users, Brain, Cpu, ArrowLeft, ArrowRight, Code2, Wand2, PlayCircle } from "lucide-react";
import "../../styles/Projects.css";

// Data
const projects = [
  {
    name: "AgriBot: Smart Crop Robot",
    description: "Autonomous IoT robot with smart sensors and AI for modern agriculture. Real-time analytics and precision navigation.",
    tags: ["IoT", "Robotics", "Python", "AI", "Agritech"],
    repo: "https://github.com/your-github/agri-robot",
    demo: "https://your-demo-link.com/agri-robot",
    icon: <Bot className="w-8 h-8 text-green-300" />,
    accent: "from-cyan-800 via-emerald-700 to-cyan-900",
    highlight: "bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-300 text-transparent bg-clip-text drop-shadow-lg"
  },
  {
    name: "User Dashboard Suite",
    description: "Lightning-fast dashboard for user management, analytics, and secure authentication. Modern UI with dark mode.",
    tags: ["React", "TypeScript", "JWT", "Dashboard", "Analytics"],
    repo: "https://github.com/your-github/user-dashboard",
    demo: "https://your-demo-link.com/user-dashboard",
    icon: <Users className="w-8 h-8 text-cyan-300" />,
    accent: "from-cyan-800 via-blue-700 to-indigo-900",
    highlight: "bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 text-transparent bg-clip-text drop-shadow-lg"
  },
  {
    name: "CS Knowledge Vault",
    description: "Curated CS learning platform: interactive resources, live code playgrounds, and quizzes for every skill level.",
    tags: ["Next.js", "CS", "Open Source", "Learning", "Quiz"],
    repo: "https://github.com/your-github/cs-knowledge-hub",
    demo: "https://your-demo-link.com/cs-knowledge-hub",
    icon: <Brain className="w-8 h-8 text-fuchsia-300" />,
    accent: "from-fuchsia-800 via-purple-700 to-violet-900",
    highlight: "bg-gradient-to-r from-fuchsia-300 via-purple-300 to-violet-300 text-transparent bg-clip-text drop-shadow-lg"
  },
  {
    name: "Algorithm Studio",
    description: "Visualize & challenge yourself with step-by-step CS algorithms, data structures, and interactive walkthroughs.",
    tags: ["Algorithms", "Visualization", "React", "CS", "Animations"],
    repo: "https://github.com/your-github/algorithm-visualizer",
    demo: "https://your-demo-link.com/algorithm-visualizer",
    icon: <Cpu className="w-8 h-8 text-blue-200" />,
    accent: "from-indigo-800 via-blue-700 to-cyan-900",
    highlight: "bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 text-transparent bg-clip-text drop-shadow-lg"
  },
];

// Tag
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-[#23293a] text-cyan-100 text-xs font-mono px-2 py-0.5 rounded mr-1 mb-1">
    {children}
  </span>
);

// Project card
const ProjectCard = ({
  project,
  focused,
  animate = true,
}: {
  project: typeof projects[0];
  focused: boolean;
  animate?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Tilt on hover for focused, simple scale for others
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let handle: any;
    let reset: any;
    if (focused) {
      handle = (e: MouseEvent) => {
        const rect = el!.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el!.style.transform = `rotateY(${x / 38}deg) rotateX(${-y / 44}deg) scale(1.04)`;
      };
      reset = () => { el!.style.transform = ""; };
      el.addEventListener("mousemove", handle);
      el.addEventListener("mouseleave", reset);
      el.addEventListener("mouseenter", () => (el!.style.transition = "transform 0.18s cubic-bezier(.44,2,.16,.89)"));
    } else {
      handle = () => { el!.style.transform = "scale(1.03)"; };
      reset = () => { el!.style.transform = ""; };
      el.addEventListener("mouseenter", handle);
      el.addEventListener("mouseleave", reset);
    }
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
      el.removeEventListener("mouseenter", reset);
    };
  }, [focused]);

  // Animate on mount
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !animate) return;
    el.classList.add("animate-fadeinup");
    setTimeout(() => {
      el.classList.remove("animate-fadeinup");
    }, 650);
  }, [animate]);

  return (
    <div
      ref={cardRef}
      className={
        `project-card group relative flex flex-col items-center justify-between
        h-[420px] w-[350px] bg-gradient-to-br from-[#16213a] via-[#151c2a] to-[#16213a]
        rounded-2xl shadow-2xl border-2 border-white/10
        transition-transform duration-300 overflow-visible
        md:h-[420px] md:w-[350px]`
      }
      style={{
        padding: "0 0 18px 0",
      }}
    >
      {/* Icon in card, perfectly centered */}
      <div className="w-full flex flex-col items-center justify-center pt-8 relative">
        <div className="relative flex items-center justify-center">
          <span
            className={`absolute z-0 blur-[18px] opacity-60 pointer-events-none left-1/2 -translate-x-1/2 w-[49px] h-[49px] bg-gradient-to-br from-white/10 via-white/0 to-transparent`}
            style={{ top: 8 }}
          />
          <span className="relative z-10 flex items-center justify-center w-[49px] h-[49px] rounded-full bg-[#181e2a] border-2 border-white/10 shadow-lg ring-2 ring-white/10">
            {project.icon}
          </span>
        </div>
      </div>
      {/* Card Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
        <h3 className={`text-2xl font-bold font-title text-center mt-5 mb-2 ${project.highlight}`}>
          {project.name}
        </h3>
        {/* Line separator */}
        <div className="relative flex justify-center w-full my-2">
          <span className={`absolute left-0 top-1/2 w-full h-[2px] bg-gradient-to-r ${project.accent} opacity-30 rounded-full`} />
          <span className="relative z-10 w-10 h-[2.5px] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full shadow-md opacity-55" />
        </div>
        <div className="text-base text-slate-100/90 font-stylish text-center mb-4 leading-relaxed">
          {project.description}
        </div>
        {/* Light line to separate content from tags/buttons */}
        <div className="w-full flex justify-center items-center my-3">
          <span className="inline-block w-[78%] h-[1.5px] bg-gradient-to-r from-white/5 via-cyan-300/15 to-white/5 rounded-full opacity-50" />
        </div>
        <div className="flex flex-wrap items-center justify-center mb-2">
          {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="flex items-center justify-center gap-2 mt-auto mb-1">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} on GitHub`}
            className="inline-flex items-center gap-1 text-white font-semibold text-xs cursor-pointer hover:text-cyan-200 transition px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-[#1a223a]/90 border border-white/10 hover:bg-cyan-900/60 shadow"
            style={{ letterSpacing: "0.02em" }}
          >
            <Github className="w-4 h-4 inline" /> Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.name}`}
              className="inline-flex items-center gap-1 text-cyan-200 font-semibold text-xs cursor-pointer hover:text-white transition px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-gradient-to-r from-cyan-800 via-blue-900 to-indigo-900 border border-cyan-500/20 hover:bg-cyan-700/80 shadow"
              style={{
                letterSpacing: "0.02em",
                marginLeft: "0.5rem",
                boxShadow: "0 1px 10px 0 rgba(24,166,250,0.10)"
              }}
            >
              <PlayCircle className="w-4 h-4 inline" /> Live Demo
            </a>
          )}
        </div>
      </div>
      {/* Decorative SVG ellipse bottom */}
      <div className="w-full flex justify-center mt-1">
        <svg width="110" height="32" viewBox="0 0 110 32" fill="none" className="opacity-55" aria-hidden="true">
          <ellipse cx="55" cy="16" rx="48" ry="12" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(55 16) scale(48 12)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.11" />
              <stop offset="0.8" stopColor="#fff" stopOpacity="0.01" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      {/* Glow border animation */}
      <span className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-cyan-400/40 transition-all duration-300 animate-cardglow" />
    </div>
  );
};

// Comming Soon Card
const ComingSoonCard = () => (
  <div
    className={`
      flex flex-col items-center justify-center
      h-[420px] w-[350px] bg-gradient-to-br from-[#222b41] via-[#1e253a] to-[#181e2a]
      rounded-2xl shadow-2xl border-2 border-white/10
      transition-transform duration-300 overflow-visible
      relative md:h-[420px] md:w-[350px]`
    }
  >
    <div className="flex flex-col items-center mt-1 mb-2">
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1e2237] border-2 border-white/15 shadow-lg ring-2 ring-white/10 mb-2">
        <Wand2 className="w-7 h-7 text-cyan-300 animate-spin-slow" />
      </span>
      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-200 via-blue-200 to-fuchsia-300 bg-clip-text text-transparent text-center mb-2 font-title tracking-wide drop-shadow-lg">
        Coming Soon...
      </h3>
      <div className="text-base text-cyan-100/80 text-center leading-relaxed font-stylish px-5">
        <span className="inline-block bg-gradient-to-r from-cyan-400/30 via-blue-200/20 to-fuchsia-200/20 px-3 py-1 rounded-lg mb-2 shadow">
          Stay tuned for our next <span className="font-bold text-purple-200">breakthrough</span> project!
        </span>
        <br />
        <span className="mt-2 text-cyan-100/80 block animate-fadeinType">
          <span className="inline-block w-1 h-1 bg-cyan-300 rounded-full mr-1 animate-pulse" />
          New ideas are in the lab...
        </span>
      </div>
    </div>
    {/* Decorative SVG ellipse bottom */}
    <div className="w-full flex justify-center mt-4">
      <svg width="110" height="32" viewBox="0 0 110 32" fill="none" className="opacity-40" aria-hidden="true">
        <ellipse cx="55" cy="16" rx="48" ry="12" fill="url(#paint0_radial)" />
        <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(55 16) scale(48 12)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.11" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0.01" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
);

const Projects = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Logic for mobile: horizontal scroll, dots, and snap
  const mobileCards = [
    ...projects.slice(0, 3),
    projects[3],
    { isComingSoon: true }
  ];

  const onMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.firstChild
      ? (el.firstChild as HTMLElement).getBoundingClientRect().width
      : 1;
    // Closest card index
    const idx = Math.round(el.scrollLeft / (cardWidth + 24)); // 24px gap
    setMobileActiveIndex(Math.min(idx, mobileCards.length - 1));
  };

  // Desktop: 2 pages, 3+2
  const displayFirst = scrollIndex === 0;
  const visibleProjects = displayFirst
    ? projects.slice(0, 3)
    : [projects[3]];

  return (
    <section className="relative py-24 px-2 md:px-0 min-h-screen bg-[#101627] overflow-x-hidden">
      {/* Section Title */}
      <div className="mx-auto max-w-3xl text-center mb-14 z-20 relative">
        <span className="inline-flex items-center gap-2 bg-gradient-to-tr from-cyan-700 to-blue-700 py-1 px-4 rounded-full text-white text-xs font-bold uppercase shadow-md tracking-widest font-mono">
          <Code2 className="w-4 h-4" />
          Projects & Works
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight font-title">
          My Top Projects
        </h2>
        <p className="mt-4 text-lg text-slate-200 font-stylish font-medium">
          <span className="text-cyan-200 font-bold">Distinctive, impactful,</span> and <span className="text-fuchsia-200 font-bold">expertly engineered</span>.
        </p>
      </div>
      <div className="w-full h-1 mt-8 mb-8 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-[2.5px] opacity-30 animate-borderpan" />

      {/* Desktop Carousel */}
      {!isMobile && (
        <div className="relative flex items-center justify-center max-w-6xl mx-auto px-2">
          {/* Left arrow */}
          <button
            className={`absolute left-0 z-30 top-1/2 -translate-y-1/2 bg-[#132035]/80 hover:bg-cyan-700/70 text-cyan-100 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 border-2 border-cyan-600/10 ${scrollIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            onClick={() => setScrollIndex(0)}
            aria-label="Scroll left"
            style={{ marginLeft: -38 }}
            disabled={scrollIndex === 0}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          {/* Cards */}
          <div
            className="flex flex-row justify-center items-stretch w-full transition-all duration-700"
            style={{
              minHeight: 430,
              gap: "44px",
              justifyContent: displayFirst ? "center" : "center"
            }}
          >
            {displayFirst && visibleProjects.map((project, idx) => (
              <div key={project.name}>
                <ProjectCard project={project} focused={idx === 1} />
              </div>
            ))}
            {!displayFirst && (
              <>
                <ProjectCard project={projects[3]} focused={true} />
                <ComingSoonCard />
              </>
            )}
          </div>
          {/* Right arrow */}
          <button
            className={`absolute right-0 z-30 top-1/2 -translate-y-1/2 bg-[#132035]/80 hover:bg-cyan-700/70 text-cyan-100 hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 border-2 border-cyan-600/10 ${scrollIndex === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            onClick={() => setScrollIndex(1)}
            aria-label="Scroll right"
            style={{ marginRight: -38 }}
            disabled={scrollIndex === 1}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile: horizontally scrollable cards, snap, app-like */}
      {isMobile && (
        <div className="relative w-full max-w-full px-0 mt-1">
          <div
            className="flex flex-row overflow-x-auto snap-x snap-mandatory pb-2 pt-1 mobile-scrollbar"
            style={{
              gap: "24px",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch"
            }}
            onScroll={onMobileScroll}
          >
            {mobileCards.map((item, idx) =>
              "isComingSoon" in item ? (
                <div
                  key="comingsoon"
                  className="shrink-0 snap-center"
                  style={{ width: "94vw", minWidth: "94vw", maxWidth: "97vw" }}
                >
                  <ComingSoonCard />
                </div>
              ) : (
                <div
                  key={item.name}
                  className="shrink-0 snap-center"
                  style={{ width: "94vw", minWidth: "94vw", maxWidth: "97vw" }}
                >
                  <ProjectCard project={item} focused={mobileActiveIndex === idx} />
                </div>
              )
            )}
          </div>
          {/* Mobile Dots */}
          <div className="flex flex-row items-center justify-center w-full mt-5 mb-1 gap-2">
            {mobileCards.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to card ${idx + 1}`}
                className={`
                  mx-[3px] w-4 h-4 rounded-full border-2
                  ${mobileActiveIndex === idx
                    ? "bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 border-cyan-200 shadow-md"
                    : "bg-[#181f2d] border-cyan-900/30"
                  }
                  transition-all duration-250 outline-none flex items-center justify-center
                `}
                onClick={() => {
                  // Scroll to this card
                  const scrollDiv = document.querySelector('.mobile-scrollbar') as HTMLDivElement;
                  if (scrollDiv) {
                    const cardWidth = scrollDiv.firstChild
                      ? (scrollDiv.firstChild as HTMLElement).getBoundingClientRect().width
                      : 1;
                    scrollDiv.scrollTo({
                      left: idx * (cardWidth + 24),
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <span className={`
                  block w-1.5 h-1.5 rounded-full
                  ${mobileActiveIndex === idx
                    ? "bg-white scale-110"
                    : "bg-cyan-700/60 scale-100"
                  }
                  transition-transform duration-150
                `}></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dots (desktop) */}
      {!isMobile && (
        <div className="flex flex-row items-center justify-center w-full mt-9 mb-2 gap-2">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              aria-label={`Scroll to set ${idx + 1}`}
              className={`
                mx-[5px] w-5 h-5 rounded-full border-2
                ${scrollIndex === idx
                  ? "bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 border-cyan-200 shadow-md"
                  : "bg-[#181f2d] border-cyan-900/30 hover:bg-cyan-900/40"
                }
                transition-all duration-250 outline-none focus:ring-2 focus:ring-cyan-400
                flex items-center justify-center
              `}
              onClick={() => setScrollIndex(idx)}
            >
              <span className={`
                block w-2 h-2 rounded-full
                ${scrollIndex === idx
                  ? "bg-white scale-110"
                  : "bg-cyan-700/60 scale-100"
                }
                transition-transform duration-200
              `}></span>
            </button>
          ))}
        </div>
      )}

      {/* Effects & Responsive */}
    </section>
  );
};

export default Projects;