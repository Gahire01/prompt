import { X } from "lucide-react";
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="px-5 py-3 border-t bg-slate-50 rounded-b-xl">{footer}</div>}
      </div>
    </div>
  );
}
