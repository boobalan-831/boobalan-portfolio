
import { Card, CardContent } from "@/components/ui/card";
import { Code, Book, User, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Services = () => {
  const sectionRef = useScrollReveal();
  
  const services = [
    {
      title: "Responsive Web Development",
      description: "Creating modern, responsive websites using the latest web technologies including React.js, HTML5, CSS3, and JavaScript.",
      icon: Code,
      color: "blue",
      features: ["React.js", "TypeScript", "Tailwind CSS", "Performance Optimization"]
    },
    {
      title: "Basic Cloud Integration",
      description: "Implementing cloud solutions using Google Cloud Platform and AWS to create scalable and reliable applications.",
      icon: Book,
      color: "cyan",
      features: ["AWS Services", "Google Cloud", "CI/CD", "Scalable Architecture"]
    },
    {
      title: "UI Prototyping",
      description: "Designing user-friendly interfaces and prototypes using Figma to create intuitive user experiences.",
      icon: User,
      color: "purple",
      features: ["Figma Design", "User Research", "Wireframing", "Interactive Prototypes"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        gradient: "from-blue-500/20 via-blue-600/10 to-transparent",
        border: "border-blue-500/30",
        glow: "shadow-blue-500/25",
        accent: "text-blue-400",
        iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
        hoverGlow: "group-hover:shadow-blue-500/40"
      },
      cyan: {
        gradient: "from-cyan-500/20 via-cyan-600/10 to-transparent",
        border: "border-cyan-500/30",
        glow: "shadow-cyan-500/25",
        accent: "text-cyan-400",
        iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        hoverGlow: "group-hover:shadow-cyan-500/40"
      },
      purple: {
        gradient: "from-purple-500/20 via-purple-600/10 to-transparent",
        border: "border-purple-500/30",
        glow: "shadow-purple-500/25",
        accent: "text-purple-400",
        iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
        hoverGlow: "group-hover:shadow-purple-500/40"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative mx-auto px-6" ref={sectionRef}>
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-400 tracking-wider uppercase">What I Offer</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
            Services
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Delivering cutting-edge solutions with precision, creativity, and technical excellence
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            
            return (
              <Card 
                key={service.title}
                className={`group relative bg-gradient-to-br ${colors.gradient} backdrop-blur-xl border ${colors.border} shadow-2xl ${colors.glow} hover:shadow-3xl ${colors.hoverGlow} transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 overflow-hidden animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                <CardContent className="relative p-8">
                  {/* Icon with advanced styling */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${colors.iconBg} shadow-lg flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300`}>
                      <service.icon className="w-10 h-10 text-white" />
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-2xl ${colors.iconBg} blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/10 rounded-full animate-bounce delay-700"></div>
                  </div>
                  
                  {/* Enhanced title */}
                  <h3 className={`text-2xl font-bold mb-6 ${colors.accent} group-hover:text-white transition-colors duration-300`}>
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed mb-8 group-hover:text-slate-200 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-slate-300 group-hover:bg-white/20 group-hover:text-white transition-all duration-300"
                        style={{ animationDelay: `${(index * 200) + (idx * 100)}ms` }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      Learn More
                    </span>
                    <ArrowRight className={`w-5 h-5 ${colors.accent} group-hover:translate-x-2 transition-transform duration-300`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl px-8 py-6 shadow-2xl">
            <div className="flex -space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-200"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-400"></div>
            </div>
            <span className="text-slate-300 font-medium">Ready to start your project?</span>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
