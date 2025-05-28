
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Navigation from "@/components/portfolio/Navigation";
import Preloader from "@/components/Preloader";

const Index = () => {
  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Certifications />
        <Contact />
        
        {/* Footer */}
        <footer className="bg-darker-blue border-t border-blue-500/20 py-8">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-6">
              <div className="flex justify-center space-x-6 mb-4">
                <a href="tel:+919597423518" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  📞
                </a>
                <a href="mailto:boobalannandha20@gmail.com" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  📧
                </a>
                <a href="https://linkedin.com/in/boobalan831" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                  🔗
                </a>
              </div>
            </div>
            <div className="border-t border-blue-500/20 pt-6">
              <p className="text-gray-400">
                © 2025 Boobalan D. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
