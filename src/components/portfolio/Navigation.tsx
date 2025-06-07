import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const downloadResume = () => {
    window.open("https://drive.google.com/file/d/1ZqqYr4PrtxnsNGxfgKV2Xx6HV6z9oVyF/view?usp=sharing", "_blank");
  };

  const navItems = ["Home", "About", "Skills", "Projects", "Services", "Certifications", "Contact"];

  return (
    <>
      <nav className={`header fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700" 
          : "bg-slate-900/80 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="nav-logo text-2xl font-bold font-['Poppins'] bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Boobalan D
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="nav-link-enhanced text-gray-300 hover:text-blue-400 transition-colors duration-300 relative font-['Poppins'] font-medium"
                >
                  {item}
                </button>
              ))}
              
              {/* Download Resume Button */}
              <Button 
                className="resume-btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-white hover:to-white hover:text-blue-500 text-white font-['Poppins'] font-medium items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 border border-transparent hover:border-blue-500"
                onClick={downloadResume}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1 text-gray-300 hover:text-blue-400 transition-colors duration-300"
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
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-lg border-l border-slate-700 transform transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full pt-20 px-8">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-left py-4 text-xl text-gray-300 hover:text-blue-400 transition-all duration-300 border-b border-slate-700 nav-drawer-item ${
                  isMobileMenuOpen ? 'animate-slide-in-right' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </button>
            ))}
            
            <Button 
              className="resume-btn bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-white hover:to-white hover:text-blue-500 text-white mt-8 font-['Poppins'] font-medium flex items-center gap-2 justify-center rounded-full"
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
