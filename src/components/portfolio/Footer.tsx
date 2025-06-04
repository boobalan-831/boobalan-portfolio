
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, MapPin, Phone, Github, Linkedin, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const footerRef = useScrollReveal();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.75;
      setShowBackToTop(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resourceLinks = [
    "Home", "About", "Skills", "Projects", 
    "Services", "Certifications", "Contact", "Blog"
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "#",
      external: true
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/boobalan831",
      external: true
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:boobalannandha20@gmail.com",
      external: false
    }
  ];

  const techStack = [
    { name: "C++", icon: "C++" },
    { name: "Java", icon: "☕" },
    { name: "Python", icon: "🐍" },
    { name: "JavaScript", icon: "JS" },
    { name: "React", icon: "⚛" },
    { name: "GCP", icon: "☁" },
    { name: "AWS", icon: "☁" },
    { name: "SQL", icon: "🗄" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="footer relative bg-gradient-to-b from-[#0a162a] to-[#071022] text-[#c0c0c0] py-12 px-8 overflow-hidden">
        {/* Code Matrix Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="code-matrix">
            <span>010101</span>
            <span>&lt;/&gt;</span>
            <span>function()</span>
            <span>class</span>
            <span>{"{ C++ }"}</span>
            <span>git commit</span>
            <span>GCP</span>
            <span>AWS</span>
            <span>SQL</span>
            <span>&lt;/&gt;</span>
            <span>010101</span>
            <span>function()</span>
          </div>
        </div>

        {/* Top Glow Border */}
        <div className="absolute top-0 left-0 right-0 h-px shadow-[inset_0_10px_20px_rgba(79,179,255,0.4)]"></div>
        
        <div 
          ref={footerRef}
          className="container mx-auto relative z-10 reveal"
        >
          {/* Three Column Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-8">
            
            {/* Column 1: About + Signature */}
            <div className="footer-column animate-column-entry opacity-0" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#4fb3ff] to-[#0ea5e9] bg-clip-text text-transparent font-['Poppins'] mb-4">
                Boobalan D
              </h3>
              <p className="font-light leading-relaxed mb-6 font-['Roboto']">
                <span className="crafting-text relative">Crafting</span> innovative solutions through code, cloud, and collaboration.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="signature-icon w-10 h-10 border-2 border-[#4fb3ff] rounded flex items-center justify-center text-[#4fb3ff] transition-all duration-300 hover:bg-[#4fb3ff] hover:text-[#071022] hover:scale-110"
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Resource Hub */}
            <div className="footer-column animate-column-entry opacity-0" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold text-[#4fb3ff] font-['Poppins'] mb-4">
                Resource Hub
              </h3>
              <ul className="resource-list space-y-2">
                {resourceLinks.map((link, index) => (
                  <li 
                    key={link}
                    className="terminal-link relative pl-6 cursor-pointer text-[#c0c0c0] font-['Roboto_Mono'] transition-transform duration-300 hover:translate-x-1 animate-resource-entry opacity-0"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    onClick={() => scrollToSection(link)}
                  >
                    <span className="absolute left-0 text-[#4fb3ff] arrow-flash">&gt;</span>
                    cd /portfolio/{link.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact & Tech Stack */}
            <div className="footer-column animate-column-entry opacity-0" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-bold text-[#4fb3ff] font-['Poppins'] mb-4">
                Reach Me
              </h3>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="contact-item flex items-center group">
                  <MapPin className="w-4 h-4 text-[#4fb3ff] mr-2 group-hover:text-white transition-colors duration-300" />
                  <span className="font-['Roboto'] text-sm">Chennai, Tamil Nadu, India</span>
                </div>
                
                <a
                  href="mailto:boobalannandha20@gmail.com"
                  className="contact-item flex items-center group hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-[#4fb3ff] mr-2 group-hover:text-white transition-colors duration-300" />
                  <span className="font-['Roboto'] text-sm">boobalannandha20@gmail.com</span>
                </a>
                
                <a
                  href="tel:+919597423518"
                  className="contact-item flex items-center group hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-[#4fb3ff] mr-2 group-hover:text-white transition-colors duration-300" />
                  <span className="font-['Roboto'] text-sm">+91 9597423518</span>
                </a>
              </div>

              {/* Tech Stack Badges */}
              <div className="tech-badges flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-badge w-10 h-10 border-2 border-[#4fb3ff] rounded-full flex items-center justify-center text-[#4fb3ff] bg-[#071022] opacity-0 scale-75 transition-all duration-300 hover:-translate-y-1 hover:bg-[#4fb3ff] hover:text-[#071022] hover:shadow-[0_0_12px_rgba(79,179,255,0.6)]"
                    style={{ animationDelay: `${1.0 + index * 0.05}s` }}
                    title={tech.name}
                  >
                    <span className="text-xs font-bold">{tech.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="border-t border-[#1a2230] pt-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-[#707070] font-['Roboto'] text-sm hover:text-white transition-colors duration-300">
              © 2025 Boobalan D. All rights reserved.
            </p>
            <p className="text-[#505050] font-['Roboto'] text-sm credit-text cursor-pointer hover:text-white transition-colors duration-300">
              Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top fixed bottom-8 left-1/2 transform -translate-x-1/2 w-14 h-14 border-2 border-[#4fb3ff] rounded-full bg-transparent flex items-center justify-center text-[#4fb3ff] transition-all duration-400 z-50 hover:shadow-[0_0_12px_rgba(79,179,255,0.6)] ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 chevron-pulse" />
      </button>
    </>
  );
};

export default Footer;
