
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, Linkedin, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        'service_7akbe2k', // Service ID
        'template_h0ffpvg', // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Boobalan D',
        },
        'mcTijNOwYSlAOT4u4' // Public Key
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/boobalan831",
      href: "https://linkedin.com/in/boobalan831"
    }
  ];

  const handleResumeDownload = () => {
    window.open("https://drive.google.com/file/d/1ZqqYr4PrtxnsNGxfgKV2Xx6HV6z9oVyF/view?usp=sharing", "_blank");
  };

  return (
    <section id="contact" className="py-10 md:py-20 bg-slate-800/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 md:mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              {contactInfo.map((info) => (
                <Card key={info.label} className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <a 
                      href={info.href}
                      className="flex items-center space-x-3 md:space-x-4 group"
                      target={info.label === "LinkedIn" ? "_blank" : undefined}
                      rel={info.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-gray-400">{info.label}</div>
                        <div className="text-white group-hover:text-blue-400 transition-colors duration-300 break-words text-sm md:text-base">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 md:pt-6">
              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 md:px-8 py-2 md:py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-slate-700 shadow-2xl shadow-blue-500/20">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block text-sm md:text-base">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
                    placeholder="Your Name"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block text-sm md:text-base">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
                    placeholder="your.email@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block text-sm md:text-base">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 min-h-[100px] md:min-h-[120px] text-sm md:text-base resize-none"
                    placeholder="Your message here..."
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2 md:py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
