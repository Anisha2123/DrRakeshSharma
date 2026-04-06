"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── TOKENS ─────────────────────────────────────────────────── */
const T = {
  teal:   "#2CCED1",
  tealD:  "#1ab8bb",
  orange: "#FF8A5B",
  dark:   "#0d1e28",
  ink:    "#1C1C1C",
  mid:    "#5A5A5A",
  muted:  "#888",
  bg:     "#F4F4F4",
  white:  "#FFFFFF",
  border: "rgba(0,0,0,0.07)",
};

/* ─── FEATURED SERVICES (6 hero cards) ──────────────────────── */
const FEATURED = [
  {
    id: 1,
    title: "Kidney Stone",
    tag: "Stone Disease",
    tagColor: T.teal,
    stat: "ESWL · URS · PCNL",
    img: "/services/kidneystone.png",
    accent: T.teal,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 3C8 3 5 6.5 5 10c0 5 7 12 7 12s7-7 7-12c0-3.5-3-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    desc: "Minimally invasive stone clearance using laser, sound waves and precision scopes — no large cuts, fast recovery.",
  },
  {
    id: 4,
    title: "Prostate Enlargement",
    tag: "Prostate",
    tagColor: T.orange,
    stat: "HoLEP · TURP · Urolift",
    img: "/services/ProstateEnlargement.png",
    accent: T.orange,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <rect x="5" y="8" width="14" height="10" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    desc: "Gold-standard BPH management from laser enucleation to modern Urolift — restoring natural urine flow.",
  },
  {
    id: 5,
    title: "Kidney Cancer",
    tag: "Oncology",
    tagColor: "#E05A5A",
    stat: "Robotic · Laparoscopic",
    img: "/services/KidneyCancer.png",
    accent: "#E05A5A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 3C8.5 3 5 6 5 10c0 3 1.5 5.5 3.5 7L12 21l3.5-4C17.5 15.5 19 13 19 10c0-4-3.5-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M9 10h6M12 7v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    desc: "Robotic-assisted and laparoscopic nephrectomy — precise tumour removal with minimal downtime.",
  },
  {
    id: 10,
    title: "Male Infertility",
    tag: "Andrology",
    tagColor: "#6B7FD4",
    stat: "IVF · TESE · Microsurgery",
    img: "/services/Male Infertility.png",
    accent: "#6B7FD4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 13v8M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    desc: "Complete andrological workup with IVF support, microsurgical sperm retrieval and hormonal therapy.",
  },
  {
    id: 11,
    title: "Endo-Urology",
    tag: "Minimally Invasive",
    tagColor: T.teal,
    stat: "URS · PCNL · Cystoscopy",
    img: "/services/EndoUrology.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    desc: "Scope-based surgery across the entire urinary tract — no large incisions, minimal blood loss, same-day discharge.",
  },
  {
    id: 6,
    title: "Erectile Dysfunction",
    tag: "Andrology",
    tagColor: "#6B7FD4",
    stat: "Medication · Surgery",
    img: "/services/ErectileDysfunction.png",
    accent: "#6B7FD4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v4M12 16v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    desc: "Evidence-based ED care — lifestyle optimisation, PDE5 inhibitors, penile prosthesis implantation.",
  },
];

/* ─── ALL 15 MARQUEE SERVICES ────────────────────────────────── */
const ALL_SERVICES = [
  "Kidney Stone", "Ureteric Stone", "Bladder Stone",
  "Prostate Enlargement", "Kidney Cancer", "Bladder Cancer",
  "Prostate Cancer", "Erectile Dysfunction", "Varicocele",
  "Male Infertility", "Endo-Urology", "Urinary Tract Infection",
  "Urinary Incontinence", "Andrology", "Penis Enlargement",
  "Uro Oncology", "Kidney Transplantation",
  "Urethroplasty", "Female Urology", "Pediatric Urology", "Laparoscopy"
];

/* ─── HOOK ───────────────────────────────────────────────────── */
function useReveal() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─── BIG FEATURE CARD ───────────────────────────────────────── */
function BigCard({ svc, vis, delay }: { svc: typeof FEATURED[0]; vis: boolean; delay: number }) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/medical-services/${svc.id}`)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={vis ? "st-card-in" : "st-card"}
      style={{
        animationDelay: `${delay}s`,
        borderRadius: "22px", overflow: "hidden",
        cursor: "pointer", position: "relative",
        background: T.dark,
        border: `1px solid ${hov ? svc.accent + "55" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hov ? `0 24px 64px ${svc.accent}22, 0 4px 20px rgba(0,0,0,0.15)` : "0 4px 24px rgba(0,0,0,0.12)",
        transform: hov ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "all 0.44s cubic-bezier(.22,1,.36,1)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* image */}
      <div style={{ position: "relative", height: "190px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={svc.img} alt={svc.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
            filter: hov ? "brightness(0.55)" : "brightness(0.65)",
          }}
        />
        {/* gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `linear-gradient(to bottom, ${svc.accent}40 0%, rgba(13,30,40,0.85) 100%)`
            : `linear-gradient(to bottom, transparent 20%, rgba(13,30,40,0.75) 100%)`,
          transition: "background 0.5s",
        }} />
        {/* top gradient accent — same as navbar scroll bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)", opacity: hov ? 1 : 0.5, transition: "opacity 0.4s" }} />
        {/* tag */}
        <span style={{
          position: "absolute", top: "14px", right: "14px",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: "100px",
          background: "rgba(13,30,40,0.6)", backdropFilter: "blur(8px)",
          color: svc.tagColor, border: `1px solid ${svc.tagColor}40`,
        }}>{svc.tag}</span>
        {/* icon */}
        <div style={{
          position: "absolute", bottom: "14px", left: "16px",
          width: "38px", height: "38px", borderRadius: "12px",
          background: hov ? svc.accent : "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: T.white,
          border: `1px solid ${hov ? "transparent" : "rgba(255,255,255,0.2)"}`,
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "rotate(-8deg) scale(1.1)" : "rotate(0) scale(1)",
        }}>{svc.icon}</div>
      </div>
      {/* body */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* stat pill */}
        <span style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
          color: svc.accent, background: `${svc.accent}12`,
          border: `1px solid ${svc.accent}28`,
          padding: "3px 10px", borderRadius: "100px",
          width: "fit-content", marginBottom: "10px",
          display: "inline-block",
        }}>{svc.stat}</span>
        <h3 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "1.2rem", fontWeight: 700, color: T.white,
          margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.3px",
        }}>{svc.title}</h3>
        <p style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.78rem", color: "rgba(255,255,255,0.5)",
          lineHeight: 1.7, fontWeight: 300, margin: "0 0 16px", flex: 1,
        }}>{svc.desc}</p>
        {/* footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "'DM Sans',system-ui,sans-serif",
            fontSize: "0.68rem", fontWeight: 600,
            color: hov ? svc.accent : "rgba(255,255,255,0.35)",
            transition: "color 0.3s",
          }}>Learn More</span>
          <div style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: hov ? `linear-gradient(135deg,${T.teal},${T.orange})` : "rgba(255,255,255,0.07)",
            border: `1px solid ${hov ? "transparent" : "rgba(255,255,255,0.1)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hov ? "rotate(45deg)" : "rotate(0)",
            transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
          }}>
            <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
              <path d="M2 6h8M6 2l4 4-4 4" stroke={T.white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function ServicesTeaser() {
  const { ref, vis } = useReveal();
  const [active, setActive] = useState(0); // index of large featured card
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // auto-cycle the hero spotlight
  useEffect(() => {
    tickRef.current = setInterval(() => setActive(a => (a + 1) % FEATURED.length), 4000);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, []);

  const hero = FEATURED[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes st-fadeUp  { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes st-fadeL   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes st-fadeR   { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes st-lineW   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes st-cardIn  { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes st-orbit   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes st-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes st-pulse   { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.5;transform:scale(1.7)} }
        @keyframes st-heroIn  { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        @keyframes st-textIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes st-lPulse  { 0%,100%{transform:scale(1);opacity:0} 50%{transform:scale(1.45);opacity:.15} }
        @keyframes st-blink   { 0%,100%{opacity:1} 50%{opacity:.35} }
        @keyframes st-countBar{ from{width:0%} to{width:100%} }

        /* marquee — two identical rows scrolling opposite */
        @keyframes st-marquee1 { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes st-marquee2 { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .st-marquee1 { animation: st-marquee1 28s linear infinite; display:flex; width:max-content; }
        .st-marquee2 { animation: st-marquee2 32s linear infinite; display:flex; width:max-content; }

        .st-orbit-el  { animation: st-orbit 22s linear infinite; }
        .st-orbit-el2 { animation: st-orbit 32s linear infinite reverse; }
        .st-float-el  { animation: st-float 6s ease-in-out infinite; }
        .st-pulse-el  { animation: st-pulse 3s ease-in-out infinite; }
        .st-logo-glow { animation: st-lPulse 3.2s ease-in-out infinite 1.5s; }
        .st-blink     { animation: st-blink 2s ease-in-out infinite; }

        .st-vis .st-ey   { animation: st-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .st-vis .st-h2   { animation: st-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .st-vis .st-sub  { animation: st-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .st-vis .st-ln   { animation: st-lineW  1.1s cubic-bezier(.22,1,.36,1) 0.10s both; transform-origin:left; }
        .st-vis .st-hero { animation: st-fadeL  0.9s cubic-bezier(.22,1,.36,1) 0.15s both; }
        .st-vis .st-grid { animation: st-fadeR  0.9s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .st-vis .st-mq   { animation: st-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.55s both; }
        .st-vis .st-cta  { animation: st-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.62s both; }

        .st-card    { opacity:0; transform:translateY(32px) scale(0.96); }
        .st-card-in { animation: st-cardIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .st-hero-content { animation: st-heroIn 0.7s cubic-bezier(.22,1,.36,1) both; }
        .st-text-in      { animation: st-textIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .st-dot-btn {
          width:8px; height:8px; border-radius:50%; border:none; cursor:pointer;
          transition: all 0.3s cubic-bezier(.22,1,.36,1);
          padding:0;
        }

        @media (max-width: 1024px) { .st-main-grid { grid-template-columns: 1fr !important; } .st-hero-panel { min-height: 400px !important; } }
        @media (max-width: 720px)  { .st-cards-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px)  { .st-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section
        ref={ref}
        className={vis ? "st-vis" : ""}
        style={{
          background: T.bg,
          padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* ── BG decor ── */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.09) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-140px", left: "-140px", width: "540px", height: "540px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,91,0.08) 0%,transparent 60%)" }} />
          <div className="st-orbit-el"  style={{ position: "absolute", top: "8%", right: "5%", width: "260px", height: "260px", borderRadius: "50%", border: "1px dashed rgba(44,206,209,0.1)" }} />
          <div className="st-orbit-el2" style={{ position: "absolute", bottom: "10%", left: "4%", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(255,138,91,0.1)" }} />
          <div className="st-float-el"  style={{ position: "absolute", top: "30%", left: "7%", width: "7px", height: "7px", borderRadius: "50%", background: T.teal, opacity: 0.22 }} />
          <div className="st-float-el"  style={{ position: "absolute", top: "65%", right: "8%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange, opacity: 0.2, animationDelay: "2.5s" }} />
          <div className="st-pulse-el"  style={{ position: "absolute", top: "22%", right: "22%", width: "4px", height: "4px", borderRadius: "50%", background: T.teal }} />
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.02 }} width="640" height="640">
            {Array.from({ length: 13 }).map((_, r) => Array.from({ length: 13 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="1.8" fill={T.ink} />
            )))}
          </svg>
        </div>

        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ══ HEADER ══ */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="st-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.teal : `${T.teal}40` }} />)}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.teal, fontWeight: 600 }}>SRK Hospital · Jaipur</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="st-h2" style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(2.4rem,5.5vw,4.4rem)",
                fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2px", margin: 0, color: T.dark,
              }}>
                Specialised<br />
                <em style={{ color: T.orange, fontStyle: "italic" }}>Services</em>
              </h2>
              <p className="st-sub" style={{ maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.85, color: T.mid, fontWeight: 300, margin: 0 }}>
                15 urological services delivered with precision — from stone removal to oncology, andrology to minimally invasive surgery.
              </p>
            </div>
            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(0,0,0,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="st-ln" style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B,transparent)", borderRadius: "2px" }} />
            </div>
          </div>

          {/* ══ HERO SPOTLIGHT + SIDE GRID ══ */}
          <div
            className="st-main-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(1.2rem,2.5vw,2rem)", marginBottom: "clamp(2rem,4vw,3rem)", alignItems: "stretch" }}
          >
            {/* ── LEFT: animated hero panel ── */}
            <div className="st-hero" style={{ position: "relative", borderRadius: "24px", overflow: "hidden", minHeight: "520px" }}>
              {/* image layer */}
              <img
                key={hero.id}
                src={hero.img}
                alt={hero.title}
                className="st-hero-content"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55)" }}
              />
              {/* gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(13,30,40,0.3) 0%, rgba(13,30,40,0.88) 70%)` }} />
              {/* accent color overlay */}
              <div style={{ position: "absolute", inset: 0, background: `${hero.accent}18`, transition: "background 0.6s" }} />
              {/* top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />

              {/* content */}
              <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", padding: "clamp(22px,3.5vw,32px)" }}>
                {/* top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* logo mark — same as navbar */}
                  <Link to="/" className="nav-logo" aria-label="SRK Hospital Home">
            <img
              src="/image.png"
              alt="SRK Hospital — Superspeciality Hospital"
              className="nav-logo-img"
            />
          </Link>
                  {/* category tag */}
                  <span
                    key={hero.id + "tag"}
                    className="st-text-in"
                    style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", color: hero.tagColor, border: `1px solid ${hero.tagColor}40` }}>
                    {hero.tag}
                  </span>
                </div>

                {/* spacer */}
                <div style={{ flex: 1 }} />

                {/* bottom content */}
                <div>
                  {/* index + total */}
                  <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>
                    {String(active + 1).padStart(2, "0")} / 06 Featured
                  </p>

                  {/* title */}
                  <h3
                    key={hero.id + "title"}
                    className="st-text-in"
                    style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: T.white, margin: "0 0 10px", lineHeight: 1.05, letterSpacing: "-0.8px" }}>
                    {hero.title}
                  </h3>

                  {/* stat pill */}
                  <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px", background: `${hero.accent}22`, color: hero.accent, border: `1px solid ${hero.accent}35`, display: "inline-block", marginBottom: "12px" }}>
                    {hero.stat}
                  </span>

                  <p
                    key={hero.id + "desc"}
                    className="st-text-in"
                    style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, fontWeight: 300, margin: "0 0 22px", maxWidth: "420px" }}>
                    {hero.desc}
                  </p>

                  {/* progress bar */}
                  <div style={{ height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", marginBottom: "18px", overflow: "hidden" }}>
                    <div
                      key={active}
                      style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)", borderRadius: "1px", width: "100%", transformOrigin: "left", animation: "st-countBar 4s linear" }}
                    />
                  </div>

                  {/* dot nav + CTA row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                      {FEATURED.map((_, i) => (
                        <button
                          key={i}
                          className="st-dot-btn"
                          onClick={() => { setActive(i); if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = setInterval(() => setActive(a => (a + 1) % FEATURED.length), 4000); } }}
                          style={{ background: i === active ? hero.accent : "rgba(255,255,255,0.25)", transform: i === active ? "scale(1.4)" : "scale(1)" }}
                        />
                      ))}
                    </div>
                    <Link to="/medical-services" style={{
                      display: "inline-flex", alignItems: "center", gap: "7px",
                      padding: "10px 20px", borderRadius: "100px",
                      background: "linear-gradient(135deg,#2CCED1,#1ab8bb)",
                      color: T.white, textDecoration: "none",
                      fontFamily: "'DM Sans',system-ui,sans-serif",
                      fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                      boxShadow: "0 4px 16px rgba(44,206,209,0.35)",
                      transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)",
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)"; el.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)"; el.style.transform = "translateY(0)"; }}
                    >
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.7)", animation: "st-blink 2s ease-in-out infinite" }} />
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: 2×3 mini card grid ── */}
            <div
              className="st-grid st-cards-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(10px,1.5vw,14px)" }}
            >
              {FEATURED.map((svc, i) => (
                <BigCard key={svc.id} svc={svc} vis={vis} delay={0.25 + i * 0.07} />
              ))}
            </div>
          </div>

          {/* ══ MARQUEE STRIP — all 15 services ══ */}
          <div
            className="st-mq"
            style={{
              borderRadius: "16px", overflow: "hidden",
              background: T.dark,
              border: "1px solid rgba(44,206,209,0.14)",
              marginBottom: "clamp(1.8rem,3vw,2.8rem)",
              position: "relative",
            }}
          >
            {/* top gradient bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
            {/* fade edges */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right,${T.dark},transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left,${T.dark},transparent)`, zIndex: 2, pointerEvents: "none" }} />

            <div style={{ padding: "14px 0", overflow: "hidden" }}>
              {/* Row 1 — left */}
              <div className="st-marquee1" style={{ marginBottom: "8px" }}>
                {[...ALL_SERVICES, ...ALL_SERVICES].map((s, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", paddingRight: "28px", whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "11.5px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>{s}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: i % 3 === 0 ? T.teal : i % 3 === 1 ? T.orange : "rgba(255,255,255,0.2)", display: "inline-block", flexShrink: 0 }} />
                  </span>
                ))}
              </div>
              {/* Row 2 — right (reverse) */}
              <div className="st-marquee2">
                {[...ALL_SERVICES, ...ALL_SERVICES].reverse().map((s, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", paddingRight: "28px", whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "12px", fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>{s}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: i % 3 === 0 ? T.orange : i % 3 === 1 ? T.teal : "rgba(255,255,255,0.15)", display: "inline-block", flexShrink: 0 }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ══ BOTTOM CTA BAR ══ */}
          <div
            className="st-cta"
            style={{
              borderRadius: "20px", background: T.dark,
              padding: "clamp(20px,3.5vw,28px) clamp(22px,4vw,36px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "20px", flexWrap: "wrap",
              position: "relative", overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200&q=40&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />

            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: T.teal }}>15 Services Available</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.teal }} />
                <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>SRK Hospital</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.2 }}>
                Explore every service in detail
              </p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", margin: "4px 0 0", fontWeight: 300 }}>
                Full treatment info, symptoms, diagnosis &amp; recovery timelines.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexShrink: 0, position: "relative" }}>
              <Link to="/medical-services"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "8px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(44,206,209,0.34)", transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 28px rgba(44,206,209,0.44)"; el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 16px rgba(44,206,209,0.34)"; el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)"; }}
              >
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.75)", animation: "st-blink 2s ease-in-out infinite" }} />
                View All Services
              </Link>
              <a href="tel:+919876543210"
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "11px 20px", borderRadius: "8px", background: "transparent", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.14)", transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.teal; el.style.color = T.teal; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.color = "rgba(255,255,255,0.6)"; }}
              >
                <svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M2 3.5A1.5 1.5 0 013.5 2H5a.8.8 0 01.8.64l.56 2.72a.8.8 0 01-.24.76l-.72.72a8.8 8.8 0 004.4 4.4l.72-.72a.8.8 0 01.76-.24l2.72.56A.8.8 0 0114 11v1.5A1.5 1.5 0 0112.5 14C6.42 14 2 9.58 2 3.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Call Now
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}