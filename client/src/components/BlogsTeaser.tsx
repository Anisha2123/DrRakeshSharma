"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

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

/* ─── TEASER POSTS ───────────────────────────────────────────── */
interface TeaserPost {
  id:       number;
  slug:     string;
  date:     string;
  title:    string;
  excerpt:  string;
  category: string;
  catColor: string;
  img:      string;
  readMin:  number;
}

const TEASERS: TeaserPost[] = [
  {
    id: 1,
    slug: "world-class-eye-care-jaipur",
    date: "Apr 15, 2025",
    title: "Your Vision, Our Priority — World-Class Eye Care in Jaipur",
    excerpt: "From routine eye checkups to advanced surgical procedures, having access to expert ophthalmic care is vital. Discover why SRK Hospital sets new standards in vision care.",
    category: "Eye Care",
    catColor: "#6B7FD4",
    img: "/Blogs' image/1stblog.png",
    readMin: 6,
  },
  {
    id: 2,
    slug: "advanced-eye-care-srk-jaipur",
    date: "Apr 12, 2025",
    title: "Advanced Eye Care at SRK Hospital in Jaipur",
    excerpt: "Cataract, glaucoma, LASIK, retinal disorders — a comprehensive look at the full spectrum of ophthalmic services available at SRK Superspeciality Hospital.",
    category: "Eye Care",
    catColor: "#6B7FD4",
    img: "/Blogs' image/2nd blog.png",
    readMin: 5,
  },
  {
    id: 3,
    slug: "restoring-vision-srk-jaipur",
    date: "Apr 11, 2025",
    title: "Restoring Vision with Excellence — Why SRK is Jaipur's Preferred Choice",
    excerpt: "What makes a hospital truly stand out in eye care? Clinical precision, compassionate staff, transparent pricing, and cutting-edge technology — all under one roof.",
    category: "Eye Care",
    catColor: "#6B7FD4",
    img: "/Blogs' image/3rdimage.png",
    readMin: 5,
  },
  {
    id: 4,
    slug: "best-urology-hospital-jaipur",
    date: "Apr 7, 2025",
    title: "Choosing the Best Urology Hospital in Jaipur for Advanced Kidney and Urinary Care",
    excerpt: "Urological issues often go untreated too long. Here's what to look for in a urology hospital — and why timely, expert intervention makes all the difference.",
    category: "Urology",
    catColor: T.teal,
    img: "/Blogs' image/4thblog.png",
    readMin: 7,
  },
  {
    id: 5,
    slug: "brain-hemorrhage-treatment-jaipur",
    date: "Mar 29, 2025",
    title: "Expert Brain Hemorrhage Treatment in Jaipur",
    excerpt: "A brain hemorrhage demands immediate, expert neurosurgical care. Learn about emergency interventions — craniotomy, endovascular coiling — and what to do if symptoms arise.",
    category: "Neurology",
    catColor: "#E05A5A",
    img: "/Blogs' image/5thblog.png",
    readMin: 5,
  },
];

/* ─── MARQUEE TAG ITEMS ──────────────────────────────────────── */
const TAGS = [
  "Kidney Stone",  "Urology Care",  "Eye Surgery",   "LASIK",
  "Prostate BPH",  "Glaucoma",      "Male Infertility", "Endo-Urology",
  "Retinal Care",  "Brain Hemorrhage", "UTI Treatment", "Cataract Surgery",
  "Robotic Surgery", "Laser Therapy", "Andrology",
];

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

/* ─── STACK CARD ─────────────────────────────────────────────── */
function StackCard({ vis }: { vis: boolean }) {
  const [active, setActive] = useState(0);
  const [prev,   setPrev]   = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback((next: number) => {
    if (transitioning) return;
    setPrev(active);
    setTransitioning(true);
    setTimeout(() => { setActive(next); setTransitioning(false); setPrev(null); }, 480);
  }, [active, transitioning]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % TEASERS.length;
        setPrev(a);
        setTransitioning(true);
        setTimeout(() => { setActive(next); setTransitioning(false); setPrev(null); }, 480);
        return a;
      });
    }, 4500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const post = TEASERS[active];

  return (
    <div className={vis ? "bt-feat-in" : "bt-feat"} style={{ position: "relative", height: "clamp(480px,55vw,580px)" }}>
      {/* ghost stack cards */}
      {[2, 1].map(offset => {
        const ghostIdx = (active + offset) % TEASERS.length;
        const ghost = TEASERS[ghostIdx];
        return (
          <div key={offset} style={{
            position: "absolute", bottom: 0,
            left: `${offset * 14}px`, right: `-${offset * 14}px`,
            height: `calc(100% - ${offset * 28}px)`,
            borderRadius: "22px", overflow: "hidden",
            opacity: 0.5 - offset * 0.12, zIndex: 3 - offset,
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <img src={ghost.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) blur(2px)" }} />
          </div>
        );
      })}

      {/* active card */}
      <Link
        to={`/blog/${post.slug}`}
        style={{ textDecoration: "none", display: "block", position: "absolute", inset: 0, zIndex: 10 }}
      >
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "22px", overflow: "hidden",
          background: T.dark,
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(-18px) scale(0.97)" : "translateY(0) scale(1)",
          transition: "opacity 0.44s cubic-bezier(.22,1,.36,1), transform 0.44s cubic-bezier(.22,1,.36,1)",
          cursor: "pointer",
          display: "flex", flexDirection: "column",
        }}>
          {/* ── IMAGE ZONE: top 52%, 16:9-friendly, no full-card stretch ── */}
          <div style={{ position: "relative", width: "100%", flex: "0 0 52%", overflow: "hidden" }}>
            <img
              src={post.img}
              alt={post.title}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center center",
                filter: "brightness(0.7)",
              }}
            />
            {/* fade into dark body */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,30,40,0.05) 40%, rgba(13,30,40,1) 100%)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
          </div>

          {/* ── TEXT ZONE: dark body below image ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "clamp(16px,2.5vw,24px) clamp(22px,3.5vw,32px) clamp(22px,3.5vw,32px)", background: T.dark }}>
            {/* progress bar */}
            <div style={{ height: "1.5px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", marginBottom: "16px", overflow: "hidden" }}>
              <div key={active} style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)", borderRadius: "1px", animation: "bt-progress 4.5s linear" }} />
            </div>

            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginBottom: "8px" }}>
              {post.date} · {post.readMin} min read
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(1.3rem,2.8vw,1.9rem)", fontWeight: 700,
              color: T.white, margin: "0 0 10px",
              lineHeight: 1.15, letterSpacing: "-0.3px",
            }}>{post.title}</h3>
            <p style={{
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "0.8rem", color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65, fontWeight: 300, margin: "0 0 18px",
              flex: 1,
            }}>{post.excerpt}</p>

            {/* bottom row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}
                onClick={e => e.preventDefault()}
              >
                {TEASERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.preventDefault(); e.stopPropagation(); advance(i); startTimer(); }}
                    style={{
                      width: i === active ? "20px" : "7px", height: "7px", borderRadius: "4px",
                      border: "none", cursor: "pointer", padding: 0,
                      background: i === active ? post.catColor : "rgba(255,255,255,0.25)",
                      transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                ))}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: "7px",
                padding: "9px 20px", borderRadius: "100px",
                background: "linear-gradient(135deg,#2CCED1,#1ab8bb)",
                color: T.white,
                fontFamily: "'DM Sans',system-ui,sans-serif",
                fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
                boxShadow: "0 4px 16px rgba(44,206,209,0.35)",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
                Read Article
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── SLIM ARTICLE ROW ───────────────────────────────────────── */
function ArticleRow({ post, idx, vis }: { post: TeaserPost; idx: number; vis: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className={vis ? "bt-row-in" : "bt-row"}
        style={{
          animationDelay: `${0.2 + idx * 0.09}s`,
          display: "flex", gap: "0",
          borderRadius: "16px", overflow: "hidden",
          background: T.white, cursor: "pointer",
          border: `1px solid ${hov ? post.catColor + "45" : T.border}`,
          boxShadow: hov ? `0 14px 40px ${post.catColor}14` : "0 2px 10px rgba(0,0,0,0.04)",
          transform: hov ? "translateX(5px)" : "translateX(0)",
          transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
          minHeight: "88px",
        }}
      >
        {/* accent strip */}
        <div style={{
          width: "3px", flexShrink: 0,
          background: hov ? "linear-gradient(to bottom,#2CCED1,#FF8A5B)" : `${post.catColor}45`,
          transition: "background 0.38s",
        }} />

        {/* ── THUMBNAIL: wide enough for 16:9, fixed height via parent minHeight ── */}
        <div style={{
          width: "160px", flexShrink: 0,
          overflow: "hidden", position: "relative",
          alignSelf: "stretch",          /* fills the row height */
        }}>
          <img
            src={post.img}
            alt={post.title}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center center",
              transform: hov ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.55s cubic-bezier(.22,1,.36,1)",
              filter: hov ? "brightness(0.62)" : "brightness(0.72)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 55%, ${post.catColor}18)` }} />
          {/* category badge overlaid on image */}
          <span style={{
            position: "absolute", top: "8px", left: "8px",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
            color: post.catColor, background: "rgba(13,30,40,0.72)", backdropFilter: "blur(4px)",
            padding: "2px 7px", borderRadius: "100px", border: `1px solid ${post.catColor}40`,
          }}>{post.category}</span>
        </div>

        {/* text */}
        <div style={{ flex: 1, padding: "13px 15px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
          <h4 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "0.95rem", fontWeight: 700,
            color: hov ? T.ink : "#333", margin: 0, lineHeight: 1.3,
            transition: "color 0.28s",
          }}>{post.title}</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", color: T.muted, fontWeight: 300 }}>{post.date}</span>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", color: T.muted, fontWeight: 300 }}>· {post.readMin} min</span>
            <svg viewBox="0 0 10 10" fill="none" width="9" height="9"
              style={{
                marginLeft: "auto", color: post.catColor,
                opacity: hov ? 1 : 0.3,
                transform: hov ? "translateX(3px)" : "translateX(0)",
                transition: "opacity 0.25s, transform 0.25s",
              }}>
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function BlogTeaser() {
  const { ref, vis } = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes bt-fadeUp  { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bt-fadeL   { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes bt-fadeR   { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes bt-lineW   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes bt-featIn  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bt-rowIn   { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes bt-orbit   { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes bt-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes bt-pulse   { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.48;transform:scale(1.7)} }
        @keyframes bt-blink   { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes bt-lPulse  { 0%,100%{transform:scale(1);opacity:0} 50%{transform:scale(1.45);opacity:.16} }
        @keyframes bt-progress{ from{width:0%} to{width:100%} }
        @keyframes bt-marquee1{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes bt-marquee2{ from{transform:translateX(-50%)} to{transform:translateX(0)} }

        .bt-orbit-el  { animation: bt-orbit 22s linear infinite; }
        .bt-orbit-el2 { animation: bt-orbit 32s linear infinite reverse; }
        .bt-float-el  { animation: bt-float 6s ease-in-out infinite; }
        .bt-pulse-el  { animation: bt-pulse 3s ease-in-out infinite; }
        .bt-blink     { animation: bt-blink 2s ease-in-out infinite; }
        .bt-logo-glow { animation: bt-lPulse 3.2s ease-in-out infinite 1.5s; }

        .bt-vis .bt-ey   { animation: bt-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .bt-vis .bt-h2   { animation: bt-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .bt-vis .bt-sub  { animation: bt-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .bt-vis .bt-ln   { animation: bt-lineW  1.1s cubic-bezier(.22,1,.36,1) 0.10s both; transform-origin:left; }
        .bt-vis .bt-mq   { animation: bt-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.50s both; }
        .bt-vis .bt-cta  { animation: bt-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.58s both; }
        .bt-vis .bt-stat { animation: bt-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.22s both; }

        .bt-feat    { opacity:0; transform:translateY(28px) scale(0.97); }
        .bt-feat-in { animation: bt-featIn 0.85s cubic-bezier(.22,1,.36,1) 0.12s both; }

        .bt-row    { opacity:0; transform:translateX(28px); }
        .bt-row-in { animation: bt-rowIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .bt-marquee1 { animation: bt-marquee1 26s linear infinite; display:flex; width:max-content; }
        .bt-marquee2 { animation: bt-marquee2 32s linear infinite; display:flex; width:max-content; }

        .bt-left-col  { animation: bt-fadeL 0.9s cubic-bezier(.22,1,.36,1) 0.14s both; }
        .bt-right-col { animation: bt-fadeR 0.9s cubic-bezier(.22,1,.36,1) 0.22s both; }

        @media (max-width: 1060px) {
          .bt-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={vis ? "bt-vis" : ""}
        style={{
          background: T.dark,
          padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* BG DECOR */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.08) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-150px", left: "-150px", width: "540px", height: "540px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,91,0.07) 0%,transparent 60%)" }} />
          <div className="bt-orbit-el" style={{ position: "absolute", top: "7%", right: "4%", width: "260px", height: "260px", borderRadius: "50%", border: "1px dashed rgba(44,206,209,0.12)" }} />
          <div className="bt-orbit-el2" style={{ position: "absolute", bottom: "9%", left: "3%", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(255,138,91,0.1)" }} />
          <div className="bt-float-el" style={{ position: "absolute", top: "35%", left: "6%", width: "7px", height: "7px", borderRadius: "50%", background: T.teal, opacity: 0.22 }} />
          <div className="bt-float-el" style={{ position: "absolute", top: "60%", right: "7%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange, opacity: 0.2, animationDelay: "2.5s" }} />
          <div className="bt-pulse-el" style={{ position: "absolute", top: "22%", right: "24%", width: "4px", height: "4px", borderRadius: "50%", background: T.teal }} />
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.018 }} width="640" height="640">
            {Array.from({ length: 13 }).map((_, r) => Array.from({ length: 13 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="1.6" fill={T.white} />
            )))}
          </svg>
        </div>

        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* HEADER */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="bt-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.teal : `${T.teal}45` }} />)}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.teal, fontWeight: 600 }}>Health Insights · SRK Hospital</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="bt-h2" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.4rem,5.5vw,4.4rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2px", margin: 0, color: T.white }}>
                From Our<br /><em style={{ color: T.orange, fontStyle: "italic" }}>Blog</em>
              </h2>
              <p className="bt-sub" style={{ maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: 0 }}>
                Expert health insights from Dr. Rakesh Sharma — kidney care, urology tips, eye health and more.
              </p>
            </div>

            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="bt-ln" style={{ height: "100%", background: "linear-gradient(90deg,#2CCED1,#FF8A5B,transparent)", borderRadius: "2px" }} />
            </div>
          </div>

          {/* MAIN GRID */}
          <div
            className="bt-main-grid"
            style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: "clamp(1.5rem,3vw,2.5rem)", marginBottom: "clamp(2rem,4vw,3rem)", alignItems: "start" }}
          >
            {/* LEFT: stack card */}
            <div className={vis ? "bt-left-col" : ""} style={{ opacity: vis ? undefined : 0 }}>
              <StackCard vis={vis} />
            </div>

            {/* RIGHT: stats + rows + view-all */}
            <div className={vis ? "bt-right-col" : ""} style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem,2vw,1.4rem)", opacity: vis ? undefined : 0 }}>

              {/* Stats */}
              <div className="bt-stat" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {[
                  { v: String(TEASERS.length + 8), l: "Articles",  accent: T.teal   },
                  { v: "4",  l: "Categories", accent: T.orange  },
                  { v: "5★", l: "Rating",     accent: "#f6d365" },
                ].map(({ v, l, accent }, i) => (
                  <div key={i} style={{ padding: "16px 14px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", textAlign: "center", transition: "all 0.3s" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = `${accent}12`; el.style.borderColor = `${accent}30`; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,0.05)"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.7rem", fontWeight: 700, color: accent, lineHeight: 1, letterSpacing: "-0.5px" }}>{v}</div>
                    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginTop: "5px" }}>{l}</div>
                  </div>
                ))}
              </div>

              {/* Article rows */}
              {TEASERS.slice(0, 4).map((post, i) => (
                <ArticleRow key={post.id} post={post} idx={i} vis={vis} />
              ))}

              {/* View all */}
              <Link to="/our-blogs"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 20px", borderRadius: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.28s cubic-bezier(.22,1,.36,1)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.teal; el.style.color = T.teal; el.style.background = "rgba(44,206,209,0.06)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "transparent"; }}
              >
                View all articles
                <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* TAG MARQUEE */}
          <div className="bt-mq" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(44,206,209,0.14)", background: "rgba(255,255,255,0.03)", marginBottom: "clamp(2rem,3.5vw,3rem)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right,${T.dark},transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left,${T.dark},transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ padding: "13px 0", overflow: "hidden" }}>
              <div className="bt-marquee1" style={{ marginBottom: "8px" }}>
                {[...TAGS, ...TAGS].map((tag, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", paddingRight: "22px", whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}>{tag}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: i % 3 === 0 ? T.teal : i % 3 === 1 ? T.orange : "rgba(255,255,255,0.18)", display: "inline-block" }} />
                  </span>
                ))}
              </div>
              <div className="bt-marquee2">
                {[...TAGS, ...TAGS].reverse().map((tag, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "10px", paddingRight: "22px", whiteSpace: "nowrap" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "12px", fontStyle: "italic", color: "rgba(255,255,255,0.2)" }}>{tag}</span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: i % 3 === 0 ? T.orange : i % 3 === 1 ? T.teal : "rgba(255,255,255,0.12)", display: "inline-block" }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA STRIP */}
          <div className="bt-cta" style={{ borderRadius: "18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(44,206,209,0.16)", padding: "clamp(20px,3.5vw,28px) clamp(22px,4vw,34px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: "14px", bottom: "14px", width: "2.5px", background: "linear-gradient(to bottom,#2CCED1,#FF8A5B)", borderRadius: "0 2px 2px 0" }} />
            <div style={{ paddingLeft: "16px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.2 }}>
                Stay informed about your health
              </p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", margin: "5px 0 0", fontWeight: 300 }}>
                Expert articles on urology, eye care, and more — updated regularly.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              <Link to="/our-blogs"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "8px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(44,206,209,0.34)", transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)"; el.style.boxShadow = "0 8px 28px rgba(255,138,91,0.38)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)"; el.style.boxShadow = "0 4px 16px rgba(44,206,209,0.34)"; }}
              >
                <span className="bt-blink" style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
                Read All Articles
              </Link>
              <a href="tel:+919773332601"
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "11px 20px", borderRadius: "8px", background: "transparent", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.22s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = T.orange; el.style.color = T.orange; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.55)"; }}
              >
                Book Consult
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}