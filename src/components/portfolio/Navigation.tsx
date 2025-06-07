
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect current section
      const sections = ["home", "about", "skills", "projects", "services", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Services", id: "services" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <>
      <nav className={`header fixed top-0 w-full z-50 transition-all duration-300 pr-8 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
          : "bg-white/90 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="nav-logo text-2xl font-bold font-sans text-gray-800">
              Boobalan D
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-auto">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link-enhanced transition-colors duration-300 relative font-medium px-4 py-2 rounded-lg ${
                        activeSection === item.id 
                          ? "text-blue-600 bg-blue-50" 
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Download CV Button */}
              <a 
                href="https://drive.google.com/file/d/1ZqqYr4PrtxnsNGxfgKV2Xx6HV6z9oVyF/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-btn bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium flex items-center gap-2 px-6 py-3 ml-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-purple-700"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 text-gray-700 hover:text-blue-600 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
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
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-400 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-lg border-l border-gray-200 transform transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 px-8">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-4 text-xl transition-all duration-300 border-b border-gray-200 nav-drawer-item font-medium ${
                  activeSection === item.id 
                    ? "text-blue-600" 
                    : "text-gray-700 hover:text-blue-600"
                } ${isMobileMenuOpen ? 'animate-slide-in-right' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
              </button>
            ))}
            
            <a 
              href="https://drive.google.com/file/d/1ZqqYr4PrtxnsNGxfgKV2Xx6HV6z9oVyF/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn bg-gradient-to-r from-purple-500 to-purple-600 text-white mt-8 font-medium flex items-center gap-2 justify-center rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-purple-600 hover:to-purple-700"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
