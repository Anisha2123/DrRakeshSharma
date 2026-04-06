import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home",      path: "/"                          },
  { label: "Services",  path: "/medical-services"          },
  { label: "Expertise", path: "/areas-of-expertise"        },
  { label: "Blogs",     path: "/our-blogs"                 },
  { label: "About Us",  path: "/why-choose-DrRakeshSharma" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [activeOffset, setActiveOffset] = useState<{ left: number; width: number } | null>(null);
  const [hoverOffset,  setHoverOffset]  = useState<{ left: number; width: number } | null>(null);

  const linksContainerRef = useRef<HTMLElement>(null);
  const linkRefs          = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const recalcActive = () => {
    const container = linksContainerRef.current;
    const el        = linkRefs.current[location.pathname];
    if (!container || !el) { setActiveOffset(null); return; }
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setActiveOffset({ left: eRect.left - cRect.left, width: eRect.width });
  };

  useEffect(() => {
    const t = setTimeout(recalcActive, 30);
    return () => clearTimeout(t);
  }, [location.pathname, scrolled]);

  useEffect(() => {
    window.addEventListener("resize", recalcActive);
    return () => window.removeEventListener("resize", recalcActive);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const container = linksContainerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoverOffset({ left: eRect.left - cRect.left, width: eRect.width });
  };

  const handleMouseLeave = () => setHoverOffset(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --teal:      #2CCED1;
          --teal-d:    #1ab8bb;
          --light:     #F4F4F4;
          --white:     #FFFFFF;
          --orange:    #FF8A5B;
          --dark:      #0d1e28;
          --nav-text:  #2a3f50;
          --nav-muted: rgba(26,48,64,0.62);
          --nav-h:     68px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }

        /* ── SHELL ── */
        .nav-shell {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000; height: var(--nav-h);
          display: flex; align-items: center;
          background: rgba(255,255,255,0.94);
          backdrop-filter: blur(22px) saturate(1.5);
          -webkit-backdrop-filter: blur(22px) saturate(1.5);
          border-bottom: 1px solid rgba(44,206,209,0.12);
          transition: box-shadow .4s ease, background .4s ease, border-color .4s ease;
        }
        .nav-shell.scrolled {
          box-shadow: 0 4px 32px rgba(44,206,209,0.09), 0 1px 0 rgba(44,206,209,0.14);
          border-bottom-color: rgba(44,206,209,0.18);
          background: rgba(255,255,255,0.98);
        }

        .nav-inner {
          width: 100%; max-width: 1300px; margin: 0 auto;
          padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between; gap: 40px;
        }

        /* ── LOGO ── */
        .nav-logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0;
          opacity: 0;
          animation: navFD .7s cubic-bezier(.22,.68,0,1.2) .1s both;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1), filter .3s ease;
        }
        .nav-logo:hover {
          transform: scale(1.03);
          filter: drop-shadow(0 2px 12px rgba(44,206,209,0.28));
        }

        /*
          The SRK Hospital logo (image.png) has a dark/black background.
          We use a white background pill + object-fit:contain so the logo
          sits cleanly on the white navbar without any colour clash.
          If the image is a transparent-bg PNG, remove background/padding/border-radius.
        */
        .nav-logo-img {
          height: 46px;          /* fits 68px nav with comfortable breathing room */
          width: auto;
          display: block;
          object-fit: contain;
          /* white pill wraps the dark-bg logo so it blends into the white navbar */
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 8px;
          // border: 1px solid rgba(0,0,0,0.06);
        }

        @keyframes navFD {
          from { opacity:0; transform:translateY(-14px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── DESKTOP LINKS ── */
        .nav-links {
          display: flex; align-items: center; gap: 2px;
          flex: 1; justify-content: center;
          position: relative;
        }

        .nav-indicator {
          position: absolute; bottom: -1px; height: 2.5px;
          background: linear-gradient(90deg, #2CCED1, #FF8A5B);
          border-radius: 2px 2px 0 0; pointer-events: none;
          transition: left .28s cubic-bezier(.4,0,.2,1),
                      width .28s cubic-bezier(.4,0,.2,1),
                      opacity .2s ease, background .2s ease;
          z-index: 2;
        }
        .nav-indicator.is-hover {
          background: rgba(44,206,209,0.45); height: 2px;
        }

        .nav-link {
          position: relative; display: flex; align-items: center;
          padding: 9px 16px; font-size: 12.5px; font-weight: 500;
          color: var(--nav-text); text-decoration: none;
          letter-spacing: 0.07em; text-transform: uppercase;
          border-radius: 8px;
          transition: color .2s ease, background .2s ease;
          white-space: nowrap; opacity: 0;
          animation: navFD .7s cubic-bezier(.22,.68,0,1.2) both;
        }
        .nav-link:nth-child(1) { animation-delay: .18s; }
        .nav-link:nth-child(2) { animation-delay: .26s; }
        .nav-link:nth-child(3) { animation-delay: .34s; }
        .nav-link:nth-child(4) { animation-delay: .42s; }
        .nav-link:nth-child(5) { animation-delay: .50s; }

        .nav-link:hover { color: var(--dark); background: rgba(44,206,209,0.07); }
        .nav-link.active { color: var(--dark); font-weight: 600; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 3px; left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%;
          background: #2CCED1; box-shadow: 0 0 7px rgba(44,206,209,.85);
        }

        /* ── CTA ── */
        .nav-cta-wrap {
          flex-shrink: 0; display: flex; align-items: center; gap: 14px;
          opacity: 0; animation: navFD .7s cubic-bezier(.22,.68,0,1.2) .54s both;
        }
        .nav-phone {
          display: flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 500; color: var(--nav-text);
          text-decoration: none; letter-spacing: .04em; transition: color .2s;
        }
        .nav-phone:hover { color: #2CCED1; }
        .phone-icon {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(44,206,209,.28);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: border-color .2s, background .2s;
        }
        .nav-phone:hover .phone-icon { border-color: #2CCED1; background: rgba(44,206,209,.07); }

        .btn-book {
          position: relative; overflow: hidden;
          display: flex; align-items: center; gap: 8px; padding: 10px 22px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb);
          border: none; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: .07em; text-transform: uppercase;
          color: #fff; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 16px rgba(44,206,209,.34), 0 1px 4px rgba(0,0,0,.06);
          transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease;
          white-space: nowrap;
        }
        .btn-book::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #FF8A5B, #e06030);
          opacity: 0; transition: opacity .3s ease;
        }
        .btn-book:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(44,206,209,.44); }
        .btn-book:hover::before { opacity: 1; }
        .btn-book span { position: relative; z-index: 1; }
        .btn-book-dot {
          position: relative; z-index: 1; width: 6px; height: 6px;
          border-radius: 50%; background: rgba(255,255,255,.75);
          animation: bDot 2s ease-in-out infinite;
        }
        @keyframes bDot { 0%,100%{opacity:.75;transform:scale(1);} 50%{opacity:1;transform:scale(1.45);} }

        /* ── HAMBURGER ── */
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          width: 36px; height: 36px; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          padding: 4px; border-radius: 8px; transition: background .2s;
        }
        .nav-burger:hover { background: rgba(44,206,209,.08); }
        .burger-bar {
          display: block; width: 22px; height: 1.5px;
          background: var(--dark); border-radius: 2px;
          transition: transform .35s cubic-bezier(.4,0,.2,1), opacity .25s ease, width .3s ease;
          transform-origin: center;
        }
        .nav-burger.open .burger-bar:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nav-burger.open .burger-bar:nth-child(2) { opacity: 0; width: 0; }
        .nav-burger.open .burger-bar:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed; top: var(--nav-h); left: 0; right: 0;
          background: rgba(255,255,255,0.99); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(44,206,209,.14);
          z-index: 999; overflow: hidden;
          max-height: 0; opacity: 0;
          transition: max-height .45s cubic-bezier(.4,0,.2,1), opacity .35s ease;
        }
        .mobile-menu.open { max-height: 540px; opacity: 1; }
        .mobile-menu-inner { padding: 20px 24px 28px; display: flex; flex-direction: column; gap: 4px; }
        .mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; font-size: 13.5px; font-weight: 500; color: var(--nav-text);
          text-decoration: none; letter-spacing: .06em; text-transform: uppercase;
          border-radius: 10px; border: 1px solid transparent;
          transition: color .2s, background .2s, border-color .2s;
        }
        .mobile-link:hover { color: var(--dark); background: rgba(44,206,209,.07); border-color: rgba(44,206,209,.16); }
        .mobile-link.active { color: #2CCED1; font-weight: 600; background: rgba(44,206,209,.06); border-color: rgba(44,206,209,.16); }
        .mobile-link-arrow { opacity: .35; transition: opacity .2s, transform .2s; }
        .mobile-link:hover .mobile-link-arrow { opacity: .75; transform: translateX(3px); }
        .mobile-divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(44,206,209,.2),transparent); margin: 10px 0; }
        .mobile-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px;
          background: linear-gradient(135deg, #2CCED1, #1ab8bb); border-radius: 10px;
          font-size: 13px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
          color: #fff; text-decoration: none; margin-top: 8px;
          box-shadow: 0 4px 18px rgba(44,206,209,.34); transition: transform .2s, box-shadow .2s;
        }
        .mobile-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(44,206,209,.44); }
        .mobile-contact {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px; font-size: 13px; font-weight: 500; color: var(--nav-text);
          text-decoration: none; letter-spacing: .04em; border-radius: 10px;
          transition: color .2s, background .2s;
        }
        .mobile-contact:hover { color: #2CCED1; background: rgba(44,206,209,.06); }

        .nav-spacer { height: var(--nav-h); }

        @media (max-width: 900px) {
          .nav-links, .nav-phone { display: none; }
          .nav-burger { display: flex; }
          .nav-inner { padding: 0 20px; }
          .nav-logo-img { height: 38px; }
        }
        @media (max-width: 480px) { .btn-book { display: none; } }
      `}</style>

      <ScrollProgress />

      <header
        className={`nav-shell${scrolled ? " scrolled" : ""}`}
        role="banner"
      >
        <div className="nav-inner">

          {/* ── LOGO — /public/image.png ── */}
          <Link to="/" className="nav-logo" aria-label="SRK Hospital Home">
            <img
              src="/image.png"
              alt="SRK Hospital — Superspeciality Hospital"
              className="nav-logo-img"
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav
            ref={linksContainerRef}
            className="nav-links"
            role="navigation"
            aria-label="Main navigation"
          >
            {hoverOffset && (
              <span
                className="nav-indicator is-hover"
                style={{ left: hoverOffset.left, width: hoverOffset.width }}
              />
            )}
            {!hoverOffset && activeOffset && (
              <span
                className="nav-indicator"
                style={{ left: activeOffset.left, width: activeOffset.width }}
              />
            )}

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link${isActive(item.path) ? " active" : ""}`}
                ref={(el) => { linkRefs.current[item.path] = el; }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA ── */}
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

          {/* ── MOBILE TOGGLE ── */}
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

      {/* ── MOBILE MENU ── */}
      <div
        className={`mobile-menu${mobileOpen ? " open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-inner">
          {NAV_ITEMS.map((item) => (
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
          ))}

          <div className="mobile-divider" />

          <a href="tel:+919773332601" className="mobile-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67 2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            +91 9773332601
          </a>

          <a href="tel:+919773332601" className="mobile-cta">
            Book a Consultation
          </a>
        </div>
      </div>

      <div className="nav-spacer" />
    </>
  );
}

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
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1002,
      height: "2px", width: `${width}%`,
      background: "linear-gradient(90deg,#2CCED1,#FF8A5B)",
      transition: "width 0.1s linear",
      opacity: width > 2 ? 0.75 : 0,
      pointerEvents: "none",
    }} />
  );
}