import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useLang } from "./lib/i18n.jsx";
import { CLINIC, wa } from "./lib/config.js";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Appointment from "./pages/Appointment.jsx";
import { Privacy, Disclaimer } from "./pages/Legal.jsx";
import { AdminLogin, AdminDashboard } from "./pages/Admin.jsx";

function Layout({ children }) {
  const { t, lang, set } = useLang();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setOpen(false);
    if (loc.hash) setTimeout(() => document.querySelector(loc.hash)?.scrollIntoView({ behavior: "smooth" }), 50);
    else window.scrollTo(0, 0);
  }, [loc]);
  const hello = "Hello Move Easy Physiotherapy, I would like to talk to you.";
  const links = [["home", "/"], ["about", "/#about"], ["services", "/services"], ["homevisit", "/#homevisit"], ["contact", "/#contact"]];
  return (<>
    <header className="nav"><div className="wrap nav-in">
      <Link className="brand" to="/"><img src="/images/logo.png" alt="Move Easy Physiotherapy logo" /><span>Move Easy<small>Physiotherapy</small></span></Link>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
      <nav id="menu" className={open ? "open" : ""} aria-label="Main">
        {links.map(([k, to]) => <Link key={k} to={to}>{t(k)}</Link>)}
        <Link className="btn" to="/appointment">{t("book")}</Link>
        <div className="lang"><button className={lang === "en" ? "on" : ""} onClick={() => set("en")}>EN</button><span>|</span><button className={lang === "mr" ? "on" : ""} onClick={() => set("mr")}>मराठी</button></div>
      </nav>
    </div></header>
    <main>{children}</main>
    <footer className="foot"><div className="wrap fgrid">
      <div><h3>{CLINIC.name}</h3><p>Physiotherapy &amp; Rehabilitation Centre</p><p>{CLINIC.addressLines.join(" ")}</p></div>
      <div><h3>Links</h3><Link to="/privacy">Privacy Policy</Link><Link to="/disclaimer">Disclaimer</Link><Link to="/admin/login">Staff Login</Link></div>
      <div><h3>{t("contact")}</h3>{CLINIC.phones.map((p) => <a key={p} href={`tel:+91${p}`}>{p}</a>)}</div>
    </div><p className="copy">© 2026 Move Easy Physiotherapy. All rights reserved.</p></footer>
    <a className="fab" href={wa(hello)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
    <div className="bar"><a href={`tel:+91${CLINIC.phones[0]}`}>📞 {t("call")}</a><a href={wa(hello)} target="_blank" rel="noopener noreferrer">💬 {t("whatsapp")}</a><Link to="/appointment">📅 {t("appointment")}</Link></div>
  </>);
}

export default function App() {
  return (<Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
    <Route path="/appointment" element={<Appointment />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="*" element={<section className="sec"><div className="wrap"><h1>Page not found</h1><Link to="/">Go home</Link></div></section>} />
  </Routes></Layout>);
}
