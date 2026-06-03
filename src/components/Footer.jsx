export default function Footer() {
  return (
    <footer className="text-center text-xs text-slate-500 py-4 border-t bg-white">
      © {new Date().getFullYear()} StockHub Ltd · Built by <span className="font-semibold text-slate-700">Ishimwe Narada</span>
    </footer>
  );
}
