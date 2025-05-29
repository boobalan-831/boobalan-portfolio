
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";

const About = () => {
  const aboutRef = useScrollReveal<HTMLElement>();
  const cardRef1 = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const cardRef2 = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const cardRef3 = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const statsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const headingRef = useScrollReveal<HTMLDivElement>({ threshold: 0.5 });

  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const statsElement = statsRef.current;
    if (!statsElement || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate projects counter
            let currentProjects = 0;
            const projectsInterval = setInterval(() => {
              currentProjects += 2;
              setProjectsCount(currentProjects);
              if (currentProjects >= 50) {
                clearInterval(projectsInterval);
                setProjectsCount(50);
              }
            }, 20);

            // Animate years counter
            let currentYears = 0;
            const yearsInterval = setInterval(() => {
              currentYears += 0.1;
              setYearsCount(Math.round(currentYears * 10) / 10);
              if (currentYears >= 3) {
                clearInterval(yearsInterval);
                setYearsCount(3);
              }
            }, 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsElement);

    return () => {
      if (statsElement) {
        observer.unobserve(statsElement);
      }
    };
  }, [statsRef, hasAnimated]);

  const KeywordTooltip = ({ children, tooltip }: { children: React.ReactNode; tooltip: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="text-blue-400 hover:text-cyan-300 cursor-help transition-colors duration-200 underline decoration-dotted">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <section ref={aboutRef} id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div ref={headingRef} className="text-center mb-16 reveal">
            <h2 className="about-heading text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent relative inline-block">
              About Me
            </h2>
            <div className="about-underline w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto transition-all duration-600 ease-out"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Bio and Stats */}
            <div className="space-y-8">
              {/* Profile Bio Card */}
              <Card ref={cardRef1} className="bio-card bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 card-hover reveal">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Boobalan D is a Computer Science and Engineering student with a passion for{' '}
                    <KeywordTooltip tooltip="Modern architecture using containers, microservices, and orchestration">
                      cloud-native solutions
                    </KeywordTooltip>
                    ,{' '}
                    <KeywordTooltip tooltip="Development covering both frontend and backend technologies">
                      full-stack web development
                    </KeywordTooltip>
                    , and{' '}
                    <KeywordTooltip tooltip="Practices combining development and operations for faster delivery">
                      DevOps
                    </KeywordTooltip>
                    . He's committed to crafting{' '}
                    <KeywordTooltip tooltip="Systems designed to handle growing user demands efficiently">
                      scalable software systems
                    </KeywordTooltip>
                    {' '}and constantly evolves his skills through hands-on projects and research.
                  </p>
                </CardContent>
              </Card>

              {/* Metrics Counters */}
              <div ref={statsRef} className="grid grid-cols-2 gap-6 reveal">
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="counter-number text-4xl font-bold text-blue-400 mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {projectsCount}+
                    </div>
                    <div className="text-gray-300 font-light">Projects Completed</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="counter-number text-4xl font-bold text-cyan-400 mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {yearsCount}+
                    </div>
                    <div className="text-gray-300 font-light">Years Learning</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Cards Grid */}
            <div className="space-y-6">
              <Card ref={cardRef2} className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 card-hover reveal card-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-4 font-['Poppins'] font-semibold">
                    Coding Philosophy
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    "Clean code is not written by following a set of rules. Clean code is written by following principles and having the discipline to apply them."
                  </p>
                </CardContent>
              </Card>

              <Card ref={cardRef3} className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 card-hover reveal card-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-cyan-400 mb-4 font-['Poppins'] font-semibold">
                    Career Goal
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    To become a skilled cloud architect and full-stack developer, building innovative solutions that solve real-world problems and make a positive impact on society.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 card-hover card-lift">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-['Poppins'] font-semibold">
                    Technical Focus
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    Specializing in modern web technologies, cloud infrastructure, and automation. Always exploring cutting-edge tools to deliver efficient, maintainable solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default About;
