import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "Bootstrap", level: 80, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "OracleSQL", level: 65, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 50, category: "tools" },
  { name: "Figma", level: 65, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/5 glow-orb pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 glass-section p-8 md:p-12 rounded-2xl shadow-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center animate-fade-in">
          My <span className="text-gradient">Skills</span>
        </h2>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize text-xs font-semibold tracking-wide border cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                  : "bg-card/45 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, key) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card/25 backdrop-blur-md p-6 rounded-xl border border-border/40 hover:border-primary/45 transition-colors duration-300 shadow-xs flex flex-col justify-between"
              >
                <div className="text-left mb-4">
                  <h3 className="font-bold text-base text-foreground/90">{skill.name}</h3>
                </div>

                {/* Progress bar container */}
                <div className="w-full bg-secondary/40 h-2 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: skill.level + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="bg-gradient-to-r from-primary to-violet-400 h-2 rounded-full origin-left"
                  />
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
