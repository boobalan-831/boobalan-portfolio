
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/hero-section.css";

export default function HeroSection() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;

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

      animationFrameId = requestAnimationFrame(draw);
    };

    createNodes();
    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section">
      <canvas
        ref={canvasRef}
        className="hero-canvas"
      ></canvas>

      <div className="hero-content">
        <img
          src="https://postimage.me/images/2025/06/06/1684570080338.jpg"
          alt="Boobalan D"
          className="hero-profile-photo"
        />
        <h1 className="hero-title">
          Hi, I'm <span className="hero-name-highlight">Boobalan D</span>
        </h1>
        <p className="hero-subtitle">
          Cloud Enthusiast | Full-Stack Developer | Problem Solver
        </p>

        <div className="hero-buttons">
          <button
            className="hero-cta hero-cta-primary"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </button>
          <button
            className="hero-cta hero-cta-secondary"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </button>
        </div>

        <div
          className="hero-scroll-indicator"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="w-6 h-6 text-cyan-300" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
