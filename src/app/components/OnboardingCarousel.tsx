import { useState, useRef } from "react";
import { markVisited } from "../utils/localStorage";

const SLIDES = [
  {
    emoji: "🌍",
    title: "A Global Garden of Remembrance",
    body: "Kindred Tails is a living memorial map where pet owners around the world plant glowing lights to honor beloved companions.",
  },
  {
    emoji: "🌱",
    title: "Plant Your Memory",
    body: "Fill in your pet's name, story, and city. A glowing dot will appear on the map — visible to everyone, forever.",
  },
  {
    emoji: "🌸",
    title: "Leave Tributes",
    body: "Visit any memorial and leave flowers, treats, or toys. Every tribute is a small act of kindness across the globe.",
  },
  {
    emoji: "🛡️",
    title: "Privacy First",
    body: "Only your city is stored — never your exact location. Your pet's memorial is identified by a private token saved in your browser.",
  },
];

interface Props {
  onDismiss: () => void;
}

export function OnboardingCarousel({ onDismiss }: Props) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const dismiss = () => {
    markVisited();
    onDismiss();
  };

  const go = (dir: number) => {
    setIndex((i) => Math.max(0, Math.min(SLIDES.length - 1, i + dir)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          background: "white", borderRadius: 24,
          padding: "40px 32px 32px",
          maxWidth: 400, width: "100%",
          display: "flex", flexDirection: "column", alignItems: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Skip */}
        <button
          onClick={dismiss}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none",
            fontSize: 13, color: "#9CA3AF", cursor: "pointer",
          }}
        >
          Skip
        </button>

        {/* Emoji */}
        <div style={{ fontSize: 56, marginBottom: 20, lineHeight: 1 }}>{slide.emoji}</div>

        {/* Title */}
        <div style={{
          fontSize: 20, fontWeight: 800, color: "#111827",
          textAlign: "center", marginBottom: 12, lineHeight: 1.3,
        }}>
          {slide.title}
        </div>

        {/* Body */}
        <div style={{
          fontSize: 14, color: "#6B7280",
          textAlign: "center", lineHeight: 1.6, marginBottom: 32,
        }}>
          {slide.body}
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {SLIDES.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              style={{
                height: 6, borderRadius: 3,
                width: i === index ? 20 : 6,
                background: i === index
                  ? "linear-gradient(135deg,#06B6D4,#3B82F6)"
                  : "#E5E7EB",
                transition: "all 0.25s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        {isLast ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
            <button
              onClick={dismiss}
              style={{
                width: "100%", padding: "13px",
                borderRadius: 12, border: "none",
                background: "linear-gradient(135deg,#06B6D4,#3B82F6)",
                color: "white", fontSize: 15, fontWeight: 700,
                cursor: "pointer",
              }}
            >
              🌱 Plant a Memory
            </button>
            <button
              onClick={dismiss}
              style={{
                width: "100%", padding: "13px",
                borderRadius: 12, border: "1px solid #E5E7EB",
                background: "white", color: "#374151",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}
            >
              Explore the Garden
            </button>
          </div>
        ) : (
          <button
            onClick={() => go(1)}
            style={{
              width: "100%", padding: "13px",
              borderRadius: 12, border: "none",
              background: "linear-gradient(135deg,#06B6D4,#3B82F6)",
              color: "white", fontSize: 15, fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
