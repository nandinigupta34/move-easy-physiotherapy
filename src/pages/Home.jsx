import { Link } from "react-router-dom";
import { useLang } from "../lib/i18n.jsx";
import { CLINIC, SERVICES, wa, directions, GOOGLE_LINK, INSTAGRAM } from "../lib/config.js";

export function ServiceImage({ s }) {
  // Shows /images/services/<slug>.jpg if you add it; otherwise the icon on a teal background.
  return (<><span>{s.icon}</span><img src={`/images/services/${s.slug}.jpg`} alt={s.imageAlt} loading="lazy" onError={(e) => e.currentTarget.remove()} /></>);
}
const FAQ = [
  ["What is physiotherapy?", "Physiotherapy uses movement, exercise and hands-on techniques to help restore and maintain movement and function."],
  ["Do I need an appointment?", "Requesting an appointment in advance is recommended. The clinic will contact you to confirm."],
  ["Do you provide home physiotherapy?", "Yes, home physiotherapy services are available all over Pune."],
  ["Which areas do you cover?", "Home physiotherapy is available all over Pune."],
  ["Do you provide post-surgery rehabilitation?", "Yes, pre and post operative rehabilitation is offered, including knee and hip replacement rehabilitation. Please consult the physiotherapist for an assessment specific to your condition."],
  ["How can I request an appointment?", "Use the appointment form, call, or message the clinic on WhatsApp."],
];
// Fill these in when real details are supplied; empty ones show "To be added".
const DOCTOR = { Qualification: "BPTH", Specializations: "", Experience: "", "Professional Registration": "", Certifications: "" };
const WHY = [["🩺", "Personalized Care"], ["🦴", "Physiotherapy & Rehabilitation Services"], ["🏠", "Home Visit Facility"], ["🧩", "Multiple Rehabilitation Services"], ["📅", "Convenient Appointment Booking"], ["📍", "Located in Hadapsar, Pune"]];
const HELLO = "Hello Move Easy Physiotherapy, I would like to talk to you.";

export default function Home() {
  const { t } = useLang();
  return (<>
    <section className="hero"><div className="wrap hero-in">
      <div>
        <p className="chip">🏠 Home Physiotherapy Available Across Pune</p>
        <h1>Move Easy Physiotherapy</h1>
        <p className="tag">Physiotherapy &amp; Rehabilitation Centre</p>
        <p className="doc"><strong>Dr. Priya Pradeep Gupta, BPTH</strong><br />Physiotherapist &amp; Rehabilitation Specialist</p>
        <p>Professional physiotherapy and rehabilitation services focused on supporting mobility, strength and everyday function.</p>
        <div className="btns">
          <Link className="btn" to="/appointment">{t("book")}</Link>
          <a className="btn wa" href={wa(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
          <a className="btn outline" href={`tel:+91${CLINIC.phones[0]}`}>{t("call")}</a>
        </div>
      </div>
      {/* Add public/images/hero.jpg (a treatment photo) to replace this. Falls back to the clinic photo. */}
      <img className="hero-img" src="/images/hero.jpg" alt="Physiotherapy at Move Easy Physiotherapy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/clinic-interior.jpg"; }} />
    </div></section>

    <section id="services" className="sec"><div className="wrap">
      <h2>{t("svc")}</h2><p className="sub">Please consult the physiotherapist for an assessment specific to your condition.</p>
      <div className="grid">{SERVICES.map((s) => (
        <article className="card scard" key={s.slug}>
          <div className="top"><ServiceImage s={s} /></div>
          <div className="body"><h3>{s.title}</h3><p>{s.desc}</p><Link to={`/services#${s.slug}`}>Learn More →</Link></div>
        </article>))}</div>
      <p style={{ textAlign: "center", marginTop: 20 }}><Link className="btn outline" to="/services">View All Services</Link></p>
    </div></section>

    <section id="about" className="sec alt"><div className="wrap two">
      <img className="hero-img" src="/images/clinic-interior.jpg" alt="Treatment room and consultation desk at Move Easy Physiotherapy" loading="lazy" />
      <div><h2>About Move Easy Physiotherapy</h2>
        <p>Move Easy Physiotherapy is a physiotherapy and rehabilitation centre in Hadapsar, Pune, led by Dr. Priya Pradeep Gupta, BPTH.</p>
        <p>The clinic offers orthopedic, neuro, post-surgical and sports rehabilitation, along with geriatric physiotherapy, dry needling and cupping therapy, and home physiotherapy across Pune.</p>
        <p>You can call, message on WhatsApp, or request an appointment online and the clinic will contact you to confirm.</p>
        <Link className="btn" to="/appointment">{t("book")}</Link></div>
    </div></section>

    <section className="sec"><div className="wrap two">
      <div className="profile">
        <div className="av"><img src="/images/doctor.jpg" alt="Dr. Priya Pradeep Gupta" onError={(e) => e.currentTarget.replaceWith(document.createTextNode("👩‍⚕️"))} /></div>
        <h2 style={{ marginBottom: 4 }}>Dr. Priya Pradeep Gupta, BPTH</h2><p className="tag">Physiotherapist &amp; Rehabilitation Specialist</p>
        <div className="pf">{Object.entries(DOCTOR).map(([k, v]) => <div key={k}><b>{k}</b><br />{v ? v : <span className="empty">To be added</span>}</div>)}</div>
      </div>
      <div><h2>Meet Your Physiotherapist</h2><p>Further professional details will be added here once supplied.</p></div>
    </div></section>

    <section id="homevisit" className="sec dark"><div className="wrap">
      <h2>Physiotherapy at Your Doorstep</h2><p className="sub">Physiotherapy Home Services All Over Pune.</p>
      <ol className="steps">{["Request a home visit", "Choose preferred date/time", "Share the basic requirement", "Clinic contacts the patient to confirm"].map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}</ol>
      <div className="btns" style={{ justifyContent: "center" }}>
        <Link className="btn light" to="/appointment?visit=home">Request Home Visit</Link>
        <a className="btn wa" href={wa("Hello Move Easy Physiotherapy, I would like to request a home visit.")} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
    </div></section>

    <section className="sec"><div className="wrap"><h2>Why Choose Us</h2>
      <div className="icons">{WHY.map(([i, x]) => <div key={x}><span style={{ fontSize: "1.6rem" }}>{i}</span>{x}</div>)}</div></div></section>

    <section className="sec alt"><div className="wrap narrow"><h2>Patient Feedback</h2>
      {/* Add genuine reviews here, with patient permission. */}
      <blockquote className="card ph-t">Real patient testimonial can be added here with permission.</blockquote></div></section>

    <section className="sec"><div className="wrap narrow"><h2>FAQ</h2>
      {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>

    <section className="sec cta"><div className="wrap">
      <h2>Take the First Step Towards Better Movement</h2>
      <div className="btns" style={{ justifyContent: "center" }}>
        <Link className="btn light" to="/appointment">{t("book")}</Link>
        <a className="btn wa" href={wa(HELLO)} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a className="btn light" href={`tel:+91${CLINIC.phones[0]}`}>{t("call")}</a></div>
    </div></section>

    <section id="contact" className="sec alt"><div className="wrap two">
      <div><h2>{t("contact")}</h2>
        <address><strong>{CLINIC.name}</strong><br />{CLINIC.addressLines.map((l) => <span key={l}>{l}<br /></span>)}</address>
        <p>{CLINIC.phones.map((p) => <a key={p} href={`tel:+91${p}`}>{p} &nbsp;</a>)}</p>
        <div className="btns">
          <a className="btn" href={`tel:+91${CLINIC.phones[0]}`}>{t("call")}</a>
          <a className="btn wa" href={wa(HELLO)} target="_blank" rel="noopener noreferrer">{t("whatsapp")}</a>
          <a className="btn outline" href={directions} target="_blank" rel="noopener noreferrer">Get Directions</a>
          <a className="btn outline" href={GOOGLE_LINK} target="_blank" rel="noopener noreferrer">View on Google</a>
          <a className="btn outline" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div></div>
      <iframe className="map" title="Map" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`} />
    </div></section>
  </>);
}
