"use client";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* ─── TOKENS ─────────────────────────────────────────────────── */
const T = {
  teal:   "#2CCED1",
  tealD:  "#1ab8bb",
  orange: "#FF8A5B",
  dark:   "#0d1e28",
  ink:    "#1C1C1C",
  mid:    "#5A5A5A",
  muted:  "#888",
  bg:     "#F4F4F4",
  white:  "#FFFFFF",
  border: "rgba(0,0,0,0.07)",
};

/* ─── SERVICE DATA ───────────────────────────────────────────── */
interface Service {
  id:         number;
  title:      string;
  short:      string;
  category:   string;
  catColor:   string;
  img:        string;
  icon:       React.ReactNode;
  when:       string[];
  symptoms:   string[];
  diagnosis:  string[];
  treatments: { label: string; desc: string }[];
  recovery:   string[];
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Kidney Stone",
    short: "Minimally invasive stone removal — ESWL, URS & laser techniques.",
    category: "Stone Disease", catColor: T.teal,
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3C8 3 5 6.5 5 10c0 5 7 12 7 12s7-7 7-12c0-3.5-3-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
    when: ["Severe pain in lower back or side", "Blood in urine", "Pain spreading to lower abdomen", "Frequent urination"],
    symptoms: ["Burning sensation during urination", "Pink, red or brown urine", "Reduced urine flow", "Cloudy or foul-smelling urine"],
    diagnosis: ["Urine test", "Blood test", "Ultrasound", "CT scan"],
    treatments: [
      { label: "Conservative (small stones)", desc: "Plenty of water, painkillers, medicines to relax the ureter." },
      { label: "ESWL", desc: "No cut or surgery. Uses sound waves to break stones. Outpatient procedure." },
      { label: "URS (Ureteroscopy)", desc: "Thin scope through urinary passage. Laser breaks the stone. No external cuts." },
      { label: "PCNL", desc: "For large stones. Small incision in the back. Stone removed directly." },
      { label: "Laser Stone Removal", desc: "Modern, effective, less pain. Fast recovery process." },
    ],
    recovery: ["3–10 days for small stones", "1–2 days for ESWL", "2–5 days for URS/Laser", "1–2 weeks for PCNL"],
  },
  {
    id: 2,
    title: "Ureteric Stone",
    short: "Expert management of stones stuck in the ureter with precision endoscopy.",
    category: "Stone Disease", catColor: T.teal,
    img: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2v20M8 6c0 0 2 2 4 2s4-2 4-2M8 18c0 0 2-2 4-2s4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Blood in urine", "Nausea and vomiting with pain", "Fever", "Frequent urge to urinate with little output"],
    symptoms: ["Aching pain in the back", "Pain during urination", "Urinary tract infection signs"],
    diagnosis: ["Ultrasound", "CT-KUB", "Urine culture", "Blood tests"],
    treatments: [
      { label: "URS (Ureterorenoscopy)", desc: "Endoscopic procedure to visualise and remove or fragment the stone." },
      { label: "Retrograde Intrarenal Surgery", desc: "Advanced scope technique for stones in the kidney pelvis." },
      { label: "Open Surgery", desc: "Reserved for complex or very large stones unresponsive to other methods." },
    ],
    recovery: ["1–3 weeks for small stones", "2–4 weeks for medium stones"],
  },
  {
    id: 3,
    title: "Bladder Stone",
    short: "Endoscopic and laser removal of bladder stones with minimal downtime.",
    category: "Stone Disease", catColor: T.teal,
    img: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><ellipse cx="12" cy="14" rx="7" ry="6" stroke="currentColor" strokeWidth="1.5"/><path d="M9 8C9 5.8 10.3 4 12 4s3 1.8 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Continuous lower abdominal pain", "Blood in urine", "Difficulty passing urine", "Pain during urination", "Dark or discolored urine"],
    symptoms: ["Pelvic pressure", "Interrupted urine stream", "Cloudy urine", "Urinary urgency"],
    diagnosis: ["Ultrasound", "X-ray (KUB)", "CT scan", "Cystoscopy"],
    treatments: [
      { label: "Medicines", desc: "For infection and mild symptoms — anti-infectives and pain relief." },
      { label: "Endoscopic Removal", desc: "Cystoscope used to visualise and break up or remove small stones." },
      { label: "Laser Treatment", desc: "Precise laser energy fragments stones for easy removal." },
      { label: "Surgery", desc: "Open or laparoscopic removal in severe or complicated cases." },
    ],
    recovery: ["Few days to 2 weeks for small stones", "1–2 weeks after laser treatment", "2–3 weeks after surgery"],
  },
  {
    id: 4,
    title: "Prostate Enlargement / BPH",
    short: "Advanced TURP, HoLEP & Urolift for benign prostatic hyperplasia.",
    category: "Prostate", catColor: T.orange,
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><rect x="5" y="8" width="14" height="10" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
    when: ["Weak or slow urine flow", "Dribbling at end of urination", "Frequent urge especially at night", "Difficulty starting urination"],
    symptoms: ["Interrupted urine flow", "Feeling of incomplete emptying", "Straining to urinate", "Nocturia (night urination)"],
    diagnosis: ["PSA blood test", "Ultrasound", "Uroflowmetry", "Post-void residual urine"],
    treatments: [
      { label: "Lifestyle Changes", desc: "Reduce tea, coffee, alcohol. Bladder training exercises." },
      { label: "Medicines", desc: "Alpha-blockers and 5-alpha reductase inhibitors to reduce symptoms." },
      { label: "Laser Therapy (HoLEP)", desc: "Holmium laser enucleation — gold standard for BPH." },
      { label: "TURP", desc: "Transurethral resection — well-established surgical technique." },
      { label: "Urolift", desc: "Modern, minimally invasive implant-based technique." },
    ],
    recovery: ["Few weeks with medication", "2–3 weeks after TURP / Urolift"],
  },
  {
    id: 5,
    title: "Kidney Cancer",
    short: "Robotic & laparoscopic nephrectomy for renal cell carcinoma.",
    category: "Oncology", catColor: "#E05A5A",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3C8.5 3 5 6 5 10c0 3 1.5 5.5 3.5 7L12 21l3.5-4C17.5 15.5 19 13 19 10c0-4-3.5-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 10h6M12 7v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    when: ["Blood in urine", "Persistent back or side pain", "Unexplained weight loss", "Fatigue", "Lump in abdomen"],
    symptoms: ["High blood pressure (secondary)", "Loss of appetite", "Persistent fatigue", "Blood in urine"],
    diagnosis: ["CT urography", "MRI abdomen & pelvis", "Renal angiography", "PET scan", "Chest X-ray & bone scan"],
    treatments: [
      { label: "Radical Nephrectomy", desc: "Complete removal of the kidney — with chemotherapy/immunotherapy as needed." },
      { label: "Partial Nephrectomy", desc: "Removes tumor while preserving maximum kidney tissue." },
      { label: "Robotic / Laparoscopic Surgery", desc: "Minimally invasive with faster recovery and less pain." },
    ],
    recovery: ["4–8 weeks full recovery (open)", "2–4 weeks light activities", "3–7 days hospital stay (open)", "2–4 days hospital stay (laparoscopic)"],
  },
  {
    id: 6,
    title: "Bladder Cancer",
    short: "TURBT, cystectomy & immunotherapy for bladder tumours.",
    category: "Oncology", catColor: "#E05A5A",
    img: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><ellipse cx="12" cy="13" rx="7" ry="6" stroke="currentColor" strokeWidth="1.5"/><path d="M9 7C9 4.8 10.3 3 12 3s3 1.8 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 13h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    when: ["Blood in urine (most common sign)", "Frequent painful urination", "Burning sensation during urination", "Fatigue"],
    symptoms: ["Painless hematuria (blood in urine)", "Urgency and frequency", "Lower abdominal pain"],
    diagnosis: ["Cystoscopy + biopsy", "CT urography", "Urine cytology", "MRI pelvis"],
    treatments: [
      { label: "TURBT", desc: "Transurethral resection — primary treatment for superficial tumours." },
      { label: "Radical Cystectomy", desc: "Complete bladder removal for muscle-invasive cancer." },
      { label: "Partial Cystectomy", desc: "Bladder-preserving surgery for select cases." },
      { label: "Intravesical Immunotherapy / Chemo", desc: "BCG or chemotherapy instilled directly into the bladder." },
    ],
    recovery: ["2–3 weeks post-surgery full recovery"],
  },
];

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === parseInt(serviceId || "0"));

  useEffect(() => {
    if (!service) {
      navigate("/medical-services");
    }
  }, [service, navigate]);

  if (!service) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .sd-fade { animation: fadeIn 0.6s ease-out; }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh", paddingTop: "80px" }}>
        {/* Hero Section */}
        <div style={{ position: "relative", height: "500px", overflow: "hidden" }}>
          <img
            src={service.img}
            alt={service.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${service.catColor}40 0%, rgba(13,30,40,0.8) 100%)`,
          }} />
          
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "clamp(2rem, 5vw, 4rem)",
          }}>
            <span style={{
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
              color: service.catColor, marginBottom: "12px",
            }}>
              {service.category}
            </span>
            <h1 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.1,
            }}>
              {service.title}
            </h1>
            <p style={{
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "1rem", color: "rgba(255,255,255,0.8)",
              marginTop: "16px", maxWidth: "600px",
            }}>
              {service.short}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(2rem, 5vw, 4rem) clamp(1.25rem, 5vw, 3.5rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }}>
            {/* When to Seek */}
            <div className="sd-fade">
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.8rem", fontWeight: 700, color: T.dark, marginBottom: "16px",
              }}>
                When to Seek Care
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {service.when.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'DM Sans',system-ui,sans-serif",
                    fontSize: "0.95rem", color: T.mid, marginBottom: "12px",
                    paddingLeft: "24px", position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: "4px",
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: service.catColor,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Symptoms */}
            <div className="sd-fade" style={{ animationDelay: "0.1s" }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.8rem", fontWeight: 700, color: T.dark, marginBottom: "16px",
              }}>
                Common Symptoms
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {service.symptoms.map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'DM Sans',system-ui,sans-serif",
                    fontSize: "0.95rem", color: T.mid, marginBottom: "12px",
                    paddingLeft: "24px", position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", left: 0, top: "4px",
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: service.catColor,
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Diagnosis & Treatments */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 4vw, 3rem)", marginBottom: "4rem" }}>
            {/* Diagnosis */}
            <div className="sd-fade" style={{ animationDelay: "0.2s" }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.8rem", fontWeight: 700, color: T.dark, marginBottom: "16px",
              }}>
                Diagnostic Methods
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {service.diagnosis.map((item, i) => (
                  <div key={i} style={{
                    padding: "12px 16px", borderRadius: "8px",
                    background: `${service.catColor}15`, border: `1px solid ${service.catColor}30`,
                    fontFamily: "'DM Sans',system-ui,sans-serif",
                    fontSize: "0.9rem", color: T.dark, fontWeight: 500,
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery */}
            <div className="sd-fade" style={{ animationDelay: "0.3s" }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "1.8rem", fontWeight: 700, color: T.dark, marginBottom: "16px",
              }}>
                Recovery Timeline
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {service.recovery.map((item, i) => (
                  <div key={i} style={{
                    padding: "12px 16px", borderRadius: "8px",
                    background: `${service.catColor}15`, border: `1px solid ${service.catColor}30`,
                    fontFamily: "'DM Sans',system-ui,sans-serif",
                    fontSize: "0.9rem", color: T.dark, fontWeight: 500,
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div className="sd-fade" style={{ animationDelay: "0.4s" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.8rem", fontWeight: 700, color: T.dark, marginBottom: "24px",
            }}>
              Treatment Options
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {service.treatments.map((treatment, i) => (
                <div key={i} style={{
                  padding: "24px", borderRadius: "12px",
                  background: T.white, border: `1px solid ${T.border}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: "1.2rem", fontWeight: 700, color: service.catColor,
                    margin: "0 0 12px", lineHeight: 1.2,
                  }}>
                    {treatment.label}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans',system-ui,sans-serif",
                    fontSize: "0.9rem", color: T.mid, lineHeight: 1.6, margin: 0,
                  }}>
                    {treatment.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "4rem", padding: "2rem", borderRadius: "12px",
            background: `linear-gradient(135deg, ${service.catColor}15 0%, ${service.catColor}08 100%)`,
            border: `1px solid ${service.catColor}30`, textAlign: "center",
          }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "1.6rem", fontWeight: 700, color: T.dark, margin: "0 0 12px",
            }}>
              Ready to Schedule a Consultation?
            </h3>
            <p style={{
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "0.95rem", color: T.mid, margin: "0 0 20px",
            }}>
              Our specialists are here to help. Book an appointment today.
            </p>
             <a href="tel:+919887711224" style={{
              padding: "12px 32px", borderRadius: "100px",
              background: `linear-gradient(135deg, ${service.catColor}, ${service.catColor}dd)`,
              color: T.white, border: "none", cursor: "pointer",
              fontFamily: "'DM Sans',system-ui,sans-serif",
              fontSize: "0.9rem", fontWeight: 600, letterSpacing: "0.05em",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 8px 24px ${service.catColor}40`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
