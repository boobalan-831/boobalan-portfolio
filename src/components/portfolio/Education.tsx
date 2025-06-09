import {
  GraduationCap,
  School,
  Star,
  BookOpen,
  Calendar,
  MapPin,
  Award,
  TerminalSquare,
  Users2,
  Sparkle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// StatCard with creative overflow fix, NO alert!
const StatCard = ({ icon, label, value, color, badge }: any) => (
  <div
    className={`
      flex flex-col items-center justify-center rounded-3xl p-7 md:p-10 shadow-xl
      ${color}
      relative overflow-hidden group
      hover:scale-[1.07] hover:shadow-cyan-500/25 hover:shadow-2xl
      transition-transform duration-300
      font-stylish
      min-w-[225px] max-w-[340px] md:min-w-[270px] md:max-w-[420px]
      border-2 border-transparent hover:border-cyan-400/50
    `}
    style={{ boxShadow: "0 2px 30px 0 rgba(24,33,62,0.09)" }}
  >
    <span className="mb-2">{icon}</span>
    <span className="relative w-full flex items-center justify-center h-16 md:h-20">
      <span
        className={`
          text-4xl md:text-5xl font-black text-white tracking-widest text-center inline-block whitespace-nowrap
          ${String(value).length > 10 ? "overflow-hidden block w-full" : ""}
        `}
        style={{
          letterSpacing: '0.05em',
          maxWidth: "100%",
          fontFamily: "'Space Grotesk', 'Montserrat', 'Inter', sans-serif"
        }}
      >
        {String(value).length > 10 ? (
          <span className="relative w-full block overflow-hidden">
            <span
              className="inline-block animate-marquee"
              style={{ minWidth: "100%", animationDuration: "4s" }}
            >
              {value}
            </span>
          </span>
        ) : value}
      </span>
    </span>
    <span className="text-base md:text-lg font-bold mt-1 text-white/90 tracking-wide">{label}</span>
    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-2 bg-white/10 rounded-full blur-md opacity-70 group-hover:opacity-90 transition-all duration-300"></span>
    {badge && (
      <span className="absolute -top-3 -right-3 px-3 py-1 rounded-lg bg-cyan-400/90 text-slate-900 text-xs font-bold shadow-md tracking-wider font-mono animate-badge-bounce z-10">
        {badge}
      </span>
    )}
    <Sparkle className="w-5 h-5 text-white/15 absolute top-3 right-3" />
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0);}
        100% { transform: translateX(-50%);}
      }
      .animate-marquee {
        animation: marquee 4s linear infinite;
      }
      @keyframes badge-bounce {
        0%,100%{transform:translateY(0);}
        30%{transform:translateY(-9px);}
        60%{transform:translateY(2px);}
      }
      .animate-badge-bounce{animation:badge-bounce 2.4s cubic-bezier(.53,1.73,.58,.94) infinite;}
    `}</style>
  </div>
);

// Timeline card with right placement for HSC card
const EduCard = ({
  icon,
  degree,
  status,
  statusColor,
  institution,
  location,
  score,
  year,
  color,
  highlights,
  delay,
  alignRight,
}: any) => (
  <div
    className={`
      w-full max-w-2xl md:min-w-[540px] md:max-w-[670px] rounded-3xl border border-slate-800 px-10 py-9 shadow-xl
      ${color}
      relative overflow-visible
      hover:border-cyan-400/45 hover:shadow-2xl hover:scale-105 transition-all duration-300
      animate-fadeinup
      flex
      font-stylish
      ${alignRight ? "md:ml-auto" : ""}
    `}
    style={{ animationDelay: `${delay}ms`, boxShadow: "0 3px 28px 0 rgba(24,33,62,0.11)" }}
  >
    <div className="hidden md:block absolute -left-4 top-6 bottom-6 w-2 rounded-full bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent opacity-80" />
    <div className="flex flex-col w-full z-10">
      <div className="flex items-center gap-4 mb-3">
        <span className="bg-white/10 rounded-full p-2">{icon}</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-wider font-title">
          {degree}
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border border-white/15 ${statusColor}`}>
          {status}
        </span>
      </div>
      <div className="text-lg font-semibold text-cyan-100 mb-1 font-title">{institution}</div>
      <div className="flex flex-wrap items-center gap-3 mb-3 text-md text-slate-300 font-semibold">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </span>
        <span className="flex items-center gap-1">
          <Award className="w-4 h-4 text-amber-300" />
          {score}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {year}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {highlights.map((h: string, i: number) => (
          <span
            key={h}
            className="px-3 py-1 text-xs rounded-full font-semibold text-cyan-100 bg-gradient-to-r from-cyan-900 to-cyan-600 border border-cyan-400/10 flex items-center gap-1"
          >
            <Star className="w-3 h-3 text-cyan-300" />
            {h}
          </span>
        ))}
      </div>
    </div>
    <Users2 className="absolute -bottom-3 -right-4 w-8 h-8 text-blue-400/10" />
    <TerminalSquare className="absolute -top-3 -left-4 w-6 h-6 text-pink-400/10" />
  </div>
);

const educationData = [
  {
    degree: "B.E. Computer Science & Engineering",
    institution: "R.M.K College Of Engineering And Technology",
    location: "Chennai, Tamil Nadu",
    year: "2023 - 2027",
    score: "CGPA: 8.0 / 10",
    status: "Pursuing",
    highlights: [
      "Hackathon participations",
      "Open Source Contributor",
      "Tech Club Core",
      "Full-stack Projects",
    ],
    icon: <GraduationCap className="w-7 h-7 text-cyan-400" />,
    color: "bg-gradient-to-br from-[#181d2f] via-[#1b2341] to-[#101627]",
    statusColor: "bg-emerald-800 text-emerald-200",
  },
  {
    degree: "HSC (12th Grade) - Science",
    institution: "Sri Divya Chaitanya Matric Higher Secondary School",
    location: "Sholighur, Tamil Nadu",
    year: "2022 - 2023",
    score: "87%",
    status: "Completed",
    highlights: [
      "Science Exhibition Finalist",
      "Class Representative",
      "Math Olympiad",
    ],
    icon: <School className="w-7 h-7 text-pink-400" />,
    color: "bg-gradient-to-br from-[#241b3a] via-[#2a173b] to-[#101627]",
    statusColor: "bg-blue-900 text-blue-200",
  },
];

const Education = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 px-2 md:px-0 min-h-screen overflow-x-hidden"
      style={{
        background: "#101627",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif",
      }}
    >
      {/* Animated SVG BG */}
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-36 md:h-56"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="bggr1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#26c6ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7e33fd" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M0,120 Q150,60 300,120 T500,120 L500,0 L0,0 Z"
          fill="url(#bggr1)"
          opacity="0.6"
        />
        <circle cx="70" cy="30" r="24" fill="#26c6ff" opacity="0.08">
          <animate attributeName="cx" from="70" to="110" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="410" cy="110" r="17" fill="#7e33fd" opacity="0.12">
          <animate attributeName="cy" from="110" to="65" dur="4.2s" repeatCount="indefinite" />
        </circle>
      </svg>
      {/* Decorative sparkles */}
      <Sparkle className="absolute left-10 top-10 w-6 h-6 text-cyan-300/10" />
      <Sparkle className="absolute right-10 top-24 w-8 h-8 text-pink-300/13" />
      <Sparkle className="absolute left-1/2 bottom-16 w-4 h-4 text-amber-200/10" />
      {/* Section Title */}
      <div className="mx-auto max-w-3xl text-center mb-14">
        <span className="inline-flex items-center gap-2 bg-gradient-to-tr from-cyan-700 to-blue-700 py-1 px-4 rounded-full text-white text-xs font-bold uppercase shadow-md tracking-widest font-mono">
          <BookOpen className="w-4 h-4" />
          My Academic Timeline
        </span>
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-tight font-title">
          Education & Achievements
        </h2>
      </div>
      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-cyan-700 via-blue-500 to-purple-800 rounded-full opacity-15"></div>
        <div className="flex flex-col gap-16 z-10 relative">
          {educationData.map((edu, idx) => (
            <div
              key={edu.degree}
              className={`
                flex flex-col md:flex-row items-center md:justify-between group
                ${idx % 2 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* Icon & Timeline Dot */}
              <div className="flex flex-col items-center">
                <div className="rounded-full p-3 shadow-lg bg-gradient-to-br from-white/10 to-blue-500/10">
                  {edu.icon}
                </div>
                {idx < educationData.length - 1 && (
                  <div className="h-16 w-1 bg-gradient-to-b from-cyan-700 to-purple-700 opacity-25 my-2"></div>
                )}
              </div>
              {/* Card */}
              <div className={`flex-1 flex flex-col mx-6 mt-6 md:mt-0`}>
                <EduCard {...edu} delay={idx * 180} alignRight={idx === 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats Cards */}
      <div className="mt-20 flex flex-wrap justify-center gap-5">
        <StatCard
          icon={
            <TerminalSquare className="w-8 h-8 text-cyan-300" />
          }
          label="Years Coding"
          value="2+"
          color="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900"
        />
        <StatCard
          icon={<Award className="w-8 h-8 text-yellow-300" />}
          label="Academic Avg"
          value="87% / 8.0"
          color="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900"
        />
        <StatCard
          icon={
            <GraduationCap className="w-9 h-9 text-purple-400" />
          }
          label="Identity"
          value="Software Developer"
          color="bg-gradient-to-br from-purple-800 via-pink-800 to-pink-900"
        />
      </div>
      {/* Custom Fonts - add to your global CSS or Tailwind config */}
      <style>{`
        .font-title { font-family: 'Montserrat', 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-stylish { font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes fadeinup {
          0% { opacity: 0; transform: translateY(48px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeinup { animation: fadeinup 1.2s cubic-bezier(.77,0,.18,1) both;}
      `}</style>
    </section>
  );
};

export default Education;