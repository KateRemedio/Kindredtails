import { useEffect, useState } from "react";
import type { Pet } from "../utils/api";
import svgPaths from "../../imports/🔣Icons/svg-zcp33176r3";

const PET_TYPE_COLORS: Record<string, string> = {
  dog: "#D4885A", cat: "#9ABCCC", bird: "#6AAA5A",
  bunny: "#E898B0", reptile: "#7AB87A", fish: "#E8A030", other: "#B898CC",
};
function getPetColor(type: string): string { return PET_TYPE_COLORS[type] || "#2A6B4A"; }
function buildPetIconHtml(type: string, size = 42): string {
  const fw = 'fill="rgba(255,255,255,0.92)"'; const fl = 'fill="rgba(255,255,255,0.70)"';
  const s  = 'fill="none" stroke="rgba(0,0,0,0.50)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const sm = 'fill="none" stroke="rgba(0,0,0,0.50)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"';
  const icons: Record<string, string> = {
    dog: `<g transform="translate(4.40,7.27)"><path d="${svgPaths.p32012100}" ${fw}/><path d="${svgPaths.p16127d00}" ${fl}/><path d="${svgPaths.p22fe2e80}" ${fl}/></g><g transform="translate(3.31,7.00)"><path d="${svgPaths.pac65c00}" ${s}/><path d="${svgPaths.p364500}" ${s}/><path d="${svgPaths.p338d8a00}" ${s}/><path d="${svgPaths.p35101500}" ${s}/><path d="${svgPaths.p2d547c00}" ${s}/><path d="${svgPaths.pa19eb80}" ${s}/></g>`,
    cat: `<g transform="translate(3.52,10.72)"><path d="${svgPaths.p30728340}" ${fw}/><path d="${svgPaths.pf444a00}" ${fw}/><path d="${svgPaths.p22c7c80}" ${fw}/></g><g transform="translate(2.27,9.79)"><path d="${svgPaths.pf863040}" ${s}/><path d="${svgPaths.p2f1cad00}" ${s}/><path d="${svgPaths.p1fb12d00}" ${s}/><path d="${svgPaths.p37c2adc0}" ${s}/><path d="${svgPaths.p38aa6380}" ${s}/><path d="${svgPaths.p2427ce00}" ${s}/></g>`,
    bird: `<g transform="translate(15.33,4.97)"><path d="${svgPaths.peb8000}" ${fw}/><path d="${svgPaths.p1a341200}" ${fl}/><path d="${svgPaths.p20526d00}" ${fw}/><path d="${svgPaths.p18d9bf00}" ${fl}/><path d="${svgPaths.p16e4c680}" ${fl}/><path d="${svgPaths.p1f8ce300}" ${fw}/></g><g transform="translate(7.67,3.97)"><path d="${svgPaths.pf24b700}" fill="none" stroke="rgba(0,0,0,0.50)" stroke-width="2" stroke-miterlimit="10"/><path d="${svgPaths.p774b140}" ${s}/><path d="${svgPaths.p1456dc00}" ${s}/><path d="${svgPaths.p2cb32740}" ${s}/><path d="M15.4638 26.0257V30.6923" ${s}/><path d="M30.3915 30.6923H33" ${s}/><path d="M1 30.8071H20.993" ${s}/><path d="${svgPaths.p1863a600}" ${s}/><path d="${svgPaths.p4f86400}" ${s}/><path d="M19.4638 28.0257V30.6923" ${s}/></g>`,
    bunny: `<g transform="translate(6.28,7.84)"><path d="${svgPaths.p32592400}" ${fw}/><path d="${svgPaths.p380f6f40}" ${fw}/><path d="${svgPaths.p35081f00}" fill="rgba(255,200,220,0.85)"/><path d="${svgPaths.p2e679200}" fill="rgba(255,200,220,0.85)"/><path d="${svgPaths.pa5f0f00}" ${fw}/></g><g transform="translate(5.07,6.53)"><path d="${svgPaths.p22d59300}" ${s}/><path d="${svgPaths.p1d9adf00}" ${s}/><path d="${svgPaths.p1aa2fdc0}" ${s}/><path d="${svgPaths.p21044000}" ${s}/></g>`,
    fish: `<g transform="translate(11.27,11.87)"><path d="${svgPaths.p289aaf80}" fill="rgba(255,255,210,0.9)"/><path d="${svgPaths.pf8e6b00}" ${fw}/><path d="${svgPaths.p229dcd00}" ${fw}/><path d="${svgPaths.p33f88d80}" fill="rgba(255,255,210,0.9)"/><path d="${svgPaths.p2dfd200}" fill="rgba(255,220,160,0.9)"/><path d="${svgPaths.p34cfbc80}" ${fw}/></g><g transform="translate(7.67,10.46)"><path d="${svgPaths.p13031780}" ${s}/><path d="${svgPaths.p1ad19a80}" ${s}/><path d="${svgPaths.p68d3480}" ${s}/><path d="${svgPaths.p1dace880}" ${s}/><path d="${svgPaths.p26bfdd00}" ${s}/><path d="${svgPaths.p2bdab900}" ${s}/></g>`,
    reptile: `<g transform="translate(2.92,10.13)"><path d="${svgPaths.pa506c00}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.pa188980}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p3c72e400}" fill="rgba(170,210,170,0.9)"/><path d="${svgPaths.p1efa0d00}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p1395bf80}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p3ffb5e00}" fill="rgba(170,210,170,0.9)"/></g><g transform="translate(2.92,10.13)"><path d="${svgPaths.pd6ba80}" ${sm}/><path d="${svgPaths.p1c1f0d80}" ${sm}/><path d="${svgPaths.p3c930600}" ${sm}/><path d="${svgPaths.p1f630a40}" ${sm}/><path d="${svgPaths.p361eed80}" ${sm}/><path d="${svgPaths.pe18c580}" ${sm}/><path d="${svgPaths.p3f1a540}" ${sm}/><path d="${svgPaths.p164758c0}" ${sm}/><path d="${svgPaths.p3b426c2a}" ${sm}/><path d="${svgPaths.p1db67480}" ${sm}/><path d="${svgPaths.p357fd480}" ${sm}/><path d="${svgPaths.p13b80e80}" ${sm}/></g>`,
    other: `<g transform="translate(7.86,5.09)"><path d="${svgPaths.p1ab01e00}" ${fl}/><path d="${svgPaths.p3c9c7a00}" ${fl}/><path d="${svgPaths.p17c6aa00}" ${fl}/><path d="${svgPaths.p39822c00}" ${fl}/><path d="${svgPaths.p1a5a9200}" ${fl}/><path d="${svgPaths.p30386780}" ${fl}/><path d="${svgPaths.p18f71500}" ${fl}/><path d="${svgPaths.p22483970}" ${fl}/><path d="${svgPaths.p2a78bc30}" ${fl}/><path d="${svgPaths.p252f5600}" ${fl}/></g><g transform="translate(6.38,3.50)"><path d="${svgPaths.p636fff0}" ${s}/><path d="${svgPaths.p3583cb00}" ${s}/><path d="${svgPaths.pd2c5c10}" ${s}/><path d="${svgPaths.p15c98800}" ${s}/><path d="${svgPaths.p1c6ade00}" ${s}/><path d="${svgPaths.p196a9b00}" ${s}/><path d="${svgPaths.p25b76000}" ${s}/><path d="${svgPaths.p209700f0}" ${s}/><path d="${svgPaths.p87b9000}" ${s}/><path d="${svgPaths.p284cf500}" ${s}/></g>`,
  };
  const body = icons[type] || icons.other;
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${body}</svg>`;
}

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
          {/* Pet type icon */}
          <div
            style={{ width: 64, height: 64, borderRadius: 16, background: getPetColor(pet.pet_type), display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: 16, marginLeft: "auto", marginRight: "auto", animation: "so-float 2.2s ease-in-out infinite", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
            dangerouslySetInnerHTML={{ __html: buildPetIconHtml(pet.pet_type, 42) }}
          />

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
