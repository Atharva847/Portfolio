import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Award, Briefcase } from "lucide-react";

const timeline = [
  {
    type: "education",
    icon: GraduationCap,
    title: "Diploma in AI & ML",
    organization: "AISSMS, Pune, Maharashtra",
    period: "2021 - 2024",
    description: "Specializing in AI & ML : 82%",
    highlights: ["AI & ML Basics", "Mathematics", "Statistics", "Python", "Database"],
  },
  {
    type: "certification",
    icon: GraduationCap,
    title: "B.Tech in Data Science",
    organization: "Savitribai Phule Pune University",
    period: "2024 - 2027",
    description: "Completed 5-course specialization covering neural networks, CNNs, RNNs, and more.",
    highlights: ["Neural Networks", "Sequence Models", "Computer Vision"],
  },
  {
    type: "experience",
    icon: Award,
    title: "Physics Wallah Masters 2.0",
    organization: "Physics Wallah",
    period: "2023 - 2024",
    description: "Built ML pipelines for recommendation systems serving 100K+ users.",
    highlights: ["Machine Learning", "Deep Learning", "GenAI", "Natural Language Processing", "Computer Vision"],
  },
  {
    type: "certification",
    icon: Briefcase,
    title: "Freelancer",
    organization: "zuru.ai ",
    period: "2022 - 2023",
    description: "Worked as a freelance Data Annotator and Transcriptionist on real-world datasets, contributing to the preparation and labeling of data for AI and ML model training.",
    highlights: ["Data Preparation", "Data Engineering", "Communication"],
  },
];

const TimelineItem = ({ item, index }: { item: typeof timeline[0], index: number }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        } ${isVisible ? "animate-in-view" : "opacity-0"}`}
      style={{ transitionDelay: "0.s" }}
    >
      {/* Content */}
      <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div
          className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors ${index % 2 === 0 ? "md:ml-auto" : ""
            } max-w-md w-full`}
        >
          <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
            <span className="text-xs font-mono text-primary uppercase">
              {item.period}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-1">{item.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {item.organization}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {item.description}
          </p>
          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
            {item.highlights.map((h) => (
              <span
                key={h}
                className="px-2 py-1 text-xs font-mono bg-secondary rounded border border-border"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Icon */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
        <item.icon className="w-4 h-4 text-primary" />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={ref} className="text-center mb-16">
          <span
            className={`text-xs font-mono text-primary uppercase tracking-widest ${isVisible ? "animate-in-view" : "opacity-0"}`}
          >
            Background
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tighter mt-4 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Education & Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - Left on mobile, Center on desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
