import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, ExternalLink, ArrowUpRight, X, Brain, Cpu, Sparkles, Calendar, Users, Target, CheckCircle2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  accent: string;
  features: string[];
  metrics: { label: string; value: string }[];
  timeline: string;
  team: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ML": return Brain;
    case "DL": return Cpu;
    case "GenAI": return Sparkles;
    default: return Brain;
  }
};

const getAccentColors = (accent: string) => {
  const colors: Record<string, { bg: string; text: string; gradient: string; border: string }> = {
    orange: { bg: "bg-orange-500/20", text: "text-orange-400", gradient: "from-orange-500 to-amber-400", border: "border-orange-500/30" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", gradient: "from-cyan-500 to-blue-400", border: "border-cyan-500/30" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400", gradient: "from-purple-500 to-pink-400", border: "border-purple-500/30" },
    emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", gradient: "from-emerald-500 to-teal-400", border: "border-emerald-500/30" },
  };
  return colors[accent] || colors.orange;
};

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  const Icon = getCategoryIcon(project.category);
  const colors = getAccentColors(project.accent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border/50 rounded-2xl">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-10`} />
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${colors.bg} ${colors.border} backdrop-blur-sm ${colors.text}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border ${colors.bg} ${colors.border} ${colors.text} backdrop-blur-sm`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              {project.title}
            </DialogTitle>
            <p className="text-muted-foreground leading-relaxed mt-2">
              {project.fullDescription}
            </p>
          </DialogHeader>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl ${colors.bg} ${colors.border} border backdrop-blur-sm`}
              >
                <p className={`text-2xl font-bold ${colors.text}`}>{metric.value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground uppercase">Timeline</p>
                <p className="text-sm font-medium">{project.timeline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground uppercase">Team</p>
                <p className="text-sm font-medium">{project.team}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Key Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 ${colors.text} shrink-0`} />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`px-3 py-1.5 text-sm font-mono rounded-lg ${colors.bg} ${colors.border} border ${colors.text}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-secondary/70 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all"
            >
              <Github className="w-4 h-4" />
              View Source Code
            </a>
            <a
              href={project.demo}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-gradient-to-r ${colors.gradient} text-white rounded-xl hover:shadow-lg transition-all group`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
