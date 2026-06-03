import { useEffect, useState } from "react";
import api from "../services/api.js";
import { rwf, dateStr, toCSV, downloadCSV } from "../utils/formatters.js";
import { Download } from "lucide-react";

export default function Report() {
  const [period, setPeriod] = useState("daily");
  const [stock, setStock] = useState({ rows: [] });
  const [movement, setMovement] = useState({ rows: [] });

  const load = () => {
    api.get(`/report/available-stock?period=${period}`).then(r=>setStock(r.data));
    api.get(`/report/movement?period=${period}`).then(r=>setMovement(r.data));
  };
  useEffect(load, [period]);

  const exportStock = () => {
    const headers = [
      { label:"Product Code", value:"productCode" }, { label:"Product Name", value:"productName" },
      { label:"Category", value:"category" }, { label:"Quantity In Stock", value:"quantityInStock" },
      { label:"Unit Price (RWF)", value:"unitPrice" },
    ];
    downloadCSV(toCSV(stock.rows, headers), `available-stock-${period}.csv`);
  };
  const exportMovement = () => {
    const headers = [
      { label:"Product Code", value:"productCode" }, { label:"Product Name", value:"productName" },
      { label:"Stock In", value:"stockIn" }, { label:"Stock Out", value:"stockOut" }, { label:"Net", value:"net" },
    ];
    downloadCSV(toCSV(movement.rows, headers), `stock-movement-${period}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold mr-auto">Reports</h1>
        <div className="inline-flex border rounded-lg overflow-hidden">
          {["daily","weekly","monthly"].map(p => (
            <button key={p} onClick={()=>setPeriod(p)}
              className={`px-3 py-1.5 text-sm ${period===p?"bg-brand-600 text-white":"bg-white"}`}>{p}</button>
          ))}
        </div>
      </div>

      <Section title={`Available Stock Report (${period})`} onExport={exportStock}>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr><th className="p-2 text-left">Code</th><th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Category</th><th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Unit Price</th></tr>
          </thead>
          <tbody>
            {stock.rows?.length===0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500">No data</td></tr>}
            {stock.rows?.map(r=>(
              <tr key={r._id||r.productCode} className="border-t">
                <td className="p-2">{r.productCode}</td><td className="p-2">{r.productName}</td>
                <td className="p-2">{r.category}</td>
                <td className="p-2 text-right">{r.quantityInStock}</td>
                <td className="p-2 text-right">{rwf(r.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-slate-500 p-2">Generated: {dateStr(stock.generatedAt)}</div>
      </Section>

      <Section title={`Stock In / Stock Out Report (${period})`} onExport={exportMovement}>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr><th className="p-2 text-left">Code</th><th className="p-2 text-left">Name</th>
                <th className="p-2 text-right">Stock In</th><th className="p-2 text-right">Stock Out</th>
                <th className="p-2 text-right">Net</th></tr>
          </thead>
          <tbody>
            {movement.rows?.length===0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500">No movements in this period</td></tr>}
            {movement.rows?.map((r,i)=>(
              <tr key={i} className="border-t">
                <td className="p-2">{r.productCode}</td><td className="p-2">{r.productName}</td>
                <td className="p-2 text-right text-green-700">{r.stockIn}</td>
                <td className="p-2 text-right text-red-700">{r.stockOut}</td>
                <td className="p-2 text-right font-medium">{r.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

function Section({ title, onExport, children }) {
  return (
    <div className="bg-white border rounded-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">{title}</h2>
        <button onClick={onExport} className="text-sm px-3 py-1.5 border rounded-lg flex items-center gap-1 hover:bg-slate-50"><Download size={14}/> Export CSV</button>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
