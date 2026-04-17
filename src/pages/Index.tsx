import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Aurora from "@/components/Aurora";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Aurora
        colorStops={["#6200B3", "#FF5900", "#5227FF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
