
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const AdvancedPreloader = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);

  // Particle system for mouse interaction
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
  }>>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setWebglSupported(false);
      fallbackAnimation();
      return;
    }

    // Initialize Three.js scene
    initThreeJSScene();
    initParticleSystem();
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

  const initParticleSystem = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle animation loop
    const animateParticles = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';

      particles.current.forEach(particle => {
        // Gravity toward mouse
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.fillStyle = `rgba(79, 179, 255, 0.6)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      if (isVisible) {
        requestAnimationFrame(animateParticles);
      }
    };

    animateParticles();

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
          
          {/* Interactive Particles */}
          <canvas 
            ref={canvasRef} 
            className="particle-canvas absolute inset-0 pointer-events-none"
          />
          
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
        <div className="fallback-cube w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50" />
      )}
      
      {/* Text Content */}
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
          Cloud Enthusiast | Full-Stack Developer
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
