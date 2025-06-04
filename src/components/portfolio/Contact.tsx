
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, User, Linkedin, Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
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
    <section id="contact" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-blue-400 mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <Card key={info.label} className="bg-slate-800/50 border-slate-700 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <a 
                      href={info.href}
                      className="flex items-center space-x-4 group"
                      target={info.label === "LinkedIn" ? "_blank" : undefined}
                      rel={info.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">{info.label}</div>
                        <div className="text-white group-hover:text-blue-400 transition-colors duration-300">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-6">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-slate-700 shadow-2xl shadow-blue-500/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-300 mb-2 block">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400 transition-all duration-300 min-h-[120px]"
                    placeholder="Your message here..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
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
