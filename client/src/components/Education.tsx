"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── PALETTE ───────────────────────────────────────────────── */
const C = {
  bg: "#F4F4F4",
  white: "#FFFFFF",
  dark: "#111111",
  orange: "#FF8A5B",
  teal: "#2CCED1",
  gold: "#D4A017",
  goldLight: "#F6D365",
  ink: "#222222",
  muted: "#888888",
  border: "rgba(0,0,0,0.08)",
};

/* ─── DATA ───────────────────────────────────────────────────── */
interface Degree {
  id: number;
  abbr: string;
  full: string;
  field: string;
  institution: string;
  city: string;
  university: string;
  isGold?: boolean;
  color: string;
  img: string;
  year: string;
  highlights: string[];
}
interface Role {
  id: number;
  title: string;
  dept: string;
  hospital: string;
  city: string;
  type: "Clinical" | "Academic";
  color: string;
  img: string;
  points: string[];
}

const degrees: Degree[] = [
  {
    id: 1, abbr: "MBBS", full: "Bachelor of Medicine & Bachelor of Surgery",
    field: "Medicine & Surgery",
    institution: "Sawai Man Singh (SMS) Medical College", city: "Jaipur, Rajasthan",
    university: "Rajasthan University", color: C.orange,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop",
    year: "Undergraduate",
    highlights: [
      "Comprehensive medical training at Rajasthan's most prestigious public medical college",
      "Clinical rotations across all major disciplines — surgery, medicine, paediatrics, OBG",
      "Foundation in anatomy, physiology, pharmacology and clinical reasoning",
      "Affiliated to Rajasthan University — the apex academic body of the state",
    ],
  },
  {
    id: 2, abbr: "M.S.", full: "Master of Surgery",
    field: "General Surgery",
    institution: "N.H.L.M Medical College", city: "Ahmedabad, Gujarat",
    university: "Gujarat University", color: C.teal,
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
    year: "Post-Graduate",
    highlights: [
      "Advanced surgical training at a leading western-India institution",
      "Intensive exposure to elective and emergency operative procedures",
      "Academic curriculum aligned with Gujarat University post-graduate standards",
      "Developed core operative skills across gastrointestinal, vascular and trauma surgery",
    ],
  },
  {
    id: 3, abbr: "M.Ch.", full: "Magister Chirurgiae",
    field: "Urology — Super-Speciality",
    institution: "R.G. Kar Medical College & Hospital", city: "Kolkata, West Bengal",
    university: "University of Calcutta", isGold: true, color: C.gold,
    img: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80&auto=format&fit=crop",
    year: "Super-Specialist",
    highlights: [
      "Super-speciality degree in Urology — pinnacle of surgical sub-specialisation in India",
      "Awarded the prestigious Gold Medal for outstanding academic & clinical performance",
      "R.G. Kar Medical College — one of India's oldest and most respected teaching hospitals",
      "Advanced training in endourology, laparoscopy, and renal transplantation",
    ],
  },
  {
    id: 4, abbr: "DNB", full: "Diplomate of National Board",
    field: "National Board Certification",
    institution: "National Board of Examinations", city: "New Delhi, India",
    university: "Ministry of Health & Family Welfare", color: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&q=80&auto=format&fit=crop",
    year: "Board Certified",
    highlights: [
      "National-level certification — the highest mark of medical competency in India",
      "Rigorous multi-stage examination conducted by the National Board of Examinations",
      "Equivalent to post-graduate degree as per NMC standards",
      "Demonstrates mastery of clinical knowledge, diagnostic reasoning and patient care",
    ],
  },
];

const roles: Role[] = [
  {
    id: 1, title: "Senior Resident",
    dept: "Department of Renal Transplant",
    hospital: "S.M.S. Medical College & Hospital", city: "Jaipur, Rajasthan",
    type: "Clinical", color: C.orange,
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80&auto=format&fit=crop",
    points: [
      "Pre- and post-transplant patient workup and clinical care",
      "Assisted in live donor & cadaveric kidney transplant surgeries",
      "Immunosuppression protocol management and rejection surveillance",
      "Patient and family counselling for renal replacement therapy",
    ],
  },
  {
    id: 2, title: "Senior Resident (PDT)",
    dept: "Department of Urology",
    hospital: "R.G. Kar Medical College & Hospital", city: "Kolkata, India",
    type: "Clinical", color: C.teal,
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
    points: [
      "Post-doctoral training in advanced endoscopic and laparoscopic urology",
      "Independent management of complex urological malignancies",
      "Flexible ureteroscopy, PCNL, and laser lithotripsy procedures",
      "Teaching rounds, case presentations and academic departmental activities",
    ],
  },
  {
    id: 3, title: "Assistant Professor",
    dept: "Department of Urology & Renal Transplant",
    hospital: "S.M.S. Medical College & Hospital", city: "Jaipur, Rajasthan",
    type: "Academic", color: C.gold,
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    points: [
      "Teaching and mentoring M.Ch. Urology post-graduate residents",
      "Conducting independent urological surgeries and renal transplants",
      "Academic research, publications and conference contributions",
      "Departmental curriculum development and administrative responsibilities",
    ],
  },
];

/* ─── MODAL ─────────────────────────────────────────────────── */
type ModalPayload = { kind: "degree"; data: Degree } | { kind: "role"; data: Role } | null;

function Modal({ payload, onClose }: { payload: ModalPayload; onClose: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (payload) { document.body.style.overflow = "hidden"; setTimeout(() => setShow(true), 12); }
    return () => { document.body.style.overflow = ""; };
  }, [payload]);
  const close = useCallback(() => { setShow(false); setTimeout(onClose, 360); }, [onClose]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close]);
  if (!payload) return null;

  const isDeg = payload.kind === "degree";
  const color = isDeg ? payload.data.color : payload.data.color;
  const img   = isDeg ? payload.data.img   : payload.data.img;
  const title = isDeg ? payload.data.full  : payload.data.title;
  const sub   = isDeg ? payload.data.field : payload.data.dept;
  const list  = isDeg ? payload.data.highlights : payload.data.points;

  return (
    <div onClick={e => e.target === e.currentTarget && close()} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      background: show ? "rgba(0,0,0,0.52)" : "rgba(0,0,0,0)",
      backdropFilter: show ? "blur(12px)" : "blur(0px)",
      transition: "all 0.36s cubic-bezier(0.22,1,0.36,1)",
      padding: "0",
    }}>
      <div style={{
        width: "100%", maxWidth: "680px",
        background: C.white,
        borderRadius: "28px 28px 0 0",
        overflow: "hidden",
        maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        transform: show ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: "0 -24px 80px rgba(0,0,0,0.18)",
      }}>
        {/* drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.12)" }} />
        </div>
        {/* hero */}
        <div style={{ position: "relative", height: "200px", flexShrink: 0, overflow: "hidden", margin: "12px 20px 0", borderRadius: "18px" }}>
          <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}55 0%, rgba(0,0,0,0.6) 100%)`, borderRadius: "18px" }} />
          {isDeg && payload.data.isGold && (
            <div style={{
              position: "absolute", top: "14px", left: "14px",
              background: "linear-gradient(135deg,#f6d365,#fda085)",
              borderRadius: "100px", padding: "4px 12px 4px 8px",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <span style={{ fontSize: "14px" }}>🥇</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7a4a00" }}>Gold Medallist</span>
            </div>
          )}
          <button onClick={close} style={{
            position: "absolute", top: "12px", right: "12px",
            width: "32px", height: "32px", borderRadius: "50%",
            background: "rgba(255,255,255,0.22)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", cursor: "pointer", fontSize: "0.85rem",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
          <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#fff", fontSize: "1.6rem", fontWeight: 700, margin: 0, letterSpacing: "-0.4px", lineHeight: 1.1 }}>{title}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "0.8rem", margin: "4px 0 0", fontWeight: 300 }}>{sub}</p>
          </div>
        </div>
        {/* body */}
        <div style={{ padding: "22px 24px 32px", overflowY: "auto", flex: 1 }}>
          {/* meta pill row */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "18px" }}>
            {[
              isDeg ? payload.data.institution : payload.data.hospital,
              isDeg ? payload.data.university  : payload.data.city,
            ].map((txt, i) => (
              <span key={i} style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", fontWeight: 500,
                padding: "4px 12px", borderRadius: "100px",
                background: i === 0 ? `${color}12` : "rgba(0,0,0,0.05)",
                color: i === 0 ? color : C.muted,
                border: `1px solid ${i === 0 ? color + "25" : "rgba(0,0,0,0.08)"}`,
              }}>{txt}</span>
            ))}
          </div>
          <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginBottom: "18px" }} />
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "#bbb", fontWeight: 600, marginBottom: "14px" }}>
            {isDeg ? "Key Highlights" : "Responsibilities"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {list.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: `${color}15`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#444", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
          <button onClick={close} style={{
            marginTop: "24px", width: "100%", padding: "14px",
            borderRadius: "14px", border: "none", cursor: "pointer",
            background: C.dark, color: "#fff",
            fontFamily: "'DM Sans',sans-serif", fontWeight: 600,
            fontSize: "0.88rem", letterSpacing: "0.04em",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = color)}
            onMouseLeave={e => (e.currentTarget.style.background = C.dark)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── DEGREE NODE (big horizontal card) ────────────────────── */
function DegreeNode({ d, idx, visible, onClick }: { d: Degree; idx: number; visible: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`deg-node ${visible ? "deg-show" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${idx * 0.12}s`,
        cursor: "pointer", position: "relative",
        display: "flex", flexDirection: "column",
        width: "260px", flexShrink: 0,
        background: hov ? d.color : C.white,
        borderRadius: "20px", overflow: "hidden",
        border: hov ? `1px solid ${d.color}` : `1px solid ${C.border}`,
        boxShadow: hov ? `0 20px 60px ${d.color}30` : "0 2px 20px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.42s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* image */}
      <div style={{ height: "160px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img src={d.img} alt={d.full} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)", filter: hov ? "brightness(0.6)" : "brightness(0.75)" }} />
        <div style={{ position: "absolute", inset: 0, background: hov ? `${d.color}70` : "linear-gradient(to bottom,transparent 30%,rgba(0,0,0,0.45) 100%)" }} />
        {/* year badge */}
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.16em",
          padding: "3px 10px", borderRadius: "100px",
          background: hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.88)",
          color: hov ? "#fff" : d.color,
          backdropFilter: "blur(6px)",
        }}>{d.year}</span>
        {/* gold star */}
        {d.isGold && <div className="gold-spin" style={{ position: "absolute", top: "12px", left: "12px", fontSize: "18px" }}>🥇</div>}
        {/* abbr */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 700, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{d.abbr}</span>
        </div>
      </div>
      {/* text body */}
      <div style={{ padding: "16px 18px 18px", flex: 1 }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.25, margin: "0 0 5px", color: hov ? "#fff" : C.ink, transition: "color 0.3s" }}>{d.full}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", margin: "0 0 10px", color: hov ? "rgba(255,255,255,0.7)" : C.muted, transition: "color 0.3s" }}>{d.institution}</p>
        <div style={{ height: "1px", background: hov ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.07)", marginBottom: "10px", transition: "background 0.3s" }} />
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: hov ? "rgba(255,255,255,0.6)" : "#aaa", margin: 0, transition: "color 0.3s" }}>{d.city}</p>
        <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", fontWeight: 600, color: hov ? "rgba(255,255,255,0.9)" : d.color, transition: "color 0.3s" }}>View Details</span>
          <div style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: hov ? "rgba(255,255,255,0.2)" : `${d.color}15`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: hov ? "rotate(45deg)" : "rotate(0)",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <svg viewBox="0 0 14 14" fill="none" width="11" height="11">
              <path d="M2 7h10M7 2l5 5-5 5" stroke={hov ? "#fff" : d.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ROLE ROW ───────────────────────────────────────────────── */
function RoleRow({ r, idx, visible, onClick }: { r: Role; idx: number; visible: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`role-row ${visible ? "role-show" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${0.25 + idx * 0.12}s`,
        cursor: "pointer", display: "flex", overflow: "hidden",
        borderRadius: "18px", background: C.white,
        border: hov ? `1px solid ${r.color}40` : `1px solid ${C.border}`,
        boxShadow: hov ? `0 16px 48px ${r.color}18` : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hov ? "translateX(8px)" : "translateX(0)",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
        flex: 1,
        minHeight: "120px",
      }}
    >
      {/* color strip */}
      <div style={{ width: "4px", flexShrink: 0, background: hov ? r.color : `${r.color}40`, transition: "background 0.3s" }} />
      {/* image */}
      <div style={{ width: "100px", flexShrink: 0, overflow: "hidden", position: "relative" }}>
        <img src={r.img} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.72)", transform: hov ? "scale(1.07)" : "scale(1)", transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right,transparent,${r.color}30)` }} />
        <div style={{
          position: "absolute", bottom: "10px", left: "8px",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.55rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.8)",
          writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)",
        }}>{r.type}</div>
      </div>
      {/* text */}
      <div style={{ flex: 1, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "5px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.2 }}>{r.title}</h3>
          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.58rem", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.14em",
            color: r.color, background: `${r.color}12`,
            border: `1px solid ${r.color}25`,
            padding: "3px 9px", borderRadius: "100px", flexShrink: 0,
          }}>{r.type}</span>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.74rem", color: r.color, fontWeight: 600, margin: "0 0 4px" }}>{r.dept}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: C.muted, margin: "0 0 10px", fontWeight: 300 }}>{r.hospital} · {r.city}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {r.points.slice(0, 2).map((pt, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px", flex: "1 1 46%" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: r.color, flexShrink: 0, marginTop: "6px" }} />
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#555", lineHeight: 1.5, fontWeight: 300 }}>{pt}</span>
            </div>
          ))}
        </div>
      </div>
      {/* arrow */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 18px", flexShrink: 0 }}>
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16" style={{ opacity: hov ? 1 : 0.3, transform: hov ? "translateX(3px)" : "translateX(0)", transition: "all 0.3s" }}>
          <path d="M3 8h10M8 3l5 5-5 5" stroke={r.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─── CERTIFICATES DATA ──────────────────────────────────────── */
const CERTS = [
  {
    id: 1,
    src: "/certifications/c1.jpg.jpeg",
    label: "University Gold Medal",
    sub: "M.Ch. Urology · 2015",
    issuer: "West Bengal University of Health Sciences",
    tag: "🥇 Gold Medal",
    tagColor: C.gold,
    accent: C.gold,
    year: "2015",
    detail: "Awarded the prestigious University Gold Medal for securing the highest position in the M.Ch. Urology examination — The West Bengal University of Health Sciences, 2015.",
  },
  {
    id: 2,
    src: "/certifications/c2.jpg.jpeg",
    label: "Certificate of Registration",
    sub: "Rajasthan Medical Council · 2017",
    issuer: "Rajasthan Medical Council, Jaipur",
    tag: "RMC Registered",
    tagColor: C.teal,
    accent: C.teal,
    year: "2017",
    detail: "Official medical registration with the Rajasthan Medical Council confirming qualification M.Ch. (Urology) from P.G. Kar Medical College, Kolkata — West Bengal University of Health Sciences.",
  },
  {
    id: 3,
    src: "/certifications/c3.jpg.jpeg",
    label: "Degree Certificate — M.Ch.",
    sub: "Master of Chirurgie · Urology",
    issuer: "West Bengal University of Health Sciences",
    tag: "Super-Specialist",
    tagColor: C.orange,
    accent: C.orange,
    year: "2016",
    detail: "Official degree certificate confirming Rakesh Sharma obtained the degree of Master of Chirurgie (M.Ch.) in Urology from The West Bengal University of Health Sciences in the year 2015.",
  },
];

/* ─── CERT LIGHTBOX ──────────────────────────────────────────── */
function CertLightbox({ cert, onClose, onPrev, onNext }: {
  cert: typeof CERTS[0] | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [show, setShow] = useState(false);
  const closing = useRef(false);

  /* animate in when cert arrives */
  useEffect(() => {
    if (cert) {
      closing.current = false;
      document.body.style.overflow = "hidden";
      setTimeout(() => setShow(true), 10);
    }
  }, [cert]);

  /* animated close — sets show=false, waits, then calls onClose */
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setShow(false);
    setTimeout(() => {
      onClose();
      closing.current = false;
    }, 400);
  }, [onClose]);

  useEffect(() => {
    if (!cert) { document.body.style.overflow = ""; }
  }, [cert]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowRight")  onNext();
      if (e.key === "ArrowLeft")   onPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [close, onNext, onPrev]);

  if (!cert) return null;

  const btnBase: React.CSSProperties = {
    width: "40px", height: "40px", borderRadius: "50%",
    background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)",
    border: "1.5px solid rgba(255,255,255,0.25)",
    color: "#fff", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1rem", fontWeight: 400,
    transition: "background 0.22s, transform 0.22s, border-color 0.22s",
    position: "absolute", zIndex: 3,
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && close()}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        background: show ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0)",
        backdropFilter: show ? "blur(16px)" : "blur(0px)",
        transition: "all 0.38s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{
        width: "100%", maxWidth: "820px",
        display: "flex", flexDirection: "column",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1) translateY(0)" : "scale(0.93) translateY(28px)",
        transition: "all 0.44s cubic-bezier(0.22,1,0.36,1)",
      }}>

        {/* ── TOP META BAR ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: "100px",
            background: `${cert.accent}22`, color: cert.accent,
            border: `1px solid ${cert.accent}40`,
          }}>{cert.tag}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>{cert.issuer}</span>

          {/* dot nav in top bar */}
          <div style={{ marginLeft: "auto", display: "flex", gap: "6px", alignItems: "center" }}>
            {CERTS.map(c => (
              <div key={c.id} style={{
                width: c.id === cert.id ? "18px" : "6px", height: "6px", borderRadius: "3px",
                background: c.id === cert.id ? cert.accent : "rgba(255,255,255,0.25)",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
        </div>

        {/* ── IMAGE AREA ── */}
        <div style={{ borderRadius: "18px", overflow: "hidden", background: "#111", position: "relative" }}>
          <img
            src={cert.src}
            alt={cert.label}
            style={{ width: "100%", maxHeight: "68vh", objectFit: "contain", display: "block" }}
          />

          {/* ✕ CLOSE — top-right, big and obvious */}
          <button
            onClick={close}
            aria-label="Close"
            style={{ ...btnBase, top: "14px", right: "14px",
              background: "rgba(200,40,40,0.75)", borderColor: "rgba(255,120,120,0.4)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(220,40,40,0.95)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,40,40,0.75)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
              <path d="M2 2l10 10M12 2L2 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* ← PREV — left mid */}
          <button
            onClick={onPrev}
            aria-label="Previous"
            style={{ ...btnBase, left: "14px", top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(44,206,209,0.65)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.60)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
              <path d="M9 2L4 7l5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* → NEXT — right mid */}
          <button
            onClick={onNext}
            aria-label="Next"
            style={{ ...btnBase, right: "14px", top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(44,206,209,0.65)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.60)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
              <path d="M5 2l5 5-5 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── CAPTION + CLOSE PILL ── */}
        <div style={{
          marginTop: "12px", padding: "15px 18px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: "0 0 3px", lineHeight: 1.2 }}>{cert.label}</h3>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", margin: "0 0 5px", fontWeight: 300, lineHeight: 1.6 }}>{cert.detail}</p>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", color: cert.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>{cert.sub}</span>
          </div>

          {/* prominent CLOSE button in caption */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              flexShrink: 0,
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 22px", borderRadius: "100px",
              background: "rgba(200,40,40,0.18)",
              border: "1.5px solid rgba(220,60,60,0.45)",
              color: "#ff8a8a",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.8rem", fontWeight: 700,
              letterSpacing: "0.06em", cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "rgba(220,40,40,0.85)";
              b.style.borderColor = "rgba(255,100,100,0.6)";
              b.style.color = "#fff";
              b.style.transform = "scale(1.04)";
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = "rgba(200,40,40,0.18)";
              b.style.borderColor = "rgba(220,60,60,0.45)";
              b.style.color = "#ff8a8a";
              b.style.transform = "scale(1)";
            }}
          >
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/* ─── CERTIFICATES GALLERY ───────────────────────────────────── */
function CertificatesGallery({ visible }: { visible: boolean }) {
  const [activeCert, setActiveCert] = useState<number | null>(null);
  const openCert = (id: number) => setActiveCert(id);
  const closeCert = () => setActiveCert(null);
  const prevCert = useCallback(() =>
    setActiveCert(id => id !== null ? ((CERTS.findIndex(c => c.id === id) - 1 + CERTS.length) % CERTS.length) + 1 : null), []);
  const nextCert = useCallback(() =>
    setActiveCert(id => id !== null ? ((CERTS.findIndex(c => c.id === id) + 1) % CERTS.length) + 1 : null), []);

  const activeCertData = activeCert !== null ? CERTS.find(c => c.id === activeCert) ?? null : null;

  return (
    <>
      <style>{`
        @keyframes eq-certIn { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        .eq-cert-card { opacity:0; transform:translateY(28px) scale(0.96); }
        .eq-cert-show { animation: eq-certIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .eq-cert-card:hover .eq-cert-img { transform: scale(1.05); filter: brightness(0.75) saturate(1.1); }
        .eq-cert-card:hover .eq-cert-overlay { opacity: 1; }
        .eq-cert-card:hover .eq-cert-zoom { opacity: 1; transform: scale(1.08) rotate(-6deg); }
        .eq-cert-img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease; filter: brightness(0.88) saturate(0.9); }
        .eq-cert-overlay { position:absolute; inset:0; background: rgba(0,0,0,0.35); opacity:0; transition: opacity 0.35s ease; display:flex; align-items:center; justify-content:center; }
        .eq-cert-zoom { opacity:0; transform:scale(1) rotate(0); transition: all 0.38s cubic-bezier(0.34,1.56,0.64,1); }
      `}</style>

      {/* section header */}
      <div style={{ marginBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{ width: "28px", height: "2px", background: C.gold, borderRadius: "2px", display: "inline-block" }} />
          <span style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.32em", color: C.gold, fontWeight: 600 }}>Official Credentials</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, color: C.dark, margin: 0, letterSpacing: "-1px", lineHeight: 1.05 }}>
            Certificates &{" "}
            <em style={{ color: C.gold, fontStyle: "italic" }}>Credentials</em>
          </h3>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: C.muted, fontWeight: 300, margin: 0, maxWidth: "320px" }}>
            Click any certificate to view the full document
          </p>
        </div>
        <div style={{ marginTop: "20px", height: "1.5px", background: "rgba(0,0,0,0.07)", overflow: "hidden", borderRadius: "2px" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg,${C.gold},${C.orange},transparent)`, width: visible ? "100%" : "0%", transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s" }} />
        </div>
      </div>

      {/* 3-card grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(12px,2vw,20px)",
        marginBottom: "clamp(3rem,6vw,5rem)",
      }}>
        {CERTS.map((cert, i) => (
          <div
            key={cert.id}
            onClick={() => openCert(cert.id)}
            className={`eq-cert-card ${visible ? "eq-cert-show" : ""}`}
            style={{
              animationDelay: `${i * 0.1 + 0.12}s`,
              cursor: "pointer",
              borderRadius: "18px",
              overflow: "hidden",
              background: C.white,
              border: `1px solid ${C.border}`,
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
              transition: "border-color 0.35s, box-shadow 0.35s, transform 0.38s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = `${cert.accent}55`;
              el.style.boxShadow = `0 18px 50px ${cert.accent}18`;
              el.style.transform = "translateY(-8px) scale(1.012)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = C.border;
              el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)";
              el.style.transform = "translateY(0) scale(1)";
            }}
          >
            {/* image area */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden", flexShrink: 0, background: "#f0ede8" }}>
              <img
                src={cert.src}
                alt={cert.label}
                className="eq-cert-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
              {/* gradient */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)" }} />
              {/* top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2.5px", background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}80)` }} />
              {/* tag */}
              <span style={{
                position: "absolute", top: "12px", right: "12px",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.57rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "3px 9px", borderRadius: "100px",
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
                color: cert.accent, border: `1px solid ${cert.accent}35`,
              }}>{cert.tag}</span>
              {/* year */}
              <span style={{
                position: "absolute", bottom: "10px", left: "12px",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "0.78rem", fontStyle: "italic", color: "rgba(255,255,255,0.7)",
              }}>{cert.year}</span>
              {/* hover overlay with zoom icon */}
              <div className="eq-cert-overlay">
                <div className="eq-cert-zoom" style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: `linear-gradient(135deg,${C.teal},${C.orange})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                }}>
                  <svg viewBox="0 0 18 18" fill="none" width="16" height="16">
                    <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.5"/>
                    <path d="M12 12l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 5.5v5M5.5 8h5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* body */}
            <div style={{ padding: "15px 17px 17px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h4 style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.05rem", fontWeight: 700,
                color: C.ink, margin: "0 0 5px", lineHeight: 1.25,
              }}>{cert.label}</h4>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: cert.accent, fontWeight: 600, margin: "0 0 5px" }}>{cert.sub}</p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: C.muted, margin: "0 0 12px", fontWeight: 300, lineHeight: 1.5, flex: 1 }}>{cert.issuer}</p>
              {/* footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", fontWeight: 600, color: cert.accent }}>View Certificate</span>
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: `${cert.accent}12`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "transform 0.3s",
                }}>
                  <svg viewBox="0 0 10 10" fill="none" width="9" height="9">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke={cert.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* lightbox */}
      <CertLightbox
        cert={activeCertData}
        onClose={closeCert}
        onPrev={prevCert}
        onNext={nextCert}
      />
    </>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function EducationalQualification() {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState<ModalPayload>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lineW    { from{width:0}   to{width:100%} }
        @keyframes goldSpin { 0%,100%{transform:rotate(-8deg) scale(1)} 50%{transform:rotate(8deg) scale(1.15)} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes rotateBg { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse    { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }

        .gold-spin { animation: goldSpin 3s ease-in-out infinite; }
        .float-el  { animation: float 6s ease-in-out infinite; }
        .rotate-bg { animation: rotateBg 24s linear infinite; }

        .deg-node  { opacity:0; transform:translateY(32px); }
        .deg-show  { animation: fadeUp  0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .role-row  { opacity:0; transform:translateX(-32px); }
        .role-show { animation: slideIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }

        .sec-vis .ey  { animation: fadeDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.0s forwards; }
        .sec-vis .h1  { animation: fadeDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards; opacity:0; }
        .sec-vis .sub { animation: fadeDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; opacity:0; }
        .sec-vis .bar { animation: lineW   1.1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards; width:0; }
        .sec-vis .gld { animation: fadeUp  0.7s cubic-bezier(0.22,1,0.36,1) 0.05s forwards; opacity:0; }
        .sec-vis .e-ey{ animation: fadeUp  0.7s cubic-bezier(0.22,1,0.36,1) 0.2s forwards;  opacity:0; }
        .sec-vis .e-h2{ animation: fadeUp  0.7s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;  opacity:0; }
        .sec-vis .e-p { animation: fadeUp  0.7s cubic-bezier(0.22,1,0.36,1) 0.38s forwards; opacity:0; }

        .gold-text {
          background: linear-gradient(90deg,#c8820a,#f6d365,#fda085,#f6d365,#c8820a);
          background-size:300% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: shimmer 3.5s linear infinite;
        }
        .scroll-track {
          display:flex; gap:20px; padding:0 0 16px;
          overflow-x:auto; scroll-snap-type:x mandatory;
          scrollbar-width:thin; scrollbar-color:rgba(0,0,0,0.12) transparent;
        }
        .scroll-track > * { scroll-snap-align:start; }
        .scroll-track::-webkit-scrollbar { height:3px; }
        .scroll-track::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.12); border-radius:2px; }

        @media(max-width:760px){
          .exp-two { grid-template-columns:1fr !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={visible ? "sec-vis" : ""}
        style={{ background: C.bg, padding: "clamp(4rem,9vw,8rem) 0", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}
      >
        {/* ── BG Decor ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div className="float-el" style={{ position: "absolute", top: "-140px", right: "-140px", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,91,0.08) 0%,transparent 60%)" }} />
          <div className="float-el" style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.07) 0%,transparent 60%)", animationDelay: "3s" }} />
          <div className="float-el" style={{ position: "absolute", top: "45%", left: "45%", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,rgba(212,160,23,0.06) 0%,transparent 60%)", animationDelay: "1.8s" }} />
          <div className="rotate-bg" style={{ position: "absolute", top: "6%", left: "2%", width: "200px", height: "200px", borderRadius: "50%", border: "1px dashed rgba(255,138,91,0.13)" }} />
          <div className="rotate-bg" style={{ position: "absolute", bottom: "10%", right: "2%", width: "150px", height: "150px", borderRadius: "50%", border: "1px solid rgba(44,206,209,0.11)", animationDirection: "reverse", animationDuration: "17s" }} />
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1, padding: "0 clamp(1.25rem,5vw,3.5rem)" }}>

          {/* ══ PART 1 HEADER ══ */}
          <div className="ey" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <span style={{ width: "28px", height: "2px", background: C.orange, borderRadius: "2px", display: "inline-block" }} />
            <span style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.32em", color: C.orange, fontWeight: 600 }}>Academic Pedigree</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "22px" }}>
            <div>
              <h2 className="h1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.0, letterSpacing: "-2px" }}>
                Educational<br />
                <em style={{ color: C.orange, fontStyle: "italic" }}>Qualifications</em>
              </h2>
            </div>
            <p className="sub" style={{ maxWidth: "300px", fontSize: "0.88rem", lineHeight: 1.85, color: "#777", fontWeight: 300, margin: 0 }}>
              A rigorous academic journey across India's finest medical institutions — crowned with a Gold Medal in Urology.
            </p>
          </div>

          {/* animated rule */}
          <div style={{ height: "1.5px", background: "rgba(0,0,0,0.08)", marginBottom: "clamp(1.5rem,3vw,2.5rem)", borderRadius: "2px", overflow: "hidden" }}>
            <div className="bar" style={{ height: "100%", background: `linear-gradient(90deg,${C.orange},${C.teal},rgba(212,160,23,0.5),transparent)` }} />
          </div>

          {/* ══ GOLD MEDAL BANNER ══ */}
          <div className="gld" style={{
            marginBottom: "clamp(2rem,4vw,3.5rem)",
            borderRadius: "22px", padding: "20px 28px",
            background: "linear-gradient(135deg,#12100a 0%,#1e1606 55%,#12100a 100%)",
            display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
            border: "1px solid rgba(246,211,101,0.2)",
            boxShadow: "0 12px 48px rgba(212,160,23,0.14)",
            position: "relative", overflow: "hidden",
          }}>
            {/* subtle lines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg,rgba(246,211,101,0.03) 0px,rgba(246,211,101,0.03) 1px,transparent 1px,transparent 60px)", backgroundSize: "60px 100%" }} />
            <div className="gold-spin" style={{ fontSize: "2.4rem", flexShrink: 0, position: "relative" }}>🥇</div>
            <div style={{ flex: 1, position: "relative" }}>
              <p className="gold-text" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,2.8vw,1.8rem)", fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
                Gold Medallist — M.Ch. (Urology)
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "rgba(246,211,101,0.55)", margin: "5px 0 0", fontWeight: 300 }}>
                R.G. Kar Medical College & Hospital, Kolkata · University of Calcutta
              </p>
            </div>
            <div style={{ padding: "8px 18px", borderRadius: "100px", border: "1px solid rgba(246,211,101,0.3)", background: "rgba(246,211,101,0.07)", flexShrink: 0, position: "relative" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#f6d365" }}>Super Specialist · Urology</span>
            </div>
          </div>

          {/* ══ HORIZONTAL DEGREE SCROLL ══ */}
          <div ref={scrollRef} className="scroll-track">
            {degrees.map((d, i) => (
              <DegreeNode key={d.id} d={d} idx={i} visible={visible} onClick={() => setModal({ kind: "degree", data: d })} />
            ))}
          </div>

          {/* ══ SCROLL HINT dots ══ */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            {degrees.map((_, i) => (
              <div key={i} style={{ width: i === 0 ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === 0 ? C.orange : "rgba(0,0,0,0.12)", transition: "all 0.3s" }} />
            ))}
          </div>

          {/* ══ CERTIFICATES GALLERY ══ */}
          <CertificatesGallery visible={visible} />

          {/* ══ EXPERTISE SECTION ══ */}
          <div className="exp-two" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(2rem,5vw,5rem)", alignItems: "stretch" }}>

            {/* LEFT copy — card that fills full height of the right column, content pinned to center */}
            <div style={{
              background: C.white,
              borderRadius: "22px",
              border: `1px solid ${C.border}`,
              padding: "clamp(1.75rem,3.5vw,2.75rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* subtle teal accent top-right */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", borderRadius: "0 22px 0 120px", background: `${C.teal}08`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "80px", height: "80px", borderRadius: "0 80px 0 22px", background: `${C.orange}07`, pointerEvents: "none" }} />

              <div className="e-ey" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <span style={{ width: "28px", height: "2px", background: C.teal, borderRadius: "2px", display: "inline-block" }} />
                <span style={{ fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.32em", color: C.teal, fontWeight: 600 }}>Clinical Journey</span>
              </div>

              <h2 className="e-h2" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, color: C.dark, margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-1.2px" }}>
                Expertise in<br /><em style={{ color: C.teal, fontStyle: "italic" }}>Urology</em>
              </h2>

              <p className="e-p" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", lineHeight: 1.85, color: "#666", fontWeight: 300, margin: "0 0 28px" }}>
                From senior residency to assistant professorship — a progressive trajectory at India's most respected urological departments, building clinical and academic mastery simultaneously.
              </p>

              {/* divider */}
              <div style={{ height: "1px", background: `linear-gradient(90deg,${C.teal}40,transparent)`, marginBottom: "24px" }} />

              {/* stat chips */}
              <div className="e-p" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { v: "3", l: "Institutions", color: C.orange },
                  { v: "2", l: "Cities", color: C.teal },
                  { v: "Dual", l: "Clinical + Academic", color: "#6B7FD4" },
                ].map(({ v, l, color }, i) => (
                  <div key={i} style={{
                    padding: "12px 16px", borderRadius: "14px",
                    background: `${color}08`,
                    border: `1px solid ${color}20`,
                    display: "flex", alignItems: "center", gap: "12px",
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 700, color, lineHeight: 1, minWidth: "40px" }}>{v}</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#666", fontWeight: 500 }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT roles */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px" }}>
              {roles.map((r, i) => (
                <RoleRow key={r.id} r={r} idx={i} visible={visible} onClick={() => setModal({ kind: "role", data: r })} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Modal payload={modal} onClose={() => setModal(null)} />
    </>
  );
}