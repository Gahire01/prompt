export const rwf = (n) => `${Number(n || 0).toLocaleString()} RWF`;
export const dateStr = (d) => (d ? new Date(d).toLocaleDateString() : "");
export const toCSV = (rows, headers) => {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = headers.map((h) => esc(h.label)).join(",");
  const body = rows.map((r) => headers.map((h) => esc(typeof h.value === "function" ? h.value(r) : r[h.value])).join(",")).join("\n");
  return head + "\n" + body;
};
export const downloadCSV = (csv, filename) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};
