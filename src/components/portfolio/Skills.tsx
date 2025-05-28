
import { Card, CardContent } from "@/components/ui/card";
import { Code, Book, Github } from "lucide-react";

const Skills = () => {
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

  const getColorClass = (color: string, type: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-600/30",
        text: "text-blue-400",
        shadow: "shadow-blue-500/20"
      },
      cyan: {
        bg: "bg-cyan-600/20",
        border: "border-cyan-600/30",
        text: "text-cyan-400",
        shadow: "shadow-cyan-500/20"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-600/30",
        text: "text-purple-400",
        shadow: "shadow-purple-500/20"
      }
    };
    return colors[color as keyof typeof colors][type as keyof typeof colors.blue];
  };

  return (
    <section id="skills" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className={`bg-slate-800/50 border-slate-700 shadow-xl ${getColorClass(category.color, 'shadow')} hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full ${getColorClass(category.color, 'bg')} ${getColorClass(category.color, 'border')} border-2 flex items-center justify-center mb-4`}>
                    <category.icon className={`w-8 h-8 ${getColorClass(category.color, 'text')}`} />
                  </div>
                  <h3 className={`text-xl font-semibold ${getColorClass(category.color, 'text')}`}>
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill}
                      className="bg-slate-700/50 rounded-lg p-3 text-center text-gray-300 hover:bg-slate-700/70 transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">UI Tools</h3>
              <div className="bg-slate-700/50 rounded-lg p-4 inline-block">
                <span className="text-gray-300 text-lg">Figma (Basic)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
