
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Cloud Enthusiast | Full-Stack Developer | Problem Solver";
  const heroRef = useScrollReveal();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setShowCursor(false);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize background based on screen size
    const initBackground = () => {
      const hero = document.querySelector('.hero');
      if (hero) {
        if (window.innerWidth < 640) {
          hero.classList.add('css-particles-bg');
        } else {
          hero.classList.remove('css-particles-bg');
        }
      }
    };

    initBackground();
    window.addEventListener('resize', initBackground);
    return () => window.removeEventListener('resize', initBackground);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} id="home" className="hero min-h-screen flex items-center justify-center relative overflow-hidden page-container">
      {/* Mobile CSS Particles Background */}
      <div className="css-particles-overlay absolute inset-0 pointer-events-none opacity-10 z-0"></div>

      {/* Desktop Floating Tech Icons Background */}
      <div className="tech-icons-container absolute inset-0 pointer-events-none hidden sm:block">
        <div className="tech-icon tech-icon-1" style={{ left: '10%', animationDuration: '6s' }}>{"{ }"}</div>
        <div className="tech-icon tech-icon-2" style={{ left: '20%', animationDuration: '8s' }}>{"</>"}</div>
        <div className="tech-icon tech-icon-3" style={{ left: '80%', animationDuration: '7s' }}>{"Σ"}</div>
        <div className="tech-icon tech-icon-4" style={{ left: '90%', animationDuration: '5s' }}>{"⚙"}</div>
        <div className="tech-icon tech-icon-5" style={{ left: '70%', animationDuration: '6.5s' }}>{"λ"}</div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile and Tablet Layout */}
        <div className="text-center lg:hidden">
          {/* Profile Picture */}
          <div className="hero-profile animate-scale-in mb-6 sm:mb-8">
            <div className="profile-photo w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group hover:scale-105">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="https://postimage.me/images/2025/05/28/4333829_applicantPhotoFile.jpg" 
                  alt="Boobalan D - Full Stack Developer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Heading */}
            <h1 className="hero-title animate-fade-slide-up stagger-1 text-2xl sm:text-3xl md:text-4xl">
              Hi, I'm <span className="hero-name-highlight">Boobalan D</span>
            </h1>
            
            {/* Subtitle with typing effect */}
            <div className="hero-subtitle-container animate-fade-slide-up stagger-2">
              <div className="hero-subtitle text-sm sm:text-base md:text-lg">
                <span className={`${showCursor ? 'typing-cursor' : ''}`}>
                  {displayText}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cta-container flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-slide-up stagger-3">
              <Button 
                size="lg"
                className="cta-primary w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
          {/* Profile Picture - Left Side */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start">
            <div className="hero-profile animate-scale-in">
              <div className="profile-photo w-64 h-64 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-1 shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://postimage.me/images/2025/05/28/4333829_applicantPhotoFile.jpg" 
                    alt="Boobalan D - Full Stack Developer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content - Right Side */}
          <div className="lg:col-span-3 text-left space-y-6 xl:space-y-8">
            {/* Main Heading */}
            <h1 className="hero-title animate-fade-slide-up stagger-1 text-4xl xl:text-5xl 2xl:text-6xl">
              Hi, I'm <span className="hero-name-highlight">Boobalan D</span>
            </h1>
            
            {/* Subtitle with typing effect */}
            <div className="hero-subtitle-container animate-fade-slide-up stagger-2">
              <div className="hero-subtitle text-xl xl:text-2xl">
                <span className={`${showCursor ? 'typing-cursor' : ''}`}>
                  {displayText}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cta-container flex gap-4 xl:gap-6 mt-8 xl:mt-10 animate-fade-slide-up stagger-3">
              <Button 
                size="lg"
                className="cta-primary px-8 xl:px-10 py-4 xl:py-5 text-lg xl:text-xl font-medium"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-slide-up stagger-4">
          <div className="opacity-80 transition-opacity hover:opacity-100 p-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
