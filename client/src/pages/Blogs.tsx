"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../components/BlogsData";

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

const CATS = ["All", "Urology", "Eye Care", "Neurology", "General"];

/* ─── HOOK ───────────────────────────────────────────────────── */
function useReveal(threshold = 0.05) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ─── FEATURED CARD ──────────────────────────────────────────── */
function FeaturedCard({ post, vis }: { post: typeof POSTS[0]; vis: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={vis ? "bl-feat-in" : "bl-feat"}
        style={{
          borderRadius: "24px", overflow: "hidden",
          position: "relative", cursor: "pointer",
          border: `1px solid ${hov ? T.teal + "50" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hov ? `0 28px 72px rgba(44,206,209,0.18)` : "0 8px 40px rgba(0,0,0,0.14)",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.44s cubic-bezier(.22,1,.36,1)",
          minHeight: "480px", display: "flex", flexDirection: "column",
          background: T.dark,
        }}
      >
        {/* Image sits in the top portion, not stretched full card height */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "58%", overflow: "hidden" }}>
          <img src={post.img} alt={post.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center center",
              transform: hov ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
              filter: "brightness(0.6)",
            }}
          />
          {/* Fade bottom of image into dark card body */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(13,30,40,0.1) 0%, rgba(13,30,40,0.55) 70%, rgba(13,30,40,1) 100%)` }} />
        </div>
        {/* Dark body below the image */}
        <div style={{ position: "absolute", top: "58%", left: 0, right: 0, bottom: 0, background: T.dark }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "clamp(24px,3.5vw,36px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "auto" }}>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "100px", background: "rgba(44,206,209,0.15)", backdropFilter: "blur(6px)", color: T.teal, border: "1px solid rgba(44,206,209,0.3)" }}>
              {post.category}
            </span>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "100px", background: "rgba(255,138,91,0.15)", color: T.orange, border: "1px solid rgba(255,138,91,0.25)" }}>
              Featured
            </span>
            <span style={{ marginLeft: "auto", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
              {post.readMin} min read
            </span>
          </div>

          <div style={{ paddingTop: "clamp(80px,12vw,140px)" }}>
            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: "10px" }}>
              {post.date}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 700, color: T.white, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
              {post.title}
            </h2>
            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300, margin: "0 0 24px", maxWidth: "520px" }}>
              {post.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#2CCED1,#FF8A5B)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "0.72rem", fontWeight: 700, color: T.white, flexShrink: 0 }}>RS</div>
                <div>
                  <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.7rem", fontWeight: 600, color: T.white, margin: 0 }}>Dr. Rakesh Sharma</p>
                  <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.38)", margin: 0, fontWeight: 300 }}>Urologist, Jaipur</p>
                </div>
              </div>
              <div style={{
                marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px",
                padding: "9px 20px", borderRadius: "100px",
                background: "linear-gradient(135deg,#2CCED1,#1ab8bb)",
                color: T.white, fontFamily: "'DM Sans',system-ui,sans-serif",
                fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(44,206,209,0.35)",
                transform: hov ? "translateY(-1px)" : "translateY(0)",
                transition: "transform .28s",
              }}>
                Read Article
                <svg viewBox="0 0 10 10" fill="none" width="9" height="9">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── BLOG CARD ──────────────────────────────────────────────── */
function BlogCard({ post, idx, vis }: { post: typeof POSTS[0]; idx: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={vis ? "bl-card-in" : "bl-card"}
        style={{
          animationDelay: `${(idx % 3) * 0.08 + 0.15}s`,
          borderRadius: "20px", overflow: "hidden",
          background: T.white, cursor: "pointer", height: "100%",
          border: `1px solid ${hov ? post.catColor + "45" : T.border}`,
          boxShadow: hov ? `0 20px 56px ${post.catColor}15` : "0 2px 16px rgba(0,0,0,0.05)",
          transform: hov ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
          transition: "all 0.42s cubic-bezier(.22,1,.36,1)",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* ── IMAGE: height increased to honour 3:2 landscape ratio ── */}
        <div style={{ position: "relative", height: "260px", overflow: "hidden", flexShrink: 0 }}>
          <img src={post.img} alt={post.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center top",
              transform: hov ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.65s cubic-bezier(.22,1,.36,1)",
              filter: hov ? "brightness(0.6)" : "brightness(0.78)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: hov ? `linear-gradient(to bottom,${post.catColor}40,rgba(13,30,40,0.65))` : "linear-gradient(to bottom,transparent 25%,rgba(0,0,0,0.48))", transition: "background 0.45s" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
          <span style={{ position: "absolute", top: "12px", right: "12px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "100px", background: "rgba(13,30,40,0.6)", backdropFilter: "blur(6px)", color: post.catColor, border: `1px solid ${post.catColor}40` }}>
            {post.category}
          </span>
          <span style={{ position: "absolute", bottom: "12px", left: "14px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em" }}>{post.date}</span>
          <span style={{ position: "absolute", bottom: "12px", right: "14px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "4px" }}>
            <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5V6l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {post.readMin} min
          </span>
        </div>

        <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.08rem", fontWeight: 700, color: T.ink, margin: "0 0 9px", lineHeight: 1.3, letterSpacing: "-0.2px" }}>
            {post.title}
          </h3>
          <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.79rem", color: T.mid, lineHeight: 1.7, fontWeight: 300, margin: "0 0 16px", flex: 1 }}>
            {post.excerpt}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: `1px solid ${hov ? post.catColor + "20" : T.border}`, transition: "border-color 0.35s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg,#2CCED1,#FF8A5B)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "0.58rem", fontWeight: 700, color: T.white, flexShrink: 0 }}>RS</div>
              <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.68rem", fontWeight: 500, color: T.muted }}>Dr. Rakesh Sharma</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.68rem", fontWeight: 600, color: hov ? post.catColor : T.muted, transition: "color 0.28s" }}>
              Read
              <svg viewBox="0 0 10 10" fill="none" width="8" height="8" style={{ transform: hov ? "translateX(3px)" : "translateX(0)", transition: "transform 0.28s" }}>
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── MINI ROW CARD ──────────────────────────────────────────── */
function MiniRow({ post, delay, vis }: { post: typeof POSTS[0]; delay: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flex: 1 }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={vis ? "bl-card-in" : "bl-card"}
        style={{
          animationDelay: `${delay}s`,
          borderRadius: "16px", overflow: "hidden",
          background: T.white, width: "100%",
          border: `1px solid ${hov ? post.catColor + "40" : T.border}`,
          boxShadow: hov ? `0 12px 36px ${post.catColor}12` : "0 2px 10px rgba(0,0,0,0.04)",
          transform: hov ? "translateX(5px)" : "translateX(0)",
          transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
          display: "flex", cursor: "pointer", flex: 1,
        }}
      >
        <div style={{ width: "3px", flexShrink: 0, background: hov ? `linear-gradient(to bottom,${T.teal},${T.orange})` : `${post.catColor}40`, transition: "background 0.35s" }} />
        {/* Image container: wide enough to show landscape image without height-cropping */}
        <div style={{ width: "320px", flexShrink: 0, overflow: "hidden", position: "relative" }}>
          <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", transform: hov ? "scale(1.06)" : "scale(1)", transition: "transform 0.55s cubic-bezier(.22,1,.36,1)", filter: "brightness(0.75)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${post.catColor}20)` }} />
        </div>
        <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: post.catColor, marginBottom: "5px", display: "block" }}>{post.category}</span>
          <h4 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "0.95rem", fontWeight: 700, color: T.ink, margin: "0 0 4px", lineHeight: 1.25 }}>{post.title}</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", color: T.muted, fontWeight: 300 }}>{post.date}</span>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", color: T.muted, fontWeight: 300 }}>· {post.readMin} min</span>
            <div style={{ marginLeft: "auto", opacity: hov ? 1 : 0.3, transition: "opacity 0.28s, transform 0.28s", transform: hov ? "translateX(3px)" : "translateX(0)" }}>
              <svg viewBox="0 0 10 10" fill="none" width="9" height="9"><path d="M2 5h6M5 2l3 3-3 3" stroke={post.catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function BlogSection() {
  const { ref, vis } = useReveal();
  const [cat, setCat] = useState("All");

  const featured     = POSTS.find(p => p.featured)!;
  const rest         = POSTS.filter(p => !p.featured);
  const filteredRest = cat === "All" ? rest : rest.filter(p => p.category === cat);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes bl-fadeUp  { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bl-lineW   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes bl-featIn  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bl-cardIn  { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bl-orbit   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bl-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
        @keyframes bl-pulse   { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.48;transform:scale(1.7)} }
        @keyframes bl-blink   { 0%,100%{opacity:1} 50%{opacity:.3} }

        .bl-vis .bl-ey   { animation: bl-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .bl-vis .bl-h2   { animation: bl-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .bl-vis .bl-sub  { animation: bl-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .bl-vis .bl-ln   { animation: bl-lineW  1.1s cubic-bezier(.22,1,.36,1) 0.10s both; transform-origin:left; }
        .bl-vis .bl-filt { animation: bl-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.24s both; }
        .bl-vis .bl-cta  { animation: bl-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.60s both; }

        .bl-feat    { opacity:0; transform:translateY(28px) scale(0.97); }
        .bl-feat-in { animation: bl-featIn 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }

        .bl-card    { opacity:0; transform:translateY(32px) scale(0.96); }
        .bl-card-in { animation: bl-cardIn 0.62s cubic-bezier(.22,1,.36,1) both; }

        .bl-orbit-el  { animation: bl-orbit 22s linear infinite; }
        .bl-orbit-el2 { animation: bl-orbit 30s linear infinite reverse; }
        .bl-float-el  { animation: bl-float 6s ease-in-out infinite; }
        .bl-pulse-el  { animation: bl-pulse 3s ease-in-out infinite; }

        .bl-cat-btn {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; border: none; cursor: pointer;
          padding: 8px 18px; border-radius: 100px;
          transition: all 0.28s cubic-bezier(.22,1,.36,1);
          white-space: nowrap;
        }
        .bl-layout {
          display: grid;
          grid-template-columns: 1.1fr 2fr;
          gap: clamp(1.2rem,2.5vw,2rem);
          align-items: stretch;
          margin-bottom: clamp(2rem,4vw,3rem);
        }
        .bl-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 1100px) { .bl-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 960px)  { .bl-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .bl-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <section
        ref={ref}
        className={vis ? "bl-vis" : ""}
        style={{ background: T.bg, padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)", fontFamily: "'DM Sans',system-ui,sans-serif", position: "relative", overflow: "hidden" }}
      >
        {/* BG DECOR */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-190px", right: "-190px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.08) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-130px", left: "-130px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,91,0.07) 0%,transparent 60%)" }} />
          <div className="bl-orbit-el" style={{ position: "absolute", top: "7%", right: "4%", width: "250px", height: "250px", borderRadius: "50%", border: "1px dashed rgba(44,206,209,0.11)" }} />
          <div className="bl-orbit-el2" style={{ position: "absolute", bottom: "9%", left: "3%", width: "175px", height: "175px", borderRadius: "50%", border: "1px solid rgba(255,138,91,0.1)" }} />
          <div className="bl-float-el" style={{ position: "absolute", top: "32%", left: "7%", width: "7px", height: "7px", borderRadius: "50%", background: T.teal, opacity: 0.22 }} />
          <div className="bl-float-el" style={{ position: "absolute", top: "63%", right: "8%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange, opacity: 0.2, animationDelay: "2.5s" }} />
          <div className="bl-pulse-el" style={{ position: "absolute", top: "24%", right: "23%", width: "4px", height: "4px", borderRadius: "50%", background: T.teal }} />
        </div>

        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* HEADER */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="bl-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.teal : `${T.teal}40` }} />)}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.teal, fontWeight: 600 }}>Health Insights · SRK Hospital</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="bl-h2" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.4rem,5.5vw,4.4rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2px", margin: 0, color: T.dark }}>
                Latest<br /><em style={{ color: T.orange, fontStyle: "italic" }}>Articles</em>
              </h2>
              <p className="bl-sub" style={{ maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.85, color: T.mid, fontWeight: 300, margin: 0 }}>
                Expert health insights from Dr. Rakesh Sharma and the SRK team — urology, eye care, and beyond.
              </p>
            </div>
            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(0,0,0,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="bl-ln" style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B,transparent)", borderRadius: "2px" }} />
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="bl-filt" style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            {CATS.map(c => (
              <button key={c} className="bl-cat-btn" onClick={() => setCat(c)} style={{
                background: cat === c ? "linear-gradient(135deg,#2CCED1,#1ab8bb)" : T.white,
                color: cat === c ? T.white : T.mid,
                border: `1px solid ${cat === c ? "transparent" : T.border}`,
                boxShadow: cat === c ? "0 4px 14px rgba(44,206,209,0.32)" : "none",
                transform: cat === c ? "translateY(-1px)" : "translateY(0)",
              }}>
                {c}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.72rem", color: T.muted, alignSelf: "center" }}>
              {cat === "All" ? POSTS.length : POSTS.filter(p => p.category === cat).length} articles
            </span>
          </div>

          {/* FEATURED + MINI ROWS */}
          <div className="bl-layout">
            <FeaturedCard post={featured} vis={vis} />
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.4rem)" }}>
              {/* Stats strip */}
              <div style={{ borderRadius: "18px", background: T.dark, border: "1px solid rgba(44,206,209,0.14)", padding: "20px 24px", display: "flex", gap: "0", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
                {[{ v: String(POSTS.length), l: "Articles" }, { v: "4", l: "Categories" }, { v: "2025", l: "Latest" }].map(({ v, l }, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", padding: "4px 0" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.8rem", fontWeight: 700, color: T.teal, lineHeight: 1, letterSpacing: "-1px" }}>{v}</div>
                    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginTop: "4px" }}>{l}</div>
                  </div>
                ))}
              </div>
              {rest.slice(0, 2).map((post, i) => (
                <MiniRow key={post.id} post={post} delay={0.22 + i * 0.1} vis={vis} />
              ))}
            </div>
          </div>

          {/* CARD GRID */}
          {filteredRest.length > 0 ? (
            <div className="bl-grid">
              {filteredRest.map((post, i) => (
                <BlogCard key={post.id} post={post} idx={i} vis={vis} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "3rem", color: T.muted }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.3rem", fontWeight: 600, color: T.ink }}>No articles in this category yet</p>
            </div>
          )}

          {/* BOTTOM CTA */}
          <div className="bl-cta" style={{ marginTop: "clamp(2.5rem,5vw,4rem)", borderRadius: "20px", background: T.dark, padding: "clamp(22px,4vw,32px) clamp(22px,4vw,36px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.14)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=40&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05 }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.2 }}>Have a health question?</p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", margin: "5px 0 0", fontWeight: 300 }}>Book a consultation — Dr. Sharma will guide you personally.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexShrink: 0, position: "relative" }}>
              <a href="tel:+919773332601" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "8px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(44,206,209,0.34)" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.7)", animation: "bl-blink 2s ease-in-out infinite" }} />
                Book Consultation
              </a>
              <Link to="/our-blogs" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "11px 20px", borderRadius: "8px", background: "transparent", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.14)" }}>
                All Articles →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}