import { useEffect, useState } from "react";

export interface Toast {
  id: string;
  message: string;
}

interface Props {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 3600);
    const removeTimer = setTimeout(() => onRemove(toast.id), 4200);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [toast.id, onRemove]);

  return (
    <>
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        onClick={() => onRemove(toast.id)}
        style={{
          padding: "11px 16px",
          borderRadius: 12,
          background: "rgba(17,24,39,0.92)",
          backdropFilter: "blur(8px)",
          color: "white",
          fontSize: 13,
          fontWeight: 500,
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          cursor: "pointer",
          maxWidth: 320,
          lineHeight: 1.4,
          animation: "toast-in 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
          userSelect: "none",
        }}
      >
        {toast.message}
      </div>
    </>
  );
}

export function ToastContainer({ toasts, onRemove }: Props) {
  if (!toasts.length) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <ToastItem toast={t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}
