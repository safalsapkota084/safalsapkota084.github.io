import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Digital Thakali",
    desc: "A personal portfolio & brand — built from scratch with pure HTML, now migrated to React + Vite.",
    tags: ["React", "Vite", "GitHub Pages"],
    link: "#",
  },
  {
    title: "Project Two",
    desc: "A short description of your second project goes here. Replace this with your real work.",
    tags: ["Node.js", "MongoDB", "Express"],
    link: "#",
  },
  {
    title: "Project Three",
    desc: "Another cool thing you built. Describe it in one or two sentences.",
    tags: ["Python", "API", "UI"],
    link: "#",
  },
];

const SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Vite",
  "Git", "GitHub", "Node.js", "Figma", "VS Code",
];

export default function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0a;
          --surface: #111111;
          --border: #1e1e1e;
          --accent: #e8ff47;
          --accent2: #ff6b35;
          --text: #f0f0f0;
          --muted: #666;
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          font-weight: 300;
          cursor: none;
          overflow-x: hidden;
        }

        .cursor {
          position: fixed;
          width: 20px; height: 20px;
          border: 2px solid var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.08s ease;
          mix-blend-mode: difference;
        }

        /* NOISE OVERLAY */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.4;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 3rem;
          border-bottom: 1px solid var(--border);
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
        }

        .logo {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.05em;
          color: var(--accent);
        }

        .nav-links {
          display: flex; gap: 2.5rem; list-style: none;
        }

        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .nav-links a:hover, .nav-links a.active { color: var(--accent); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column;
          justify-content: flex-end;
          padding: 3rem;
          padding-top: 8rem;
          position: relative;
          overflow: hidden;
        }

        .hero-bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-size: clamp(8rem, 20vw, 22rem);
          color: transparent;
          -webkit-text-stroke: 1px #1a1a1a;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.02em;
        }

        .hero-tag {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
          opacity: 0;
          animation: fadeUp 0.6s 0.2s forwards;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 12vw, 12rem);
          line-height: 0.9;
          letter-spacing: -0.02em;
          opacity: 0;
          animation: fadeUp 0.7s 0.4s forwards;
        }

        .hero-title span { color: var(--accent); }

        .hero-sub {
          margin-top: 2rem;
          font-size: 1rem;
          color: var(--muted);
          max-width: 420px;
          line-height: 1.7;
          opacity: 0;
          animation: fadeUp 0.7s 0.6s forwards;
        }

        .hero-cta {
          margin-top: 2.5rem;
          display: flex; gap: 1rem; align-items: center;
          opacity: 0;
          animation: fadeUp 0.7s 0.8s forwards;
        }

        .btn {
          display: inline-block;
          padding: 0.8rem 2rem;
          font-family: var(--font-body);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background: var(--accent);
          color: #000;
          font-weight: 500;
        }

        .btn-primary:hover { background: #fff; }

        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border);
        }

        .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

        .scroll-hint {
          position: absolute; bottom: 2rem; right: 3rem;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          writing-mode: vertical-rl;
          opacity: 0;
          animation: fadeUp 0.7s 1.2s forwards;
        }

        /* SECTIONS */
        section {
          padding: 7rem 3rem;
          border-top: 1px solid var(--border);
        }

        .section-label {
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 6rem);
          line-height: 1;
          letter-spacing: -0.01em;
          margin-bottom: 3rem;
        }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .about-text p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #aaa;
          margin-bottom: 1.5rem;
        }

        .about-text p strong { color: var(--text); font-weight: 500; }

        .about-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .stat-box {
          border: 1px solid var(--border);
          padding: 1.5rem;
          transition: border-color 0.2s;
        }

        .stat-box:hover { border-color: var(--accent); }

        .stat-num {
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--accent);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.3rem;
        }

        /* PROJECTS */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5px;
          background: var(--border);
        }

        .project-card {
          background: var(--bg);
          padding: 2.5rem;
          transition: background 0.2s;
          position: relative;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: var(--accent);
          transition: height 0.3s;
        }

        .project-card:hover { background: var(--surface); }
        .project-card:hover::before { height: 100%; }

        .project-num {
          font-family: var(--font-display);
          font-size: 4rem;
          color: var(--border);
          line-height: 1;
          margin-bottom: 1rem;
          transition: color 0.2s;
        }

        .project-card:hover .project-num { color: var(--accent); opacity: 0.3; }

        .project-title {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .project-desc {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .project-tags {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
        }

        .tag {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--border);
          color: var(--muted);
        }

        /* SKILLS */
        .skills-wrap {
          display: flex; flex-wrap: wrap; gap: 0;
          border: 1px solid var(--border);
        }

        .skill-item {
          padding: 1.2rem 2rem;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          transition: all 0.2s;
        }

        .skill-item:hover {
          background: var(--accent);
          color: #000;
          border-color: var(--accent);
        }

        /* CONTACT */
        .contact-inner {
          max-width: 640px;
        }

        .contact-inner p {
          font-size: 1.05rem;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        .contact-links {
          display: flex; gap: 1.5rem; flex-wrap: wrap;
        }

        /* FOOTER */
        footer {
          padding: 2rem 3rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          color: var(--muted);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          nav { padding: 1.2rem 1.5rem; }
          .nav-links { display: none; }
          .hero { padding: 2rem 1.5rem; padding-top: 6rem; }
          section { padding: 5rem 1.5rem; }
          .about-grid { grid-template-columns: 1fr; gap: 2rem; }
          footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <div className="cursor" ref={cursorRef} />

      <nav>
        <div className="logo">Safal</div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={active === l ? "active" : ""}
                onClick={() => setActive(l)}>{l}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero" id="hero">
        <div className="hero-bg-text">SAFAL</div>
        <p className="hero-tag">Portfolio — 2026</p>
        <h1 className="hero-title">
          Safal<br /><span>Sapkota</span>
        </h1>
        <p className="hero-sub">
          Developer & creator building digital experiences. Based somewhere between code and creativity.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View Work</a>
          <a href="#contact" className="btn btn-outline">Get In Touch</a>
        </div>
        <span className="scroll-hint">Scroll Down</span>
      </div>

      {/* ABOUT */}
      <section id="about">
        <p className="section-label">01 — About</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm <strong>Safal Sapkota</strong>, a developer who loves building things for the web.
              I care about clean code, good design, and making things that actually work.
            </p>
            <p>
              Currently learning React and modern frontend tooling. Always looking for the next
              interesting problem to solve.
            </p>
            <a href="#contact" className="btn btn-primary" style={{marginTop: "1rem", display: "inline-block"}}>
              Say Hello
            </a>
          </div>
          <div className="about-stats">
            {[
              { num: "3+", label: "Years Coding" },
              { num: "10+", label: "Projects Built" },
              { num: "1", label: "Live Domain" },
              { num: "∞", label: "Things to Learn" },
            ].map((s) => (
              <div className="stat-box" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <p className="section-label">02 — Projects</p>
        <h2 className="section-title">Selected Work</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="project-card" key={p.title}>
              <div className="project-num">0{i + 1}</div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <p className="section-label">03 — Skills</p>
        <h2 className="section-title">What I Use</h2>
        <div className="skills-wrap">
          {SKILLS.map((s) => (
            <div className="skill-item" key={s}>{s}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <p className="section-label">04 — Contact</p>
        <h2 className="section-title">Let's Talk</h2>
        <div className="contact-inner">
          <p>
            Have a project in mind or just want to say hi? My inbox is always open.
            I'll get back to you as soon as possible.
          </p>
          <div className="contact-links">
            <a href="mailto:your@email.com" className="btn btn-primary">Send Email</a>
            <a href="https://github.com/safalsapkota084" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2026 Safal Sapkota</span>
        <span>Built with React + Vite</span>
      </footer>
    </>
  );
}