import { useState } from "react";
import { MarqueeFeed } from "./MarqueeFeed";
import { PetForm } from "./PetForm";
import type { Pet } from "../utils/api";

interface Props {
  onPetCreated: (pet: Pet) => void;
  successPet: Pet | null;
}

export function Sidebar({ onPetCreated, successPet }: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = (pet: Pet) => {
    onPetCreated(pet);
    setShowForm(false);
  };

  return (
    <div
      className="flex-shrink-0 flex flex-col bg-white border-r border-gray-100 overflow-y-auto"
      style={{
        width: 380,
        height: "100%",
        boxShadow: "2px 0 20px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-5">
          <span
            style={{
              fontSize: 22, fontWeight: 800, color: "#111827",
              fontFamily: "'Inter', 'Roboto', sans-serif", letterSpacing: "-0.02em",
            }}
          >
            Kindred Tails
          </span>
          <div
            style={{
              width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
              boxShadow: "0 0 8px rgba(6,182,212,0.6)",
              animation: "logo-pulse 3s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes logo-pulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.15); }
            }
          `}</style>
        </div>

        {/* Live marquee */}
        <MarqueeFeed />
      </div>

      {/* Plant a Memory button */}
      <div className="px-6 pb-5">
        <button
          onClick={() => setShowForm((s) => !s)}
          style={{
            width: "100%",
            padding: "13px 20px",
            borderRadius: 14,
            background: showForm
              ? "#F3F4F6"
              : "linear-gradient(135deg, #06B6D4, #3B82F6)",
            color: showForm ? "#6B7280" : "white",
            fontSize: 15,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            letterSpacing: "0.01em",
            boxShadow: showForm ? "none" : "0 4px 16px rgba(6,182,212,0.35)",
          }}
        >
          {showForm ? "✕  Close" : "🌱  Plant a Memory"}
        </button>
      </div>

      {/* Success notice */}
      {successPet && !showForm && (
        <div className="mx-6 mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="text-sm font-semibold text-emerald-700 mb-0.5">
            Memorial planted! 🌸
          </div>
          <div className="text-xs text-emerald-600">
            <span style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 600 }}>
              {successPet.pet_name}
            </span>{" "}
            now rests in {successPet.city}, {successPet.country}. Click the glowing dot on the map to visit.
          </div>
        </div>
      )}

      {/* Memorial form */}
      {showForm && (
        <div className="px-6">
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Create a beautiful memorial for your beloved companion. It will appear on the global map as a glowing light.
            </p>
            <PetForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Privacy badge */}
      <div className="px-6 py-5">
        <div
          className="rounded-xl p-3.5"
          style={{
            background: "linear-gradient(135deg, #F0FDFF, #EFF6FF)",
            border: "1px solid #E0F2FE",
          }}
        >
          <div className="flex items-start gap-2.5">
            <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
            <div>
              <div className="text-xs font-bold text-gray-700 mb-1">Privacy Guard</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Kindred Tails uses City-Level Fuzzy Geolocation. Your exact location is never stored.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
