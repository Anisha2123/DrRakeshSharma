"use client";

import { useEffect, useRef, useState } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  orange: "#FF8A5B",
  teal:   "#2CCED1",
  dark:   "#0F0F0F",
  ink:    "#1C1C1C",
  mid:    "#5A5A5A",
  muted:  "#999999",
  bg:     "#F5F3EF",
  white:  "#FFFFFF",
  border: "rgba(0,0,0,0.07)",
};

/* ─── COUNT-UP ───────────────────────────────────────────────── */
function useCountUp(target: number, duration = 2400, trigger = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, trigger]);
  return n;
}

/* ─── DATA ───────────────────────────────────────────────────── */
const STATS = [
  { n: 25,   suffix: "+", label: "Years of\nExperience",      color: T.orange },
  { n: 470,  suffix: "+", label: "Compact\nSurgeries",        color: T.teal   },
  { n: 689,  suffix: "+", label: "Advanced\nProcedures",      color: T.orange },
  { n: 9000, suffix: "+", label: "Happy\nPatients",           color: T.teal   },
];

const REASONS = [
  {
    title:    "Personalised Treatment",
    body:     "Every patient receives a care plan crafted specifically around their condition, history, and goals — never a generic protocol.",
    color:    T.orange,
    img:      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title:    "Holistic Patient Care",
    body:     "Dr. Sharma focuses beyond the disease — addressing well-being, quality of life, and long-term health alongside clinical recovery.",
    color:    T.teal,
    img:      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M12 21C12 21 4 15 4 9a8 8 0 0116 0c0 6-8 12-8 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    title:    "Trusted & Kind Approach",
    body:     "Compassionate by nature, Dr. Sharma builds lasting trust with patients and families — guiding them through every step with patience.",
    color:    T.orange,
    img:      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title:    "Long-Term Continuity",
    body:     "From first consultation through recovery and beyond — Dr. Sharma remains a consistent, caring presence for every patient over time.",
    color:    T.teal,
    img:      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=80&auto=format&fit=crop",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ─── STAT COUNTER CELL ──────────────────────────────────────── */
function StatCell({ n, suffix, label, color, trigger, delay }: {
  n: number; suffix: string; label: string; color: string; trigger: boolean; delay: number;
}) {
  const count = useCountUp(n, 2400, trigger);
  const [hov, setHov] = useState(false);
  const lines = label.split("\n");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="wc-stat"
      style={{
        animationDelay: `${delay}s`,
        flex: "1 1 0",
        padding: "clamp(20px,3vw,30px) clamp(16px,2.5vw,24px)",
        borderRight: `1px solid rgba(255,255,255,0.08)`,
        cursor: "default",
        transition: "background 0.35s",
        background: hov ? "rgba(255,255,255,0.05)" : "transparent",
        textAlign: "center",
      }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(2.2rem,4vw,3.2rem)",
        fontWeight: 700, lineHeight: 1, letterSpacing: "-2px",
        color: hov ? color : T.white,
        transition: "color 0.35s",
      }}>
        {trigger ? count.toLocaleString() : "0"}{suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em",
        textTransform: "uppercase", lineHeight: 1.5,
        color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
        marginTop: "8px", transition: "color 0.35s",
      }}>
        {lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
      </div>
      {/* accent dot */}
      <div style={{ width: "20px", height: "2px", borderRadius: "1px", background: color, margin: "10px auto 0", opacity: hov ? 1 : 0.4, transition: "opacity 0.35s" }} />
    </div>
  );
}

/* ─── REASON CARD ────────────────────────────────────────────── */
function ReasonCard({ title, body, color, img, icon, idx, vis }: {
  title: string; body: string; color: string; img: string;
  icon: React.ReactNode; idx: number; vis: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={vis ? "wc-card-in" : "wc-card"}
      style={{
        animationDelay: `${0.25 + idx * 0.1}s`,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "default",
        border: `1px solid ${hov ? color + "60" : T.border}`,
        boxShadow: hov ? `0 24px 60px ${color}20` : "0 2px 16px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "all 0.42s cubic-bezier(.22,1,.36,1)",
        background: T.white,
      }}
    >
      {/* image strip */}
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src={img}
          alt={title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hov ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
            filter: hov ? "brightness(0.65)" : "brightness(0.72)",
          }}
        />
        {/* gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `linear-gradient(to bottom, ${color}55 0%, rgba(0,0,0,0.55) 100%)`
            : `linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.5) 100%)`,
          transition: "background 0.45s",
        }} />
        {/* icon badge */}
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          width: "36px", height: "36px", borderRadius: "10px",
          background: hov ? color : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hov ? T.white : color,
          border: hov ? "none" : `1px solid ${color}30`,
          transition: "all 0.38s",
          transform: hov ? "rotate(-8deg) scale(1.08)" : "rotate(0) scale(1)",
        }}>
          {icon}
        </div>
        {/* index */}
        <span style={{
          position: "absolute", top: "14px", right: "14px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "0.78rem", fontStyle: "italic",
          color: "rgba(255,255,255,0.6)",
        }}>
          0{idx + 1}
        </span>
        {/* title on image */}
        <h3 style={{
          position: "absolute", bottom: "14px", left: "16px", right: "16px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.12rem", fontWeight: 700, color: T.white,
          margin: 0, lineHeight: 1.2, letterSpacing: "-0.2px",
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {title}
        </h3>
      </div>

      {/* body text */}
      <div style={{ padding: "16px 18px 20px" }}>
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: "0.82rem", lineHeight: 1.75,
          color: hov ? T.mid : "#666",
          margin: 0, fontWeight: 300,
          transition: "color 0.35s",
        }}>
          {body}
        </p>
        {/* colored accent line */}
        <div style={{
          marginTop: "14px", height: "2px", borderRadius: "1px",
          background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
          transform: hov ? "scaleX(1)" : "scaleX(0.35)",
          transformOrigin: "left",
          transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
        }} />
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function WhyChooseDrSharma() {
  const [vis,     setVis]     = useState(false);
  const [trigger, setTrigger] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVis(true);
        setTimeout(() => setTrigger(true), 300);
      }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes wc-fadeUp   { from{opacity:0;transform:translateY(38px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wc-fadeLeft { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes wc-lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes wc-cardIn   { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes wc-statIn   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wc-imgIn    { from{opacity:0;transform:scale(1.06)} to{opacity:1;transform:scale(1)} }
        @keyframes wc-orbit    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes wc-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes wc-pulse    { 0%,100%{opacity:.28;transform:scale(1)} 50%{opacity:.65;transform:scale(1.5)} }
        @keyframes wc-shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .wc-orbit-el { animation: wc-orbit 20s linear infinite; }
        .wc-float-el { animation: wc-float 6s ease-in-out infinite; }
        .wc-pulse-el { animation: wc-pulse 2.6s ease-in-out infinite; }

        .wc-vis .wc-ey   { animation: wc-fadeUp  0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .wc-vis .wc-h2   { animation: wc-fadeUp  0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .wc-vis .wc-sub  { animation: wc-fadeUp  0.8s cubic-bezier(.22,1,.36,1) 0.20s both; }
        .wc-vis .wc-ln   { animation: wc-lineGrow 1.1s cubic-bezier(.22,1,.36,1) 0.12s both; transform-origin:left; }
        .wc-vis .wc-img  { animation: wc-imgIn   1.1s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .wc-vis .wc-stat { animation: wc-statIn  0.6s cubic-bezier(.22,1,.36,1) both; }

        .wc-card    { opacity:0; transform:translateY(32px) scale(0.96); }
        .wc-card-in { animation: wc-cardIn 0.65s cubic-bezier(.22,1,.36,1) both; }

        .wc-gold-text {
          background: linear-gradient(90deg, #c8820a, #f6d365, #fda085, #f6d365, #c8820a);
          background-size: 280% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: wc-shimmer 3.5s linear infinite;
        }

        @media (max-width: 960px) {
          .wc-hero-grid { grid-template-columns: 1fr !important; }
          .wc-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .wc-stats-strip { flex-wrap: wrap !important; }
          .wc-stats-strip > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
        }
        @media (max-width: 580px) {
          .wc-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={vis ? "wc-vis" : ""}
        style={{
          background: T.bg,
          padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* ── BG decor ── */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-180px", right: "-180px", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,${T.teal}0C 0%,transparent 65%)` }} />
          <div style={{ position: "absolute", bottom: "-120px", left: "-120px", width: "520px", height: "520px", borderRadius: "50%", background: `radial-gradient(circle,${T.orange}0D 0%,transparent 65%)` }} />
          <div className="wc-orbit-el" style={{ position: "absolute", top: "8%", right: "4%", width: "220px", height: "220px", borderRadius: "50%", border: `1px dashed ${T.teal}1E` }} />
          <div className="wc-orbit-el" style={{ position: "absolute", bottom: "10%", left: "3%", width: "160px", height: "160px", borderRadius: "50%", border: `1px solid ${T.orange}18`, animationDirection: "reverse", animationDuration: "28s" }} />
          <div className="wc-float-el" style={{ position: "absolute", top: "30%", left: "7%", width: "8px", height: "8px", borderRadius: "50%", background: T.orange, opacity: 0.28 }} />
          <div className="wc-float-el" style={{ position: "absolute", top: "63%", right: "8%", width: "6px", height: "6px", borderRadius: "50%", background: T.teal, opacity: 0.25, animationDelay: "2.5s" }} />
          <div className="wc-pulse-el" style={{ position: "absolute", top: "22%", right: "22%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange }} />
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.022 }} width="600" height="600">
            {Array.from({ length: 12 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="2" fill={T.ink} />
            )))}
          </svg>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ══ HEADER ══ */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4.5rem)" }}>
            <div className="wc-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.teal : `${T.teal}40` }} />
                ))}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.teal, fontWeight: 600 }}>
                Professional Highlights & Philosophy
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="wc-h2" style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.4rem,5.5vw,4.4rem)",
                fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2px", margin: 0, color: T.dark,
              }}>
                Why Choose<br />
                <em style={{ color: T.orange, fontStyle: "italic" }}>Dr. Sharma?</em>
              </h2>
              <p className="wc-sub" style={{
                maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.85,
                color: T.mid, fontWeight: 300, margin: 0,
              }}>
                A surgeon who treats the person, not just the condition — combining clinical mastery with genuine compassion for life-changing outcomes.
              </p>
            </div>

            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(0,0,0,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="wc-ln" style={{ height: "100%", background: `linear-gradient(90deg,${T.teal},${T.orange},transparent)`, borderRadius: "2px" }} />
            </div>
          </div>

          {/* ══ HERO IMAGE + STATS STRIP ══ */}
          <div
            className="wc-hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "clamp(1.5rem,3vw,2.5rem)", marginBottom: "clamp(2rem,4vw,3.5rem)", alignItems: "stretch" }}
          >
            {/* Left — big doctor image card */}
            <div
              className="wc-img"
              style={{
                borderRadius: "24px", overflow: "hidden",
                position: "relative", minHeight: "420px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1000&q=85&auto=format&fit=crop"
                alt="Dr. Rakesh Sharma"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75)" }}
              />
              {/* layered gradients */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${T.orange}22 0%, transparent 60%)` }} />

              {/* orange top accent */}
              <div style={{ position: "absolute", top: 0, left: "28px", width: "48px", height: "3px", background: T.orange, borderRadius: "0 0 3px 3px" }} />

              {/* floating badge top-right */}
              <div style={{
                position: "absolute", top: "20px", right: "20px",
                background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "14px", padding: "10px 16px",
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 700, color: T.white, lineHeight: 1 }}>25+</div>
                <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.58rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", marginTop: "3px" }}>Years</div>
              </div>

              {/* bottom text overlay */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 28px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: T.orange }} />
                  <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(255,255,255,0.6)" }}>Senior Urologist · Jaipur</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.1, letterSpacing: "-0.5px" }}>
                  Dr. Rakesh <span style={{ color: T.orange, fontStyle: "italic" }}>Sharma</span><br />
                  <span style={{ fontSize: "0.6em", color: "rgba(255,255,255,0.5)", fontStyle: "normal", letterSpacing: "0.05em" }}>M.Ch. (Urology) · Gold Medallist</span>
                </h3>
              </div>
            </div>

            {/* Right — stats strip (dark) + quote */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.5rem)" }}>
              {/* stats dark block */}
              <div style={{
                borderRadius: "20px", overflow: "hidden",
                background: T.dark, flex: 1,
                position: "relative",
              }}>
                {/* subtle texture lines */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 80px)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, left: "24px", width: "36px", height: "2px", background: T.teal, borderRadius: "0 0 2px 2px" }} />

                <p style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.6rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.26em",
                  color: "rgba(255,255,255,0.3)", padding: "20px 22px 0", margin: 0,
                }}>
                  Professional Highlights
                </p>

                <div className="wc-stats-strip" style={{ display: "flex", padding: "4px 0 8px" }}>
                  {STATS.map((s, i) => (
                    <StatCell key={i} {...s} trigger={trigger} delay={0.2 + i * 0.09} />
                  ))}
                </div>
              </div>

              {/* quote card */}
              <div style={{
                borderRadius: "20px",
                background: T.white,
                border: `1px solid ${T.border}`,
                padding: "24px 24px 22px",
                position: "relative", overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}>
                <div style={{ position: "absolute", top: 0, right: "24px", width: "32px", height: "2px", background: T.orange, borderRadius: "0 0 2px 2px" }} />
                {/* big quote mark */}
                <div style={{
                  position: "absolute", top: "12px", left: "18px",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "5rem", lineHeight: 1, color: `${T.orange}14`,
                  fontWeight: 700, userSelect: "none",
                }}>
                  "
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1rem,1.8vw,1.18rem)", fontWeight: 600, lineHeight: 1.55,
                  color: T.ink, margin: "0 0 14px", position: "relative",
                }}>
                  "Excellence in urology is not just surgical skill — it is understanding each patient's life."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `linear-gradient(135deg,${T.orange},#D84F1A)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.7rem", fontWeight: 700, color: T.white, flexShrink: 0 }}>RS</div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, color: T.ink, margin: 0 }}>Dr. Rakesh Sharma</p>
                    <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.62rem", color: T.muted, margin: "1px 0 0", fontWeight: 300 }}>Senior Urologist, Jaipur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══ REASON CARDS 2×2 ══ */}
          <div style={{ marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
            <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.28em", color: T.muted, fontWeight: 600, margin: "0 0 16px" }}>
              Why Choose Dr. Sharma
            </p>
            <div
              className="wc-cards-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" }}
            >
              {REASONS.map((r, i) => (
                <ReasonCard key={i} {...r} idx={i} vis={vis} />
              ))}
            </div>
          </div>

          {/* ══ CTA STRIP ══ */}
          <div style={{
            borderRadius: "20px",
            background: T.dark,
            padding: "clamp(20px,3vw,28px) clamp(20px,3.5vw,32px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "20px", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
          }}>
            {/* background image tint */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&q=60&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${T.dark} 40%, rgba(15,15,15,0.9) 100%)` }} />
            {/* orange top accent */}
            <div style={{ position: "absolute", top: 0, left: "32px", width: "48px", height: "2px", background: T.orange, borderRadius: "0 0 2px 2px" }} />

            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.2rem,2.5vw,1.6rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.2 }}>
                Ready to take the next step?
              </p>
              <a href="tel:+919887711224" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", margin: "5px 0 0", fontWeight: 300 }}>
                Book a consultation with Dr. Sharma today.
              </a>
            </div>

            <div style={{ display: "flex", gap: "10px", position: "relative", flexShrink: 0 }}>
              <button
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em",
                  padding: "12px 26px", borderRadius: "100px", border: "none",
                  background: T.orange, color: T.white, cursor: "pointer",
                  boxShadow: `0 6px 24px ${T.orange}40`,
                  transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-2px)"; b.style.boxShadow = `0 12px 36px ${T.orange}55`; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(0)"; b.style.boxShadow = `0 6px 24px ${T.orange}40`; }}
              >
                Book Appointment →
              </button>
              {/* <button
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.84rem", fontWeight: 600, letterSpacing: "0.05em",
                  padding: "12px 22px", borderRadius: "100px",
                  background: "transparent", color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.18)", cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = T.teal; b.style.color = T.teal; }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = "rgba(255,255,255,0.18)"; b.style.color = "rgba(255,255,255,0.7)"; }}
              >
                Learn More
              </button> */}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}