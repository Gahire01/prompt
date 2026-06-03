import { useEffect, useState } from "react";
import api from "../services/api.js";
import { rwf, dateStr } from "../utils/formatters.js";
import { AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [tx, setTx] = useState([]);
  useEffect(() => {
    api.get("/product/select").then((r) => setProducts(r.data)).catch(() => {});
    api.get("/transaction").then((r) => setTx(r.data.slice(0, 5))).catch(() => {});
  }, []);
  const low = products.filter((p) => p.quantityInStock < 5);
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-semibold">Welcome, Administrator</h1>
        <p className="text-slate-600">Manage StockHub Ltd inventory with ease.</p>
      </div>

      {low.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex gap-2">
          <AlertTriangle /> <div>
            <div className="font-semibold">Low stock alert</div>
            <div className="text-sm">{low.map((p) => `${p.productName} (${p.quantityInStock})`).join(", ")}</div>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-3">Recent transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="text-left p-2">Date</th><th className="text-left p-2">Product</th><th className="text-left p-2">Type</th><th className="text-right p-2">Qty</th><th className="text-right p-2">Unit Price</th></tr>
            </thead>
            <tbody>
              {tx.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500">No transactions yet</td></tr>}
              {tx.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="p-2">{dateStr(t.transactionDate)}</td>
                  <td className="p-2">{t.product?.productName}</td>
                  <td className="p-2"><span className={`px-2 py-0.5 rounded text-xs ${t.transactionType==="IN"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`}>{t.transactionType}</span></td>
                  <td className="p-2 text-right">{t.quantityMoved}</td>
                  <td className="p-2 text-right">{rwf(t.product?.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
