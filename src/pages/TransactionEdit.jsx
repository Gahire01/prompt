import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";

export default function TransactionEdit() {
  const { id } = useParams(); const nav = useNavigate();
  const [products, setProducts] = useState([]); const [warehouses, setWarehouses] = useState([]);
  const [f, setF] = useState(null);
  const [err, setErr] = useState(""); const [msg, setMsg] = useState("");
  useEffect(() => {
    Promise.all([
      api.get("/product/select").then(r=>setProducts(r.data)),
      api.get("/warehouse/select").then(r=>setWarehouses(r.data)),
      api.get(`/transaction/${id}`).then(r => setF({
        product: r.data.product?._id || r.data.product,
        warehouse: r.data.warehouse?._id || r.data.warehouse,
        transactionDate: r.data.transactionDate?.slice(0,10),
        quantityMoved: r.data.quantityMoved,
        transactionType: r.data.transactionType,
      })),
    ]).catch(()=>{});
  }, [id]);
  if (!f) return <div className="p-6">Loading…</div>;
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    try { await api.put(`/transaction/${id}`, { ...f, quantityMoved: +f.quantityMoved });
      setMsg("Updated"); setTimeout(()=>nav("/transaction"), 700);
    } catch (e) { setErr(e?.response?.data?.message || "Update failed"); }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Transaction</h1>
      <AlertBanner type="error" message={err} onClose={()=>setErr("")} />
      <AlertBanner type="success" message={msg} onClose={()=>setMsg("")} />
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm">Product
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.product} onChange={e=>setF({...f, product:e.target.value})}>
            {products.map(p=> <option key={p._id} value={p._id}>{p.productCode} — {p.productName}</option>)}
          </select></label>
        <label className="block text-sm">Warehouse
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.warehouse} onChange={e=>setF({...f, warehouse:e.target.value})}>
            {warehouses.map(w=> <option key={w._id} value={w._id}>{w.warehouseCode} — {w.warehouseName}</option>)}
          </select></label>
        <label className="block text-sm">Date
          <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" value={f.transactionDate} onChange={e=>setF({...f, transactionDate:e.target.value})} /></label>
        <label className="block text-sm">Type
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={f.transactionType} onChange={e=>setF({...f, transactionType:e.target.value})}>
            <option value="IN">Stock In</option><option value="OUT">Stock Out</option>
          </select></label>
        <label className="block text-sm">Quantity
          <input type="number" min="1" step="1" className="mt-1 w-full border rounded-lg px-3 py-2" value={f.quantityMoved} onChange={e=>setF({...f, quantityMoved:e.target.value})} /></label>
        <div className="md:col-span-2 flex justify-end">
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Update</button>
        </div>
      </form>
    </div>
  );
}
