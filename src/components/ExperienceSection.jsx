import { Briefcase, Database, BookOpen, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

const experiences = [
  {
    id: 1,
    role: "MERN Stack Developer",
    company: "Black Stone Infomatics",
    location: "Coimbatore",
    period: "08/2024 – 09/2024",
    icon: Briefcase,
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    color: "emerald",
    details: [
      "Developed secure REST APIs and managed databases using MongoDB, Express.js, and Node.js.",
      "Integrated online hosting, SMTP email delivery, and external API services.",
      "Contributed key components to an enterprise E-commerce project within a collaborative team env."
    ]
  },
  {
    id: 2,
    role: "Data Science Intern",
    company: "San Technovation",
    location: "Erode",
    period: "07/2024 – 08/2024",
    icon: Database,
    iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    color: "blue",
    details: [
      "Designed and developed data visualization dashboards using Power BI and Tableau.",
      "Analyzed large datasets in Excel to extract meaningful business insights.",
      "Visualized historical trends to support executive data-driven decision-making processes."
    ]
  },
  {
    id: 3,
    role: "MERN Stack Developer Trainee",
    company: "Professional Training",
    location: "Ongoing",
    period: "Ongoing",
    icon: BookOpen,
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    color: "purple",
    details: [
      "Building full-stack MERN (MongoDB, Express, React, Node) applications from scratch.",
      "Gaining hands-on expertise in backend routing, database design, and advanced state management.",
      "Implementing industry-standard authentication (JWT) and secure API patterns."
    ]
  }
];

export const ExperienceSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden">
      {/* Glow orb decoration */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary/5 glow-orb pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 glass-section p-8 md:p-12 rounded-2xl shadow-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Work <span className="text-gradient">Experience</span>
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-border/60 ml-4 md:ml-32 space-y-12"
        >
          {experiences.map((exp, index) => {
            const IconComp = exp.icon;
            return (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                {/* Timeline Node Icon */}
                <div className={`absolute -left-5 top-1.5 p-2 rounded-full border bg-background/90 z-10 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${exp.iconBg}`}>
                  <IconComp size={18} />
                </div>

                {/* Left Side Period for Desktop */}
                <div className="hidden md:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    {exp.period.split(" – ")[0]}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 block mt-0.5">
                    {exp.period.split(" – ")[1] || ""}
                  </span>
                </div>

                {/* Card Container */}
                <motion.div variants={cardVariants} className="w-full">
                  <TiltCard>
                    <div className="bg-card/25 backdrop-blur-md border border-border/40 hover:border-primary/45 transition-colors duration-300 p-6 rounded-xl text-left shadow-xs">
                      {/* Mobile Period Indicator */}
                      <span className="md:hidden inline-flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground mb-2 bg-secondary/50 px-2.5 py-1 rounded-full">
                        <Calendar size={10} />
                        {exp.period}
                      </span>

                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                          <h4 className="text-sm font-semibold text-primary/95 flex items-center gap-1.5 mt-0.5">
                            {exp.company}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/30 px-2.5 py-1 rounded-md border border-border/30">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                            <span className="text-primary mr-2.5 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
