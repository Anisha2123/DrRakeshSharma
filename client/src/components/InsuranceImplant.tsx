import { useEffect, useRef, useState } from "react";

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

/* ── Types ── */
type PartnerType = "Insurance" | "TPA" | "Govt Scheme" | "Accreditation";

interface Partner {
  name:       string;
  short:      string;
  type:       PartnerType;
  domain:     string;
  color:      string;
  badge?:     string;
  localImg?:  string; // ← put e.g. "/insurance/starhealth.png" here to use local image
}

/* ── Partner data ── */
const INSURERS: Partner[] = [
  /* ── Insurance companies ── */
  {
    name: "Aditya Birla Health Insurance",
    short: "AB",
    type: "Insurance",
    domain: "adityabirlahealthinsurance.com",
    color: "#e8003d",
    localImg: "/insurance/adityabirla.png",
  },
  {
    name: "Tata AIG",
    short: "TA",
    type: "Insurance",
    domain: "tataaig.com",
    color: "#0a3f7f",
    localImg: "/insurance/tataaig.png", // add if you have
  },
  {
    name: "New India Insurance",
    short: "NI",
    type: "Insurance",
    domain: "newindia.co.in",
    color: "#004b8d",
    localImg: "/insurance/newindia.png", // add if you have
  },
  {
    name: "Oriental Insurance",
    short: "OI",
    type: "Insurance",
    domain: "orientalinsurance.org.in",
    color: "#0066cc",
    localImg: "/insurance/oriental.png", // add if you have
  },
  {
    name: "United India Insurance",
    short: "UI",
    type: "Insurance",
    domain: "uiic.co.in",
    color: "#003087",
    localImg: "/insurance/unitedindia.png", // add if you have
  },
  {
    name: "Bajaj Allianz",
    short: "BA",
    type: "Insurance",
    domain: "bajajallianz.com",
    color: "#003da5",
    localImg: "/insurance/bajaj.png", // add if you have
  },
  {
    name: "Star Health Insurance",
    short: "SH",
    type: "Insurance",
    domain: "starhealth.in",
    color: "#e4002b",
    localImg: "/insurance/starhealth.png", // add if you have
  },
  {
    name: "SBI General",
    short: "SB",
    type: "Insurance",
    domain: "sbigeneral.in",
    color: "#22409a",
    localImg: "/insurance/SBIgeneral.jpeg",
  },
  {
    name: "Future Generali",
    short: "FG",
    type: "Insurance",
    domain: "futuregenerali.in",
    color: "#e4002b",
    localImg: "/insurance/futuregeneral.jpeg",
  },
  {
    name: "Max Bupa (Niva Bupa)",
    short: "MB",
    type: "Insurance",
    domain: "nivabupa.com",
    color: "#e4002b",
    localImg: "/insurance/nivabupa.png", // add if you have
  },
  {
    name: "National Insurance",
    short: "NA",
    type: "Insurance",
    domain: "nationalinsurance.nic.co.in",
    color: "#004b8d",
    localImg: "/insurance/nationalinsurance.jpeg",
  },
  {
    name: "Universal Sompo General",
    short: "US",
    type: "Insurance",
    domain: "universalsompo.com",
    color: "#003da5",
    localImg: "/insurance/universalsompo.png", // add if you have
  },

  /* ── TPA companies ── */
  {
    name: "Medi Assist TPA",
    short: "MA",
    type: "TPA",
    domain: "mediassist.in",
    color: "#0082c8",
  },
  {
    name: "Vipul Medcorp TPA",
    short: "VM",
    type: "TPA",
    domain: "vipulmedcorp.com",
    color: "#003da5",
    localImg: "/insurance/vipulmedcorp.jpeg",
  },
  {
    name: "Raksha TPA",
    short: "RK",
    type: "TPA",
    domain: "raksha-tpa.com",
    color: "#e4002b",
    localImg: "/insurance/rakshatpa.jpeg",
  },
  {
    name: "Health India TPA",
    short: "HI",
    type: "TPA",
    domain: "healthindiatpa.com",
    color: "#0082c8",
    localImg: "/insurance/healthindia.jpeg",
  },
  {
    name: "MD India TPA",
    short: "MD",
    type: "TPA",
    domain: "mdindia.com",
    color: "#003da5",
  },
  {
    name: "GHPL TPA",
    short: "GH",
    type: "TPA",
    domain: "ghplgroup.com",
    color: "#2CCED1",
    localImg: "/insurance/GHPLtpa.jpeg",
  },
  {
    name: "FHPL TPA",
    short: "FH",
    type: "TPA",
    domain: "fhpl.net",
    color: "#003da5",
  },
  {
    name: "Park Mediclaim TPA",
    short: "PM",
    type: "TPA",
    domain: "parkmediclaim.co.in",
    color: "#0082c8",
    localImg: "/insurance/parktpa.jpeg",
  },
  {
    name: "East West TPA",
    short: "EW",
    type: "TPA",
    domain: "eastwesttpa.com",
    color: "#e4002b",
    localImg: "/insurance/ewa.jpeg",
  },
  {
    name: "Heritage TPA",
    short: "HE",
    type: "TPA",
    domain: "heritagehealthtpa.com",
    color: "#003da5",
  },
  {
    name: "E-Meditek TPA",
    short: "EM",
    type: "TPA",
    domain: "emeditek.com",
    color: "#0082c8",
    localImg: "/insurance/emeditektpa.jpeg",
  },
  {
    name: "Ericson TPA",
    short: "ER",
    type: "TPA",
    domain: "ericson.in",
    color: "#003da5",
    localImg: "/insurance/ericsontpa.jpeg",
  },
  {
    name: "Paramount TPA",
    short: "PA",
    type: "TPA",
    domain: "paramounttpa.com",
    color: "#e4002b",
    localImg: "/insurance/paramount.jpeg",
  },

  /* ── Government Schemes ── */
  {
    name: "RGHS — Rajasthan Govt Health Scheme",
    short: "RG",
    type: "Govt Scheme",
    domain: "rghs.rajasthan.gov.in",
    color: "#1a6fbf",
    badge: "Cashless",
  },
  {
    name: "Haryana Government Health Scheme",
    short: "HR",
    type: "Govt Scheme",
    domain: "haryanahealth.nic.in",
    color: "#1a6fbf",
    badge: "Cashless",
    localImg: "/insurance/HGHS.jpeg",
  },
  {
    name: "Ayushman Bharat — PMJAY",
    short: "AB",
    type: "Govt Scheme",
    domain: "pmjay.gov.in",
    color: "#2e7d32",
    badge: "₹5L Cover",
    localImg: "/insurance/PMJAY.jpeg",
  },
  {
    name: "CGHS — Central Govt Health Scheme",
    short: "CG",
    type: "Govt Scheme",
    domain: "cghs.gov.in",
    color: "#6a1b9a",
    badge: "Central Govt",
    localImg: "/insurance/CGHS.jpeg",
  },
  {
    name: "ECHS — Ex-Servicemen Health Scheme",
    short: "EC",
    type: "Govt Scheme",
    domain: "echs.gov.in",
    color: "#bf360c",
    badge: "Defence",
    localImg: "/insurance/ECHS.jpeg",
  },

  /* ── Accreditations ── */
  {
    name: "NABH Accredited Hospital",
    short: "NH",
    type: "Accreditation",
    domain: "nabh.co",
    color: "#00796b",
    badge: "Quality Mark",
  },
];

const faviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

const TIPS = [
  { icon: "card",  text: "Bring your TPA/Insurance card along with Photo ID and proof of residence." },
  { icon: "doc",   text: "Carry all past treatment papers to the hospital if any." },
  { icon: "book",  text: "Familiarise yourself with the medi-claim policy rules through self-education or your insurer." },
  { icon: "info",  text: "Know your total sum insured and the room rent percentage allowed per day." },
];

const FILTER_TABS: { label: string; value: "all" | PartnerType }[] = [
  { label: "All Partners",  value: "all"           },
  { label: "Insurance",     value: "Insurance"     },
  { label: "TPA",           value: "TPA"           },
  { label: "Govt Schemes",  value: "Govt Scheme"   },
  { label: "Accreditation", value: "Accreditation" },
];

const TYPE_STYLE: Record<PartnerType, { bg: string; text: string; label: string }> = {
  "Insurance":     { bg: "rgba(44,206,209,.1)",  text: "#1aa8ab",  label: "Insurance"     },
  "TPA":           { bg: "rgba(255,138,91,.1)",  text: "#d05020",  label: "TPA"           },
  "Govt Scheme":   { bg: "rgba(26,111,191,.1)",  text: "#1a6fbf",  label: "Govt Scheme"   },
  "Accreditation": { bg: "rgba(0,121,107,.1)",   text: "#00796b",  label: "Accreditation" },
};

/* ── SVG helpers ── */
function TipIcon({ type }: { type: string }) {
  const s = { width: 18, height: 18, fill: "none" as const, stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "card") return <svg viewBox="0 0 24 24" {...s}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
  if (type === "doc")  return <svg viewBox="0 0 24 24" {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  if (type === "book") return <svg viewBox="0 0 24 24" {...s}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>;
  return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}

function ShieldCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  );
}

function StarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

/* ── Fallback avatar ── */
function FallbackAvatar({ short, color }: { short: string; color: string }) {
  return (
    <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color, letterSpacing: ".5px", flexShrink: 0 }}>
      {short}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CompanyLogo — priority: localImg → Google favicon → avatar
   ──────────────────────────────────────────────────────────── */
function CompanyLogo({ domain, short, color, localImg }: {
  domain: string; short: string; color: string; localImg?: string;
}) {
  // which source are we currently trying: "local" | "favicon" | "fallback"
  const hasLocal = Boolean(localImg);
  const [src,        setSrc]        = useState<string>(hasLocal ? localImg! : faviconUrl(domain));
  const [stage,      setStage]      = useState<"local" | "favicon" | "fallback">(hasLocal ? "local" : "favicon");
  const [imgLoaded,  setImgLoaded]  = useState(false);

  const handleError = () => {
    if (stage === "local") {
      // local image failed → try favicon
      setSrc(faviconUrl(domain));
      setStage("favicon");
      setImgLoaded(false);
    } else {
      // favicon also failed → show avatar
      setStage("fallback");
    }
  };

  if (stage === "fallback") return <FallbackAvatar short={short} color={color} />;

  return (
    <div className="logo-box" style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", border: "1px solid rgba(26,48,64,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.06)", transition: "box-shadow .2s, transform .25s cubic-bezier(.34,1.56,.64,1)" }}>
      {!imgLoaded && <FallbackAvatar short={short} color={color} />}
      <img
        src={src}
        alt={short}
        width={stage === "local" ? 36 : 26}
        height={stage === "local" ? 36 : 26}
        style={{ display: imgLoaded ? "block" : "none", objectFit: "contain", borderRadius: stage === "local" ? 8 : 4 }}
        onLoad={() => setImgLoaded(true)}
        onError={handleError}
      />
    </div>
  );
}

/* ── Accreditation / Govt special card ── */
function SpecialCard({ partner, inView, delay }: { partner: Partner; inView: boolean; delay: number }) {
  const isAccred = partner.type === "Accreditation";
  const accent   = isAccred ? "#00796b" : "#1a6fbf";
  return (
    <div
      className={`ins-card ins-card-special${inView ? " in" : ""}`}
      style={{ transitionDelay: `${delay}ms`, borderColor: `${accent}25`, background: isAccred ? "rgba(0,121,107,.03)" : "rgba(26,111,191,.03)" }}
    >
      {isAccred && (
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", alignItems: "center", gap: 3, color: "#00796b", fontSize: 9, fontWeight: 700 }}>
          <StarIcon /><StarIcon /><StarIcon />
        </div>
      )}
      <CompanyLogo domain={partner.domain} short={partner.short} color={partner.color} localImg={partner.localImg} />
      <div className="ins-card-info">
        <div className="ins-card-name" title={partner.name}>{partner.name}</div>
        <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
          <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 100, fontSize: 9, letterSpacing: "1.2px", textTransform: "uppercase" as const, fontWeight: 500, background: TYPE_STYLE[partner.type].bg, color: TYPE_STYLE[partner.type].text }}>
            {TYPE_STYLE[partner.type].label}
          </span>
          {partner.badge && (
            <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 100, fontSize: 9, letterSpacing: "1px", textTransform: "uppercase" as const, fontWeight: 600, background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
              {partner.badge}
            </span>
          )}
        </div>
      </div>
      <div className="ins-card-sno">{isAccred ? "✦" : "★"}</div>
    </div>
  );
}

/* ── Main ── */
export default function InsuranceEmpanelment() {
  const { ref: heroRef, inView: heroIn } = useInView(0.1);
  const { ref: gridRef, inView: gridIn } = useInView(0.08);
  const { ref: tipsRef, inView: tipsIn } = useInView(0.1);
  const { ref: ctaRef,  inView: ctaIn  } = useInView(0.1);

  const [filter, setFilter] = useState<"all" | PartnerType>("all");
  const [search, setSearch] = useState("");
  const [count,  setCount]  = useState(0);

  const totalInsurance = INSURERS.filter(p => p.type === "Insurance").length;
  const totalTPA       = INSURERS.filter(p => p.type === "TPA").length;
  const totalSpecial   = INSURERS.filter(p => p.type === "Govt Scheme" || p.type === "Accreditation").length;
  const grandTotal     = INSURERS.length;

  useEffect(() => {
    if (!heroIn) return;
    let i = 0;
    const id = setInterval(() => { i++; setCount(i); if (i >= grandTotal) clearInterval(id); }, 40);
    return () => clearInterval(id);
  }, [heroIn, grandTotal]);

  const filtered = INSURERS.filter(p => {
    const matchType   = filter === "all" || p.type === filter;
    const matchSearch = search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const regular = filtered.filter(p => p.type === "Insurance" || p.type === "TPA");
  const special  = filtered.filter(p => p.type === "Govt Scheme" || p.type === "Accreditation");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        .ins-root { position: relative; overflow: hidden; background: #F4F4F4; padding: 96px 40px 80px; font-family: 'DM Sans', sans-serif; }
        .ins-root::before { content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); opacity: .018; }
        .ins-root::after { content: ''; position: absolute; width: 800px; height: 800px; top: -300px; left: -220px; border-radius: 50%; background: radial-gradient(circle, rgba(44,206,209,.09) 0%, transparent 65%); pointer-events: none; z-index: 0; animation: rootGlow 10s ease-in-out infinite; }
        @keyframes rootGlow { 0%,100%{transform:scale(1);} 50%{transform:scale(1.1);} }

        .ins-grid-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(44,206,209,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(44,206,209,.055) 1px, transparent 1px); background-size: 60px 60px; }
        .ins-blob { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; width: 520px; height: 520px; bottom: -170px; right: -130px; background: radial-gradient(circle, rgba(255,138,91,.1) 0%, transparent 65%); filter: blur(70px); animation: blobF 14s ease-in-out infinite; }
        @keyframes blobF { 0%,100%{transform:scale(1);} 40%{transform:scale(1.1) translate(-18px,-24px);} 70%{transform:scale(.94) translate(12px,16px);} }

        .ins-top-line { position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 1; background: linear-gradient(90deg, transparent, #2CCED1 30%, #FF8A5B 70%, transparent); opacity: .7; }
        .ins-inner { position: relative; z-index: 5; max-width: 1120px; margin: 0 auto; }

        .ins-hero { text-align: center; margin-bottom: 56px; }
        .ins-eyebrow { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px; opacity: 0; transform: translateY(20px); transition: opacity .7s ease .1s, transform .7s ease .1s; }
        .ins-eyebrow.in { opacity: 1; transform: translateY(0); }
        .ins-eyebrow-dash { width: 24px; height: 1.5px; background: #2CCED1; opacity: .7; }
        .ins-eyebrow-txt { font-size: 11px; font-weight: 500; letter-spacing: 2.5px; text-transform: uppercase; color: #2CCED1; }

        .ins-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem, 4vw, 3.6rem); font-weight: 600; line-height: 1.08; color: #0d1e28; margin-bottom: 16px; opacity: 0; transform: translateY(24px); transition: opacity .85s ease .22s, transform .85s cubic-bezier(.22,.68,0,1.18) .22s; }
        .ins-heading.in { opacity: 1; transform: translateY(0); }
        .ins-heading em { font-style: italic; background: linear-gradient(90deg, #FF8A5B, #e05828, #FF8A5B); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimH 4s linear infinite 1s; }
        @keyframes shimH { 0%{background-position:0%;} 100%{background-position:200%;} }

        .ins-sub { font-size: 15px; font-weight: 300; line-height: 1.78; color: rgba(26,48,64,.58); max-width: 520px; margin: 0 auto 28px; opacity: 0; transform: translateY(16px); transition: opacity .85s ease .36s, transform .85s ease .36s; }
        .ins-sub.in { opacity: 1; transform: translateY(0); }

        .ins-stats-row { display: inline-flex; align-items: center; gap: 0; background: #fff; border: 1px solid rgba(44,206,209,.2); border-radius: 16px; overflow: hidden; box-shadow: 0 4px 18px rgba(44,206,209,.1); opacity: 0; transition: opacity .8s ease .5s; }
        .ins-stats-row.in { opacity: 1; }
        .ins-stat-cell { padding: 14px 22px; text-align: center; border-right: 1px solid rgba(44,206,209,.12); position: relative; }
        .ins-stat-cell:last-child { border-right: none; }
        .ins-stat-cell::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 40%; height: 2px; background: linear-gradient(90deg, transparent, #2CCED1, transparent); }
        .ins-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 600; line-height: 1; background: linear-gradient(135deg, #2CCED1, #FF8A5B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ins-stat-lbl { font-size: 9px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(26,48,64,.42); margin-top: 4px; }

        .ins-controls { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 28px; opacity: 0; transform: translateY(14px); transition: opacity .7s ease .55s, transform .7s ease .55s; }
        .ins-controls.in { opacity: 1; transform: translateY(0); }

        .ins-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .ins-filter-btn { padding: 8px 16px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; border: 1px solid rgba(44,206,209,.25); background: #fff; color: rgba(26,48,64,.55); transition: all .2s ease; white-space: nowrap; }
        .ins-filter-btn:hover { border-color: rgba(44,206,209,.5); color: #0d1e28; background: rgba(44,206,209,.06); }
        .ins-filter-btn.active { background: linear-gradient(135deg, #2CCED1, #1ab8bb); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(44,206,209,.3); }
        .ins-filter-btn.special-tab { border-color: rgba(26,111,191,.28); color: #1a6fbf; }
        .ins-filter-btn.special-tab:hover { border-color: rgba(26,111,191,.5); background: rgba(26,111,191,.06); color: #1a6fbf; }
        .ins-filter-btn.special-tab.active { background: linear-gradient(135deg, #1a6fbf, #1257a0); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(26,111,191,.3); }
        .ins-filter-btn.accred-tab { border-color: rgba(0,121,107,.28); color: #00796b; }
        .ins-filter-btn.accred-tab:hover { border-color: rgba(0,121,107,.5); background: rgba(0,121,107,.06); }
        .ins-filter-btn.accred-tab.active { background: linear-gradient(135deg, #00796b, #005c52); border-color: transparent; color: #fff; box-shadow: 0 4px 14px rgba(0,121,107,.3); }

        .ins-search { position: relative; }
        .ins-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: rgba(26,48,64,.35); pointer-events: none; }
        .ins-search input { height: 38px; padding: 0 14px 0 36px; border-radius: 100px; border: 1px solid rgba(44,206,209,.22); background: #fff; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #0d1e28; outline: none; transition: border-color .2s, box-shadow .2s; width: 220px; }
        .ins-search input::placeholder { color: rgba(26,48,64,.35); }
        .ins-search input:focus { border-color: rgba(44,206,209,.5); box-shadow: 0 0 0 3px rgba(44,206,209,.1); }

        .ins-section-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; margin-top: 8px; }
        .ins-section-label-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(26,111,191,.25), transparent); }
        .ins-section-label-txt { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(26,48,64,.35); white-space: nowrap; }

        .ins-result-count { font-size: 12px; color: rgba(26,48,64,.4); letter-spacing: .04em; margin-bottom: 16px; }

        .ins-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; margin-bottom: 28px; }
        .ins-special-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin-bottom: 48px; }

        .ins-card { position: relative; display: flex; align-items: center; gap: 13px; padding: 16px 18px; background: #fff; border: 1px solid rgba(44,206,209,.13); border-radius: 14px; opacity: 0; transform: translateY(18px) scale(.97); transition: opacity .5s ease, transform .5s cubic-bezier(.22,.68,0,1.18), border-color .2s, box-shadow .2s; overflow: hidden; }
        .ins-card.in { opacity: 1; transform: translateY(0) scale(1); }
        .ins-card:hover { border-color: rgba(44,206,209,.38); box-shadow: 0 6px 24px rgba(44,206,209,.12), 0 2px 8px rgba(0,0,0,.04); transform: translateY(-3px) scale(1.01); }
        .ins-card:hover .logo-box { box-shadow: 0 4px 12px rgba(0,0,0,.1); transform: scale(1.08) rotate(-3deg); }
        .ins-card-special { padding: 18px 20px; }
        .ins-card-special:hover { border-color: rgba(26,111,191,.38); box-shadow: 0 8px 28px rgba(26,111,191,.14); }
        .ins-card::after { content: ''; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 2px; background: transparent; transition: background .25s ease; }
        .ins-card:hover::after { background: linear-gradient(to bottom, #2CCED1, #FF8A5B); }
        .ins-card-special:hover::after { background: linear-gradient(to bottom, #1a6fbf, #00796b); }
        .ins-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(105deg, transparent 30%, rgba(44,206,209,.06) 50%, transparent 70%); transform: translateX(-100%); transition: transform .55s ease; }
        .ins-card:hover::before { transform: translateX(100%); }

        .logo-box { transition: box-shadow .2s, transform .25s cubic-bezier(.34,1.56,.64,1) !important; }
        .ins-card-info { flex: 1; min-width: 0; }
        .ins-card-name { font-size: 12.5px; font-weight: 400; line-height: 1.35; color: #2a3f50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .2s; }
        .ins-card:hover .ins-card-name { color: #0d1e28; }
        .ins-card-special .ins-card-name { white-space: normal; font-size: 13px; font-weight: 500; }
        .ins-card-sno { position: absolute; top: 8px; right: 10px; font-size: 9px; letter-spacing: 1px; color: rgba(26,48,64,.2); }

        .ins-empty { text-align: center; padding: 48px 0; color: rgba(26,48,64,.38); font-size: 14px; }
        .ins-divider { height: 1px; margin: 0 0 64px; background: linear-gradient(90deg, transparent, rgba(44,206,209,.2), rgba(255,138,91,.15), transparent); }

        .ins-tips-header { display: flex; align-items: center; gap: 14px; margin-bottom: 28px; opacity: 0; transform: translateY(16px); transition: opacity .7s ease .1s, transform .7s ease .1s; }
        .ins-tips-header.in { opacity: 1; transform: translateY(0); }
        .ins-tips-icon-wrap { width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0; background: rgba(255,138,91,.1); border: 1px solid rgba(255,138,91,.22); display: flex; align-items: center; justify-content: center; color: #d05020; }
        .ins-tips-title { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; color: #0d1e28; }
        .ins-tips-title span { font-style: italic; background: linear-gradient(90deg, #2CCED1, #FF8A5B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .ins-tips-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 64px; }
        .ins-tip { display: flex; align-items: flex-start; gap: 14px; padding: 20px 22px; background: #fff; border: 1px solid rgba(255,138,91,.14); border-left: 3px solid #FF8A5B; border-radius: 14px; border-top-left-radius: 0; border-bottom-left-radius: 0; opacity: 0; transform: translateX(-16px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,.68,0,1.18), background .2s, box-shadow .2s; }
        .ins-tip.in { opacity: 1; transform: translateX(0); }
        .ins-tip:hover { background: #fffaf8; box-shadow: 0 4px 18px rgba(255,138,91,.1); border-color: rgba(255,138,91,.28); border-left-color: #FF8A5B; }
        .ins-tip-icon-box { width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0; background: rgba(255,138,91,.09); border: 1px solid rgba(255,138,91,.18); display: flex; align-items: center; justify-content: center; color: #d05020; transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
        .ins-tip:hover .ins-tip-icon-box { transform: scale(1.08); }
        .ins-tip-num { font-size: 9px; letter-spacing: 1.5px; font-weight: 500; text-transform: uppercase; color: rgba(255,138,91,.7); margin-bottom: 5px; }
        .ins-tip-text { font-size: 13.5px; font-weight: 300; line-height: 1.65; color: rgba(26,48,64,.72); }

        .ins-contact { display: flex; align-items: center; justify-content: space-between; padding: 28px 36px; background: #fff; border: 1px solid rgba(44,206,209,.2); border-radius: 16px; box-shadow: 0 4px 24px rgba(44,206,209,.08); opacity: 0; transform: translateY(18px); transition: opacity .8s ease .1s, transform .8s ease .1s; }
        .ins-contact.in { opacity: 1; transform: translateY(0); }
        .ins-contact-left { display: flex; align-items: center; gap: 16px; }
        .ins-contact-icon-box { width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0; background: rgba(44,206,209,.09); border: 1px solid rgba(44,206,209,.22); display: flex; align-items: center; justify-content: center; color: #1aa8ab; }
        .ins-contact-title { font-size: 14px; font-weight: 500; color: #0d1e28; margin-bottom: 3px; }
        .ins-contact-sub { font-size: 12px; font-weight: 300; color: rgba(26,48,64,.5); }
        .ins-contact-btn { display: flex; align-items: center; gap: 8px; padding: 12px 26px; background: linear-gradient(135deg, #2CCED1, #1ab8bb); border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; color: #fff; cursor: pointer; text-decoration: none; flex-shrink: 0; box-shadow: 0 4px 18px rgba(44,206,209,.32); transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s; position: relative; overflow: hidden; }
        .ins-contact-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #FF8A5B, #e06030); opacity: 0; transition: opacity .3s; }
        .ins-contact-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(44,206,209,.45); }
        .ins-contact-btn:hover::before { opacity: 1; }
        .ins-contact-btn span, .ins-contact-btn svg { position: relative; z-index: 1; }

        @media (max-width: 720px) {
          .ins-root { padding: 72px 20px 60px; }
          .ins-controls { flex-direction: column; align-items: stretch; }
          .ins-search input { width: 100%; }
          .ins-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .ins-special-grid { grid-template-columns: 1fr; }
          .ins-tips-grid { grid-template-columns: 1fr; }
          .ins-contact { flex-direction: column; gap: 20px; text-align: center; }
          .ins-contact-left { flex-direction: column; text-align: center; }
          .ins-stats-row { flex-wrap: wrap; }
        }
        @media (max-width: 440px) { .ins-cards-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="ins-root">
        <div className="ins-grid-bg" />
        <div className="ins-top-line" />
        <div className="ins-blob" />

        <div className="ins-inner">

          {/* HERO */}
          <div className="ins-hero" ref={heroRef}>
            <div className={`ins-eyebrow${heroIn ? " in" : ""}`}>
              <div className="ins-eyebrow-dash" />
              <span className="ins-eyebrow-txt">SRK Hospital · Network Partners</span>
              <div className="ins-eyebrow-dash" />
            </div>
            <h2 className={`ins-heading${heroIn ? " in" : ""}`}>
              Empanelled with <em>{grandTotal}+ Partners</em>
            </h2>
            <p className={`ins-sub${heroIn ? " in" : ""}`}>
              SRK Hospital is a cashless network partner with India's leading insurance companies,
              TPAs, and government health schemes — accredited by NABH for quality care.
            </p>
            <div className={`ins-stats-row${heroIn ? " in" : ""}`}>
              {[
                { num: count,         lbl: "Total Partners" },
                { num: totalInsurance, lbl: "Insurance Cos" },
                { num: totalTPA,      lbl: "TPA Partners"   },
                { num: totalSpecial,  lbl: "Govt & Accred"  },
              ].map(({ num, lbl }, i) => (
                <div key={i} className="ins-stat-cell">
                  <div className="ins-stat-num">{num}</div>
                  <div className="ins-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTROLS */}
          <div className={`ins-controls${gridIn ? " in" : ""}`} ref={gridRef}>
            <div className="ins-filters">
              {FILTER_TABS.map(tab => {
                const isGovt   = tab.value === "Govt Scheme";
                const isAccred = tab.value === "Accreditation";
                return (
                  <button
                    key={tab.value}
                    className={`ins-filter-btn${filter === tab.value ? " active" : ""}${isGovt ? " special-tab" : ""}${isAccred ? " accred-tab" : ""}`}
                    onClick={() => setFilter(tab.value)}
                  >
                    {isGovt && "🏛 "}{isAccred && "✦ "}{tab.label}
                  </button>
                );
              })}
            </div>
            <div className="ins-search">
              <div className="ins-search-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <input type="text" placeholder="Search insurer..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          {(search || filter !== "all") && (
            <div className="ins-result-count">Showing {filtered.length} of {grandTotal} partners</div>
          )}
          {filtered.length === 0 && (
            <div className="ins-empty">No partners found for "{search}"</div>
          )}

          {/* GOVT / ACCREDITATION — special wide cards */}
          {special.length > 0 && (
            <>
              <div className="ins-section-label">
                <div className="ins-section-label-line" />
                <span className="ins-section-label-txt">
                  {filter === "Accreditation" ? "✦ Accreditation" : "🏛 Govt Schemes & Accreditation"}
                </span>
                <div className="ins-section-label-line" />
              </div>
              <div className="ins-special-grid">
                {special.map((ins, i) => (
                  <SpecialCard key={ins.name} partner={ins} inView={gridIn} delay={gridIn ? Math.min(i * 60, 400) : 0} />
                ))}
              </div>
              {regular.length > 0 && (
                <div className="ins-section-label" style={{ marginBottom: 20 }}>
                  <div className="ins-section-label-line" />
                  <span className="ins-section-label-txt">Insurance & TPA Partners</span>
                  <div className="ins-section-label-line" />
                </div>
              )}
            </>
          )}

          {/* REGULAR CARDS */}
          {regular.length > 0 && (
            <div className="ins-cards-grid">
              {regular.map((ins, i) => {
                const ts = TYPE_STYLE[ins.type];
                return (
                  <div
                    key={ins.name}
                    className={`ins-card${gridIn ? " in" : ""}`}
                    style={{ transitionDelay: `${gridIn ? Math.min(i * 45, 700) : 0}ms` }}
                  >
                    <CompanyLogo domain={ins.domain} short={ins.short} color={ins.color} localImg={ins.localImg} />
                    <div className="ins-card-info">
                      <div className="ins-card-name" title={ins.name}>{ins.name}</div>
                      <span style={{ display: "inline-block", marginTop: 5, padding: "2px 8px", borderRadius: 100, fontSize: 9, letterSpacing: "1.2px", textTransform: "uppercase" as const, fontWeight: 500, background: ts.bg, color: ts.text }}>
                        {ts.label}
                      </span>
                    </div>
                    <div className="ins-card-sno">{String(INSURERS.indexOf(ins) + 1).padStart(2, "0")}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="ins-divider" />

          {/* TIPS */}
          <div ref={tipsRef}>
            <div className={`ins-tips-header${tipsIn ? " in" : ""}`}>
              <div className="ins-tips-icon-wrap"><ShieldCheck /></div>
              <div className="ins-tips-title">Tips for <span>Hassle-Free</span> Cashless Experience</div>
            </div>
            <div className="ins-tips-grid">
              {TIPS.map((tip, i) => (
                <div key={i} className={`ins-tip${tipsIn ? " in" : ""}`} style={{ transitionDelay: tipsIn ? `${i * 100 + 100}ms` : "0ms" }}>
                  <div className="ins-tip-icon-box"><TipIcon type={tip.icon} /></div>
                  <div>
                    <div className="ins-tip-num">Tip {String(i + 1).padStart(2, "0")}</div>
                    <div className="ins-tip-text">{tip.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className={`ins-contact${ctaIn ? " in" : ""}`} ref={ctaRef}>
            <div className="ins-contact-left">
              <div className="ins-contact-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="ins-contact-title">Have a question about insurance coverage?</div>
                <div className="ins-contact-sub">Write to us at info@srkhospitals.in — we're here to help</div>
              </div>
            </div>
            <a href="tel:+919887711224" className="ins-contact-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
              </svg>
              <span>Contact Us</span>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}