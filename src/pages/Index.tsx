
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Services from "@/components/portfolio/Services";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Navigation from "@/components/portfolio/Navigation";
import Preloader from "@/components/Preloader";
import Footer from "@/components/portfolio/Footer";

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
        <Footer />
      </div>
    </>
  );
};

export default Index;
