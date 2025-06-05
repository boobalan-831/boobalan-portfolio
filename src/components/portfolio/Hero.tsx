
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Cloud Enthusiast | Full-Stack Developer | Problem Solver";
  const heroRef = useScrollReveal();

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
      {/* Subtle Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Tech symbols with subtle animations */}
        <div className="absolute top-10 left-5 opacity-10 animate-fade-in-slow">
          <span className="text-[2rem] text-[#4fb3ff]">{`{ }`}</span>
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-fade-in-slower">
          <span className="text-[2rem] text-[#0ea5e9]">{`</>`}</span>
        </div>
        <div className="absolute top-20 right-5 opacity-10 animate-fade-in-slow">
          <span className="text-[1.5rem] text-[#4fb3ff]">{"λ"}</span>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10 animate-fade-in-slower">
          <span className="text-[1.5rem] text-[#0ea5e9]">{"⚙"}</span>
        </div>
        <div className="absolute top-1/3 left-20 opacity-10 animate-fade-in-slow">
          <span className="text-[1.5rem] text-[#4fb3ff]">{"Σ"}</span>
        </div>
        <div className="absolute bottom-1/3 right-20 opacity-10 animate-fade-in-slower">
          <span className="text-[1.5rem] text-[#0ea5e9]">{"1010"}</span>
        </div>
        
        {/* Faint circular radial glow behind content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#0a162a] to-[#071022] opacity-20 animate-pulse-slow"></div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto text-center relative z-10 max-w-2xl">
        {/* Profile Photo (static) */}
        <div className="mx-auto w-40 h-40 rounded-full border-4 border-[#4fb3ff] overflow-hidden mb-8 shadow-lg">
          <img
            src="/lovable-uploads/cf035bd2-11aa-4a59-868c-f9349f633ead.png"
            alt="Boobalan D - Full Stack Developer"
            className="w-full h-full object-cover"
          />
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
            className="bg-gradient-to-r from-[#4fb3ff] to-[#0ea5e9] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#4fb3ff] text-[#4fb3ff] px-6 py-3 rounded-full hover:bg-[#0a1a33] hover:shadow-lg transition-all duration-300 font-['Poppins'] font-medium bg-transparent"
            onClick={() => scrollToSection("contact")}
          >
            Hire Me
          </Button>
        </div>

        {/* Scroll Indicator */}
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
