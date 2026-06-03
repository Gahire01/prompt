import { useEffect } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
export default function AlertBanner({ type = "success", message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), 5000);
    return () => clearTimeout(t);
  }, [message, onClose]);
  if (!message) return null;
  const color = type === "error" ? "bg-red-50 text-red-700 border-red-200"
                                 : "bg-green-50 text-green-700 border-green-200";
  const Icon = type === "error" ? AlertTriangle : CheckCircle2;
  return (
    <div className={`flex items-center gap-2 border rounded-lg px-4 py-2 my-2 animate-fadeIn ${color}`}>
      <Icon size={18} /><span className="flex-1">{message}</span>
      <button onClick={onClose}><X size={16} /></button>
    </div>
  );
}
