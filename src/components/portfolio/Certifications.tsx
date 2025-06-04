
import { Card, CardContent } from "@/components/ui/card";

const Certifications = () => {
  const certifications = [
    {
      title: "Google Cloud Badge",
      subtitle: "Cloud Computing Fundamentals",
      provider: "Google Cloud",
      year: "2024",
      description: "Fundamentals of cloud computing and Google Cloud Platform services"
    },
    {
      title: "AI For Everyone",
      subtitle: "Introduction to Artificial Intelligence",
      provider: "Google via Coursera",
      year: "2024",
      description: "Comprehensive introduction to AI concepts and applications"
    },
    {
      title: "NPTEL DBMS",
      subtitle: "Database Management Systems",
      provider: "NPTEL",
      year: "2023",
      description: "Advanced concepts in database design and management"
    },
    {
      title: "NPTEL Distributed Systems",
      subtitle: "Distributed Computing",
      provider: "NPTEL",
      year: "2023",
      description: "Principles and practices of distributed system architecture"
    }
  ];

  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-600"></div>
            
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full border-4 border-slate-900 z-10"></div>
                
                <Card 
                  className={`w-5/12 bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 animate-fade-in ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="text-right mb-2">
                      <span className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/30 px-3 py-1 rounded-full text-blue-300 text-sm font-medium">
                        {cert.year}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-blue-400 mb-2">
                      {cert.title}
                    </h3>
                    
                    <h4 className="text-lg font-semibold text-cyan-300 mb-2">
                      {cert.subtitle}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-3">
                      {cert.provider}
                    </p>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
