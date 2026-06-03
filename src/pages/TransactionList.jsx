import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";
import { dateStr } from "../utils/formatters.js";
import Modal from "../components/Modal.jsx";
import AlertBanner from "../components/AlertBanner.jsx";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function TransactionList() {
  const [items, setItems] = useState([]);
  const [del, setDel] = useState(null);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  const load = () => api.get("/transaction").then(r=>setItems(r.data));
  useEffect(() => { load(); }, []);
  const remove = async () => {
    try { await api.delete(`/transaction/${del._id}`); setMsg("Deleted"); setDel(null); load(); }
    catch (e) { setErr(e?.response?.data?.message || "Delete failed"); setDel(null); }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Stock Transactions</h1>
        <Link to="/transaction/new" className="px-3 py-2 rounded-lg bg-brand-600 text-white flex items-center gap-1 hover:bg-brand-700"><Plus size={16}/> New</Link>
      </div>
      <AlertBanner type="error" message={err} onClose={()=>setErr("")} />
      <AlertBanner type="success" message={msg} onClose={()=>setMsg("")} />
      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-2">Date</th><th className="text-left p-2">Product</th>
              <th className="text-left p-2">Warehouse</th><th className="text-left p-2">Type</th>
              <th className="text-right p-2">Qty</th><th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.length===0 && <tr><td colSpan={6} className="p-6 text-center text-slate-500">No transactions yet</td></tr>}
            {items.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{dateStr(t.transactionDate)}</td>
                <td className="p-2">{t.product?.productName}</td>
                <td className="p-2">{t.warehouse?.warehouseName}</td>
                <td className="p-2"><span className={`px-2 py-0.5 rounded text-xs ${t.transactionType==="IN"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{t.transactionType}</span></td>
                <td className="p-2 text-right">{t.quantityMoved}</td>
                <td className="p-2 text-right whitespace-nowrap">
                  <Link to={`/transaction/${t._id}/edit`} className="inline-flex items-center gap-1 text-brand-600 mr-3"><Pencil size={14}/> Edit</Link>
                  <button onClick={()=>setDel(t)} className="inline-flex items-center gap-1 text-red-600"><Trash2 size={14}/> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={!!del} onClose={()=>setDel(null)} title="Confirm delete"
        footer={<div className="flex justify-end gap-2">
          <button onClick={()=>setDel(null)} className="px-3 py-1.5 border rounded-lg">Cancel</button>
          <button onClick={remove} className="px-3 py-1.5 bg-red-600 text-white rounded-lg">Delete</button>
        </div>}>
        Delete this transaction? Stock will be restored automatically.
      </Modal>
    </div>
  );
}
