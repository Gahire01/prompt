import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";

export default function ForgotPassword() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", recoveryCode: "", newPassword: "" });
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    try {
      await api.post("/auth/forgot-password", form);
      setMsg("Password updated. Redirecting…");
      setTimeout(() => nav("/login"), 1200);
    } catch (e) { setErr(e?.response?.data?.message || "Failed"); }
  };
  return (
    <div className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <form onSubmit={submit} className="bg-white border rounded-xl p-6 w-full max-w-sm animate-fadeIn">
        <h1 className="text-xl font-semibold mb-4">Reset password</h1>
        <AlertBanner type="error" message={err} onClose={() => setErr("")} />
        <AlertBanner type="success" message={msg} onClose={() => setMsg("")} />
        <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Username"
          value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Recovery code (XXXX-XXXX)"
          value={form.recoveryCode} onChange={(e) => setForm({ ...form, recoveryCode: e.target.value })} required />
        <input type="password" className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="New password"
          value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
        <button className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 transition">Reset</button>
        <div className="text-sm mt-3 text-center"><Link to="/login" className="text-brand-600">Back to login</Link></div>
      </form>
    </div>
  );
}
