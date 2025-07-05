
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Brain, Database, Globe, Laptop, Award } from "lucide-react";
import "../../styles/Certifications.css";

const certificates = [
  {
    title: "Google Cloud Badge",
    subtitle: "Cloud Computing Fundamentals",
    provider: "Google Cloud",
    year: "2024",
    description: "Mastered the essentials of cloud computing and Google Cloud Platform services, including core infrastructure, networking, and security.",
    icon: <Cloud className="text-blue-400 w-7 h-7" />,
    link: "https://www.credential.net/google-cloud-badge",
    tags: ["Cloud", "Google", "Fundamentals", "2024"],
    isNew: true,
  },
  {
    title: "AI For Everyone",
    subtitle: "Introduction to Artificial Intelligence",
    provider: "Google via Coursera",
    year: "2024",
    description: "Comprehensive intro to AI concepts: machine learning, neural networks, and real-world applications.",
    icon: <Brain className="text-cyan-300 w-7 h-7" />,
    link: "https://www.credential.net/ai-for-everyone",
    tags: ["AI", "Coursera", "Google", "2024"],
    isNew: false,
  },
  {
    title: "NPTEL DBMS",
    subtitle: "Database Management Systems",
    provider: "NPTEL",
    year: "2023",
    description: "Advanced design, modeling, and management of modern database systems.",
    icon: <Database className="text-yellow-300 w-7 h-7" />,
    link: "https://www.credential.net/nptel-dbms",
    tags: ["Database", "NPTEL", "2023", "Backend"],
    isNew: false,
  },
  {
    title: "NPTEL Distributed Systems",
    subtitle: "Distributed Computing",
    provider: "NPTEL",
    year: "2023",
    description: "Principles and practices of distributed system architecture.",
    icon: <Globe className="text-purple-300 w-7 h-7" />,
    link: "https://www.credential.net/nptel-distributed",
    tags: ["Distributed", "NPTEL", "2023", "Systems"],
    isNew: false,
  },
  {
    title: "Full Stack Developer",
    subtitle: "Web Development Specialization",
    provider: "Coursera",
    year: "2022",
    description: "Covered React, Node, Express, MongoDB, and modern web practices.",
    icon: <Laptop className="text-green-300 w-7 h-7" />,
    link: "https://www.credential.net/fullstack-dev",
    tags: ["Web", "FullStack", "Coursera", "2022"],
    isNew: false,
  },
  {
    title: "AWS Cloud Practitioner",
    subtitle: "AWS Certified Cloud Practitioner",
    provider: "AWS",
    year: "2023",
    description: "Demonstrated knowledge of AWS Cloud, global infrastructure, security, and billing.",
    icon: <Cloud className="text-indigo-400 w-7 h-7" />,
    link: "https://www.credential.net/aws-cloud-practitioner",
    tags: ["Cloud", "AWS", "2023", "Fundamentals"],
    isNew: false,
  },
  {
    title: "Python for Everybody",
    subtitle: "Programming Basics",
    provider: "Coursera",
    year: "2022",
    description: "Acquired foundational skills in Python programming and software fundamentals.",
    icon: <Award className="text-pink-300 w-7 h-7" />,
    link: "https://www.credential.net/python-everybody",
    tags: ["Python", "Programming", "Coursera", "2022"],
    isNew: false,
  },
  {
    title: "Azure Fundamentals",
    subtitle: "Microsoft Certified: AZ-900",
    provider: "Microsoft",
    year: "2023",
    description: "Fundamental knowledge of Microsoft Azure cloud concepts, services, and solutions.",
    icon: <Cloud className="text-blue-300 w-7 h-7" />,
    link: "https://www.credential.net/azure-fundamentals",
    tags: ["Cloud", "Azure", "Microsoft", "2023"],
    isNew: false,
  },
  {
    title: "React Developer",
    subtitle: "Frontend Library Specialization",
    provider: "Codecademy",
    year: "2023",
    description: "Built interactive UIs and mastered the React ecosystem.",
    icon: <Laptop className="text-blue-200 w-7 h-7" />,
    link: "https://www.credential.net/react-developer",
    tags: ["React", "Frontend", "Codecademy", "2023"],
    isNew: false,
  },
  {
    title: "OOP with Java",
    subtitle: "Object Oriented Programming",
    provider: "NPTEL",
    year: "2022",
    description: "Learned object-oriented concepts & implementation in Java.",
    icon: <Award className="text-orange-300 w-7 h-7" />,
    link: "https://www.credential.net/oop-java",
    tags: ["Java", "OOP", "NPTEL", "2022"],
    isNew: false,
  },
];

const allTags = [
  "Cloud",
  "AI",
  "Database",
  "Web",
  "Programming",
  "React",
  "Java",
  "2024",
];

const CERTIFICATES_PER_ROW = 3;
const INITIAL_ROWS = 2;
const MOBILE_CARDS_PER_PAGE = 2;

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handler = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return size;
}

function useAnimateOnScroll(count: number) {
  const ref = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const obs = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );
    ref.current.forEach(el => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [count]);
  return ref;
}

export default function Certifications() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState<number | null>(null);
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState<{ idx: number; show: boolean }>({ idx: 0, show: false });

  const [width] = useWindowSize();

  useEffect(() => {
    setIsMobile(width < 640);
  }, [width]);

  const filteredCerts = certificates
    .filter(cert =>
      (!selectedTag || cert.tags?.includes(selectedTag)) &&
      (
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        cert.provider.toLowerCase().includes(search.toLowerCase()) ||
        cert.year.includes(search)
      )
    );

  const itemsToShow = isMobile
    ? MOBILE_CARDS_PER_PAGE * rows
    : CERTIFICATES_PER_ROW * rows;

  const visibleCerts = filteredCerts.slice(0, itemsToShow);

  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useAnimateOnScroll(visibleCerts.length);

  const handleShowMore = () => setRows(r => r + 2);
  const handleShowLess = () => {
    setRows(INITIAL_ROWS);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  function handleMobileQuickView(idx: number) {
    setShowMobilePreview({ idx, show: true });
    setTimeout(() => {
      const el = document.getElementById("mobile-cert-preview");
      el?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 200);
  }

  return (
    <section id="certifications" className="relative py-16 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-10 top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-10 bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute left-1/2 top-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent tracking-tight mb-4 animate-fade-in-down">
          Certifications & Achievements
        </h2>
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 rounded-full shadow-lg font-bold text-white text-base md:text-lg tracking-wide backdrop-blur-sm border border-blue-400/20">
            #ContinuousLearning
          </span>
        </div>
        <p className="text-slate-300 mt-4 text-lg md:text-xl font-medium max-w-2xl mx-auto animate-fade-in-up">
          A journey of continuous <span className="text-blue-400 font-bold">growth</span> and professional <span className="text-indigo-400 font-bold">excellence</span>.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 px-4">
        <input
          className="w-full md:w-80 px-6 py-3 rounded-2xl bg-slate-800/80 backdrop-blur-sm text-white placeholder-slate-400 shadow-xl border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300"
          type="text"
          placeholder="🔍 Search certificates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
        <button 
          className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 border ${
            !selectedTag 
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-blue-400/50" 
              : "bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 border-slate-600/50"
          }`}
          onClick={() => setSelectedTag(null)}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 border ${
              selectedTag === tag
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-blue-400/50"
                : "bg-slate-700/80 text-slate-300 hover:bg-slate-600/80 border-slate-600/50"
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div ref={gridRef} className={`relative z-10 grid gap-8 ${isMobile ? "grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"} max-w-7xl mx-auto px-4`}>
        {visibleCerts.length === 0 && (
          <div className="text-slate-400 text-center col-span-full text-lg">
            No certificates found matching your criteria.
          </div>
        )}
        {visibleCerts.map((cert, idx) => (
          <div
            key={`${cert.title}-${idx}`}
            ref={el => cardRefs.current[idx] = el}
            className="opacity-0 transition-all duration-700 group"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <Card
              className="h-full bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 backdrop-blur-sm border border-slate-600/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:border-blue-400/50 cursor-pointer group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:via-slate-600/80 group-hover:to-slate-700/90"
              onClick={() => isMobile ? handleMobileQuickView(idx) : setShowModal(idx)}
            >
              <CardContent className="p-6 relative h-full flex flex-col">
                {cert.isNew && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-xs font-bold text-black px-3 py-1 rounded-full shadow-lg animate-bounce z-10">
                    NEW
                  </span>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/30">
                    {cert.icon}
                  </div>
                  <span className="text-xs font-bold rounded-full px-3 py-1 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white border border-blue-400/30 shadow-md">
                    {cert.year}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {cert.title}
                  </h3>
                  <h4 className="text-base font-semibold text-blue-300 mb-3">
                    {cert.subtitle}
                  </h4>
                  <p className="text-slate-300 font-medium mb-3 text-sm">
                    {cert.provider}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {cert.tags?.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-slate-600/60 text-slate-200 px-2 py-1 rounded-full font-semibold border border-slate-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 text-sm"
                      onClick={e => e.stopPropagation()}
                    >
                      <span>View Credential</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {itemsToShow < filteredCerts.length ? (
          <button
            className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            onClick={handleShowMore}
          >
            Show More Certificates
          </button>
        ) : filteredCerts.length > (isMobile ? MOBILE_CARDS_PER_PAGE * INITIAL_ROWS : CERTIFICATES_PER_ROW * INITIAL_ROWS) ? (
          <button
            className="px-8 py-3 rounded-full font-bold bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        ) : null}
      </div>

      {/* Desktop Modal */}
      {!isMobile && typeof showModal === 'number' && visibleCerts[showModal] && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-800/95 via-slate-700/90 to-slate-800/95 backdrop-blur-md rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-slate-600/50 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold transition-colors"
              onClick={() => setShowModal(null)}
            >
              ×
            </button>
            
            <div className="mb-6 p-3 bg-slate-700/50 rounded-lg w-fit border border-slate-600/30">
              {visibleCerts[showModal].icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">
              {visibleCerts[showModal].title}
            </h3>
            <h4 className="text-lg font-semibold text-blue-300 mb-3">
              {visibleCerts[showModal].subtitle}
            </h4>
            <p className="text-slate-300 font-medium mb-4">
              {visibleCerts[showModal].provider} 
              <span className="ml-3 text-xs bg-slate-600/60 px-2 py-1 rounded border border-slate-500/30">
                {visibleCerts[showModal].year}
              </span>
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              {visibleCerts[showModal].description}
            </p>
            
            <div className="flex gap-2 mb-6 flex-wrap">
              {visibleCerts[showModal].tags?.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs bg-slate-600/60 text-slate-200 px-2 py-1 rounded-full font-semibold border border-slate-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {visibleCerts[showModal].link && (
              <a
                href={visibleCerts[showModal].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
              >
                <span>View Credential</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Mobile Preview */}
      {isMobile && showMobilePreview.show && (
        <div
          id="mobile-cert-preview"
          className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-slate-800/95 via-slate-700/90 to-transparent backdrop-blur-md px-6 py-8 rounded-t-3xl shadow-2xl border-t border-slate-600/50"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="w-8 h-1 bg-slate-500 rounded-full mx-auto"></div>
            <button
              className="text-slate-400 hover:text-white text-2xl font-bold transition-colors"
              onClick={() => setShowMobilePreview({ idx: 0, show: false })}
            >
              ×
            </button>
          </div>
          
          <div className="mb-4 p-2 bg-slate-700/50 rounded-lg w-fit border border-slate-600/30">
            {visibleCerts[showMobilePreview.idx].icon}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {visibleCerts[showMobilePreview.idx].title}
          </h3>
          <h4 className="text-base font-semibold text-blue-300 mb-2">
            {visibleCerts[showMobilePreview.idx].subtitle}
          </h4>
          <p className="text-slate-300 font-medium mb-3">
            {visibleCerts[showMobilePreview.idx].provider} 
            <span className="ml-2 text-xs bg-slate-600/60 px-2 py-1 rounded border border-slate-500/30">
              {visibleCerts[showMobilePreview.idx].year}
            </span>
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {visibleCerts[showMobilePreview.idx].description}
          </p>
          
          <div className="flex gap-2 mb-4 flex-wrap">
            {visibleCerts[showMobilePreview.idx].tags?.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-slate-600/60 text-slate-200 px-2 py-1 rounded-full font-semibold border border-slate-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {visibleCerts[showMobilePreview.idx].link && (
            <a
              href={visibleCerts[showMobilePreview.idx].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              <span>View Credential</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      )}

      <div className="relative z-10 text-center mt-20">
        <p className="text-slate-300 text-lg md:text-xl font-medium">
          Interested in collaborating? <a href="#contact" className="text-blue-400 hover:text-blue-300 underline transition-colors font-semibold">Let's connect!</a>
        </p>
      </div>
    </section>
  );
}
