import { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  ArrowRight,
  ChevronUp,
  MessageSquare,
  Phone,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Contact form state
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 10);

      const sections = ['home', 'about', 'skills', 'portfolio', 'experience', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('loading');
    try {
      await emailjs.sendForm(
        "service_tj0n4uq",
        "template_rhqqryk",
        formRef.current,
        "K1iTogragd_yU6bjq",
      );
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-base text-primary selection:bg-accent selection:text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 md:px-12 lg:px-24 ${isScrolled
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
                className={`text-sm font-medium transition-colors relative py-1 hover:text-accent group ${activeSection === link.id ? "text-accent" : "text-primary"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${activeSection === link.id
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
                    className={`text-lg font-medium transition-colors ${activeSection === link.id ? "text-accent" : "text-primary"
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
          {/* ── Left: Text Content ── */}
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
              Building Clean &amp; <br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                Scalable
              </span>{" "}
              Web Apps
            </h1>

            {/* Bio */}
            <p className="text-lg text-secondary mb-10 max-w-lg leading-relaxed">
              Hi, I'm <span className="text-accent font-semibold">Tama</span> —
              a Fullstack Developer focused on building efficient and
              user-friendly applications with modern tech stacks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-all shadow-lg shadow-accent/20"
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent hover:bg-accent-subtle transition-all rounded-lg font-semibold"
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
            className="relative flex justify-center lg:justify-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-accent/10 blur-3xl" />
            </div>

            {/* Wrapper — dibatasi lebarnya agar tidak melebar ke kanan */}
            <div className="relative w-[300px] md:w-[360px]">
              {/* Corner accents */}
              <span className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-accent rounded-tl-lg z-10" />
              <span className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-accent rounded-br-lg z-10" />

              {/* Photo */}
              <div className="w-full h-[380px] md:h-[450px] rounded-2xl overflow-hidden border border-border-strong shadow-2xl shadow-accent/10">
                <img
                  src="/img/hero_image.png"
                  alt="Tama — Fullstack Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Badge bawah — di dalam wrapper, tidak overflow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 left-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border-strong shadow-lg"
              >
                <span className="text-xl">💻</span>
                <div>
                  <p className="text-xs text-muted leading-none">Experience</p>
                  <p className="text-sm font-bold text-primary leading-tight">
                    Fullstack Dev
                  </p>
                </div>
              </motion.div>

              {/* Badge atas — di dalam wrapper, tidak overflow */}
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeIn}>
            <div className="section-label">About me</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
              Focused on High-Performance Internal Systems
            </h2>
            <div className="space-y-6 text-secondary text-lg leading-relaxed">
              <p>
                Web Developer specializing in internal enterprise applications
                using Ruby on Rails and Laravel. Experienced in designing and
                implementing business-critical modules such as asset management,
                attendance systems, approval workflows, and operational
                dashboards.
              </p>
              <p>
                Proven ability to integrate external systems like fingerprint
                devices and improve operational efficiency through scalable web
                solutions.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            className="bg-bg-surface border border-color rounded-3xl p-6 md:p-10"
          >
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Info</h3>
            <div className="space-y-5">
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
                  value: "rizky.pratama.tech@gmail.com",
                },
              ].map((info, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-bg-muted flex items-center justify-center text-accent">
                    <info.icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-0.5">
                      {info.label}
                    </div>
                    <div className="text-primary font-medium text-sm truncate">
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
              I use a modern set of tools to build performant and maintainable
              applications.
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
          ].map((group, gIdx) => (
            <motion.div
              key={gIdx}
              {...fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em]  px-4 py-1.5 border border-border-color/50 rounded-full bg-bg-surface/50">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {group.items.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={`px-6 py-4 rounded-2xl border border-border-color shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40 flex items-center gap-4 group ${group.style === "accent"
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

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
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

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Attendance System",
                badge: "Web App",
                image:
                  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000",
                description:
                  "A web-based attendance management system for tracking employee check-in/check-out, generating reports, and managing leave requests efficiently.",
                tech: ["Laravel", "JavaScript", "MySQL", "Tailwind CSS"],
                links: [
                  { label: "GitHub", icon: Code, href: "#" },
                  { label: "Live Demo", icon: ExternalLink, href: "#" },
                ],
              },
              {
                title: "Production Tracking",
                badge: "Web App",
                image:
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
                description:
                  "An internal production monitoring system to track manufacturing output, monitor work progress per shift, and generate real-time production reports.",
                tech: ["Laravel", "JavaScript", "MySQL", "Bootstrap"],
                links: [
                  { label: "GitHub", icon: Code, href: "#" },
                  { label: "Live Demo", icon: ExternalLink, href: "#" },
                ],
              },
            ].map((project, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                className="group flex flex-col bg-bg-surface border border-border-color rounded-[1rem] overflow-hidden card-hover"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface to-transparent z-10 opacity-60"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider">
                      {project.badge}
                    </div>
                  </div>
                </div>

                <div className="pt-8 md:px-2 md:pt-8 pt-0 -mt-10 relative z-20">
                  <div className="rounded-3xl p-8">
                    <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-secondary mb-8 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-8">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-bg-muted  rounded-full border border-border-color/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      {project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          className="flex items-center gap-2 text-sm font-bold text-accent hover:underline underline-offset-4"
                        >
                          <link.icon size={16} />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    <section id="experience" className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeIn} className="mb-16">
          <div className="section-label">Work Experience</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
            My professional journey
          </h2>
          <p className="text-secondary opacity-80 max-w-2xl">
            Career path spanning different roles and technological challenges.
          </p>
        </motion.div>

        <div className="relative space-y-12 pl-8">
          {/* Timeline Line — selalu di kiri */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border-strong"></div>

          {[
            {
              role: "MIS Senior Programmer",
              badge: "Contract",
              company: "PT. Cipta Saksama Indonesia",
              period: "Dec 2025 – Present",
              location: "Cakung, Jakarta Timur",
              bullets: [
                "Handling IT infrastructure troubleshooting (hardware & software) and ensuring smooth daily operations.",
                "Developing internal Laravel-based applications to improve business process efficiency.",
                "Creating project documentation and application user manuals.",
              ],
            },
            {
              role: "IT Programmer",
              badge: "Contract",
              company: "Massindo Group",
              period: "Jul 2024 – Sept 2025",
              location: "Bantar Gebang, Kota Bekasi",
              bullets: [
                "Developing and maintaining web applications using Ruby on Rails to support company operations.",
                "Providing support and troubleshooting for the JD Edwards (JDE) ERP system.",
                "Optimizing operational modules to improve system efficiency and stability.",
              ],
            },
            {
              role: "IT Staff",
              badge: "Contract",
              company: "PT. Brothersindo Saudara Sejati",
              period: "Nov 2023 – May 2024",
              location: "Kemayoran, Jakarta Pusat",
              bullets: [
                "Handling hardware & software troubleshooting and ensuring smooth IT operations.",
                "Installing software and configuring networks according to company needs.",
                "Maintaining and updating the company profile website built with Laravel.",
              ],
            },
          ].map((exp, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              className="relative flex flex-col"
            >
              {/* Timeline Node — selalu di kiri */}
              <div className="absolute -left-10 top-2 w-4 h-4 bg-accent rounded-full border-4 border-bg-surface z-10 shadow-lg shadow-accent/50"></div>

              {/* Meta Info */}
              <div className="flex flex-col items-start mb-3">
                <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
                <span
                  className="mt-1 px-2 py-0.5 rounded bg-bg-muted text-text-muted text-[10px] font-bold uppercase tracking-wider w-fit"
                  style={{ border: "1px solid var(--border-strong)" }}
                >
                  {exp.badge}
                </span>
                <div className="text-accent font-bold mt-2">{exp.company}</div>
                <div className="flex flex-col gap-0.5 text-sm text-text-muted mt-1">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Card */}
              <div className="p-6 bg-bg-elevated border border-color rounded-2xl shadow-sm">
                <ul className="space-y-3">
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
              Interested in collaborating or have a project to discuss? Feel
              free to reach out. I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  value: "rizky.pratama.tech@gmail.com",
                  label: "Email",
                },
                {
                  icon: Phone,
                  value: "+62 812-1169-2806",
                  label: "Phone/WhatsApp",
                },
                {
                  icon: Briefcase,
                  value: "linkedin.com/in/rizkprtama/",
                  label: "LinkedIn",
                },
                { icon: Code, value: "github.com/rizkprtama", label: "GitHub" },
              ].map((contact, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/5 border border-border-color group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center text-accent transition-all">
                    <contact.icon size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                      {contact.label}
                    </div>
                    <div className="text-text-primary font-medium">
                      {contact.value}
                    </div>
                  </div>
                </div>
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
                  placeholder="Tell me about your project..."
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
              Building clean, scalable, and performant web applications for
              business efficiency.
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
              {[Code, Briefcase, Mail, MessageSquare].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-bg-muted border border-color flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-10 border-t border-color flex flex-col items-center gap-6">
          <p className="text-text-muted text-sm text-center">
            © 2025 Tama. All rights reserved. Built with Laravel, React &
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
