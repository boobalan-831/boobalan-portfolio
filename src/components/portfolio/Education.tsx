
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Education = () => {
  const sectionRef = useScrollReveal();
  
  const educationData = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Your University Name",
      location: "City, State",
      duration: "2021 - 2025",
      cgpa: "8.5/10",
      status: "Pursuing",
      description: "Focused on software engineering, data structures, algorithms, and modern web technologies.",
      highlights: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Management",
        "Web Development"
      ]
    },
    {
      degree: "Higher Secondary Education (12th)",
      institution: "Your School Name",
      location: "City, State", 
      duration: "2019 - 2021",
      percentage: "85%",
      status: "Completed",
      description: "Science stream with Mathematics, Physics, and Chemistry focus.",
      highlights: [
        "Mathematics",
        "Physics", 
        "Chemistry",
        "Computer Science"
      ]
    },
    {
      degree: "Secondary Education (10th)",
      institution: "Your School Name",
      location: "City, State",
      duration: "2018 - 2019", 
      percentage: "90%",
      status: "Completed",
      description: "Strong foundation in core subjects with excellent academic performance.",
      highlights: [
        "Mathematics",
        "Science",
        "English",
        "Social Studies"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "Pursuing" 
      ? "text-blue-400 bg-blue-500/20 border-blue-500/30"
      : "text-green-400 bg-green-500/20 border-green-500/30";
  };

  return (
    <section id="education" className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-400 tracking-wider uppercase">Academic Journey</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            Education
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Building a strong foundation through continuous learning and academic excellence
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 transform md:-translate-x-1/2"></div>
            
            {educationData.map((edu, index) => (
              <div 
                key={edu.degree}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-75"></div>
                </div>

                {/* Content Card */}
                <Card className={`relative ml-20 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                } bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-8">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getStatusColor(edu.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
                      {edu.status}
                    </div>

                    {/* Institution and Location */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                        <div className="flex items-center gap-2 text-blue-400 mb-1">
                          <GraduationCap className="w-4 h-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Grade */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{edu.duration}</span>
                      </div>
                      {(edu.cgpa || edu.percentage) && (
                        <div className="flex items-center gap-2 text-green-400">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-medium">{edu.cgpa || edu.percentage}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight, idx) => (
                        <span 
                          key={highlight}
                          className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white transition-all duration-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-8 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-8 py-6 shadow-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">4+</div>
              <div className="text-sm text-slate-400">Years of Learning</div>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">85%+</div>
              <div className="text-sm text-slate-400">Average Score</div>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">CSE</div>
              <div className="text-sm text-slate-400">Specialization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
