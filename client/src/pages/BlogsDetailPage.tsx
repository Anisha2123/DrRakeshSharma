import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { POSTS } from "../components/BlogsData";

/* ── hooks ── */
function useInView(threshold = 0.1) {
  const ref  = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el  = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const h = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h2  = el.scrollHeight - el.clientHeight;
      setProg(h2 > 0 ? Math.min(100, (top / h2) * 100) : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);
  return prog;
}

function useMouse() {
  const [m, setM] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e: MouseEvent) => setM({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return m;
}

/* ── Related post card ── */
function RelatedCard({ post, delay, inView }: { post: typeof POSTS[0]; delay: number; inView: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={`bd-rel-card${inView ? " bd-rel-in" : ""}`} style={{ animationDelay: `${delay}s` }}>
        <div style={{ position: "relative", height: "180px", overflow: "hidden", flexShrink: 0 }}>
          <img
            src={post.img} alt={post.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: hov ? "scale(1.08)" : "scale(1)",
              transition: "transform .65s cubic-bezier(.22,1,.36,1)",
              filter: hov ? "brightness(0.58)" : "brightness(0.72)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 30%,rgba(13,30,40,0.55))" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: `linear-gradient(90deg,${post.catColor},${post.catColor}80)` }} />
          <span style={{
            position: "absolute", top: "10px", right: "10px",
            fontFamily: "'DM Sans',sans-serif", fontSize: "9px", fontWeight: 700,
            letterSpacing: "1.4px", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "100px",
            background: "rgba(13,30,40,0.65)", backdropFilter: "blur(6px)",
            color: post.catColor, border: `1px solid ${post.catColor}40`,
          }}>{post.category}</span>
          <span style={{ position: "absolute", bottom: "10px", left: "12px", fontFamily: "'DM Sans',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>{post.date}</span>
        </div>
        <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h4 style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 700,
            color: "#0d1e28", margin: "0 0 8px", lineHeight: 1.25,
            transition: "color .2s",
            ...(hov ? { color: post.catColor } : {}),
          }}>{post.title}</h4>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12.5px", color: "rgba(26,48,64,.55)", lineHeight: 1.65, fontWeight: 300, flex: 1, margin: 0 }}>{post.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", fontWeight: 600, color: hov ? post.catColor : "rgba(26,48,64,.45)", transition: "color .2s" }}>Read article</span>
            <svg style={{ transform: hov ? "translateX(4px)" : "translateX(0)", transition: "transform .22s" }} viewBox="0 0 10 10" fill="none" width="9" height="9">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Main ── */
export default function BlogDetailPage() {
  const { slug }   = useParams<{ slug: string }>();
  const navigate   = useNavigate();
  const post       = POSTS.find(p => p.slug === slug);
  const progress   = useScrollProgress();
  const mouse      = useMouse();
  const [mounted, setMounted] = useState(false);
  const [copied,  setCopied]  = useState(false);

  const heroRef    = useRef<HTMLDivElement>(null);
  const { ref: contentRef, inView: contentIn } = useInView(0.05);
  const { ref: relRef, inView: relIn }          = useInView(0.1);
  const { ref: ctaRef, inView: ctaIn }          = useInView(0.1);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, [slug]);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#F4F4F4", fontFamily: "'DM Sans',sans-serif", gap: "16px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: "#0d1e28" }}>Article not found</p>
        <Link to="/our-blogs" style={{ color: "#2CCED1", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>← Back to all articles</Link>
      </div>
    );
  }

  const related = POSTS.filter(p => p.id !== post.id && (p.category === post.category || p.featured)).slice(0, 3);
  const px = (mouse.x - 0.5) * 24;
  const py = (mouse.y - 0.5) * 14;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --teal:   #2CCED1;
          --orange: #FF8A5B;
          --dark:   #0d1e28;
          --bg:     #F4F4F4;
          --white:  #FFFFFF;
          --ink:    #1C1C1C;
          --mid:    #5A5A5A;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--bg); font-family: 'DM Sans', sans-serif; }

        /* ── reading progress ── */
        .bd-progress-bar {
          position: fixed; top: 0; left: 0; z-index: 9999;
          height: 3px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
          transform-origin: left;
          transition: width .1s linear;
          pointer-events: none;
        }

        /* ── navbar ── */
        .bd-nav {
          position: fixed; top: 3px; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 60px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(44,206,209,0.1);
          opacity: 0; transform: translateY(-20px);
          transition: opacity .65s ease, transform .65s ease;
        }
        .bd-nav.bd-nav-in { opacity: 1; transform: translateY(0); }

        .bd-back-btn {
          display: flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: .07em; text-transform: uppercase;
          color: rgba(26,48,64,.55); text-decoration: none; padding: 8px 0;
          transition: color .2s;
        }
        .bd-back-btn:hover { color: #2CCED1; }
        .bd-back-btn svg { transition: transform .22s ease; }
        .bd-back-btn:hover svg { transform: translateX(-3px); }

        .bd-nav-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 600; color: var(--dark);
          max-width: 380px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          opacity: 0; transition: opacity .3s ease;
        }
        .bd-nav-title.bd-title-vis { opacity: 1; }

        .bd-nav-right { display: flex; align-items: center; gap: 10px; }

        .bd-share-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 100px;
          border: 1px solid rgba(44,206,209,.28); background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 500;
          letter-spacing: .06em; text-transform: uppercase; cursor: pointer;
          color: #2CCED1; transition: all .22s ease;
        }
        .bd-share-btn:hover { background: rgba(44,206,209,.08); border-color: rgba(44,206,209,.5); }

        /* ── hero ── */
        .bd-hero {
          position: relative; min-height: 100vh;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden;
        }

        .bd-hero-img {
          position: absolute; inset: 0; overflow: hidden;
        }
        .bd-hero-img img {
          width: 100%; height: 100%; object-fit: cover;
          transform-origin: center;
          opacity: 0;
          transition: opacity 1.2s ease, transform 12s ease;
        }
        .bd-hero-img img.bd-img-in {
          opacity: 1;
          animation: bdHeroZoom 14s ease-out forwards;
        }
        @keyframes bdHeroZoom { from { transform: scale(1.12); } to { transform: scale(1); } }

        /* overlays */
        .bd-hero-overlay-1 {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(13,30,40,0.28) 0%, rgba(13,30,40,0.88) 70%, rgba(13,30,40,0.98) 100%);
        }
        .bd-hero-overlay-2 {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 70% 40%, rgba(44,206,209,0.09) 0%, transparent 60%);
          transition: background .08s linear;
        }

        /* top gradient line */
        .bd-hero-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, var(--teal) 30%, var(--orange) 70%, transparent);
          opacity: .7; z-index: 2;
        }

        /* grid bg */
        .bd-grid-lines {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(44,206,209,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,206,209,.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* scan line */
        .bd-scan {
          position: absolute; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(to right, transparent, rgba(44,206,209,.55), transparent);
          animation: bdScan 4s linear infinite;
          z-index: 5;
        }
        @keyframes bdScan { 0%{ top:0; opacity:0; } 5%{ opacity:1; } 92%{ opacity:.7; } 100%{ top:100%; opacity:0; } }

        /* floating particles */
        .bd-particle {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 3;
          animation: bdPRise linear infinite;
        }
        @keyframes bdPRise {
          0%   { transform: translateY(30px) scale(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: .8; }
          100% { transform: translateY(-120px) scale(1.4); opacity: 0; }
        }

        /* orbiting rings */
        .bd-orb-ring {
          position: absolute; border-radius: 50%; pointer-events: none;
          border: 1px dashed rgba(44,206,209,.12);
        }

        /* hero content */
        .bd-hero-content {
          position: relative; z-index: 6;
          padding: clamp(100px,14vw,160px) clamp(24px,6vw,80px) clamp(48px,6vw,72px);
          max-width: 900px;
        }

        .bd-breadcrumb {
          display: flex; align-items: center; gap: 8px; margin-bottom: 24px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .7s ease .2s, transform .7s ease .2s;
        }
        .bd-breadcrumb.bd-in { opacity: 1; transform: translateY(0); }
        .bd-breadcrumb a { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.42); text-decoration: none; transition: color .2s; }
        .bd-breadcrumb a:hover { color: #2CCED1; }
        .bd-breadcrumb span { font-size: 11px; color: rgba(255,255,255,.22); }

        .bd-cat-chip {
          display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px;
          padding: 6px 16px; border-radius: 100px;
          font-size: 10px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase;
          backdrop-filter: blur(8px);
          opacity: 0; transform: translateY(18px);
          transition: opacity .7s ease .3s, transform .7s ease .3s;
        }
        .bd-cat-chip.bd-in { opacity: 1; transform: translateY(0); }
        .bd-cat-dot { width: 5px; height: 5px; border-radius: 50%; animation: bdDotPulse 2s ease-in-out infinite; }
        @keyframes bdDotPulse { 0%,100%{opacity:1;} 50%{opacity:.3;} }

        .bd-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 700; line-height: 1.06; color: #fff;
          margin-bottom: 20px; letter-spacing: -1px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .9s ease .4s, transform .9s cubic-bezier(.22,.68,0,1.18) .4s;
        }
        .bd-hero-title.bd-in { opacity: 1; transform: translateY(0); }

        /* word-by-word animation for title */
        .bd-title-word {
          display: inline-block; overflow: hidden; vertical-align: bottom; margin-right: .22em;
        }
        .bd-title-word-inner {
          display: inline-block;
          opacity: 0; transform: translateY(110%) skewY(3deg);
          animation: bdWordUp .85s cubic-bezier(.22,.68,0,1.18) both;
        }
        @keyframes bdWordUp {
          from { opacity: 0; transform: translateY(110%) skewY(3deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0); }
        }

        .bd-hero-meta {
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
          opacity: 0; transform: translateY(16px);
          transition: opacity .8s ease .55s, transform .8s ease .55s;
        }
        .bd-hero-meta.bd-in { opacity: 1; transform: translateY(0); }
        .bd-meta-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 400; color: rgba(255,255,255,.48); letter-spacing: .04em;
        }
        .bd-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.25); }

        /* ── article body ── */
        .bd-body-wrap {
          max-width: 1200px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,60px);
          display: grid; grid-template-columns: 1fr 280px; gap: 48px; align-items: start;
        }

        .bd-article {
          background: #fff; border-radius: 24px;
          padding: clamp(28px,5vw,56px);
          margin-top: -40px; position: relative; z-index: 10;
          box-shadow: 0 20px 60px rgba(0,0,0,.1);
          border: 1px solid rgba(44,206,209,.1);
          opacity: 0; transform: translateY(32px);
          transition: opacity .85s ease, transform .85s cubic-bezier(.22,.68,0,1.18);
        }
        .bd-article.bd-in { opacity: 1; transform: translateY(0); }

        /* article typography */
        .bd-article-html { font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.88; color: #2a3f50; font-weight: 300; }
        .bd-article-html p { margin: 0 0 1.5em; }
        .bd-article-html h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; color: #0d1e28;
          margin: 2.2em 0 .7em; line-height: 1.15; letter-spacing: -.3px;
          padding-bottom: .5em;
          border-bottom: 1px solid rgba(44,206,209,.18);
          position: relative;
        }
        .bd-article-html h2::before {
          content: ''; position: absolute; bottom: -1px; left: 0;
          width: 60px; height: 2px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
        }
        .bd-article-html blockquote {
          margin: 2em 0; padding: 1.4em 2em;
          background: linear-gradient(135deg, rgba(44,206,209,.06), rgba(255,138,91,.04));
          border-left: 4px solid #2CCED1; border-radius: 0 12px 12px 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-style: italic; color: #0d1e28; line-height: 1.65;
        }
        .bd-article-html ul, .bd-article-html ol {
          margin: 0 0 1.5em 1.4em; padding: 0;
        }
        .bd-article-html li {
          margin-bottom: .55em; color: #3a5060; font-weight: 300;
        }
        .bd-article-html li strong { color: #0d1e28; font-weight: 500; }
        .bd-article-html strong { color: #0d1e28; font-weight: 500; }

        /* ── sticky sidebar ── */
        .bd-sidebar {
          position: sticky; top: 80px;
          display: flex; flex-direction: column; gap: 18px;
          margin-top: -40px;
        }

        .bd-sidebar-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(44,206,209,.12);
          box-shadow: 0 4px 20px rgba(0,0,0,.05);
          opacity: 0; transform: translateX(20px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.22,.68,0,1.18);
        }
        .bd-sidebar-card.bd-in { opacity: 1; transform: translateX(0); }
        .bd-sidebar-card-head {
          padding: 14px 18px; background: var(--dark);
          display: flex; align-items: center; gap: 10px;
          border-bottom: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }
        .bd-sidebar-card-head::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
        }
        .bd-sidebar-card-head-title {
          font-size: 10px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase;
          color: rgba(255,255,255,.55);
        }
        .bd-sidebar-card-body { padding: 18px; }

        /* doctor card */
        .bd-doctor-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, #2CCED1, #FF8A5B);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: #fff;
          margin: 0 auto 12px; flex-shrink: 0;
        }
        .bd-book-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 11px; border-radius: 10px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb); border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: .07em; text-transform: uppercase; color: #fff; cursor: pointer;
          text-decoration: none; margin-top: 14px;
          box-shadow: 0 4px 16px rgba(44,206,209,.32);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
          position: relative; overflow: hidden;
        }
        .bd-book-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #FF8A5B, #e06030); opacity: 0; transition: opacity .3s;
        }
        .bd-book-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(44,206,209,.45); }
        .bd-book-btn:hover::before { opacity: 1; }
        .bd-book-btn span { position: relative; z-index: 1; }

        /* share sidebar */
        .bd-share-list { display: flex; flex-direction: column; gap: 8px; }
        .bd-share-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: #2a3f50;
          border: 1px solid rgba(0,0,0,.07); cursor: pointer; transition: all .2s; background: transparent;
          width: 100%; text-align: left;
        }
        .bd-share-item:hover { background: rgba(44,206,209,.07); border-color: rgba(44,206,209,.3); color: #2CCED1; }

        /* progress ring */
        .bd-prog-wrap {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          padding: 18px;
        }
        .bd-prog-ring { position: relative; width: 60px; height: 60px; flex-shrink: 0; }
        .bd-prog-ring svg { transform: rotate(-90deg); }
        .bd-prog-num {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 700; color: #0d1e28;
        }
        .bd-prog-label { font-size: 12px; color: rgba(26,48,64,.5); font-weight: 300; line-height: 1.5; }

        /* ── related section ── */
        .bd-related-section {
          max-width: 1200px; margin: 64px auto 0;
          padding: 0 clamp(20px,5vw,60px) clamp(60px,8vw,100px);
        }

        .bd-rel-head {
          display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 36px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .bd-rel-head.bd-in { opacity: 1; transform: translateY(0); }

        .bd-rel-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 700; color: #0d1e28;
        }
        .bd-rel-title em { font-style: italic; color: #FF8A5B; }

        .bd-rel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .bd-rel-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(44,206,209,.1);
          display: flex; flex-direction: column;
          transition: box-shadow .3s ease, border-color .3s ease, transform .35s cubic-bezier(.22,.68,0,1.18);
          opacity: 0; transform: translateY(24px) scale(.97);
        }
        .bd-rel-card:hover { box-shadow: 0 16px 48px rgba(44,206,209,.14); border-color: rgba(44,206,209,.3); transform: translateY(-5px) scale(1.01); }
        .bd-rel-in { animation: bdRelIn .65s cubic-bezier(.22,.68,0,1.18) both; }
        @keyframes bdRelIn { from{opacity:0;transform:translateY(24px) scale(.97);} to{opacity:1;transform:translateY(0) scale(1);} }

        /* ── bottom CTA ── */
        .bd-cta {
          max-width: 1200px; margin: 0 auto;
          padding: 0 clamp(20px,5vw,60px) clamp(40px,6vw,80px);
        }
        .bd-cta-inner {
          border-radius: 24px; background: var(--dark); overflow: hidden;
          padding: clamp(32px,5vw,52px);
          display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap;
          position: relative;
          box-shadow: 0 24px 70px rgba(0,0,0,.15);
          opacity: 0; transform: translateY(24px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .bd-cta-inner.bd-in { opacity: 1; transform: translateY(0); }
        .bd-cta-bg-img {
          position: absolute; inset: 0;
          background-image: url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=30&auto=format);
          background-size: cover; background-position: center; opacity: .04;
        }
        .bd-cta-line {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
        }
        .bd-cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 700; color: #fff;
          margin: 0; line-height: 1.1; position: relative;
        }
        .bd-cta-sub {
          font-size: 13px; font-weight: 300; color: rgba(255,255,255,.45);
          margin: 8px 0 0; position: relative;
        }
        .bd-cta-actions { display: flex; gap: 10px; flex-shrink: 0; position: relative; }
        .bd-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 10px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb); border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
          letter-spacing: .07em; text-transform: uppercase; color: #fff; cursor: pointer; text-decoration: none;
          box-shadow: 0 6px 20px rgba(44,206,209,.38);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
        }
        .bd-cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(44,206,209,.5); }

        .bd-cta-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 22px; border-radius: 10px;
          background: transparent; border: 1px solid rgba(255,255,255,.14);
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .07em;
          color: rgba(255,255,255,.55); cursor: pointer; text-decoration: none;
          transition: border-color .2s, color .2s;
        }
        .bd-cta-btn-ghost:hover { border-color: #2CCED1; color: #2CCED1; }

        /* ── tag chips ── */
        .bd-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,.07); }
        .bd-tag {
          font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
          padding: 5px 12px; border-radius: 100px;
          background: rgba(44,206,209,.08); color: #2CCED1;
          border: 1px solid rgba(44,206,209,.2); cursor: default; transition: all .2s;
        }
        .bd-tag:hover { background: rgba(44,206,209,.15); }

        /* ── responsive ── */
        @media (max-width: 1024px) {
          .bd-body-wrap { grid-template-columns: 1fr; }
          .bd-sidebar { display: none; }
        }
        @media (max-width: 768px) {
          .bd-nav { padding: 12px 20px; }
          .bd-nav-title { display: none; }
          .bd-rel-grid { grid-template-columns: 1fr; }
          .bd-hero-content { padding: 100px 24px 40px; }
          .bd-cta-actions { flex-direction: column; width: 100%; }
        }
        @media (max-width: 640px) {
          .bd-rel-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Reading progress bar ── */}
      <div className="bd-progress-bar" style={{ width: `${progress}%` }} />

      {/* ── Fixed Navbar ── */}
      <nav className={`bd-nav${mounted ? " bd-nav-in" : ""}`}>
        <button className="bd-back-btn" onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <div className={`bd-nav-title${progress > 5 ? " bd-title-vis" : ""}`}>{post.title}</div>
        <div className="bd-nav-right">
          <button className="bd-share-btn" onClick={copyLink}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="bd-hero" ref={heroRef}>
        <div className="bd-hero-img">
          <img src={post.img} alt={post.title} className={mounted ? "bd-img-in" : ""} />
          <div className="bd-hero-overlay-1" />
          <div className="bd-hero-overlay-2" style={{ background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(44,206,209,0.1) 0%, transparent 55%)` }} />
        </div>

        <div className="bd-hero-topline" />
        <div className="bd-grid-lines" />
        <div className="bd-scan" />

        {/* orbiting rings */}
        <div className="bd-orb-ring" style={{ width: 320, height: 320, top: "12%", right: "8%", animation: "bdOrb 28s linear infinite" }} />
        <div className="bd-orb-ring" style={{ width: 200, height: 200, top: "6%", right: "15%", borderColor: "rgba(255,138,91,.09)", animation: "bdOrb 18s linear infinite reverse" }} />

        <style>{`@keyframes bdOrb{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>

        {/* floating particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="bd-particle" style={{
            width: `${3 + (i * 23 % 6)}px`, height: `${3 + (i * 23 % 6)}px`,
            left: `${(i * 17 + 5) % 100}%`, bottom: `${(i * 11 + 8) % 35}%`,
            animationDuration: `${5 + (i % 5)}s`, animationDelay: `${(i * .42) % 4}s`,
            background: i % 3 === 0 ? "rgba(240,112,0,.65)" : i % 3 === 1 ? "rgba(44,206,209,.6)" : "rgba(109,179,63,.5)",
          }} />
        ))}

        <div className="bd-hero-content">
          {/* breadcrumb */}
          <div className={`bd-breadcrumb${mounted ? " bd-in" : ""}`}>
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/our-blogs">Articles</Link>
            <span>›</span>
            <span style={{ color: post.catColor }}>{post.category}</span>
          </div>

          {/* category chip */}
          <div
            className={`bd-cat-chip${mounted ? " bd-in" : ""}`}
            style={{ background: `${post.catColor}20`, color: post.catColor, border: `1px solid ${post.catColor}40` }}
          >
            <span className="bd-cat-dot" style={{ background: post.catColor }} />
            {post.category}
          </div>

          {/* title — word by word */}
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.06, color: "#fff", marginBottom: "22px", letterSpacing: "-1px" }}>
            {mounted && post.title.split(" ").map((word, i) => (
              <span key={i} className="bd-title-word">
                <span className="bd-title-word-inner" style={{ animationDelay: `${.38 + i * .06}s` }}>
                  {word}
                </span>
                {" "}
              </span>
            ))}
          </h1>

          {/* meta row */}
          <div className={`bd-hero-meta${mounted ? " bd-in" : ""}`}>
            <div className="bd-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {post.date}
            </div>
            <div className="bd-meta-sep" />
            <div className="bd-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {post.readMin} min read
            </div>
            <div className="bd-meta-sep" />
            <div className="bd-meta-item">
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "linear-gradient(135deg,#2CCED1,#FF8A5B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "#fff", fontFamily: "'Cormorant Garamond',serif" }}>RS</div>
              Dr. Rakesh Sharma
            </div>
          </div>
        </div>
      </div>

      {/* ── ARTICLE + SIDEBAR ── */}
      <div style={{ background: "#F4F4F4", paddingTop: "0", paddingBottom: "0" }}>
        <div className="bd-body-wrap">

          {/* ARTICLE */}
          <div className={`bd-article${contentIn ? " bd-in" : ""}`} ref={contentRef}>
            <div
              className="bd-article-html"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* tags */}
            <div className="bd-tags">
              {[post.category, "SRK Hospital", "Jaipur", "Healthcare"].map(tag => (
                <span key={tag} className="bd-tag">{tag}</span>
              ))}
            </div>

            {/* author strip */}
            <div style={{ marginTop: "32px", padding: "22px", background: "rgba(44,206,209,.05)", border: "1px solid rgba(44,206,209,.14)", borderRadius: "14px", display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg,#2CCED1,#FF8A5B)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>RS</div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 600, color: "#0d1e28", marginBottom: "2px" }}>Dr. Rakesh Sharma</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(26,48,64,.55)" }}>MS, MCh Urology · 18+ years surgical experience · SRK Hospital, Jaipur</div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="bd-sidebar">
            {/* reading progress */}
            <div className={`bd-sidebar-card${contentIn ? " bd-in" : ""}`} style={{ transitionDelay: ".1s" }}>
              <div className="bd-sidebar-card-head">
                <div className="bd-sidebar-card-head-title">Reading Progress</div>
              </div>
              <div className="bd-prog-wrap">
                <div className="bd-prog-ring">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(44,206,209,.12)" strokeWidth="5" />
                    <circle cx="30" cy="30" r="24" fill="none"
                      stroke="url(#bdProgGrad)" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                      style={{ transition: "stroke-dashoffset .2s ease" }}
                    />
                    <defs>
                      <linearGradient id="bdProgGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2CCED1"/>
                        <stop offset="100%" stopColor="#FF8A5B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="bd-prog-num">{Math.round(progress)}%</div>
                </div>
                <div className="bd-prog-label">
                  <div style={{ fontWeight: 500, color: "#0d1e28", fontSize: "13px" }}>{post.readMin} min read</div>
                  <div style={{ marginTop: "2px" }}>Keep reading →</div>
                </div>
              </div>
            </div>

            {/* doctor card */}
            <div className={`bd-sidebar-card${contentIn ? " bd-in" : ""}`} style={{ transitionDelay: ".2s" }}>
              <div className="bd-sidebar-card-head">
                <div className="bd-sidebar-card-head-title">About the Author</div>
              </div>
              <div className="bd-sidebar-card-body" style={{ textAlign: "center" }}>
                <div className="bd-doctor-avatar">RS</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontWeight: 700, color: "#0d1e28", marginBottom: "4px" }}>Dr. Rakesh Sharma</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11.5px", fontWeight: 300, color: "rgba(26,48,64,.5)", lineHeight: 1.55, marginBottom: "12px" }}>MS · MCh Urology<br/>18+ years experience<br/>SRK Hospital, Jaipur</div>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "2px" }}>
                  {[{ v: "12K+", l: "Surgeries" }, { v: "98%", l: "Success" }].map(({ v, l }) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 700, color: "#2CCED1" }}>{v}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "1.2px", color: "rgba(26,48,64,.4)" }}>{l}</div>
                    </div>
                  ))}
                </div>
                 <a href="tel:+919887711224" className="bd-book-btn">
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>

            {/* share card */}
            <div className={`bd-sidebar-card${contentIn ? " bd-in" : ""}`} style={{ transitionDelay: ".3s" }}>
              <div className="bd-sidebar-card-head">
                <div className="bd-sidebar-card-head-title">Share This Article</div>
              </div>
              <div className="bd-sidebar-card-body">
                <div className="bd-share-list">
                  {[
                    { label: "Copy Link", icon: "🔗", action: copyLink },
                    { label: "Share on WhatsApp", icon: "💬", action: () => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`) },
                    { label: "Share on Twitter", icon: "𝕏", action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`) },
                  ].map(({ label, icon, action }) => (
                    <button key={label} className="bd-share-item" onClick={action}>
                      <span style={{ fontSize: "14px" }}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
                {copied && <div style={{ marginTop: "10px", textAlign: "center", fontSize: "11px", color: "#2CCED1", fontWeight: 500 }}>✓ Link copied to clipboard</div>}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── RELATED ARTICLES ── */}
      <div style={{ background: "#F4F4F4" }}>
        <div className="bd-related-section" ref={relRef}>
          <div className={`bd-rel-head${relIn ? " bd-in" : ""}`}>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#2CCED1", marginBottom: "8px" }}>
                — Continue Reading
              </div>
              <h2 className="bd-rel-title">Related <em>Articles</em></h2>
            </div>
            <Link to="/our-blogs" style={{ textDecoration: "none", fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase", color: "rgba(26,48,64,.45)", display: "flex", alignItems: "center", gap: "6px" }}>
              All Articles
              <svg viewBox="0 0 10 10" fill="none" width="9" height="9">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="bd-rel-grid">
            {related.map((p, i) => (
              <RelatedCard key={p.id} post={p} delay={i * .1 + .12} inView={relIn} />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="bd-cta" ref={ctaRef}>
        <div className={`bd-cta-inner${ctaIn ? " bd-in" : ""}`}>
          <div className="bd-cta-bg-img" />
          <div className="bd-cta-line" />
          <div>
            <h3 className="bd-cta-title">Ready to take the next step?</h3>
            <p className="bd-cta-sub">Dr. Rakesh Sharma is accepting new consultations at SRK Hospital, Jaipur.</p>
          </div>
          <div className="bd-cta-actions">
            <a href="tel:+919887711224" className="bd-cta-btn-primary">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,.7)", animation: "bdDotPulse 2s ease-in-out infinite" }} />
              Book a Consultation
            </a>
            <Link to="/our-blogs" className="bd-cta-btn-ghost">Browse All Articles →</Link>
          </div>
        </div>
      </div>
    </>
  );
}