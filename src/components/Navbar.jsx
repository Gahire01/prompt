import { Menu, User } from "lucide-react";
export default function Navbar({ onToggle }) {
  const username = (() => { try { return JSON.parse(localStorage.getItem("user"))?.username || "Admin"; } catch { return "Admin"; } })();
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 sticky top-0 z-30">
      <button className="md:hidden mr-2" onClick={onToggle}><Menu /></button>
      <div className="font-semibold text-brand-700">StockHub SMS</div>
      <div className="ml-auto hidden md:flex items-center gap-2 text-slate-600">
        <User size={18} /> <span>Welcome, {username}</span>
      </div>
    </header>
  );
}
