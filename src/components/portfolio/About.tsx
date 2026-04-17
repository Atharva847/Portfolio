import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Code2, Database, Sparkles } from "lucide-react";

const stats = [
  { icon: Code2, value: "15+", label: "Projects" },
  { icon: Brain, value: "10+", label: "ML Models" },
  { icon: Database, value: "5+", label: "Datasets" },
  { icon: Sparkles, value: "3", label: "GenAI Apps" },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div
            className={`space-y-6 ${isVisible ? "animate-in-view" : "opacity-0"}`}
          >
            <div className="inline-block">
              <span className="text-xs font-mono text-primary uppercase tracking-widest border-l-2 border-primary pl-3">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Turning Data Into
              <span className="text-gradient block">Intelligent Solutions</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a data science student passionate about machine learning,
              deep learning, and the exciting field of generative AI. Currently
              pursuing my degree while building real-world projects that solve
              meaningful problems.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My journey started with curiosity about how machines can learn
              from data. Today, I work with neural networks, natural language
              processing, and computer vision to create impactful applications.
            </p>

            <div className="flex items-center gap-2 pt-4">
              <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-xl font-bold">
                A
              </div>
              <div>
                <p className="font-semibold">Atharva Kale</p>
                <p className="text-sm text-muted-foreground font-mono">
                  B.Tech Data Science Student
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Savitribai Phule Pune University
                </p>
              </div>
            </div>
          </div>

          {/* Right - Stats */}
          <div
            className={`grid grid-cols-2 gap-4 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-4xl font-bold tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
