import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Code, Terminal, Settings, CircuitBoard, Brackets, Microchip, Sigma } from "lucide-react";

const AdvancedPreloader = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);

  // Tech symbols for background animation
  const techSymbols = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    scale: number;
    opacity: number;
    type: string;
    symbol: string;
    category: 'code' | 'circuit' | 'cloud';
    glowIntensity: number;
  }>>([]);
  const mouse = useRef({ x: 0, y: 0 });

  // Engineering symbols data
  const symbolsData = [
    // Code & Logic
    { symbol: '{}', category: 'code' as const, char: true },
    { symbol: '</>', category: 'code' as const, char: true },
    { symbol: 'Σ', category: 'code' as const, char: true },
    { symbol: 'λ', category: 'code' as const, char: true },
    { symbol: '→', category: 'code' as const, char: true },
    { symbol: '$', category: 'code' as const, char: true },
    { symbol: '>_', category: 'code' as const, char: true },
    // Circuit & Hardware
    { symbol: '⚡', category: 'circuit' as const, char: true },
    { symbol: '◊', category: 'circuit' as const, char: true },
    { symbol: '▲', category: 'circuit' as const, char: true },
    { symbol: '◆', category: 'circuit' as const, char: true },
    // Binary patterns
    { symbol: '101010', category: 'code' as const, char: true },
    { symbol: '110011', category: 'code' as const, char: true },
    { symbol: '001101', category: 'code' as const, char: true },
  ];

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setWebglSupported(false);
      fallbackAnimation();
      return;
    }

    // Initialize Three.js scene and tech particle system
    initThreeJSScene();
    initTechParticleSystem();
    startProgressAnimation();

    return () => {
      // Cleanup
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  const fallbackAnimation = () => {
    // Simple CSS-based fallback for unsupported browsers
    const timeline = gsap.timeline();
    timeline
      .to(".fallback-cube", { rotation: 360, duration: 2, repeat: -1, ease: "none" })
      .fromTo(".name-letters", { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 }, 0.5);
    
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const initThreeJSScene = () => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create metaball-like geometry using spheres
    const metaballs = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: 0x4fb3ff,
        transparent: true,
        opacity: 0.8,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.2
      });
      const metaball = new THREE.Mesh(geometry, material);
      metaball.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 2,
        Math.sin(i * Math.PI * 2 / 3) * 2,
        0
      );
      metaballs.push(metaball);
      scene.add(metaball);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x4fb3ff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0ea5e9, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4fb3ff, 0.8, 10);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0ea5e9, 0.8, 10);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate metaballs
      const time = Date.now() * 0.001;
      metaballs.forEach((ball, i) => {
        ball.position.x = Math.cos(time + i * Math.PI * 2 / 3) * 2;
        ball.position.y = Math.sin(time + i * Math.PI * 2 / 3) * 2;
        ball.rotation.x += 0.01;
        ball.rotation.y += 0.01;
      });

      // Camera orbit
      camera.position.x = Math.cos(time * 0.2) * 8;
      camera.position.z = Math.sin(time * 0.2) * 8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Store cleanup function
    const cleanup = () => {
      renderer.dispose();
      scene.clear();
    };

    setTimeout(cleanup, 4000);
  };

  const initTechParticleSystem = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize tech symbols
    for (let i = 0; i < 50; i++) {
      const symbolData = symbolsData[Math.floor(Math.random() * symbolsData.length)];
      techSymbols.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        scale: 0.5 + Math.random() * 0.8,
        opacity: 0.2 + Math.random() * 0.3,
        type: 'symbol',
        symbol: symbolData.symbol,
        category: symbolData.category,
        glowIntensity: 0
      });
    }

    // Mouse tracking for proximity glow
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Tech particle animation loop
    const animateTechSymbols = () => {
      // Clear with dark overlay for matrix effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';

      techSymbols.current.forEach(symbol => {
        // Calculate distance to mouse for glow effect
        const dx = mouse.current.x - symbol.x;
        const dy = mouse.current.y - symbol.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Proximity glow
        if (distance < 150) {
          symbol.glowIntensity = Math.max(0, 1 - distance / 150);
        } else {
          symbol.glowIntensity *= 0.95; // Fade out glow
        }

        // Movement
        symbol.x += symbol.vx;
        symbol.y += symbol.vy;
        symbol.rotation += symbol.rotationSpeed;

        // Boundaries with wrapping
        if (symbol.x < -50) symbol.x = canvas.width + 50;
        if (symbol.x > canvas.width + 50) symbol.x = -50;
        if (symbol.y < -50) symbol.y = canvas.height + 50;
        if (symbol.y > canvas.height + 50) symbol.y = -50;

        // Opacity pulse
        symbol.opacity += Math.sin(Date.now() * 0.001 + symbol.x * 0.01) * 0.02;
        symbol.opacity = Math.max(0.1, Math.min(0.5, symbol.opacity));

        // Draw symbol
        ctx.save();
        ctx.translate(symbol.x, symbol.y);
        ctx.rotate(symbol.rotation);
        ctx.scale(symbol.scale, symbol.scale);

        // Category-based colors
        let color = '#4fb3ff'; // Default blue
        if (symbol.category === 'circuit') color = '#0ea5e9';
        if (symbol.category === 'cloud') color = '#06b6d4';

        // Glow effect
        if (symbol.glowIntensity > 0) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 10 + symbol.glowIntensity * 20;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${symbol.opacity + symbol.glowIntensity * 0.5})`;
        ctx.font = `${16 + symbol.glowIntensity * 8}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(symbol.symbol, 0, 0);

        ctx.restore();
      });

      ctx.globalCompositeOperation = 'source-over';

      if (isVisible) {
        requestAnimationFrame(animateTechSymbols);
      }
    };

    animateTechSymbols();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  };

  const startProgressAnimation = () => {
    // Simulate loading progress
    const progressTween = gsap.to({}, {
      duration: 3,
      ease: "power2.inOut",
      onUpdate: function() {
        setProgress(this.progress() * 100);
      }
    });

    // GSAP text animation
    const timeline = gsap.timeline({ delay: 0.5 });
    
    timeline
      .fromTo(".name-letter", 
        { scale: 0.2, opacity: 0, rotationY: 90 }, 
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0,
          duration: 0.6, 
          stagger: 0.1, 
          ease: "elastic.out(1, 0.5)" 
        }
      )
      .to(".name-letter", {
        textShadow: "0 0 20px rgba(79, 179, 255, 0.8)",
        duration: 0.3,
        yoyo: true,
        repeat: 1
      })
      .fromTo(".subtitle", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.5"
      );

    // Exit animation
    setTimeout(() => {
      const exitTimeline = gsap.timeline();
      exitTimeline
        .to(".three-scene", { scale: 0, opacity: 0, duration: 0.8, ease: "power2.in" })
        .to(".particle-canvas", { opacity: 0, duration: 0.5 }, "-=0.3")
        .to(".preloader-text", { y: -50, opacity: 0, duration: 0.5 }, "-=0.5")
        .call(() => setIsVisible(false));
    }, 3500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center">
      {webglSupported ? (
        <>
          {/* Three.js Scene */}
          <div ref={mountRef} className="three-scene absolute inset-0" />
          
          {/* Tech Symbol Canvas */}
          <canvas 
            ref={canvasRef} 
            className="particle-canvas absolute inset-0 pointer-events-none"
          />
          
          {/* Radial overlay behind text for crisp readability */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/80" />
          
          {/* Progress Overlay Shader Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"
            style={{
              clipPath: `circle(${progress}% at 50% 50%)`,
              transition: 'clip-path 0.1s ease-out'
            }}
          />
        </>
      ) : (
        /* Fallback for unsupported browsers */
        <div className="fallback-cube w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
          <Code className="w-8 h-8 text-white" />
        </div>
      )}
      
      {/* Text Content with radial background for crisp text */}
      <div className="preloader-text relative z-10 text-center">
        <div className="text-4xl md:text-6xl font-bold mb-4">
          {"Boobalan D".split('').map((letter, index) => (
            <span 
              key={index} 
              className="name-letter inline-block text-blue-400"
              style={{ display: letter === ' ' ? 'inline' : 'inline-block', width: letter === ' ' ? '0.3em' : 'auto' }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="subtitle text-lg text-blue-300 opacity-0">
          Computer Science & Engineering
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-blue-300 mt-2">
            Loading... {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPreloader;
