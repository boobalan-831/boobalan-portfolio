
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";
import * as THREE from "three";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Cloud Enthusiast | Full-Stack Developer | Problem Solver";
  const heroRef = useScrollReveal();
  const ringCanvasRef = useRef<HTMLCanvasElement>(null);

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

  // Three.js 3D ring setup for desktop
  useEffect(() => {
    if (!ringCanvasRef.current || window.innerWidth < 640) return;
    
    const canvas = ringCanvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(200, 200);
    camera.position.z = 50;

    // Create torus ring
    const torusGeometry = new THREE.TorusGeometry(35, 2, 8, 50);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x4fb3ff, 
      transparent: true, 
      opacity: 0.25 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
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
      {/* Binary Bar - Desktop Only */}
      <div className="binary-bar absolute top-4 left-0 w-full overflow-hidden">
        <span className="binary-text">01010111010101010100101010101011010101001010101110101010101001010101</span>
      </div>

      {/* Particle Trails - Desktop Only */}
      <div className="particle-trails top-left">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={`left-${i}`}
            style={{
              left: `${Math.random() * 180}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
      <div className="particle-trails top-right">
        {Array.from({ length: 20 }, (_, i) => (
          <span
            key={`right-${i}`}
            style={{
              left: `${Math.random() * 180}px`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Minimal Glow Overlay - Mobile Fallback */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 sm:hidden">
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0a162a] to-[#071022] opacity-20 animate-pulse-slow"></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto text-center relative z-10 max-w-2xl">
        {/* Profile Photo with 3D Ring (Desktop) */}
        <div className="relative w-40 h-40 sm:w-40 sm:h-40 w-36 h-36 mb-8 mx-auto">
          {/* 3D Ring Canvas - Desktop Only */}
          <canvas
            ref={ringCanvasRef}
            className="hero-ring-canvas hidden sm:block"
            aria-hidden="true"
          />
          
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

        {/* Scroll Indicator - Perfectly Centered */}
        <div className="scroll-container absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="w-12 h-12 border-2 border-[#4fb3ff] rounded-full flex items-center justify-center mb-2 animate-bounce-slow mx-auto cursor-pointer" onClick={() => scrollToSection("about")}>
            <ChevronDown className="w-5 h-5 text-[#4fb3ff]" />
          </div>
          <p className="text-sm text-[#c0e8ff]/60">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
