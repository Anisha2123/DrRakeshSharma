import { useEffect, useRef, useState } from "react";

/* ── animated counter ── */
function useCounter(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, delay, started }: {
  value: number; suffix: string; label: string; delay: number; started: boolean;
}) {
  const count = useCounter(value, 2200, started);
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-value">{count}<span className="stat-suffix">{suffix}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── crisp anatomical kidney SVG ── */
function KidneySVG({ uid, className = "", style }: {
  uid: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 290" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`body-${uid}`} cx="38%" cy="30%" r="68%">
          <stop offset="0%"   stopColor="#FF9B6A" />
          <stop offset="30%"  stopColor="#e8622a" />
          <stop offset="65%"  stopColor="#c44018" />
          <stop offset="100%" stopColor="#2CCED1" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id={`med-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FF8A5B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0d2030"  stopOpacity="0.4" />
        </radialGradient>
        <linearGradient id={`uret-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FF8A5B" />
          <stop offset="100%" stopColor="#2CCED1" />
        </linearGradient>
        <linearGradient id={`rim-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FF9B6A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2CCED1"  stopOpacity="0.5" />
        </linearGradient>
        <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`softglow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id={`clip-${uid}`}>
          <path d="M110 14 C66 14 32 50 28 96 C24 142 40 184 66 208 C82 222 96 226 108 224 C115 223 120 216 120 208 C120 199 113 192 113 183 C113 173 120 166 130 165 C150 163 168 150 177 132 C193 106 193 66 179 40 C165 16 140 14 110 14Z"/>
        </clipPath>
      </defs>

      <path
        d="M110 14 C66 14 32 50 28 96 C24 142 40 184 66 208 C82 222 96 226 108 224 C115 223 120 216 120 208 C120 199 113 192 113 183 C113 173 120 166 130 165 C150 163 168 150 177 132 C193 106 193 66 179 40 C165 16 140 14 110 14Z"
        fill={`url(#body-${uid})`}
      />
      <path
        d="M110 34 C80 34 56 56 52 86 C52 86 72 74 110 74 C148 74 168 86 168 86 C164 56 140 34 110 34Z"
        fill="rgba(10,24,36,0.52)"
      />
      <ellipse cx="110" cy="142" rx="22" ry="30" fill={`url(#med-${uid})`} opacity="0.85"/>
      <ellipse cx="96"  cy="118" rx="10" ry="6.5" fill="rgba(255,138,91,0.3)"  transform="rotate(-24 96 118)"/>
      <ellipse cx="124" cy="125" rx="9"  ry="5.5" fill="rgba(255,138,91,0.24)" transform="rotate(18 124 125)"/>
      <ellipse cx="106" cy="162" rx="10" ry="6.5" fill="rgba(255,138,91,0.26)" transform="rotate(-6 106 162)"/>
      <ellipse cx="90"  cy="108" rx="5"  ry="3.5" fill="rgba(255,160,100,0.2)" transform="rotate(-20 90 108)"/>
      <ellipse cx="120" cy="112" rx="4.5" ry="3"  fill="rgba(255,160,100,0.18)" transform="rotate(22 120 112)"/>
      <path
        d="M110 224 C110 238 108 250 106 264"
        stroke={`url(#uret-${uid})`} strokeWidth="6.5" strokeLinecap="round" fill="none"
        filter={`url(#glow-${uid})`}
      />
      <path d="M54 90 Q72 78 92 88"  stroke="rgba(255,138,91,0.28)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M48 122 Q64 112 82 120" stroke="rgba(255,138,91,0.22)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M50 154 Q66 146 82 154" stroke="rgba(255,138,91,0.17)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M56 184 Q70 177 84 184" stroke="rgba(255,138,91,0.12)" strokeWidth="1"   fill="none" strokeLinecap="round"/>
      <ellipse cx="76" cy="68" rx="20" ry="11" fill="rgba(255,240,220,0.24)" transform="rotate(-32 76 68)"/>
      <ellipse cx="62" cy="112" rx="9"  ry="19" fill="rgba(255,220,200,0.12)" transform="rotate(-10 62 112)"/>
      <path
        d="M110 14 C140 14 165 16 179 40 C193 66 193 106 177 132"
        stroke={`url(#rim-${uid})`} strokeWidth="3" fill="none"
        filter={`url(#softglow-${uid})`} strokeLinecap="round"
      />
      <path
        d="M110 14 C140 14 165 16 179 40 C193 66 193 106 177 132"
        stroke="rgba(255,155,106,0.55)" strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <path d="M96 88 Q106 100 110 120 Q114 140 106 155"  stroke="rgba(255,100,60,0.18)" strokeWidth="1" fill="none"/>
      <path d="M122 90 Q116 105 112 125 Q108 145 114 160" stroke="rgba(255,100,60,0.14)" strokeWidth="1" fill="none"/>
    </svg>
  );
}

/* ── mouse-tracking hook ── */
function useMouse() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

export default function HeroSection() {
  const [mounted, setMounted]           = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [hoveredWord, setHoveredWord]   = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mouse    = useMouse();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const on = mounted ? "on" : "";

  const px = (mouse.x - 0.5) * 28;
  const py = (mouse.y - 0.5) * 18;

  const particles = Array.from({ length: 26 }, (_, i) => ({
    width:  `${3 + ((i * 37) % 7)}px`,
    height: `${3 + ((i * 37) % 7)}px`,
    left:   `${(i * 13 + 7) % 100}%`,
    top:    `${(i * 19 + 11) % 100}%`,
    animationDuration: `${4 + (i % 6)}s`,
    animationDelay:    `${(i * 0.36) % 5}s`,
    background: i % 3 === 0 ? "rgba(255,138,91,0.6)" : i % 3 === 1 ? "rgba(44,206,209,0.6)" : "rgba(44,206,209,0.3)",
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --teal:#2CCED1;--light:#F4F4F4;--white:#FFFFFF;
          --orange:#FF8A5B;--dark:#0d1e28;--text:#1a3040;
        }
        body{font-family:'DM Sans',sans-serif;background:var(--light);}

        .hero-root{
          position:relative;min-height:100vh;background:var(--light);
          overflow:hidden;display:flex;flex-direction:column;
        }
        .hero-root::before{
          content:'';position:absolute;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:.018;pointer-events:none;z-index:0;
        }
        .hero-root::after{
          content:'';position:absolute;width:960px;height:960px;
          top:-340px;left:-260px;border-radius:50%;
          background:radial-gradient(circle,rgba(44,206,209,0.1) 0%,transparent 65%);
          pointer-events:none;z-index:0;
          animation:glowP 10s ease-in-out infinite;
        }
        @keyframes glowP{0%,100%{transform:scale(1);}50%{transform:scale(1.12);}}

        .grid-lines{
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(44,206,209,0.055) 1px,transparent 1px),
                            linear-gradient(90deg,rgba(44,206,209,0.055) 1px,transparent 1px);
          background-size:64px 64px;z-index:0;pointer-events:none;
        }
        .blob-orange{
          position:absolute;width:600px;height:600px;bottom:-200px;right:-160px;border-radius:50%;
          background:radial-gradient(circle,rgba(255,138,91,0.13) 0%,transparent 65%);
          filter:blur(80px);z-index:0;pointer-events:none;
          animation:blobF 14s ease-in-out infinite;
        }
        @keyframes blobF{0%,100%{transform:scale(1) translate(0,0);}40%{transform:scale(1.1) translate(-20px,-28px);}70%{transform:scale(.94) translate(14px,18px);}}

        .particle{position:absolute;border-radius:50%;pointer-events:none;z-index:1;animation:pRise linear infinite;}
        @keyframes pRise{0%{transform:translateY(20px) scale(0);opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{transform:translateY(-110px) scale(1.3);opacity:0;}}

        .kidney-bg-1{
          position:absolute;width:500px;height:625px;left:-100px;top:50%;
          transform:translateY(-54%);z-index:1;pointer-events:none;
          opacity:0;transition:opacity 2.2s ease .3s;
          animation:kb1 22s ease-in-out infinite 2.5s;
          filter:blur(2px) saturate(.45);
        }
        .kidney-bg-1.on{opacity:.09;}
        @keyframes kb1{0%,100%{transform:translateY(-54%) rotate(-7deg) scale(1);}50%{transform:translateY(-51%) rotate(5deg) scale(1.05);}}

        .kidney-bg-2{
          position:absolute;width:340px;height:425px;right:-50px;top:20px;
          z-index:1;pointer-events:none;
          opacity:0;transition:opacity 2.2s ease .5s;
          animation:kb2 26s ease-in-out infinite 2.5s;
          filter:blur(3px) saturate(.32);
        }
        .kidney-bg-2.on{opacity:.065;}
        @keyframes kb2{0%,100%{transform:rotate(15deg) scale(1);}50%{transform:rotate(-5deg) scale(1.06);}}

        .kidney-bg-3{
          position:absolute;width:210px;height:262px;left:56%;bottom:-20px;
          z-index:1;pointer-events:none;
          opacity:0;transition:opacity 2.2s ease .7s;
          animation:kb3 18s ease-in-out infinite 3s;
          filter:blur(4px) saturate(.24);
        }
        .kidney-bg-3.on{opacity:.05;}
        @keyframes kb3{0%,100%{transform:rotate(-10deg) translateY(0);}50%{transform:rotate(7deg) translateY(-18px);}}

        .kidney-fg-wrap{
          position:absolute;width:320px;height:400px;
          right:52px;top:50%;
          z-index:8;pointer-events:none;
          transition:transform .08s linear;
        }

        .kidney-fg{
          position:absolute;inset:0;
          opacity:0;transition:opacity 1.3s ease .95s;
          animation:kfgFloat 8s ease-in-out infinite 2.2s;
          filter:
            drop-shadow(0 0 24px rgba(255,138,91,.65))
            drop-shadow(0 0 60px rgba(255,138,91,.28))
            drop-shadow(0 0 100px rgba(44,206,209,.18));
        }
        .kidney-fg.on{opacity:1;}
        @keyframes kfgFloat{
          0%  {transform:rotate(-2deg) translateY(0px)   scale(1);}
          25% {transform:rotate(1deg)  translateY(-12px) scale(1.01);}
          50% {transform:rotate(3deg)  translateY(-20px) scale(1.015);}
          75% {transform:rotate(0deg)  translateY(-10px) scale(1.008);}
          100%{transform:rotate(-2deg) translateY(0px)   scale(1);}
        }

        .kidney-halo{
          position:absolute;
          width:280px;height:320px;
          top:50%;left:50%;
          transform:translate(-50%,-50%);
          border-radius:50%;
          background:radial-gradient(ellipse,rgba(255,138,91,0.22) 0%,rgba(44,206,209,0.08) 50%,transparent 70%);
          animation:haloBreath 8s ease-in-out infinite 2s;
          filter:blur(20px);
          z-index:7;
          opacity:0;transition:opacity 1.4s ease 1.2s;
        }
        .kidney-halo.on{opacity:1;}
        @keyframes haloBreath{
          0%,100%{transform:translate(-50%,-50%) scale(1);   opacity:.8;}
          50%     {transform:translate(-50%,-52%) scale(1.15);opacity:1;}
        }

        .pulse-rings{position:absolute;inset:-30%;display:flex;align-items:center;justify-content:center;pointer-events:none;}
        .pr{position:absolute;border-radius:50%;animation:prEx 3.8s ease-out infinite;}
        .pr-1{width:86%;height:86%;border:1.5px solid rgba(255,138,91,.52);animation-delay:0s;}
        .pr-2{width:106%;height:106%;border:1px solid rgba(255,138,91,.3);animation-delay:1.26s;}
        .pr-3{width:128%;height:128%;border:1px solid rgba(44,206,209,.22);animation-delay:2.52s;}
        @keyframes prEx{0%{transform:scale(.65);opacity:.9;}100%{transform:scale(1.2);opacity:0;}}

        .kidney-scan{
          position:absolute;left:0;right:0;height:2px;
          background:linear-gradient(to right,transparent,rgba(44,206,209,.85),transparent);
          animation:scanL 3.4s linear infinite;z-index:11;
        }
        @keyframes scanL{0%{top:0%;opacity:0;}4%{opacity:1;}92%{opacity:.9;}100%{top:100%;opacity:0;}}

        .orbit-wrap{position:absolute;inset:-22%;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:10;}
        .od{position:absolute;border-radius:50%;top:50%;left:50%;}
        .od-1{width:11px;height:11px;margin:-5.5px 0 0 -5.5px;background:#FF8A5B;box-shadow:0 0 14px rgba(255,138,91,1),0 0 28px rgba(255,138,91,.5);animation:orb1 5.8s linear infinite;}
        .od-2{width:7px; height:7px; margin:-3.5px 0 0 -3.5px;background:#2CCED1;box-shadow:0 0 12px rgba(44,206,209,1),0 0 24px rgba(44,206,209,.4);animation:orb2 9s linear infinite;}
        .od-3{width:5px; height:5px; margin:-2.5px 0 0 -2.5px;background:#fff;  box-shadow:0 0 8px rgba(255,255,255,.85);animation:orb3 13.5s linear infinite;}
        @keyframes orb1{from{transform:rotate(0deg) translateX(175px) rotate(0deg);}to{transform:rotate(360deg) translateX(175px) rotate(-360deg);}}
        @keyframes orb2{from{transform:rotate(120deg) translateX(135px) rotate(-120deg);}to{transform:rotate(480deg) translateX(135px) rotate(-480deg);}}
        @keyframes orb3{from{transform:rotate(240deg) translateX(100px) rotate(-240deg);}to{transform:rotate(600deg) translateX(100px) rotate(-600deg);}}

        .anat-ring{position:absolute;border-radius:50%;pointer-events:none;}
        .ar-1{width:360px;height:360px;top:50%;left:52%;margin:-180px 0 0 -180px;z-index:7;border:1px dashed rgba(44,206,209,.22);animation:ringR 24s linear infinite;opacity:0;transition:opacity 1.5s ease 1.8s;}
        .ar-1.on{opacity:1;}
        .ar-2{width:455px;height:455px;top:50%;left:52%;margin:-227px 0 0 -227px;z-index:7;border:1px dashed rgba(255,138,91,.14);animation:ringR 34s linear infinite reverse;opacity:0;transition:opacity 1.5s ease 2s;}
        .ar-2.on{opacity:1;}
        @keyframes ringR{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

        .ring-tick{
          position:absolute;width:6px;height:6px;border-radius:50%;
          background:#2CCED1;box-shadow:0 0 6px rgba(44,206,209,.8);
          top:50%;left:50%;transform-origin:0 0;
        }

        .kidney-sm{
          position:absolute;width:130px;height:163px;left:54px;bottom:108px;
          z-index:8;pointer-events:none;
          opacity:0;transition:opacity 1.3s ease 1.5s;
          animation:ksm 11s ease-in-out infinite 3s;
          filter:drop-shadow(0 0 16px rgba(255,138,91,.45));
          transform:rotate(12deg);
        }
        .kidney-sm.on{opacity:.62;}
        @keyframes ksm{0%,100%{transform:rotate(12deg) translateY(0);}50%{transform:rotate(7deg) translateY(-10px);}}

        .kidney-xs{
          position:absolute;width:78px;height:97px;left:198px;top:76px;
          z-index:8;pointer-events:none;
          opacity:0;transition:opacity 1.3s ease 1.7s;
          animation:kxs 15s ease-in-out infinite 3.2s;
          filter:drop-shadow(0 0 10px rgba(44,206,209,.4));
          transform:rotate(-20deg);
        }
        .kidney-xs.on{opacity:.38;}
        @keyframes kxs{0%,100%{transform:rotate(-20deg) scale(1) translateY(0);}50%{transform:rotate(-12deg) scale(1.05) translateY(-8px);}}

        .vessels{position:absolute;inset:0;z-index:6;pointer-events:none;opacity:0;transition:opacity 1.8s ease 1.9s;}
        .vessels.on{opacity:1;}

        .vitals-strip{position:absolute;bottom:148px;right:378px;z-index:10;pointer-events:none;opacity:0;transition:opacity 1s ease 2.1s;}
        .vitals-strip.on{opacity:1;}
        .ecg-path{stroke-dasharray:340;stroke-dashoffset:340;transition:stroke-dashoffset 3.2s ease 2.3s;}
        .ecg-path.draw{stroke-dashoffset:0;}
        .vitals-lbl{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(44,206,209,.72);text-align:right;margin-top:4px;}

        /* ── credential badge (replaces GFR) ── */
        .gfr-badge{
          position:absolute;right:56px;top:calc(50% + 134px);z-index:12;
          background:rgba(255,255,255,.93);border:1px solid rgba(212,160,23,.3);border-left:3px solid #D4A017;
          padding:11px 15px;backdrop-filter:blur(14px);
          box-shadow:0 8px 28px rgba(212,160,23,.16);
          opacity:0;transform:translateX(22px);transition:opacity .95s ease 2.25s,transform .95s ease 2.25s;
        }
        .gfr-badge.on{opacity:1;transform:translateX(0);}
        .gb-lbl{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#D4A017;margin-bottom:3px;font-weight:500;}
        .gb-val{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--dark);line-height:1;font-weight:600;}
        .gb-sub{font-size:9px;color:rgba(26,48,64,.5);margin-top:2px;}

        .anat-lbl{
          position:absolute;right:56px;top:calc(50% - 218px);z-index:12;
          opacity:0;transform:translateX(18px);
          transition:opacity .9s ease 2.4s,transform .9s ease 2.4s;
          font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:rgba(44,206,209,.75);text-align:right;
        }
        .anat-lbl.on{opacity:1;transform:translateX(0);}
        .anat-lbl::before{content:'';display:block;height:1px;width:36px;background:rgba(44,206,209,.42);margin-bottom:6px;margin-left:auto;}

        /* ═══ NAVBAR ═══ */
        .navbar{
          position:relative;z-index:20;
          display:flex;align-items:center;justify-content:space-between;
          padding:22px 60px;
          background:rgba(255,255,255,.9);
          border-bottom:1px solid rgba(44,206,209,.12);
          backdrop-filter:blur(20px);
          opacity:0;transform:translateY(-26px);
          transition:opacity .75s ease,transform .75s ease;
        }
        .navbar.on{opacity:1;transform:translateY(0);}
        .logo-mark{display:flex;align-items:center;gap:12px;}
        .logo-icon{
          width:42px;height:42px;
          background:linear-gradient(135deg,#2CCED1,#FF8A5B);
          border-radius:10px;display:flex;align-items:center;justify-content:center;
          font-size:19px;font-weight:700;color:#fff;
          font-family:'Cormorant Garamond',serif;
          box-shadow:0 0 20px rgba(44,206,209,.38);
        }
        .logo-name{font-size:16px;font-weight:600;color:var(--dark);letter-spacing:.4px;}
        .logo-sub{font-size:10px;color:rgba(26,48,64,.4);letter-spacing:2px;text-transform:uppercase;}
        .nav-links{display:flex;gap:32px;}
        .nav-links a{font-size:12px;font-weight:400;color:rgba(26,48,64,.5);text-decoration:none;letter-spacing:.07em;text-transform:uppercase;transition:color .2s;}
        .nav-links a:hover{color:#FF8A5B;}
        .nav-badge{
          display:flex;align-items:center;gap:8px;padding:9px 20px;
          border:1px solid rgba(44,206,209,.3);border-radius:100px;
          font-size:12px;font-weight:500;color:#2CCED1;
          letter-spacing:1px;text-transform:uppercase;
          background:rgba(44,206,209,.06);
          transition:background .2s,border-color .2s;
        }
        .nav-badge:hover{background:rgba(44,206,209,.1);border-color:rgba(44,206,209,.5);}
        .badge-dot{width:6px;height:6px;border-radius:50%;background:#2CCED1;box-shadow:0 0 6px #2CCED1;animation:dotP 2s ease-in-out infinite;}
        @keyframes dotP{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.45;transform:scale(1.5);}}

        /* ═══ CONTENT ═══ */
        .hero-content{
          position:relative;z-index:15;flex:1;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:36px 64px 36px;text-align:center;
        }

        /* eyebrow */
        .eyebrow{
          display:inline-flex;align-items:center;gap:12px;
          padding:9px 22px;border:1px solid rgba(44,206,209,.3);border-radius:100px;
          background:rgba(44,206,209,.07);font-size:11px;font-weight:500;
          color:#2CCED1;letter-spacing:2.5px;text-transform:uppercase;
          margin-bottom:32px;
          opacity:0;transform:translateY(24px);
          transition:opacity .85s ease .3s,transform .85s ease .3s;
        }
        .eyebrow.on{opacity:1;transform:translateY(0);}
        .eyebrow-dash{width:22px;height:1.5px;background:#2CCED1;opacity:.6;}

        /* ── H1 interactive words ── */
        .hero-h1{
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(3rem,5.8vw,5.25rem);
          font-weight:600;line-height:1.18;
          display:flex;flex-wrap:wrap;justify-content:center;gap:.2em;
          white-space:nowrap;overflow:visible;margin-bottom:0;
        }

        .h1-word{
          display:inline-block;vertical-align:bottom;
          cursor:default;
        }
        .h1-word-inner{
          display:inline-block;
          animation:wordUp .95s cubic-bezier(.22,.68,0,1.2) both;
          transition:transform .3s cubic-bezier(.34,1.56,.64,1), letter-spacing .3s ease, filter .3s ease;
          will-change:transform;
        }
        .h1-word:hover .h1-word-inner{
          transform:translateY(-6px) scale(1.04);
          letter-spacing:.03em;
          filter:drop-shadow(0 4px 16px rgba(44,206,209,.35));
        }

        .h1-word:nth-child(1) .h1-word-inner{animation-delay:.42s;}
        .h1-word:nth-child(2) .h1-word-inner{animation-delay:.56s;}
        .h1-word:nth-child(3) .h1-word-inner{animation-delay:.70s;}
        .h1-word:nth-child(4) .h1-word-inner{animation-delay:.84s;}
        @keyframes wordUp{from{transform:translateY(110%) skewY(3deg);opacity:0;}to{transform:translateY(0) skewY(0deg);opacity:1;}}

        .wc-dark{color:var(--dark);}
        .wc-dark:hover .h1-word-inner{filter:drop-shadow(0 4px 16px rgba(44,206,209,.4));}

        .wc-teal .h1-word-inner{
          background:linear-gradient(90deg,#2CCED1,#1abfc2,#2CCED1);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          animation:wordUp .95s cubic-bezier(.22,.68,0,1.2) .56s both, shimT 4s linear infinite 1.5s;
        }
        .wc-teal:hover .h1-word-inner{
          background:linear-gradient(90deg,#FF8A5B,#e05828,#FF8A5B);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          filter:drop-shadow(0 4px 20px rgba(255,138,91,.4));
        }
        @keyframes shimT{0%{background-position:0% center;}100%{background-position:200% center;}}

        .wc-outline .h1-word-inner{
          color:transparent;
          -webkit-text-stroke:1.5px #FF8A5B;
          text-stroke:1.5px #FF8A5B;
          animation:wordUp .95s cubic-bezier(.22,.68,0,1.2) .70s both, strokeP 3.5s ease-in-out infinite 1.8s;
        }
        .wc-outline:hover .h1-word-inner{
          -webkit-text-stroke-color:#2CCED1;
          filter:drop-shadow(0 0 18px rgba(44,206,209,.45));
        }
        @keyframes strokeP{0%,100%{-webkit-text-stroke-color:rgba(255,138,91,.9);}50%{-webkit-text-stroke-color:rgba(255,138,91,.35);}}

        .wc-orange .h1-word-inner{
          background:linear-gradient(90deg,#FF8A5B,#e05828,#FF8A5B);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          font-style:italic;
          animation:wordUp .95s cubic-bezier(.22,.68,0,1.2) .84s both, shimO 3.5s linear infinite 1.9s;
        }
        .wc-orange:hover .h1-word-inner{
          background:linear-gradient(90deg,#2CCED1,#1abfc2,#2CCED1);
          background-size:200% auto;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          font-style:italic;
          filter:drop-shadow(0 4px 20px rgba(44,206,209,.4));
        }
        @keyframes shimO{0%{background-position:0% center;}100%{background-position:200% center;}}

        /* subtitle */
        .hero-sub{
          max-width:560px;font-size:16px;line-height:1.82;font-weight:300;
          color:rgba(26,48,64,.6);margin:26px auto 0;
          opacity:0;transform:translateY(20px);
          transition:opacity .95s ease .92s,transform .95s ease .92s;
        }
        .hero-sub.on{opacity:1;transform:translateY(0);}
        .hero-sub strong{color:var(--dark);font-weight:500;}

        /* credential pills under subtitle */
        .cred-row{
          display:flex;align-items:center;gap:8px;margin-top:14px;
          flex-wrap:wrap;justify-content:center;
          opacity:0;transition:opacity .95s ease 1.0s;
        }
        .cred-row.on{opacity:1;}
        .cred-pill{
          font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;
          padding:4px 12px;border-radius:100px;
        }
        .cp-gold{background:rgba(212,160,23,.12);color:#b8860b;border:1px solid rgba(212,160,23,.3);}
        .cp-teal{background:rgba(44,206,209,.1);color:#2CCED1;border:1px solid rgba(44,206,209,.28);}
        .cp-ink{background:rgba(13,30,40,.06);color:rgba(13,30,40,.55);border:1px solid rgba(13,30,40,.1);}

        /* CTA */
        .cta-row{display:flex;align-items:center;gap:18px;margin-top:36px;opacity:0;transform:translateY(20px);transition:opacity .95s ease 1.05s,transform .95s ease 1.05s;}
        .cta-row.on{opacity:1;transform:translateY(0);}

        .btn-primary{
          position:relative;overflow:hidden;padding:15px 34px;
          background:linear-gradient(135deg,#2CCED1 0%,#1aa8ab 100%);
          border:none;border-radius:8px;
          font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.5px;
          color:#fff;cursor:pointer;
          box-shadow:0 6px 28px rgba(44,206,209,.4),0 2px 8px rgba(0,0,0,.08);
          transition:transform .2s,box-shadow .2s;
        }
        .btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,#FF8A5B,#e06030);opacity:0;transition:opacity .3s;}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 38px rgba(44,206,209,.52);}
        .btn-primary:hover::after{opacity:1;}
        .btn-primary span{position:relative;z-index:1;}

        .btn-ghost{
          display:flex;align-items:center;gap:10px;padding:14px 26px;
          background:transparent;border:1px solid rgba(44,206,209,.3);border-radius:8px;
          font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;
          color:rgba(26,48,64,.65);cursor:pointer;
          transition:border-color .2s,color .2s,background .2s;
        }
        .btn-ghost:hover{border-color:#FF8A5B;color:#FF8A5B;background:rgba(255,138,91,.05);}
        .btn-ghost svg{transition:transform .2s;}
        .btn-ghost:hover svg{transform:translateX(4px);}

        /* divider */
        .divider-row{display:flex;align-items:center;gap:16px;margin-top:44px;width:100%;max-width:680px;opacity:0;transition:opacity .95s ease 1.22s;}
        .divider-row.on{opacity:1;}
        .divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(44,206,209,.22),transparent);}
        .divider-text{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(26,48,64,.28);white-space:nowrap;}

        /* stats */
        .stats-row{
          display:flex;gap:0;margin-top:28px;width:100%;max-width:720px;
          border:1px solid rgba(44,206,209,.14);border-radius:16px;overflow:hidden;
          background:rgba(255,255,255,.82);backdrop-filter:blur(16px);
          box-shadow:0 4px 32px rgba(44,206,209,.08);
          opacity:0;transform:translateY(18px);
          transition:opacity .95s ease 1.36s,transform .95s ease 1.36s;
        }
        .stats-row.on{opacity:1;transform:translateY(0);}
        .stat-card{
          flex:1;padding:22px 14px;border-right:1px solid rgba(44,206,209,.1);
          text-align:center;position:relative;
          animation:fSlideUp .75s ease both;
          transition:background .25s;
        }
        .stat-card:hover{background:rgba(44,206,209,.04);}
        .stat-card:last-child{border-right:none;}
        @keyframes fSlideUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .stat-card::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:40%;height:2px;background:linear-gradient(90deg,transparent,#FF8A5B,transparent);}
        .stat-value{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:600;background:linear-gradient(135deg,#2CCED1,#FF8A5B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;}
        .stat-suffix{font-size:1.6rem;}
        .stat-label{font-size:9.5px;font-weight:400;letter-spacing:1.4px;text-transform:uppercase;color:rgba(26,48,64,.38);margin-top:6px;}

        /* bottom bar */
        .bottom-bar{
          position:relative;z-index:15;
          display:flex;align-items:center;justify-content:space-between;
          padding:18px 60px;border-top:1px solid rgba(44,206,209,.09);
          background:rgba(255,255,255,.75);backdrop-filter:blur(10px);
          opacity:0;transition:opacity .9s ease 1.7s;
        }
        .bottom-bar.on{opacity:1;}
        .bottom-text{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(26,48,64,.24);}
        .scroll-hint{display:flex;align-items:center;gap:10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(26,48,64,.27);}
        .scroll-arrow{width:28px;height:28px;border-radius:50%;border:1px solid rgba(44,206,209,.24);display:flex;align-items:center;justify-content:center;animation:sBounce 2s ease-in-out infinite;}
        @keyframes sBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(4px);}}

        /* responsive */
        @media(max-width:1100px){
          .kidney-fg-wrap,.kidney-halo,.kidney-sm,.kidney-xs,.vitals-strip,.gfr-badge,.anat-lbl,.ar-1,.ar-2,.vessels{display:none;}
          .hero-h1{white-space:normal;font-size:clamp(2rem,7vw,3.6rem);}
          .navbar,.bottom-bar,.hero-content{padding-left:32px;padding-right:32px;}
          .nav-links{display:none;}
        }
        @media(max-width:600px){
          .stats-row{flex-direction:column;}
          .stat-card{border-right:none;border-bottom:1px solid rgba(44,206,209,.1);}
          .stat-card:last-child{border-bottom:none;}
          .cta-row{flex-direction:column;width:100%;}
          .btn-primary,.btn-ghost{width:100%;justify-content:center;}
          .hero-h1{white-space:normal;}
        }
      `}</style>

      <section className="hero-root">
        <div className="grid-lines" />
        <div className="blob-orange" />

        {/* particles */}
        {particles.map((p, i) => (
          <div key={i} className="particle" style={p as React.CSSProperties} />
        ))}

        {/* ── BG kidneys ── */}
        <KidneySVG uid="bg1" className={"kidney-bg-1 " + on} />
        <KidneySVG uid="bg2" className={"kidney-bg-2 " + on} />
        <KidneySVG uid="bg3" className={"kidney-bg-3 " + on} />

        {/* ── vessels ── */}
        <svg className={"vessels " + on} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="vg1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(44,206,209,0)" />
              <stop offset="50%" stopColor="rgba(44,206,209,0.3)" />
              <stop offset="100%" stopColor="rgba(44,206,209,0)" />
            </linearGradient>
            <linearGradient id="vg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,138,91,0)" />
              <stop offset="50%" stopColor="rgba(255,138,91,0.26)" />
              <stop offset="100%" stopColor="rgba(255,138,91,0)" />
            </linearGradient>
          </defs>
          <path d="M700 -10 C700 120 880 270 1102 352 C1182 378 1272 386 1328 392"
            stroke="url(#vg1)" strokeWidth="1.8" fill="none" strokeDasharray="7 5" opacity="0.52" />
          <path d="M700 -10 C700 180 822 372 1064 444 C1134 464 1226 468 1286 470"
            stroke="url(#vg1)" strokeWidth="1.2" fill="none" strokeDasharray="4 8" opacity="0.28" />
          <path d="M1084 352 C1064 402 1076 452 1086 502"
            stroke="url(#vg2)" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M1124 372 C1114 412 1119 462 1124 512"
            stroke="url(#vg2)" strokeWidth="1" fill="none" opacity="0.28" />
        </svg>

        {/* ── anatomy rings ── */}
        <div className={"anat-ring ar-1 " + on} />
        <div className={"anat-ring ar-2 " + on} />

        {/* ── ECG vitals ── */}
        <div className={"vitals-strip " + on}>
          <svg viewBox="0 0 300 38" width="300" height="38">
            <path
              className={"ecg-path " + (mounted ? "draw" : "")}
              d="M0 19 L28 19 L34 6 L40 32 L46 4 L52 19 L78 19 L84 10 L90 28 L96 10 L102 19 L128 19 L134 6 L140 32 L146 4 L152 19 L178 19 L184 11 L190 27 L196 11 L202 19 L240 19 L248 7 L256 31 L262 19 L300 19"
              stroke="rgba(44,206,209,0.72)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            />
          </svg>
          {/* ── updated vitals label ── */}
          <div className="vitals-lbl">Urology · SRK Hospital Jaipur</div>
        </div>

        {/* ── anatomy label — updated ── */}
        <div className={"anat-lbl " + on}>Renal Transplant</div>

        {/* ── credential badge (replaces GFR) ── */}
        <div className={"gfr-badge " + on}>
          <div className="gb-lbl">Gold Medallist</div>
          <div className="gb-val">M.Ch.</div>
          <div className="gb-sub">Urology · Kolkata</div>
        </div>

        {/* ── halo glow behind kidney ── */}
        <div
          className={"kidney-fg-wrap " + on}
          style={{
            transform: `translateY(-50%) translate(${px * 0.3}px, ${py * 0.3}px)`,
            right: 52,
          }}
        >
          <div className={"kidney-halo " + on} />
          <div className="orbit-wrap">
            <div className="od od-1" /><div className="od od-2" /><div className="od od-3" />
          </div>
          <div className="pulse-rings">
            <div className="pr pr-1" /><div className="pr pr-2" /><div className="pr pr-3" />
          </div>
          <div className="kidney-scan" />
          <KidneySVG uid="fg1" className={"kidney-fg " + on} />
        </div>

        {/* ── small accent kidneys ── */}
        <KidneySVG uid="sm1" className={"kidney-sm " + on} />
        <KidneySVG uid="xs1" className={"kidney-xs " + on} />

        {/* ══ NAVBAR (kept commented as original) ══ */}
        {/* <nav className={"navbar " + on}>...</nav> */}

        {/* ══ MAIN CONTENT ══ */}
        <main className="hero-content">

          {/* ── updated eyebrow ── */}
          <div className={"eyebrow " + on}>
            <div className="eyebrow-dash" />
            Senior Urologist · Jaipur, Rajasthan
            <div className="eyebrow-dash" />
          </div>

          {/* ── updated H1: Kidney Care, / World-Class / Surgery & / Transplant. ── */}
          <h1 className="hero-h1">
            {[
              { text: "Precision",  cls: "wc-dark"    },
              { text: "Urology &",   cls: "wc-teal"    },
              { text: "Compassionate",     cls: "wc-outline" },
              { text: "Healing.",   cls: "wc-orange"  },
            ].map((w, i) => (
              <span
                key={i}
                className={"h1-word " + w.cls}
                onMouseEnter={() => setHoveredWord(i)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                <span className="h1-word-inner">{w.text}</span>
              </span>
            ))}
          </h1>

          {/* ── updated subtitle ── */}
          <p className={"hero-sub " + on}>
            <strong>Dr. Rakesh Sharma</strong> — Gold Medallist M.Ch. Urologist and Director of{" "}
            <strong>SRK Hospital, Jaipur</strong> — delivers 25+ years of precision urology: kidney stone
            removal, renal transplantation, prostate surgery, and complex endo-urological procedures with
            unmatched surgical expertise and genuine compassion.
          </p>

          {/* ── NEW: credential pills ── */}
          <div className={"cred-row " + on}>
            <span className="cred-pill cp-gold">🥇 Gold Medallist · M.Ch. Urology</span>
            <span className="cred-pill cp-teal">MBBS · M.S. · DNB</span>
            <span className="cred-pill cp-ink">Director, SRK Hospital</span>
          </div>

          {/* ── updated CTA buttons ── */}
          <div className={"cta-row " + on}>
            <a href="tel:+919887711224"  className="btn-primary"><span>Book Appointment</span></a>
            <a href ="/medical-services" className="btn-ghost">
              View Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* ── updated divider text ── */}
          <div className={"divider-row " + on}>
            <div className="divider-line" />
            <div className="divider-text">200000+ patients · 689+ advanced procedures</div>
            <div className="divider-line" />
          </div>

          {/* ── updated stats: real Dr Sharma numbers ── */}
          <div ref={statsRef} className={"stats-row " + on}>
            <StatCard value={25}   suffix="+"  label="Years of Experience"    delay={0}   started={statsStarted} />
            <StatCard value={689}  suffix="+"  label="Advanced Procedures"    delay={150} started={statsStarted} />
            <StatCard value={200000} suffix="+"  label="Happy Patients"         delay={300} started={statsStarted} />
            <StatCard value={50000}  suffix="+"  label="Compact Surgeries"      delay={450} started={statsStarted} />
          </div>
        </main>

        {/* ══ BOTTOM BAR — updated ══ */}
        <div className={"bottom-bar " + on}>
          <div className="bottom-text">SRK Hospital · Urology &amp; Renal Transplant · Jaipur, Rajasthan</div>
          <div className="scroll-hint">
            Scroll to explore
            <div className="scroll-arrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(26,48,64,0.4)" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}