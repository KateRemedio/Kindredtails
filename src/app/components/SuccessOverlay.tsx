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
        @keyframes so-ping {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
      <div
        onClick={onDismiss}
        style={{
          position: "fixed", inset: 0, zIndex: 3000,
          background: "linear-gradient(160deg, rgba(217,70,239,0.93) 0%, rgba(249,115,22,0.93) 100%)",
          backdropFilter: "blur(14px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          animation: "so-in 0.45s ease forwards",
          opacity: fading ? 0 : 1,
          transition: fading ? "opacity 0.55s ease" : "none",
          cursor: "pointer",
        }}
      >
        <div style={{
          textAlign: "center", color: "white", padding: "32px 24px",
          animation: "so-rise 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
          maxWidth: 380,
        }}>
          {/* Floating blossom with ping ring */}
          <div style={{ position: "relative", display: "inline-block", marginBottom: 20 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              animation: "so-ping 1.8s ease-out infinite",
            }} />
            <div style={{ fontSize: 72, animation: "so-float 2.2s ease-in-out infinite", lineHeight: 1 }}>
              🌸
            </div>
          </div>

          {/* Pet name */}
          <div style={{
            fontFamily: "'Courier Prime','Source Code Pro',monospace",
            fontSize: 30, fontWeight: 700, marginBottom: 8, lineHeight: 1.2,
          }}>
            {pet.pet_name}
          </div>
          <div style={{ fontSize: 18, opacity: 0.92, marginBottom: 24 }}>
            is now part of the garden 🌸
          </div>

          {/* "You own this" badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 600,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 20, padding: "8px 18px",
            marginBottom: 20,
          }}>
            ❤️ You own this memorial
          </div>

          <div style={{ fontSize: 12, opacity: 0.55 }}>
            Tap anywhere to see it on the map
          </div>
        </div>
      </div>
    </>
  );
}
