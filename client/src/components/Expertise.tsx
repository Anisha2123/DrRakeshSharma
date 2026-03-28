"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── DATA ─────────────────────────────────────────────────── */
const specialties = [
  {
    id: 1,
    slug: "urological-care",
    title: "Urological Care",
    subtitle: "Comprehensive evaluation & treatment",
    tag: "Foundation",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80&auto=format&fit=crop",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.12)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <path d="M16 4C10 4 6 9 6 14c0 7 10 14 10 14s10-7 10-14c0-5-4-10-10-10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    overview: "Complete urological care covering the full spectrum of conditions affecting the urinary tract in men and women, and the male reproductive system.",
    details: [
      "Diagnostic cystoscopy & ureteroscopy",
      "Urinary tract infection management",
      "Bladder dysfunction & overactive bladder",
      "Urological oncology screening",
      "Incontinence evaluation & treatment",
      "Paediatric urology consultation",
    ],
    stat: { value: "9000+", label: "Patients Treated" },
  },
  {
    id: 2,
    slug: "prostate-disorder",
    title: "Prostate Disorder",
    subtitle: "Diagnosis, treatment & long-term care",
    tag: "Specialised",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80&auto=format&fit=crop",
    color: "#2CCED1",
    accent: "rgba(44,206,209,0.1)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <rect x="6" y="10" width="20" height="14" rx="7" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 10V8a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="16" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    overview: "Expert management of all prostate conditions — from benign enlargement to cancer — with a focus on minimally invasive approaches and preserving quality of life.",
    details: [
      "Benign prostatic hyperplasia (BPH) management",
      "Prostate cancer diagnosis & staging",
      "PSA screening & biopsy guidance",
      "Laser prostatectomy (HoLEP / TURP)",
      "Post-treatment surveillance",
      "Prostatitis & chronic pelvic pain",
    ],
    stat: { value: "689+", label: "Advanced Procedures" },
  },
  {
    id: 3,
    slug: "andrology-male-infertility",
    title: "Andrology & Male Infertility",
    subtitle: "Advanced reproductive urology",
    tag: "Advanced",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=900&q=80&auto=format&fit=crop",
    color: "#6B7FD4",
    accent: "rgba(107,127,212,0.1)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <circle cx="16" cy="14" r="7" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M21 9l4-4m0 0h-4m4 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 21v5M13 24h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    overview: "Comprehensive andrological care addressing male reproductive health challenges with advanced diagnostic tools and evidence-based treatments.",
    details: [
      "Semen analysis & sperm function testing",
      "Varicocele diagnosis & microsurgical repair",
      "Azoospermia evaluation & TESE/PESA",
      "Erectile dysfunction assessment & therapy",
      "Hormonal profiling & testosterone therapy",
      "Vasectomy & vasectomy reversal",
    ],
    stat: { value: "25+", label: "Years Experience" },
  },
  {
    id: 4,
    slug: "kidney-stone-management",
    title: "Kidney Stone Management",
    subtitle: "Precision stone clearance & prevention",
    tag: "High-Volume",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80&auto=format&fit=crop",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.12)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <path d="M10 8c-3 2-5 6-4 10s4 7 8 8c3 .5 7-.5 9-3s2-7 0-10c-1.5-2-4-4-7-4-2.5 0-5 1-6 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M14 14l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    overview: "End-to-end kidney stone care from rapid diagnosis to definitive removal and personalised metabolic prevention plans to eliminate recurrence.",
    details: [
      "CT-KUB & ultrasound stone mapping",
      "Shock-wave lithotripsy (ESWL)",
      "Flexible ureteroscopy & laser lithotripsy",
      "Percutaneous nephrolithotomy (PCNL)",
      "Mini / ultra-mini PCNL for complex stones",
      "24-hour urine metabolic profiling",
    ],
    stat: { value: "470+", label: "Compact Surgeries" },
  },
  {
    id: 5,
    slug: "minimally-invasive-laser",
    title: "Minimally Invasive & Laser",
    subtitle: "Faster recovery, superior precision",
    tag: "Technology",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=900&q=80&auto=format&fit=crop",
    color: "#2CCED1",
    accent: "rgba(44,206,209,0.1)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <path d="M8 24L20 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 24c-2 2-2 0-2-2s2-4 4-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    overview: "State-of-the-art laparoscopic and laser procedures that dramatically reduce hospital stay, blood loss and recovery time across a full range of urological conditions.",
    details: [
      "Holmium YAG & Thulium fibre laser surgery",
      "Laparoscopic nephrectomy & pyeloplasty",
      "Robotic-assisted urological surgery",
      "Single-incision laparoscopic procedures",
      "Laser BPH treatment (HoLEP)",
      "Day-care urological procedures",
    ],
    stat: { value: "100%", label: "Minimally Invasive First" },
  },
  {
    id: 6,
    slug: "kidney-transplantation",
    title: "Kidney Transplantation",
    subtitle: "Life-restoring renal replacement",
    tag: "Complex",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80&auto=format&fit=crop",
    color: "#E8805A",
    accent: "rgba(232,128,90,0.1)",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="26" height="26">
        <path d="M8 10c0-3 2-6 5-6 2 0 3 1 3 3 0 2-1 3-1 5s1 4 4 5c2 .7 4 0 5-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M24 10c0 6-4 12-8 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 10c0 6 4 12 8 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    overview: "Comprehensive renal transplant programme covering donor evaluation, surgical placement, immunosuppression management and long-term graft surveillance.",
    details: [
      "Living & deceased donor transplantation",
      "Pre-transplant workup & panel reactive antibody testing",
      "Laparoscopic donor nephrectomy",
      "ABO-incompatible transplantation protocols",
      "Immunosuppression & rejection management",
      "Long-term transplant nephrology follow-up",
    ],
    stat: { value: "Life", label: "Changing Outcomes" },
  },
];

/* ─── MODAL COMPONENT ──────────────────────────────────────── */
function Modal({
  item,
  onClose,
}: {
  item: (typeof specialties)[0] | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (item) {
      setTimeout(() => setMounted(true), 10);
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  const handleClose = useCallback(() => {
    setMounted(false);
    setTimeout(onClose, 380);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  if (!item) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: mounted ? "rgba(10,10,10,0.55)" : "rgba(10,10,10,0)",
        backdropFilter: mounted ? "blur(8px)" : "blur(0px)",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.22)",
          transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
          opacity: mounted ? 1 : 0,
          transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Image Hero */}
        <div style={{ position: "relative", height: "220px", flexShrink: 0, overflow: "hidden" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transform: mounted ? "scale(1)" : "scale(1.08)",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72) 100%)`,
          }} />
          {/* Tag */}
          <span style={{
            position: "absolute", top: "20px", left: "20px",
            background: item.color, color: "#fff",
            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", padding: "5px 12px", borderRadius: "100px",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {item.tag}
          </span>
          {/* Close btn */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute", top: "16px", right: "16px",
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "sans-serif", lineHeight: 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          >
            ✕
          </button>
          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "24px" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#fff", fontSize: "1.8rem", fontWeight: 700,
              margin: 0, letterSpacing: "-0.5px", lineHeight: 1.1,
            }}>
              {item.title}
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.75)", fontSize: "0.82rem",
              margin: "4px 0 0", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
            }}>
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 28px 32px", overflowY: "auto" }}>
          {/* Stat pill */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: item.accent, borderRadius: "100px",
              padding: "7px 16px",
              border: `1px solid ${item.color}30`,
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: item.color, fontSize: "1.15rem", fontWeight: 700 }}>
                {item.stat.value}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {item.stat.label}
              </span>
            </div>
          </div>

          {/* Overview */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem",
            lineHeight: 1.8, color: "#555", fontWeight: 300,
            marginBottom: "24px",
          }}>
            {item.overview}
          </p>

          {/* Divider */}
          <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "20px" }} />

          {/* Details list */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem",
            textTransform: "uppercase", letterSpacing: "0.22em",
            color: "#aaa", fontWeight: 600, marginBottom: "14px",
          }}>
            What We Treat
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {item.details.map((d, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "8px",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem",
                color: "#333", lineHeight: 1.5,
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: item.color, flexShrink: 0, marginTop: "7px",
                }} />
                {d}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button style={{
            marginTop: "28px", width: "100%",
            padding: "14px", borderRadius: "14px", border: "none",
            background: item.color, color: "#fff",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
            fontSize: "0.88rem", letterSpacing: "0.04em", cursor: "pointer",
            transition: "opacity 0.2s, transform 0.2s",
            boxShadow: `0 8px 32px ${item.color}45`,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            Book a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CARD COMPONENT ───────────────────────────────────────── */
function SpecialtyCard({
  item,
  index,
  visible,
  onClick,
}: {
  item: (typeof specialties)[0];
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`specialty-card ${visible ? "card-visible" : ""}`}
      style={{
        animationDelay: `${0.1 + index * 0.09}s`,
        cursor: "pointer",
        borderRadius: "20px",
        overflow: "hidden",
        background: "#fff",
        border: hovered ? `1px solid ${item.color}40` : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? `0 24px 60px ${item.color}20, 0 4px 16px rgba(0,0,0,0.06)`
          : "0 2px 16px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? `linear-gradient(to bottom, ${item.color}25 0%, rgba(0,0,0,0.45) 100%)`
            : "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.35) 100%)",
          transition: "background 0.4s ease",
        }} />
        {/* Tag top-left */}
        <span style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
          color: item.color, fontSize: "0.6rem", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
          fontFamily: "'DM Sans', sans-serif",
          border: `1px solid ${item.color}30`,
        }}>
          {item.tag}
        </span>
        {/* Index number top-right */}
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          color: "rgba(255,255,255,0.6)", fontSize: "0.7rem",
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
        }}>
          0{index + 1}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Icon + Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: item.accent, display: "flex", alignItems: "center",
            justifyContent: "center", color: item.color, flexShrink: 0,
            border: `1px solid ${item.color}25`,
            transform: hovered ? "rotate(-5deg) scale(1.05)" : "rotate(0deg) scale(1)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}>
            {item.icon}
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem", fontWeight: 700, color: "#1a1a1a",
              margin: 0, lineHeight: 1.2, letterSpacing: "-0.3px",
            }}>
              {item.title}
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem", color: "#999", margin: "3px 0 0",
              fontWeight: 400, lineHeight: 1.3,
            }}>
              {item.subtitle}
            </p>
          </div>
        </div>

        {/* Divider line animated on hover */}
        <div style={{
          height: "1px", marginBottom: "12px",
          background: `linear-gradient(90deg, ${item.color}${hovered ? "60" : "20"} 0%, transparent 100%)`,
          transition: "background 0.4s ease",
        }} />

        {/* Quick list preview */}
        <div style={{ flex: 1 }}>
          {item.details.slice(0, 3).map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "6px",
              opacity: hovered ? 1 : 0.75,
              transform: hovered ? `translateX(${i * 2}px)` : "translateX(0)",
              transition: `all 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s`,
            }}>
              <span style={{
                width: "4px", height: "4px", borderRadius: "50%",
                background: item.color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
                color: "#555", lineHeight: 1.4, fontWeight: 300,
              }}>
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: "16px", display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
            color: item.color, fontWeight: 600, letterSpacing: "0.04em",
            opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s",
          }}>
            View Details
          </span>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: hovered ? item.color : item.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
            transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
          }}>
            <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
              <path d="M3 8h10M8 3l5 5-5 5" stroke={hovered ? "#fff" : item.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ───────────────────────────────────────── */
export default function AreasOfExpertise() {
  const [visible, setVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<(typeof specialties)[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --orange: #FF8A5B;
          --teal: #2CCED1;
          --bg: #F4F4F4;
          --white: #FFFFFF;
          --dark: #1C1C1C;
        }

        @keyframes cardFadeUp {
          from { opacity: 0; transform: translateY(36px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes headingReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes floatBg {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .specialty-card {
          opacity: 0;
          transform: translateY(36px) scale(0.97);
        }
        .card-visible {
          animation: cardFadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .section-header-visible .heading-line {
          animation: headingReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .section-header-visible .eyebrow-line {
          animation: headingReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s forwards;
          opacity: 0;
        }
        .section-header-visible .sub-line {
          animation: headingReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.18s forwards;
          opacity: 0;
        }
        .section-header-visible .divider-line {
          animation: lineGrow 1s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
          transform-origin: left;
          transform: scaleX(0);
        }

        .float-bg { animation: floatBg 8s ease-in-out infinite; }
        .rotate-bg { animation: rotateSlow 25s linear infinite; }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={visible ? "section-header-visible" : ""}
        style={{
          background: "var(--bg)",
          padding: "clamp(4rem, 9vw, 8rem) clamp(1.25rem, 6vw, 4rem)",
          fontFamily: "'DM Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background decorations ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="float-bg" style={{
            position: "absolute", top: "-100px", right: "-100px",
            width: "500px", height: "500px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,138,91,0.08) 0%, transparent 65%)",
          }} />
          <div className="float-bg" style={{
            position: "absolute", bottom: "-80px", left: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(44,206,209,0.07) 0%, transparent 65%)",
            animationDelay: "3s",
          }} />
          <div className="rotate-bg" style={{
            position: "absolute", top: "10%", left: "5%",
            width: "200px", height: "200px", borderRadius: "50%",
            border: "1px dashed rgba(255,138,91,0.15)",
          }} />
          <div className="rotate-bg" style={{
            position: "absolute", bottom: "15%", right: "4%",
            width: "140px", height: "140px", borderRadius: "50%",
            border: "1px solid rgba(44,206,209,0.12)",
            animationDirection: "reverse", animationDuration: "18s",
          }} />
          {/* Grid dots pattern */}
          <svg style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.025 }} width="600" height="600">
            {Array.from({ length: 12 }).map((_, row) =>
              Array.from({ length: 12 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 50 + 25} cy={row * 50 + 25} r="2" fill="#1C1C1C" />
              ))
            )}
          </svg>
        </div>

        <div style={{ maxWidth: "1160px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Section Header ── */}
          <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            {/* Eyebrow */}
            <div className="eyebrow-line" style={{
              display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
            }}>
              <span style={{ width: "32px", height: "2px", background: "var(--orange)", borderRadius: "2px" }} />
              <span style={{
                fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.3em",
                color: "var(--orange)", fontWeight: 600,
              }}>
                Clinical Specialisations
              </span>
            </div>

            {/* Main heading */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="heading-line" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700, color: "var(--dark)",
                margin: 0, lineHeight: 1.05, letterSpacing: "-1.5px",
              }}>
                Areas of<br />
                <span style={{ color: "var(--orange)", fontStyle: "italic" }}>Expertise</span>
              </h2>
              <p className="sub-line" style={{
                maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.8,
                color: "#777", fontWeight: 300, margin: 0,
              }}>
                Precision-driven urological care across six core disciplines — combining clinical excellence with compassionate patient management.
              </p>
            </div>

            {/* Divider */}
            <div style={{ marginTop: "28px", height: "1.5px", background: "#e4e4e4", borderRadius: "2px", overflow: "hidden" }}>
              <div className="divider-line" style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--orange), var(--teal), transparent)",
              }} />
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div className="cards-grid">
            {specialties.map((item, i) => (
              <SpecialtyCard
                key={item.id}
                item={item}
                index={i}
                visible={visible}
                onClick={() => setActiveModal(item)}
              />
            ))}
          </div>

          {/* ── Bottom strip ── */}
          <div style={{
            marginTop: "clamp(3rem, 5vw, 4rem)",
            padding: "24px 32px",
            background: "#fff",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}>
            <div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem", fontWeight: 700, color: "var(--dark)",
                margin: 0,
              }}>
                Not sure which speciality you need?
              </p>
              <p style={{
                fontSize: "0.82rem", color: "#888", margin: "4px 0 0",
                fontWeight: 300, lineHeight: 1.5,
              }}>
                Book a general consultation — Dr. Sharma will guide you to the right treatment path.
              </p>
            </div>
            <button style={{
              padding: "13px 28px", borderRadius: "14px", border: "none",
              background: "var(--dark)", color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              fontSize: "0.88rem", letterSpacing: "0.04em", cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              flexShrink: 0,
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--orange)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(255,138,91,0.35)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--dark)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)";
              }}
            >
              Book Consultation →
            </button>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <Modal item={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}