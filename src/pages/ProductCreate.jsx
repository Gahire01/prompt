import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import AlertBanner from "../components/AlertBanner.jsx";

const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;

export default function ProductCreate() {
  const nav = useNavigate();
  const [f, setF] = useState({ productCode:"", productName:"", category:"", quantityInStock:0, unitPrice:0, supplierName:"", dateReceived:"" });
  const [err, setErr] = useState(""); const [msg, setMsg] = useState("");
  const upd = (k,v) => setF((s) => ({ ...s, [k]: v }));
  const submit = async (e) => {
    e.preventDefault(); setErr(""); setMsg("");
    if (!nameRegex.test(f.productName)) return setErr("Product name: letters only, 2-50 chars");
    if (!nameRegex.test(f.supplierName)) return setErr("Supplier name: letters only");
    if (Number(f.quantityInStock) < 0 || !Number.isInteger(+f.quantityInStock)) return setErr("Quantity must be a non-negative integer");
    if (Number(f.unitPrice) < 0 || !Number.isInteger(+f.unitPrice)) return setErr("Unit price must be a non-negative integer (RWF)");
    try {
      await api.post("/product", { ...f, quantityInStock: +f.quantityInStock, unitPrice: +f.unitPrice });
      setMsg("Product saved");
      setTimeout(() => nav("/dashboard"), 800);
    } catch (e) { setErr(e?.response?.data?.message || "Save failed"); }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Register Product</h1>
      <AlertBanner type="error" message={err} onClose={()=>setErr("")} />
      <AlertBanner type="success" message={msg} onClose={()=>setMsg("")} />
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <Field label="Product Code"><input className="inp" value={f.productCode} onChange={e=>upd("productCode",e.target.value)} required /></Field>
        <Field label="Product Name"><input className="inp" value={f.productName} onChange={e=>upd("productName",e.target.value)} required /></Field>
        <Field label="Category"><input className="inp" value={f.category} onChange={e=>upd("category",e.target.value)} required /></Field>
        <Field label="Quantity in Stock"><input type="number" min="0" step="1" className="inp" value={f.quantityInStock} onChange={e=>upd("quantityInStock",e.target.value)} required /></Field>
        <Field label="Unit Price (RWF)"><input type="number" min="0" step="1" className="inp" value={f.unitPrice} onChange={e=>upd("unitPrice",e.target.value)} required /></Field>
        <Field label="Supplier Name"><input className="inp" value={f.supplierName} onChange={e=>upd("supplierName",e.target.value)} required /></Field>
        <Field label="Date Received"><input type="date" className="inp" value={f.dateReceived} onChange={e=>upd("dateReceived",e.target.value)} required /></Field>
        <div className="md:col-span-2 flex justify-end">
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Product</button>
        </div>
      </form>
      <style>{`.inp{ @apply w-full border rounded-lg px-3 py-2; } input.inp{border:1px solid #e5e7eb;border-radius:.5rem;padding:.5rem .75rem;width:100%}`}</style>
    </div>
  );
}
function Field({label, children}) { return <label className="block text-sm"><span className="text-slate-600">{label}</span><div className="mt-1">{children}</div></label>; }
