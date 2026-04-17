import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  // { name: "Python", category: "Language" },
  // { name: "TensorFlow", category: "ML/DL" },
  // { name: "PyTorch", category: "ML/DL" },
  // { name: "Scikit-learn", category: "ML" },
  // { name: "Pandas", category: "Data" },
  // { name: "NumPy", category: "Data" },
  { name: "LangChain", category: "GenAI" },
  { name: "Large Language Models", category: "GenAI" },
  { name: "Transformers", category: "GenAI" },
  { name: "OpenAI", category: "GenAI" },
  { name: "Hugging Face", category: "GenAI" },
  { name: "RAG", category: "GenAI" },
  { name: "LangGraph", category: "GenAI" },
  { name: "LangSmith", category: "GenAI" },
  { name: "SQL", category: "Database" },
  { name: "Vector Databases", category: "Database" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "Jupyter", category: "Tools" },
  { name: "Streamlit", category: "Web" },
  { name: "FastAPI", category: "Web" },
];

const categories = [
  { name: "Languages", items: ["Python", "R", "SQL", "C"] },
  { name: "ML/DL Frameworks", items: ["TensorFlow", "PyTorch", "Transformers", "Keras"] },
  { name: "GenAI Tools", items: ["LangChain", "LangGraph", "Hugging Face", "RAG"] },
  { name: "Others", items: ["Git/Github", "LLMs", "Docker", "FastAPI"] },
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={ref} className="text-center mb-16">
          <span
            className={`text-xs font-mono text-primary uppercase tracking-widest ${isVisible ? "animate-in-view" : "opacity-0"}`}
          >
            Tech Stack
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold tracking-tighter mt-4 ${isVisible ? "animate-in-view" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Skills & Technologies
          </h2>
        </div>

        {/* Marquee */}
        <div
          className={`mb-16 overflow-hidden ${isVisible ? "animate-in-view" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, i) => (
                <div
                  key={`${skill.name}-${i}`}
                  className="flex-shrink-0 mx-3 px-5 py-3 rounded-full border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <span className="font-medium whitespace-nowrap">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all ${isVisible ? "animate-in-view" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
