import { Link } from "react-router-dom";
import { Boxes, ShieldCheck, BarChart3, Zap, Check, X } from "lucide-react";

export default function LandingPage() {
  const pros = [
    "Eliminates manual paper-based errors",
    "Real-time stock visibility across warehouses",
    "Automatic stock in / out updates on every transaction",
    "Daily, weekly and monthly reports generated instantly",
    "Secure JWT login with recovery codes",
  ];
  const cons = [
    "Requires an internet connection",
    "Initial data entry needed to migrate from paper",
    "Staff training is required for first-time use",
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 md:px-10 border-b bg-white">
        <div className="font-bold text-brand-700 text-lg">StockHub SMS</div>
        <div className="space-x-2">
          <Link to="/login" className="px-4 py-2 rounded-lg border hover:bg-slate-50 transition">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition">Get Started</Link>
        </div>
      </header>

      <section className="px-6 md:px-16 py-16 text-center bg-gradient-to-b from-brand-50 to-white animate-fadeIn">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Stock Management System</h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          A modern web platform for StockHub Ltd to manage products, warehouses, and stock movements with
          automatic calculations and reports.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/register" className="px-6 py-3 rounded-lg bg-brand-600 text-white hover:bg-brand-700 hover:scale-105 transition">Get Started</Link>
          <Link to="/login" className="px-6 py-3 rounded-lg border hover:bg-slate-50 hover:scale-105 transition">Login</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-4 px-6 md:px-16 py-12">
        {[
          { icon: Boxes, t: "Products", d: "Register product codes, categories, prices and stock." },
          { icon: BarChart3, t: "Reports", d: "Daily, weekly, monthly stock & movement reports." },
          { icon: ShieldCheck, t: "Secure Auth", d: "JWT login with recovery codes." },
          { icon: Zap, t: "Automation", d: "Quantities update automatically on each transaction." },
        ].map((f, i) => (
          <div key={i} className="bg-white border rounded-xl p-5 hover:shadow-md hover:scale-[1.02] transition">
            <f.icon className="text-brand-600" />
            <div className="font-semibold mt-2">{f.t}</div>
            <div className="text-sm text-slate-600">{f.d}</div>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-16 py-12 bg-slate-50 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="font-semibold text-green-700 mb-3">Pros</h2>
          <ul className="space-y-2">
            {pros.map((p) => <li key={p} className="flex gap-2"><Check className="text-green-600" size={18}/> {p}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 border">
          <h2 className="font-semibold text-red-700 mb-3">Cons</h2>
          <ul className="space-y-2">
            {cons.map((p) => <li key={p} className="flex gap-2"><X className="text-red-600" size={18}/> {p}</li>)}
          </ul>
        </div>
      </section>

      <footer className="text-center text-sm text-slate-500 py-6 border-t bg-white">
        Built by <span className="font-semibold">Ishimwe Narada</span> · © {new Date().getFullYear()} StockHub Ltd
      </footer>
    </div>
  );
}
