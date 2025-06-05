
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
    <section ref={heroRef} id="home" className="hero min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Tech Symbols */}
        <div className="tech-symbols-container">
          <div className="tech-symbol tech-symbol-1" style={{ left: '10%', top: '20%', animationDuration: '6s' }}>{"{ }"}</div>
          <div className="tech-symbol tech-symbol-2" style={{ left: '20%', top: '60%', animationDuration: '8s' }}>{"</>"}</div>
          <div className="tech-symbol tech-symbol-3" style={{ left: '80%', top: '30%', animationDuration: '7s' }}>{"Σ"}</div>
          <div className="tech-symbol tech-symbol-4" style={{ left: '90%', top: '70%', animationDuration: '5s' }}>{"⚙"}</div>
          <div className="tech-symbol tech-symbol-5" style={{ left: '70%', top: '15%', animationDuration: '6.5s' }}>{"λ"}</div>
          <div className="tech-symbol tech-symbol-6" style={{ left: '15%', top: '80%', animationDuration: '7.5s' }}>{"1010"}</div>
          <div className="tech-symbol tech-symbol-7" style={{ left: '85%', top: '85%', animationDuration: '6.8s' }}>{"API"}</div>
          <div className="tech-symbol tech-symbol-8" style={{ left: '5%', top: '40%', animationDuration: '8.2s' }}>{"⟨⟩"}</div>
        </div>

        {/* Animated Gradient Orbs */}
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>

        {/* Radar Circles */}
        <div className="radar-container">
          <div className="radar-circle radar-circle-1"></div>
          <div className="radar-circle radar-circle-2"></div>
          <div className="radar-circle radar-circle-3"></div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Profile Picture with Gradient Ring */}
        <div className="hero-profile animate-scale-in mb-8">
          <div className="profile-ring-container">
            <div className="profile-gradient-ring">
              <div className="profile-image-container">
                <img 
                  src="/lovable-uploads/cf035bd2-11aa-4a59-868c-f9349f633ead.png" 
                  alt="Boobalan D - Full Stack Developer"
                  className="profile-image"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center space-y-8">
          {/* Main Heading with Glow Effect */}
          <h1 className="hero-title animate-fade-slide-up stagger-1">
            Hi, I'm <span className="hero-name-glow">Boobalan D</span>
          </h1>
          
          {/* Typing Animation Subtitle */}
          <div className="hero-subtitle-container animate-fade-slide-up stagger-2">
            <div className="hero-typing-text">
              <span className="typing-text">
                {displayText}
              </span>
              {showCursor && <span className="typing-cursor">|</span>}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-container animate-fade-slide-up stagger-3">
            <div className="cta-buttons-wrapper">
              <Button 
                size="lg"
                className="cta-button cta-primary"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button 
                size="lg"
                className="cta-button cta-secondary"
                onClick={() => scrollToSection("contact")}
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator-container animate-fade-slide-up stagger-4">
          <div className="scroll-indicator">
            <div className="scroll-circle">
              <ChevronDown className="scroll-arrow" />
            </div>
            <p className="scroll-text">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
