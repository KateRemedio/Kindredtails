import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PetForm } from "./PetForm";
import type { Pet } from "../utils/api";

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onPetCreated: (pet: Pet) => void;
  successPet: Pet | null;
}

export function Sidebar({ isOpen, isMobile, onToggle, onPetCreated, successPet }: Props) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = (pet: Pet) => {
    onPetCreated(pet);
    setShowForm(false);
  };

  // --- Desktop styles ---
  const desktopWrapper: React.CSSProperties = {
    width: isOpen ? 380 : 0,
    flexShrink: 0,
    overflow: "hidden",
    transition: "width 0.32s cubic-bezier(0.4,0,0.2,1)",
    position: "relative",
  };

  const desktopInner: React.CSSProperties = {
    width: 380,
    height: "100%",
    transform: isOpen ? "translateX(0)" : "translateX(-380px)",
    transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
    background: "white",
    borderRight: "1px solid #F3F4F6",
    boxShadow: "2px 0 20px rgba(0,0,0,0.04)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  };

  // --- Mobile (bottom sheet) styles ---
  const mobileWrapper: React.CSSProperties = {
    position: "fixed",
    bottom: 0, left: 0, right: 0,
    maxHeight: "92vh",
    zIndex: 1000,
    transform: isOpen ? "translateY(0)" : "translateY(100%)",
    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
    background: "white",
    borderRadius: "20px 20px 0 0",
    boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  };

  const wrapperStyle = isMobile ? mobileWrapper : desktopWrapper;
  const innerStyle = isMobile ? {} : desktopInner;
  const contentStyle = isMobile ? { flex: 1, display: "flex", flexDirection: "column" as const } : {};

  const content = (
    <div style={contentStyle}>
      {/* Mobile drag handle */}
      {isMobile && (
        <div style={{ padding: "12px 0 4px", display: "flex", justifyContent: "center" }}>
          <div
            onClick={onToggle}
            style={{
              width: 40, height: 4, borderRadius: 2, background: "#E5E7EB", cursor: "pointer",
            }}
          />
        </div>
      )}

      {/* Header */}
      <div style={{ padding: isMobile ? "12px 20px 8px" : "24px 24px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontSize: 20, fontWeight: 800, color: "#111827",
              fontFamily: "'Inter','Roboto',sans-serif", letterSpacing: "-0.02em",
            }}>
              Kindred Tails
            </span>
            <div style={{
              width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg,#06B6D4,#3B82F6)",
              boxShadow: "0 0 8px rgba(6,182,212,0.6)",
            }} />
          </div>
          {/* Desktop close chevron */}
          {!isMobile && (
            <button
              onClick={onToggle}
              title="Collapse sidebar"
              style={{
                background: "#F3F4F6", border: "none", cursor: "pointer",
                borderRadius: 8, padding: "4px 8px", fontSize: 13,
                color: "#6B7280", fontWeight: 700, minWidth: 44, minHeight: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >◀</button>
          )}
        </div>

        {/* Plant button */}
        <button
          onClick={() => setShowForm((s) => !s)}
          style={{
            width: "100%", padding: "13px 20px",
            borderRadius: 14, border: "none",
            background: showForm ? "#F3F4F6" : "linear-gradient(135deg,#06B6D4,#3B82F6)",
            color: showForm ? "#6B7280" : "white",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s", letterSpacing: "0.01em",
            boxShadow: showForm ? "none" : "0 4px 16px rgba(6,182,212,0.3)",
            minHeight: 44,
          }}
        >
          {showForm ? `✕  ${t("close")}` : `🌱  ${t("plantMemory")}`}
        </button>
      </div>

      {/* Success notice */}
      {successPet && !showForm && (
        <div style={{
          margin: "0 20px 12px",
          padding: 14, borderRadius: 14,
          background: "#ECFDF5", border: "1px solid #A7F3D0",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#065F46", marginBottom: 2 }}>
            Memorial planted! 🌸
          </div>
          <div style={{ fontSize: 12, color: "#047857", lineHeight: 1.4 }}>
            <span style={{ fontFamily: "'Courier Prime',monospace", fontWeight: 600 }}>{successPet.pet_name}</span>
            {" "}now rests in {successPet.city}, {successPet.country}. Find the glowing dot on the map.
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ padding: "0 20px" }}>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 14, lineHeight: 1.5 }}>
            {t("mapHint")}
          </p>
          <PetForm onSuccess={handleSuccess} />
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* Privacy badge */}
      <div style={{ padding: "12px 20px 20px" }}>
        <div style={{
          borderRadius: 14, padding: "12px 14px",
          background: "linear-gradient(135deg,#F0FDFF,#EFF6FF)",
          border: "1px solid #E0F2FE",
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 17, flexShrink: 0 }}>🛡️</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", marginBottom: 2 }}>{t("privacyGuard")}</div>
            <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4 }}>
              {t("privacyDesc")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile backdrop */}
        {isOpen && (
          <div
            onClick={onToggle}
            style={{
              position: "fixed", inset: 0, zIndex: 699,
              background: "rgba(0,0,0,0.3)",
            }}
          />
        )}
        <div style={wrapperStyle}>{content}</div>
      </>
    );
  }

  // Desktop: wrapper + inner for smooth width+translate combo
  return (
    <div style={wrapperStyle}>
      <div style={innerStyle}>{content}</div>
    </div>
  );
}
