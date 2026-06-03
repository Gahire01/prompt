import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Modal from "../components/Modal.jsx";
import AlertBanner from "../components/AlertBanner.jsx";
import { Copy, Download } from "lucide-react";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [codes, setCodes] = useState(null);

  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: data.username }));
      setCodes(data.recoveryCodes);
    } catch (e) { setErr(e?.response?.data?.message || "Register failed"); }
  };
  const copy = () => navigator.clipboard.writeText(codes.join("\n"));
  const download = () => {
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "recovery-codes.txt"; a.click();
  };

  return (
    <div className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <form onSubmit={submit} className="bg-white border rounded-xl p-6 w-full max-w-sm animate-fadeIn">
        <h1 className="text-xl font-semibold mb-4">Create account</h1>
        <AlertBanner type="error" message={err} onClose={() => setErr("")} />
        <label className="block text-sm mb-1">Username</label>
        <input className="w-full border rounded-lg px-3 py-2 mb-3" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" className="w-full border rounded-lg px-3 py-2 mb-2" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <p className="text-xs text-slate-500 mb-3">Min 8 chars · upper · lower · number · special</p>
        <button className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 transition">Register</button>
        <div className="text-sm mt-3 text-center">
          Have an account? <Link to="/login" className="text-brand-600">Login</Link>
        </div>
      </form>

      <Modal open={!!codes} onClose={() => { setCodes(null); nav("/dashboard"); }}
        title="Save your recovery codes"
        footer={<div className="flex justify-end gap-2">
          <button onClick={copy} className="px-3 py-1.5 border rounded-lg flex items-center gap-1"><Copy size={14}/> Copy</button>
          <button onClick={download} className="px-3 py-1.5 border rounded-lg flex items-center gap-1"><Download size={14}/> Download</button>
          <button onClick={() => { setCodes(null); nav("/dashboard"); }} className="px-3 py-1.5 bg-brand-600 text-white rounded-lg">Continue</button>
        </div>}>
        <p className="text-sm text-slate-600 mb-2">Store these codes safely. Each can only be used once to reset your password.</p>
        <ul className="font-mono text-center bg-slate-50 rounded-lg p-3 space-y-1">
          {codes?.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Modal>
    </div>
  );
}
