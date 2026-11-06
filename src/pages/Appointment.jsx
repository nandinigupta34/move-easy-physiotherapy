import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase, configured } from "../lib/supabase.js";
import { SERVICES, wa } from "../lib/config.js";
import { useLang } from "../lib/i18n.jsx";

const today = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };

export default function Appointment() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const [f, setF] = useState({ name: "", phone: "", age: "", date: "", time: "", service: "", visit: params.get("visit") === "home" ? "Home Visit" : "Clinic Visit", reason: "", message: "", consent: false });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | loading | done
  const [fail, setFail] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  function validate() {
    const e = {};
    if (f.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (f.age && (f.age < 1 || f.age > 120)) e.age = "Enter a valid age.";
    if (!f.date || f.date < today()) e.date = "Choose today or a future date.";
    if (!f.time) e.time = "Choose a preferred time.";
    if (!f.service) e.service = "Please select a service.";
    if (!f.consent) e.consent = "Please tick the consent box.";
    return e;
  }

  async function submit(ev) {
    ev.preventDefault(); setFail("");
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) return;
    if (!configured) { setFail("Online booking is not set up yet. Please call or WhatsApp the clinic."); return; }
    setState("loading");
    const { error } = await supabase.from("appointments").insert({
      patient_name: f.name.trim(), phone: f.phone, age: f.age ? Number(f.age) : null, preferred_date: f.date, preferred_time: f.time,
      service: f.service, visit_type: f.visit, reason: f.reason.trim() || null, message: f.message.trim() || null });
    if (error) { setState("idle"); setFail("Sorry, we could not send your request. Please try again or call the clinic."); return; }
    setState("done");
  }

  if (state === "done") {
    const msg = `Hello Move Easy Physiotherapy,\n\nI would like to request an appointment.\n\nName: ${f.name}\nAge: ${f.age || "-"}\nPreferred Date: ${f.date}\nPreferred Time: ${f.time}\nService: ${f.service}\nVisit Type: ${f.visit}\nReason: ${f.reason || "-"}\n\nThank you.`;
    return (<section className="sec"><div className="wrap narrow ok" role="status">
      <h2>Thank you</h2><p>Your appointment request has been received. The clinic will contact you to confirm the appointment.</p>
      <a className="btn wa" href={wa(msg)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></div></section>);
  }

  const Field = ({ k, label, children }) => (<label>{label}{children}{errors[k] && <span className="err" role="alert">{errors[k]}</span>}</label>);
  return (<section className="sec"><div className="wrap narrow">
    <h1>{t("book")}</h1>
    <p className="sub">Please do not enter detailed medical history. The clinic will contact you to confirm.</p>
    <form onSubmit={submit} noValidate>
      <Field k="name" label="Full Name *"><input value={f.name} onChange={set("name")} autoComplete="name" maxLength={100} /></Field>
      <Field k="phone" label="Mobile Number *"><input value={f.phone} onChange={set("phone")} inputMode="numeric" maxLength={10} autoComplete="tel" /></Field>
      <Field k="age" label="Age"><input type="number" value={f.age} onChange={set("age")} /></Field>
      <div className="row">
        <Field k="date" label="Preferred Date *"><input type="date" min={today()} value={f.date} onChange={set("date")} /></Field>
        <Field k="time" label="Preferred Time *"><input type="time" value={f.time} onChange={set("time")} /></Field>
      </div>
      <Field k="service" label="Service Required *">
        <select value={f.service} onChange={set("service")}><option value="">Select</option>
          {SERVICES.flatMap((s) => s.items).map((i) => <option key={i}>{i}</option>)}<option>Other</option></select></Field>
      <fieldset><legend>Visit Type *</legend>
        {["Clinic Visit", "Home Visit"].map((v) => <label className="inline" key={v}><input type="radio" checked={f.visit === v} onChange={() => setF({ ...f, visit: v })} /> {v}</label>)}</fieldset>
      <Field k="reason" label="Reason for Visit"><input value={f.reason} onChange={set("reason")} maxLength={300} /></Field>
      <Field k="message" label="Additional Message"><textarea rows={3} value={f.message} onChange={set("message")} maxLength={500} /></Field>
      <label className="inline"><input type="checkbox" checked={f.consent} onChange={set("consent")} /> I agree to be contacted regarding my appointment request.</label>
      {errors.consent && <span className="err" role="alert">{errors.consent}</span>}
      {fail && <p className="err" role="alert">{fail}</p>}
      <button className="btn full" disabled={state === "loading"}>{state === "loading" ? "Sending…" : t("request")}</button>
    </form></div></section>);
}
