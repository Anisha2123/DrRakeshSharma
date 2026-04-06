"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
  gold:   "#D4A017",
};

/* ─── CLIP DATA ──────────────────────────────────────────────── */
interface Clip {
  id:        number;
  src:       string;
  headline:  string;
  subline:   string;
  pub:       string;
  date:      string;
  tag:       string;
  tagColor:  string;
  highlight: string;   // English summary for overlay
}

const CLIPS: Clip[] = [
  {
    id: 1,
    src: "/newspaper-clips/dr.rakeshsharma1.jpg",
    headline: "गुर्दे का कैंसर पहुंचा हार्ट तक, 8 घंटे की सर्जरी कर बचाई जान",
    subline: "मालवीय नगर के निजी अस्पताल में हुआ ऑपरेशन, विश्व में तीसरी सफल सर्जरी का दावा",
    pub: "महानगर",
    date: "2022",
    tag: "World 3rd",
    tagColor: T.gold,
    highlight: "Kidney cancer reached the heart — Dr. Sharma performed an 8-hour life-saving surgery, claimed to be only the 3rd successful operation of this kind in the world.",
  },
  {
    id: 2,
    src: "/newspaper-clips/dr.rakeshsharma2.jpg",
    headline: "गुर्दे का कैंसर हार्ट तक पहुंचा, आठ घंटे की सफल सर्जरी के बाद स्थापित किया कीर्तिमान",
    subline: "चिकित्सकों की टीम को मिली बड़ी सफलता, विश्व में इस तरह की सफल सर्जरी का तीसरा मामला",
    pub: "दैनिक",
    date: "2022",
    tag: "Record",
    tagColor: T.orange,
    highlight: "A landmark surgery establishing a world record — 24cm kidney tumour removed after it had grown into the heart's lower chamber.",
  },
  {
    id: 3,
    src: "/newspaper-clips/dr.rakeshsharma3.jpg",
    headline: "गुर्दे का कैंसर हार्ट तक पहुंचा जटिल सर्जरी कर निकाला ट्यूमर",
    subline: "25 सेमी के ट्यूमर को निकालकर बनाया विश्व का तीसरा सफल केस — देश का पहला",
    pub: "नवज्योति",
    date: "2022",
    tag: "India",
    tagColor: T.teal,
    highlight: "India's first successful surgery of this type — a 25cm tumour removed through a complex procedure, making it the world's 3rd and India's recorded case.",
  },
  {
    id: 4,
    src: "/newspaper-clips/dr.rakeshsharma4.jpg",
    headline: "आधुनिक तकनीक से किडनी स्टोन का इलाज संभव",
    subline: "डॉ. राकेश शर्मा, यूरिन एवं किडनी रोग स्पेशलिस्ट, सक्सेन",
    pub: "मानसरोवर पत्रिका",
    date: "2021",
    tag: "Health Feature",
    tagColor: "#6B7FD4",
    highlight: "Laser technology making kidney stone treatment painless and effective — Dr. Sharma explains modern Holmium laser procedures to Patrika readers.",
  },
  {
    id: 5,
    src: "/newspaper-clips/dr.rakeshsharma5.jpg",
    headline: "जटिल ऑपरेशन कर निकाला बड़ा ट्यूमर",
    subline: "एड्रीनल ग्रंथि में था ट्यूमर, डॉक्टरों की टीम ने किया ऑपरेशन — 22 सेमी ट्यूमर सफलतापूर्वक निकाला",
    pub: "सांगानेर पत्रिका",
    date: "2021",
    tag: "Surgical Feat",
    tagColor: T.orange,
    highlight: "22cm adrenal gland tumour successfully removed — a rare surgical achievement by Dr. Sharma's team at Apex Hospital, Sanganer.",
  },
  {
    id: 6,
    src: "/newspaper-clips/dr.rakeshsharma6.jpg",
    headline: "यूरोलॉजी में अत्याधुनिक तकनीकों द्वारा गुर्दे एवं मूत्र रोगों का सफलतापूर्वक इलाज करना ही मूल मंत्र",
    subline: "दैनिक भास्कर Healthcare Award 2021 — डॉ. राकेश शर्मा, Director, SRK Hospital Jaipur",
    pub: "दैनिक भास्कर",
    date: "11 Aug 2021",
    tag: "Award 2021",
    tagColor: T.gold,
    highlight: "Dainik Bhaskar Healthcare Award 2021 — Dr. Rakesh Sharma felicitated as a senior urologist making a vital contribution to healthcare in India.",
  },
  {
    id: 7,
    src: "/newspaper-clips/dr.rakeshsharma7.jpg",
    headline: "गुर्दे के कैंसर का 24 सेमी बड़ा ट्यूमर निकाला",
    subline: "दुनिया का तीसरा सफल केस: ट्यूमर किडनी की खून की नली के रास्ते हार्ट के निचले चैंबर तक पहुंच गया था",
    pub: "डेली न्यूज",
    date: "2022",
    tag: "World Record",
    tagColor: T.gold,
    highlight: "Daily News coverage of the world's 3rd successful removal of a 24cm kidney tumour that had infiltrated the heart's right ventricle via the vena cava.",
  },
];

/* ─── PUBLICATION LOGO TEXT ─────────────────────────────────── */
const PUB_STYLES: Record<string, { bg: string; color: string; font: string }> = {
  "महानगर":             { bg: "#c0392b", color: "#fff",  font: "serif" },
  "दैनिक":              { bg: "#1a237e", color: "#fff",  font: "serif" },
  "नवज्योति":           { bg: "#e65100", color: "#fff",  font: "serif" },
  "मानसरोवर पत्रिका":  { bg: "#1b5e20", color: "#fff",  font: "serif" },
  "सांगानेर पत्रिका":  { bg: "#4a148c", color: "#fff",  font: "serif" },
  "दैनिक भास्कर":      { bg: "#b71c1c", color: "#fff",  font: "serif" },
  "डेली न्यूज":         { bg: "#0d47a1", color: "#fff",  font: "serif" },
};

/* ─── HOOK ───────────────────────────────────────────────────── */
function useReveal(threshold = 0.05) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

/* ─── LIGHTBOX ───────────────────────────────────────────────── */
function Lightbox({ clip, onClose, onPrev, onNext }: {
  clip: Clip | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (clip) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setMounted(true), 10);
    }
    return () => { document.body.style.overflow = ""; };
  }, [clip]);

  const close = useCallback(() => {
    setMounted(false);
    setTimeout(onClose, 380);
  }, [onClose]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")       close();
      if (e.key === "ArrowRight")   onNext();
      if (e.key === "ArrowLeft")    onPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close, onNext, onPrev]);

  if (!clip) return null;
  const pub = PUB_STYLES[clip.pub] ?? { bg: T.dark, color: "#fff", font: "serif" };

  return (
    <div
      onClick={e => e.target === e.currentTarget && close()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: mounted ? "rgba(0,0,0,0.88)" : "rgba(0,0,0,0)",
        backdropFilter: mounted ? "blur(14px)" : "blur(0px)",
        transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div style={{
        width: "100%", maxWidth: "900px", maxHeight: "95vh",
        display: "flex", flexDirection: "column",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1) translateY(0)" : "scale(0.93) translateY(24px)",
        transition: "all 0.44s cubic-bezier(.22,1,.36,1)",
      }}>
        {/* top bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: "14px",
          marginBottom: "12px", flexShrink: 0,
        }}>
          <div style={{ padding: "4px 14px", borderRadius: "6px", background: pub.bg, fontFamily: pub.font, fontSize: "0.85rem", fontWeight: 700, color: pub.color }}>{clip.pub}</div>
          <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{clip.date}</span>
          <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: "100px", background: `${clip.tagColor}22`, color: clip.tagColor, border: `1px solid ${clip.tagColor}40`, fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{clip.tag}</span>
          <button onClick={close} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", flexShrink: 0 }}>✕</button>
        </div>

        {/* image */}
        <div style={{ flex: 1, overflow: "hidden", borderRadius: "18px", position: "relative", minHeight: 0 }}>
          <img src={clip.src} alt={clip.headline}
            style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "18px", background: "#111" }}
          />
          {/* nav arrows */}
          {[{ dir: "prev", icon: "←", action: onPrev, pos: "left" }, { dir: "next", icon: "→", action: onNext, pos: "right" }].map(btn => (
            <button key={btn.dir} onClick={btn.action} style={{
              position: "absolute", top: "50%", [btn.pos]: "16px",
              transform: "translateY(-50%)",
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(13,30,40,0.75)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", cursor: "pointer", fontSize: "1.1rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(44,206,209,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(13,30,40,0.75)")}
            >{btn.icon}</button>
          ))}
        </div>

        {/* headline strip */}
        <div style={{ marginTop: "14px", padding: "16px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
          <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(0.95rem,2vw,1.15rem)", fontWeight: 700, color: "#fff", margin: "0 0 5px", lineHeight: 1.3 }}>{clip.headline}</p>
          <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", margin: "0 0 8px", fontWeight: 300 }}>{clip.highlight}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── CLIP CARD ──────────────────────────────────────────────── */
function ClipCard({ clip, idx, vis, onClick }: {
  clip: Clip; idx: number; vis: boolean; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const pub = PUB_STYLES[clip.pub] ?? { bg: T.dark, color: "#fff", font: "serif" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      className={vis ? "nc-card-in" : "nc-card"}
      style={{
        animationDelay: `${(idx % 4) * 0.1 + 0.12}s`,
        cursor: "pointer",
        borderRadius: "20px", overflow: "hidden",
        background: T.white,
        border: `1px solid ${hov ? clip.tagColor + "50" : T.border}`,
        boxShadow: hov ? `0 22px 60px ${clip.tagColor}18` : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "all 0.44s cubic-bezier(.22,1,.36,1)",
        display: "flex", flexDirection: "column",
        position: "relative",
      }}
    >
      {/* newspaper image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden", flexShrink: 0 }}>
        <img src={clip.src} alt={clip.headline}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.65s cubic-bezier(.22,1,.36,1)",
            filter: hov ? "brightness(0.6) saturate(1.1)" : "brightness(0.82) saturate(0.95)",
          }}
        />
        {/* gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hov
            ? `linear-gradient(to bottom, ${clip.tagColor}35 0%, rgba(13,30,40,0.75) 100%)`
            : "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.55) 100%)",
          transition: "background 0.5s",
        }} />
        {/* top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
        {/* pub badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          padding: "3px 10px", borderRadius: "5px",
          background: pub.bg, fontFamily: pub.font,
          fontSize: "0.65rem", fontWeight: 700, color: pub.color,
          letterSpacing: "0.04em",
        }}>{clip.pub}</div>
        {/* achievement tag */}
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          padding: "3px 9px", borderRadius: "100px",
          background: "rgba(13,30,40,0.65)", backdropFilter: "blur(6px)",
          color: clip.tagColor, border: `1px solid ${clip.tagColor}45`,
        }}>{clip.tag}</span>
        {/* date */}
        <span style={{
          position: "absolute", bottom: "12px", right: "12px",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.6rem", color: "rgba(255,255,255,0.55)", fontWeight: 300,
        }}>{clip.date}</span>
        {/* magnify icon */}
        <div style={{
          position: "absolute", bottom: "12px", left: "12px",
          width: "32px", height: "32px", borderRadius: "50%",
          background: hov ? "linear-gradient(135deg,#2CCED1,#FF8A5B)" : "rgba(255,255,255,0.15)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${hov ? "transparent" : "rgba(255,255,255,0.25)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
          transform: hov ? "scale(1.1) rotate(-8deg)" : "scale(1) rotate(0)",
          color: "#fff", fontSize: "0.9rem",
        }}>
          <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* body */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* <h3 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: "1.0rem", fontWeight: 700,
          color: T.ink, margin: "0 0 7px", lineHeight: 1.3, letterSpacing: "-0.1px",
        }}>{clip.headline}</h3> */}
        <p style={{
          fontFamily: "'DM Sans',system-ui,sans-serif",
          fontSize: "0.75rem", color: T.mid, lineHeight: 1.65,
          fontWeight: 300, margin: "0 0 12px", flex: 1,
        }}>{clip.highlight}</p>

        {/* bottom row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "10px", borderTop: `1px solid ${hov ? clip.tagColor + "22" : T.border}`,
          transition: "border-color 0.35s",
        }}>
          <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.68rem", color: hov ? clip.tagColor : T.muted, fontWeight: 600, transition: "color 0.28s" }}>
            View Full Clip
          </span>
          <div style={{
            width: "26px", height: "26px", borderRadius: "50%",
            background: hov ? `linear-gradient(135deg,${T.teal},${T.orange})` : `${clip.tagColor}12`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hov ? "rotate(45deg)" : "rotate(0)",
            transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          }}>
            <svg viewBox="0 0 10 10" fill="none" width="9" height="9">
              <path d="M2 5h6M5 2l3 3-3 3" stroke={hov ? T.white : clip.tagColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FEATURED LARGE CLIP ────────────────────────────────────── */
function FeaturedClip({ clip, vis, onClick }: { clip: Clip; vis: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const pub = PUB_STYLES[clip.pub] ?? { bg: T.dark, color: "#fff", font: "serif" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      className={vis ? "nc-feat-in" : "nc-feat"}
      style={{
        cursor: "pointer", borderRadius: "24px", overflow: "hidden",
        position: "relative",
        boxShadow: hov ? `0 28px 72px rgba(212,160,23,0.22)` : "0 8px 40px rgba(0,0,0,0.14)",
        transform: hov ? "translateY(-8px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.44s cubic-bezier(.22,1,.36,1)",
        minHeight: "420px", height: "100%", display: "flex", flexDirection: "column",
        background: T.dark,
      }}
    >
      {/* bg image */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img src={clip.src} alt={clip.headline}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(.22,1,.36,1)",
            filter: "brightness(0.42) saturate(0.9)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(165deg,rgba(13,30,40,0.3) 0%,rgba(13,30,40,0.92) 60%)` }} />
        <div style={{ position: "absolute", inset: 0, background: `${T.gold}0C` }} />
      </div>

      {/* top bars */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />

      {/* content */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", padding: "clamp(22px,3.5vw,32px)" }}>
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "auto" }}>
          <div style={{ padding: "4px 12px", borderRadius: "6px", background: pub.bg, fontFamily: pub.font, fontSize: "0.75rem", fontWeight: 700, color: pub.color }}>{clip.pub}</div>
          <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.38)", fontWeight: 300 }}>{clip.date}</span>
          <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: "100px", background: `${T.gold}22`, color: T.gold, border: `1px solid ${T.gold}45`, fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {clip.tag}
          </span>
        </div>

        {/* bottom content */}
        <div style={{ paddingTop: "clamp(80px,12vw,140px)" }}>
          {/* gold shimmer label */}
          <p style={{
            fontFamily: "'DM Sans',system-ui,sans-serif",
            fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
            color: T.gold, marginBottom: "10px",
          }}>
            ★ Featured Coverage
          </p>
          {/* <h2 style={{
            fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: "clamp(1.4rem,3.2vw,2.2rem)", fontWeight: 700,
            color: T.white, margin: "0 0 10px",
            lineHeight: 1.1, letterSpacing: "-0.4px",
          }}>{clip.headline}</h2> */}
          <p style={{
            fontFamily: "'DM Sans',system-ui,sans-serif",
            fontSize: "0.84rem", color: "rgba(255,255,255,0.55)",
            lineHeight: 1.75, fontWeight: 300, margin: "0 0 8px",
          }}>{clip.subline}</p>
          <p style={{
            fontFamily: "'DM Sans',system-ui,sans-serif",
            fontSize: "0.8rem", color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7, fontWeight: 300, margin: "0 0 22px",
            fontStyle: "italic",
          }}>{clip.highlight}</p>

          {/* CTA row */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "9px 20px", borderRadius: "100px",
              background: "linear-gradient(135deg,#2CCED1,#1ab8bb)",
              color: T.white,
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
              boxShadow: "0 4px 16px rgba(44,206,209,0.35)",
              transform: hov ? "translateY(-1px)" : "translateY(0)",
              transition: "transform 0.3s",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
              View Full Clip
            </div>
            <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", fontWeight: 300 }}>
              Click to enlarge
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function NewsClips() {
  const { ref, vis } = useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openClip = (idx: number) => setLightbox(idx);
  const closeClip = () => setLightbox(null);
  const prevClip = useCallback(() => setLightbox(i => i !== null ? (i - 1 + CLIPS.length) % CLIPS.length : null), []);
  const nextClip = useCallback(() => setLightbox(i => i !== null ? (i + 1) % CLIPS.length : null), []);

  const activeClip = lightbox !== null ? CLIPS[lightbox] : null;

  /* split: first clip is featured, rest are grid */
  const featured = CLIPS[5]; // Dainik Bhaskar Award — most prominent
  const gridClips = CLIPS.filter(c => c.id !== featured.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes nc-fadeUp  { from{opacity:0;transform:translateY(36px)}            to{opacity:1;transform:translateY(0)} }
        @keyframes nc-fadeL   { from{opacity:0;transform:translateX(-28px)}            to{opacity:1;transform:translateX(0)} }
        @keyframes nc-fadeR   { from{opacity:0;transform:translateX(28px)}             to{opacity:1;transform:translateX(0)} }
        @keyframes nc-lineW   { from{transform:scaleX(0)}                              to{transform:scaleX(1)} }
        @keyframes nc-cardIn  { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes nc-featIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes nc-orbit   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes nc-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes nc-pulse   { 0%,100%{opacity:.18;transform:scale(1)} 50%{opacity:.48;transform:scale(1.7)} }
        @keyframes nc-goldShimmer {
          0%{background-position:-200% center} 100%{background-position:200% center}
        }
        @keyframes nc-badgePop { from{opacity:0;transform:scale(0.7) rotate(-8deg)} to{opacity:1;transform:scale(1) rotate(0)} }

        .nc-vis .nc-ey   { animation: nc-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .nc-vis .nc-h2   { animation: nc-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .nc-vis .nc-sub  { animation: nc-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .nc-vis .nc-ln   { animation: nc-lineW  1.1s cubic-bezier(.22,1,.36,1) 0.10s both; transform-origin:left; }
        .nc-vis .nc-stat { animation: nc-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.26s both; }
        .nc-vis .nc-cta  { animation: nc-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.58s both; }
        .nc-vis .nc-left { animation: nc-fadeL  0.9s cubic-bezier(.22,1,.36,1) 0.14s both; }
        .nc-vis .nc-right{ animation: nc-fadeR  0.9s cubic-bezier(.22,1,.36,1) 0.20s both; }

        .nc-card    { opacity:0; transform:translateY(32px) scale(0.96); }
        .nc-card-in { animation: nc-cardIn 0.62s cubic-bezier(.22,1,.36,1) both; }
        .nc-feat    { opacity:0; transform:translateY(24px) scale(0.97); flex:1; }
        .nc-feat-in { animation: nc-featIn 0.8s cubic-bezier(.22,1,.36,1) 0.12s both; flex:1; }

        .nc-orbit-el  { animation: nc-orbit 22s linear infinite; }
        .nc-orbit-el2 { animation: nc-orbit 30s linear infinite reverse; }
        .nc-float-el  { animation: nc-float 6s ease-in-out infinite; }
        .nc-pulse-el  { animation: nc-pulse 3s ease-in-out infinite; }

        .nc-gold-text {
          background: linear-gradient(90deg,#c8820a,#f6d365,#fda085,#f6d365,#c8820a);
          background-size: 280% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: nc-goldShimmer 3.5s linear infinite;
        }

        .nc-badge-pop { animation: nc-badgePop 0.6s cubic-bezier(.34,1.56,.64,1) 0.5s both; }

        .nc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .nc-layout {
          display: grid;
          grid-template-columns: 1fr 1.85fr;
          gap: clamp(1.2rem,2.5vw,2rem);
          align-items: stretch;
          margin-bottom: clamp(2rem,4vw,3rem);
        }
        @media (max-width: 1060px) { .nc-layout { grid-template-columns: 1fr !important; } }
        @media (max-width: 900px)  { .nc-grid   { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .nc-grid   { grid-template-columns: 1fr !important; } }
      `}</style>

      <section
        ref={ref}
        className={vis ? "nc-vis" : ""}
        style={{
          background: T.bg,
          padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans',system-ui,sans-serif",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* ── BG DECOR ── */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "620px", height: "620px", borderRadius: "50%", background: "radial-gradient(circle,rgba(212,160,23,0.07) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-140px", left: "-140px", width: "540px", height: "540px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.07) 0%,transparent 60%)" }} />
          <div className="nc-orbit-el" style={{ position: "absolute", top: "7%", right: "5%", width: "250px", height: "250px", borderRadius: "50%", border: "1px dashed rgba(212,160,23,0.14)" }} />
          <div className="nc-orbit-el2" style={{ position: "absolute", bottom: "10%", left: "4%", width: "175px", height: "175px", borderRadius: "50%", border: "1px solid rgba(44,206,209,0.1)" }} />
          <div className="nc-float-el" style={{ position: "absolute", top: "35%", left: "7%", width: "7px", height: "7px", borderRadius: "50%", background: T.gold, opacity: 0.25 }} />
          <div className="nc-float-el" style={{ position: "absolute", top: "62%", right: "7%", width: "5px", height: "5px", borderRadius: "50%", background: T.teal, opacity: 0.22, animationDelay: "2.5s" }} />
          <div className="nc-pulse-el" style={{ position: "absolute", top: "24%", right: "24%", width: "4px", height: "4px", borderRadius: "50%", background: T.orange }} />
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.022 }} width="620" height="620">
            {Array.from({ length: 12 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 52 + 26} cy={r * 52 + 26} r="1.8" fill={T.ink} />
            )))}
          </svg>
        </div>

        <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ══ HEADER ══ */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="nc-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.gold : `${T.gold}45` }} />)}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.gold, fontWeight: 600 }}>Media Coverage · Press Recognition</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <div>
                <h2 className="nc-h2" style={{
                  fontFamily: "'Cormorant Garamond',Georgia,serif",
                  fontSize: "clamp(2.4rem,5.5vw,4.4rem)",
                  fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2px", margin: 0, color: T.dark,
                }}>
                  In The<br />
                  <em style={{ color: T.orange, fontStyle: "italic" }}>News</em>
                </h2>
              </div>
              <p className="nc-sub" style={{ maxWidth: "360px", fontSize: "0.9rem", lineHeight: 1.85, color: T.mid, fontWeight: 300, margin: 0 }}>
                Dr. Rakesh Sharma's surgical achievements, award recognitions and expert insights — as covered by Rajasthan's leading newspapers.
              </p>
            </div>

            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(0,0,0,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="nc-ln" style={{ height: "100%", background: `linear-gradient(90deg,${T.gold},${T.orange},${T.teal},transparent)`, borderRadius: "2px" }} />
            </div>
          </div>

          {/* ══ STAT ROW ══ */}
          <div className="nc-stat" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "clamp(2rem,4vw,3.5rem)" }}>
            {[
              { v: "7+",        l: "Press Features",         c: T.gold   },
              { v: "World 3rd", l: "Landmark Surgeries",     c: T.orange },
              { v: "Excellence in", l: "Complex Cancer Surgery in India",  c: T.teal  },
              { v: "2021",      l: "Healthcare Award",        c: T.gold  },
            ].map(({ v, l, c }, i) => (
              <div key={i} style={{
                flex: "1 1 140px",
                padding: "16px 18px", borderRadius: "16px",
                background: T.white, border: `1px solid ${T.border}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = `${c}40`; el.style.transform = "translateY(-4px)"; el.style.boxShadow = `0 12px 36px ${c}14`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.border; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 700, color: c, lineHeight: 1, letterSpacing: "-0.5px" }}>{v}</div>
                <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.18em", color: T.muted, marginTop: "5px" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* ══ FEATURED + SIDE GRID ══ */}
          <div className="nc-layout">
            {/* LEFT: featured clip */}
            <div className="nc-left" style={{ display: "flex", flexDirection: "column" }}>
              <FeaturedClip clip={featured} vis={vis} onClick={() => openClip(CLIPS.indexOf(featured))} />
            </div>

            {/* RIGHT: 2×3 grid */}
            <div className="nc-right nc-grid">
              {gridClips.map((clip, i) => (
                <ClipCard key={clip.id} clip={clip} idx={i} vis={vis} onClick={() => openClip(CLIPS.indexOf(clip))} />
              ))}
            </div>
          </div>

          {/* ══ BOTTOM CTA ══ */}
          <div
            className="nc-cta"
            style={{
              borderRadius: "20px", background: T.dark,
              padding: "clamp(22px,4vw,32px) clamp(22px,4vw,36px)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "20px", flexWrap: "wrap",
              position: "relative", overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,${T.gold},${T.orange},${T.teal})` }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/newspaper-clips/dr.rakeshsharma6.jpg)", backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.06 }} />
            <div style={{ position: "relative" }}>
              <p className="nc-gold-text" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                Recognised. Awarded. Trusted by Rajasthan.
              </p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.38)", margin: "5px 0 0", fontWeight: 300 }}>
                25+ years of clinical excellence — documented by Rajasthan's most trusted publications.
              </p>
            </div>
            <a href="/medical-services"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "8px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(44,206,209,0.34)", transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)", flexShrink: 0, position: "relative" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)"; el.style.boxShadow = "0 8px 28px rgba(255,138,91,0.38)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)"; el.style.boxShadow = "0 4px 16px rgba(44,206,209,0.34)"; }}
            >
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.75)" }} />
              Book Consultation
            </a>
          </div>

        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <Lightbox
        clip={activeClip}
        onClose={closeClip}
        onPrev={prevClip}
        onNext={nextClip}
      />
    </>
  );
}