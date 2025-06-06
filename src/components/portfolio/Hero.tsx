
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Cloud Enthusiast | Full-Stack Developer | Problem Solver";
  const heroRef = useScrollReveal();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodes = useRef<Array<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
  }>>([]);

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

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const createNodes = () => {
      nodes.current = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.current.length; i++) {
        const n = nodes.current[i];

        // Move
        n.x += n.dx;
        n.y += n.dy;

        if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.dy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 194, 255, 0.3)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.current.length; j++) {
          const m = nodes.current[j];
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = "rgba(0, 255, 255, 0.1)";
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    createNodes();
    draw();

    const handleResize = () => {
      resizeCanvas();
      createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
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
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#010c20] via-[#0a162a] to-[#07182e] px-6"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-20 pointer-events-none"
        aria-hidden="true"
      />

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
              stroke="#00c2ff"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
          
          {/* Photo */}
          <div className="relative w-full h-full rounded-full border-4 border-[#00c2ff] overflow-hidden hero-profile-photo">
            <img
              src="/lovable-uploads/cf035bd2-11aa-4a59-868c-f9349f633ead.png"
              alt="Boobalan D - Full Stack Developer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline with subtle text shadow */}
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 font-['Poppins']" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Hi, I'm <span className="text-[#00c2ff]">Boobalan D</span>
        </h1>

        {/* Subtitle with typing effect */}
        <div className="inline-block bg-[#0a1a33]/80 backdrop-blur-sm px-4 py-2 rounded-lg mb-8 border border-[#00c2ff]/20">
          <span className="font-mono text-[#c0e8ff] text-lg sm:text-xl md:text-2xl">
            {displayText}
          </span>
          {showCursor && (
            <span className="inline-block ml-[2px] w-[1ch] bg-[#c0e8ff] animate-blink">
              &nbsp;
            </span>
          )}
        </div>

        {/* Call-to-Action Buttons with Enhanced Hover Effects */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="hero-cta-button bg-gradient-to-r from-[#00c2ff] to-[#0ea5e9] text-white px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(0,194,255,0.5)] hover:scale-105 transition-all duration-300 font-['Poppins'] font-medium"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hero-cta-button border-2 border-[#00c2ff] text-[#00c2ff] px-6 py-3 rounded-full hover:bg-[#00c2ff]/10 hover:shadow-[0_0_20px_rgba(0,194,255,0.3)] hover:scale-105 transition-all duration-300 font-['Poppins'] font-medium bg-transparent"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Scroll Indicator - Fixed Alignment */}
        <div className="absolute bottom-8 sm:bottom-5 left-1/2 transform -translate-x-1/2 text-center cursor-pointer" onClick={() => scrollToSection("about")}>
          <ChevronDown className="w-6 h-6 text-[#00c2ff] animate-bounce-slow mx-auto mb-2" />
          <p className="text-sm text-[#c0e8ff]/60">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
