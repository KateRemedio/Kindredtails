import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  AnimatedImage,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Sequence,
} from "remotion";

const BRAND_GREEN = "#2A6B4A";
const WARM_CREAM = "#FAF8F5";
const WARM_CREAM_2 = "#F5F0E8";
const TEXT_PRIMARY = "#2D2A26";
const TEXT_SECONDARY = "#5A4A3A";
const TEXT_HINT = "#9C8A7A";
const FONT_INTER = "'Inter', sans-serif";
const FONT_COURIER = "'Courier Prime', monospace";
const FONT_DISPLAY = "'DM Serif Display', serif";

const PET_COLORS: Record<string, string> = {
  dog: "#D4885A", cat: "#9ABCCC", bird: "#6AAA5A",
  bunny: "#E898B0", reptile: "#7AB87A", fish: "#E8A030", other: "#B898CC",
};

const ICON_DOG_COLOR = staticFile("icons/dog-color.png");
const ICON_DOG_LINE = staticFile("icons/dog-line.png");
const ICON_CAT_COLOR = staticFile("icons/cat-color.png");
const ICON_CAT_LINE = staticFile("icons/cat-line.png");
const ICON_BIRD_COLOR = staticFile("icons/bird-color.png");
const ICON_BIRD_LINE = staticFile("icons/bird-line.png");
const ICON_BUNNY_COLOR = staticFile("icons/bunny-color.png");
const ICON_BUNNY_LINE = staticFile("icons/bunny-line.png");
const ICON_FISH_COLOR = staticFile("icons/fish-color.png");
const ICON_FISH_LINE = staticFile("icons/fish-line.png");
const ICON_REPTILE_COLOR = staticFile("icons/reptile-color.png");
const ICON_REPTILE_LINE = staticFile("icons/reptile-line.png");
const ICON_OTHER_COLOR = staticFile("icons/other-color.png");
const ICON_OTHER_LINE = staticFile("icons/other-line.png");

const ICON_PLANT_COLOR = staticFile("icons/plant-color.png");
const ICON_PLANT_LINE = staticFile("icons/plant-line.png");
const ICON_GLOBE_COLOR = staticFile("icons/globe-color.png");
const ICON_GLOBE_LINE = staticFile("icons/globe-line.png");
const ICON_DOVE_COLOR = staticFile("icons/dove-color.png");
const ICON_DOVE_LINE = staticFile("icons/dove-line.png");
const ICON_FLOWER_COLOR = staticFile("icons/flower-color.png");
const ICON_FLOWER_LINE = staticFile("icons/flower-line.png");
const ICON_TREAT_COLOR = staticFile("icons/treat-color.png");
const ICON_TREAT_LINE = staticFile("icons/treat-line.png");
const ICON_TOY_COLOR = staticFile("icons/toy-color.png");
const ICON_TOY_LINE = staticFile("icons/toy-line.png");

const GlobalStyle: React.FC = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&family=Courier+Prime:wght@400;700&display=swap');`}</style>
);

const PetIcon: React.FC<{
  colorSrc: string; lineSrc: string; size?: number; bg?: string;
  rounded?: number; padding?: number; objectPosition?: string;
}> = ({ colorSrc, lineSrc, size = 80, bg, rounded = 20, padding = 10, objectPosition = "center" }) => (
  <div style={{ width: size, height: size, background: bg, borderRadius: rounded, flexShrink: 0, position: "relative", overflow: "hidden" }}>
    <Img src={colorSrc} style={{ position: "absolute", top: padding, left: padding, width: size - padding * 2, height: size - padding * 2, objectFit: "contain", objectPosition, filter: "brightness(0) invert(1)" }} />
    <Img src={lineSrc} style={{ position: "absolute", top: padding, left: padding, width: size - padding * 2, height: size - padding * 2, objectFit: "contain", objectPosition }} />
  </div>
);

const FigmaIcon: React.FC<{
  colorSrc: string; lineSrc: string; size?: number; bg?: string; rounded?: number; padding?: number;
}> = ({ colorSrc, lineSrc, size = 80, bg = "#F5F0E8", rounded = 16, padding = 12 }) => (
  <div style={{ width: size, height: size, background: bg, borderRadius: rounded, flexShrink: 0, position: "relative" }}>
    <Img src={colorSrc} style={{ position: "absolute", top: padding, left: padding, width: size - padding * 2, height: size - padding * 2, objectFit: "contain" }} />
    <Img src={lineSrc} style={{ position: "absolute", top: padding, left: padding, width: size - padding * 2, height: size - padding * 2, objectFit: "contain" }} />
  </div>
);

function fadeIn(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

function slideUp(frame: number, start: number, fps: number) {
  const progress = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 120 } });
  return interpolate(progress, [0, 1], [30, 0]);
}

const TextBlock: React.FC<{
  text: string; frame: number; startFrame: number; endFrame: number; fps: number;
  size?: number; color?: string; font?: string; weight?: number; italic?: boolean;
}> = ({ text, frame, startFrame, endFrame, fps, size = 48, color = TEXT_PRIMARY, font = FONT_INTER, weight = 700, italic = false }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 8, endFrame - 8, endFrame], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = slideUp(frame, startFrame, fps);
  return <div style={{ opacity, transform: `translateY(${y}px)`, fontFamily: font, fontSize: size, fontWeight: weight, fontStyle: italic ? "italic" : "normal", color, textAlign: "left", lineHeight: 1.6 }}>{text}</div>;
};

const Caption: React.FC<{
  text: string; frame: number; startFrame: number; endFrame: number; fps: number;
  size?: number; color?: string; font?: string; weight?: number; italic?: boolean;
}> = ({ text, frame, startFrame, endFrame, fps, size = 52, color = TEXT_PRIMARY, font = FONT_INTER, weight = 700, italic = false }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 8, endFrame - 8, endFrame], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = slideUp(frame, startFrame, fps);
  return <div style={{ opacity, transform: `translateY(${y}px)`, fontFamily: font, fontSize: size, fontWeight: weight, fontStyle: italic ? "italic" : "normal", color, textAlign: "center", lineHeight: 1.3, maxWidth: 1400, margin: "0 auto" }}>{text}</div>;
};

// ── Phone Frame — NO black border, clean shadow + rounded corners only ────────
const PhoneFrame: React.FC<{ children: React.ReactNode; frame: number; startFrame: number; fps: number }> = ({ children, frame, startFrame, fps }) => {
  const progress = spring({ frame: frame - startFrame, fps, config: { damping: 20, stiffness: 100 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scaleVal = interpolate(progress, [0, 1], [0.92, 1]);
  return (
    <div style={{ opacity, transform: `scale(${scaleVal})`, flexShrink: 0 }}>
      <div style={{
        borderRadius: 28,
        overflow: "hidden",
        width: 420,
        boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)",
      }}>
        {children}
      </div>
    </div>
  );
};

const SideBySide: React.FC<{ left: React.ReactNode; right: React.ReactNode; bg?: string; reverse?: boolean }> = ({ left, right, bg = WARM_CREAM, reverse = false }) => (
  <AbsoluteFill style={{ background: bg, display: "flex", flexDirection: reverse ? "row-reverse" : "row", alignItems: "center", justifyContent: "center", gap: 80, padding: "0 100px" }}>
    {left}
    {right}
  </AbsoluteFill>
);

const TextColumn: React.FC<{ children: React.ReactNode; width?: number }> = ({ children, width = 620 }) => (
  <div style={{ width, display: "flex", flexDirection: "column", gap: 20 }}>{children}</div>
);

// ── Toast ─────────────────────────────────────────────────────────────────────
const Toast: React.FC<{ frame: number; startFrame: number; text: string; icon?: string }> = ({ frame, startFrame, text, icon }) => {
  const localF = frame - startFrame;
  if (localF < 0) return null;
  const y = interpolate(localF, [0, 14, 60, 75], [60, 0, 0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(localF, [0, 10, 60, 75], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", bottom: 48, left: "50%",
      transform: `translateX(-50%) translateY(${y}px)`,
      opacity, zIndex: 100,
      background: "#2D2A26", color: "white",
      borderRadius: 50, padding: "14px 28px",
      fontFamily: FONT_INTER, fontSize: 20, fontWeight: 600,
      whiteSpace: "nowrap",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
      {text}
    </div>
  );
};

// ── GlowingPin ────────────────────────────────────────────────────────────────
const GlowingPin: React.FC<{
  frame: number; startFrame: number; endFrame: number; x: number; y: number; color: string;
}> = ({ frame, startFrame, endFrame, x, y, color }) => {
  const localF = frame - startFrame;
  if (localF < 0) return null;
  if (frame >= endFrame) return null;
  const appear = interpolate(localF, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [endFrame - 12, endFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = Math.sin(localF * 0.12) * 0.5 + 0.5;
  const glowSize = interpolate(pulse, [0, 1], [10, 24]);
  const pinScale = interpolate(pulse, [0, 1], [1, 1.1]);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: appear * fadeOut, zIndex: 90, transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 32 + glowSize, height: 32 + glowSize, borderRadius: 10, background: `${color}25`, boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${color}40` }} />
      <div style={{ width: 32, height: 32, borderRadius: 8, background: color, border: "2.5px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.25)", transform: `scale(${pinScale})`, position: "relative" }} />
    </div>
  );
};

// ── FallingTribute ────────────────────────────────────────────────────────────
const FallingTribute: React.FC<{
  frame: number; startFrame: number;
  colorSrc: string; lineSrc: string; bgColor: string;
  x: number; delay?: number;
}> = ({ frame, startFrame, colorSrc, lineSrc, bgColor, x, delay = 0 }) => {
  const localF = frame - startFrame - delay;
  if (localF < 0) return null;
  const y = interpolate(localF, [0, 90], [-80, 800], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(localF, [0, 8, 75, 90], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const swing = Math.sin(localF * 0.14) * 10;
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity, transform: `translateX(-50%) rotate(${swing}deg)`, zIndex: 95, pointerEvents: "none", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>
      <FigmaIcon colorSrc={colorSrc} lineSrc={lineSrc} size={56} bg={bgColor} rounded={14} padding={8} />
    </div>
  );
};

// ── MemorialCardOverlay ───────────────────────────────────────────────────────
const MemorialCardOverlay: React.FC<{ frame: number; startFrame: number; endFrame: number }> = ({ frame, startFrame, endFrame }) => {
  const localF = frame - startFrame;
  if (localF < 0) return null;
  if (frame >= endFrame) return null;
  const progress = spring({ frame: localF, fps: 30, config: { damping: 22, stiffness: 110 } });
  const appear = interpolate(progress, [0, 1], [0, 1]);
  const slideY = interpolate(progress, [0, 1], [30, 0]);
  const rotate = interpolate(progress, [0, 1], [3, -1]);
  const fadeOut = interpolate(frame, [endFrame - 14, endFrame], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", right: -160, top: "50%",
      transform: `translateY(calc(-50% + ${slideY}px)) rotate(${rotate}deg)`,
      opacity: appear * fadeOut, zIndex: 95,
      background: "white", borderRadius: 24, padding: 24, width: 300,
      boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)",
    }}>
      <div style={{ fontFamily: FONT_COURIER, fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, textAlign: "center", marginBottom: 6 }}>Tanya</div>
      <div style={{ fontFamily: FONT_INTER, fontSize: 12, color: TEXT_HINT, textAlign: "center", marginBottom: 14 }}>Dog · German Shepherd · Cebu City, PH</div>
      <div style={{ fontFamily: FONT_COURIER, fontSize: 12, color: "#374151", lineHeight: 1.7, marginBottom: 14, background: "#F9FAFB", borderRadius: 10, padding: 12 }}>
        "Tanya was our little princess. She spent her days in the coolest spot in mom's garden..."
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[
          { label: "Flowers", count: 3, colorSrc: ICON_FLOWER_COLOR, lineSrc: ICON_FLOWER_LINE, bg: "#FDF0F4" },
          { label: "Treats", count: 5, colorSrc: ICON_TREAT_COLOR, lineSrc: ICON_TREAT_LINE, bg: "#F5F0E8" },
          { label: "Toys", count: 2, colorSrc: ICON_TOY_COLOR, lineSrc: ICON_TOY_LINE, bg: "#F0F7F4" },
        ].map((t) => (
          <div key={t.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <FigmaIcon colorSrc={t.colorSrc} lineSrc={t.lineSrc} size={36} bg={t.bg} rounded={10} padding={5} />
            <div style={{ fontFamily: FONT_INTER, fontSize: 10, color: TEXT_HINT }}>{t.label}</div>
            <div style={{ fontFamily: FONT_INTER, fontSize: 16, fontWeight: 800, color: TEXT_PRIMARY }}>{t.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── SCENE 1 ───────────────────────────────────────────────────────────────────
const Scene1: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const petIcons = [
    { colorSrc: ICON_DOG_COLOR, lineSrc: ICON_DOG_LINE, type: "dog", objectPosition: "center" },
    { colorSrc: ICON_CAT_COLOR, lineSrc: ICON_CAT_LINE, type: "cat", objectPosition: "center" },
    { colorSrc: ICON_BIRD_COLOR, lineSrc: ICON_BIRD_LINE, type: "bird", objectPosition: "65% center" },
    { colorSrc: ICON_BUNNY_COLOR, lineSrc: ICON_BUNNY_LINE, type: "bunny", objectPosition: "center" },
    { colorSrc: ICON_REPTILE_COLOR, lineSrc: ICON_REPTILE_LINE, type: "reptile", objectPosition: "center" },
    { colorSrc: ICON_FISH_COLOR, lineSrc: ICON_FISH_LINE, type: "fish", objectPosition: "center" },
    { colorSrc: ICON_OTHER_COLOR, lineSrc: ICON_OTHER_LINE, type: "other", objectPosition: "center" },
  ];

  return (
    <AbsoluteFill style={{ background: WARM_CREAM, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.80 }}>
        <Img src={staticFile("screenshots/map-world-desktop.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,248,245,0.5) 0%, rgba(250,248,245,0.97) 100%)" }} />

      {/* Pins — spread across upper map area, fade out before Scene 2 */}
      <GlowingPin frame={frame} startFrame={90} endFrame={180} x={620} y={280} color="#D4885A" />
      <GlowingPin frame={frame} startFrame={105} endFrame={180} x={980} y={175} color="#9ABCCC" />
      <GlowingPin frame={frame} startFrame={118} endFrame={180} x={1380} y={300} color="#E898B0" />
      <GlowingPin frame={frame} startFrame={130} endFrame={180} x={1200} y={180} color="#6AAA5A" />
      <GlowingPin frame={frame} startFrame={142} endFrame={180} x={780} y={280} color="#E8A030" />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 52, padding: "0 120px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <Caption text="Kindred Tails" frame={frame} startFrame={5} endFrame={215} fps={fps} size={96} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
          <Caption text="Every pet deserves to be remembered" frame={frame} startFrame={15} endFrame={215} fps={fps} size={52} color={TEXT_PRIMARY} font={FONT_DISPLAY} italic />
          <Caption text="Share their story. Join a global community keeping beautiful memories alive." frame={frame} startFrame={28} endFrame={215} fps={fps} size={28} color={TEXT_SECONDARY} weight={400} />
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {petIcons.map((icon, i) => {
            const delay = 50 + i * 10;
            const iconOpacity = interpolate(frame, [delay, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const iconY = interpolate(frame, [delay, delay + 14], [18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const iconScale = interpolate(frame, [delay, delay + 14], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={icon.type} style={{ opacity: iconOpacity, transform: `translateY(${iconY}px) scale(${iconScale})` }}>
                <PetIcon colorSrc={icon.colorSrc} lineSrc={icon.lineSrc} size={82} bg={PET_COLORS[icon.type]} rounded={20} padding={10} objectPosition={icon.objectPosition} />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 2 ───────────────────────────────────────────────────────────────────
const Scene2: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => (
  <SideBySide bg={WARM_CREAM}
    left={
      <TextColumn>
        <div style={{ opacity: fadeIn(frame, 5, 15) }}>
          <FigmaIcon colorSrc={ICON_DOVE_COLOR} lineSrc={ICON_DOVE_LINE} size={96} bg="#F0F7F4" rounded={20} padding={14} />
        </div>
        <div style={{ height: 4 }} />
        <TextBlock text="Your exact location is never stored" frame={frame} startFrame={10} endFrame={225} fps={fps} size={48} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
        <div style={{ height: 2 }} />
        <TextBlock text="We protect your privacy. Only your chosen city is saved to light up the map. Your home, street, and exact coordinates are never shared or stored." frame={frame} startFrame={22} endFrame={225} fps={fps} size={24} color={TEXT_SECONDARY} weight={400} />
        <div style={{ opacity: fadeIn(frame, 38, 15), display: "flex", alignItems: "center", gap: 18, background: "#F0F7F4", border: "1.5px solid #E8DDD0", borderRadius: 16, padding: "18px 28px", alignSelf: "flex-start", marginTop: 8 }}>
          <span style={{ fontSize: 36 }}>🛡️</span>
          <div>
            <div style={{ fontFamily: FONT_INTER, fontSize: 24, fontWeight: 700, color: BRAND_GREEN }}>Privacy Guard</div>
            <div style={{ fontFamily: FONT_INTER, fontSize: 18, color: TEXT_SECONDARY }}>City-Level Fuzzy Geolocation</div>
          </div>
        </div>
      </TextColumn>
    }
    right={
      <PhoneFrame frame={frame} startFrame={5} fps={fps}>
        <AnimatedImage src={staticFile("screenshots/map-mobile.gif")} width={420} fit="contain" style={{ display: "block", margin: 0 }} />
      </PhoneFrame>
    }
  />
);

// ── SCENE 3 ───────────────────────────────────────────────────────────────────
const Scene3: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => (
  <SideBySide bg={WARM_CREAM_2} reverse
    left={
      <TextColumn>
        <div style={{ opacity: fadeIn(frame, 5, 15) }}>
          <FigmaIcon colorSrc={ICON_PLANT_COLOR} lineSrc={ICON_PLANT_LINE} size={96} bg="#F0F7F4" rounded={20} padding={14} />
        </div>
        <div style={{ height: 4 }} />
        <TextBlock text="Plant a memory in moments" frame={frame} startFrame={10} endFrame={225} fps={fps} size={48} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
        <div style={{ height: 2 }} />
        <TextBlock text="Share their name, a cherished story, and a photo. Watch their memory light up the global map so a world of pet lovers can remember them with you." frame={frame} startFrame={22} endFrame={225} fps={fps} size={24} color={TEXT_SECONDARY} weight={400} />
        <TextBlock text="You're always in control. Edit or remove your memorial at any time." frame={frame} startFrame={36} endFrame={225} fps={fps} size={24} color={BRAND_GREEN} weight={600} />
      </TextColumn>
    }
    right={
      <div style={{ position: "relative" }}>
        <PhoneFrame frame={frame} startFrame={5} fps={fps}>
          <Img src={staticFile("screenshots/form-mobile.png")} style={{ width: 420, display: "block", margin: 0 }} />
        </PhoneFrame>
        <Toast frame={frame} startFrame={100} text="Memory planted!" icon="🌱" />
      </div>
    }
  />
);

// ── SCENE 4 ───────────────────────────────────────────────────────────────────
const Scene4: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const seedOpacity = (i: number) => interpolate(frame, [22 + i * 6, 32 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: WARM_CREAM, overflow: "hidden" }}>
      <FallingTribute frame={frame} startFrame={60} colorSrc={ICON_FLOWER_COLOR} lineSrc={ICON_FLOWER_LINE} bgColor="#FDF0F4" x={900} delay={0} />
      <FallingTribute frame={frame} startFrame={60} colorSrc={ICON_TREAT_COLOR} lineSrc={ICON_TREAT_LINE} bgColor="#F5F0E8" x={980} delay={15} />
      <FallingTribute frame={frame} startFrame={60} colorSrc={ICON_TOY_COLOR} lineSrc={ICON_TOY_LINE} bgColor="#F0F7F4" x={840} delay={28} />
      <FallingTribute frame={frame} startFrame={60} colorSrc={ICON_FLOWER_COLOR} lineSrc={ICON_FLOWER_LINE} bgColor="#FDF0F4" x={1050} delay={40} />

      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 80, padding: "0 100px" }}>
        <TextColumn>
          <div style={{ opacity: fadeIn(frame, 5, 15), display: "flex", gap: 18 }}>
            <FigmaIcon colorSrc={ICON_FLOWER_COLOR} lineSrc={ICON_FLOWER_LINE} size={72} bg="#FDF0F4" rounded={16} padding={10} />
            <FigmaIcon colorSrc={ICON_TREAT_COLOR} lineSrc={ICON_TREAT_LINE} size={72} bg="#F5F0E8" rounded={16} padding={10} />
            <FigmaIcon colorSrc={ICON_TOY_COLOR} lineSrc={ICON_TOY_LINE} size={72} bg="#F0F7F4" rounded={16} padding={10} />
          </div>
          <div style={{ height: 4 }} />
          <TextBlock text="Send love to pets you've never met" frame={frame} startFrame={10} endFrame={225} fps={fps} size={48} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
          <div style={{ height: 2 }} />
          <TextBlock text="Leave a flower, a treat, or a toy on any memorial. A small gesture that reminds a grieving family they are not alone." frame={frame} startFrame={22} endFrame={225} fps={fps} size={24} color={TEXT_SECONDARY} weight={400} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: fadeIn(frame, 34, 15) }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: BRAND_GREEN, opacity: seedOpacity(i) }} />
            ))}
            <span style={{ fontFamily: FONT_INTER, fontSize: 26, fontWeight: 700, color: TEXT_PRIMARY, marginLeft: 8 }}>5/5 ⚡</span>
          </div>
          <TextBlock text="You can leave up to 5 tributes a day. Your gifts reset every 24 hours to keep the love flowing." frame={frame} startFrame={46} endFrame={225} fps={fps} size={24} color={BRAND_GREEN} weight={600} />
        </TextColumn>

        <div style={{ position: "relative", flexShrink: 0 }}>
          <PhoneFrame frame={frame} startFrame={5} fps={fps}>
            <AnimatedImage src={staticFile("screenshots/memorial-card-mobile.gif")} width={420} fit="contain" style={{ display: "block", margin: 0 }} />
          </PhoneFrame>
          <MemorialCardOverlay frame={frame} startFrame={40} endFrame={200} />
          <Toast frame={frame} startFrame={120} text="You sent a flower" icon="🌸" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 5 ───────────────────────────────────────────────────────────────────
const Scene5: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const translationOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translationY = interpolate(frame, [60, 75], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const languages = [
    "🇨🇳 中文", "🇺🇸 English", "🇵🇭 Filipino",
    "🇫🇷 Français", "🇯🇵 日本語", "🇰🇷 한국어",
    "🇧🇷 Português", "🇷🇺 Русский", "🇪🇸 Español",
  ];
  return (
    <AbsoluteFill style={{ background: WARM_CREAM_2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, padding: "0 140px" }}>
      <div style={{ opacity: fadeIn(frame, 5, 15) }}>
        <FigmaIcon colorSrc={ICON_GLOBE_COLOR} lineSrc={ICON_GLOBE_LINE} size={100} bg="#F0F7F4" rounded={24} padding={14} />
      </div>
      <div style={{ height: 4 }} />
      <Caption text="Stories that touch hearts everywhere" frame={frame} startFrame={12} endFrame={188} fps={fps} size={60} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
      <div style={{ height: 2 }} />
      <Caption text="With instant automatic translation, your pet's memory can be read and shared by a global community, bringing comfort across borders." frame={frame} startFrame={24} endFrame={188} fps={fps} size={26} color={TEXT_SECONDARY} weight={400} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", opacity: fadeIn(frame, 32, 20) }}>
        {languages.map((lang) => (
          <div key={lang} style={{ background: "white", border: "1.5px solid #E8DDD0", borderRadius: 50, padding: "8px 20px", fontFamily: FONT_INTER, fontSize: 20, color: TEXT_SECONDARY, fontWeight: 500 }}>{lang}</div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 20, padding: "24px 32px", border: "1.5px solid #E8DDD0", width: "100%", opacity: fadeIn(frame, 42, 15) }}>
        <div style={{ fontFamily: FONT_COURIER, fontSize: 21, color: "#374151", lineHeight: 1.7, marginBottom: 14 }}>
          "Oliver came into our lives as if he had always been ours..."
        </div>
        <div style={{ fontFamily: FONT_COURIER, fontSize: 21, color: BRAND_GREEN, lineHeight: 1.7, opacity: translationOpacity, transform: `translateY(${translationY}px)`, borderTop: "1px solid #E8DDD0", paddingTop: 12 }}>
          "Oliver llegó a nuestras vidas como si siempre hubiera sido nuestro..."
        </div>
        <div style={{ fontFamily: FONT_COURIER, fontSize: 21, color: TEXT_HINT, lineHeight: 1.7, opacity: translationOpacity, transform: `translateY(${translationY}px)`, borderTop: "1px solid #E8DDD0", paddingTop: 12 }}>
          "Oliver est entré dans nos vies comme s'il avait toujours fait partie de nous..."
        </div>
        <div style={{ fontFamily: FONT_COURIER, fontSize: 21, color: TEXT_HINT, lineHeight: 1.7, opacity: translationOpacity, transform: `translateY(${translationY}px)`, borderTop: "1px solid #E8DDD0", paddingTop: 12 }}>
          "オリバーは、まるではじめから私たちの家族だったかのように..."
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── SCENE 6: CTA ──────────────────────────────────────────────────────────────
const Scene6: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const logoScale = spring({ frame: frame - 10, fps, config: { damping: 16, stiffness: 120 } });
  const logoScaleVal = interpolate(logoScale, [0, 1], [0.8, 1]);
  return (
    <AbsoluteFill style={{ background: WARM_CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <div style={{ opacity: fadeIn(frame, 5, 25), transform: `scale(${logoScaleVal})` }}>
        <PetIcon colorSrc={ICON_DOG_COLOR} lineSrc={ICON_DOG_LINE} size={120} bg="#D4885A" rounded={28} padding={18} />
      </div>
      <Caption text="Kindred Tails" frame={frame} startFrame={20} endFrame={88} fps={fps} size={96} color={TEXT_PRIMARY} font={FONT_DISPLAY} />
      <Caption text="A Living Memorial Garden" frame={frame} startFrame={35} endFrame={88} fps={fps} size={36} color={TEXT_SECONDARY} weight={400} font={FONT_DISPLAY} italic />
      <div style={{ height: 8 }} />
      <div style={{ opacity: fadeIn(frame, 50, 18), background: BRAND_GREEN, color: "white", borderRadius: 50, padding: "24px 68px", fontFamily: FONT_INTER, fontSize: 40, fontWeight: 700 }}>
        Plant their memory 🌱
      </div>
      <div style={{ opacity: fadeIn(frame, 62, 16), fontFamily: FONT_INTER, fontSize: 28, color: TEXT_HINT, fontWeight: 400 }}>
        kindredtails.vercel.app
      </div>
      <div style={{ opacity: fadeIn(frame, 74, 16), display: "flex", alignItems: "center", gap: 10, background: "white", border: "1.5px solid #E8DDD0", borderRadius: 50, padding: "14px 32px", fontFamily: FONT_INTER, fontSize: 22, color: TEXT_SECONDARY }}>
        Built for #ConfigMakeathon x Contra 🎉
      </div>
    </AbsoluteFill>
  );
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export const Main: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <GlobalStyle />
      <Audio src={staticFile("audio.wav")} volume={0.65} />
      <Sequence from={0} durationInFrames={225}><Scene1 frame={frame} fps={fps} /></Sequence>
      <Sequence from={190} durationInFrames={235}><Scene2 frame={frame - 190} fps={fps} /></Sequence>
      <Sequence from={390} durationInFrames={235}><Scene3 frame={frame - 390} fps={fps} /></Sequence>
      <Sequence from={590} durationInFrames={235}><Scene4 frame={frame - 590} fps={fps} /></Sequence>
      <Sequence from={790} durationInFrames={200}><Scene5 frame={frame - 790} fps={fps} /></Sequence>
      <Sequence from={960} durationInFrames={92}><Scene6 frame={frame - 960} fps={fps} /></Sequence>
    </AbsoluteFill>
  );
};
