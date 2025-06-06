
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Cloud Enthusiast | Full-Stack Developer | Problem Solver";
  const heroRef = useScrollReveal();
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect for subtitle
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

  // Particle Canvas Animation
  useEffect(() => {
    if (!particleCanvasRef.current) return;
    
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();

    let dots: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      phase: number;
    }> = [];

    function initDots(count: number) {
      const w = canvas.width;
      const h = canvas.height;
      dots = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: 0,
        phase: Math.random() * Math.PI * 2
      }));
    }

    function animateDots() {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.phase += 0.02;
        dot.opacity = (Math.sin(dot.phase) + 1) * 0.1; // 0→0.2
        
        // Bounce at edges
        if (dot.x < 0 || dot.x > w) dot.vx *= -1;
        if (dot.y < 0 || dot.y > h) dot.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,179,255,${dot.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animateDots);
    }

    const isMobile = window.innerWidth < 640;
    initDots(isMobile ? 60 : 100);
    animateDots();

    const handleResize = () => {
      resizeCanvas();
      const isMobile = window.innerWidth < 640;
      initDots(isMobile ? 60 : 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0a162a] to-[#071022] px-6"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 -z-20"
        aria-hidden="true"
      />

      {/* Floating Code Glyphs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Desktop: 3 glyphs */}
        <div className="floating-code animate-fade-in-out text-[#4fb3ff]/20 text-2xl absolute top-5 left-5 hidden sm:block">{`{ }`}</div>
        <div className="floating-code animate-fade-in-out text-[#c0e8ff]/20 text-2xl absolute top-5 right-5 hidden sm:block">{`λ`}</div>
        <div className="floating-code animate-fade-in-out text-[#0ea5e9]/20 text-2xl absolute bottom-5 right-5 hidden sm:block">{`</>`}</div>
        
        {/* Mobile: 2 glyphs */}
        <div className="floating-code animate-fade-in-out text-[#4fb3ff]/20 text-xl absolute top-4 left-4 sm:hidden">{`{ }`}</div>
        <div className="floating-code animate-fade-in-out text-[#0ea5e9]/20 text-xl absolute bottom-4 right-4 sm:hidden">{`</>`}</div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto text-center relative z-10 max-w-2xl">
        {/* Profile Photo with Glowing Halo */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-6 sm:mb-8 mx-auto">
          {/* Glowing Halo Behind Photo */}
          <svg 
            className="absolute inset-0 w-full h-full animate-halo-pulse -z-10" 
            style={{ width: '180px', height: '180px', margin: 'auto' }}
            viewBox="0 0 180 180"
          >
            <circle
              cx="90"
              cy="90"
              r="85"
              fill="none"
              stroke="#4fb3ff"
              strokeWidth="2"
              opacity="0.25"
            />
          </svg>
          
          {/* Photo */}
          <div className="relative w-full h-full rounded-full border-4 border-[#4fb3ff] overflow-hidden hero-profile-photo">
            <img
              src="/lovable-uploads/cf035bd2-11aa-4a59-868c-f9349f633ead.png"
              alt="Boobalan D - Full Stack Developer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline with subtle text shadow */}
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 font-['Poppins']" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          Hi, I'm <span className="text-[#4fb3ff]">Boobalan D</span>
        </h1>

        {/* Subtitle with typing effect */}
        <div className="inline-block bg-[#0a1a33] px-4 py-2 rounded-lg mb-8">
          <span className="font-mono text-[#c0e8ff] text-lg sm:text-xl md:text-2xl">
            {displayText}
          </span>
          {showCursor && (
            <span className="inline-block ml-[2px] w-[1ch] bg-[#c0e8ff] animate-blink">
              &nbsp;
            </span>
          )}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#4fb3ff] to-[#0ea5e9] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium hero-cta-button"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#4fb3ff] text-[#4fb3ff] px-6 py-3 rounded-full hover:bg-[#0a1a33] hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium bg-transparent hero-cta-button"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Scroll Indicator - Fixed Alignment */}
        <div className="absolute bottom-8 sm:bottom-5 left-1/2 transform -translate-x-1/2 text-center cursor-pointer" onClick={() => scrollToSection("about")}>
          <ChevronDown className="w-6 h-6 text-[#4fb3ff] animate-bounce-slow mx-auto mb-2" />
          <p className="text-sm text-[#c0e8ff]/60">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
