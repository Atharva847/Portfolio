import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Data ─────────────────────────────────────────────────────────── */
const ACCENTS: Record<string, { bg: string; text: string; glow: string; grad: string; border: string }> = {
  orange:  { bg:"rgba(249,115,22,0.2)",  text:"#fb923c", glow:"rgba(249,115,22,0.35)",  grad:"linear-gradient(135deg,#f97316,#fbbf24)", border:"rgba(249,115,22,0.3)" },
  cyan:    { bg:"rgba(6,182,212,0.2)",   text:"#22d3ee", glow:"rgba(6,182,212,0.35)",   grad:"linear-gradient(135deg,#06b6d4,#3b82f6)", border:"rgba(6,182,212,0.3)" },
  purple:  { bg:"rgba(168,85,247,0.2)",  text:"#c084fc", glow:"rgba(168,85,247,0.35)",  grad:"linear-gradient(135deg,#a855f7,#ec4899)", border:"rgba(168,85,247,0.3)" },
  emerald: { bg:"rgba(16,185,129,0.2)",  text:"#34d399", glow:"rgba(16,185,129,0.35)",  grad:"linear-gradient(135deg,#10b981,#14b8a6)", border:"rgba(16,185,129,0.3)" },
};

interface Metric { label: string; value: string; }
interface Project {
  id: number; title: string; description: string; fullDescription: string;
  category: string; tech: string[]; github: string; demo: string;
  accent: string; image: string; features: string[]; metrics: Metric[]; timeline: string; team: string;
}

const projects: Project[] = [
  {
    id:1, title:"Next Word Predictor",
    description:"LSTM-based language model that predicts the next word in a sequence, deployed with an interactive Streamlit interface.",
    fullDescription:"A deep learning language model built with Keras LSTM layers that learns patterns from text corpora to predict the most likely next word. Features an interactive Streamlit web app where users can type partial sentences and get real-time predictions with confidence scores.",
    category:"DL", tech:["Python","Keras","LSTM","Streamlit","TensorFlow","NumPy"],
    github:"https://github.com", demo:"#", accent:"orange", image:"/projects/project-sentiment.jpg",
    features:["Real-time next word prediction","Interactive Streamlit web interface","LSTM-based sequence modeling","Configurable prediction confidence","Multiple corpus training support","Top-K word suggestions"],
    metrics:[{label:"Model",value:"LSTM"},{label:"Framework",value:"Keras"},{label:"Interface",value:"Streamlit"},{label:"Predictions",value:"Top-5"}],
    timeline:"10 Days", team:"Solo Project",
  },
  {
    id:2, title:"Skin Cancer Detection",
    description:"Deep learning model for skin cancer classification using Keras transfer learning, achieving 88% accuracy.",
    fullDescription:"A medical imaging AI system that classifies skin lesion images to detect potential skin cancer using transfer learning with pre-trained models in Keras. The model achieves 88% accuracy on dermoscopic images, assisting dermatologists in early detection and diagnosis.",
    category:"DL", tech:["Keras","Transfer Learning","Python","TensorFlow","OpenCV","NumPy"],
    github:"https://github.com", demo:"#", accent:"cyan", image:"/projects/project-skin-cancer.jpg",
    features:["88% classification accuracy","Transfer learning with pre-trained models","Dermoscopic image processing","Multi-class skin lesion classification","Data augmentation pipeline","Grad-CAM visualization for explainability"],
    metrics:[{label:"Accuracy",value:"88%"},{label:"Method",value:"Transfer"},{label:"Classes",value:"7"},{label:"Framework",value:"Keras"}],
    timeline:"15 Days", team:"Solo Project",
  },
  {
    id:3, title:"Image Captioning with LSTM",
    description:"Automatic image caption generation using CNN-LSTM architecture that describes image content in natural language.",
    fullDescription:"An image captioning system that combines CNN feature extraction with LSTM sequence generation to automatically produce natural language descriptions of images. The model learns visual-semantic mappings to generate accurate, fluent captions for diverse image content.",
    category:"DL", tech:["Keras","LSTM","CNN","Python","TensorFlow","NLTK"],
    github:"https://github.com", demo:"#", accent:"purple", image:"/projects/project-image-captioning.jpg",
    features:["CNN-LSTM encoder-decoder architecture","Automatic caption generation","Beam search decoding","BLEU score evaluation","Attention mechanism visualization","Support for diverse image types"],
    metrics:[{label:"Architecture",value:"CNN-LSTM"},{label:"Decoding",value:"Beam"},{label:"Eval",value:"BLEU"},{label:"Framework",value:"Keras"}],
    timeline:"3 Days", team:"Solo Project",
  },
  {
    id:4, title:"EDA Automation",
    description:"Automated exploratory data analysis tool that generates comprehensive statistical reports and visualizations from any dataset.",
    fullDescription:"A Python-based tool that automates the entire exploratory data analysis process. Upload any dataset and get instant statistical summaries, distribution plots, correlation matrices, outlier detection, and data quality reports — saving hours of manual analysis work.",
    category:"ML", tech:["Python","Pandas","Matplotlib","Seaborn","Streamlit","SciPy"],
    github:"https://github.com", demo:"#", accent:"emerald", image:"/projects/project-eda-automation.jpg",
    features:["One-click full EDA reports","Automated visualization generation","Outlier and anomaly detection","Correlation analysis and heatmaps","Data quality and missing value reports","Export reports as PDF/HTML"],
    metrics:[{label:"Charts",value:"20+"},{label:"Stats",value:"Auto"},{label:"Formats",value:"CSV/Excel"},{label:"Export",value:"PDF"}],
    timeline:"10 Days", team:"Solo Project",
  },
];

/* ── SVG Icons ──────────────────────────────────────────────────────── */
const IconCPU = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
    <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/>
    <path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
  </svg>
);
const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconSparkles = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

function getCatIcon(cat: string) {
  if (cat === "DL") return <IconCPU />;
  if (cat === "GenAI") return <IconSparkles />;
  return <IconBrain />;
}

/* ── Modal ──────────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const a = ACCENTS[project.accent];
  const completion = Math.min(100, Math.round((project.features.length / 6) * 100));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div
      style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(6px)",
               display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background:"#0f0f0f",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"1rem",
                    maxWidth:"56rem",width:"100%",maxHeight:"90vh",overflowY:"auto" }}>
        {/* Hero */}
        <div style={{ position:"relative",height:"16rem",overflow:"hidden",borderRadius:"1rem 1rem 0 0",background:"#111" }}>
          <div style={{ position:"absolute",inset:0,background:a.grad,opacity:0.15 }} />
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,#0f0f0f,rgba(15,15,15,0.5),transparent)" }} />
          <button onClick={onClose} style={{ position:"absolute",top:"1rem",right:"1rem",padding:"0.5rem",borderRadius:"9999px",
            background:"rgba(10,10,10,0.96)",border:"1px solid rgba(255,255,255,0.24)",color:"#fff",cursor:"pointer",display:"flex",
            zIndex:30,boxShadow:"0 10px 25px rgba(0,0,0,0.45)" }}>
            <IconX />
          </button>
          <div style={{ position:"absolute",bottom:"1rem",left:"1.5rem",display:"flex",alignItems:"center",gap:"0.75rem" }}>
            <div style={{ padding:"0.5rem",borderRadius:"0.75rem",background:a.bg,color:a.text,border:`1px solid ${a.border}`,display:"flex" }}>
              {getCatIcon(project.category)}
            </div>
            <span style={{ padding:"0.25rem 0.75rem",fontSize:"0.7rem",fontFamily:"monospace",textTransform:"uppercase",
              letterSpacing:"0.1em",borderRadius:"9999px",background:a.bg,color:a.text,border:`1px solid ${a.border}` }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding:"1.5rem",display:"flex",flexDirection:"column",gap:"1.5rem" }}>
          <div>
            <h3 style={{ fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",color:"#fafafa" }}>{project.title}</h3>
            <p style={{ color:"#999",lineHeight:1.6,marginTop:"0.5rem" }}>{project.fullDescription}</p>
          </div>

          {/* Interesting overview strip */}
          <div style={{ padding:"1rem",borderRadius:"0.9rem",background:"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:"0.75rem",marginBottom:"0.65rem" }}>
              <p style={{ fontSize:"0.72rem",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",fontFamily:"monospace" }}>Project Momentum</p>
              <p style={{ fontSize:"0.85rem",fontWeight:600,color:a.text }}>{completion}% Complete</p>
            </div>
            <div style={{ height:8,background:"rgba(255,255,255,0.08)",borderRadius:9999,overflow:"hidden",marginBottom:"0.8rem" }}>
              <div style={{ width:`${completion}%`,height:"100%",background:a.grad,transition:"width 0.8s ease" }} />
            </div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem" }}>
              {project.features.slice(0, 3).map((item) => (
                <span key={item} style={{ fontSize:"0.72rem",padding:"0.32rem 0.6rem",borderRadius:9999,background:a.bg,color:a.text,border:`1px solid ${a.border}` }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem" }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{ padding:"1rem",borderRadius:"0.75rem",background:a.bg,border:`1px solid ${a.border}` }}>
                <p style={{ fontSize:"1.5rem",fontWeight:700,color:a.text }}>{m.value}</p>
                <p style={{ fontSize:"0.7rem",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",marginTop:"0.25rem" }}>{m.label}</p>
              </div>
            ))}
          </div>

          {/* Info */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
            {[{ icon:<IconCalendar />, label:"Timeline", value:project.timeline },
              { icon:<IconUsers />, label:"Team", value:project.team }].map(item => (
              <div key={item.label} style={{ display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.75rem",
                borderRadius:"0.75rem",background:"rgba(26,26,26,0.5)",border:"1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color:"#999",flexShrink:0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize:"0.7rem",textTransform:"uppercase",color:"#999" }}>{item.label}</p>
                  <p style={{ fontSize:"0.875rem",fontWeight:500 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <div style={{ fontSize:"0.75rem",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.1em",
              color:"#999",marginBottom:"0.75rem",display:"flex",alignItems:"center",gap:"0.5rem" }}>
              <IconTarget /> Key Features
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"0.5rem" }}>
              {project.features.map(f => (
                <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:"0.5rem",fontSize:"0.875rem" }}>
                  <span style={{ color:a.text,flexShrink:0,marginTop:2 }}><IconCheck /></span>
                  <span style={{ color:"rgba(250,250,250,0.8)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <div style={{ fontSize:"0.75rem",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.1em",color:"#999",marginBottom:"0.75rem" }}>Tech Stack</div>
            <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem" }}>
              {project.tech.map(t => (
                <span key={t} style={{ padding:"0.375rem 0.75rem",fontSize:"0.75rem",fontFamily:"monospace",
                  background:a.bg,borderRadius:"0.5rem",border:`1px solid ${a.border}`,color:a.text }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display:"flex",gap:"0.75rem",paddingTop:"1rem",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",
                padding:"0.75rem 1.25rem",fontSize:"0.875rem",fontWeight:500,borderRadius:"0.75rem",textDecoration:"none",
                background:"rgba(26,26,26,0.7)",color:"#fafafa",border:"1px solid rgba(255,255,255,0.08)",transition:"all 0.3s" }}>
              <IconGithub /> View Source Code
            </a>
            <a href={project.demo}
              style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",
                padding:"0.75rem 1.25rem",fontSize:"0.875rem",fontWeight:500,borderRadius:"0.75rem",textDecoration:"none",
                background:a.grad,color:"#fff",border:"none",transition:"all 0.3s" }}>
              <IconExternalLink /> Live Demo <IconArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────── */
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchedCardIndex, setTouchedCardIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tickingRef = useRef(false);
  const { ref: revealRef, isVisible } = useScrollAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (touchedCardIndex === null) return;
    const timer = window.setTimeout(() => setTouchedCardIndex(null), 260);
    return () => window.clearTimeout(timer);
  }, [touchedCardIndex]);

  const goTo = useCallback((idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const maxIdx = Math.max(1, projects.length - 1);
    const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
    const scrollTarget = (idx / maxIdx) * scrollable + section.offsetTop;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  }, []);

  /* scroll-driven card change */
  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) { tickingRef.current = false; return; }
        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.max(0, Math.min(1, scrolled / scrollable));
        
        const nextIndex = Math.min(
          projects.length - 1,
          Math.max(0, Math.round(progress * (projects.length - 1)))
        );
        setActiveIndex(prev => (prev === nextIndex ? prev : nextIndex));
        
        tickingRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll(); // initialize
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: isMobile ? "320vh" : "250vh",
          padding: "0 1rem",
        }}
      >
        <div ref={revealRef} style={{ position:"sticky", top:0, height:"100vh", display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", overflow:"hidden", gap:"1.5rem", paddingTop:"3rem" }}>

          {/* Header */}
          <div
            className={isVisible ? "animate-in-view" : "opacity-0"}
            style={{ textAlign:"center", zIndex:10 }}
          >
            <span style={{ fontSize:"0.7rem",fontFamily:"monospace",textTransform:"uppercase",
              letterSpacing:"0.2em",color:"hsl(var(--primary))" }}>Portfolio</span>
            <h2 style={{ fontSize:"clamp(2.25rem,5vw,3rem)",fontWeight:700,letterSpacing:"-0.04em",marginTop:"0.75rem" }}>
              Featured Projects
            </h2>
          </div>

          {/* Cards */}
          <div
            className={isVisible ? "animate-in-view" : "opacity-0"}
            style={{ position:"relative",width:"100%",maxWidth:"64rem",height:"60vh",perspective:"2000px", animationDelay:"0.1s" }}
          >
            {projects.map((p, i) => {
              const a = ACCENTS[p.accent];
              const offset = i - activeIndex;
              const shouldRender = !isMobile || Math.abs(offset) <= 1;
              const isPast = offset < 0;
              const yOff = isPast ? -105 : offset * 10;
              const zOff = isPast ? -140 : -Math.min(offset * 80, 220);
              const scale = isPast ? 0.94 : 1 - Math.min(offset * 0.06, 0.16);
              const isActive = i === activeIndex;
              const opacity = isActive ? 1 : 0;
              const isHovered = !isMobile && isActive && hoveredIndex === i;
              const isActiveTouched = isMobile && isActive && touchedCardIndex === i;
              const isEngaged = isHovered || isActiveTouched;
              const blur = isActive ? 0 : isMobile ? 0 : 10;
              const mobileYOffset = isMobile ? (isPast ? -22 : offset * 6) : yOff;
              const mobileScale = isMobile ? (isPast ? 0.98 : 1 - Math.min(offset * 0.02, 0.06)) : scale;
              const mobileZOffset = isMobile ? (isPast ? -36 : -Math.min(offset * 20, 60)) : zOff;
              const transition = isMobile
                ? "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 320ms ease-out"
                : "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 480ms ease-out, filter 480ms ease-out";

              if (!shouldRender) return null;

              return (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTouchStart={() => {
                    if (isActive) setTouchedCardIndex(i);
                  }}
                  style={{
                    position:"absolute", inset:0, margin:"0 0.5rem",
                    transform:`translateY(${mobileYOffset}%) translateZ(${mobileZOffset}px) scale(${mobileScale})`,
                    opacity,
                    filter:`blur(${blur}px)`,
                    zIndex: projects.length - Math.abs(offset),
                    pointerEvents: isActive ? "auto" : "none",
                    willChange: "transform, opacity, filter",
                    transition,
                  }}
                >
                  <div style={{
                    position:"relative", height:"100%", borderRadius:"1.5rem", overflow:"hidden",
                    border:"2px solid rgba(255,255,255,0.06)", background:"rgba(15,15,15,0.95)",
                    backdropFilter: isMobile ? "none" : "blur(24px)",
                    boxShadow: isActive ? `0 25px 50px -12px ${isEngaged ? a.glow.replace("0.35", "0.55") : a.glow}` : "none",
                    transition:"box-shadow 0.5s",
                  }}>
                    {/* Background image */}
                    <div style={{ position:"absolute",inset:0 }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width:"100%",height:"100%",objectFit:"cover",
                          transform: isEngaged ? "scale(1.1)" : isMobile && isActive ? "scale(1.04)" : "scale(1)",
                          transition: isMobile
                            ? "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)"
                            : "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)"
                        }}
                      />
                    </div>
                    {/* Overlays */}
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to right,#0a0a0a,rgba(10,10,10,0.95),rgba(10,10,10,0.4))" }} />
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,#0a0a0a,rgba(10,10,10,0.5),transparent)" }} />
                    <div style={{
                      position:"absolute",inset:0,background:a.grad,mixBlendMode:"overlay",
                      opacity: isEngaged ? 0.2 : isMobile && isActive ? 0.14 : 0.08, transition:"opacity 0.35s ease"
                    }} />
                    {/* Glow */}
                    <div style={{
                      position:"absolute",inset:-4,borderRadius:"1.5rem",filter:"blur(24px)",
                      background:a.grad,opacity: isEngaged ? 0.25 : isMobile && isActive ? 0.14 : 0,transition:"opacity 0.45s ease"
                    }} />

                    {/* Content */}
                    <div style={{ position:"relative",zIndex:10,height:"100%",display:"flex",
                                  flexDirection:"row",alignItems:"stretch" }}>
                      {/* Left */}
                      <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",
                                    padding:"clamp(1.5rem,3vw,3.5rem)" }}>
                        {/* Badge row */}
                        <div style={{ display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1rem" }}>
                          <div style={{ padding:"0.5rem",borderRadius:"0.75rem",background:a.bg,color:a.text,
                                        border:`1px solid ${a.border}`,display:"flex" }}>
                            {getCatIcon(p.category)}
                          </div>
                          <span style={{ padding:"0.25rem 0.75rem",fontSize:"0.7rem",fontFamily:"monospace",
                            textTransform:"uppercase",letterSpacing:"0.1em",borderRadius:"9999px",
                            background:a.bg,color:a.text,border:`1px solid ${a.border}` }}>
                            {p.category}
                          </span>
                          <span style={{ fontSize:"0.7rem",color:"#999",fontFamily:"monospace" }}>
                            0{p.id} / 0{projects.length}
                          </span>
                        </div>

                        <h3 style={{ fontSize:"clamp(1.5rem,3vw,3rem)",fontWeight:700,lineHeight:1.1,color:"#fafafa",
                                      letterSpacing:"-0.02em",marginBottom:"0.75rem" }}>{p.title}</h3>
                        <p style={{ fontSize:"clamp(0.875rem,1.5vw,1rem)",color:"#999",maxWidth:"28rem",
                                    lineHeight:1.6,marginBottom:"1.5rem" }}>{p.description}</p>

                        {/* Tech tags */}
                        <div style={{ display:"flex",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1.5rem" }}>
                          {p.tech.slice(0,4).map(t => (
                            <span key={t} style={{ padding:"0.375rem 0.75rem",fontSize:"0.75rem",fontFamily:"monospace",
                              background:"rgba(26,26,26,0.6)",borderRadius:"0.5rem",
                              border:"1px solid rgba(255,255,255,0.08)" }}>{t}</span>
                          ))}
                          {p.tech.length > 4 && (
                            <span style={{ padding:"0.375rem 0.75rem",fontSize:"0.75rem",fontFamily:"monospace",color:"#999" }}>
                              +{p.tech.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Buttons */}
                        <div style={{ display:"flex",gap:"0.75rem",flexWrap:"wrap" }}>
                          <button
                            onClick={() => setModalProject(p)}
                            style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",
                              padding:"0.625rem 1.25rem",fontSize:"0.875rem",fontWeight:500,
                              borderRadius:"0.75rem",cursor:"pointer",fontFamily:"inherit",
                              background:"rgba(26,26,26,0.7)",color:"#fafafa",
                              border:"1px solid rgba(255,255,255,0.08)",transition:"all 0.3s" }}>
                            <IconEye /> View Details
                          </button>
                          <a href={p.demo}
                            style={{ display:"inline-flex",alignItems:"center",gap:"0.5rem",
                              padding:"0.625rem 1.25rem",fontSize:"0.875rem",fontWeight:500,
                              borderRadius:"0.75rem",cursor:"pointer",textDecoration:"none",fontFamily:"inherit",
                              background:a.grad,color:"#fff",border:"none",transition:"all 0.3s" }}>
                            <IconPlay /> Live Demo <IconArrowUpRight />
                          </a>
                        </div>
                      </div>

                      {/* Big Number (desktop only) */}
                      <div style={{ display:"none" }} className="projects-big-num">
                        <span style={{ fontSize:"clamp(120px,12vw,180px)",fontWeight:700,
                          background:a.grad,WebkitBackgroundClip:"text",backgroundClip:"text",
                          WebkitTextFillColor:"transparent",opacity:0.2,userSelect:"none",lineHeight:1,
                          paddingRight:"2rem" }}>
                          {String(p.id).padStart(2,"0")}
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div style={{ position:"absolute",bottom:0,left:0,right:0,height:4,background:"rgba(255,255,255,0.04)" }}>
                      <div style={{ height:"100%",width:isActive?"100%":"0",background:a.grad,transition:"width 0.7s" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div
            className={isVisible ? "animate-in-view" : "opacity-0"}
            style={{ display:"flex",alignItems:"center",gap:"1rem",zIndex:10, animationDelay:"0.2s" }}
          >
            <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}
              style={{ padding:"0.625rem",borderRadius:"9999px",background:"rgba(26,26,26,0.7)",
                border:"1px solid #262626",color:"#fafafa",cursor:"pointer",display:"flex",
                opacity: activeIndex === 0 ? 0.3 : 1,transition:"all 0.3s" }}>
              <IconChevronLeft />
            </button>

            <div style={{ display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.5rem 1rem",
                          background:"rgba(26,26,26,0.5)",backdropFilter:"blur(4px)",
                          borderRadius:"9999px",border:"1px solid rgba(255,255,255,0.06)" }}>
              {projects.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  onTouchStart={() => setTouchedCardIndex(i)}
                  style={{ borderRadius:"9999px",border:"none",cursor:"pointer",transition:"all 0.3s",
                    width: i === activeIndex ? 32 : 12, height:12, padding:0,
                    background: i === activeIndex ? "hsl(var(--primary))" : "rgba(153,153,153,0.4)",
                    boxShadow: i === activeIndex ? "0 0 12px rgba(249,115,22,0.5)" : "none" }} />
              ))}
            </div>

            <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === projects.length - 1}
              style={{ padding:"0.625rem",borderRadius:"9999px",background:"rgba(26,26,26,0.7)",
                border:"1px solid #262626",color:"#fafafa",cursor:"pointer",display:"flex",
                opacity: activeIndex === projects.length - 1 ? 0.3 : 1,transition:"all 0.3s" }}>
              <IconChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* modal */}
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}

      {/* show big-number on md+ */}
      <style>{`
        .projects-big-num { display: none }
        @media(min-width:768px){ .projects-big-num { display: flex } }
      `}</style>
    </>
  );
};

export default Projects;
