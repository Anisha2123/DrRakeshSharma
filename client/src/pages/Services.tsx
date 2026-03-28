"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TOKENS — exact match to navbar/footer ─────────────────── */
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

/* ─── DATA ───────────────────────────────────────────────────── */
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
  {
    id: 7,
    title: "Prostate Cancer",
    short: "Radical surgery, hormonal & radiation therapy for prostate malignancy.",
    category: "Oncology", catColor: "#E05A5A",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    when: ["Frequent urination", "Sense of incomplete urination", "Slow urine stream", "Blood in urine"],
    symptoms: ["Difficulty starting urination", "Bone pain (advanced)", "Weight loss", "Blood in semen"],
    diagnosis: ["PSA test", "MRI of pelvis", "Bone scan", "PET-CT scan", "Biopsy (guided)"],
    treatments: [
      { label: "Radical Surgery", desc: "Complete removal of the prostate gland (radical prostatectomy)." },
      { label: "Radiation Therapy", desc: "External beam or brachytherapy to destroy cancer cells." },
      { label: "Hormonal Therapy", desc: "Androgen deprivation therapy to reduce testosterone." },
      { label: "Chemotherapy", desc: "For advanced or hormone-resistant prostate cancer." },
    ],
    recovery: ["Complete recovery 2–4 weeks (surgery)"],
  },
  {
    id: 8,
    title: "Erectile Dysfunction",
    short: "Comprehensive diagnosis & treatment — medication, therapy & surgery.",
    category: "Andrology", catColor: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4M12 16v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Difficulty getting an erection", "Trouble maintaining erection", "Reduced sexual desire", "Performance anxiety"],
    symptoms: ["Inability to achieve firm erection", "Premature or delayed ejaculation", "Reduced libido"],
    diagnosis: ["Medical & sexual history", "Urine tests", "Ultrasound (penile Doppler)", "Hormonal profile"],
    treatments: [
      { label: "Lifestyle Changes", desc: "Exercise, weight management, alcohol & smoking cessation." },
      { label: "Medication (PDE5 inhibitors)", desc: "Sildenafil, Tadalafil — first-line oral treatment." },
      { label: "Therapy / Counseling", desc: "For psychogenic ED — CBT and relationship counseling." },
      { label: "Injection / Hormone Therapy", desc: "Intracavernosal injections or testosterone replacement." },
      { label: "Surgical (Penile Prosthesis)", desc: "Implant-based solution for severe or refractory ED." },
    ],
    recovery: ["2–3 weeks with medication", "Months with counseling", "4–6 weeks post-surgery"],
  },
  {
    id: 9,
    title: "Varicocele",
    short: "Microsurgical varicocelectomy & embolization for improved fertility.",
    category: "Andrology", catColor: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M8 4c0 8 8 8 8 16M16 4c0 8-8 8-8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Dull or aching scrotal pain", "Swelling or lump in the testicle area", "Fertility problems", "Heaviness in scrotum"],
    symptoms: ["Visible enlarged veins in scrotum", "Testicular atrophy", "Reduced sperm quality"],
    diagnosis: ["Physical examination", "Scrotal ultrasound with Doppler", "Semen analysis"],
    treatments: [
      { label: "Observation", desc: "For mild cases with no fertility impact." },
      { label: "Microsurgical Varicocelectomy", desc: "Gold standard surgery — subinguinal microsurgical repair." },
      { label: "Embolization", desc: "Minimally invasive — catheter-based occlusion of dilated veins." },
    ],
    recovery: ["1–2 weeks after surgery", "2–4 days after embolization"],
  },
  {
    id: 10,
    title: "Male Infertility",
    short: "Complete andrological workup — IVF support, TESE & microsurgery.",
    category: "Andrology", catColor: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 13v8M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Unable to conceive after 12 months", "Low sexual desire", "Pain or swelling in testicle area", "Hormonal symptoms"],
    symptoms: ["Ejaculation problems", "Low sperm count", "Hormonal imbalance", "Testicular atrophy"],
    diagnosis: ["Semen analysis", "Hormonal testing (FSH, LH, testosterone)", "Ultrasound", "Genetic testing"],
    treatments: [
      { label: "Lifestyle Changes", desc: "Diet, exercise, stress reduction, avoiding heat exposure." },
      { label: "Medications", desc: "Hormonal therapy, anti-oxidants, infection treatment." },
      { label: "Surgical Treatment", desc: "Varicocelectomy, TESE/PESA for sperm retrieval." },
      { label: "IVF / ICSI", desc: "Assisted reproductive techniques with retrieved sperm." },
    ],
    recovery: ["3–6 months with medication", "1–3 weeks post-surgery"],
  },
  {
    id: 11,
    title: "Endo-Urology",
    short: "Complete scope-based urological surgery — URS, PCNL, TURP, cystoscopy.",
    category: "Minimally Invasive", catColor: T.teal,
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    when: ["Kidney or ureteric stones", "Prostate enlargement", "Urinary obstruction", "Bladder stones or tumors"],
    symptoms: ["Pain during urination", "Blood in urine", "Reduced urine flow", "Recurrent infections"],
    diagnosis: ["CT-KUB", "Ultrasound", "Uroflowmetry", "Cystoscopy"],
    treatments: [
      { label: "URS (Ureteroscopy)", desc: "Scope through urethra to ureter — laser fragmentation." },
      { label: "PCNL", desc: "Percutaneous access to kidney — direct stone removal." },
      { label: "Cystoscopy", desc: "Diagnostic and therapeutic bladder examination." },
      { label: "TURP", desc: "Transurethral resection of prostate tissue." },
      { label: "Laser Treatment", desc: "Holmium/Thulium laser across all endourological procedures." },
    ],
    recovery: ["1–3 days most procedures", "Return to normal in 1–7 days", "Full recovery 1–2 weeks"],
  },
  {
    id: 12,
    title: "Urinary Tract Infection",
    short: "Evidence-based antibiotic protocols and infection prevention strategies.",
    category: "General Urology", catColor: T.orange,
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3v18M5 8l7-5 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    when: ["Burning during urination", "Frequent urge to urinate", "Fever with chills", "Cloudy or foul-smelling urine"],
    symptoms: ["Burning sensation during urination", "Cloudy, dark or blood-tinged urine", "Frequent urination", "Pelvic pain"],
    diagnosis: ["Urine culture & sensitivity", "Urine microscopy", "Blood tests (WBC, CRP)", "Imaging in severe cases"],
    treatments: [
      { label: "Antibiotics", desc: "Targeted therapy based on urine culture sensitivity." },
      { label: "Increased Fluid Intake", desc: "Flush bacteria from urinary tract." },
      { label: "Medication", desc: "Urinary analgesics and anti-spasmodics for symptom relief." },
    ],
    recovery: ["2–3 days (mild UTI)", "5–7 days (moderate infection)", "1–2 weeks (severe kidney infection)"],
  },
  {
    id: 13,
    title: "Urinary Incontinence",
    short: "Pelvic floor rehabilitation, bladder training & surgical correction.",
    category: "General Urology", catColor: T.orange,
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 9h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    when: ["Accidental urine leakage", "Sudden strong urge to urinate", "Leakage during coughing or sneezing", "Difficulty controlling urine"],
    symptoms: ["Urine leakage during activity", "Urgency incontinence", "Overflow dribbling", "Nocturia"],
    diagnosis: ["Urine test", "Ultrasound", "Urodynamic studies", "Bladder diary", "Physical examination"],
    treatments: [
      { label: "Pelvic Floor Exercises (Kegel)", desc: "First-line non-surgical treatment for stress incontinence." },
      { label: "Bladder Training", desc: "Scheduled voiding to improve bladder capacity and control." },
      { label: "Medications", desc: "Anti-cholinergics or beta-3 agonists for urge incontinence." },
      { label: "Medical Devices / Surgery", desc: "Slings, injections or implants for refractory cases." },
    ],
    recovery: ["Few weeks with exercises", "4–6 weeks post-surgery"],
  },
  {
    id: 14,
    title: "Andrology",
    short: "Comprehensive men's reproductive and sexual health under one roof.",
    category: "Andrology", catColor: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M12 15v6M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    when: ["Low sexual desire", "Ejaculation problems", "Infertility concerns", "Hormonal imbalance symptoms"],
    symptoms: ["Difficulty achieving or maintaining erection", "Ejaculation issues", "Pain or swelling in testicle area", "Low testosterone symptoms"],
    diagnosis: ["Semen analysis", "Hormonal profile", "Penile Doppler ultrasound", "Specialized andrological tests"],
    treatments: [
      { label: "Lifestyle Changes", desc: "Exercise, nutrition, sleep, and stress management." },
      { label: "Medication", desc: "Hormonal therapy, ED medications, anti-oxidants." },
      { label: "Counseling / Therapy", desc: "Psychosexual counseling for psychological components." },
      { label: "Surgical Treatment", desc: "Varicocelectomy, penile prosthesis, sperm retrieval." },
    ],
    recovery: ["Few weeks with exercise & medication", "4–6 weeks post-surgery"],
  },
  {
    id: 15,
    title: "Penis Enlargement",
    short: "Evidence-based counseling, medication & surgical options with discretion.",
    category: "Andrology", catColor: "#6B7FD4",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80&auto=format&fit=crop",
    icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    when: ["Concerns about size or function", "Confidence issues affecting sexual health", "Post-trauma or congenital concerns"],
    symptoms: ["Anxiety about sexual performance", "Reduced confidence", "Functional dissatisfaction"],
    diagnosis: ["Physical examination", "Medical & sexual history", "Hormonal assessment"],
    treatments: [
      { label: "Counseling & Education", desc: "Addressing unrealistic expectations and improving body image." },
      { label: "Medication", desc: "Hormonal optimization where indicated." },
      { label: "Vacuum Devices", desc: "Non-surgical mechanical enhancement device." },
      { label: "Surgical Options", desc: "Ligament release or fat injection procedures." },
    ],
    recovery: ["2–3 weeks post-surgery full recovery"],
  },
];

const CATEGORIES = ["All", "Stone Disease", "Prostate", "Oncology", "Andrology", "Minimally Invasive", "General Urology"];

/* ─── MODAL ───────────────────────────────────────────────────── */
function Modal({ svc, onClose }: { svc: Service | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (svc) { document.body.style.overflow = "hidden"; setTimeout(() => setMounted(true), 10); }
    return () => { document.body.style.overflow = ""; };
  }, [svc]);
  const close = useCallback(() => { setMounted(false); setTimeout(onClose, 380); }, [onClose]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn);
  }, [close]);
  if (!svc) return null;

  return (
    <div
      onClick={e => e.target === e.currentTarget && close()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        background: mounted ? "rgba(13,30,40,0.72)" : "rgba(13,30,40,0)",
        backdropFilter: mounted ? "blur(10px)" : "blur(0px)",
        transition: "all 0.38s cubic-bezier(.22,1,.36,1)",
        padding: "0",
      }}
    >
      <div style={{
        width: "100%", maxWidth: "720px",
        background: T.white, borderRadius: "28px 28px 0 0",
        overflow: "hidden", maxHeight: "90vh",
        display: "flex", flexDirection: "column",
        transform: mounted ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.44s cubic-bezier(.22,1,.36,1)",
        boxShadow: "0 -24px 80px rgba(0,0,0,0.2)",
      }}>
        {/* drag handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "rgba(0,0,0,0.1)" }} />
        </div>
        {/* hero */}
        <div style={{ position: "relative", height: "200px", flexShrink: 0, overflow: "hidden", margin: "12px 20px 0", borderRadius: "18px" }}>
          <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${svc.catColor}50,rgba(13,30,40,0.7))`, borderRadius: "18px" }} />
          <div style={{ position: "absolute", top: 0, left: "20px", width: "40px", height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)", borderRadius: "0 0 2px 2px" }} />
          <span style={{ position: "absolute", top: "14px", right: "14px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: svc.catColor, border: `1px solid ${svc.catColor}40` }}>{svc.category}</span>
          <button onClick={close} style={{ position: "absolute", top: "12px", left: "14px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.25)", color: T.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem" }}>✕</button>
          <div style={{ position: "absolute", bottom: "16px", left: "20px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: T.white, fontSize: "1.7rem", fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>{svc.title}</h2>
            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", margin: "4px 0 0", fontWeight: 300 }}>{svc.short}</p>
          </div>
        </div>
        {/* body */}
        <div style={{ overflowY: "auto", flex: 1, padding: "22px 24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "22px" }}>
            {[["🔍", "When to consult", svc.when], ["⚕️", "Symptoms", svc.symptoms], ["🧪", "Diagnosis", svc.diagnosis]].map(([emoji, label, list], i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: "14px", background: T.bg, border: `1px solid ${T.border}`, gridColumn: i === 2 ? "1 / -1" : "auto" }}>
                <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.muted, margin: "0 0 10px" }}>{emoji as string} {label as string}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {(list as string[]).map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: svc.catColor, flexShrink: 0, marginTop: "6px" }} />
                      <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.8rem", color: T.mid, lineHeight: 1.5, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.muted, marginBottom: "12px" }}>🏥 Treatment Options</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
            {svc.treatments.map((tr, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", padding: "12px 14px", borderRadius: "12px", background: `${svc.catColor}08`, border: `1px solid ${svc.catColor}18` }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: `linear-gradient(135deg,${T.teal},${T.orange})`, flexShrink: 0, marginTop: "7px" }} />
                <div>
                  <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.82rem", fontWeight: 600, color: T.ink, margin: "0 0 2px" }}>{tr.label}</p>
                  <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.78rem", color: T.mid, margin: 0, fontWeight: 300, lineHeight: 1.5 }}>{tr.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "14px 16px", borderRadius: "14px", background: T.dark, border: `1px solid rgba(44,206,209,0.18)` }}>
            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.teal, margin: "0 0 10px" }}>⏱ Recovery Time</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {svc.recovery.map((r, i) => (
                <span key={i} style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.75rem", padding: "4px 12px", borderRadius: "100px", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.1)" }}>{r}</span>
              ))}
            </div>
          </div>
          <a href="/medical-services" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "18px", padding: "13px", borderRadius: "14px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none", boxShadow: "0 6px 20px rgba(44,206,209,0.3)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.7)" }} />
            Book Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── SERVICE CARD ────────────────────────────────────────────── */
function ServiceCard({ svc, idx, vis, onClick }: { svc: Service; idx: number; vis: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      className={vis ? "ms-card-in" : "ms-card"}
      style={{
        animationDelay: `${(idx % 6) * 0.07 + 0.1}s`,
        cursor: "pointer", borderRadius: "20px", overflow: "hidden",
        background: T.white,
        border: `1px solid ${hov ? svc.catColor + "55" : T.border}`,
        boxShadow: hov ? `0 20px 55px ${svc.catColor}18` : "0 2px 14px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "all 0.42s cubic-bezier(.22,1,.36,1)",
        display: "flex", flexDirection: "column",
      }}
    >
      {/* image */}
      <div style={{ position: "relative", height: "155px", overflow: "hidden", flexShrink: 0 }}>
        <img src={svc.img} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s cubic-bezier(.22,1,.36,1)", filter: hov ? "brightness(0.65)" : "brightness(0.75)" }} />
        <div style={{ position: "absolute", inset: 0, background: hov ? `linear-gradient(to bottom,${svc.catColor}45,rgba(13,30,40,0.6))` : "linear-gradient(to bottom,transparent 25%,rgba(0,0,0,0.45))", transition: "background 0.45s" }} />
        {/* top accent */}
        <div style={{ position: "absolute", top: 0, left: "16px", width: "32px", height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)", borderRadius: "0 0 2px 2px" }} />
        {/* category tag */}
        <span style={{ position: "absolute", top: "12px", right: "12px", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "100px", background: "rgba(255,255,255,0.13)", backdropFilter: "blur(6px)", color: svc.catColor, border: `1px solid ${svc.catColor}35` }}>{svc.category}</span>
        {/* icon circle — bottom-left on image */}
        <div style={{ position: "absolute", bottom: "12px", left: "14px", width: "34px", height: "34px", borderRadius: "10px", background: hov ? svc.catColor : "rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: hov ? T.white : T.white, border: `1px solid ${hov ? "transparent" : "rgba(255,255,255,0.25)"}`, transition: "all 0.38s", transform: hov ? "rotate(-6deg) scale(1.08)" : "rotate(0) scale(1)" }}>{svc.icon}</div>
      </div>
      {/* body */}
      <div style={{ padding: "16px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.1rem", fontWeight: 700, color: T.ink, margin: "0 0 7px", lineHeight: 1.2, letterSpacing: "-0.2px" }}>{svc.title}</h3>
        <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.78rem", color: T.mid, lineHeight: 1.65, fontWeight: 300, margin: "0 0 14px", flex: 1 }}>{svc.short}</p>
        {/* treatment count chips */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
          {[`${svc.treatments.length} treatments`, `${svc.diagnosis.length} diagnostics`].map((chip, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 9px", borderRadius: "100px", background: i === 0 ? `${svc.catColor}10` : "rgba(0,0,0,0.04)", color: i === 0 ? svc.catColor : T.muted, border: `1px solid ${i === 0 ? svc.catColor + "25" : "rgba(0,0,0,0.07)"}` }}>{chip}</span>
          ))}
        </div>
        {/* footer cta row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.7rem", fontWeight: 600, color: svc.catColor, opacity: hov ? 1 : 0.6, transition: "opacity 0.28s" }}>Learn More</span>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: hov ? `linear-gradient(135deg,${T.teal},${T.orange})` : `${svc.catColor}12`, display: "flex", alignItems: "center", justifyContent: "center", transform: hov ? "rotate(45deg)" : "rotate(0)", transition: "all 0.35s cubic-bezier(.22,1,.36,1)" }}>
            <svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6h8M6 2l4 4-4 4" stroke={hov ? T.white : svc.catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function MedicalServices() {
  const [vis,    setVis]    = useState(false);
  const [cat,    setCat]    = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Service | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = SERVICES.filter(s => {
    const matchCat = cat === "All" || s.category === cat;
    const matchQ   = !search.trim() || s.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        @keyframes ms-fadeUp  { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ms-lineW   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ms-cardIn  { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes ms-orbit   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ms-float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ms-pulse   { 0%,100%{opacity:.2;transform:scale(1)} 50%{opacity:.5;transform:scale(1.6)} }
        @keyframes ms-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .ms-vis .ms-ey   { animation: ms-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.00s both; }
        .ms-vis .ms-h2   { animation: ms-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.10s both; }
        .ms-vis .ms-sub  { animation: ms-fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.18s both; }
        .ms-vis .ms-ln   { animation: ms-lineW  1.1s cubic-bezier(.22,1,.36,1) 0.10s both; transform-origin:left; }
        .ms-vis .ms-filt { animation: ms-fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.25s both; }

        .ms-card    { opacity:0; transform:translateY(32px) scale(0.96); }
        .ms-card-in { animation: ms-cardIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .ms-orbit-el  { animation: ms-orbit 22s linear infinite; }
        .ms-orbit-el2 { animation: ms-orbit 30s linear infinite reverse; }
        .ms-float-el  { animation: ms-float 6s ease-in-out infinite; }
        .ms-pulse-el  { animation: ms-pulse 3s ease-in-out infinite; }

        .ms-cat-btn {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 11.5px; font-weight: 500; letter-spacing: 0.07em;
          text-transform: uppercase; border: none; cursor: pointer;
          padding: 8px 16px; border-radius: 100px;
          transition: all 0.28s cubic-bezier(.22,1,.36,1);
          white-space: nowrap;
        }
        .ms-search {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px; border-radius: 100px;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 9px 18px 9px 40px;
          background: white;
          outline: none;
          transition: border-color 0.22s, box-shadow 0.22s;
          width: 220px;
        }
        .ms-search:focus {
          border-color: #2CCED1;
          box-shadow: 0 0 0 3px rgba(44,206,209,0.12);
        }
        .ms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 960px) { .ms-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .ms-grid { grid-template-columns: 1fr !important; } .ms-filter-wrap { flex-direction: column !important; } }
      `}</style>

      <section
        ref={ref}
        className={vis ? "ms-vis" : ""}
        style={{
          background: T.bg,
          padding: "clamp(4rem,9vw,8rem) clamp(1.25rem,5vw,3.5rem)",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* BG decor */}
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-180px", right: "-180px", width: "580px", height: "580px", borderRadius: "50%", background: "radial-gradient(circle,rgba(44,206,209,0.08) 0%,transparent 60%)" }} />
          <div style={{ position: "absolute", bottom: "-120px", left: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,138,91,0.07) 0%,transparent 60%)" }} />
          <div className="ms-orbit-el"  style={{ position: "absolute", top: "7%", right: "4%", width: "240px", height: "240px", borderRadius: "50%", border: "1px dashed rgba(44,206,209,0.12)" }} />
          <div className="ms-orbit-el2" style={{ position: "absolute", bottom: "9%", left: "3%", width: "170px", height: "170px", borderRadius: "50%", border: "1px solid rgba(255,138,91,0.1)" }} />
          <div className="ms-float-el"  style={{ position: "absolute", top: "35%", left: "7%", width: "7px", height: "7px", borderRadius: "50%", background: T.teal, opacity: 0.22 }} />
          <div className="ms-float-el"  style={{ position: "absolute", top: "62%", right: "8%", width: "5px", height: "5px", borderRadius: "50%", background: T.orange, opacity: 0.2, animationDelay: "2.5s" }} />
          <div className="ms-pulse-el"  style={{ position: "absolute", top: "22%", right: "23%", width: "4px", height: "4px", borderRadius: "50%", background: T.teal }} />
          <svg aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.022 }} width="600" height="600">
            {Array.from({ length: 12 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 50 + 25} cy={r * 50 + 25} r="1.8" fill={T.ink} />
            )))}
          </svg>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ══ HEADER ══ */}
          <div style={{ marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
            <div className="ms-ey" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => <span key={i} style={{ display: "block", width: i === 0 ? "28px" : "6px", height: "3px", borderRadius: "2px", background: i === 0 ? T.teal : `${T.teal}40` }} />)}
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.32em", color: T.teal, fontWeight: 600 }}>SRK Hospital · Jaipur</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
              <h2 className="ms-h2" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-2px", margin: 0, color: T.dark }}>
                Medical<br /><em style={{ color: T.orange, fontStyle: "italic" }}>Services</em>
              </h2>
              <p className="ms-sub" style={{ maxWidth: "340px", fontSize: "0.9rem", lineHeight: 1.85, color: T.mid, fontWeight: 300, margin: 0 }}>
                15 specialised urological services — from stone removal to oncology — delivered with precision and compassion by Dr. Rakesh Sharma.
              </p>
            </div>
            <div style={{ marginTop: "26px", height: "1.5px", background: "rgba(0,0,0,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div className="ms-ln" style={{ height: "100%", background: `linear-gradient(90deg,${T.teal},${T.orange},transparent)`, borderRadius: "2px" }} />
            </div>
          </div>

          {/* ══ FILTER + SEARCH BAR ══ */}
          <div className="ms-filt" style={{ marginBottom: "clamp(1.8rem,3.5vw,2.8rem)" }}>
            <div
              className="ms-filter-wrap"
              style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}
            >
              {/* search */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <svg viewBox="0 0 16 16" fill="none" width="13" height="13" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: T.muted }}>
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search services…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="ms-search"
                />
              </div>
              {/* spacer */}
              <div style={{ flex: 1 }} />
              {/* category pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    className="ms-cat-btn"
                    onClick={() => setCat(c)}
                    style={{
                      background: cat === c ? "linear-gradient(135deg,#2CCED1,#1ab8bb)" : T.white,
                      color: cat === c ? T.white : T.mid,
                      border: `1px solid ${cat === c ? "transparent" : T.border}`,
                      boxShadow: cat === c ? "0 4px 14px rgba(44,206,209,0.32)" : "none",
                      transform: cat === c ? "translateY(-1px)" : "translateY(0)",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {/* result count */}
            <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.72rem", color: T.muted, margin: "12px 0 0", fontWeight: 400 }}>
              Showing <strong style={{ color: T.teal }}>{filtered.length}</strong> of {SERVICES.length} services
              {cat !== "All" ? ` · ${cat}` : ""}
              {search ? ` · matching "${search}"` : ""}
            </p>
          </div>

          {/* ══ CARDS GRID ══ */}
          {filtered.length > 0 ? (
            <div className="ms-grid">
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.id} svc={svc} idx={i} vis={vis} onClick={() => setActive(svc)} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: T.muted }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🔍</div>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "1.4rem", fontWeight: 600, color: T.ink, margin: "0 0 6px" }}>No services found</p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.85rem", fontWeight: 300 }}>Try a different search term or category</p>
            </div>
          )}

          {/* ══ BOTTOM CTA ══ */}
          <div style={{ marginTop: "clamp(2.5rem,5vw,4rem)", borderRadius: "22px", background: T.dark, padding: "clamp(22px,4vw,34px) clamp(22px,4vw,36px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", position: "relative", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#2CCED1,#FF8A5B)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1200&q=50&auto=format&fit=crop)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />
            <div style={{ position: "relative" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.2rem,2.8vw,1.7rem)", fontWeight: 700, color: T.white, margin: 0, lineHeight: 1.2 }}>Not sure which service you need?</p>
              <p style={{ fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "0.83rem", color: "rgba(255,255,255,0.42)", margin: "5px 0 0", fontWeight: 300 }}>Book a general consultation — Dr. Sharma will guide you to the right treatment.</p>
            </div>
            <a href="/medical-services" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "8px", background: "linear-gradient(135deg,#2CCED1,#1ab8bb)", color: T.white, textDecoration: "none", fontFamily: "'DM Sans',system-ui,sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", boxShadow: "0 4px 16px rgba(44,206,209,0.34)", transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)", position: "relative", flexShrink: 0 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 28px rgba(44,206,209,0.44)"; el.style.background = "linear-gradient(135deg,#FF8A5B,#e06030)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 16px rgba(44,206,209,0.34)"; el.style.background = "linear-gradient(135deg,#2CCED1,#1ab8bb)"; }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.75)", animation: "ms-pulse 2s ease-in-out infinite" }} />
              Book Consultation
            </a>
          </div>

        </div>
      </section>

      <Modal svc={active} onClose={() => setActive(null)} />
    </>
  );
}