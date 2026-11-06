import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, configured } from "../lib/supabase.js";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

export function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  async function go(e) {
    e.preventDefault(); setErr("");
    if (!configured) return setErr("Supabase is not configured (.env missing).");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setBusy(false);
    if (error) return setErr("Login failed. Check your email and password.");
    nav("/admin/dashboard");
  }
  return (<section className="sec"><div className="wrap narrow"><h1>Staff Login</h1>
    <form onSubmit={go}>
      <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required /></label>
      <label>Password<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" required /></label>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn full" disabled={busy}>{busy ? "Signing in…" : "Login"}</button>
    </form></div></section>);
}

export function AdminDashboard() {
  const nav = useNavigate();
  const [rows, setRows] = useState(null); const [msg, setMsg] = useState("");
  const [q, setQ] = useState(""); const [st, setSt] = useState(""); const [dt, setDt] = useState(""); const [vt, setVt] = useState("");

  async function load() {
    const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false }).limit(500);
    if (error) { setMsg("Could not load appointments."); setRows([]); return; }
    setRows(data);
  }
  useEffect(() => {
    if (!configured) { nav("/admin/login"); return; }
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return nav("/admin/login");
      // Must be listed in the admins table; otherwise sign out.
      const { data: a } = await supabase.from("admins").select("user_id").eq("user_id", session.user.id).maybeSingle();
      if (!a) { await supabase.auth.signOut(); return nav("/admin/login"); }
      load();
    })();
  }, []);

  async function update(id, patch) {
    const { error } = await supabase.from("appointments").update(patch).eq("id", id);
    setMsg(error ? "Update failed." : "Saved."); if (!error) setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }
  const shown = useMemo(() => (rows || []).filter((r) =>
    (!q || r.patient_name.toLowerCase().includes(q.toLowerCase())) && (!st || r.status === st) && (!dt || r.preferred_date === dt) && (!vt || r.visit_type === vt)), [rows, q, st, dt, vt]);
  if (!rows) return <section className="sec"><div className="wrap">Loading…</div></section>;
  const count = (s) => rows.filter((r) => r.status === s).length;

  return (<section className="sec"><div className="wrap">
    <div className="btns" style={{ justifyContent: "space-between", alignItems: "center" }}>
      <h1>Appointments</h1><button className="btn outline" onClick={async () => { await supabase.auth.signOut(); nav("/admin/login"); }}>Logout</button></div>
    <div className="stats"><div><b>{rows.length}</b>Total</div>{STATUSES.map((s) => <div key={s}><b>{count(s)}</b>{s}</div>)}</div>
    <div className="filters">
      <input placeholder="Search patient name" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search by name" />
      <select value={st} onChange={(e) => setSt(e.target.value)} aria-label="Status"><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
      <input type="date" value={dt} onChange={(e) => setDt(e.target.value)} aria-label="Date" />
      <select value={vt} onChange={(e) => setVt(e.target.value)} aria-label="Visit type"><option value="">All visit types</option><option>Clinic Visit</option><option>Home Visit</option></select>
    </div>
    {msg && <p role="status">{msg}</p>}
    <div className="tw"><table className="tbl"><thead><tr><th>Patient</th><th>Phone</th><th>Date / Time</th><th>Service</th><th>Visit</th><th>Status</th><th>Created</th><th>Details &amp; Notes</th></tr></thead>
      <tbody>{shown.map((r) => (<tr key={r.id}>
        <td>{r.patient_name}{r.age ? ` (${r.age})` : ""}</td>
        <td><a href={`tel:+91${r.phone}`}>{r.phone}</a></td>
        <td>{r.preferred_date}<br />{r.preferred_time?.slice(0, 5)}</td><td>{r.service}</td><td>{r.visit_type}</td>
        <td><select value={r.status} onChange={(e) => update(r.id, { status: e.target.value })} aria-label="Change status">{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <div className="btns" style={{ marginTop: 6, gap: 6 }}>
            <button className="btn" style={{ padding: "4px 10px", fontSize: ".75rem" }} onClick={() => update(r.id, { status: "Confirmed" })}>Confirm</button>
            <button className="btn" style={{ padding: "4px 10px", fontSize: ".75rem" }} onClick={() => update(r.id, { status: "Completed" })}>Done</button>
            <button className="btn outline" style={{ padding: "4px 10px", fontSize: ".75rem" }} onClick={() => update(r.id, { status: "Cancelled" })}>Cancel</button></div></td>
        <td>{new Date(r.created_at).toLocaleString("en-IN")}</td>
        <td><details><summary>View</summary><p><b>Reason:</b> {r.reason || "-"}<br /><b>Message:</b> {r.message || "-"}</p></details>
          <textarea rows={2} defaultValue={r.admin_notes || ""} placeholder="Internal notes" maxLength={1000} onBlur={(e) => e.target.value !== (r.admin_notes || "") && update(r.id, { admin_notes: e.target.value })} aria-label="Internal notes" /></td>
      </tr>))}</tbody></table></div>
    {!shown.length && <p>No appointments found.</p>}
  </div></section>);
}
