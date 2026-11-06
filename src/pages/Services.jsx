import { Link } from "react-router-dom";
import { SERVICES } from "../lib/config.js";
import { ServiceImage } from "./Home.jsx";

export default function Services() {
  return (<section className="sec"><div className="wrap">
    <h1>Physiotherapy Services</h1>
    <p className="sub">Please consult the physiotherapist for an assessment specific to your condition.</p>
    <div className="grid">{SERVICES.map((s) => (
      <article className="card scard" id={s.slug} key={s.slug}>
        <div className="top"><ServiceImage s={s} /></div>
        <div className="body"><h2 style={{ fontSize: "1.2rem" }}>{s.title}</h2><p>{s.desc}</p>
          <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          <Link to="/appointment">Book Appointment →</Link></div>
      </article>))}</div>
  </div></section>);
}
