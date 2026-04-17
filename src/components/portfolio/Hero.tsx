import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToProjects = () => {
    const projects = document.getElementById("projects");
    if (!projects) return;

    const startY = window.scrollY;
    const targetY = projects.getBoundingClientRect().top + window.scrollY - 24;
    const duration = 1100;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + (targetY - startY) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-30" /> */}
      {/* <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" /> */}
      {/* <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" /> */}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Tag removed and moved to bottom */}
        {/* <div
          className="animate-in-view inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8"
          style={{ animationDelay: "0s" }}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Available for Opportunities
          </span>
        </div> */}

        {/* Title */}
        <h1
          className="animate-in-view text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block text-white">Hi, I'm Atharva</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-in-view text-xl md:text-2xl text-muted-foreground mb-4 font-mono"
          style={{ animationDelay: "0.2s" }}
        >
          ML • GenAI • DL
        </p>

        <p
          className="animate-in-view text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
          style={{ animationDelay: "0.3s" }}
        >
          Passionate about transforming data into intelligent solutions. Building ML models, neural networks, and AI-powered applications.
        </p>

        {/* CTAs */}
        <div
          className="animate-in-view flex flex-col sm:flex-row gap-4 justify-center mb-12"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 sm:px-8"
            onClick={scrollToProjects}
          >
            View Projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto rounded-full px-6 sm:px-8 border-border hover:bg-secondary hover:text-white transition-colors"
          >
            <a href="/cv-viewer.html" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </Button>
        </div>

        {/* Social Links replaced by Available for Opportunities */}
        <div
          className="animate-in-view flex items-center justify-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Available for Opportunities
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
