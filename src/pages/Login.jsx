import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: data.username }));
      nav("/dashboard");
    } catch (e) { setErr(e?.response?.data?.message || "Login failed"); }
  };
  return (
    <div className="min-h-screen grid place-items-center p-4 bg-slate-50">
      <form onSubmit={submit} className="bg-white border rounded-xl p-6 w-full max-w-sm animate-fadeIn">
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>
        <AlertBanner type="error" message={err} onClose={() => setErr("")} />
        <label className="block text-sm mb-1">Username</label>
        <input className="w-full border rounded-lg px-3 py-2 mb-3" value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" className="w-full border rounded-lg px-3 py-2 mb-4" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 transition">Login</button>
        <div className="flex justify-between text-sm mt-3">
          <Link to="/register" className="text-brand-600">Create account</Link>
          <Link to="/forgot-password" className="text-brand-600">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}
