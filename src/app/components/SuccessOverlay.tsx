import { useEffect, useState } from "react";
import type { Pet } from "../utils/api";

interface Props {
  pet: Pet;
  onDismiss: () => void;
}

export function SuccessOverlay({ pet, onDismiss }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3600);
    const dismissTimer = setTimeout(onDismiss, 4200);
    return () => { clearTimeout(fadeTimer); clearTimeout(dismissTimer); };
  }, [onDismiss]);

  return (
    <>
      <style>{`
        @keyframes so-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes so-rise {
          from { opacity: 0; transform: translateY(28px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes so-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
      <div
        onClick={onDismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 3000,
          background: "#F5F0E8",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          animation: "so-in 0.45s ease forwards",
          opacity: fading ? 0 : 1,
          transition: fading ? "opacity 0.55s ease" : "none",
          cursor: "pointer",
        }}
      >
        <div style={{
          textAlign: "center", padding: "32px 24px",
          animation: "so-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          maxWidth: 380,
        }}>
          {/* Floating blossom */}
          <div style={{ fontSize: 72, marginBottom: 16, animation: "so-float 2.2s ease-in-out infinite", lineHeight: 1 }}>
            🌸
          </div>

          {/* Pet name */}
          <div style={{
            fontFamily: "'Courier Prime','Source Code Pro',monospace",
            fontSize: 30, fontWeight: 700, marginBottom: 8, lineHeight: 1.2,
            color: "#2D2A26",
          }}>
            {pet.pet_name}
          </div>

          {/* Tagline */}
          <div style={{
            fontFamily: "'Inter','Roboto',sans-serif",
            fontSize: 18, color: "#2D2A26", marginBottom: 24, opacity: 0.92,
          }}>
            is now part of the garden 🌸
          </div>

          {/* "You own this" badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600,
            background: "#2A6B4A",
            border: "0.5px solid rgba(255,255,255,0.3)",
            color: "#FAF8F5",
            borderRadius: 20, padding: "8px 18px",
            marginBottom: 20,
          }}>
            ❤️ You own this memorial
          </div>

          <div style={{
            fontFamily: "'Inter','Roboto',sans-serif",
            fontSize: 12, color: "#9C8A7A",
          }}>
            Tap anywhere to see it on the map
          </div>
        </div>
      </div>
    </>
  );
}
