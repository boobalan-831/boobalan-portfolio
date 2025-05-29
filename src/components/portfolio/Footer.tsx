
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, User, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const footerRef = useScrollReveal();
  const quickLinksRef = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  const socialRef = useScrollReveal({ threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  const copyrightRef = useScrollReveal({ threshold: 0.3, rootMargin: '0px 0px -30px 0px' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    "Home", "About", "Skills", "Projects", "Services", "Certifications", "Contact"
  ];

  const contactInfo = [
    {
      icon: User,
      label: "Phone",
      value: "+91-9597423518",
      href: "tel:+919597423518"
    },
    {
      icon: Mail,
      label: "Email",
      value: "boobalannandha20@gmail.com",
      href: "mailto:boobalannandha20@gmail.com"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/boobalan831",
      external: true
    },
    {
      icon: Github,
      label: "GitHub",
      href: "#",
      external: true
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
          className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-12 reveal"
        >
          {/* About & Logo */}
          <div className="space-y-6 animate-fade-in-up stagger-1">
            <div>
              <div className="logo text-3xl font-bold text-[#4fb3ff] mb-4 font-['Poppins'] animate-fade-in-up stagger-1">
                BD
              </div>
              <p className="text-[#c0c0c0] font-light leading-relaxed animate-fade-in-up stagger-2">
                Crafting cloud-native & full-stack solutions since 2023
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            ref={quickLinksRef}
            className="space-y-6 reveal"
          >
            <h3 className="text-xl font-semibold text-white mb-6 font-['Poppins']">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`block text-[#c0c0c0] hover:text-white transition-all duration-300 text-left font-light relative quick-link animate-slide-in-left stagger-${index + 1}`}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div 
            ref={socialRef}
            className="space-y-8 reveal"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 font-['Poppins']">
                Contact
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className={`flex items-center space-x-3 text-[#c0c0c0] hover:text-white transition-all duration-300 group animate-fade-in-up stagger-${index + 3}`}
                  >
                    <info.icon className="w-5 h-5 text-[#4fb3ff] group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-light">{info.value}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6 font-['Poppins']">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className={`social-icon w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-[#4fb3ff] hover:bg-[#4fb3ff] hover:text-white transition-all duration-300 group animate-bounce-in stagger-${index + 5}`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Footer Note */}
        <div 
          ref={copyrightRef}
          className="border-t border-slate-800 pt-8 text-center space-y-2 reveal"
        >
          <p className="text-[#c0c0c0] font-light animate-fade-in-up stagger-6">
            © 2025 Boobalan D. All Rights Reserved.
          </p>
          <p className="text-[#c0c0c0] text-sm opacity-60 font-light animate-fade-in-up stagger-7">
            Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
