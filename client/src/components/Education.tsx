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
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px", marginBottom: "clamp(3.5rem,7vw,6rem)" }}>
            {degrees.map((_, i) => (
              <div key={i} style={{ width: i === 0 ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === 0 ? C.orange : "rgba(0,0,0,0.12)", transition: "all 0.3s" }} />
            ))}
          </div>

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