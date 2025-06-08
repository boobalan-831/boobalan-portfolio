
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star } from "lucide-react";
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
      ],
      color: "from-emerald-500 to-teal-600"
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
      ],
      color: "from-blue-500 to-indigo-600"
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
      ],
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="education" className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-1/4 w-16 h-16 border-2 border-cyan-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rotate-12 animate-bounce-slow"></div>
      </div>

      <div className="container relative mx-auto px-6 py-20" ref={sectionRef}>
        {/* Modern Header Design */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-cyan-400 font-semibold text-lg tracking-wider uppercase">Academic Excellence</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-none">
            Education
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            A journey of continuous learning and academic achievements that shaped my technical expertise
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid gap-12 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <div 
              key={edu.degree}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 300}ms` }}
            >
              {/* Floating Card Design */}
              <Card className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${edu.color}`}></div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <CardContent className="p-10">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Left Content */}
                    <div className="flex-1 space-y-6">
                      {/* Status & Institution */}
                      <div className="flex items-center justify-between">
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          edu.status === "Pursuing" 
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${
                              edu.status === "Pursuing" ? "bg-emerald-400" : "bg-blue-400"
                            }`}></div>
                            {edu.status}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-slate-400">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">{edu.duration}</span>
                        </div>
                      </div>

                      {/* Degree Title */}
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                          <GraduationCap className="w-5 h-5" />
                          <span className="text-lg font-semibold">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-lg leading-relaxed">
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-3">
                        {edu.highlights.map((highlight, idx) => (
                          <span 
                            key={highlight}
                            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm rounded-xl border border-slate-600/50 text-slate-200 hover:from-slate-600/80 hover:to-slate-500/80 hover:border-slate-500/50 transition-all duration-300 transform hover:scale-105"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Content - Score */}
                    <div className="lg:w-48 flex lg:flex-col items-center lg:items-end gap-4">
                      <div className="text-center lg:text-right">
                        <div className="flex items-center gap-2 text-amber-400 mb-2">
                          <Award className="w-5 h-5" />
                          <span className="text-sm font-medium">Score</span>
                        </div>
                        <div className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                          {edu.cgpa || edu.percentage}
                        </div>
                      </div>
                      
                      {/* Decorative Element */}
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${edu.color} opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-500`}></div>
                        <Star className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white/80" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom Achievement Stats */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center justify-center">
            <div className="grid grid-cols-3 gap-12 bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-2xl border border-slate-600/30 rounded-3xl px-12 py-8 shadow-2xl">
              <div className="text-center group">
                <div className="text-4xl font-black text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">4+</div>
                <div className="text-slate-400 font-medium">Years Learning</div>
              </div>
              <div className="text-center group border-x border-slate-600/50 px-8">
                <div className="text-4xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">85%+</div>
                <div className="text-slate-400 font-medium">Avg Performance</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-black text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">CSE</div>
                <div className="text-slate-400 font-medium">Specialization</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Education;
