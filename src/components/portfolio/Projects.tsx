
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const project = {
    title: "Automated Robot for Crop Development",
    description: "An innovative agricultural automation project focused on enhancing crop development through intelligent robotics. This project demonstrates the integration of hardware and software to create sustainable farming solutions.",
    techStack: ["Python", "IoT Sensors", "Machine Learning", "Arduino", "Computer Vision"],
    accomplishments: [
      "Implemented autonomous navigation system",
      "Integrated multiple sensor data for crop monitoring",
      "Developed machine learning algorithms for crop health analysis",
      "Created user-friendly interface for farmers"
    ]
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-blue-400 mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/30 px-4 py-2 rounded-full text-blue-300 text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-cyan-400 mb-4">Key Accomplishments</h4>
                  <ul className="space-y-3">
                    {project.accomplishments.map((accomplishment, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300">{accomplishment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  View More Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
