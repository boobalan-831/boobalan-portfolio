
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown, Download } from "lucide-react";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    // Add your resume download logic here
    console.log("Download Resume clicked");
  };

  return (
    <section ref={heroRef} id="home" className="hero-light min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Tech Icons Background */}
      <div className="tech-icons-container absolute inset-0 pointer-events-none">
        <div className="tech-icon tech-icon-1" style={{ left: '10%', animationDuration: '6s' }}>{"{ }"}</div>
        <div className="tech-icon tech-icon-2" style={{ left: '20%', animationDuration: '8s' }}>{"</>"}</div>
        <div className="tech-icon tech-icon-3" style={{ left: '80%', animationDuration: '7s' }}>{"Σ"}</div>
        <div className="tech-icon tech-icon-4" style={{ left: '90%', animationDuration: '5s' }}>{"⚙"}</div>
        <div className="tech-icon tech-icon-5" style={{ left: '70%', animationDuration: '6.5s' }}>{"λ"}</div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-20">
          {/* Profile Picture - Left Column */}
          <div className="lg:order-1 order-2 flex justify-center lg:justify-start">
            <div className="hero-profile-light animate-scale-in">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-2 shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group hover:scale-105">
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

          {/* Hero Content - Right Column */}
          <div className="lg:order-2 order-1 text-left lg:text-left">
            {/* Main Heading */}
            <h1 className="hero-title-light animate-fade-slide-up stagger-1">
              Hi, I'm <span className="hero-name-highlight">Boobalan D</span>
            </h1>
            
            {/* Subtitle with typing effect */}
            <div className="hero-subtitle-light-container animate-fade-slide-up stagger-2">
              <div className="hero-subtitle-light">
                <span className={`${showCursor ? 'typing-cursor-light' : ''}`}>
                  {displayText}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start mt-8 animate-fade-slide-up stagger-3">
              <Button 
                size="lg"
                className="cta-primary-light px-8 py-4 text-lg font-medium"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-slide-up stagger-4">
          <div className="scroll-indicator-light">
            <ChevronDown className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
