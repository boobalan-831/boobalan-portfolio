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
    <section id="certifications" className="relative py-16 md:py-28 bg-[var(--main-bg-dark)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="absolute left-0 top-0 w-72 h-72 opacity-20 blur-2xl" style={{filter: "blur(80px)"}}><circle cx="130" cy="130" r="130" fill="#38bdf8" /></svg>
        <svg className="absolute right-0 bottom-0 w-72 h-72 opacity-20 blur-2xl" style={{filter: "blur(80px)"}}><circle cx="130" cy="130" r="130" fill="#6366f1" /></svg>
      </div>
      <div className="relative z-10 text-center mb-8 md:mb-12">
        <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg animate-fade-in-down">
          My Achievements & Certifications
        </h2>
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-800 to-blue-700 rounded-full shadow font-bold text-cyan-200 text-base md:text-lg tracking-wide mr-2 animate-pulse">
            #LifelongLearner
          </span>
        </div>
        <p className="text-cyan-100 mt-3 text-lg md:text-2xl font-medium max-w-xl mx-auto animate-fade-in-up">
          A journey of continuous <span className="text-blue-300 font-bold">learning</span> and <span className="text-purple-300 font-bold">excellence</span>.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8 px-2">
        <input
          className="w-full md:w-80 px-4 py-2 rounded-full bg-slate-800 text-cyan-100 placeholder-cyan-400 shadow-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          type="text"
          placeholder="Search certificates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-10 px-2">
        <button className={`tag-chip ${!selectedTag ? "active" : ""}`} onClick={() => setSelectedTag(null)}>All</button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-chip ${selectedTag === tag ? "active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >{tag}</button>
        ))}
      </div>
      <div ref={gridRef} className={`relative z-10 grid gap-8 ${isMobile ? "grid-cols-1" : "sm:grid-cols-2 xl:grid-cols-3"} max-w-6xl mx-auto px-2`}>
        {visibleCerts.length === 0 && (
          <div className="text-cyan-200 text-center col-span-full">No certificates found.</div>
        )}
        {visibleCerts.map((cert, idx) => (
          <div
            key={`${cert.title}-${idx}`}
            ref={el => cardRefs.current[idx] = el}
            className="opacity-0 transition-opacity duration-700 group relative"
            tabIndex={0}
            style={{ animationDelay: `${idx * 70}ms` }}
          >
            <Card
              className="certificate-card bg-gradient-to-br from-[#1e293b]/80 via-[#19203a]/90 to-[#283557]/80 border-0 shadow-2xl hover:shadow-cyan-300/30 transition-transform hover:scale-[1.03] cursor-pointer"
              onClick={() => isMobile ? handleMobileQuickView(idx) : setShowModal(idx)}
              aria-label={`View details for ${cert.title}`}
            >
              <CardContent className="p-6 relative">
                {cert.isNew && (
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-xs font-bold text-black px-3 py-1 rounded-full shadow-lg animate-bounce z-20">
                    NEW
                  </span>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span>{cert.icon}</span>
                  <span className="text-xs font-bold rounded-full px-3 py-1 bg-gradient-to-r from-blue-800 via-cyan-800 to-purple-800 text-cyan-200 border border-blue-600/40 shadow">
                    {cert.year}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-blue-200 mb-1">{cert.title}</h3>
                <h4 className="text-base font-semibold text-cyan-300 mb-2">{cert.subtitle}</h4>
                <p className="text-cyan-100 font-medium mb-2">{cert.provider}</p>
                <p className="text-gray-300 text-sm line-clamp-3">{cert.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {cert.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-cyan-800/70 text-cyan-200 px-2 py-0.5 rounded-full font-semibold">{tag}</span>
                  ))}
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold shadow hover:scale-105 hover:shadow-lg transition-all text-sm"
                    onClick={e => e.stopPropagation()}
                  >
                    View Credential
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {itemsToShow < filteredCerts.length ? (
          <button
            className="px-6 py-2 rounded-full font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg hover:scale-105 transition-all focus:outline-none animate-fade-in-up"
            onClick={handleShowMore}
          >Show More</button>
        ) : filteredCerts.length > (isMobile ? MOBILE_CARDS_PER_PAGE * INITIAL_ROWS : CERTIFICATES_PER_ROW * INITIAL_ROWS) ? (
          <button
            className="px-6 py-2 rounded-full font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-black shadow-lg hover:scale-105 transition-all focus:outline-none animate-fade-in-up"
            onClick={handleShowLess}
          >Show Less</button>
        ) : null}
      </div>
      {!isMobile && typeof showModal === 'number' && visibleCerts[showModal] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-fade-in-up px-4"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-gradient-to-br from-[#1e293b]/90 via-[#19203a]/95 to-[#283557]/90 rounded-2xl p-8 max-w-md w-full shadow-2xl relative transition-all animate-fade-in-up"
            onClick={e => e.stopPropagation()}
            tabIndex={0}
          >
            <button
              className="absolute top-3 right-3 text-cyan-200 hover:text-blue-400 text-xl font-bold"
              onClick={() => setShowModal(null)}
              aria-label="Close certificate details"
            >×</button>
            <div className="mb-4">{visibleCerts[showModal].icon}</div>
            <h3 className="text-2xl font-extrabold text-blue-200 mb-1">{visibleCerts[showModal].title}</h3>
            <h4 className="text-lg font-semibold text-cyan-200 mb-2">{visibleCerts[showModal].subtitle}</h4>
            <p className="text-cyan-100 font-medium mb-2">{visibleCerts[showModal].provider} <span className="ml-2 text-xs bg-cyan-800/60 px-2 py-0.5 rounded">{visibleCerts[showModal].year}</span></p>
            <p className="text-gray-200 text-base leading-relaxed mb-3">{visibleCerts[showModal].description}</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {visibleCerts[showModal].tags?.map(tag => (
                <span key={tag} className="text-xs bg-cyan-800/70 text-cyan-200 px-2 py-0.5 rounded-full font-semibold">{tag}</span>
              ))}
            </div>
            {visibleCerts[showModal].link && (
              <a
                href={visibleCerts[showModal].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold shadow hover:scale-105 hover:shadow-lg transition-all"
              >
                🔗 View Credential
              </a>
            )}
          </div>
        </div>
      )}
      {isMobile && showMobilePreview.show && (
        <div
          id="mobile-cert-preview"
          className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-[#1e293b]/95 via-[#283557]/90 to-transparent px-4 py-6 rounded-t-3xl shadow-2xl animate-fade-in-up"
        >
          <div className="flex justify-between items-center mb-2">
            <span />
            <button
              className="text-cyan-200 hover:text-blue-400 text-2xl font-bold"
              onClick={() => setShowMobilePreview({ idx: 0, show: false })}
              aria-label="Close quick view"
            >×</button>
          </div>
          <div className="mb-3">{visibleCerts[showMobilePreview.idx].icon}</div>
          <h3 className="text-xl font-extrabold text-blue-200 mb-1">{visibleCerts[showMobilePreview.idx].title}</h3>
          <h4 className="text-base font-semibold text-cyan-200 mb-2">{visibleCerts[showMobilePreview.idx].subtitle}</h4>
          <p className="text-cyan-100 font-medium mb-2">{visibleCerts[showMobilePreview.idx].provider} <span className="ml-2 text-xs bg-cyan-800/60 px-2 py-0.5 rounded">{visibleCerts[showMobilePreview.idx].year}</span></p>
          <p className="text-gray-200 text-sm leading-relaxed mb-2">{visibleCerts[showMobilePreview.idx].description}</p>
          <div className="flex gap-2 mb-2 flex-wrap">
            {visibleCerts[showMobilePreview.idx].tags?.map(tag => (
              <span key={tag} className="text-xs bg-cyan-800/70 text-cyan-200 px-2 py-0.5 rounded-full font-semibold">{tag}</span>
            ))}
          </div>
          {visibleCerts[showMobilePreview.idx].link && (
            <a
              href={visibleCerts[showMobilePreview.idx].link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold shadow hover:scale-105 hover:shadow-lg transition-all"
            >
              🔗 View Credential
            </a>
          )}
        </div>
      )}
      <div className="relative z-10 text-center mt-20">
        <p className="text-cyan-200 text-lg md:text-xl font-semibold animate-fade-in-up">
          Want to know more? <a href="#contact" className="underline hover:text-blue-300 transition">Let’s connect and collaborate!</a>
        </p>
      </div>
    </section>
  );
}