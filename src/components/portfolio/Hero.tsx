
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          {/* Profile Picture with floating animation */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 p-1 shadow-2xl shadow-blue-500/25 animate-float">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="https://postimage.me/images/2025/05/28/4333829_applicantPhotoFile.jpg" 
                alt="Boobalan D"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name with sequential fade-in */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent text-glow animate-fade-in-up stagger-1">
            Hi, I'm Boobalan D
          </h1>
          
          {/* Typewriter effect for subheadline */}
          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-20 flex items-center justify-center animate-fade-in-up stagger-2">
            <span className={`${showCursor ? 'border-r-2 border-blue-400 pr-2' : ''} ${showCursor ? 'animate-pulse' : ''}`}>
              {displayText}
            </span>
          </div>

          {/* CTA Buttons with sequential animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 animate-fade-in-up stagger-3">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 animate-glow-pulse btn-ripple"
              onClick={() => scrollToSection("contact")}
            >
              Hire Me
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 btn-ripple"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
