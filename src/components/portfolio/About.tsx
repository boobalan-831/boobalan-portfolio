
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10">
              <CardContent className="p-8">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Boobalan D is a Computer Science and Engineering student with a passion for 
                  cloud-native solutions, full-stack web development, and DevOps. He's committed 
                  to crafting scalable software systems and constantly evolves his skills through 
                  hands-on projects and research.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">3+</div>
                  <div className="text-gray-300">Years Learning</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">Coding Philosophy</h3>
                <p className="text-gray-300 leading-relaxed">
                  "Clean code is not written by following a set of rules. Clean code is written by following principles and having the discipline to apply them."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Career Goal</h3>
                <p className="text-gray-300 leading-relaxed">
                  To become a skilled cloud architect and full-stack developer, building innovative solutions that solve real-world problems and make a positive impact on society.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
