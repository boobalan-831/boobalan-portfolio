
import { Card, CardContent } from "@/components/ui/card";
import { Code, Book, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const [animateCards, setAnimateCards] = useState(false);
  const [animateItems, setAnimateItems] = useState<{ [key: number]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["C", "C++", "Java", "Python", "JavaScript", "SQL"],
      color: "blue"
    },
    {
      title: "Web Technologies",
      icon: Book,
      skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "React.js"],
      color: "cyan"
    },
    {
      title: "Cloud & DevOps",
      icon: Github,
      skills: ["Google Cloud (Basics)", "AWS", "Docker (beginner)", "Git"],
      color: "purple"
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setAnimateCards(true), 300);
            
            // Animate skill items with staggered delay
            skillCategories.forEach((_, categoryIndex) => {
              setTimeout(() => {
                setAnimateItems(prev => ({ ...prev, [categoryIndex]: true }));
              }, 800 + (categoryIndex * 200));
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getColorClass = (color: string, type: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-600/30",
        text: "text-blue-400",
        shadow: "shadow-blue-500/20",
        accent: "border-blue-500/60"
      },
      cyan: {
        bg: "bg-cyan-600/20",
        border: "border-cyan-600/30",
        text: "text-cyan-400",
        shadow: "shadow-cyan-500/20",
        accent: "border-cyan-500/60"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-600/30",
        text: "text-purple-400",
        shadow: "shadow-purple-500/20",
        accent: "border-purple-500/60"
      }
    };
    return colors[color as keyof typeof colors][type as keyof typeof colors.blue];
  };

  return (
    <section ref={sectionRef} id="skills" className="page-container py-12 sm:py-16 lg:py-20 bg-slate-800/30">
      <div className="page-heading text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <div className="underline w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
      </div>

      <div className="content-wrapper skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {skillCategories.map((category, index) => (
          <Card 
            key={category.title}
            className={`card skill-card bg-slate-800/50 border-slate-700 transition-all duration-500 group cursor-pointer ${
              animateCards ? 'animate-skill-card-enter' : 'opacity-0 scale-90'
            }`}
            style={{ 
              animationDelay: `${index * 200}ms`,
              '--category-accent': `var(--${category.color}-accent)`
            } as React.CSSProperties}
          >
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <div className={`skill-icon w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full ${getColorClass(category.color, 'bg')} ${getColorClass(category.color, 'border')} border-2 flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300`}>
                  <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${getColorClass(category.color, 'text')} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className={`text-lg sm:text-xl font-semibold ${getColorClass(category.color, 'text')}`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill}
                    className={`skill-item bg-slate-700/50 rounded-lg p-2 sm:p-3 text-center text-gray-300 hover:bg-slate-700/70 transition-all duration-300 text-sm sm:text-base ${
                      animateItems[index] ? 'animate-skill-item-enter' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ animationDelay: `${skillIndex * 100}ms` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <Card className={`card bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 max-w-2xl mx-auto transition-all duration-500 ${
          animateCards ? 'animate-skill-card-enter' : 'opacity-0 scale-90'
        }`} style={{ animationDelay: '600ms' }}>
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-3 sm:mb-4">UI Tools</h3>
            <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 inline-block">
              <span className="text-gray-300 text-base sm:text-lg">Figma (Basic)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
