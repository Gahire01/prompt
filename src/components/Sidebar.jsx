import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PackagePlus, Warehouse, ArrowRightLeft, FileBarChart, LogOut, UserCircle } from "lucide-react";

const linkCls = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-brand-50 hover:text-brand-700 ${
    isActive ? "bg-brand-50 text-brand-700 font-medium" : "text-slate-600"
  }`;

export default function Sidebar({ open, onClose }) {
  const nav = useNavigate();
  const username = (() => { try { return JSON.parse(localStorage.getItem("user"))?.username || "Admin"; } catch { return "Admin"; } })();
  const logout = () => { localStorage.clear(); nav("/login"); };
  return (
    <>
      <div className={`fixed inset-0 bg-black/30 md:hidden z-30 ${open ? "" : "hidden"}`} onClick={onClose} />
      <aside className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white border-r p-4 z-40 transform transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 pb-4 border-b">
          <div className="w-10 h-10 rounded-full bg-brand-500 text-white grid place-items-center"><UserCircle /></div>
          <div>
            <div className="font-semibold">{username}</div>
            <div className="text-xs text-slate-500">Administrator</div>
          </div>
        </div>
        <nav className="mt-4 space-y-1">
          <NavLink to="/dashboard" className={linkCls} onClick={onClose}><LayoutDashboard size={18}/> Dashboard</NavLink>
          <NavLink to="/product/new" className={linkCls} onClick={onClose}><PackagePlus size={18}/> Product</NavLink>
          <NavLink to="/warehouse/new" className={linkCls} onClick={onClose}><Warehouse size={18}/> Warehouse</NavLink>
          <NavLink to="/transaction" className={linkCls} onClick={onClose}><ArrowRightLeft size={18}/> Transactions</NavLink>
          <NavLink to="/report" className={linkCls} onClick={onClose}><FileBarChart size={18}/> Reports</NavLink>
        </nav>
        <button onClick={logout} className="mt-6 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">
          <LogOut size={18}/> Logout
        </button>
      </aside>
    </>
  );
}
