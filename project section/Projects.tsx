import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowUpRight, Github, Brain, Cpu, Sparkles, ExternalLink, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import ProjectModal from "./ProjectModal";

// Import custom project images
import projectSentiment from "@/assets/project-sentiment.jpg";
import projectSkinCancer from "@/assets/project-skin-cancer.jpg";
import projectImageCaptioning from "@/assets/project-image-captioning.jpg";
import projectEdaAutomation from "@/assets/project-eda-automation.jpg";

const projects = [
  {
    id: 1,
    title: "Next Word Predictor",
    description: "LSTM-based language model that predicts the next word in a sequence, deployed with an interactive Streamlit interface.",
    fullDescription: "A deep learning language model built with Keras LSTM layers that learns patterns from text corpora to predict the most likely next word. Features an interactive Streamlit web app where users can type partial sentences and get real-time predictions with confidence scores.",
    category: "DL",
    tech: ["Python", "Keras", "LSTM", "Streamlit", "TensorFlow", "NumPy"],
    github: "https://github.com",
    demo: "#",
    image: projectSentiment,
    accent: "orange",
    features: [
      "Real-time next word prediction",
      "Interactive Streamlit web interface",
      "LSTM-based sequence modeling",
      "Configurable prediction confidence",
      "Multiple corpus training support",
      "Top-K word suggestions"
    ],
    metrics: [
      { label: "Model", value: "LSTM" },
      { label: "Framework", value: "Keras" },
      { label: "Interface", value: "Streamlit" },
      { label: "Predictions", value: "Top-5" }
    ],
    timeline: "2 months",
    team: "Solo Project"
  },
  {
    id: 2,
    title: "Skin Cancer Detection",
    description: "Deep learning model for skin cancer classification using Keras transfer learning, achieving 88% accuracy.",
    fullDescription: "A medical imaging AI system that classifies skin lesion images to detect potential skin cancer using transfer learning with pre-trained models in Keras. The model achieves 88% accuracy on dermoscopic images, assisting dermatologists in early detection and diagnosis.",
    category: "DL",
    tech: ["Keras", "Transfer Learning", "Python", "TensorFlow", "OpenCV", "NumPy"],
    github: "https://github.com",
    demo: "#",
    image: projectSkinCancer,
    accent: "cyan",
    features: [
      "88% classification accuracy",
      "Transfer learning with pre-trained models",
      "Dermoscopic image processing",
      "Multi-class skin lesion classification",
      "Data augmentation pipeline",
      "Grad-CAM visualization for explainability"
    ],
    metrics: [
      { label: "Accuracy", value: "88%" },
      { label: "Method", value: "Transfer" },
      { label: "Classes", value: "7" },
      { label: "Framework", value: "Keras" }
    ],
    timeline: "3 months",
    team: "Solo Project"
  },
  {
    id: 3,
    title: "Image Captioning with LSTM",
    description: "Automatic image caption generation using CNN-LSTM architecture that describes image content in natural language.",
    fullDescription: "An image captioning system that combines CNN feature extraction with LSTM sequence generation to automatically produce natural language descriptions of images. The model learns visual-semantic mappings to generate accurate, fluent captions for diverse image content.",
    category: "DL",
    tech: ["Keras", "LSTM", "CNN", "Python", "TensorFlow", "NLTK"],
    github: "https://github.com",
    demo: "#",
    image: projectImageCaptioning,
    accent: "purple",
    features: [
      "CNN-LSTM encoder-decoder architecture",
      "Automatic caption generation",
      "Beam search decoding",
      "BLEU score evaluation",
      "Attention mechanism visualization",
      "Support for diverse image types"
    ],
    metrics: [
      { label: "Architecture", value: "CNN-LSTM" },
      { label: "Decoding", value: "Beam" },
      { label: "Eval", value: "BLEU" },
      { label: "Framework", value: "Keras" }
    ],
    timeline: "2 months",
    team: "Solo Project"
  },
  {
    id: 4,
    title: "EDA Automation",
    description: "Automated exploratory data analysis tool that generates comprehensive statistical reports and visualizations from any dataset.",
    fullDescription: "A Python-based tool that automates the entire exploratory data analysis process. Upload any dataset and get instant statistical summaries, distribution plots, correlation matrices, outlier detection, and data quality reports — saving hours of manual analysis work.",
    category: "ML",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Streamlit", "SciPy"],
    github: "https://github.com",
    demo: "#",
    image: projectEdaAutomation,
    accent: "emerald",
    features: [
      "One-click full EDA reports",
      "Automated visualization generation",
      "Outlier and anomaly detection",
      "Correlation analysis and heatmaps",
      "Data quality and missing value reports",
      "Export reports as PDF/HTML"
    ],
    metrics: [
      { label: "Charts", value: "20+" },
      { label: "Stats", value: "Auto" },
      { label: "Formats", value: "CSV/Excel" },
      { label: "Export", value: "PDF" }
    ],
    timeline: "1 month",
    team: "Solo Project"
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ML": return Brain;
    case "DL": return Cpu;
    case "GenAI": return Sparkles;
    default: return Brain;
  }
};

const getAccentColors = (accent: string) => {
  const colors: Record<string, { bg: string; text: string; glow: string; gradient: string }> = {
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", glow: "shadow-orange-500/50", gradient: "from-orange-500 to-amber-400" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", glow: "shadow-cyan-500/50", gradient: "from-cyan-500 to-blue-400" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/50", gradient: "from-purple-500 to-pink-400" },
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", glow: "shadow-emerald-500/50", gradient: "from-emerald-500 to-teal-400" },
  };
  return colors[accent] || colors.orange;
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const updateActiveProjectFromScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(1, containerHeight - viewportHeight);

      // How far we have progressed through this section (0..1)
      const scrolledIntoSection = Math.max(0, -rect.top);
      const clampedProgress = Math.max(0, Math.min(1, scrolledIntoSection / scrollableDistance));

      // Map progress to index deterministically (works smoothly for scroll down + up)
      const nextIndex = Math.min(
        projects.length - 1,
        Math.floor(clampedProgress * projects.length)
      );

      if (nextIndex !== activeIndexRef.current) {
        setActiveIndex(nextIndex);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveProjectFromScroll();
        ticking = false;
      });
    };

    // Set correct index on mount (e.g. refresh mid-scroll)
    updateActiveProjectFromScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const goToProject = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)));
  };

  const openProjectModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section 
        id="projects" 
        ref={containerRef}
        className="relative min-h-[300vh] py-24 px-4 md:px-6"
      >
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Header */}
          <div ref={ref} className="text-center mb-6 z-10">
            <span className={`text-xs font-mono text-primary uppercase tracking-widest ${isVisible ? "animate-in-view" : "opacity-0"}`}>
              Portfolio
            </span>
            <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter mt-3 ${isVisible ? "animate-in-view" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              Featured Projects
            </h2>
          </div>

          {/* Cards Container */}
          <div className="relative w-full max-w-5xl h-[65vh] md:h-[60vh] perspective-[2000px]">
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;
              const Icon = getCategoryIcon(project.category);
              const colors = getAccentColors(project.accent);
              
              const zOffset = offset * -100;
              const yOffset = offset * 40;
              const scale = 1 - Math.abs(offset) * 0.1;
              const opacity = offset < 0 ? 0 : Math.max(0, 1 - Math.abs(offset) * 0.35);

              return (
                <div
                  key={project.id}
                  className="absolute inset-0 mx-2 md:mx-0 will-change-transform will-change-opacity transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                  style={{
                    transform: `translateZ(${zOffset}px) translateY(${yOffset}px) scale(${scale})`,
                    opacity,
                    zIndex: projects.length - Math.abs(offset),
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onClick={() => !isActive && goToProject(index)}
                >
                  {/* Main Card */}
                  <div className={`relative h-full rounded-2xl md:rounded-3xl overflow-hidden group border-2 border-border/30 bg-card/95 backdrop-blur-xl transition-shadow duration-500 ${isActive ? `shadow-2xl ${colors.glow}` : ''}`}
                  >
                    {/* Full Background Image */}
                    <div className="absolute inset-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      {/* Cinematic overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/40" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-[0.08] mix-blend-overlay`} />
                      
                    </div>

                    {/* Glow effect on hover */}
                    <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700`} />

                    {/* Content Grid */}
                    <div className="relative z-10 h-full flex flex-col md:flex-row">
                      {/* Left Content */}
                      <div className="flex-1 flex flex-col justify-center p-6 md:p-10 lg:p-14">
                        {/* Category Badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2.5 rounded-xl border ${colors.bg} border-current/20 backdrop-blur-sm ${colors.text}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${colors.bg} border-current/20 ${colors.text}`}>
                            {project.category}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">
                            0{project.id} / 0{projects.length}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight">
                          {project.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1.5 text-xs font-mono bg-secondary/60 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-3 py-1.5 text-xs font-mono text-muted-foreground">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openProjectModal(project);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-secondary/70 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all group/btn"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          <a
                            href={project.demo}
                            onClick={(e) => e.stopPropagation()}
                            className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r ${colors.gradient} text-white rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all group/demo`}
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-4 h-4 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>

                      {/* Right Side - Large Number */}
                      <div className="hidden md:flex items-center justify-center pr-8 lg:pr-14">
                        <span className={`text-[140px] lg:text-[180px] font-bold bg-gradient-to-b ${colors.gradient} bg-clip-text text-transparent opacity-20 select-none leading-none`}>
                          {String(project.id).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Bottom progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/20">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-700`}
                        style={{ width: isActive ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6 z-10">
            <button
              onClick={() => goToProject(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="p-2.5 rounded-full bg-secondary/70 border border-border hover:border-primary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full border border-border/50">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "w-8 h-3 bg-primary shadow-lg shadow-primary/50" 
                      : "w-3 h-3 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goToProject(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              className="p-2.5 rounded-full bg-secondary/70 border border-border hover:border-primary/50 hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Projects;
