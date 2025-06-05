
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

  // Set up THREE.js particle network behind
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 2;

    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 4; // spread in a 4-unit cube
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x4fb3ff, size: 0.03, transparent: true, opacity: 0.3 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
      {/* THREE.js Canvas for Particle Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-20"
      />

      {/* Fading Floating Code Snippets (CSS-based) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-code top-8 left-4 text-[#4fb3ff]/20 text-2xl">{`{ }`}</div>
        <div className="floating-code bottom-12 right-8 text-[#0ea5e9]/20 text-2xl">{`λ`}</div>
        <div className="floating-code top-1/3 right-20 text-[#c0e8ff]/20 text-xl">{`</>`}</div>
        <div className="floating-code bottom-1/3 left-16 text-[#4fb3ff]/20 text-lg">{`⚙`}</div>
        <div className="floating-code top-20 right-5 text-[#0ea5e9]/20 text-lg">{`Σ`}</div>
        <div className="floating-code bottom-20 left-10 text-[#c0e8ff]/20 text-lg">{`1010`}</div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto text-center relative z-10 max-w-2xl">
        {/* Static Profile Photo with Parallax Rings */}
        <div className="relative mx-auto w-40 h-40 mb-8">
          {/* Parallax Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-[#4fb3ff]/30 animate-ring-pulse"></div>
          <div className="absolute inset-0 rounded-full border-2 border-[#0ea5e9]/20 animate-ring-rotate-slow"></div>
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
            className="hero-cta-button bg-gradient-to-r from-[#4fb3ff] to-[#0ea5e9] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hero-cta-button border-2 border-[#4fb3ff] text-[#4fb3ff] px-6 py-3 rounded-full hover:bg-[#0a1a33] hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium bg-transparent"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection("about")}>
          <div className="w-12 h-12 border-2 border-[#4fb3ff] rounded-full flex items-center justify-center mb-2 animate-bounce-slow">
            <ChevronDown className="w-5 h-5 text-[#4fb3ff]" />
          </div>
          <p className="text-[#c0e8ff] text-sm opacity-80">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
