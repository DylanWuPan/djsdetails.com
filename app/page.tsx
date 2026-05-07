"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface BeforeAfter {
  id: number;
  label: string;
  before: string;
  after: string;
  description: string;
}

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const beforeAfterData: BeforeAfter[] = [
  {
    id: 1,
    label: "Full Interior Restoration",
    before: "/images/before-after/audiinterior-before.jpg",
    after: "/images/before-after/audiinterior-after.jpg",
    description:
      "Leather, carpets, and trim fully restored with a deep interior reset that brought the cabin back to life.",
  },

  {
    id: 2,
    label: "Full Exterior Detail",
    before: "/images/before-after/lexusexterior-before.jpeg",
    after: "/images/before-after/lexusexterior-after.jpeg",
    description:
      "Foam washed, decontaminated, and finished with a deep gloss that completely refreshed the exterior.",
  },
  {
    id: 3,
    label: "Deep Interior Cleaning",
    before: "/images/before-after/lexusinterior-before.jpeg",
    after: "/images/before-after/lexusinterior-after.jpeg",
    description:
      "Heavy dirt, stains, and buildup removed to leave the interior looking factory fresh again.",
  },
  {
    id: 4,
    label: "Exterior Foam Wash",
    before: "/images/foam-wash.jpeg",
    after: "/images/porsche-wings.jpeg",
    description:
      "Thick foam treatment and careful hand washing delivered a clean, streak-free finish with standout shine.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function BeforeAfterCard({ item }: { item: BeforeAfter }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="ba-card" onClick={() => setRevealed((r) => !r)}>
      <div className={`ba-slider ${revealed ? "revealed" : ""}`}>
        <Image
          src={item.before}
          alt={`Before – ${item.label}`}
          className="ba-img ba-before"
          height={2000}
          width={2000}
        />
        <Image
          src={item.after}
          alt={`After – ${item.label}`}
          className="ba-img ba-after"
          height={2000}
          width={2000}
        />
        <div className="ba-divider">
          <span className="ba-pill">{revealed ? "AFTER" : "BEFORE"}</span>
        </div>
      </div>
      <div className="ba-meta">
        <h3 className="ba-title">{item.label}</h3>
        <p className="ba-desc">{item.description}</p>
        <span className="ba-cta">
          {revealed ? "← See before" : "Tap to reveal after →"}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState<QuoteForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // console.log("Submitting form:", form);
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        /* ── Tokens ── */
        :root {
          --black:   #0a0a0a;
          --ink:     #111111;
          --carbon:  #1c1c1e;
          --mid:     #2a2a2d;
          --line:    #333336;
          --muted:   #888892;
          --silver:  #c8c8d0;
          --white:   #f5f5f7;
          --gold: #c9a84c;
          --gold2:   #e8c96a;
          --red:     #c0392b;
          --font-display: 'Bebas Neue', sans-serif;
          --font-body:    'DM Sans', sans-serif;
          --ease: cubic-bezier(.22,.68,0,1.2);
          --radius: 12px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--black);
          color: var(--white);
          font-family: var(--font-body);
          font-weight: 300;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* ── Noise grain overlay ── */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 9999;
          opacity: .5;
        }

        .gold {
          color: var(--gold);
        }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          background: linear-gradient(to bottom, rgba(10,10,10,.95), transparent);
          backdrop-filter: blur(0px);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: .06em;
          color: var(--white);
          text-decoration: none;
        }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          color: var(--silver);
          text-decoration: none;
          font-size: .85rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .nav-links a:hover { color: var(--gold); }

        /* ── Hero ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 48px 80px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(10,10,10,.2) 0%, rgba(10,10,10,.85) 70%, var(--black) 100%),
            url('/images/hero.jpg') center/cover no-repeat;
        }
        .hero-content { position: relative; max-width: 760px; }
        .hero-badge {
          display: inline-block;
          font-size: .72rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--gold);
          border: 1px solid var(--gold);
          padding: 5px 14px;
          border-radius: 2px;
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 10vw, 8.5rem);
          line-height: .92;
          letter-spacing: .01em;
          color: var(--white);
          margin-bottom: 24px;
        }
        .hero-title em { color: var(--gold); font-style: normal; }
        .hero-sub {
          font-size: 1.1rem;
          color: var(--silver);
          max-width: 480px;
          margin-bottom: 40px;
        }
        .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold);
          color: var(--black);
          border: none;
          padding: 14px 36px;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: .9rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          border-radius: 4px;
          transition: background .2s, transform .15s var(--ease);
        }
        .btn-primary:hover { background: var(--gold2); transform: translateY(-2px); }
        .btn-outline {
          background: transparent;
          color: var(--white);
          border: 1px solid var(--line);
          padding: 14px 36px;
          font-family: var(--font-body);
          font-size: .9rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          transition: border-color .2s, color .2s, transform .15s var(--ease);
        }
        .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        /* ── Sections ── */
        section { padding: 100px 48px; }
        .section-label {
          font-size: .72rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          display: block;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 4rem);
          line-height: 1;
          letter-spacing: .02em;
          color: var(--white);
          margin-bottom: 48px;
        }

        /* ── Divider ── */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--line), transparent);
          margin: 0 48px;
        }

        /* ── Stats strip ── */
        .stats {
          background: var(--carbon);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 40px 48px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 32px;
          text-align: center;
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--gold);
          display: block;
          line-height: 1;
        }
        .stat-label { font-size: .8rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }

        /* ── Before/After ── */
        .ba-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .ba-card {
          background: var(--carbon);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          transition: transform .25s var(--ease), box-shadow .25s;
        }
        .ba-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.5); }
        .ba-slider {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .ba-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity .45s ease;
        }
        .ba-before { opacity: 1; }
        .ba-after  { opacity: 0; }
        .ba-slider.revealed .ba-before { opacity: 0; }
        .ba-slider.revealed .ba-after  { opacity: 1; }
        .ba-divider {
          position: absolute; inset: 0;
          display: flex; align-items: flex-end; justify-content: flex-start;
          padding: 12px;
          pointer-events: none;
        }
        .ba-pill {
          font-size: .65rem;
          letter-spacing: .15em;
          font-weight: 500;
          background: rgba(0,0,0,.7);
          color: var(--gold);
          border: 1px solid var(--gold);
          padding: 4px 10px;
          border-radius: 2px;
        }
        .ba-meta { padding: 20px 24px 24px; }
        .ba-title { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: .04em; margin-bottom: 6px; }
        .ba-desc { font-size: .85rem; color: var(--muted); margin-bottom: 12px; }
        .ba-cta { font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }

        /* ── About / Profile ── */
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1100px;
        }
        .about-img-wrap {
          position: relative;
        }
        .about-img {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          border-radius: var(--radius);
          display: block;
        }
        .about-img-wrap::after {
          content: '';
          position: absolute;
          inset: -12px -12px 12px 12px;
          border: 2px solid var(--gold);
          border-radius: var(--radius);
          z-index: -1;
        }
        .about-text { }
        .about-quote {
          font-size: 1.45rem;
          font-style: italic;
          font-weight: 300;
          color: var(--silver);
          line-height: 1.5;
          margin-bottom: 28px;
          border-left: 3px solid var(--gold);
          padding-left: 24px;
        }
        .about-body { color: var(--muted); font-size: .95rem; margin-bottom: 20px; }
        .about-values {
          display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px;
        }
        .value-chip {
          font-size: .75rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          border: 1px solid var(--line);
          color: var(--silver);
          padding: 6px 14px;
          border-radius: 2px;
        }

        /* ── Services list ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2px;
        }
        .service-item {
          background: var(--carbon);
          border: 1px solid var(--line);
          padding: 32px 28px;
          transition: background .2s, border-color .2s;
        }
        .service-item:hover { background: var(--mid); border-color: var(--gold); }
        .service-icon { font-size: 1.6rem; margin-bottom: 14px; }
        .service-name { font-family: var(--font-display); font-size: 1.15rem; letter-spacing: .04em; margin-bottom: 8px; }
        .service-desc { font-size: .83rem; color: var(--muted); }

        /* ── Contact split ── */
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
          max-width: 1100px;
        }
        .contact-info { }
        .contact-detail { margin-bottom: 32px; }
        .contact-detail-label {
          font-size: .7rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 6px;
          display: block;
        }
        .contact-detail-value { font-size: 1rem; color: var(--silver); }
        .social-links { display: flex; gap: 16px; margin-top: 40px; }
        .social-link {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line);
          border-radius: 50%;
          color: var(--muted);
          text-decoration: none;
          font-size: .85rem;
          transition: border-color .2s, color .2s;
        }
        .social-link:hover { border-color: var(--gold); color: var(--gold); }

        /* ── Quote Form ── */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-label {
          font-size: .72rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .form-control {
          background: var(--carbon);
          border: 1px solid var(--line);
          color: var(--white);
          font-family: var(--font-body);
          font-size: .9rem;
          padding: 12px 16px;
          border-radius: 6px;
          outline: none;
          transition: border-color .2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .form-control:focus { border-color: var(--gold); }
        .form-control::placeholder { color: var(--muted); }
        textarea.form-control { resize: vertical; min-height: 120px; }
        select.form-control option { background: var(--carbon); }
        .form-submit {
          width: 100%;
          margin-top: 8px;
          padding: 16px;
          font-size: .9rem;
          letter-spacing: .12em;
        }
        .success-msg {
          background: var(--carbon);
          border: 1px solid var(--gold);
          border-radius: var(--radius);
          padding: 48px;
          text-align: center;
        }
        .success-icon { font-size: 2.4rem; margin-bottom: 16px; }
        .success-title { font-family: var(--font-display); font-size: 2rem; letter-spacing: .04em; margin-bottom: 8px; }
        .success-sub { color: var(--muted); }

        /* ── Footer ── */
        footer {
          background: var(--ink);
          border-top: 1px solid var(--line);
          padding: 48px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .footer-logo { font-family: var(--font-display); font-size: 1.3rem; letter-spacing: .06em; }
        .footer-logo span { color: var(--gold); }
        .footer-copy { font-size: .8rem; color: var(--muted); }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .nav { padding: 16px 24px; }
          .nav-links { display: none; }
          section { padding: 72px 24px; }
          .hero { padding: 0 24px 64px; }
          .stats { padding: 32px 24px; }
          .divider { margin: 0 24px; }
          .about-inner,
          .contact-inner { grid-template-columns: 1fr; gap: 40px; }
          .about-img-wrap::after { display: none; }
          .about-img { aspect-ratio: 4/3; }
          .form-grid { grid-template-columns: 1fr; }
          .form-group.full { grid-column: 1; }
          footer { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
        }
          
      `}</style>

      {/* ── Nav ── */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <span>DJ</span> &apos;s DETAILS
        </a>
        <ul className="nav-links">
          <li>
            <a href="#portfolio">Portfolio</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <a
          href="#quote"
          className="btn-primary"
          style={{ padding: "10px 24px", fontSize: ".78rem" }}
        >
          Get a Quote
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-badge">
            Mobile &amp; On-Site Detailing · Boston Area
          </span>
          <h1 className="hero-title">
            MAKE YOUR
            <br />
            CAR <em>SHINE</em>
            <br />
            AGAIN.
          </h1>
          <p className="hero-sub">
            High-quality detailing from a local high school senior who genuinely
            cares about your car. Attention to detail, premium products, and
            results you’ll notice immediately.
          </p>
          <div className="hero-ctas">
            <a href="#quote" className="btn-primary">
              Request a Quote
            </a>
            <a href="#portfolio" className="btn-outline">
              Check Out My Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="stats">
        {[
          { num: "1-on-1 Service", label: "Handled Personally by DJ" },
          { num: "5★", label: "Average Rating" },
          { num: "100%", label: "Satisfaction Guaranteed" },
          {
            num: "Local & Student-Owned",
            label: "Professional Tools & Products",
          },
        ].map((s) => (
          <div key={s.label}>
            <span className="stat-num">{s.num}</span>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Before & After ── */}
      <section id="portfolio">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">Before &amp; After</h2>
        <div className="ba-grid">
          {beforeAfterData.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── About / Profile ── */}
      <section id="about">
        <div className="about-inner">
          <div className="about-img-wrap">
            <Image
              src="/images/profile.jpg"
              alt="DJ — founder of DJ's Details"
              className="about-img"
              height={2000}
              width={2000}
            />
          </div>
          <div className="about-text">
            <span className="section-label">About</span>
            <h2 className="section-title" style={{ marginBottom: 28 }}>
              Meet <span className="gold">DJ</span>
            </h2>
            <blockquote className="about-quote">
              &quot;A clean car isn &apos;t just about looks — it&apos;s about
              pride of ownership. I want every client to feel that the moment
              they open the door.&quot;
            </blockquote>
            <p className="about-body">
              DJ (Dillan Akinc) is a Needham-based high school senior who turned
              a passion for cars into a growing local business. What started as
              helping out friends and family quickly became something bigger
              once people saw the level of care he puts into every detail.
            </p>
            <p className="about-body">
              He learned early on—working on cars with his dad—that great
              results come from patience, the right products, and not cutting
              corners. That mindset still drives every job he takes on today.
            </p>
            <p className="about-body">
              When you book with DJ’s Details, you’re not getting a random
              crew—you’re getting DJ himself. He takes pride in every car he
              works on and treats it like it’s his own.
            </p>
            <div className="about-values">
              {[
                "Obsessive Craftsmanship",
                "Premium Products Only",
                "Mobile & Flexible",
                "Transparent Pricing",
                "Paint-Safe Processes",
                "Fast Responses & Free Consults",
              ].map((v) => (
                <span key={v} className="value-chip">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Services ── */}
      <section id="services">
        <span className="section-label">Services</span>
        <h2 className="section-title">What I Offer</h2>
        <div className="services-grid">
          {[
            {
              icon: "🚿",
              name: "Express Detail",
              desc: "A quick refresh to keep your car looking clean between deeper details.",
            },
            {
              icon: "✨",
              name: "Full Interior",
              desc: "A full interior reset—seats, carpets, and surfaces cleaned and refreshed.",
            },
            {
              icon: "🎨",
              name: "Paint Correction",
              desc: "Removes swirls and light scratches to bring your paint back to life.",
            },
            {
              icon: "💎",
              name: "Ceramic Coating",
              desc: "Long-lasting protection that keeps your car glossy and easier to clean.",
            },
            {
              icon: "⚙️",
              name: "Engine Bay",
              desc: "Careful cleaning to make your engine bay look clean and well-kept.",
            },
            {
              icon: "🏆",
              name: "Concours Full Detail",
              desc: "The complete package—inside and out, detailed with maximum attention.",
            },
          ].map((s) => (
            <div key={s.name} className="service-item">
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── Contact + Quote Form ── */}
      <section id="contact">
        <div className="contact-inner">
          {/* Info side */}
          <div className="contact-info">
            <span className="section-label">Contact Me</span>
            <h2 className="section-title" style={{ marginBottom: 40 }}>
              Let’s Talk About
              <br />
              Your Car.
            </h2>
            <div className="contact-detail">
              <span className="contact-detail-label">Phone</span>
              <div className="contact-detail-value">(781) 690-2612</div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <div className="contact-detail-value">
                djsdetailsbusiness@gmail.com
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Service Area</span>
              <div className="contact-detail-value">
                Greater Boston, MA
                <br />
                Mobile &amp; On-Site Available
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Hours</span>
              <div className="contact-detail-value">24 / 7 by Appointment</div>
            </div>
            {/* <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                IG
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                FB
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                TK
              </a>
            </div> */}
          </div>

          {/* Form side */}
          <div id="quote">
            <span className="section-label">Get a Quote</span>
            <h2 className="section-title" style={{ marginBottom: 32 }}>
              Request a Free Estimate
            </h2>

            {submitted ? (
              <div className="success-msg">
                <div className="success-icon">✅</div>
                <div className="success-title">Quote Request Sent!</div>
                <p className="success-sub">
                  DJ will personally reach out within 24 hours to talk through
                  your car and what you’re looking for.
                </p>
              </div>
            ) : (
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="DJ"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="(781) 690-2612"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="djsdetailsbusiness@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="message">
                    Service Requests
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder="Tell me about your car and what you’re looking to get done…"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group full">
                  <button className="btn-primary form-submit" type="submit">
                    Send Quote Request →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-logo">
          <span>DJ</span> &apos;s DETAILS
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} DJ&apos;s Details. All rights reserved.{" "}
        </p>
      </footer>
    </>
  );
}
