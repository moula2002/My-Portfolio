import { Briefcase, Code, User, GraduationCap, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

export const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background visual orb */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 glow-orb pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          About <span className="text-gradient">Me</span>
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          {/* Biography Details */}
          <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-bold text-foreground/90">
              Passionate Web Developer & Tech Creator
            </h3>

            <p className="text-muted-foreground leading-relaxed text-base">
              I am a dedicated Web Developer and MCA (Master of Computer Applications) graduate, 
              specializing in the MERN stack (MongoDB, Express.js, React.js, Node.js). 
              I design and build secure, interactive, and high-performance applications that solve real-world problems.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base">
              From coding business logic in Express and structuring databases in MongoDB, 
              to fine-tuning responsive layouts and 3D interactions in React, 
              I am committed to delivering clean code and exceptional user experiences.
            </p>

            {/* Quick Education/Stats Banner */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="p-4 rounded-xl bg-card/20 border border-border/40 text-left">
                <GraduationCap className="text-primary mb-2" size={24} />
                <h4 className="font-semibold text-sm">Education</h4>
                <p className="text-xs text-muted-foreground">MCA Post Graduate</p>
              </div>
              <div className="p-4 rounded-xl bg-card/20 border border-border/40 text-left">
                <Laptop className="text-primary mb-2" size={24} />
                <h4 className="font-semibold text-sm">Focus</h4>
                <p className="text-xs text-muted-foreground">Full Stack JS Development</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
              <a href="#contact" className="cosmic-button text-center">
                Get In Touch
              </a>

              <a
                href="/Moula-Resume.pdf"
                download="Moula-Resume.pdf"
                className="px-6 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 text-center font-medium"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Interactive Services / Skills Grid (wrapped in 3D TiltCards) */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
            <TiltCard>
              <div className="bg-card/25 backdrop-blur-md border border-border/40 p-6 rounded-xl text-left hover:border-primary/45 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Code className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Web Development</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Building full-stack MERN web applications with interactive client views, secured backend routing, and scalable databases.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="bg-card/25 backdrop-blur-md border border-border/40 p-6 rounded-xl text-left hover:border-primary/45 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Responsive UI/UX</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Crafting highly fluid, mobile-first designs featuring smooth CSS animations, dark modes, and intuitive layouts.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard>
              <div className="bg-card/25 backdrop-blur-md border border-border/40 p-6 rounded-xl text-left hover:border-primary/45 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Clean Integration</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Integrating payment gateways, transactional emails (EmailJS), rest API endpoints, and deploying projects on hosting providers.
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
