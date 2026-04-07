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
    img: "/services/kidneystone.png",
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
    img: "/services/UretericStone.png",
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
    img: "/services/BladderStone.png",
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
    img: "/services/ProstateEnlargement.png",
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
    img: "/services/KidneyCancer.png",
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
    img: "/services/BladderCancer.png",
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
    img: "/services/ProstateCancer.png",
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
    img: "/services/ErectileDysfunction.png",
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
    img: "/services/Varicocele.png",
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
    img: "/services/Male Infertility.png",
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
    img: "/services/EndoUrology.png",
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
    img: "/services/UrinaryTractInfection.png",
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
    img: "/services/UrinaryIncontinence.png",
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
    img: "/services/Andrology.png",
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
    img: "/services/penisenlargement.png",
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
  {
  id: 16,
  title: "Laser Treatment for Kidney Stones (Ureteroscopy)",
  short: "Minimally invasive laser procedure to break and remove kidney stones with high success rate.",
  category: "Urology",
  catColor: "#2CCED1",
  img: "/services/LaserTreatmentofKidneyStone.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3C8 7 6 10 6 13a6 6 0 0012 0c0-3-2-6-6-10z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,

  when: [
    "When the kidney stone is too large to pass naturally",
    "Severe or persistent pain due to kidney stones",
    "Blocked urine flow",
    "High risk of infection due to stones"
  ],

  symptoms: [
    "Severe pain in abdomen or back",
    "Difficulty or blockage in urine flow",
    "Blood in urine",
    "Frequent urge to urinate",
    "Burning sensation while urinating"
  ],

  diagnosis: [
    "Ultrasound or CT scan to locate the stone",
    "Blood tests",
    "Urine tests"
  ],

  treatments: [
    {
      label: "Ureteroscopy (Laser Treatment)",
      desc: "A thin tube with a camera is inserted through the urinary tract to locate the stone without any cuts."
    },
    {
      label: "Laser Stone Fragmentation",
      desc: "Laser energy is used to break the stone into tiny dust-like particles."
    },
    {
      label: "Stone Removal / Natural Passage",
      desc: "Small fragments are either washed out or pass naturally through urine."
    },
    {
      label: "Stent Placement",
      desc: "A temporary stent may be placed to help stone fragments pass easily and improve recovery."
    }
  ],

  recovery: [
    "Same-day or next-day discharge in most cases",
    "Mild burning sensation during urination (temporary)",
    "Slight blood in urine for a short period",
    "Frequent urination initially",
    "Normal recovery in 2–6 days",
    "Full recovery within 1–2 weeks"
  ],
},
  {
  id: 17,
  title: "Uro Oncology",
  short: "Comprehensive cancer care for urinary and reproductive organs.",
  category: "Oncology", catColor: "#E05A5A",
  img: "/services/UroOncology.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 3v18M5 12h14" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Blood in urine", "Persistent urinary symptoms", "Detected tumors in urinary organs"],
  symptoms: ["Pain during urination", "Frequent urination", "Unexplained weight loss"],
  diagnosis: ["CT scan", "MRI", "Biopsy", "Blood tests"],
  treatments: [
    { label: "Surgery", desc: "Tumor removal procedures including prostate, bladder, kidney surgeries." },
    { label: "Chemotherapy / Immunotherapy", desc: "Advanced cancer treatment depending on stage." },
    { label: "Radiation Therapy", desc: "Targeted therapy to destroy cancer cells." },
  ],
  recovery: ["1–2 weeks (minor)", "2–6 weeks (moderate)", "4–8 weeks (major surgeries)"],
},

{
  id: 18,
  title: "Kidney Transplantation",
  short: "Advanced kidney replacement surgery with expert post-care.",
  category: "Transplant", catColor: "#6B7FD4",
  img: "/services/kidneytransplant.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 21s7-5 7-11a7 7 0 10-14 0c0 6 7 11 7 11z" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Kidney failure", "Chronic kidney disease (advanced stage)"],
  symptoms: ["Fatigue", "Swelling", "Reduced urine output"],
  diagnosis: ["Blood tests", "Compatibility tests", "Imaging"],
  treatments: [
    { label: "Transplant Surgery", desc: "Healthy kidney placed in lower abdomen." },
    { label: "Post-Transplant Care", desc: "Immunosuppressants and monitoring." },
  ],
  recovery: ["5–10 days hospital stay", "2–4 weeks initial recovery", "6–8 weeks full recovery"],
},

{
  id: 19,
  title: "Urethroplasty & Urethral Stenting",
  short: "Reconstruction and widening of narrowed urethra.",
  category: "Reconstructive", catColor: T.orange,
  img: "/services/urethroplastyrevised.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M4 12h16" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Difficulty passing urine", "Urethral blockage"],
  symptoms: ["Weak urine flow", "Pain during urination"],
  diagnosis: ["Uroflowmetry", "Cystoscopy", "Imaging"],
  treatments: [
    { label: "Urethroplasty", desc: "Surgical reconstruction of urethra." },
    { label: "Urethral Stenting", desc: "Placement of stent to keep passage open." },
  ],
  recovery: ["2–4 days hospital stay", "3–6 weeks full recovery"],
},

{
  id: 20,
  title: "Female Urology",
  short: "Specialized care for urinary and pelvic conditions in women.",
  category: "General Urology", catColor: T.orange,
  img: "/services/femaleurology.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Frequent urination", "Urine leakage", "Pelvic discomfort"],
  symptoms: ["Burning urination", "Urgency", "Lower abdominal pain"],
  diagnosis: ["Urine test", "Ultrasound", "Pelvic exam"],
  treatments: [
    { label: "Medication", desc: "For infections and bladder control." },
    { label: "Therapy", desc: "Pelvic floor strengthening." },
    { label: "Surgery", desc: "For severe prolapse or incontinence." },
  ],
  recovery: ["2–4 days (minor)", "4–6 weeks (surgical cases)"],
},

{
  id: 21,
  title: "Pediatric Urology",
  short: "Expert care for urinary and genital issues in children.",
  category: "Specialized", catColor: "#6B7FD4",
  img: "/services/pediatricurology.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Birth defects", "Urinary infections in children", "Bedwetting"],
  symptoms: ["Pain during urination", "Swelling", "Frequent infections"],
  diagnosis: ["Ultrasound", "Urine test", "Special pediatric tests"],
  treatments: [
    { label: "Medication", desc: "For infections and mild conditions." },
    { label: "Minimally Invasive Procedures", desc: "Child-safe surgical solutions." },
    { label: "Surgery", desc: "For congenital abnormalities." },
  ],
  recovery: ["Few days (minor)", "2–4 days (minimally invasive)", "3–4 weeks (surgery)"],
},

{
  id: 22,
  title: "Laparoscopy",
  short: "Minimally invasive surgery with faster recovery and less pain.",
  category: "Minimally Invasive", catColor: T.teal,
  img: "/services/Laparoscopy.png",
  icon: <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5"/></svg>,
  when: ["Kidney issues", "Bladder conditions", "Ureter problems"],
  symptoms: ["Pain", "Organ dysfunction"],
  diagnosis: ["CT scan", "Ultrasound", "Blood tests"],
  treatments: [
    { label: "Minimally Invasive Surgery", desc: "Small incisions with camera-guided tools." },
    { label: "Advanced Procedures", desc: "Used for kidney, bladder, and abdominal surgeries." },
  ],
  recovery: ["Same day or 1–2 days discharge", "3–7 days basic recovery", "2–3 weeks full recovery"],
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [serviceId]);

  if (!service) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .sd-fade { animation: fadeIn 0.6s ease-out; }
      `}</style>

      <div style={{ background: T.bg, minHeight: "100vh" }}>
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
             <a href="tel:+919773332601" style={{
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
