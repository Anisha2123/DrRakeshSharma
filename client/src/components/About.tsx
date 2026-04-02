"use client";

import { useEffect, useRef, useState } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const T = {
  orange:  "#FF8A5B",
  teal:    "#2CCED1",
  dark:    "#0F0F0F",
  ink:     "#1C1C1C",
  mid:     "#5A5A5A",
  muted:   "#999999",
  bg:      "#F5F3EF",
  white:   "#FFFFFF",
  card:    "#FAFAF8",
  border:  "rgba(0,0,0,0.07)",
};

/* ─── COUNT-UP HOOK ─────────────────────────────────────────── */
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
  { n: 25,   suffix: "+", label: "Years of\nExperience",    color: T.orange },
  { n: 9000, suffix: "+", label: "Happy\nPatients",         color: T.teal   },
  { n: 689,  suffix: "+", label: "Advanced\nProcedures",    color: T.orange },
  { n: 470,  suffix: "+", label: "Compact\nSurgeries",      color: T.teal   },
];

const EXPERTISE = [
  { label: "Urological Care",                   icon: "◎" },
  { label: "Prostate Disorder",                 icon: "◉" },
  { label: "Andrology & Male Infertility",       icon: "◈" },
  { label: "Kidney Stone Management",            icon: "◇" },
  { label: "Minimally Invasive & Laser",         icon: "◆" },
  { label: "Kidney Transplantation",             icon: "◐" },
];

/* ─── STAT BLOCK ─────────────────────────────────────────────── */
function StatBlock({ n, suffix, label, color, trigger, delay }: {
  n: number; suffix: string; label: string; color: string; trigger: boolean; delay: number;
}) {
  const count = useCountUp(n, 2400, trigger);
  const [hov, setHov] = useState(false);
  const lines = label.split("\n");
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "24px 20px 20px",
        background: hov ? color : T.white,
        border: `1px solid ${hov ? color : T.border}`,
        borderRadius: "18px",
        cursor: "default",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? `0 20px 50px ${color}28` : "0 2px 12px rgba(0,0,0,0.04)",
        animationDelay: `${delay}s`,
      }}
      className="drs-stat"
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "clamp(2rem,4vw,3rem)",
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-2px",
        color: hov ? T.white : color,
        transition: "color 0.38s",
      }}>
        {trigger ? count.toLocaleString() : "0"}{suffix}
      </div>
      <div style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "0.68rem",
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        lineHeight: 1.4,
        color: hov ? "rgba(255,255,255,0.75)" : T.muted,
        marginTop: "16px",
        transition: "color 0.38s",
      }}>
        {lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
      </div>
    </div>
  );
}

/* ─── EXPERTISE PILL ──────────────────────────────────────────── */
function ExpertisePill({ label, icon, idx, vis }: {
  label: string; icon: string; idx: number; vis: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={vis ? "drs-pill-in" : "drs-pill"}
      style={{
        animationDelay: `${0.5 + idx * 0.07}s`,
        display: "flex", alignItems: "center", gap: "10px",
        padding: "11px 16px",
        borderRadius: "100px",
        background: hov ? T.orange : T.white,
        border: `1px solid ${hov ? T.orange : T.border}`,
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        transform: hov ? "scale(1.03)" : "scale(1)",
        cursor: "default",
        boxShadow: hov ? `0 8px 28px ${T.orange}28` : "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      <span style={{ fontSize: "0.72rem", color: hov ? "rgba(255,255,255,0.8)" : T.teal, transition: "color 0.3s", lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: "0.8rem", fontWeight: 500,
        color: hov ? T.white : T.ink,
        transition: "color 0.3s", whiteSpace: "nowrap",
      }}>{label}</span>
    </div>
  );
}

/* ─── MAIN COMPONENT ──────────────────────────────────────────── */
export default function DrRakeshSharmaProfile() {
  const [vis,     setVis]     = useState(false);
  const [trigger, setTrigger] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); setTimeout(() => setTrigger(true), 400); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Scoped keyframes — NO global side-effects ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes drs-fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drs-fadeLeft { from{opacity:0;transform:translateX(36px)} to{opacity:1;transform:translateX(0)} }
        @keyframes drs-fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes drs-lineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes drs-pill     { from{opacity:0;transform:translateY(12px) scale(0.92)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes drs-orbitRing{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes drs-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes drs-glow     { 0%,100%{box-shadow:0 0 0 0 rgba(255,138,91,0.35)} 50%{box-shadow:0 0 0 14px rgba(255,138,91,0)} }
        @keyframes drs-barSlide { from{width:0} to{width:var(--bar-w,100%)} }
        @keyframes drs-statIn   { from{opacity:0;transform:translateY(28px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }

        .drs-orbit  { animation: drs-orbitRing 18s linear infinite; }
        .drs-float  { animation: drs-float 5s ease-in-out infinite; }
        .drs-glow   { animation: drs-glow  2.8s ease-in-out infinite; }

        .drs-vis .drs-ey   { animation: drs-fadeUp   0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .drs-vis .drs-h1   { animation: drs-fadeUp   0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .drs-vis .drs-bio  { animation: drs-fadeUp   0.8s cubic-bezier(.22,1,.36,1) 0.22s both; }
        .drs-vis .drs-ln   { animation: drs-lineGrow 1.1s cubic-bezier(.22,1,.36,1) 0.12s both; transform-origin:left; }
        .drs-vis .drs-rhs  { animation: drs-fadeLeft 0.9s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .drs-vis .drs-av   { animation: drs-fadeIn   0.9s cubic-bezier(.22,1,.36,1) 0.05s both; }

        .drs-pill    { opacity:0; }
        .drs-pill-in { animation: drs-pill 0.55s cubic-bezier(.22,1,.36,1) both; }

        .drs-stat    { opacity:0; transform:translateY(28px) scale(0.95); }
        .drs-vis .drs-stat { animation: drs-statIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .drs-cta-btn {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.05em; cursor: pointer;
          border: none; border-radius: 100px;
          padding: 13px 28px;
          transition: all 0.32s cubic-bezier(.22,1,.36,1);
        }
        .drs-cta-btn:hover { transform: translateY(-3px); }

        @media (max-width: 900px) {
          .drs-main-grid { grid-template-columns: 1fr !important; }
          .drs-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .drs-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .drs-pills-wrap { flex-direction: column !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={vis ? "drs-vis" : ""}
        style={{
          background: T.bg,
          padding: "clamp(3.5rem,8vw,7rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background texture ── */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* large warm blob top-right */}
          <div style={{ position: "absolute", top: "-180px", right: "-160px", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${T.orange}12 0%, transparent 65%)` }} />
          {/* teal blob bottom-left */}
          <div style={{ position: "absolute", bottom: "-120px", left: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${T.teal}0E 0%, transparent 65%)` }} />
          {/* rotating ring */}
          <div className="drs-orbit" style={{ position: "absolute", top: "5%", right: "6%", width: "220px", height: "220px", borderRadius: "50%", border: `1px dashed ${T.orange}22` }} />
          <div className="drs-orbit" style={{ position: "absolute", bottom: "8%", left: "4%", width: "160px", height: "160px", borderRadius: "50%", border: `1px solid ${T.teal}18`, animationDirection: "reverse", animationDuration: "24s" }} />
          {/* floating dots */}
          <div className="drs-float" style={{ position: "absolute", top: "28%", left: "8%", width: "8px", height: "8px", borderRadius: "50%", background: T.orange, opacity: 0.35 }} />
          <div className="drs-float" style={{ position: "absolute", top: "62%", right: "10%", width: "6px", height: "6px", borderRadius: "50%", background: T.teal, opacity: 0.3, animationDelay: "2s" }} />
          {/* cross marks */}
          <svg aria-hidden style={{ position: "absolute", top: "18%", left: "45%", opacity: 0.06 }} width="32" height="32" viewBox="0 0 32 32">
            <line x1="16" y1="0" x2="16" y2="32" stroke={T.orange} strokeWidth="1.5" />
            <line x1="0" y1="16" x2="32" y2="16" stroke={T.orange} strokeWidth="1.5" />
          </svg>
          <svg aria-hidden style={{ position: "absolute", bottom: "22%", right: "18%", opacity: 0.07 }} width="24" height="24" viewBox="0 0 24 24">
            <line x1="12" y1="0" x2="12" y2="24" stroke={T.teal} strokeWidth="1.2" />
            <line x1="0" y1="12" x2="24" y2="12" stroke={T.teal} strokeWidth="1.2" />
          </svg>
        </div>

        {/* ── Content wrapper ── */}
        <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ══ TOP EYEBROW ROW ══ */}
          <div className="drs-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            <span style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.orange : `${T.orange}40` }} />
              ))}
            </span>
            <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.orange, fontWeight: 600 }}>
              Specialist Urologist · Jaipur, Rajasthan
            </span>
          </div>

          {/* ══ MAIN GRID ══ */}
          <div
            className="drs-main-grid"
            style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(2.5rem,5vw,6rem)", alignItems: "start" }}
          >
            {/* ════ LEFT ════ */}
            <div>

              {/* — Avatar + Name hero — */}
              <div style={{ marginBottom: "2.5rem" }}>
                {/* Avatar row */}
                <div className="drs-av" style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                  {/* Avatar circle */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div className="drs-glow" style={{
                      width: "clamp(70px,9vw,90px)", height: "clamp(70px,9vw,90px)",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${T.orange} 0%, #D84F1A 100%)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(1.3rem,2.8vw,1.8rem)", fontWeight: 700,
                      color: T.white, userSelect: "none",
                    }}>RS</div>
                    {/* teal ring */}
                    <div style={{ position: "absolute", inset: "-6px", borderRadius: "50%", border: `2px solid ${T.teal}50`, pointerEvents: "none" }} />
                    {/* gold dot */}
                    <div style={{ position: "absolute", bottom: "2px", right: "2px", width: "14px", height: "14px", borderRadius: "50%", background: "#f6d365", border: `2px solid ${T.bg}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px" }}>★</div>
                  </div>
                  {/* pills */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: T.teal, background: `${T.teal}12`, border: `1px solid ${T.teal}28`, padding: "3px 11px", borderRadius: "100px", width: "fit-content" }}>Senior Urologist</span>
                    <span style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: T.orange, background: `${T.orange}0E`, border: `1px solid ${T.orange}25`, padding: "3px 11px", borderRadius: "100px", width: "fit-content" }}>25+ Years Experience</span>
                  </div>
                </div>

                {/* Name */}
                <h1 className="drs-h1" style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2.6rem,6vw,5rem)",
                  fontWeight: 700, lineHeight: 0.95,
                  letterSpacing: "-2px", margin: 0,
                  color: T.dark,
                }}>
                  Dr. Rakesh<br />
                  <span style={{ color: T.orange, fontStyle: "italic" }}>Sharma</span>
                  {/* <span style={{ color: T.teal, fontSize: "0.55em", verticalAlign: "super", fontStyle: "normal", letterSpacing: "-1px", marginLeft: "4px" }}>M.Ch.</span> */}
                </h1>
              </div>

              {/* — Animated rule — */}
              <div style={{ height: "1.5px", background: "rgba(0,0,0,0.07)", marginBottom: "1.75rem", overflow: "hidden", borderRadius: "2px" }}>
                <div className="drs-ln" style={{ height: "100%", background: `linear-gradient(90deg,${T.orange},${T.teal})`, borderRadius: "2px" }} />
              </div>

              {/* — Bio — */}
              <p className="drs-bio" style={{
                fontSize: "clamp(0.92rem,1.6vw,1.02rem)", lineHeight: 1.88,
                color: T.mid, fontWeight: 300, margin: "0 0 2.5rem",
                maxWidth: "520px",
              }}>
                With more than{" "}
                <strong style={{ color: T.ink, fontWeight: 600 }}>25 years of clinical excellence</strong>,
                Dr. Rakesh Sharma is a distinguished urologist in Jaipur renowned for surgical{" "}
                <strong style={{ color: T.orange, fontWeight: 600 }}>precision</strong> and genuine patient care.
                He combines cutting-edge technology with compassionate medicine to deliver outcomes that transform lives.
              </p>

              {/* — Expertise pills — */}
              <div>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.28em", color: T.muted, fontWeight: 600, marginBottom: "14px" }}>Areas of Expertise</p>
                <div
                  className="drs-pills-wrap"
                  style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                >
                  {EXPERTISE.map((e, i) => (
                    <ExpertisePill key={i} label={e.label} icon={e.icon} idx={i} vis={vis} />
                  ))}
                </div>
              </div>
            </div>

            {/* ════ RIGHT ════ */}
            <div className="drs-rhs" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* — Stats 2×2 — */}
              <div>
                <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.28em", color: T.muted, fontWeight: 600, marginBottom: "12px" }}>Professional Highlights</p>
                <div
                  className="drs-stats-grid"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
                >
                  {STATS.map((s, i) => (
                    <StatBlock key={i} {...s} trigger={trigger} delay={0.28 + i * 0.09} />
                  ))}
                </div>
              </div>

              {/* — Recognition card — */}
              <div style={{
                borderRadius: "22px", overflow: "hidden", position: "relative",
                background: T.dark,
                padding: "26px 24px",
                boxShadow: `0 24px 64px rgba(0,0,0,0.18)`,
              }}>
                {/* decorative rings inside dark card */}
                <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", border: `1px solid rgba(255,138,91,0.14)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "260px", height: "260px", borderRadius: "50%", border: `1px solid rgba(255,138,91,0.07)`, pointerEvents: "none" }} />
                {/* orange accent top-left line */}
                <div style={{ position: "absolute", top: 0, left: "24px", width: "40px", height: "3px", background: T.orange, borderRadius: "0 0 3px 3px" }} />

                <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", position: "relative" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "rgba(255,138,91,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>🏆</div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: T.white, fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 }}>
                      Top Urologist in Jaipur
                    </h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                      Recognized for exceptional outcomes and cutting-edge minimally invasive procedures across Rajasthan.
                    </p>
                  </div>
                </div>

                {/* micro stats strip */}
                <div style={{ marginTop: "20px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {[["5.0", "★ Rating"], ["100%", "Commitment"]].map(([v, l]) => (
                    <div key={l}>
                      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.35rem", fontWeight: 700, color: T.orange, lineHeight: 1 }}>{v}</div>
                      <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>{l}</div>
                    </div>
                  ))}
                  {/* avatar stack */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "auto" }}>
                    <div style={{ display: "flex" }}>
                      {["#FF8A5B", "#2CCED1", "#f6d365", "#a78bfa"].map((c, i) => (
                        <div key={i} style={{ width: "22px", height: "22px", borderRadius: "50%", background: c, border: `2px solid ${T.dark}`, marginLeft: i > 0 ? "-7px" : 0 }} />
                      ))}
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>9000+ patients</span>
                  </div>
                </div>
              </div>

              {/* — CTA row — */}
              <div style={{ display: "flex", gap: "10px" }}>
                 <a href="tel:+919887711224"
                  className="drs-cta-btn"
                  style={{ flex: 1, background: T.orange, color: T.white, boxShadow: `0 8px 32px ${T.orange}40` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#e8703e"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = T.orange; }}
                >
                  Book Appointment
                </a>
                {/* <button
                  className="drs-cta-btn"
                  style={{ padding: "13px 22px", background: T.white, color: T.ink, border: `1px solid ${T.border}` }}
                  onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = T.orange; b.style.color = T.orange; }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = T.border; b.style.color = T.ink; }}
                >
                  Learn More
                </button> */}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}