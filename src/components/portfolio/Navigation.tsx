

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import "@/styles/navigation.css";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Enhanced smooth scrolling for all devices
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Use requestAnimationFrame for smoother animation on all devices
      const smoothScroll = (targetPosition: number) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // Smooth duration
        let start: number | null = null;

        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const ease = easeInOutCubic(progress / duration);
          
          window.scrollTo(0, startPosition + distance * ease);
          
          if (progress < duration) {
            requestAnimationFrame(step);
          } else {
            // For accessibility: set tabindex and focus for section highlight
            element.setAttribute("tabindex", "-1");
            setTimeout(() => {
              element.focus();
            }, 100);
          }
        };

        requestAnimationFrame(step);
      };

      // Easing function for smooth animation
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      smoothScroll(offsetPosition);
    }
    setIsMobileMenuOpen(false);
  };

  const downloadResume = () => {
    window.open("https://drive.google.com/file/d/1ZqqYr4PrtxnsNGxfgKV2Xx6HV6z9oVyF/view?usp=sharing", "_blank");
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Education", "Certifications", "Contact"];

  return (
    <>
      <nav className={`header fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "bg-slate-900/95 backdrop-blur-lg shadow-xl border-b border-slate-700/50" 
          : "bg-slate-900/80 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="nav-logo text-2xl font-bold font-['Poppins'] bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              Boobalan D
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`nav-link-enhanced relative font-['Poppins'] font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-400 nav-link-active'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  type="button"
                >
                  <span className="nav-link-text relative">{item}</span>
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
              
              {/* Download Resume Button */}
              <Button 
                className="resume-btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-white hover:to-white hover:text-blue-500 text-white font-['Poppins'] font-medium items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 border border-transparent hover:border-blue-500 transform hover:scale-105 hover:shadow-lg"
                onClick={downloadResume}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`hamburger-line transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-40 transition-all duration-400 ${
        isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-400 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-lg border-l border-slate-700 transform transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 px-8">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-left py-4 text-xl transition-all duration-300 border-b border-slate-700 nav-drawer-item transform hover:translate-x-2 ${
                  activeSection === item.toLowerCase()
                    ? 'text-blue-400 font-semibold'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                type="button"
              >
                <span className="nav-link-text relative">
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </span>
              </button>
            ))}
            
            <Button 
              className="resume-btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-white hover:to-white hover:text-blue-500 text-white mt-8 font-['Poppins'] font-medium flex items-center gap-2 justify-center rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={downloadResume}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;

