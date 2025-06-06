
// export default Hero;
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

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
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#010c20] to-[#07182e] text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      ></canvas>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <img
          src="https://postimage.me/images/2025/06/06/1684570080338.jpg"
          alt="Boobalan D"
          className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-lg hover:shadow-cyan-400/40 transition duration-500"
        />
        <h1 className="text-4xl md:text-5xl font-bold mt-6">
          Hi, I'm <span className="text-cyan-400 hover:text-cyan-300 transition">Boobalan D</span>
        </h1>
        <p className="mt-4 px-6 py-3 bg-[#0b1b30] rounded text-lg font-mono text-cyan-100 shadow-lg hover:shadow-cyan-400/40 transition duration-500">
          Cloud Enthusiast | Full-Stack Developer | Problem Solver
        </p>

        <div className="flex gap-4 mt-8">
          <button
            className="cta px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </button>
          <button
            className="cta px-6 py-3 border border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-black transition"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </button>
        </div>

        <div
          className="mt-12 animate-bounce flex flex-col items-center cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="w-6 h-6 text-cyan-300" />
          <span className="text-sm text-gray-400 mt-1">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
