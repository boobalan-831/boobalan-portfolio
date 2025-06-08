
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
      {/* Modern Geometric Background - Optimized for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 md:top-20 md:left-10 w-32 h-32 md:w-72 md:h-72 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-40 h-40 md:w-96 md:h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-64 md:h-64 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Geometric Shapes - Hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute top-32 right-1/4 w-16 h-16 border-2 border-cyan-400/30 rotate-45 animate-spin-slow"></div>
        <div className="hidden md:block absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rotate-12 animate-bounce-slow"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6 py-10 md:py-20" ref={sectionRef}>
        {/* Mobile-Optimized Header Design */}
        <div className="text-center mb-12 md:mb-24">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
            <div className="p-2 md:p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl md:rounded-2xl shadow-lg">
              <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-cyan-400 font-semibold text-sm md:text-lg tracking-wider uppercase">Academic Excellence</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent leading-tight">
            Education
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light px-4">
            A journey of continuous learning and academic achievements that shaped my technical expertise
          </p>
        </div>

        {/* Mobile-Optimized Education Cards Grid */}
        <div className="grid gap-6 md:gap-12 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <div 
              key={edu.degree}
              className="group relative transform transition-all duration-700 hover:scale-105"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              {/* Mobile-Optimized Floating Card Design */}
              <Card className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 md:h-2 bg-gradient-to-r ${edu.color}`}></div>
                
                {/* Floating Elements - Smaller on mobile */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <CardContent className="p-4 md:p-10">
                  <div className="flex flex-col gap-4 md:gap-8">
                    {/* Mobile-First Content Layout */}
                    <div className="space-y-4 md:space-y-6">
                      {/* Status & Duration - Mobile Stack */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className={`inline-flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
                          edu.status === "Pursuing" 
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}>
                          <div className="flex items-center gap-1 md:gap-2">
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${
                              edu.status === "Pursuing" ? "bg-emerald-400" : "bg-blue-400"
                            }`}></div>
                            {edu.status}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 md:gap-3 text-slate-400">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base font-medium">{edu.duration}</span>
                        </div>
                      </div>

                      {/* Degree Title - Mobile Optimized */}
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight">
                          {edu.degree}
                        </h3>
                        <div className="flex items-center gap-2 md:gap-3 text-cyan-400 mb-1 md:mb-2">
                          <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-base md:text-lg font-semibold">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 text-slate-400">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="text-sm md:text-base">{edu.location}</span>
                        </div>
                      </div>

                      {/* Description - Mobile Optimized */}
                      <p className="text-slate-300 text-sm md:text-lg leading-relaxed">
                        {edu.description}
                      </p>

                      {/* Mobile-Optimized Highlights */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {edu.highlights.map((highlight, idx) => (
                          <span 
                            key={highlight}
                            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-slate-600/50 text-slate-200 hover:from-slate-600/80 hover:to-slate-500/80 hover:border-slate-500/50 transition-all duration-300 transform hover:scale-105"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Score Section - Mobile Optimized */}
                    <div className="flex justify-between items-center border-t border-slate-700/50 pt-4 md:pt-6">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Award className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-medium">Score</span>
                      </div>
                      <div className="text-2xl md:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        {edu.cgpa || edu.percentage}
                      </div>
                      
                      {/* Decorative Element - Smaller on mobile */}
                      <div className="relative">
                        <div className={`w-10 h-10 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br ${edu.color} opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-500`}></div>
                        <Star className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-8 md:h-8 text-white/80" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile-Optimized Bottom Achievement Stats */}
        <div className="mt-12 md:mt-24 text-center px-4">
          <div className="inline-flex items-center justify-center max-w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-2xl border border-slate-600/30 rounded-2xl md:rounded-3xl px-6 py-6 md:px-12 md:py-8 shadow-2xl w-full max-w-2xl">
              <div className="text-center group">
                <div className="text-2xl md:text-4xl font-black text-emerald-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">4+</div>
                <div className="text-slate-400 font-medium text-sm md:text-base">Years Learning</div>
              </div>
              <div className="text-center group sm:border-x border-slate-600/50 sm:px-4 md:px-8">
                <div className="text-2xl md:text-4xl font-black text-cyan-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">85%+</div>
                <div className="text-slate-400 font-medium text-sm md:text-base">Avg Performance</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-4xl font-black text-purple-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300">CSE</div>
                <div className="text-slate-400 font-medium text-sm md:text-base">Specialization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
