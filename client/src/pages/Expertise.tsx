import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

/* ── types ── */
interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string; desc?: string }[];
}

const NAV_ITEMS: NavItem[] = [
    {
    label: "Home",
    path: "/",
  },
   {
    label: "Services",
    path: "/medical-services",
  },
   {
    label: "Expertise",
    path: "/areas-of-expertise",
  },
  {
    label: "Why Dr. Sharma",
    path: "/why-choose-DrRakeshSharma",
  }
 
];

/* ── animated underline indicator ── */
function ActiveIndicator({ rect }: { rect: DOMRect | null }) {
  if (!rect) return null;
  return (
    <span
      className="nav-indicator"
      style={{ left: rect.left, width: rect.width }}
    />
  );
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeRect,   setActiveRect]   = useState<DOMRect | null>(null);
  const [hoverRect,    setHoverRect]    = useState<DOMRect | null>(null);
  const navRef  = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* scroll shadow */
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* track active link rect */
  useEffect(() => {
    const active = linkRefs.current[location.pathname];
    if (active) setActiveRect(active.getBoundingClientRect());
  }, [location.pathname, scrolled]);

  /* recalc on resize */
  useEffect(() => {
    const h = () => {
      const active = linkRefs.current[location.pathname];
      if (active) setActiveRect(active.getBoundingClientRect());
    };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        :root {
          --teal:   #2CCED1;
          --light:  #F4F4F4;
          --white:  #FFFFFF;
          --orange: #FF8A5B;
          --dark:   #0d1e28;
          --text:   #1a3040;
          --muted:  rgba(26,48,64,0.48);
          --nav-h:  68px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        /* ═══ NAVBAR SHELL ═══ */
        .nav-shell {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);
          border-bottom: 1px solid rgba(44,206,209,0.10);
          transition: box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease;
          will-change: box-shadow;
        }
        .nav-shell.scrolled {
          box-shadow: 0 4px 32px rgba(44,206,209,0.08), 0 1px 0 rgba(44,206,209,0.12);
          border-bottom-color: rgba(44,206,209,0.14);
          background: rgba(255,255,255,0.97);
        }

        .nav-inner {
          width: 100%; max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        /* ═══ LOGO ═══ */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          flex-shrink: 0;
          opacity: 0;
          animation: navFadeDown 0.7s cubic-bezier(.22,.68,0,1.2) 0.1s both;
        }
        @keyframes navFadeDown {
          from { opacity:0; transform:translateY(-14px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .logo-mark {
          position: relative;
          width: 40px; height: 40px;
          background: linear-gradient(135deg, #2CCED1, #FF8A5B);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600;
          color: #fff;
          box-shadow: 0 0 0 0 rgba(44,206,209,0.4);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        }
        .nav-logo:hover .logo-mark {
          transform: scale(1.08) rotate(-3deg);
          box-shadow: 0 0 0 6px rgba(44,206,209,0.12), 0 4px 18px rgba(44,206,209,0.28);
        }
        .logo-pulse {
          position: absolute;
          inset: 0; border-radius: 10px;
          background: linear-gradient(135deg, #2CCED1, #FF8A5B);
          opacity: 0;
          animation: logoPulse 3s ease-in-out infinite 1.5s;
        }
        @keyframes logoPulse {
          0%,100% { transform:scale(1);   opacity:0; }
          50%      { transform:scale(1.4); opacity:0.18; }
        }

        .logo-text { display:flex; flex-direction:column; line-height:1.1; }
        .logo-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 600;
          color: var(--dark); letter-spacing: 0.2px;
          transition: color 0.2s;
        }
        .nav-logo:hover .logo-name { color: #2CCED1; }
        .logo-sub {
          font-size: 9.5px; font-weight: 400;
          color: var(--muted); letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        /* ═══ DESKTOP LINKS ═══ */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
          position: relative;
        }

        /* sliding hover/active indicator bar */
        .nav-indicator {
          position: fixed;
          bottom: 0;
          height: 2px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
          border-radius: 2px 2px 0 0;
          pointer-events: none;
          transition: left 0.35s cubic-bezier(.4,0,.2,1), width 0.35s cubic-bezier(.4,0,.2,1), opacity 0.2s;
          z-index: 1001;
        }
        .nav-indicator.hover-ind {
          background: rgba(44,206,209,0.35);
          height: 2px;
        }

        .nav-link {
          position: relative;
          display: flex; align-items: center; gap: 5px;
          padding: 8px 14px;
          font-size: 12.5px; font-weight: 400;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 8px;
          transition: color 0.22s ease, background 0.22s ease;
          white-space: nowrap;
          opacity: 0;
          animation: navFadeDown 0.7s cubic-bezier(.22,.68,0,1.2) both;
        }
        .nav-link:nth-child(1) { animation-delay: 0.18s; }
        .nav-link:nth-child(2) { animation-delay: 0.26s; }
        .nav-link:nth-child(3) { animation-delay: 0.34s; }
        .nav-link:nth-child(4) { animation-delay: 0.42s; }
        .nav-link:nth-child(5) { animation-delay: 0.50s; }

        .nav-link:hover {
          color: var(--dark);
          background: rgba(44,206,209,0.06);
        }
        .nav-link.active {
          color: var(--dark);
          font-weight: 500;
        }

        /* active dot */
        .nav-link.active::before {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #2CCED1;
          box-shadow: 0 0 6px rgba(44,206,209,0.8);
        }

        /* ═══ CTA BUTTON ═══ */
        .nav-cta-wrap {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 12px;
          opacity: 0;
          animation: navFadeDown 0.7s cubic-bezier(.22,.68,0,1.2) 0.52s both;
        }

        .nav-phone {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 400;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-phone:hover { color: #2CCED1; }
        .phone-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(44,206,209,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .nav-phone:hover .phone-icon {
          border-color: #2CCED1;
          background: rgba(44,206,209,0.07);
        }

        .btn-book {
          position: relative; overflow: hidden;
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb);
          border: none; border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #fff; cursor: pointer;
          box-shadow: 0 4px 16px rgba(44,206,209,0.32), 0 1px 4px rgba(0,0,0,0.06);
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease;
          white-space: nowrap;
          text-decoration: none;
        }
        .btn-book::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #FF8A5B, #e06030);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-book:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(44,206,209,0.42), 0 2px 8px rgba(0,0,0,0.08);
        }
        .btn-book:hover::before { opacity: 1; }
        .btn-book span { position: relative; z-index: 1; }
        .btn-book-dot {
          position: relative; z-index: 1;
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.7);
          animation: bookDot 2s ease-in-out infinite;
        }
        @keyframes bookDot {
          0%,100% { opacity:0.7; transform:scale(1); }
          50%      { opacity:1;   transform:scale(1.4); }
        }

        /* ═══ PROGRESS LINE ═══ */
        .nav-progress {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
          transition: width 0.1s linear;
          opacity: 0.6;
        }

        /* ═══ MOBILE HAMBURGER ═══ */
        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 36px; height: 36px;
          align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .nav-burger:hover { background: rgba(44,206,209,0.07); }
        .burger-bar {
          display: block;
          width: 22px; height: 1.5px;
          background: var(--dark);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s ease, width 0.3s ease;
          transform-origin: center;
        }
        .nav-burger.open .burger-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger.open .burger-bar:nth-child(2) { opacity: 0; width: 0; }
        .nav-burger.open .burger-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ═══ MOBILE MENU ═══ */
        .mobile-menu {
          position: fixed;
          top: var(--nav-h); left: 0; right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(44,206,209,0.12);
          z-index: 999;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(.4,0,.2,1), opacity 0.35s ease;
          opacity: 0;
        }
        .mobile-menu.open {
          max-height: 520px;
          opacity: 1;
        }
        .mobile-menu-inner {
          padding: 20px 24px 28px;
          display: flex; flex-direction: column; gap: 4px;
        }

        .mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px;
          font-size: 14px; font-weight: 400;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 10px;
          border: 1px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
          color: var(--dark);
          background: rgba(44,206,209,0.06);
          border-color: rgba(44,206,209,0.14);
        }
        .mobile-link.active { color: #2CCED1; font-weight: 500; }
        .mobile-link-arrow {
          opacity: 0.3;
          transition: opacity 0.2s, transform 0.2s;
        }
        .mobile-link:hover .mobile-link-arrow { opacity: 0.7; transform: translateX(3px); }

        .mobile-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(44,206,209,0.18), transparent);
          margin: 10px 0;
        }

        .mobile-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb);
          border-radius: 10px;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #fff; text-decoration: none;
          margin-top: 8px;
          box-shadow: 0 4px 18px rgba(44,206,209,0.32);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        }
        .mobile-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(44,206,209,0.42); }

        .mobile-contact {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px;
          font-size: 13px; color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.04em;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
        }
        .mobile-contact:hover { color: #2CCED1; background: rgba(44,206,209,0.05); }

        /* spacer for fixed nav */
        .nav-spacer { height: var(--nav-h); }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 900px) {
          .nav-links, .nav-phone { display: none; }
          .nav-burger { display: flex; }
          .nav-inner { padding: 0 20px; }
        }
        @media (max-width: 480px) {
          .btn-book { display: none; }
        }
      `}</style>

      {/* scroll progress indicator */}
      <ScrollProgress />

      <header
        ref={navRef}
        className={`nav-shell${scrolled ? " scrolled" : ""}`}
        role="banner"
      >
        <div className="nav-inner">

          {/* LOGO */}
          <Link to="/" className="nav-logo" aria-label="SRK Hospital Home">
            <div className="logo-mark">
              <div className="logo-pulse" />
              S
            </div>
            <div className="logo-text">
              <span className="logo-name">SRK Hospital</span>
              <span className="logo-sub">Urology Center</span>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="nav-links" role="navigation" aria-label="Main navigation">
            {/* hover ghost indicator */}
            {hoverRect && (
              <ActiveIndicator rect={hoverRect} />
            )}
            {/* active solid indicator */}
            {!hoverRect && activeRect && (
              <ActiveIndicator rect={activeRect} />
            )}

            {NAV_ITEMS.map((item) => (
              item.path ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link${isActive(item.path) ? " active" : ""}`}
                  ref={(el) => {
                    if (item.path) linkRefs.current[item.path] = el;
                  }}
                  onMouseEnter={(e) => setHoverRect((e.currentTarget as HTMLElement).getBoundingClientRect())}
                  onMouseLeave={() => setHoverRect(null)}
                >
                  {item.label}
                </Link>
              ) : null
            ))}
          </nav>

          {/* CTA + PHONE */}
          <div className="nav-cta-wrap">
            <a href="tel:+919773332601" className="nav-phone" aria-label="Call us">
              <div className="phone-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              +91 9773332601
            </a>

            <a href="tel:+919773332601" className="btn-book">
              <div className="btn-book-dot" />
              <span>Book Consultation</span>
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className={`nav-burger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-inner">
          <Link to="/" className={`mobile-link${isActive("/") ? " active" : ""}`}>
            Home
            <svg className="mobile-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {NAV_ITEMS.map((item) =>
            item.path ? (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-link${isActive(item.path) ? " active" : ""}`}
              >
                {item.label}
                <svg className="mobile-link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ) : null
          )}

          <div className="mobile-divider" />

          <a href="tel:+919773332601" className="mobile-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            +91 988 7711 224
          </a>

          <a href="tel:+919773332601" className="mobile-cta">
            Book a Consultation
          </a>
        </div>
      </div>

      {/* spacer so content isn't hidden behind fixed nav */}
      <div className="nav-spacer" />
    </>
  );
}

/* ── scroll progress bar ── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 1002,
        height: "2px",
        width: `${width}%`,
        background: "linear-gradient(90deg, #2CCED1, #FF8A5B)",
        transition: "width 0.1s linear",
        opacity: width > 2 ? 0.7 : 0,
        pointerEvents: "none",
      }}
    />
  );
}