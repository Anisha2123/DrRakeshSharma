import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ── intersection observer hook ── */
function useInView(threshold = 0.2) {
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
  }, [threshold]);
  return { ref, inView };
}

/* ── tiny kidney svg for decoration ── */
function KidneyDeco({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none">
      <defs>
        <radialGradient id="kdg" cx="38%" cy="32%" r="65%">
          <stop offset="0%"  stopColor="#FF8A5B" stopOpacity="0.7" />
          <stop offset="55%" stopColor="#e05020" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2CCED1" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <path
        d="M60 8 C36 8 18 28 16 54 C14 80 22 104 38 118 C46 125 54 128 62 127
           C66 126 69 122 69 117 C69 112 65 108 65 103 C65 97 69 93 75 92
           C86 91 95 84 100 73 C109 57 109 31 101 17 C93 4 78 8 60 8Z"
        fill="url(#kdg)"
      />
      <path
        d="M60 18 C44 18 32 30 30 46 C30 46 40 40 60 40 C80 40 90 46 90 46
           C88 30 76 18 60 18Z"
        fill="rgba(10,28,40,0.35)"
      />
      <path d="M60 127 C60 135 59 141 58 149" stroke="url(#kdg)" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export default function CTASection() {
  const { ref, inView } = useInView(0.15);
  const [mousePos, setMousePos]   = useState({ x: 0.5, y: 0.5 });
  const sectionRef                = useRef<HTMLDivElement>(null);

  /* subtle mouse parallax on the background blobs */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const s = sectionRef.current;
      if (!s) return;
      const r = s.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      setMousePos({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top)  / r.height,
      });
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const bx = (mousePos.x - 0.5) * 30;
  const by = (mousePos.y - 0.5) * 20;

  const on = inView ? "in" : "";

  const stats = [
    { value: "25+", label: "Years Experience" },
    { value: "50K+", label: "Surgeries" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Emergency Care" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .cta-section {
          position: relative;
          overflow: hidden;
          background: #0d1e28;
          padding: 100px 40px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── grain texture ── */
        .cta-section::before {
          content: '';
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
        }

        /* ── grid lines ── */
        .cta-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(44,206,209,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(44,206,209,0.045) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        /* ── animated background blobs ── */
        .cta-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
          transition: transform 0.08s linear;
        }
        .cta-blob-teal {
          width: 600px; height: 600px;
          top: -180px; left: -140px;
          background: radial-gradient(circle, rgba(44,206,209,0.12) 0%, transparent 65%);
          animation: blobA 14s ease-in-out infinite;
        }
        .cta-blob-orange {
          width: 500px; height: 500px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(255,138,91,0.13) 0%, transparent 65%);
          animation: blobB 18s ease-in-out infinite;
        }
        .cta-blob-mid {
          width: 350px; height: 350px;
          top: 40%; left: 55%;
          background: radial-gradient(circle, rgba(44,206,209,0.07) 0%, transparent 65%);
          animation: blobA 22s ease-in-out infinite reverse;
        }
        @keyframes blobA {
          0%,100% { transform: scale(1) translate(0,0); }
          40%      { transform: scale(1.1) translate(24px,-32px); }
          70%      { transform: scale(0.93) translate(-18px,22px); }
        }
        @keyframes blobB {
          0%,100% { transform: scale(1) translate(0,0); }
          35%      { transform: scale(1.12) translate(-20px,-24px); }
          65%      { transform: scale(0.95) translate(16px,18px); }
        }

        /* ── kidney decorations ── */
        .cta-kidney-bg-l {
          position: absolute;
          width: 340px; height: 450px;
          left: -60px; top: 50%; transform: translateY(-55%);
          z-index: 1; pointer-events: none; opacity: 0;
          transition: opacity 2s ease 0.3s;
          animation: kidDrift1 20s ease-in-out infinite 2s;
          filter: blur(2px);
        }
        .cta-kidney-bg-l.in { opacity: 0.07; }

        .cta-kidney-bg-r {
          position: absolute;
          width: 240px; height: 320px;
          right: -30px; bottom: -20px;
          z-index: 1; pointer-events: none; opacity: 0;
          transition: opacity 2s ease 0.5s;
          animation: kidDrift2 25s ease-in-out infinite 2s;
          filter: blur(3px);
        }
        .cta-kidney-bg-r.in { opacity: 0.055; }

        .cta-kidney-sm {
          position: absolute;
          width: 80px; height: 106px;
          right: 220px; top: 40px;
          z-index: 2; pointer-events: none; opacity: 0;
          transition: opacity 1.5s ease 1.2s;
          animation: kidSm 13s ease-in-out infinite 3s;
          filter: drop-shadow(0 0 12px rgba(255,138,91,0.35));
          transform: rotate(-22deg);
        }
        .cta-kidney-sm.in { opacity: 0.28; }

        @keyframes kidDrift1 {
          0%,100% { transform: translateY(-55%) rotate(-6deg) scale(1); }
          50%      { transform: translateY(-52%) rotate(4deg) scale(1.04); }
        }
        @keyframes kidDrift2 {
          0%,100% { transform: rotate(14deg) scale(1); }
          50%      { transform: rotate(-5deg) scale(1.06); }
        }
        @keyframes kidSm {
          0%,100% { transform: rotate(-22deg) translateY(0); }
          50%      { transform: rotate(-16deg) translateY(-8px); }
        }

        /* ── top accent line ── */
        .cta-top-line {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #2CCED1 30%, #FF8A5B 70%, transparent 100%);
          opacity: 0.6;
        }

        /* ── inner layout ── */
        .cta-inner {
          position: relative; z-index: 5;
          max-width: 1100px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: center;
        }

        /* ── left content ── */
        .cta-left { display: flex; flex-direction: column; }

        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .cta-eyebrow.in { opacity: 1; transform: translateY(0); }
        .eyebrow-dash { width: 28px; height: 1.5px; background: #2CCED1; opacity: 0.7; }
        .eyebrow-text {
          font-size: 11px; font-weight: 500; letter-spacing: 2.5px;
          text-transform: uppercase; color: #2CCED1;
        }

        .cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.2vw, 4rem);
          font-weight: 600; line-height: 1.08; color: #fff;
          margin-bottom: 22px;
          overflow: hidden;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.85s ease 0.22s, transform 0.85s cubic-bezier(.22,.68,0,1.18) 0.22s;
        }
        .cta-heading.in { opacity: 1; transform: translateY(0); }
        .cta-heading em {
          font-style: italic;
          background: linear-gradient(90deg, #FF8A5B, #e05828, #FF8A5B);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimH 4s linear infinite 1.5s;
        }
        @keyframes shimH { 0%{background-position:0% center;} 100%{background-position:200% center;} }

        .cta-sub {
          font-size: 15px; font-weight: 300; line-height: 1.8;
          color: rgba(244,244,244,0.55); max-width: 480px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.85s ease 0.38s, transform 0.85s ease 0.38s;
        }
        .cta-sub.in { opacity: 1; transform: translateY(0); }
        .cta-sub strong { color: rgba(244,244,244,0.85); font-weight: 500; }

        /* ── trust chips row ── */
        .cta-chips {
          display: flex; flex-wrap: wrap; gap: 10px;
          margin-top: 28px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s ease 0.52s, transform 0.8s ease 0.52s;
        }
        .cta-chips.in { opacity: 1; transform: translateY(0); }
        .chip {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(44,206,209,0.18);
          border-radius: 100px;
          font-size: 11.5px; font-weight: 400;
          color: rgba(244,244,244,0.65);
          letter-spacing: 0.04em;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .chip:hover {
          background: rgba(44,206,209,0.08);
          border-color: rgba(44,206,209,0.4);
          color: rgba(244,244,244,0.9);
        }
        .chip-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #2CCED1; flex-shrink: 0;
          box-shadow: 0 0 5px rgba(44,206,209,0.7);
        }
        .chip-dot.orange { background: #FF8A5B; box-shadow: 0 0 5px rgba(255,138,91,0.7); }

        /* ── right card ── */
        .cta-card {
          flex-shrink: 0;
          width: 320px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(44,206,209,0.16);
          border-radius: 20px;
          padding: 36px 32px;
          backdrop-filter: blur(16px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(44,206,209,0.06);
          opacity: 0; transform: translateX(32px);
          transition: opacity 0.9s ease 0.45s, transform 0.9s cubic-bezier(.22,.68,0,1.18) 0.45s;
          position: relative; overflow: hidden;
        }
        .cta-card.in { opacity: 1; transform: translateX(0); }
        .cta-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
          border-radius: 20px 20px 0 0;
        }
        /* inner teal glow */
        .cta-card::after {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 160px; height: 160px; border-radius: 50%;
          background: radial-gradient(circle, rgba(44,206,209,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .card-label {
          font-size: 10px; font-weight: 500; letter-spacing: 2px;
          text-transform: uppercase; color: #2CCED1; margin-bottom: 18px;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600; color: #fff;
          line-height: 1.2; margin-bottom: 20px;
        }

        /* availability indicator */
        .avail-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
          padding: 10px 14px;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 10px;
        }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e; flex-shrink: 0;
          box-shadow: 0 0 8px rgba(34,197,94,0.7);
          animation: availPulse 2s ease-in-out infinite;
        }
        @keyframes availPulse { 0%,100%{opacity:1;} 50%{opacity:0.45;} }
        .avail-text {
          font-size: 12px; font-weight: 400;
          color: rgba(244,244,244,0.65);
          line-height: 1.4;
        }
        .avail-text strong { color: #22c55e; font-weight: 500; }

        /* primary CTA button */
        .btn-cta-primary {
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 16px 20px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb);
          border: none; border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: #fff; cursor: pointer; text-decoration: none;
          box-shadow: 0 6px 24px rgba(44,206,209,0.38), 0 2px 6px rgba(0,0,0,0.12);
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease;
          margin-bottom: 12px;
        }
        .btn-cta-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #FF8A5B, #e06030);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .btn-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(44,206,209,0.5), 0 3px 8px rgba(0,0,0,0.15);
        }
        .btn-cta-primary:hover::before { opacity: 1; }
        .btn-cta-primary span { position: relative; z-index: 1; }
        .btn-cta-primary svg { position: relative; z-index: 1; transition: transform 0.2s; }
        .btn-cta-primary:hover svg { transform: translateX(3px); }

        /* secondary ghost button */
        .btn-cta-ghost {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px 20px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400;
          color: rgba(244,244,244,0.6);
          text-decoration: none; cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .btn-cta-ghost:hover {
          border-color: rgba(255,138,91,0.5);
          color: #FF8A5B;
          background: rgba(255,138,91,0.06);
        }

        .card-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(44,206,209,0.18), transparent);
          margin: 20px 0;
        }

        /* ── stats row (full width below content) ── */
        .cta-stats {
          position: relative; z-index: 5;
          max-width: 1100px; margin: 64px auto 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(44,206,209,0.12);
          border-radius: 16px; overflow: hidden;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
        }
        .cta-stat {
          padding: 28px 24px; text-align: center;
          border-right: 1px solid rgba(44,206,209,0.1);
          position: relative;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease, background 0.2s;
        }
        .cta-stat:hover { background: rgba(44,206,209,0.04); }
        .cta-stat.in { opacity: 1; transform: translateY(0); }
        .cta-stat:nth-child(1) { transition-delay: 0.6s; }
        .cta-stat:nth-child(2) { transition-delay: 0.72s; }
        .cta-stat:nth-child(3) { transition-delay: 0.84s; }
        .cta-stat:nth-child(4) { transition-delay: 0.96s; }
        .cta-stat:last-child   { border-right: none; }
        .cta-stat::before {
          content: ''; position: absolute; top: 0; left: 50%;
          transform: translateX(-50%);
          width: 40%; height: 2px;
          background: linear-gradient(90deg, transparent, #FF8A5B, transparent);
        }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem; font-weight: 600; line-height: 1;
          background: linear-gradient(135deg, #2CCED1, #FF8A5B);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-lbl {
          font-size: 10px; font-weight: 400; letter-spacing: 1.8px;
          text-transform: uppercase; color: rgba(244,244,244,0.35);
          margin-top: 6px;
        }

        /* ── bottom decoration strip ── */
        .cta-bottom-strip {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(44,206,209,0.2), rgba(255,138,91,0.2), transparent);
        }

        /* ── responsive ── */
        @media (max-width: 960px) {
          .cta-inner { grid-template-columns: 1fr; gap: 48px; }
          .cta-card  { width: 100%; max-width: 420px; }
          .cta-kidney-sm { display: none; }
        }
        @media (max-width: 640px) {
          .cta-section { padding: 72px 24px; }
          .cta-stats   { grid-template-columns: repeat(2, 1fr); }
          .cta-stat:nth-child(2) { border-right: none; }
          .cta-stat:nth-child(3) { border-top: 1px solid rgba(44,206,209,0.1); }
          .cta-stat:nth-child(4) { border-top: 1px solid rgba(44,206,209,0.1); }
          .cta-heading { font-size: clamp(2rem, 8vw, 2.8rem); }
        }
      `}</style>

      <section className="cta-section" ref={sectionRef}>
        {/* textures & structure */}
        <div className="cta-grid" />
        <div className="cta-top-line" />
        <div className="cta-bottom-strip" />

        {/* animated blobs */}
        <div
          className="cta-blob cta-blob-teal"
          style={{ transform: `scale(1) translate(${bx * 0.6}px, ${by * 0.4}px)` }}
        />
        <div
          className="cta-blob cta-blob-orange"
          style={{ transform: `scale(1) translate(${-bx * 0.5}px, ${-by * 0.3}px)` }}
        />
        <div className="cta-blob cta-blob-mid" />

        {/* kidney decorations */}
        <KidneyDeco className={`cta-kidney-bg-l ${on}`} />
        <KidneyDeco className={`cta-kidney-bg-r ${on}`} />
        <KidneyDeco className={`cta-kidney-sm ${on}`} />

        {/* ── main content ── */}
        <div className="cta-inner" ref={ref}>

          {/* LEFT */}
          <div className="cta-left">
            <div className={`cta-eyebrow ${on}`}>
              <div className="eyebrow-dash" />
              <span className="eyebrow-text">SRK Hospital · Jaipur</span>
              <div className="eyebrow-dash" />
            </div>

            <h2 className={`cta-heading ${on}`}>
              Begin Your Path to<br />
              <em>Complete Recovery</em>
            </h2>

            <p className={`cta-sub ${on}`}>
              Under the expert care of <strong>Dr. Rakesh Sharma</strong>, every patient
              receives a personalised treatment plan built around precision diagnosis,
              advanced urological techniques, and a compassionate approach that puts
              your wellbeing first.
            </p>

            <div className={`cta-chips ${on}`}>
              {[
                { text: "Zero Waiting Time",     orange: false },
                { text: "Insurance Accepted",    orange: true  },
                { text: "Private Rooms",         orange: false },
                { text: "Post-Op Support",       orange: true  },
                { text: "Multi-Lingual Staff",   orange: false },
              ].map((c) => (
                <div key={c.text} className="chip">
                  <div className={`chip-dot${c.orange ? " orange" : ""}`} />
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className={`cta-card ${on}`}>
            <div className="card-label">Get Started Today</div>
            <div className="card-title">Book a Free<br />Consultation</div>

            <div className="avail-row">
              <div className="avail-dot" />
              <div className="avail-text">
                <strong>Slots available today</strong><br />Mon – Sat &nbsp;·&nbsp; 9 AM – 7 PM
              </div>
            </div>

            <a href="tel:+919887711224" className="btn-cta-primary">
              <span>Book Appointment</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <a href="tel:+919887711224" className="btn-cta-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Call +91 9887711224
            </a>

            <div className="card-divider" />

            <div style={{ fontSize: "11px", color: "rgba(244,244,244,0.35)", textAlign: "center", letterSpacing: "0.04em" }}>
              Or visit us at SRK Hospital, Jaipur
            </div>
          </div>
        </div>

        {/* ── stats row ── */}
        <div className="cta-stats">
          {stats.map((s) => (
            <div key={s.label} className={`cta-stat ${on}`}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}