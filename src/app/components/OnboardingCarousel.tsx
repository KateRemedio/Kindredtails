import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { markVisited } from "../utils/localStorage";

const SLIDE_EMOJIS = ["🌍", "🌱", "🌸", "🛡️"];

interface Props {
  onDismiss: () => void;
}

export function OnboardingCarousel({ onDismiss }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    { emoji: SLIDE_EMOJIS[0], title: t("onboarding_title_1"), body: t("onboarding_body_1") },
    { emoji: SLIDE_EMOJIS[1], title: t("onboarding_title_2"), body: t("onboarding_body_2") },
    { emoji: SLIDE_EMOJIS[2], title: t("onboarding_title_3"), body: t("onboarding_body_3") },
    { emoji: SLIDE_EMOJIS[3], title: t("onboarding_title_4"), body: t("onboarding_body_4") },
  ];

  const dismiss = () => {
    markVisited();
    onDismiss();
  };

  const go = (dir: number) => {
    setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + dir)));
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

  const slide = slides[index];
  const isLast = index === slides.length - 1;

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
          {t("skip")}
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
          {slides.map((_, i) => (
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
              🌱 {t("plantMemory")}
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
              {t("exploreGarden")}
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
            {t("continue")}
          </button>
        )}
      </div>
    </div>
  );
}
