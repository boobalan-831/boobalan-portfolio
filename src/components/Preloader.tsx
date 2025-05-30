
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentBar, setCurrentBar] = useState(-1);
  const [showName, setShowName] = useState(false);
  const [letterGlows, setLetterGlows] = useState<boolean[]>(new Array(10).fill(false));

  useEffect(() => {
    // Start bar animations
    const barAnimations = [0, 1, 2, 3, 4].map((index) => 
      setTimeout(() => {
        setCurrentBar(index);
        
        // Trigger letter glow for each bar completion
        if (index < 9) { // "Boobalan D" has 9 visible characters (excluding space)
          setTimeout(() => {
            setLetterGlows(prev => {
              const newGlows = [...prev];
              newGlows[index] = true;
              return newGlows;
            });
          }, 800); // Bar fill duration
        }
        
        // Show full name and start fade out on last bar
        if (index === 4) {
          setTimeout(() => {
            setShowName(true);
            setTimeout(() => {
              setIsVisible(false);
            }, 400);
          }, 800);
        }
      }, index * 200)
    );

    return () => {
      barAnimations.forEach(clearTimeout);
    };
  }, []);

  if (!isVisible) return null;

  const name = "Boobalan D";
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full opacity-20 animate-particle-drift"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div className={`preloader-new ${!isVisible ? 'hidden' : ''}`}>
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles}
      </div>

      <div className="preloader-content">
        {/* Loading Bars */}
        <div className="loading-bars">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="bar-container">
              <div 
                className={`loading-bar ${currentBar >= index ? 'animate-fill' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              />
            </div>
          ))}
        </div>

        {/* Name Text */}
        <div className={`name-text ${showName ? 'show-complete' : ''}`}>
          {name.split('').map((letter, index) => (
            <span
              key={index}
              className={`letter ${letterGlows[index] ? 'glow' : ''} ${letter === ' ' ? 'space' : ''}`}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
