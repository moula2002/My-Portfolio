import { useState, useEffect } from "react";
import { ArrowDown, Terminal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

const roles = [
  "MERN Stack Developer",
  "Full Stack Web Engineer",
  "UI/UX Enthusiast",
  "Tech Creator",
];

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/15 glow-orb animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-500/10 glow-orb animate-float-delay pointer-events-none" />
      <div className="absolute top-1/2 left-2/3 w-64 h-64 rounded-full bg-blue-500/10 glow-orb animate-float-slow pointer-events-none" style={{ animationDelay: "-4s" }} />

      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 text-left">
        {/* Left Side: Copy and Title */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold"
          >
            <Sparkles size={12} />
            <span>Welcome to my digital space</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight font-display">
            Hi, I'm{" "}
            <span className="text-gradient drop-shadow-[0_0_15px_rgba(167,139,250,0.2)]">
              MOULA HUSSAIN
            </span>
          </h1>

          {/* Dynamic typing role switcher */}
          <div className="h-8 md:h-10 flex items-center justify-center lg:justify-start">
            <span className="text-lg md:text-2xl font-medium text-foreground/70 mr-2">
              I am a
            </span>
            <div className="relative overflow-hidden h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-lg md:text-2xl font-bold text-primary text-glow block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
          >
            I craft responsive, secure, and user-centric web applications.
            Specializing in JavaScript architectures, I translate client visions into highly interactive digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <a href="#projects" className="cosmic-button">
              Explore Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2 rounded-full border border-border bg-card/30 backdrop-blur-xs text-foreground hover:bg-secondary/40 transition-colors duration-300 font-medium"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Terminal Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          <TiltCard className="w-full max-w-md shadow-2xl">
            <div className="w-full bg-card/30 backdrop-blur-md border border-border/40 rounded-xl overflow-hidden font-mono text-xs sm:text-sm text-foreground/95 shadow-inner">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/35 border-b border-border/30">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-widest">
                  <Terminal size={10} />
                  <span>developer.js</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Terminal Contents */}
              <div className="p-5 space-y-4 text-left leading-relaxed">
                <div>
                  <span className="text-pink-500">const</span>{" "}
                  <span className="text-blue-400">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">name</span>:{" "}
                  <span className="text-yellow-300">"Moula Hussain"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">role</span>:{" "}
                  <span className="text-yellow-300">"MERN Full Stack Dev"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">skills</span>: &#91;
                  <br />
                  <span className="pl-4 text-yellow-300">"React"</span>,{" "}
                  <span className="text-yellow-300">"Node.js"</span>,{" "}
                  <span className="text-yellow-300">"Express"</span>,
                  <br />
                  <span className="pl-4 text-yellow-300">"MongoDB"</span>,{" "}
                  <span className="text-yellow-300">"TailwindCSS"</span>
                  <br />
                  <span className="text-white">&#93;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">lovesCode</span>:{" "}
                  <span className="text-orange-400">true</span>,
                </div>
                <div className="pl-4">
                  <span className="text-purple-400">coreDrive</span>:{" "}
                  <span className="text-yellow-300">
                    "Building clean, 3D interactive user interfaces"
                  </span>
                </div>
                <div>&#125;;</div>

                <div className="pt-2 border-t border-border/20 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-green-400">&gt;</span>
                  <span>developer.compileState()</span>
                </div>
                <div className="text-xs text-green-400">
                  ⚡ Compilation successful. System active!
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10 pointer-events-none">
        <span className="text-xs text-muted-foreground mb-1 tracking-wider uppercase">
          Scroll Down
        </span>
        <ArrowDown className="h-4 w-4 text-primary" />
      </div>
    </section>
  );
};
