import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={ref} className="text-center">
          <span
            className={`text-xs font-mono text-primary uppercase tracking-widest ${isVisible ? "animate-in-view" : "opacity-0"}`}
          >
            Get In Touch
          </span>
          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tighter mt-4 mb-6 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Let's Work
            <span className="text-gradient block">Together</span>
          </h2>
          <p
            className={`text-lg text-muted-foreground max-w-xl mx-auto mb-10 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            I'm always open to discussing new projects, research opportunities,
            or just chatting about data science and AI.
          </p>

          {/* CTA Button with beam effect */}
          <div
            className={`mb-12 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              size="lg"
              asChild
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-6 text-lg animate-pulse-glow"
            >
              <a
                href="https://www.linkedin.com/in/atharva-k-8249a81b4/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Say Hello
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <a
                  href="https://www.linkedin.com/in/atharva-k-8249a81b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                </span>
              </a>
            </Button>

          </div>

          {/* Contact Info */}
          <div
            className={`flex flex-col md:flex-row items-center justify-center gap-8 mb-12 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="mailto:kaleatharva108@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              kaleatharva108@gmail.com
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              Pune, Maharashtra
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`flex items-center justify-center gap-4 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="https://github.com/atharva847/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full border border-border bg-card hover:bg-secondary hover:border-primary/50 transition-all group"
            >
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/atharva-k-8249a81b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full border border-border bg-card hover:bg-secondary hover:border-primary/50 transition-all group"
            >

              <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>

          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div
        className={`mt-24 pt-8 border-t border-border text-center ${isVisible ? "animate-in-view" : "opacity-0"}`}
        style={{ animationDelay: "0.6s" }}
      >
        <p className="text-sm text-muted-foreground font-mono">
          © 2024 Alex Chen. Built with React & Tailwind CSS.
        </p>
      </div> */}
    </section>
  );
};

export default Contact;
