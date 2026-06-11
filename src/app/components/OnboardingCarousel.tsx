import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { markVisited } from "../utils/localStorage";
import svgPaths from "../../imports/🔣Icons/svg-zcp33176r3";

// Onboarding icon SVGs using actual Figma Icon/Onboarding/* path data
function buildOnboardingIconHtml(type: string, size = 48): string {
  const s = 'fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"';
  const icons: Record<string, string> = {
    plant: `
      <g transform="translate(12.89,11.09)">
        <path d="${svgPaths.p16a03600}" fill="#B1CC33"/><path d="${svgPaths.p1153900}" fill="#5C9E31"/>
        <path d="${svgPaths.paf50900}" fill="#B1CC33"/><path d="${svgPaths.p52d3280}" fill="#5C9E31"/>
      </g>
      <g transform="translate(11.89,10.09)">
        <path d="${svgPaths.p3757ee80}" ${s}/><path d="${svgPaths.p3e7d5e80}" ${s}/>
        <path d="${svgPaths.p269a1180}" ${s}/><path d="${svgPaths.p57c6f80}" ${s}/>
        <path d="${svgPaths.p269e5a00}" ${s}/>
      </g>`,
    globe: `
      <g transform="translate(5.33,5.33)">
        <path d="${svgPaths.p211f6400}" fill="#92D3F5"/><path d="${svgPaths.p3c958a00}" fill="#C5D76F"/>
      </g>
      <g transform="translate(4.33,4.33)">
        <path d="${svgPaths.p1498e100}" ${s}/><path d="${svgPaths.p8a94180}" ${s}/>
      </g>`,
    dove: `
      <g transform="translate(9.25,5.30)">
        <path d="${svgPaths.p1cf0e980}" fill="#D0CFCE"/><path d="${svgPaths.p1255cd00}" fill="white"/>
      </g>
      <g transform="translate(8.67,4.56)">
        <path d="${svgPaths.p1bdd3f80}" ${s}/><path d="${svgPaths.p2a2ed48}" ${s}/>
      </g>`,
    home: `
      <g transform="translate(7.64,6.12)">
        <path d="${svgPaths.pa248d00}" fill="white"/><path d="${svgPaths.p343b2600}" fill="#92D3F5"/>
      </g>
      <g transform="translate(16.13,20.77)">
        <path d="${svgPaths.p4e1c280}" fill="#FCF392"/><path d="${svgPaths.pe659300}" fill="#FCF392"/><path d="${svgPaths.p1e9d4780}" fill="#FCF392"/>
      </g>
      <g transform="translate(4.15,5.16)">
        <path d="M35.8924 35.8109V8.25437" ${s}/>
        <path d="${svgPaths.p2de2ef00}" ${s}/>
        <path d="M3.49124 35.8109V8.25437" ${s}/>
        <path d="${svgPaths.p2e8d2b00}" ${s}/><path d="${svgPaths.pa599300}" ${s}/>
        <path d="${svgPaths.p32cce600}" ${s}/><path d="${svgPaths.p230fa2c0}" ${s}/>
        <path d="${svgPaths.pbb4700}" ${s}/><path d="${svgPaths.p147d5f80}" ${s}/>
        <path d="${svgPaths.pd751ac0}" ${s}/><path d="${svgPaths.p15b08b00}" ${s}/>
        <path d="${svgPaths.p31a83280}" ${s}/><path d="${svgPaths.pd89a340}" ${s}/>
        <path d="${svgPaths.p201f6c00}" ${s}/><path d="${svgPaths.p6070180}" ${s}/>
        <path d="${svgPaths.p28462780}" ${s}/>
      </g>`,
  };
  const body = icons[type] || "";
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${body}</svg>`;
}

const SLIDE_ICON_TYPES = ["plant", "globe", "dove", "home"] as const;

interface Props {
  onDismiss: () => void;
}

export function OnboardingCarousel({ onDismiss }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    { icon: SLIDE_ICON_TYPES[0], title: t("onboarding_title_1"), body: t("onboarding_body_1") },
    { icon: SLIDE_ICON_TYPES[1], title: t("onboarding_title_2"), body: t("onboarding_body_2") },
    { icon: SLIDE_ICON_TYPES[2], title: t("onboarding_title_3"), body: t("onboarding_body_3") },
    { icon: SLIDE_ICON_TYPES[3], title: t("onboarding_title_4"), body: t("onboarding_body_4") },
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

        {/* Slide icon */}
        <div
          style={{ width: 80, height: 80, borderRadius: 16, background: "#F5F0E8", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: buildOnboardingIconHtml(slide.icon, 54) }}
        />

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
                  ? "#2A6B4A"
                  : "#E8DDD0",
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
                background: "#2A6B4A",
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
              background: "#2A6B4A",
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
