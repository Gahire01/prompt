import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";
import { rwf } from "../utils/formatters.js";

export default function TransactionCreate() {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [f, setF] = useState({ product:"", warehouse:"", transactionDate: new Date().toISOString().slice(0,10), quantityMoved:1, transactionType:"IN" });
  const [err, setErr] = useState(""); const [msg, setMsg] = useState("");
  useEffect(() => {
    api.get("/product/select").then(r=>setProducts(r.data));
    api.get("/warehouse/select").then(r=>setWarehouses(r.data));
  }, []);
  const product = products.find(p=>p._id===f.product);
  const total = product ? (product.unitPrice||0) * (+f.quantityMoved||0) : 0;
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    if (+f.quantityMoved < 1) return setErr("Quantity must be at least 1");
    try {
      await api.post("/transaction", { ...f, quantityMoved: +f.quantityMoved });
      setMsg("Transaction saved"); setTimeout(()=>nav("/transaction"), 700);
    } catch (e) { setErr(e?.response?.data?.message || "Save failed"); }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">New Stock Transaction</h1>
      <AlertBanner type="error" message={err} onClose={()=>setErr("")} />
      <AlertBanner type="success" message={msg} onClose={()=>setMsg("")} />
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm">Product
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.product} onChange={e=>setF({...f, product:e.target.value})} required>
            <option value="">Select…</option>
            {products.map(p=> <option key={p._id} value={p._id}>{p.productCode} — {p.productName} (stock: {p.quantityInStock})</option>)}
          </select></label>
        <label className="block text-sm">Warehouse
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.warehouse} onChange={e=>setF({...f, warehouse:e.target.value})} required>
            <option value="">Select…</option>
            {warehouses.map(w=> <option key={w._id} value={w._id}>{w.warehouseCode} — {w.warehouseName}</option>)}
          </select></label>
        <label className="block text-sm">Date
          <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" value={f.transactionDate} onChange={e=>setF({...f, transactionDate:e.target.value})} required /></label>
        <label className="block text-sm">Type
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.transactionType} onChange={e=>setF({...f, transactionType:e.target.value})}>
            <option value="IN">Stock In</option><option value="OUT">Stock Out</option>
          </select></label>
        <label className="block text-sm">Quantity Moved
          <input type="number" min="1" step="1" className="mt-1 w-full border rounded-lg px-3 py-2" value={f.quantityMoved} onChange={e=>setF({...f, quantityMoved:e.target.value})} required /></label>
        <div className="block text-sm">
          <span className="text-slate-600">Total Value</span>
          <div className="mt-1 px-3 py-2 rounded-lg bg-slate-50 border font-medium">{rwf(total)}</div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Transaction</button>
        </div>
      </form>
    </div>
  );
}
