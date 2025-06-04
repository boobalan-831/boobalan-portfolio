import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TechPreloader = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState("");
  const [showCaret, setShowCaret] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);

  const codeText = 'const developer = "Boobalan D";';
  const subtitle = "Cloud Enthusiast | Full-Stack Developer | DevOps Learner";
  
  const loadingStages = [
    "Compiling modules...",
    "Resolving dependencies...",
    "Linking files...",
    "Loading UI components...",
    "✅ Ready to launch!"
  ];

  // Tech symbols for floating background
  const techSymbols = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    scale: number;
    opacity: number;
    symbol: string;
    category: 'code' | 'cloud' | 'data';
  }>>([]);

  const symbols = [
    // Code symbols
    '{}', '</>', 'function()', 'class', 'const', 'let', 'var', '=>',
    // Tech stack
    'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL', 'Git',
    // Cloud & DevOps
    'AWS', 'GCP', 'Docker', 'K8s', 'CI/CD', 'API',
    // Binary & Logic
    '1010', '1101', '0110', '1001', 'npm', 'yarn', 'build'
  ];

  useEffect(() => {
    // Add loading-active class to body on mount
    document.body.classList.add('loading-active');
    
    initFloatingSymbols();
    startTypewriterAnimation();
    
    return () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
  }, []);

  const finishPreloading = () => {
    const timeline = gsap.timeline();
    timeline
      .to(".tech-preloader", { 
        scale: 1.1, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.inOut" 
      })
      .call(() => {
        // Remove loading-active class to show header and back-to-top
        document.body.classList.remove('loading-active');
        setIsVisible(false);
      });
  };

  const initFloatingSymbols = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize floating symbols
    for (let i = 0; i < 30; i++) {
      techSymbols.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        scale: 0.3 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.2,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        category: ['code', 'cloud', 'data'][Math.floor(Math.random() * 3)] as any
      });
    }

    animateSymbols();
  };

  const animateSymbols = () => {
    if (!canvasRef.current || !isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    // Clear with dark gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, '#0a162a');
    gradient.addColorStop(1, '#010518');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw and animate symbols
    techSymbols.current.forEach(symbol => {
      symbol.x += symbol.vx;
      symbol.y += symbol.vy;
      symbol.rotation += symbol.rotationSpeed;

      // Wrap around edges
      if (symbol.x < -50) symbol.x = canvas.width + 50;
      if (symbol.x > canvas.width + 50) symbol.x = -50;
      if (symbol.y < -50) symbol.y = canvas.height + 50;
      if (symbol.y > canvas.height + 50) symbol.y = -50;

      // Draw symbol
      ctx.save();
      ctx.translate(symbol.x, symbol.y);
      ctx.rotate(symbol.rotation);
      ctx.scale(symbol.scale, symbol.scale);

      // Category-based colors
      let color = '#4fb3ff'; // Default blue
      if (symbol.category === 'cloud') color = '#0ea5e9';
      if (symbol.category === 'data') color = '#06b6d4';

      ctx.fillStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${symbol.opacity})`;
      ctx.font = '14px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol.symbol, 0, 0);

      ctx.restore();
    });

    requestAnimationFrame(animateSymbols);
  };

  const startTypewriterAnimation = () => {
    let index = 0;
    let isTypingCode = true;
    let currentTextToType = codeText;

    const typeInterval = setInterval(() => {
      if (index <= currentTextToType.length) {
        setCurrentText(currentTextToType.slice(0, index));
        index++;
      } else {
        if (isTypingCode) {
          // Switch to subtitle
          setTimeout(() => {
            isTypingCode = false;
            currentTextToType = subtitle;
            index = 0;
          }, 800);
        } else {
          // Start progress animation
          clearInterval(typeInterval);
          setShowCaret(false);
          setTimeout(startProgressAnimation, 500);
        }
      }
    }, 80);

    // Caret blinking
    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);

    setTimeout(() => clearInterval(caretInterval), 8000);
  };

  const startProgressAnimation = () => {
    let currentStage = 0;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      // Update loading stage
      const stageIndex = Math.floor((currentProgress / 100) * loadingStages.length);
      if (stageIndex !== currentStage && stageIndex < loadingStages.length) {
        currentStage = stageIndex;
        setLoadingStage(currentStage);
      }

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        // Final transition
        setTimeout(() => {
          finishPreloading();
        }, 800);
      }
    }, 50);
  };

  if (!isVisible) return null;

  return (
    <div className="tech-preloader fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* HUD overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 text-blue-400/30 font-mono text-xs">
          SYS_STATUS: ONLINE
        </div>
        <div className="absolute top-4 right-4 text-blue-400/30 font-mono text-xs">
          INIT_PORTFOLIO_V2.1
        </div>
        <div className="absolute bottom-4 left-4 text-blue-400/30 font-mono text-xs">
          NODE_ENV: PRODUCTION
        </div>
        <div className="absolute bottom-4 right-4 text-blue-400/30 font-mono text-xs">
          BUILD: {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Code block display */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6 mb-8 shadow-2xl">
          <div className="text-left">
            <div className="text-blue-400 font-mono text-lg mb-2">
              {currentText.includes('const') ? (
                <>
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-300"> developer</span>
                  <span className="text-white"> = </span>
                  <span className="text-green-400">"{currentText.split('"')[1] || ''}</span>
                  {currentText.includes('"') && currentText.split('"')[1] && (
                    <span className="text-green-400">"</span>
                  )}
                  {currentText.endsWith(';') && <span className="text-white">;</span>}
                </>
              ) : (
                <span className="text-blue-300">{currentText}</span>
              )}
              {showCaret && <span className="text-blue-400 animate-pulse">|</span>}
            </div>
          </div>
        </div>

        {/* Progress section */}
        {progress > 0 && (
          <div className="space-y-4">
            <div className="text-blue-300 font-mono text-sm">
              {loadingStages[loadingStage]}
            </div>
            
            <div className="relative">
              <div className="w-80 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-blue-400 font-mono text-xs mt-2">
                Loading... {Math.round(progress)}%
              </div>
            </div>
          </div>
        )}

        {/* Completion flash effect */}
        {progress === 100 && (
          <div className="absolute inset-0 bg-blue-400/20 animate-ping rounded-lg" />
        )}
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" 
             style={{ top: '30%', animationDuration: '2s' }} />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" 
             style={{ top: '70%', animationDuration: '3s', animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default TechPreloader;
