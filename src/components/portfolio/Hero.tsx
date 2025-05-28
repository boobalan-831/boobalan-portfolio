
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a192f] to-[#000d1a]">
      {/* Subtle background radial gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent"></div>

      <div className="container max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8 pt-20">
          {/* Profile Picture */}
          <div className="hero-profile-container animate-fade-in-up stagger-1">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 group">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="https://postimage.me/images/2025/05/28/4333829_applicantPhotoFile.jpg" 
                  alt="Boobalan D"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title animate-fade-in-up stagger-2">
            Hi, I'm Boobalan D
          </h1>
          
          {/* Subtitle with typing effect */}
          <div className="hero-subtitle-container animate-fade-in-up stagger-3">
            <div className="hero-subtitle">
              <span className={`${showCursor ? 'typing-cursor' : ''}`}>
                {displayText}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 animate-fade-in-up stagger-4">
            <Button 
              size="lg"
              className="button-primary px-8 py-4 text-lg font-medium"
              onClick={() => scrollToSection("contact")}
            >
              Hire Me
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="button-secondary px-8 py-4 text-lg font-medium"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up stagger-5">
            <div className="scroll-indicator">
              <ChevronDown className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
