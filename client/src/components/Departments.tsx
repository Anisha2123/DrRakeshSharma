import { useEffect, useRef, useState } from "react";

/* ── intersection observer hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ── mouse position hook ── */
function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

/* ── Departments data with curated Unsplash images ── */
const DEPARTMENTS = [
  {
    id: 1,
    name: "Ophthalmology",
    tagline: "Vision & Eye Care",
    desc: "Advanced eye care including cataract surgery, LASIK, retinal treatments, and glaucoma management.",
    img: "/departments/Ophthalmology.png",
    icon: "eye",
    color: "#2CCED1",
    accent: "rgba(44,206,209,0.15)",
  },
  {
    id: 2,
    name: "Obs & Gynaecology",
    tagline: "Women's Health",
    desc: "Comprehensive obstetric and gynaecological care from prenatal to postnatal and beyond.",
    img: "/departments/Obs&Gynaecology.png",
    icon: "heart",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.15)",
  },
  {
    id: 3,
    name: "Cardiac Surgery",
    tagline: "Heart & Vascular",
    desc: "State-of-the-art cardiac surgical interventions, bypass surgery, and valve replacement procedures.",
    img: "/departments/CardiacSurgery.jpg",
    icon: "heartbeat",
    color: "#e05020",
    accent: "rgba(224,80,32,0.12)",
  },
  {
    id: 4,
    name: "Oncology",
    tagline: "Cancer Care",
    desc: "Evidence-based cancer diagnosis and treatment with cutting-edge chemotherapy and surgical oncology.",
    img: "/departments/Oncology1.jpeg",
    icon: "dna",
    color: "#2CCED1",
    accent: "rgba(44,206,209,0.15)",
  },
  {
    id: 5,
    name: "General Surgery",
    tagline: "Surgical Excellence",
    desc: "Laparoscopic and open surgical procedures performed with precision by our experienced surgeons.",
    img: "/departments/GeneralSurgery.jpg",
    icon: "scalpel",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.15)",
  },
  {
    id: 6,
    name: "General Medicine",
    tagline: "Internal Medicine",
    desc: "Diagnosis and treatment of complex medical conditions with a holistic patient-first approach.",
    img: "/departments/GeneralMedicine.jpg",
    icon: "stethoscope",
    color: "#0d8a8c",
    accent: "rgba(13,138,140,0.12)",
  },
  {
    id: 7,
    name: "Orthopaedic",
    tagline: "Bone & Joint",
    desc: "Joint replacement, sports injuries, spine surgery, and trauma care for musculoskeletal conditions.",
    img: "/departments/Orthopaedic.png",
    icon: "bone",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.15)",
  },
  {
    id: 8,
    name: "Cardiology",
    tagline: "Heart Health",
    desc: "Non-invasive cardiac diagnostics, angioplasty, pacemaker implantation, and cardiac rehabilitation.",
    img: "/departments/Cardiology.png",
    icon: "ecg",
    color: "#e05020",
    accent: "rgba(224,80,32,0.12)",
  },
  {
    id: 9,
    name: "Neurology",
    tagline: "Brain & Nerves",
    desc: "Expert treatment of neurological disorders including stroke, epilepsy, Parkinson's, and migraines.",
    img: "/departments/Neurology.png",
    icon: "brain",
    color: "#2CCED1",
    accent: "rgba(44,206,209,0.15)",
  },
  {
    id: 10,
    name: "Physiotherapy",
    tagline: "Rehabilitation",
    desc: "Personalised rehabilitation programmes restoring movement, strength, and quality of life.",
    img: "/departments/Physiotherapy.png",
    icon: "rehab",
    color: "#FF8A5B",
    accent: "rgba(255,138,91,0.15)",
  },
];

/* ── Department icons as inline SVG ── */
function DeptIcon({ type, size = 22 }: { type: string; size?: number }) {
  const p: React.SVGProps<SVGSVGElement> = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "eye":        return <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "heart":      return <svg {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
    case "heartbeat":  return <svg {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
    case "dna":        return <svg {...p}><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M2 9c6.667 6 13.333 0 20 6"/><path d="M2 12h1"/><path d="M21 12h1"/><path d="M5 9.5h1"/><path d="M5 14.5h1"/><path d="M18 9.5h1"/><path d="M18 14.5h1"/></svg>;
    case "scalpel":    return <svg {...p}><path d="M14.5 4 20 9.5 11.5 18 6 12.5z"/><path d="m4 20 2-4.5"/><circle cx="6" cy="19" r="1"/></svg>;
    case "stethoscope":return <svg {...p}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>;
    case "bone":       return <svg {...p}><path d="M18.5 5.5a4.5 4.5 0 0 1 0 6L7 23l-5-5L13.5 6.5a4.5 4.5 0 0 1 5-1z"/><path d="M5.5 18.5l1.4-1.4"/></svg>;
    case "ecg":        return <svg {...p}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
    case "brain":      return <svg {...p}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>;
    case "rehab":      return <svg {...p}><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 4 6-4"/><path d="M12 13v3"/></svg>;
    default:           return <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  }
}

/* ── Individual Department Card ── */
function DeptCard({ dept, index, inView }: {
  dept: typeof DEPARTMENTS[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const delay = Math.min(index * 80, 600);

  return (
    <div
      className={`dept-card${inView ? " in" : ""}${hovered ? " hov" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* image */}
      <div className="dept-img-wrap">
        {!imgError ? (
          <img
            src={dept.img}
            alt={dept.name}
            className="dept-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="dept-img-fallback" style={{ background: dept.accent }} />
        )}
        {/* colour overlay on hover */}
        <div className="dept-img-overlay" style={{ background: dept.color }} />
        {/* number watermark */}
        <div className="dept-num">{String(index + 1).padStart(2, "0")}</div>
        {/* icon badge */}
        <div className="dept-icon-badge" style={{ background: dept.color, color: "#fff" }}>
          <DeptIcon type={dept.icon} size={18} />
        </div>
      </div>

      {/* body */}
      <div className="dept-body">
        <div className="dept-tag" style={{ color: dept.color, background: dept.accent }}>
          {dept.tagline}
        </div>
        <h3 className="dept-name">{dept.name}</h3>
        <p className="dept-desc">{dept.desc}</p>

        {/* CTA arrow */}
        {/* <div className="dept-cta" style={{ color: dept.color }}>
          <span>Learn more</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dept-arrow">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div> */}
      </div>

      {/* bottom accent line */}
      <div className="dept-bottom-line" style={{ background: dept.color }} />
    </div>
  );
}

/* ── Featured (large hero) card ── */
function FeaturedCard({ dept, inView }: { dept: typeof DEPARTMENTS[0]; inView: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`feat-card${inView ? " in" : ""}`}>
      <div className="feat-img-wrap">
        {!imgError ? (
          <img src={dept.img} alt={dept.name} className="feat-img" onError={() => setImgError(true)} loading="lazy"/>
        ) : (
          <div style={{ position: "absolute", inset: 0, background: dept.accent }} />
        )}
        <div className="feat-overlay" />
        <div className="feat-content">
          <div className="feat-icon-ring" style={{ borderColor: dept.color }}>
            <div className="feat-icon-inner" style={{ background: dept.color }}>
              <DeptIcon type={dept.icon} size={24} />
            </div>
          </div>
          <div className="feat-tag" style={{ borderColor: dept.color, color: dept.color }}>
            {dept.tagline}
          </div>
          <h3 className="feat-name">{dept.name}</h3>
          <p className="feat-desc">{dept.desc}</p>
          {/* <button className="feat-btn" style={{ background: dept.color }}>
            <span>Explore Department</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default function DepartmentsSection() {
  const { ref: heroRef, inView: heroIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.06);
  const [activeFeature, setActiveFeature] = useState(0);
  const mouse = useMouse();
  const sectionRef = useRef<HTMLDivElement>(null);

  /* auto-cycle featured department */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveFeature(p => (p + 1) % DEPARTMENTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* parallax for featured panel */
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const s = sectionRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setParallax({
      x: ((mouse.x - cx) / r.width) * 18,
      y: ((mouse.y - cy) / r.height) * 12,
    });
  }, [mouse]);

  const featured = DEPARTMENTS[activeFeature];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dept-root {
          position: relative; overflow: hidden;
          background: #F4F4F4; padding: 96px 0 80px;
          font-family: 'DM Sans', sans-serif;
        }

        /* noise */
        .dept-root::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: .018;
        }

        /* teal radial glow */
        .dept-root::after {
          content: ''; position: absolute;
          width: 900px; height: 900px; top: -360px; right: -240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(44,206,209,.08) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
          animation: dRootGlow 12s ease-in-out infinite;
        }
        @keyframes dRootGlow { 0%,100%{transform:scale(1);} 50%{transform:scale(1.14);} }

        /* grid */
        .dept-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(44,206,209,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,206,209,.05) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* orange blob */
        .dept-blob {
          position: absolute; pointer-events: none; z-index: 0;
          width: 560px; height: 560px; bottom: -180px; left: -150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,138,91,.09) 0%, transparent 65%);
          filter: blur(80px);
          animation: dBlob 16s ease-in-out infinite;
        }
        @keyframes dBlob { 0%,100%{transform:scale(1);} 40%{transform:scale(1.1) translate(20px,-20px);} 70%{transform:scale(.94) translate(-14px,14px);} }

        /* top line */
        .dept-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 2;
          background: linear-gradient(90deg, transparent, #2CCED1 30%, #FF8A5B 70%, transparent);
          opacity: .7;
        }

        .dept-inner { position: relative; z-index: 5; max-width: 1240px; margin: 0 auto; padding: 0 40px; }

        /* ── HERO TEXT ── */
        .dept-hero { margin-bottom: 72px; display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; }

        .dept-hero-left { max-width: 580px; }

        .dept-eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 18px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .7s ease .1s, transform .7s ease .1s;
        }
        .dept-eyebrow.in { opacity: 1; transform: translateY(0); }
        .dept-eyebrow-dash { width: 24px; height: 1.5px; background: #2CCED1; opacity: .7; }
        .dept-eyebrow-txt { font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #2CCED1; }

        .dept-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          font-weight: 600; line-height: 1.06; color: #0d1e28; margin-bottom: 18px;
          opacity: 0; transform: translateY(26px);
          transition: opacity .9s ease .22s, transform .9s cubic-bezier(.22,.68,0,1.18) .22s;
        }
        .dept-heading.in { opacity: 1; transform: translateY(0); }
        .dept-heading em {
          font-style: italic;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B, #2CCED1);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: dShim 5s linear infinite 1s;
        }
        @keyframes dShim { 0%{background-position:0%;} 100%{background-position:200%;} }

        .dept-sub {
          font-size: 15px; font-weight: 300; line-height: 1.8; color: rgba(26,48,64,.58); max-width: 440px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .85s ease .38s, transform .85s ease .38s;
        }
        .dept-sub.in { opacity: 1; transform: translateY(0); }

        .dept-hero-right {
          display: flex; align-items: center; gap: 10px;
          opacity: 0; transform: translateY(14px);
          transition: opacity .7s ease .5s, transform .7s ease .5s;
        }
        .dept-hero-right.in { opacity: 1; transform: translateY(0); }
        .dept-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem; font-weight: 600; line-height: 1;
          background: linear-gradient(135deg, #2CCED1, #FF8A5B);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .dept-count-label { font-size: 12px; font-weight: 400; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(26,48,64,.45); max-width: 80px; line-height: 1.4; }

        /* ── FEATURED PANEL + MINI CARDS ── */
        .dept-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 20px;
          margin-bottom: 24px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .9s ease .3s, transform .9s ease .3s;
        }
        .dept-layout.in { opacity: 1; transform: translateY(0); }

        /* featured card */
        .feat-card {
          border-radius: 20px; overflow: hidden; position: relative;
          min-height: 520px;
          opacity: 0; transform: translateX(-24px);
          transition: opacity .85s ease .4s, transform .85s cubic-bezier(.22,.68,0,1.18) .4s;
          cursor: default;
        }
        .feat-card.in { opacity: 1; transform: translateX(0); }

        .feat-img-wrap { position: absolute; inset: 0; }
        .feat-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 8s ease;
        }
        .feat-card:hover .feat-img { transform: scale(1.04); }

        .feat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(13,30,40,.92) 0%, rgba(13,30,40,.5) 50%, rgba(13,30,40,.1) 100%);
        }

        .feat-content {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 36px;
          display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
        }

        .feat-icon-ring {
          width: 60px; height: 60px; border-radius: 50%;
          border: 1.5px solid transparent;
          display: flex; align-items: center; justify-content: center;
          animation: iconRingPulse 3s ease-in-out infinite;
        }
        @keyframes iconRingPulse { 0%,100%{transform:scale(1);opacity:.8;} 50%{transform:scale(1.1);opacity:1;} }
        .feat-icon-inner {
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #fff;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .feat-card:hover .feat-icon-inner { transform: scale(1.12) rotate(-8deg); }

        .feat-tag {
          font-size: 10px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
          padding: 4px 12px; border: 1px solid; border-radius: 100px;
          transition: opacity .6s ease;
        }

        .feat-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 600; color: #fff;
          line-height: 1.08;
        }
        .feat-desc { font-size: 14px; font-weight: 300; color: rgba(255,255,255,.62); line-height: 1.65; max-width: 480px; }
        .feat-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 10px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
          letter-spacing: .07em; text-transform: uppercase; color: #fff; cursor: pointer;
          box-shadow: 0 6px 20px rgba(0,0,0,.35);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
          margin-top: 4px;
        }
        .feat-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.45); }

        /* dept selector list on right */
        .dept-selector {
          display: flex; flex-direction: column; gap: 8px;
          overflow-y: auto; max-height: 520px;
          scrollbar-width: none;
        }
        .dept-selector::-webkit-scrollbar { display: none; }

        .dept-sel-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; border-radius: 12px;
          background: #fff; border: 1px solid rgba(44,206,209,.12);
          cursor: pointer;
          transition: all .22s ease;
          opacity: 0; transform: translateX(20px);
        }
        .dept-sel-item.in { opacity: 1; transform: translateX(0); }
        .dept-sel-item.sel-active {
          border-color: transparent;
          box-shadow: 0 4px 18px rgba(0,0,0,.1);
          transform: scale(1.01);
        }
        .dept-sel-item:hover:not(.sel-active) {
          border-color: rgba(44,206,209,.3);
          box-shadow: 0 2px 10px rgba(44,206,209,.1);
          transform: translateX(-2px);
        }

        .sel-icon-box {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform .25s cubic-bezier(.34,1.56,.64,1);
        }
        .dept-sel-item:hover .sel-icon-box,
        .dept-sel-item.sel-active .sel-icon-box { transform: scale(1.1) rotate(-5deg); }

        .sel-info { flex: 1; min-width: 0; }
        .sel-name { font-size: 13px; font-weight: 500; color: #0d1e28; line-height: 1.2; }
        .sel-sub  { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: rgba(26,48,64,.42); margin-top: 2px; }

        .sel-arrow {
          opacity: 0; transform: translateX(-4px);
          transition: opacity .2s, transform .2s;
          flex-shrink: 0;
        }
        .dept-sel-item.sel-active .sel-arrow,
        .dept-sel-item:hover .sel-arrow { opacity: 1; transform: translateX(0); }

        /* ── BOTTOM CARDS GRID ── */
        .dept-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          gap: 18px;
        }

        .dept-card {
          background: #fff; border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(44,206,209,.1);
          opacity: 0; transform: translateY(24px) scale(.97);
          transition: opacity .55s ease, transform .55s cubic-bezier(.22,.68,0,1.18),
                      box-shadow .25s ease, border-color .25s ease;
          position: relative; cursor: default;
        }
        .dept-card.in { opacity: 1; transform: translateY(0) scale(1); }
        .dept-card.hov {
          box-shadow: 0 12px 40px rgba(26,48,64,.13), 0 3px 10px rgba(0,0,0,.06);
          border-color: rgba(44,206,209,.28);
          transform: translateY(-5px) scale(1.01);
        }

        .dept-img-wrap {
          position: relative; height: 180px; overflow: hidden;
        }
        .dept-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .6s ease;
        }
        .dept-card.hov .dept-img { transform: scale(1.08); }
        .dept-img-fallback { position: absolute; inset: 0; }

        .dept-img-overlay {
          position: absolute; inset: 0; opacity: 0;
          transition: opacity .35s ease;
          mix-blend-mode: multiply;
        }
        .dept-card.hov .dept-img-overlay { opacity: 0.35; }

        .dept-num {
          position: absolute; top: 10px; left: 14px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 600; line-height: 1;
          color: rgba(255,255,255,.15);
          transition: color .3s ease;
        }
        .dept-card.hov .dept-num { color: rgba(255,255,255,.35); }

        .dept-icon-badge {
          position: absolute; bottom: 12px; right: 12px;
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        }
        .dept-card.hov .dept-icon-badge { transform: scale(1.12) rotate(-8deg); }

        .dept-body { padding: 18px 20px 20px; }
        .dept-tag {
          display: inline-block; font-size: 9.5px; font-weight: 500;
          letter-spacing: 1.4px; text-transform: uppercase;
          padding: 3px 10px; border-radius: 100px; margin-bottom: 8px;
          transition: background .2s;
        }
        .dept-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 600; color: #0d1e28; line-height: 1.15; margin-bottom: 8px;
          transition: color .2s;
        }
        .dept-card.hov .dept-name { color: #0d1e28; }
        .dept-desc {
          font-size: 12.5px; font-weight: 300; line-height: 1.65;
          color: rgba(26,48,64,.58);
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .dept-cta {
          display: flex; align-items: center; gap: 6px; margin-top: 14px;
          font-size: 12px; font-weight: 500; letter-spacing: .04em;
          opacity: 0; transform: translateY(6px);
          transition: opacity .25s ease, transform .25s ease;
        }
        .dept-card.hov .dept-cta { opacity: 1; transform: translateY(0); }
        .dept-arrow { transition: transform .22s ease; }
        .dept-cta:hover .dept-arrow { transform: translateX(4px); }

        .dept-bottom-line {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s ease;
        }
        .dept-card.hov .dept-bottom-line { transform: scaleX(1); }

        /* ── ALSO UROLOGY CTA ── */
        .dept-urology-strip {
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
          margin-top: 48px; padding: 28px 36px;
          background: #fff; border: 1px solid rgba(44,206,209,.2);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(44,206,209,.08);
          opacity: 0; transform: translateY(18px);
          transition: opacity .8s ease, transform .8s ease;
        }
        .dept-urology-strip.in { opacity: 1; transform: translateY(0); }
        .strip-left { display: flex; align-items: center; gap: 16px; }
        .strip-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(44,206,209,.1); border: 1px solid rgba(44,206,209,.22);
          display: flex; align-items: center; justify-content: center; color: #1aa8ab; flex-shrink: 0;
        }
        .strip-title { font-size: 15px; font-weight: 500; color: #0d1e28; margin-bottom: 2px; }
        .strip-sub { font-size: 12px; font-weight: 300; color: rgba(26,48,64,.5); }
        .strip-btn {
          display: flex; align-items: center; gap: 8px; padding: 12px 26px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb);
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
          color: #fff; cursor: pointer; text-decoration: none; flex-shrink: 0;
          box-shadow: 0 4px 18px rgba(44,206,209,.32);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
          position: relative; overflow: hidden;
        }
        .strip-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #FF8A5B, #e06030); opacity: 0; transition: opacity .3s; }
        .strip-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(44,206,209,.45); }
        .strip-btn:hover::before { opacity: 1; }
        .strip-btn span, .strip-btn svg { position: relative; z-index: 1; }

        /* auto-progress dots */
        .feat-dots {
          display: flex; gap: 6px; margin-top: 20px;
        }
        .feat-dot {
          width: 24px; height: 3px; border-radius: 2px;
          background: rgba(255,255,255,.25); cursor: pointer;
          transition: background .25s, width .3s;
          overflow: hidden; position: relative;
        }
        .feat-dot.d-active { width: 40px; background: rgba(255,255,255,.35); }
        .feat-dot-fill {
          position: absolute; left: 0; top: 0; bottom: 0;
          border-radius: 2px;
          animation: dotFill 4s linear;
        }
        @keyframes dotFill { from{width:0%;} to{width:100%;} }

        /* responsive */
        @media (max-width: 900px) {
          .dept-layout { grid-template-columns: 1fr; }
          .dept-selector { flex-direction: row; overflow-x: auto; max-height: none; flex-wrap: nowrap; }
          .dept-sel-item { flex-shrink: 0; min-width: 160px; }
          .feat-card { min-height: 420px; }
        }
        @media (max-width: 640px) {
          .dept-root { padding: 72px 0 60px; }
          .dept-inner { padding: 0 20px; }
          .dept-hero { flex-direction: column; gap: 20px; }
          .dept-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .dept-urology-strip { flex-direction: column; text-align: center; }
          .strip-left { flex-direction: column; text-align: center; }
        }
        @media (max-width: 440px) {
          .dept-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="dept-root" ref={sectionRef}>
        <div className="dept-grid-bg" />
        <div className="dept-top-line" />
        <div className="dept-blob" />

        <div className="dept-inner">

          {/* ── HERO ── */}
          <div className="dept-hero" ref={heroRef}>
            <div className="dept-hero-left">
              <div className={`dept-eyebrow${heroIn ? " in" : ""}`}>
                <div className="dept-eyebrow-dash" />
                <span className="dept-eyebrow-txt">SRK Hospital · Jaipur</span>
                <div className="dept-eyebrow-dash" />
              </div>
              {/* <h2 className={`dept-heading${heroIn ? " in" : ""}`}>
                World-Class Care,<br /><em>Every Specialty</em>
              </h2> */}
              <h2 className={`dept-heading${heroIn ? " in" : ""}`}>
                Super Specialty,<br /><em>Departments</em>
              </h2>
              <p className={`dept-sub${heroIn ? " in" : ""}`}>
                Beyond our flagship Urology department, SRK Hospital offers expert care across
                10 additional medical specialties — all under one roof in Jaipur.
              </p>
            </div>
            <div className={`dept-hero-right${heroIn ? " in" : ""}`}>
              <div className="dept-count">11</div>
              <div className="dept-count-label">Departments &amp; Specialties</div>
            </div>
          </div>

          {/* ── FEATURED + SELECTOR ── */}
          <div className={`dept-layout${gridIn ? " in" : ""}`} ref={gridRef}>

            {/* featured card */}
            <div style={{ position: "relative" }}>
              <FeaturedCard dept={featured} inView={gridIn} />
              {/* progress dots */}
              <div className="feat-dots">
                {DEPARTMENTS.map((d, i) => (
                  <div
                    key={d.id}
                    className={`feat-dot${i === activeFeature ? " d-active" : ""}`}
                    style={i === activeFeature ? { background: d.color + "55" } : {}}
                    onClick={() => setActiveFeature(i)}
                  >
                    {i === activeFeature && (
                      <div className="feat-dot-fill" key={activeFeature} style={{ background: d.color }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* department selector list */}
            <div className="dept-selector">
              {DEPARTMENTS.map((d, i) => {
                const isActive = i === activeFeature;
                const delay = gridIn ? Math.min(i * 55, 500) : 0;
                return (
                  <div
                    key={d.id}
                    className={`dept-sel-item${gridIn ? " in" : ""}${isActive ? " sel-active" : ""}`}
                    style={{
                      transitionDelay: `${delay}ms`,
                      ...(isActive ? { background: d.accent, borderColor: d.color + "44" } : {}),
                    }}
                    onClick={() => setActiveFeature(i)}
                  >
                    <div
                      className="sel-icon-box"
                      style={{
                        background: isActive ? d.color : d.accent,
                        color: isActive ? "#fff" : d.color,
                      }}
                    >
                      <DeptIcon type={d.icon} size={16} />
                    </div>
                    <div className="sel-info">
                      <div className="sel-name">{d.name}</div>
                      <div className="sel-sub">{d.tagline}</div>
                    </div>
                    {/* <svg className="sel-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={d.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg> */}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── ALL DEPARTMENTS CARDS ── */}
          {/* <div className="dept-cards-grid">
            {DEPARTMENTS.map((dept, i) => (
              <DeptCard key={dept.id} dept={dept} index={i} inView={gridIn} />
            ))}
          </div> */}

          {/* ── UROLOGY CTA STRIP ── */}
          <div
            className={`dept-urology-strip${gridIn ? " in" : ""}`}
            style={{ transitionDelay: "0.8s" }}
          >
            <div className="strip-left">
              <div className="strip-icon">
                <DeptIcon type="dna" size={22} />
              </div>
              <div>
                <div className="strip-title">Also our flagship — Advanced Urology</div>
                <div className="strip-sub">
                  Led by Dr. Rakesh Sharma · MS · MCh Urology · 25+ years of surgical excellence
                </div>
              </div>
            </div>
            <a href="/areas-of-expertise" className="strip-btn">
              <DeptIcon type="dna" size={14} />
              <span>Explore Urology</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}