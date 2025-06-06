
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

  // 2D Animated Particle Grid
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();

    // Grid configuration
    const isMobile = window.innerWidth < 640;
    const gridCols = isMobile ? 10 : 20;
    const gridRows = isMobile ? 8 : 10;
    const nodeSize = isMobile ? 1.5 : 2;
    const waveAmplitude = isMobile ? 3 : 5;
    const nodeOpacity = isMobile ? 0.2 : 0.3;
    const lineOpacity = isMobile ? 0.1 : 0.15;

    const nodes = [];
    for (let x = 0; x < gridCols; x++) {
      for (let y = 0; y < gridRows; y++) {
        nodes.push({
          x: (canvas.width / (gridCols - 1)) * x,
          y: (canvas.height / (gridRows - 1)) * y,
          originalY: (canvas.height / (gridRows - 1)) * y,
          gridX: x,
          gridY: y
        });
      }
    }

    let animationId;
    let startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions with wave motion
      nodes.forEach(node => {
        node.y = node.originalY + Math.sin(elapsed + node.gridX * 0.5 + node.gridY * 0.7) * waveAmplitude;
      });

      // Draw connecting lines
      ctx.strokeStyle = `rgba(79, 179, 255, ${lineOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      nodes.forEach(node => {
        // Connect to right neighbor
        const rightNeighbor = nodes.find(n => n.gridX === node.gridX + 1 && n.gridY === node.gridY);
        if (rightNeighbor) {
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(rightNeighbor.x, rightNeighbor.y);
        }
        
        // Connect to bottom neighbor
        const bottomNeighbor = nodes.find(n => n.gridX === node.gridX && n.gridY === node.gridY + 1);
        if (bottomNeighbor) {
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(bottomNeighbor.x, bottomNeighbor.y);
        }
      });
      ctx.stroke();

      // Draw nodes
      ctx.fillStyle = `rgba(79, 179, 255, ${nodeOpacity})`;
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
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
      {/* 2D Animated Particle Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
        aria-hidden="true"
      />

      {/* Data Stream Overlay - Desktop Only */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="data-stream top-4 left-4">
          <span className="binary-text">0101</span>
          <span className="binary-text">1010</span>
          <span className="binary-text">0011</span>
        </div>
        <div className="data-stream bottom-4 right-4">
          <span className="binary-text">1100</span>
          <span className="binary-text">0110</span>
          <span className="binary-text">1001</span>
        </div>
      </div>

      {/* Floating Code Glyphs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Desktop: 2 glyphs, Mobile: 2 glyphs but different positions */}
        <div className="floating-code top-8 left-4 text-[#4fb3ff]/20 text-2xl animate-fade-in-out">{`{ }`}</div>
        <div className="floating-code bottom-8 right-4 text-[#0ea5e9]/20 text-2xl animate-fade-in-out hidden sm:block">{`</>`}</div>
        <div className="floating-code bottom-16 left-1/4 text-[#c0e8ff]/20 text-xl animate-fade-in-out sm:hidden">{`λ`}</div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto text-center relative z-10 max-w-2xl">
        {/* Profile Photo with Glowing Halo */}
        <div className="relative w-40 h-40 sm:w-40 sm:h-40 w-36 h-36 mb-8 sm:mb-8 mb-6 mx-auto">
          {/* Subtle Glowing Halo */}
          <div className="glow-halo absolute inset-0 rounded-full animate-halo-pulse"></div>
          
          {/* Photo */}
          <div className="relative w-full h-full rounded-full border-4 border-[#4fb3ff] overflow-hidden hero-profile-photo">
            <img
              src="/lovable-uploads/cf035bd2-11aa-4a59-868c-f9349f633ead.png"
              alt="Boobalan D - Full Stack Developer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4 font-['Poppins']">
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
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center cursor-pointer" onClick={() => scrollToSection("about")}>
          <ChevronDown className="w-6 h-6 text-[#4fb3ff] animate-bounce-slow mx-auto mb-2" />
          <p className="text-sm text-[#c0e8ff]/60">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
