import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "../../styles/hero-section.css";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState("");
  const greeting = "Hi, I'm";
  const name = "Boobalan D";
  const fullText = `${greeting} ${name}`;

  // Typewriter effect for headline
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // BG starfield and tech canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Starfield
    const stars = Array.from({ length: 110 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.05 + 0.3,
      speed: Math.random() * 0.19 + 0.07,
      opacity: Math.random() * 0.33 + 0.13,
    }));

    // Tech Elements (React, JS, Node, CSS, DB, Terminal, Cloud)
    const techIcons = [
      {
        // React logo
        draw: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(size / 64, size / 64);
          ctx.globalAlpha = 0.17;
          ctx.strokeStyle = "#00d8ff";
          ctx.lineWidth = 2.4;
          for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.translate(32, 32);
            ctx.rotate((i * Math.PI) / 3);
            ctx.translate(-32, -32);
            ctx.beginPath();
            ctx.ellipse(32, 32, 28, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          ctx.globalAlpha = 0.23;
          ctx.beginPath();
          ctx.arc(32, 32, 7, 0, 2 * Math.PI);
          ctx.fillStyle = "#00d8ff";
          ctx.fill();
          ctx.restore();
        },
        x: () => 0.09 + 0.11 * Math.sin(Date.now() / 3900),
        y: () => 0.17 + 0.027 * Math.cos(Date.now() / 4100),
        size: () => 56 + 6 * Math.sin(Date.now() / 1600),
      },
      {
        // JS logo
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.18;
          ctx.translate(x, y);
          ctx.fillStyle = "#ffe94d";
          ctx.strokeStyle = "#ffe94d";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.rect(0, 0, size, size);
          ctx.stroke();
          ctx.font = `bold ${size * 0.45}px monospace`;
          ctx.fillText("JS", size * 0.15, size * 0.68);
          ctx.restore();
        },
        x: () => 0.75 + 0.03 * Math.sin(Date.now() / 3200),
        y: () => 0.27 + 0.028 * Math.cos(Date.now() / 3600),
        size: () => 34 + 7 * Math.cos(Date.now() / 1800),
      },
      {
        // Node.js hexagon
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.15;
          ctx.translate(x, y);
          ctx.strokeStyle = "#85fc7c";
          ctx.lineWidth = 2.1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x1 = size / 2 + (size / 2) * Math.cos(angle);
            const y1 = size / 2 + (size / 2) * Math.sin(angle);
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.font = `bold ${size * 0.36}px monospace`;
          ctx.globalAlpha = 0.17;
          ctx.fillStyle = "#85fc7c";
          ctx.fillText("N", size * 0.32, size * 0.69);
          ctx.restore();
        },
        x: () => 0.13 + 0.06 * Math.cos(Date.now() / 3500),
        y: () => 0.64 + 0.029 * Math.sin(Date.now() / 2600),
        size: () => 38 + 4 * Math.sin(Date.now() / 2200),
      },
      {
        // Database cylinder
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.15;
          ctx.translate(x, y);
          ctx.strokeStyle = "#8cecff";
          ctx.lineWidth = 2.1;
          ctx.beginPath();
          ctx.ellipse(size / 2, size * 0.22, size / 2, size * 0.22, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.rect(0, size * 0.22, size, size * 0.56);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(size / 2, size * 0.78, size / 2, size * 0.22, 0, 0, Math.PI, true);
          ctx.stroke();
          ctx.restore();
        },
        x: () => 0.85 + 0.04 * Math.cos(Date.now() / 4400),
        y: () => 0.62 + 0.023 * Math.sin(Date.now() / 2900),
        size: () => 32 + 4 * Math.cos(Date.now() / 1100),
      },
      {
        // CSS3 logo
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.16;
          ctx.translate(x, y);
          ctx.strokeStyle = "#2196f3";
          ctx.lineWidth = 2.08;
          ctx.beginPath();
          ctx.moveTo(size * 0.1, 0);
          ctx.lineTo(size * 0.9, 0);
          ctx.lineTo(size * 0.8, size * 0.82);
          ctx.lineTo(size * 0.5, size);
          ctx.lineTo(size * 0.2, size * 0.82);
          ctx.lineTo(size * 0.1, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.font = `bold ${size * 0.34}px sans-serif`;
          ctx.globalAlpha = 0.18;
          ctx.fillStyle = "#2196f3";
          ctx.fillText("CSS", size * 0.17, size * 0.72);
          ctx.restore();
        },
        x: () => 0.60 + 0.045 * Math.sin(Date.now() / 3500),
        y: () => 0.19 + 0.025 * Math.cos(Date.now() / 2700),
        size: () => 36 + 4 * Math.cos(Date.now() / 1200),
      },
      {
        // Terminal icon
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.14;
          ctx.translate(x, y);
          ctx.strokeStyle = "#b6dfff";
          ctx.lineWidth = 2.05;
          ctx.beginPath();
          ctx.rect(0, 0, size, size * 0.65);
          ctx.stroke();
          ctx.font = `bold ${size * 0.32}px monospace`;
          ctx.globalAlpha = 0.17;
          ctx.fillStyle = "#b6dfff";
          ctx.fillText(">", size * 0.14, size * 0.48);
          ctx.restore();
        },
        x: () => 0.43 + 0.08 * Math.sin(Date.now() / 3900),
        y: () => 0.78 + 0.017 * Math.cos(Date.now() / 2100),
        size: () => 33 + 4 * Math.cos(Date.now() / 900),
      },
      {
        // Cloud icon
        draw: (ctx, x, y, size) => {
          ctx.save();
          ctx.globalAlpha = 0.11;
          ctx.translate(x, y);
          ctx.strokeStyle = "#38e2ff";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(size * 0.33, size * 0.67, size * 0.18, Math.PI, 2 * Math.PI);
          ctx.arc(size * 0.5, size * 0.67, size * 0.25, Math.PI, 2 * Math.PI);
          ctx.arc(size * 0.7, size * 0.67, size * 0.17, Math.PI, 2 * Math.PI);
          ctx.stroke();
          ctx.restore();
        },
        x: () => 0.33 + 0.10 * Math.cos(Date.now() / 4100),
        y: () => 0.13 + 0.019 * Math.sin(Date.now() / 1700),
        size: () => 37 + 4 * Math.sin(Date.now() / 1100),
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Stars
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(130, 230, 255, ${star.opacity})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }
      // Tech elements
      for (const tech of techIcons) {
        const x = width * tech.x();
        const y = height * tech.y();
        tech.draw(ctx, x, y, tech.size());
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-root">
      {/* Starfield and tech bg canvas */}
      <canvas ref={canvasRef} className="hero-starfield" />

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-photo-wrapper">
          <img
            src="https://postimage.me/images/2025/06/06/1684570080338.jpg"
            alt="Boobalan D"
            className="hero-photo"
          />
        </div>

        <h1 className="hero-headline-cs shine-anim">
          <span className="typewriter-cs">{typedText}</span>
        </h1>

        <div className="hero-cs-subtitle">
          Cloud Enthusiast <span className="subtitle-divider">|</span> Full-Stack Developer <span className="subtitle-divider">|</span> Problem Solver
        </div>

        <div className="hero-buttons">
          <button
            className="hero-btn primary"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </button>
          <button
            className="hero-btn secondary"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </button>
        </div>

        <div
          className="hero-scroll"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="scroll-icon" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}