import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";

export default function WarehouseCreate() {
  const nav = useNavigate();
  const [f, setF] = useState({ warehouseCode:"", warehouseName:"", warehouseLocation:"" });
  const [err, setErr] = useState(""); const [msg, setMsg] = useState("");
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    try {
      await api.post("/warehouse", f);
      setMsg("Warehouse saved"); setTimeout(() => nav("/dashboard"), 800);
    } catch (e) { setErr(e?.response?.data?.message || "Save failed"); }
  };
  return (
    <div className="max-w-xl mx-auto bg-white border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Register Warehouse</h1>
      <AlertBanner type="error" message={err} onClose={()=>setErr("")} />
      <AlertBanner type="success" message={msg} onClose={()=>setMsg("")} />
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Warehouse Code"
          value={f.warehouseCode} onChange={e=>setF({...f, warehouseCode:e.target.value})} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Warehouse Name"
          value={f.warehouseName} onChange={e=>setF({...f, warehouseName:e.target.value})} required />
        <input className="w-full border rounded-lg px-3 py-2" placeholder="Warehouse Location"
          value={f.warehouseLocation} onChange={e=>setF({...f, warehouseLocation:e.target.value})} required />
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Warehouse</button>
      </form>
    </div>
  );
}
