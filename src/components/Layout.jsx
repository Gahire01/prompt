import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggle={() => setOpen(true)} />
        <main className="flex-1 p-4 md:p-6 animate-fadeIn"><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}
