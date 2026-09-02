import { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Wrench,
  Mail,
  Code,
  ArrowRight,
  ChevronUp,
  MessageSquare,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
  Calendar,
  Code2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 10);

      const sections = [
        "home",
        "about",
        "skills",
        "portfolio",
        "experience",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus("loading");
    try {
      await emailjs.sendForm(
        "service_tj0n4uq",
        "template_rhqqryk",
        formRef.current,
        "K1iTogragd_yU6bjq",
      );
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-base text-primary selection:bg-accent selection:text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 md:px-12 lg:px-24 ${
          isScrolled
            ? "bg-elevated border-b border-color"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-0 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#home" className="flex items-center gap-1 group">
              <span className="text-xl font-black text-accent tracking-tight">
                Rizky
              </span>
              <span className="text-xl font-light text-primary tracking-tight">
                Pratama
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent mb-0.5 self-end group-hover:scale-125 transition-transform"></span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 hover:text-accent group ${
                  activeSection === link.id ? "text-accent" : "text-primary"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                    activeSection === link.id
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 ml-4 text-secondary hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-secondary hover:text-accent transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-elevated border-b border-color overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      activeSection === link.id ? "text-accent" : "text-primary"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section
        id="home"
        className="min-h-screen flex items-center section-padding !pt-28 md:!pt-32"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Open to work
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Building Reliable{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Enterprise
              </span>{" "}
              App Solutions
            </h1>

            {/* Bio */}
            <p className="text-lg text-secondary mb-10 max-w-lg leading-relaxed">
              Hi, I'm <span className="text-accent font-semibold">Rizky</span> —
              an{" "}
              <span className="text-accent font-semibold">
                Enterprise Application Developer
              </span>{" "}
              specializing in internal business tools with Laravel & Ruby on
              Rails, backed by hands-on experience supporting corporate IT
              infrastructure.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-8 sm:py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-all shadow-lg shadow-accent/20 text-sm"
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="/cv/Rizky_Pratama_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 sm:px-8 sm:py-4 border border-accent text-accent hover:bg-accent-subtle transition-all rounded-lg font-semibold text-sm"
              >
                <ArrowRight size={18} className="-rotate-90" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* ── Right: Photo Area ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-center mt-5"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="relative w-[300px] md:w-[360px]">
              <span className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent rounded-tl-lg z-10" />
              <span className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-accent rounded-br-lg z-10" />
              <div className="w-full h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-border-strong shadow-2xl shadow-accent/10">
                <img
                  src="/img/hero_image.png"
                  alt="Tama — Fullstack Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 left-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border-strong shadow-lg"
              >
                <span className="text-xl">💻</span>
                <div>
                  <p className="text-xs text-muted leading-none">Role</p>
                  <p className="text-sm font-bold text-primary leading-tight">
                    Enterprise Dev
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-5 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border-strong shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm font-semibold text-primary">Available</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding-about bg-base">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div {...fadeIn}>
            <div className="section-label">About me</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Crafting Apps for Real Business Needs
            </h2>
            <div className="space-y-6 text-secondary text-lg leading-relaxed">
              <p>
                I'm an Enterprise Application Developer specializing in internal
                business applications built with Ruby on Rails and Laravel. My
                focus is on designing and implementing business-critical modules
                — from asset management and attendance systems to approval
                workflows and operational dashboards.
              </p>
              <p>
                Beyond development, I have hands-on experience integrating
                external systems such as fingerprint devices and ERP platforms,
                as well as supporting IT infrastructure and network
                configuration in corporate environments.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="bg-bg-surface border border-color rounded-3xl p-6 md:p-10 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Quick Info</h3>
            <div className="space-y-6 md:space-y-7">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Kota Bekasi, Indonesia",
                },
                { icon: Briefcase, label: "Experience", value: "2 years" },
                {
                  icon: GraduationCap,
                  label: "Education",
                  value: "S1 Teknologi Informasi",
                },
                {
                  icon: Wrench,
                  label: "Main Stack",
                  value: "Laravel · JavaScript · MySQL",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "rizky.pratama.job@gmail.com",
                },
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-accent">
                    <info.icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-primary font-medium text-sm break-all">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.div {...fadeIn}>
            <div className="section-label justify-center">Skills</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              Technologies I work with
            </h2>
            <p className="text-secondary opacity-80 max-w-2xl mx-auto">
              A practical set of technologies I've used across real-world
              projects and corporate environments.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {[
            {
              category: "Backend",
              items: [
                {
                  name: "Laravel",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
                },
                {
                  name: "Ruby on Rails",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg",
                },
                {
                  name: "PHP",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                },
                {
                  name: "Ruby",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
                },
              ],
              style: "accent",
            },
            {
              category: "Frontend",
              items: [
                {
                  name: "JavaScript",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                },
                {
                  name: "Tailwind CSS",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
                },
                {
                  name: "Bootstrap",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
                },
                {
                  name: "HTML",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                },
                {
                  name: "CSS",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                },
              ],
              style: "muted",
            },
            {
              category: "Database",
              items: [
                {
                  name: "MySQL",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                },
                {
                  name: "PostgreSQL",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                },
              ],
              style: "muted",
            },
            {
              category: "Tools & Others",
              items: [
                {
                  name: "Git",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                },
                {
                  name: "GitHub",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                },
                {
                  name: "JD Edwards ERP",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
                },
              ],
              style: "muted",
            },
          ].map((group, gIdx) => (
            <motion.div
              key={gIdx}
              {...fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 border border-border-color/50 rounded-full bg-bg-surface/50">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {group.items.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`px-6 py-4 rounded-2xl border border-border-color shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40 flex items-center gap-4 group ${
                      group.style === "accent"
                        ? "bg-accent-subtle text-accent"
                        : "bg-bg-muted text-text-primary"
                    }`}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="font-bold text-lg">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

<section id="projects" className="section-padding">
  <div className="max-w-7xl mx-auto">
    <motion.div {...fadeIn} className="mb-16">
      <div className="section-label">Projects</div>
      <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
        Projects I've built
      </h2>
      <p className="text-secondary opacity-80 max-w-2xl">
        A selection of my recent works in enterprise systems and web
        applications.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[
        {
          title: "Attendance System",
          image: "/img/attendance_img.png",
          description:
            "Syncs fingerprint data to provide real-time attendance statistics — daily headcount, late arrivals, 7-day trends, and department insights. Eliminates manual data processing from third-party HRIS for HRD staff.",
          tech: ["Laravel", "JavaScript", "MySQL", "Tailwind CSS"],
          github: "https://github.com/rizkypratam4/attendance",
          badge: "Personal Rebuild",
        },
        {
          title: "Production Tracking",
          image: "/img/production_tracking_img.png",
          description:
            "Priority-based production scheduler that displays only the top 10 tasks per operator to prevent out-of-order execution. Provides PPIC and management with completion stats and daily production reports.",
          tech: ["Laravel", "JavaScript", "MySQL", "Bootstrap"],
          github: "https://github.com/rizkypratam4/production_tracking",
          badge: "Personal Rebuild",
        },
        {
          title: "Ardi Garage",
          image: "/img/ardi_garage_img.png",
          description:
            "Company profile website for a custom motorcycle workshop in Bekasi — service listings with a live cost estimator, project gallery with lightbox, and WhatsApp-first booking flow. Built with Next.js App Router and a component-driven architecture.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS"],
          github: "https://github.com/rizkypratam4/ardi-garage",
          liveUrl: "https://ardi-garage.vercel.app/",
          badge: "Client Project",
        },
      ].map((project, idx, arr) => {
        const isLast = idx === arr.length - 1;
        const isOdd = arr.length % 2 !== 0;

        return (
          <motion.div
            key={idx}
            {...fadeIn}
            className={`group flex flex-col h-full bg-bg-surface border border-border-color rounded-2xl overflow-hidden card-hover ${
              isLast && isOdd ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            {/* Image */}
            <div className="h-56 md:h-60 overflow-hidden relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/10 to-transparent z-10" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Web App
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 text-[9px] font-medium tracking-wide">
                  {project.badge}
                </span>
              </div>
            </div>

            {/* Content — flex-1 keeps all cards equal height, footer sticks to bottom */}
            <div className="flex flex-col flex-1 px-6 py-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="text-secondary text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-bg-muted rounded-full border border-border-color/30"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t border-border-color/20">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-accent hover:underline underline-offset-4"
                  >
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-accent hover:underline underline-offset-4"
                >
                  <Code size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>

    <p className="text-center text-xs text-secondary/40 italic mt-10">
      * Personal rebuilds are recreations inspired by real-world
      experience at previous companies.
    </p>
  </div>
</section>

      {/* Work Experience Section */}
      <section id="experience" className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-16">
            <div className="section-label">Work Experience</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              My professional journey
            </h2>
            <p className="text-secondary opacity-80 max-w-2xl">
              Hands-on experience across IT support, web development, and
              enterprise systems in corporate environments.
            </p>
          </motion.div>

          <div className="relative space-y-12">
            {/* Timeline Line */}
            <div
              className="absolute left-4 md:left-[32%] lg:left-[30%] top-2 bottom-2 w-[2px] transform md:-translate-x-1/2"
              style={{ backgroundColor: "var(--border-strong)" }}
            ></div>

            {[
              {
                role: "IT Staff",
                badge: "Contract",
                company: "PT. Cipta Saksama Indonesia",
                period: "Dec 2025 – Present",
                location: "Cakung, Jakarta Timur",
                bullets: [
                  "Troubleshooting hardware & software issues to maintain smooth daily IT operations.",
                  "Developing internal Laravel-based applications to improve business process efficiency.",
                  "Creating project documentation and application user manuals.",
                ],
                skills: [
                  "Laravel",
                  "PHP",
                  "IT Infrastructure",
                  "System Troubleshooting",
                  "Documentation",
                ],
              },
              {
                role: "IT Programmer",
                badge: "Contract",
                company: "Massindo Group",
                period: "Jul 2024 – Sept 2025",
                location: "Bantar Gebang, Kota Bekasi",
                bullets: [
                  "Developed and maintained internal web applications using Ruby on Rails to support company operations.",
                  "Provided support and troubleshooting for JD Edwards (JDE) ERP system used across departments.",
                  "Optimized existing modules to improve system performance and operational stability.",
                ],
                skills: [
                  "Ruby on Rails",
                  "Ruby",
                  "JD Edwards ERP",
                  "System Support",
                  "Optimization",
                ],
              },
              {
                role: "IT Staff",
                badge: "Contract",
                company: "PT. Brothersindo Saudara Sejati",
                period: "Nov 2023 – May 2024",
                location: "Kemayoran, Jakarta Pusat",
                bullets: [
                  "Handled hardware & software troubleshooting to ensure smooth daily IT operations.",
                  "Configured networks and installed software based on company requirements.",
                  "Maintained and updated company profile website built with Laravel.",
                ],
                skills: [
                  "Laravel",
                  "PHP",
                  "Hardware & Software",
                  "Network Configuration",
                  "Web Maintenance",
                ],
              },
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="relative pl-10 md:pl-0 md:grid md:grid-cols-[30%_4%_66%] lg:grid-cols-[27%_6%_67%] items-start"
              >
                {/* 1. Left side - Desktop & Tablet */}
                <div className="hidden md:flex flex-col items-end text-right pr-4 mt-1.5 min-w-0">
                  <span className="text-accent font-bold text-sm leading-none mb-2 flex items-center gap-1.5 justify-end whitespace-nowrap">
                    <Calendar size={14} className="shrink-0" />
                    {exp.period}
                  </span>
                  <span className="text-primary font-bold text-sm leading-snug text-right">
                    {exp.company}
                  </span>
                  <span className="text-muted text-xs mt-1 text-right">
                    {exp.location}
                  </span>
                </div>

                {/* 2. Timeline Node */}
                <div className="absolute left-0 md:relative md:left-auto w-8 md:w-auto flex justify-center items-start h-full pt-1.5">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-accent/25 animate-ping"></span>
                    <span className="relative w-4 h-4 rounded-full bg-accent border-4 border-base z-10 shadow-md"></span>
                  </div>
                </div>

                {/* 3. Right side content */}
                <div className="flex flex-col gap-3">
                  {/* Mobile Header */}
                  <div className="flex flex-col md:hidden gap-2 mb-2">
                    <span className="text-accent font-bold text-sm flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0" />
                      {exp.period}
                    </span>
                    <span className="text-primary font-semibold text-sm">
                      {exp.company}
                    </span>
                    <span className="text-muted text-xs">{exp.location}</span>
                  </div>

                  {/* Card */}
                  <div className="group p-6 bg-bg-elevated border border-color rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/30">
                    {/* Role Header */}
                    <div
                      className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b"
                      style={{ borderColor: "var(--accent)" }}
                    >
                      <h3 className="text-lg md:text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {exp.role}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded bg-bg-muted text-text-white text-[10px] font-bold uppercase tracking-wider border border-border-strong/20">
                        {exp.badge}
                      </span>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-3 mb-5">
                      {exp.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-secondary leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 bg-accent rounded-full shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-semibold px-3 py-1 bg-accent/10 text-accent/10 rounded-full border border-accent/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-primary/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div {...fadeIn}>
            <div className="section-label">Contact</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Let's get in touch
            </h2>
            <p className="text-secondary text-lg mb-10 leading-relaxed">
              Open to new job opportunities or just want to connect? Feel free
              to reach out — I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  value: "rizky.pratama.job@gmail.com",
                  label: "Email",
                  href: "mailto:rizky.pratama.job@gmail.com",
                },
                {
                  icon: Phone,
                  value: "+62 812-1169-2806",
                  label: "Phone/WhatsApp",
                  href: "https://wa.me/6281211692806",
                },
                {
                  icon: Briefcase,
                  value: "linkedin.com/in/rizkprtama/",
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/rizkypratam4/",
                },
                {
                  icon: Code,
                  value: "github.com/rizkypratam4",
                  label: "GitHub",
                  href: "https://github.com/rizkypratam4",
                },
              ].map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/5 border border-border-color group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-accent transition-all">
                    <contact.icon size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                      {contact.label}
                    </div>
                    <div className="text-text-primary font-medium group-hover:text-accent transition-colors">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="bg-bg-surface border border-color rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/5"
          >
            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-bg-elevated border border-color rounded-xl text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-bg-elevated border border-color rounded-xl text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-bg-elevated border border-color rounded-xl text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell me about yourself or the opportunity..."
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-5 py-4 bg-bg-elevated border border-color rounded-xl text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {/* Status feedback */}
              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium"
                  >
                    <CheckCircle size={16} />
                    Message sent! I'll get back to you soon.
                  </motion.div>
                )}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-sm font-medium"
                  >
                    <AlertCircle size={16} />
                    Failed to send. Please try again or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full py-5 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-accent/20"
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <MessageSquare size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-bg-surface text-text-primary pt-20 pb-10 px-6 md:px-12 lg:px-24"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <a href="#home" className="flex items-center gap-1 group mb-4">
              <span className="text-2xl font-black text-accent tracking-tight">
                Rizky
              </span>
              <span className="text-2xl font-light text-text-primary tracking-tight">
                Pratama
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent mb-0.5 self-end group-hover:scale-125 transition-transform"></span>
            </a>
            <p className="text-text-muted leading-relaxed max-w-xs">
              Enterprise Application Developer specializing in internal business
              applications, IT infrastructure, and process automation.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 dark:text-white">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-text-muted hover:text-accent transition-colors text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:justify-self-end">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 dark:text-white">
              Social Media
            </h4>
            <div className="flex gap-4">
              {[
                {
                  icon: Code2,
                  href: "https://github.com/rizkypratam4",
                  label: "GitHub",
                },
                {
                  icon: Briefcase,
                  href: "https://linkedin.com/in/rizkypratam4/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:rizky.pratama.job@gmail.com",
                  label: "Email",
                },
                {
                  icon: MessageSquare,
                  href: "https://wa.me/6281211692806",
                  label: "WhatsApp",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-bg-muted border border-color flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-color flex flex-col items-center gap-6">
          <p className="text-text-muted text-sm text-center">
            © 2026 Rizky Pratama. All rights reserved. Built with React &
            Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Floating Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-accent-hover transition-colors z-40"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
