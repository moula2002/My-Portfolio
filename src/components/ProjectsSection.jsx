import { useState } from "react";
import { ArrowRight, ExternalLink, Github, Leaf, Users, Hotel, ShoppingBag, Droplets, Heart, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "./ui/TiltCard";

const categories = ["All", "Full Stack / E-Commerce", "HR & Admin Panels", "Landing & Bookings"];

const projects = [
  {
    id: 1,
    title: "Dump & Drop (Smart Waste)",
    description: "An eco-friendly waste management scheduling platform facilitating smart recycling, collection scheduling, and community rewards.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    category: "Full Stack / E-Commerce",
    demoUrl: "https://dump-and-drop-seven.vercel.app",
    githubUrl: "https://github.com/moula2002/Dump-and-Drop",
    image: "/projects/dump_and_drop.png",
    icon: Leaf,
    gradient: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    iconBg: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: 2,
    title: "Abhilekha HR Portal",
    description: "Enterprise HR Management System designed to handle employee attendance rosters, leaves tracking, and payroll disbursements.",
    tech: ["React", "JavaScript", "NodeJS", "Express", "MongoDB"],
    category: "HR & Admin Panels",
    demoUrl: "https://abhilekha-hr-website.vercel.app",
    githubUrl: "https://github.com/moula2002/AbhilekhaHR_website",
    image: "/projects/abhilekha.png",
    icon: Users,
    gradient: "from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    id: 3,
    title: "Krishna Stay Inn",
    description: "Premium hotel lodging reservation web portal featuring interactive room selections, amenity filtering, and reservation bookings.",
    tech: ["React", "Tailwind CSS", "React Router", "Vite"],
    category: "Landing & Bookings",
    demoUrl: "https://krishna-stay-inn.vercel.app",
    githubUrl: "https://github.com/moula2002/Krishna-Stay-Inn",
    image: "/projects/krishna_stay.png",
    icon: Hotel,
    gradient: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
    iconBg: "bg-amber-500/10 text-amber-400",
  },
  {
    id: 4,
    title: "Sadhana Cart & Seller",
    description: "Multi-layered e-commerce platform incorporating full-fledged client catalogs, merchant upload portals, and dashboard sales tracking.",
    tech: ["React", "Tailwind", "Express.js", "MongoDB", "MERN"],
    category: "Full Stack / E-Commerce",
    demoUrl: "https://sadhana-cart-ecom-eight.vercel.app",
    githubUrl: "https://github.com/moula2002/SadhanaCart",
    image: "/projects/sadhana_cart.png",
    icon: ShoppingBag,
    gradient: "from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400",
    iconBg: "bg-purple-500/10 text-purple-400",
  },
  {
    id: 5,
    title: "AFS Stickering & Signages",
    description: "E-commerce platform for ordering custom designer nameplates, home signages, wallpapers, and desk name plates.",
    tech: ["React", "Tailwind CSS", "Redux", "NodeJS", "MongoDB"],
    category: "Full Stack / E-Commerce",
    demoUrl: "https://afs-ecommerce.vercel.app",
    githubUrl: "https://github.com/moula2002/Afs-ecommerce",
    image: "/projects/afs_ecommerce.png",
    icon: ShoppingBag,
    gradient: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400",
    iconBg: "bg-orange-500/10 text-orange-400",
  },
  {
    id: 6,
    title: "Trishula Trust (NGO)",
    description: "Educational & Charitable NGO website advocating for child development, raising awareness, and accepting online donations.",
    tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    category: "Landing & Bookings",
    demoUrl: "https://ngo-website-sandy-nu.vercel.app",
    githubUrl: "https://github.com/moula2002/ngo-website",
    image: "/projects/trishula_trust.png",
    icon: Heart,
    gradient: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400",
    iconBg: "bg-pink-500/10 text-pink-400",
  },
  {
    id: 7,
    title: "Vidya Bharati School",
    description: "Official website for Vidya Bharati English Medium Primary School (CBSE), featuring admissions information, vision details, activities, and faculty profiles.",
    tech: ["React", "Tailwind CSS", "Vite", "Lucide Icons"],
    category: "Landing & Bookings",
    demoUrl: "https://school-website-beta-one.vercel.app",
    githubUrl: "https://github.com/moula2002/school-website",
    image: "/projects/vidya_bharati_school.png",
    icon: GraduationCap,
    gradient: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400",
    iconBg: "bg-indigo-500/10 text-indigo-400",
  },
  {
    id: 8,
    title: "RK Sump & Tank Services",
    description: "Service scheduling platform for booking commercial sump and water tank sanitation, complete with booking scheduler forms.",
    tech: ["React", "Tailwind CSS", "Responsive UI", "Formik"],
    category: "Landing & Bookings",
    demoUrl: "https://rk-sump-and-tank-website.vercel.app",
    githubUrl: "https://github.com/moula2002/Rk_Sump-and-tank-website-",
    image: "/projects/rk_sump_tank.png",
    icon: Droplets,
    gradient: "from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-400",
    iconBg: "bg-cyan-500/10 text-cyan-400",
  },
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 glow-orb pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 rounded-full bg-indigo-500/5 glow-orb pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here is a curated list of live web applications retrieved from my GitHub repositories. 
          Each represents client requirements delivered with responsive design, robust state management, and modern technologies.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                  : "bg-card/45 text-muted-foreground border-border hover:border-primary/45 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Grid using Framer Motion for morphing layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const IconComp = project.icon;
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <TiltCard className="h-full">
                    <div className="h-full bg-card/25 backdrop-blur-md rounded-xl border border-border/40 overflow-hidden flex flex-col p-6 text-left hover:border-primary/45 transition-colors duration-300 group">
                      {/* Stylized Gradient Header Header Area or Project Image */}
                      <div className="w-full h-40 rounded-lg border border-border/40 overflow-hidden relative mb-6 transition-colors duration-300">
                        {project.image ? (
                          <div className="w-full h-full relative overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay icon in top right */}
                            <div className={`absolute top-2 right-2 p-1.5 rounded-lg ${project.iconBg} backdrop-blur-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity`}>
                              <IconComp size={16} />
                            </div>
                          </div>
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent)" />
                            <div className={`p-4 rounded-2xl ${project.iconBg} backdrop-blur-xs relative z-10`}>
                              <IconComp size={36} />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((techItem, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 text-[10px] font-medium border border-border/40 rounded-full bg-secondary/60 text-muted-foreground"
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      {/* Card Links */}
                      <div className="flex justify-between items-center pt-4 border-t border-border/20 mt-auto">
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                          {project.category}
                        </span>
                        <div className="flex space-x-3">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-secondary/50 border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/50 transition-all duration-300"
                            title="Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-secondary/50 border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/50 transition-all duration-300"
                            title="View Repository"
                          >
                            <Github size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Section Link */}
        <div className="text-center mt-16">
          <a
            className="cosmic-button inline-flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/moula2002"
          >
            <span>Explore All 30 GitHub Repositories</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
