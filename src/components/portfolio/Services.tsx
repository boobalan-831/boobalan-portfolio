
import { Card, CardContent } from "@/components/ui/card";
import { Code, Book, User } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Responsive Web Development",
      description: "Creating modern, responsive websites using the latest web technologies including React.js, HTML5, CSS3, and JavaScript.",
      icon: Code,
      color: "blue"
    },
    {
      title: "Basic Cloud Integration",
      description: "Implementing cloud solutions using Google Cloud Platform and AWS to create scalable and reliable applications.",
      icon: Book,
      color: "cyan"
    },
    {
      title: "UI Prototyping",
      description: "Designing user-friendly interfaces and prototypes using Figma to create intuitive user experiences.",
      icon: User,
      color: "purple"
    }
  ];

  const getColorClass = (color: string, type: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-600/20",
        border: "border-blue-600/30",
        text: "text-blue-400",
        shadow: "shadow-blue-500/20",
        hover: "hover:shadow-blue-500/30"
      },
      cyan: {
        bg: "bg-cyan-600/20",
        border: "border-cyan-600/30",
        text: "text-cyan-400",
        shadow: "shadow-cyan-500/20",
        hover: "hover:shadow-cyan-500/30"
      },
      purple: {
        bg: "bg-purple-600/20",
        border: "border-purple-600/30",
        text: "text-purple-400",
        shadow: "shadow-purple-500/20",
        hover: "hover:shadow-purple-500/30"
      }
    };
    return colors[color as keyof typeof colors][type as keyof typeof colors.blue];
  };

  return (
    <section id="services" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className={`bg-slate-800/50 border-slate-700 shadow-xl ${getColorClass(service.color, 'shadow')} ${getColorClass(service.color, 'hover')} transition-all duration-300 transform hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full ${getColorClass(service.color, 'bg')} ${getColorClass(service.color, 'border')} border-2 flex items-center justify-center mb-6`}>
                  <service.icon className={`w-10 h-10 ${getColorClass(service.color, 'text')}`} />
                </div>
                
                <h3 className={`text-2xl font-semibold mb-4 ${getColorClass(service.color, 'text')}`}>
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
