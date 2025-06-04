
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
    <section id="services" className="page-container py-12 sm:py-16 lg:py-20 bg-slate-800/30">
      <div className="page-heading text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Services
        </h2>
        <div className="underline w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
      </div>

      <div className="content-wrapper services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <Card 
            key={service.title}
            className={`card bg-slate-800/50 border-slate-700 shadow-xl ${getColorClass(service.color, 'shadow')} ${getColorClass(service.color, 'hover')} transition-all duration-300 transform hover:scale-105 animate-fade-in`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardContent className="p-6 sm:p-8 text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full ${getColorClass(service.color, 'bg')} ${getColorClass(service.color, 'border')} border-2 flex items-center justify-center mb-4 sm:mb-6`}>
                <service.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${getColorClass(service.color, 'text')}`} />
              </div>
              
              <h3 className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 ${getColorClass(service.color, 'text')}`}>
                {service.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
