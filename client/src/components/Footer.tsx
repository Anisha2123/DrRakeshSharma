"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── TOKENS — exact match to navbar ────────────────────────── */
const T = {
  teal:    "#2CCED1",
  tealD:   "#1ab8bb",
  orange:  "#FF8A5B",
  dark:    "#0d1e28",   /* navbar --dark */
  white:   "#FFFFFF",
  muted:   "rgba(255,255,255,0.42)",
  dimW:    "rgba(255,255,255,0.07)",
  dimW2:   "rgba(255,255,255,0.55)",
  border:  "rgba(44,206,209,0.14)",  /* navbar border tint */
};

/* ─── DATA ───────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home",           path: "/"                            },
  { label: "Services",       path: "/medical-services"            },
  { label: "Expertise",      path: "/areas-of-expertise"          },
  { label: "Blogs",       path: "our-blogs"            },
  { label: "About Us", path: "/why-choose-DrRakeshSharma"   },
];

const SERVICES = [
  "Urological Care",
  "Prostate Disorder",
  "Andrology & Male Infertility",
  "Kidney Stone Management",
  "Minimally Invasive & Laser",
  "Kidney Transplantation",
];

const CONTACT = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1110 5a1.5 1.5 0 010 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    text: "SRK Hospital, Jaipur, Rajasthan — 302004",
    link: "https://maps.google.com/?q=SRK+Hospital+Jaipur",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M3 8h14M8 3v5M12 3v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    text: "Mon – Sat  ·  9:00 AM – 6:00 PM",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
        <path d="M3.5 4A1.5 1.5 0 015 2.5h1.5a1 1 0 011 .8l.7 3.4a1 1 0 01-.3.95l-.9.9a11 11 0 005.5 5.5l.9-.9a1 1 0 01.95-.3l3.4.7a1 1 0 01.8 1V16a1.5 1.5 0 01-1.5 1.5C8.02 17.5 2.5 11.98 2.5 5A1.5 1.5 0 014 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: "+91 9887711224",
    link: "tel:+919887711224",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
        <path d="M2 5.5A1.5 1.5 0 013.5 4h13A1.5 1.5 0 0118 5.5v9A1.5 1.5 0 0116.5 16h-13A1.5 1.5 0 012 14.5v-9z" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    text: "contact@drrakeshsharma.com",
    link: "mailto:contact@drrakeshsharma.com",
  },
];

/* ─── HOOK ───────────────────────────────────────────────────── */
function useReveal() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── SOCIAL BUTTON ──────────────────────────────────────────── */
function SocialBtn({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "34px", height: "34px", borderRadius: "9px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? "linear-gradient(135deg,#2CCED1,#FF8A5B)" : T.dimW,
        border: `1px solid ${hov ? "transparent" : "rgba(44,206,209,0.18)"}`,
        color: hov ? T.white : T.muted,
        transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
        transform: hov ? "translateY(-3px) scale(1.08)" : "translateY(0) scale(1)",
        boxShadow: hov ? "0 8px 22px rgba(44,206,209,0.35)" : "none",
        textDecoration: "none", cursor: "pointer", flexShrink: 0,
      }}
    >
      {icon}
    </a>
  );
}

/* ─── NAV LINK ───────────────────────────────────────────────── */
function FootLink({ to, children, delay = 0 }: { to: string; children: React.ReactNode; delay?: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="ft2-link"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "12.5px", fontWeight: 500,
        letterSpacing: "0.07em", textTransform: "uppercase",
        color: hov ? T.white : T.muted,
        textDecoration: "none",
        display: "flex", alignItems: "center", gap: "8px",
        transition: "color 0.22s ease",
        animationDelay: `${delay}s`,
      }}
    >
      {/* teal dot that grows on hover */}
      <span style={{
        display: "inline-block",
        width: hov ? "16px" : "4px", height: "2px",
        borderRadius: "1px",
        background: hov ? "linear-gradient(90deg,#2CCED1,#FF8A5B)" : "rgba(44,206,209,0.4)",
        transition: "width 0.28s cubic-bezier(.22,1,.36,1), background 0.28s",
        flexShrink: 0,
      }}/>
      {children}
    </Link>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function Footer() {
  const { ref, vis } = useReveal();
  const [email, setEmail] = useState("");
  const [sent,  setSent]  = useState(false);
  const year = new Date().getFullYear();

  const handleSub = () => { if (email.trim()) { setSent(true); setEmail(""); } };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        /* ── keyframes ── */
        @keyframes ft2-up    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ft2-lineW { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ft2-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ft2-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ft2-pulse { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.45;transform:scale(1.6)} }
        @keyframes ft2-blink { 0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(44,206,209,.6)} 50%{opacity:.65;box-shadow:0 0 0 5px rgba(44,206,209,0)} }
        @keyframes ft2-lPulse { 0%,100%{transform:scale(1);opacity:0} 50%{transform:scale(1.5);opacity:.16} }
        @keyframes ft2-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        /* ── visibility-triggered ── */
        .ft2-vis .ft2-top   { animation: ft2-up 0.8s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .ft2-vis .ft2-c1    { animation: ft2-up 0.7s cubic-bezier(.22,1,.36,1) 0.14s both; }
        .ft2-vis .ft2-c2    { animation: ft2-up 0.7s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .ft2-vis .ft2-c3    { animation: ft2-up 0.7s cubic-bezier(.22,1,.36,1) 0.30s both; }
        .ft2-vis .ft2-c4    { animation: ft2-up 0.7s cubic-bezier(.22,1,.36,1) 0.38s both; }
        .ft2-vis .ft2-bot   { animation: ft2-up 0.7s cubic-bezier(.22,1,.36,1) 0.46s both; }
        .ft2-vis .ft2-bar   { animation: ft2-lineW 1.2s cubic-bezier(.22,1,.36,1) 0.1s both; transform-origin:left; }
        .ft2-vis .ft2-link  { animation: ft2-up 0.55s cubic-bezier(.22,1,.36,1) both; }

        /* ── always-on ── */
        .ft2-orbit-el  { animation: ft2-orbit  24s linear infinite; }
        .ft2-orbit-el2 { animation: ft2-orbit  30s linear infinite reverse; }
        .ft2-float-el  { animation: ft2-float  7s ease-in-out infinite; }
        .ft2-pulse-el  { animation: ft2-pulse  3s ease-in-out infinite; }
        .ft2-live-dot  { animation: ft2-blink  2s ease-in-out infinite; }
        .ft2-logo-glow { animation: ft2-lPulse 3.2s ease-in-out infinite 1.5s; }

        .ft2-name-shimmer {
          background: linear-gradient(90deg, #fff 25%, #2CCED1 48%, #FF8A5B 62%, #fff 80%);
          background-size: 260% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ft2-shimmer 4s linear infinite;
        }

        .ft2-input::placeholder { color: rgba(255,255,255,0.28); }
        .ft2-input:focus { outline: none; border-color: #2CCED1 !important; }

        /* ── grid breakpoints ── */
        @media (max-width: 1024px) {
          .ft2-cols { grid-template-columns: 1fr 1fr 1fr !important; }
          .ft2-c1   { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 640px) {
          .ft2-cols  { grid-template-columns: 1fr 1fr !important; }
          .ft2-c1    { grid-column: 1 / -1 !important; }
          .ft2-c4    { grid-column: 1 / -1 !important; }
          .ft2-bot-row { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
          .ft2-sub-wrap { flex-direction: column !important; align-items: stretch !important; }
          .ft2-sub-wrap input { border-radius: 10px !important; border-right: 1px solid rgba(255,255,255,0.12) !important; }
          .ft2-sub-wrap button { border-radius: 10px !important; }
        }
      `}</style>

      <footer
        ref={ref}
        className={vis ? "ft2-vis" : ""}
        style={{
          background: T.dark,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* ── BG DECOR ── */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* radial glows matching navbar colors */}
          <div style={{ position: "absolute", top: "-200px", right: "-180px", width: "580px", height: "580px", borderRadius: "50%", background: "radial-gradient(circle, rgba(44,206,209,0.08) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-160px", left: "-140px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,138,91,0.07) 0%, transparent 60%)" }} />
          {/* rotating rings — same dashed style as navbar hover indicator */}
          <div className="ft2-orbit-el" style={{ position: "absolute", top: "6%", right: "5%", width: "280px", height: "280px", borderRadius: "50%", border: "1px dashed rgba(44,206,209,0.12)" }} />
          <div className="ft2-orbit-el2" style={{ position: "absolute", bottom: "9%", left: "4%", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid rgba(255,138,91,0.1)" }} />
          {/* floating dots */}
          <div className="ft2-float-el" style={{ position: "absolute", top: "32%", left: "8%", width: "6px", height: "6px", borderRadius: "50%", background: T.teal, opacity: 0.2 }} />
          <div className="ft2-float-el" style={{ position: "absolute", top: "60%", right: "7%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange, opacity: 0.18, animationDelay: "2.5s" }} />
          <div className="ft2-pulse-el" style={{ position: "absolute", top: "20%", right: "24%", width: "4px", height: "4px", borderRadius: "50%", background: T.teal }} />
          {/* subtle crosshatch */}
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.018 }} width="700" height="700">
            {Array.from({ length: 14 }).map((_, r) => Array.from({ length: 14 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="1.5" fill={T.white} />
            )))}
          </svg>
        </div>

        {/* ════════════════════════════════════════
            BRAND HERO STRIP
            ════════════════════════════════════════ */}
        <div
          className="ft2-top"
          style={{
            borderBottom: `1px solid ${T.border}`,
            padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem) clamp(2rem,4vw,3.2rem)",
            position: "relative",
          }}
        >
          {/* top gradient accent line — same as navbar scroll-progress bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, #2CCED1, #FF8A5B)",
          }} />

          <div style={{ maxWidth: "1260px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(20px,4vw,40px)", flexWrap: "wrap" }}>

            {/* LOGO — identical structure to navbar */}
            <Link to="/" className="nav-logo" aria-label="SRK Hospital Home">
            <img
              src="/image.png"
              alt="SRK Hospital — Superspeciality Hospital"
              className="nav-logo-img"
            />
          </Link>

            {/* TAGLINE */}
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1rem,2vw,1.22rem)", fontStyle: "italic",
              color: "rgba(255,255,255,0.3)", maxWidth: "340px",
              lineHeight: 1.65, margin: 0,
            }}>
              "Excellence in urology is not just surgical skill — it is understanding each patient's life."
            </p>

            {/* NEWSLETTER */}
            {/* <div style={{ flexShrink: 0, width: "clamp(240px,28vw,310px)" }}>
              <p style={{
                fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px",
                color: T.muted, fontWeight: 500, margin: "0 0 10px",
              }}>
                Health Updates
              </p>
              {sent ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "11px 16px", borderRadius: "9px",
                  background: "rgba(44,206,209,0.1)",
                  border: "1px solid rgba(44,206,209,0.3)",
                }}>
                  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                    <path d="M3 8l3.5 3.5L13 5" stroke={T.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: "12.5px", color: T.teal }}>You're subscribed!</span>
                </div>
              ) : (
                <div className="ft2-sub-wrap" style={{ display: "flex" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSub()}
                    placeholder="Your email address"
                    className="ft2-input"
                    style={{
                      flex: 1, padding: "10px 14px",
                      background: T.dimW,
                      border: "1px solid rgba(44,206,209,0.18)",
                      borderRight: "none",
                      borderRadius: "9px 0 0 9px",
                      color: T.white, fontSize: "12.5px",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      transition: "border-color 0.22s",
                    }}
                  />
                  <button
                    onClick={handleSub}
                    style={{
                      padding: "10px 16px",
                      background: "linear-gradient(135deg, #2CCED1, #1ab8bb)",
                      border: "none", borderRadius: "0 9px 9px 0",
                      color: T.white, fontSize: "12px", fontWeight: 600,
                      letterSpacing: "0.07em", textTransform: "uppercase",
                      cursor: "pointer", fontFamily: "'DM Sans', system-ui, sans-serif",
                      transition: "opacity 0.2s",
                      whiteSpace: "nowrap",
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div> */}
          </div>
        </div>

        {/* ════════════════════════════════════════
            MAIN COLUMNS
            ════════════════════════════════════════ */}
        <div style={{ padding: "clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,4rem)" }}>
          <div style={{ maxWidth: "1260px", margin: "0 auto" }}>

            {/* gradient rule */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "clamp(2rem,4vw,3.5rem)", overflow: "hidden" }}>
              <div className="ft2-bar" style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B,transparent)", borderRadius: "1px" }} />
            </div>

            <div
              className="ft2-cols"
              style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr 1.5fr", gap: "clamp(2rem,4vw,3.5rem)" }}
            >

              {/* ── C1 — About ── */}
              <div className="ft2-c1">
                {/* credential pills — styled like navbar active items */}
                <p style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: T.teal, fontWeight: 700, margin: "0 0 14px" }}>About</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                  {[
                    { t: "M.B.B.S", hi: false },
                    { t: "M.S.",    hi: false },
                    { t: "DNB",     hi: false },
                    { t: "M.Ch.",   hi: true  },
                    
                    { t: "🥇 Gold Medallist", hi: false, gold: true },
                  ].map(({ t, hi, gold }, i) => (
                    <span key={i} style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "10px", fontWeight: hi || gold ? 700 : 500,
                      letterSpacing: "0.08em", padding: "3px 10px", borderRadius: "100px",
                      background: hi
                        ? "linear-gradient(135deg,rgba(44,206,209,0.2),rgba(255,138,91,0.2))"
                        : gold ? "rgba(246,211,101,0.12)" : T.dimW,
                      color: hi ? T.teal : gold ? "#f6d365" : T.muted,
                      border: `1px solid ${hi ? "rgba(44,206,209,0.35)" : gold ? "rgba(246,211,101,0.28)" : "rgba(255,255,255,0.08)"}`,
                    }}>{t}</span>
                  ))}
                </div>

                {/* mini stat pair */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
                  {[["25+", "Yrs Exp."], ["9000+", "Patients"]].map(([v, l], i) => (
                    <div key={i} style={{
                      flex: 1, padding: "13px 14px", borderRadius: "10px",
                      background: T.dimW,
                      border: `1px solid rgba(44,206,209,${i === 0 ? "0.18" : "0.10"})`,
                    }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "1.5rem", fontWeight: 600, lineHeight: 1,
                        letterSpacing: "-0.5px",
                        /* gradient number text */
                        background: "linear-gradient(135deg,#2CCED1,#FF8A5B)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}>{v}</div>
                      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.6px", color: T.muted, marginTop: "5px" }}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* social row — same look as navbar CTA */}
                <p style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: T.muted, fontWeight: 500, margin: "0 0 10px" }}>Follow</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <SocialBtn href="#" label="Facebook" icon={
                    <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                      <path d="M13 3h-2a3 3 0 00-3 3v2H6v3h2v6h3v-6h2l1-3h-3V6a1 1 0 011-1h2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                  }/>
                  <SocialBtn href="#" label="Instagram" icon={
                    <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                      <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.3"/>
                      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.3"/>
                      <circle cx="14.2" cy="5.8" r=".7" fill="currentColor"/>
                    </svg>
                  }/>
                  <SocialBtn href="#" label="LinkedIn" icon={
                    <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M7 9v5M7 7v.01M10 14v-3a2 2 0 014 0v3M10 11v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  }/>
                  <SocialBtn href="#" label="Twitter/X" icon={
                    <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                      <path d="M4 16L16 4M16 16L4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  }/>
                </div>
              </div>

              {/* ── C2 — Navigation ── */}
              <div className="ft2-c2">
                <p style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: T.teal, fontWeight: 700, margin: "0 0 18px" }}>Navigation</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                  {NAV_ITEMS.map((item, i) => (
                    <FootLink key={i} to={item.path} delay={0.18 + i * 0.06}>{item.label}</FootLink>
                  ))}
                </div>
              </div>

              {/* ── C3 — Services ── */}
              <div className="ft2-c3">
                <p style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: T.teal, fontWeight: 700, margin: "0 0 18px" }}>Services</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                  {SERVICES.map((s, i) => (
                    <FootLink key={i} to={`/areas-of-expertise?specialty=${i + 1}`} delay={0.22 + i * 0.055}>{s}</FootLink>
                  ))}
                </div>
              </div>

              {/* ── C4 — Contact ── */}
              <div className="ft2-c4">
                <p style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "1.8px", color: T.teal, fontWeight: 700, margin: "0 0 18px" }}>Contact</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
  {CONTACT.map((c, i) => (
    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      
      {/* icon container */}
      <div style={{
        width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: T.dimW,
        border: "1px solid rgba(44,206,209,0.16)",
        color: T.teal, marginTop: "1px",
      }}>
        {c.icon}
      </div>

      {/* text / link */}
      {c.link ? (
        <a
          href={c.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: T.muted,
            lineHeight: 1.65,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            textDecoration: "none",
            whiteSpace: "pre-line",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.teal)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
        >
          {c.text}
        </a>
      ) : (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: T.muted,
            lineHeight: 1.65,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            whiteSpace: "pre-line",
          }}
        >
          {c.text}
        </span>
      )}
    </div>
  ))}
</div>

                {/* CTA — mirrors navbar btn-book exactly */}
                 <a href="tel:+919887711224"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "10px 22px",
                    background: "linear-gradient(135deg, #2CCED1, #1ab8bb)",
                    borderRadius: "8px",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "12px", fontWeight: 600,
                    letterSpacing: "0.07em", textTransform: "uppercase",
                    color: T.white, textDecoration: "none",
                    boxShadow: "0 4px 16px rgba(44,206,209,0.34)",
                    transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, background 0.28s",
                    position: "relative", overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 8px 28px rgba(44,206,209,0.44)";
                    el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 4px 16px rgba(44,206,209,0.34)";
                    el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)";
                  }}
                >
                  {/* pulsing dot — same as btn-book-dot */}
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.75)", flexShrink: 0,
                    animation: "ft2-pulse 2s ease-in-out infinite",
                  }}/>
                  <span>Book Consultation</span>
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            BOTTOM BAR
            ════════════════════════════════════════ */}
        <div
          className="ft2-bot"
          style={{
            borderTop: `1px solid rgba(44,206,209,0.12)`,
            padding: "clamp(14px,2.5vw,18px) clamp(1.5rem,5vw,4rem)",
          }}
        >
          <div
            className="ft2-bot-row"
            style={{ maxWidth: "1260px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}
          >
            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "11.5px", fontWeight: 400, color: "rgba(255,255,255,0.22)", margin: 0 }}>
              © {year} SRK Hospital · Dr. Rakesh Sharma. All rights reserved.
            </p>

            <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.14)", margin: 0 }}>
              Crafted with care for patient-first medicine.
            </p>

            <div style={{ display: "flex", gap: "18px" }}>
              {["Privacy Policy", "Disclaimer", "Sitemap"].map((l, i) => (
                <a key={i} href="#"
                  style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textDecoration: "none", fontWeight: 400, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.teal)}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}