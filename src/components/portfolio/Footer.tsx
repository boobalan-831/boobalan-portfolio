
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const footerRef = useScrollReveal();
  const quickLinksRef = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  const socialRef = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  const copyrightRef = useScrollReveal({ threshold: 0.3, rootMargin: '0px 0px -30px 0px' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinksCol1 = ["Home", "About", "Skills"];
  const quickLinksCol2 = ["Projects", "Services", "Certifications", "Contact"];

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

  return (
    <footer className="footer bg-[#000a14] relative">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px shadow-[inset_0_10px_10px_-10px_rgba(79,179,255,0.6)]"></div>
      
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Grid */}
        <div 
          ref={footerRef}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12 reveal"
        >
          {/* Brand & Description */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up stagger-1">
            <div>
              <div className="logo text-3xl font-bold text-[#4fb3ff] mb-4 font-['Poppins'] animate-fade-in-up stagger-1">
                Boobalan D
              </div>
              <p className="text-[#c0c0c0] font-light leading-relaxed animate-fade-in-up stagger-2 text-sm">
                Creating innovative solutions through code, cloud, and collaboration.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className={`social-icon w-10 h-10 rounded bg-slate-800/50 border border-slate-700 flex items-center justify-center text-[#c0c0c0] hover:bg-[#4fb3ff] hover:text-white hover:border-[#4fb3ff] transition-all duration-300 group animate-bounce-in stagger-${index + 3}`}
                  title={social.label}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div 
            ref={quickLinksRef}
            className="space-y-6 reveal"
          >
            <h3 className="text-lg font-semibold text-white mb-6 font-['Poppins']">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinksCol1.map((link, index) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`block text-[#c0c0c0] hover:text-white transition-all duration-300 text-left font-light relative quick-link animate-slide-in-left stagger-${index + 1} text-sm`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-6 font-['Poppins'] opacity-0">
              &nbsp;
            </h3>
            <nav className="space-y-3">
              {quickLinksCol2.map((link, index) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`block text-[#c0c0c0] hover:text-white transition-all duration-300 text-left font-light relative quick-link animate-slide-in-left stagger-${index + 4} text-sm`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div 
            ref={socialRef}
            className="space-y-6 reveal"
          >
            <h3 className="text-lg font-semibold text-white mb-6 font-['Poppins']">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-[#c0c0c0] animate-fade-in-up stagger-7">
                <MapPin className="w-4 h-4 text-[#4fb3ff] mt-1 flex-shrink-0" />
                <span className="font-light text-sm">Chennai, Tamil Nadu, India</span>
              </div>
              
              <a
                href="mailto:boobalannandha20@gmail.com"
                className="flex items-start space-x-3 text-[#c0c0c0] hover:text-white transition-all duration-300 group animate-fade-in-up stagger-8"
              >
                <Mail className="w-4 h-4 text-[#4fb3ff] group-hover:scale-110 transition-transform duration-300 mt-1 flex-shrink-0" />
                <span className="font-light text-sm break-all">boobalannandha20@gmail.com</span>
              </a>
              
              <a
                href="tel:+919597423518"
                className="flex items-start space-x-3 text-[#c0c0c0] hover:text-white transition-all duration-300 group animate-fade-in-up stagger-9"
              >
                <Phone className="w-4 h-4 text-[#4fb3ff] group-hover:scale-110 transition-transform duration-300 mt-1 flex-shrink-0" />
                <span className="font-light text-sm">+91 9597423518</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div 
          ref={copyrightRef}
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 reveal"
        >
          <p className="text-[#c0c0c0] font-light animate-fade-in-up stagger-10 text-sm">
            © 2025 Boobalan D. All rights reserved.
          </p>
          <p className="text-[#c0c0c0] text-sm opacity-60 font-light animate-fade-in-up stagger-11">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
