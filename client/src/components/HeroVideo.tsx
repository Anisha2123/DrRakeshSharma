import { useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .op-root {
    width: 100%; min-height: 100vh;
    background: #0a1520;
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }

  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,138,91,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,138,91,.04) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .scan {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, rgba(255,138,91,.5), transparent);
    animation: scanAnim 5s linear infinite;
    z-index: 2;
  }
  @keyframes scanAnim {
    0% { top: 0; opacity: 1; }
    85% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  .corner { position: absolute; width: 20px; height: 20px; }
  .c-tl { top: 20px; left: 20px; }
  .c-tr { top: 20px; right: 20px; }
  .c-bl { bottom: 40px; left: 20px; }
  .c-br { bottom: 40px; right: 20px; }

  .step-header {
    position: absolute; top: 0; left: 0; right: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 40px;
    border-bottom: 1px solid rgba(255,138,91,.12);
    z-index: 50;
  }
  .step-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 300; color: rgba(255,255,255,.5);
    letter-spacing: .12em;
  }
  .step-brand span { color: #FF8A5B; }
  .step-counter {
    font-size: 11px; letter-spacing: .15em;
    color: rgba(255,138,91,.7); text-transform: uppercase;
  }

  .step-footer {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 20px 40px 24px;
    border-top: 1px solid rgba(255,138,91,.1);
    display: flex; align-items: flex-end; justify-content: space-between;
    z-index: 50;
  }
  .step-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(22px, 3vw, 38px);
    font-weight: 300; color: #fff; line-height: 1.1;
    opacity: 0; transform: translateY(14px);
    transition: opacity .6s, transform .6s;
  }
  .step-title.show { opacity: 1; transform: translateY(0); }
  .step-title em { font-style: italic; color: #FF8A5B; }
  .step-desc {
    font-size: 13px; color: rgba(255,255,255,.45);
    max-width: 340px; text-align: right; line-height: 1.6;
    opacity: 0; transform: translateY(10px);
    transition: opacity .5s .15s, transform .5s .15s;
  }
  .step-desc.show { opacity: 1; transform: translateY(0); }

  .prog-bar {
    position: absolute; bottom: 0; left: 0; height: 2px;
    background: #FF8A5B;
    transition: width linear;
    z-index: 60;
  }

  .step-dots {
    position: absolute; right: 28px; top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 10px; z-index: 60;
  }
  .sdot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,.15);
    transition: background .4s, transform .4s;
  }
  .sdot.done { background: rgba(255,138,91,.5); }
  .sdot.active { background: #FF8A5B; transform: scale(1.6); }

  /* ── scene ── */
  .scene {
    position: relative;
    width: min(700px, 90vw);
    height: min(460px, 55vh);
    z-index: 10;
  }

  .or-lights {
    position: absolute; top: -30px; left: 0; right: 0;
    display: flex; justify-content: center; gap: 40px; z-index: 2;
  }
  .or-lamp {
    display: flex; flex-direction: column; align-items: center;
    opacity: 0; transform: translateY(-20px);
    transition: opacity .7s, transform .7s;
  }
  .or-lamp.lit { opacity: 1; transform: translateY(0); }
  .lamp-head { width: 60px; height: 20px; background: #2a4060; border-radius: 4px; border: 1px solid rgba(255,138,91,.3); }
  .lamp-arm { width: 2px; height: 30px; background: #1a3050; margin: 0 auto; }
  .lamp-cone {
    width: 0; height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 80px solid rgba(255,220,150,.06);
    margin-top: -2px;
  }

  .or-table {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 360px; opacity: 0; transition: opacity .8s;
  }
  .or-table.show { opacity: 1; }
  .table-surface {
    width: 360px; height: 18px;
    background: linear-gradient(to bottom, #2a4060, #1e3050);
    border-radius: 3px;
    border: 1px solid rgba(255,138,91,.25);
    position: relative;
  }
  .table-legs { display: flex; justify-content: space-between; padding: 0 40px; }
  .t-leg { width: 14px; height: 56px; background: #1a2840; border-radius: 0 0 3px 3px; }

  .patient {
    position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
    width: 280px; opacity: 0; transition: opacity .7s;
  }
  .patient.show { opacity: 1; }
  .pat-body {
    width: 240px; height: 64px;
    background: linear-gradient(to bottom, #e4dcd0, #d0c8bc);
    border-radius: 32px 32px 6px 6px;
    position: relative; margin: 0 auto;
  }
  .pat-head {
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #d8ccbc, #c4b8a8);
    position: absolute; right: -18px; top: -10px;
    border: 2px solid rgba(255,138,91,.3);
  }
  .drape {
    position: absolute; inset: 0;
    background: rgba(20,52,90,.82);
    border-radius: 32px 32px 6px 6px;
  }
  .drape-window {
    position: absolute; width: 90px; height: 56px;
    border: 1.5px solid rgba(255,138,91,.55);
    background: rgba(255,138,91,.04);
    top: 4px; left: 50%; transform: translateX(-50%);
    border-radius: 2px;
  }

  .surgeon {
    position: absolute; bottom: 0;
    display: flex; flex-direction: column; align-items: center;
    opacity: 0; transition: opacity .7s, transform .7s;
  }
  .surgeon.left-s { left: 10px; }
  .surgeon.right-s { right: 10px; }
  .surgeon.show { opacity: 1; }
  .s-head { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #3a5570, #2a4060); border: 1.5px solid rgba(255,138,91,.4); margin-bottom: -5px; }
  .s-cap { width: 40px; height: 14px; background: #2a5070; border-radius: 20px 20px 0 0; position: relative; top: 5px; }
  .s-mask { width: 30px; height: 18px; background: #2a7070; border-radius: 0 0 10px 10px; position: relative; z-index: 2; }
  .s-body { width: 76px; height: 110px; background: linear-gradient(to bottom, #1a4848, #123838); clip-path: polygon(14% 0%, 86% 0%, 94% 100%, 6% 100%); position: relative; }
  .s-glove { position: absolute; bottom: -6px; width: 20px; height: 30px; background: #1e5a5a; border-radius: 4px 4px 8px 8px; }
  .s-glove.lg { left: 10px; transform: rotate(-18deg); }
  .s-glove.rg { right: 10px; transform: rotate(18deg); }

  .inst {
    position: absolute; width: 2px; border-radius: 1px;
    background: linear-gradient(to bottom, #c0c0c0, #909090);
    bottom: 30px; transform-origin: bottom center;
    z-index: 20; opacity: 0; transition: opacity .5s, transform .5s;
  }
  .inst.show { opacity: 1; }
  .inst.i1 { left: calc(50% - 80px); height: 100px; transform: rotate(22deg); }
  .inst.i2 { right: calc(50% - 80px); height: 100px; transform: rotate(-22deg); }
  .inst.i3 { left: calc(50% - 20px); height: 80px; transform: rotate(5deg); }

  .endoscope {
    position: absolute; width: 3px; height: 120px;
    background: linear-gradient(to bottom, #888, #555);
    border-radius: 2px 2px 6px 6px;
    bottom: 30px; left: calc(50% + 10px);
    transform: rotate(-8deg); transform-origin: bottom center;
    z-index: 20; opacity: 0; transition: opacity .6s;
  }
  .endoscope.show { opacity: 1; }
  .endo-tip {
    width: 10px; height: 10px; border-radius: 50%;
    background: #FF8A5B;
    position: absolute; top: -4px; left: -4px;
    box-shadow: 0 0 8px rgba(255,138,91,.8);
    animation: endoPulse 1.2s ease-in-out infinite;
  }
  @keyframes endoPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(255,138,91,.6); }
    50% { box-shadow: 0 0 14px rgba(255,138,91,1); }
  }

  .kidney-wrap {
    position: absolute; top: 30px; left: 50%; transform: translateX(-50%);
    z-index: 15; opacity: 0; transition: opacity .8s;
  }
  .kidney-wrap.show { opacity: 1; }

  .laser {
    position: absolute; width: 1px; background: rgba(255,100,60,.7);
    z-index: 18; opacity: 0; transform-origin: top center;
    animation: laserFlicker .15s ease-in-out infinite;
  }
  .laser.show { opacity: 1; }
  @keyframes laserFlicker {
    0%, 100% { opacity: .7; }
    50% { opacity: 1; }
  }

  .fragment {
    position: absolute; border-radius: 50%;
    background: #c85a30; opacity: 0;
    animation: fragFloat 2s ease-in-out infinite;
  }
  .fragment.show { opacity: 1; }
  @keyframes fragFloat {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(var(--fx), var(--fy)); }
  }

  .suture-path {
    stroke-dasharray: 200; stroke-dashoffset: 200;
    transition: stroke-dashoffset 2s ease;
  }
  .suture-path.draw { stroke-dashoffset: 0; }

  .monitor-unit {
    position: absolute; top: 10px; right: 10px;
    width: 100px; height: 70px;
    background: #060e18; border: 1.5px solid #1e3a55;
    border-radius: 4px; opacity: 0; transition: opacity .6s; z-index: 30;
  }
  .monitor-unit.show { opacity: 1; }
  .mon-screen { margin: 6px; background: #020a10; height: 44px; border-radius: 2px; position: relative; overflow: hidden; }
  .mon-label { text-align: center; font-size: 8px; letter-spacing: .1em; color: #3a7a6a; margin-top: 3px; }

  .ecg-line {
    stroke: #FF8A5B; stroke-width: 1.5; fill: none;
    stroke-dasharray: 280; stroke-dashoffset: 280;
    transition: stroke-dashoffset 2.5s linear;
  }
  .ecg-line.draw { stroke-dashoffset: 0; }

  .iv {
    position: absolute; top: 10px; left: 10px;
    width: 30px; height: 44px;
    background: rgba(160,210,255,.1);
    border: 1px solid rgba(160,210,255,.25);
    border-radius: 4px 4px 6px 6px;
    opacity: 0; transition: opacity .5s; z-index: 30;
  }
  .iv.show { opacity: 1; }
  .iv-tube { width: 1px; height: 32px; background: rgba(160,210,255,.35); margin: 0 auto; }

  .pring {
    position: absolute; border-radius: 50%;
    border: 1.5px solid rgba(255,138,91,.35);
    animation: pr 2.5s ease-in-out infinite; opacity: 0;
  }
  .pring.show { opacity: 1; }
  @keyframes pr {
    0%, 100% { transform: scale(1); opacity: .5; }
    50% { transform: scale(1.4); opacity: .05; }
  }

  .bp-badge {
    position: absolute; top: 90px; right: 10px;
    background: #060e18; border: 1px solid rgba(255,138,91,.2);
    padding: 6px 10px; z-index: 30;
    opacity: 0; transition: opacity .5s;
    font-size: 10px; color: rgba(255,255,255,.5); letter-spacing: .06em;
  }
  .bp-badge.show { opacity: 1; }
  .bp-val { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #FF8A5B; line-height: 1; }

  .watermark {
    position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
    color: rgba(255,138,91,.12); white-space: nowrap;
    z-index: 1; pointer-events: none;
  }
`;

const STEPS = [
  {
    title: "Patient Preparation <em>&amp; Anaesthesia</em>",
    desc: "Patient is positioned supine. General or spinal anaesthesia administered. Vitals monitored throughout.",
    counter: "Step 1 of 6",
    duration: 4000,
  },
  {
    title: "<em>Surgical Team</em> Enters the Theatre",
    desc: "Dr. Rakesh Sharma leads the team. Scrub nurses and anaesthesiologist take their positions.",
    counter: "Step 2 of 6",
    duration: 4000,
  },
  {
    title: "Endoscopic <em>Access</em>",
    desc: "A ureteroscope is carefully inserted through the urethra up to the ureter — no external incision required.",
    counter: "Step 3 of 6",
    duration: 4500,
  },
  {
    title: "Kidney <em>Stone Identified</em>",
    desc: "The stone is visualised under direct endoscopic view. Location, size and density are assessed in real time.",
    counter: "Step 4 of 6",
    duration: 4500,
  },
  {
    title: "Laser <em>Lithotripsy</em>",
    desc: "Holmium laser pulses fragment the stone into fine dust particles that pass naturally or are retrieved.",
    counter: "Step 5 of 6",
    duration: 5000,
  },
  {
    title: "Closure <em>&amp; Recovery</em>",
    desc: "A ureteral stent is placed if needed. Wound closed with fine sutures. Patient moved to recovery ward.",
    counter: "Step 6 of 6",
    duration: 5000,
  },
];

export default function UrologyOperation() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const currentRef = useRef(0);

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = CSS;
    document.head.appendChild(el);
    styleRef.current = el;

    buildDots();
    runStep(0);

    return () => {
      el.remove();
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const tk = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const clearAll = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const g = (id: string) => document.getElementById(id);
  const show = (id: string) => g(id)?.classList.add("show");
  const hide = (id: string) => g(id)?.classList.remove("show");

  const buildDots = () => {
    const container = g("stepDots");
    if (!container) return;
    container.innerHTML = "";
    STEPS.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "sdot" + (i === 0 ? " active" : "");
      d.id = "sd" + i;
      container.appendChild(d);
    });
  };

  const updateUI = (i: number) => {
    const s = STEPS[i];
    const counter = g("stepCounter");
    if (counter) counter.textContent = s.counter;

    const title = g("stepTitle");
    const desc = g("stepDesc");
    if (title) { title.classList.remove("show"); }
    if (desc) { desc.classList.remove("show"); }

    tk(() => {
      if (title) { title.innerHTML = s.title; title.classList.add("show"); }
      if (desc) { desc.textContent = s.desc; desc.classList.add("show"); }
    }, 200);

    STEPS.forEach((_, j) => {
      const d = g("sd" + j);
      if (d) d.className = "sdot" + (j < i ? " done" : j === i ? " active" : "");
    });

    const bar = g("progBar");
    if (bar) {
      const pct = ((i + 1) / STEPS.length) * 100;
      bar.style.transition = `width ${s.duration}ms linear`;
      bar.style.width = pct + "%";
    }
  };

  const showStep1 = () => {
    tk(() => { g("lamp1")?.classList.add("lit"); }, 200);
    tk(() => { g("lamp2")?.classList.add("lit"); }, 400);
    tk(() => { g("lamp3")?.classList.add("lit"); }, 600);
    tk(() => { g("orTable")?.classList.add("show"); }, 700);
    tk(() => { g("patient")?.classList.add("show"); }, 1100);
    tk(() => {
      show("mon"); show("iv"); show("bp");
      tk(() => { g("ecgLine")?.classList.add("draw"); }, 200);
    }, 1400);
  };

  const showStep2 = () => {
    tk(() => { show("surgL"); }, 300);
    tk(() => { show("surgR"); }, 700);
  };

  const showStep3 = () => {
    show("inst1"); show("inst2");
    tk(() => { show("endo"); }, 600);
  };

  const showStep4 = () => {
    show("kidneyWrap");
    tk(() => { show("pr1"); show("pr2"); }, 400);
    tk(() => {
      const s = g("stone") as HTMLElement | null;
      const s2 = g("stone2") as HTMLElement | null;
      if (s) s.style.opacity = "1";
      if (s2) s2.style.opacity = "1";
    }, 900);
  };

  const showStep5 = () => {
    show("laser"); show("inst3");
    tk(() => {
      ["frag1","frag2","frag3","frag4"].forEach(show);
      const s = g("stone") as HTMLElement | null;
      const s2 = g("stone2") as HTMLElement | null;
      if (s) s.style.opacity = "0.3";
      if (s2) s2.style.opacity = "0";
    }, 1200);
  };

  const showStep6 = () => {
    hide("laser");
    ["frag1","frag2","frag3","frag4"].forEach(hide);
    const s = g("stone") as HTMLElement | null;
    if (s) s.style.opacity = "0";
    hide("endo");
    tk(() => { g("suturePath")?.classList.add("draw"); }, 600);
  };

  const stepFns = [showStep1, showStep2, showStep3, showStep4, showStep5, showStep6];

  const resetAll = (cb: () => void) => {
    clearAll();
    ["lamp1","lamp2","lamp3"].forEach(id => g(id)?.classList.remove("lit"));
    g("orTable")?.classList.remove("show");
    g("patient")?.classList.remove("show");
    hide("mon"); hide("iv"); hide("bp");
    const ecg = g("ecgLine") as SVGPathElement | null;
    if (ecg) { ecg.style.transition = "none"; ecg.style.strokeDashoffset = "280"; ecg.classList.remove("draw"); }
    hide("surgL"); hide("surgR");
    hide("inst1"); hide("inst2"); hide("inst3");
    hide("endo");
    hide("kidneyWrap");
    hide("pr1"); hide("pr2");
    const stone = g("stone") as HTMLElement | null;
    const stone2 = g("stone2") as HTMLElement | null;
    if (stone) stone.style.opacity = "0";
    if (stone2) stone2.style.opacity = "0";
    hide("laser");
    ["frag1","frag2","frag3","frag4"].forEach(hide);
    const suture = g("suturePath") as SVGPathElement | null;
    if (suture) { suture.style.transition = "none"; suture.classList.remove("draw"); }
    const bar = g("progBar");
    if (bar) { bar.style.transition = "none"; bar.style.width = "0%"; }
    tk(() => {
      if (ecg) ecg.style.transition = "stroke-dashoffset 2.5s linear";
      if (suture) suture.style.transition = "stroke-dashoffset 2s ease";
      cb();
    }, 300);
  };

  const runStep = (i: number) => {
    clearAll();
    currentRef.current = i;
    updateUI(i);
    stepFns[i]();
    tk(() => {
      const next = (i + 1) % STEPS.length;
      if (next === 0) {
        resetAll(() => runStep(0));
      } else {
        runStep(next);
      }
    }, STEPS[i].duration);
  };

  return (
    <div className="op-root">
      <div className="grid-bg" />
      <div className="scan" />

      {/* watermarks */}
      <div className="watermark" style={{ top: "38%", left: -20, transform: "rotate(-90deg) translateX(-50%)", transformOrigin: "left center" }}>
        SRK HOSPITAL · DR RAKESH SHARMA · UROLOGIST
      </div>
      <div className="watermark" style={{ top: "55%", right: -20, transform: "rotate(90deg) translateX(50%)", transformOrigin: "right center" }}>
        ADVANCED UROLOGY · JAIPUR · PRECISION SURGERY
      </div>

      {/* corners */}
      {[
        { cls: "c-tl", d: "M0 20 L0 0 L20 0" },
        { cls: "c-tr", d: "M20 20 L20 0 L0 0" },
        { cls: "c-bl", d: "M0 0 L0 20 L20 20" },
        { cls: "c-br", d: "M20 0 L20 20 L0 20" },
      ].map(c => (
        <div key={c.cls} className={`corner ${c.cls}`}>
          <svg width="20" height="20">
            <path d={c.d} stroke="rgba(255,138,91,.4)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      ))}

      {/* header */}
      <div className="step-header">
        <div className="step-brand">SRK<span>.</span>Hospital &nbsp;·&nbsp; Dr Rakesh Sharma</div>
        <div className="step-counter" id="stepCounter">Step 1 of 6</div>
      </div>

      {/* scene */}
      <div className="scene">

        {/* OR lamps */}
        <div className="or-lights">
          {["lamp1","lamp2","lamp3"].map(id => (
            <div key={id} className="or-lamp" id={id}>
              <div className="lamp-arm" />
              <div className="lamp-head" />
              <div className="lamp-cone" />
            </div>
          ))}
        </div>

        {/* monitor */}
        <div className="monitor-unit" id="mon">
          <div className="mon-screen">
            <svg viewBox="0 0 90 40" width="90" height="40" style={{ position: "absolute", inset: 0 }}>
              <path id="ecgLine"
                d="M0 20 L12 20 L16 8 L20 32 L24 8 L28 20 L42 20 L46 11 L50 29 L54 11 L58 20 L72 20 L76 8 L80 32 L84 8 L88 20"
                className="ecg-line"
              />
            </svg>
          </div>
          <div className="mon-label">VITALS · HR 68</div>
        </div>

        {/* IV */}
        <div className="iv" id="iv"><div className="iv-tube" /></div>

        {/* BP */}
        <div className="bp-badge" id="bp">
          <div style={{ marginBottom: 2 }}>BP</div>
          <div className="bp-val">120/80</div>
        </div>

        {/* Kidney */}
        <div className="kidney-wrap" id="kidneyWrap">
          <div className="pring" id="pr1" style={{ width: 70, height: 70, top: "50%", left: "50%", margin: "-35px 0 0 -35px" }} />
          <div className="pring" id="pr2" style={{ width: 95, height: 95, top: "50%", left: "50%", margin: "-47px 0 0 -47px", animationDelay: ".6s" }} />
          <svg viewBox="0 0 120 85" width="120" height="85" id="kidneySvg">
            <path d="M60 8 C42 8 24 20 22 38 C20 55 30 70 44 72 C51 74 56 66 60 66 C64 66 69 74 76 72 C90 70 100 55 98 38 C96 20 78 8 60 8 Z" fill="#b84a3a" opacity=".92" />
            <path d="M60 16 C46 16 36 24 34 36 C34 36 44 30 60 30 C76 30 86 36 86 36 C84 24 74 16 60 16 Z" fill="#8a3025" opacity=".5" />
            <path d="M60 66 L60 82" stroke="#b84a3a" strokeWidth="5" strokeLinecap="round" fill="none" />
            <ellipse cx="44" cy="28" rx="10" ry="6" fill="rgba(255,180,160,.28)" transform="rotate(-25 44 28)" />
            <circle id="stone" cx="58" cy="44" r="7" fill="#8a7060" opacity="0" style={{ transition: "opacity .6s" }} />
            <circle id="stone2" cx="58" cy="44" r="4" fill="#706050" opacity="0" style={{ transition: "opacity .4s" }} />
            <path id="suturePath" d="M44 42 Q52 36 60 42 Q68 48 76 42" stroke="#FF8A5B" strokeWidth="1.5" fill="none" strokeDasharray="4 3" className="suture-path" />
          </svg>
        </div>

        {/* endoscope */}
        <div className="endoscope" id="endo">
          <div className="endo-tip" />
        </div>

        {/* instruments */}
        <div className="inst i1" id="inst1" />
        <div className="inst i2" id="inst2" />
        <div className="inst i3" id="inst3" />

        {/* laser */}
        <div className="laser" id="laser" style={{ height: 60, top: 60, left: "calc(50% + 8px)", transform: "rotate(5deg)" }} />

        {/* fragments */}
        {[
          { id: "frag1", style: { width: 6, height: 6, top: 80, left: "calc(50% + 2px)", "--fx": "-8px", "--fy": "-5px" } as React.CSSProperties },
          { id: "frag2", style: { width: 5, height: 5, top: 85, left: "calc(50% + 14px)", "--fx": "6px", "--fy": "-8px" } as React.CSSProperties },
          { id: "frag3", style: { width: 4, height: 4, top: 92, left: "calc(50% - 4px)", "--fx": "-4px", "--fy": "4px" } as React.CSSProperties },
          { id: "frag4", style: { width: 5, height: 5, top: 78, left: "calc(50% + 8px)", "--fx": "8px", "--fy": "6px" } as React.CSSProperties },
        ].map(f => (
          <div key={f.id} className="fragment" id={f.id} style={f.style} />
        ))}

        {/* OR table + patient */}
        <div className="or-table" id="orTable">
          <div className="table-surface">
            <div className="patient" id="patient">
              <div className="pat-body">
                <div className="pat-head" />
                <div className="drape">
                  <div className="drape-window" />
                </div>
              </div>
            </div>
          </div>
          <div className="table-legs">
            <div className="t-leg" />
            <div className="t-leg" />
          </div>
        </div>

        {/* surgeons */}
        <div className="surgeon left-s" id="surgL">
          <div className="s-cap" /><div className="s-head" /><div className="s-mask" />
          <div className="s-body"><div className="s-glove lg" /><div className="s-glove rg" /></div>
        </div>
        <div className="surgeon right-s" id="surgR">
          <div className="s-cap" /><div className="s-head" /><div className="s-mask" />
          <div className="s-body"><div className="s-glove lg" /><div className="s-glove rg" /></div>
        </div>

      </div>

      {/* footer */}
      <div className="step-footer">
        <div>
          <div className="step-title" id="stepTitle" />
        </div>
        <div className="step-desc" id="stepDesc" />
      </div>

      {/* progress bar */}
      <div className="prog-bar" id="progBar" style={{ width: 0 }} />

      {/* step dots */}
      <div className="step-dots" id="stepDots" />
    </div>
  );
}