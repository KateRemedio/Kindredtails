import { useState, useEffect, useCallback } from "react";
import { sendTribute, getTributeLogs, getPet, type Pet, type TributeLog } from "../utils/api";
import { getOwnerToken, getSeedCount, getSeedResetAt, useSeed, isPetOwner, getPetOwnerToken } from "../utils/localStorage";

const PET_EMOJI: Record<string, string> = {
  dog: "🐕", cat: "🐈", bird: "🐦", bunny: "🐰",
  reptile: "🦎", fish: "🐠", other: "🐾",
};
const TRIBUTE_EMOJI: Record<string, string> = { flower: "🌸", treat: "🍖", toy: "🧸" };

// Parse photo_url which may be a single URL or JSON array of URLs
function parsePhotoUrls(photoUrl: string | null | undefined): string[] {
  if (!photoUrl) return [];
  try {
    const parsed = JSON.parse(photoUrl);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch {}
  return [photoUrl];
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "0s";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`;
}

async function getTributerLocation(): Promise<{ city: string; country: string }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ city: "Anonymous", country: "" });

    const timer = setTimeout(() => resolve({ city: "Anonymous", country: "" }), 6000);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        clearTimeout(timer);
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            { headers: { "User-Agent": "KindredTails/1.0 memorial-app" } }
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Somewhere";
          const country = data.address?.country || "";
          resolve({ city, country });
        } catch {
          resolve({ city: "Anonymous", country: "" });
        }
      },
      () => { clearTimeout(timer); resolve({ city: "Anonymous", country: "" }); },
      { timeout: 6000, maximumAge: 300_000 }
    );
  });
}

interface Props {
  pet: Pet;
  onClose: () => void;
  onTributeSuccess: (pet: Pet) => void;
  onToast?: (msg: string) => void;
}

export function PetModal({ pet, onClose, onTributeSuccess, onToast }: Props) {
  const [current, setCurrent] = useState<Pet>(pet);
  const [seeds, setSeeds] = useState(getSeedCount);
  const [countdown, setCountdown] = useState("");
  const [tab, setTab] = useState<"memorial" | "log">("memorial");
  const [logs, setLogs] = useState<TributeLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [tributeLoading, setTributeLoading] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  // Translation state
  const [translated, setTranslated] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  // Tribute drop animation
  const [dropEmoji, setDropEmoji] = useState<{ emoji: string; key: number } | null>(null);

  const ownerToken = getOwnerToken();
  // Per-pet stored token wins; fall back to legacy list check or API-returned owner_token
  const storedPetToken = getPetOwnerToken(pet.id);
  const [isOwner, setIsOwner] = useState(
    !!storedPetToken ||
    isPetOwner(pet.id) ||
    (typeof pet.owner_token === "string" && pet.owner_token === ownerToken)
  );

  const photos = parsePhotoUrls(current.photo_url);

  // API fallback: if this browser created the pet, the server will echo owner_token back
  // and we can save it so future visits work without the API call.
  useEffect(() => {
    if (isOwner) return;
    const tokenToSend = storedPetToken || ownerToken;
    getPet(pet.id, tokenToSend).then((data) => {
      if (data && typeof data.owner_token === "string") {
        setIsOwner(true);
        // Persist the per-pet token so next modal open is instant
        if (!storedPetToken) {
          localStorage.setItem(`kindred_owner_token_${pet.id}`, tokenToSend);
        }
      }
    }).catch(() => {});
  }, [pet.id, ownerToken, storedPetToken, isOwner]);

  // Countdown when seeds exhausted
  useEffect(() => {
    if (seeds > 0) { setCountdown(""); return; }
    const tick = () => {
      const ms = Math.max(0, getSeedResetAt() - Date.now());
      setCountdown(formatCountdown(ms));
      if (ms <= 0) setSeeds(getSeedCount());
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [seeds]);

  // Load tribute logs when owner switches to log tab
  const loadLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const data = await getTributeLogs(pet.id, storedPetToken || ownerToken);
      setLogs(data);
    } catch {}
    setLogsLoading(false);
  }, [pet.id, ownerToken]);

  useEffect(() => {
    if (tab === "log" && isOwner) loadLogs();
  }, [tab, isOwner, loadLogs]);

  const handleTribute = async (type: "flower" | "treat" | "toy") => {
    if (seeds <= 0 || tributeLoading) return;
    if (!useSeed()) return;
    setSeeds(getSeedCount());
    setTributeLoading(type);

    // Detect sender location
    setLocating(true);
    const loc = await getTributerLocation();
    setLocating(false);

    // Trigger drop animation
    const emoji = TRIBUTE_EMOJI[type];
    setDropEmoji({ emoji, key: Date.now() });
    setTimeout(() => setDropEmoji(null), 2200);

    try {
      const counts = await sendTribute(pet.id, type, loc.city, loc.country);
      const updated: Pet = { ...current, ...counts };
      setCurrent(updated);
      onTributeSuccess(updated);
      onToast?.(`${emoji} You sent a ${type} to ${pet.pet_name}`);
    } catch (e) {
      console.log("Tribute error:", e);
    }
    setTributeLoading(null);
  };

  const handleTranslate = async () => {
    if (translated !== null) { setShowTranslation((v) => !v); return; }
    setTranslating(true);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(current.memorial_text)}&langpair=auto|en`
      );
      const data = await res.json();
      if (data.responseStatus === 200) {
        const text: string = data.responseData.translatedText;
        const isAlreadyEn =
          text.trim().toLowerCase() === current.memorial_text.trim().toLowerCase();
        setTranslated(isAlreadyEn ? "__english__" : text);
        if (!isAlreadyEn) setShowTranslation(true);
      }
    } catch {}
    setTranslating(false);
  };

  const tributeButtons = [
    { type: "flower" as const, count: current.flowers },
    { type: "treat" as const, count: current.treats },
    { type: "toy" as const, count: current.toys },
  ];

  const rotations = [-6, 0, 6];

  return (
    <>
      {/* Tribute drop animation */}
      {dropEmoji && (
        <div
          key={dropEmoji.key}
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            fontSize: 40,
            zIndex: 9999,
            pointerEvents: "none",
            animation: "kt-tribute-drop 2.1s ease-in forwards",
          }}
        >
          {dropEmoji.emoji}
        </div>
      )}

      <style>{`
        @keyframes kt-tribute-drop {
          0%   { top:4%;  transform:translateX(-50%) rotate(0deg);   opacity:1; }
          20%  {          transform:translateX(calc(-50% - 18px)) rotate(-12deg); }
          40%  {          transform:translateX(calc(-50% + 18px)) rotate(8deg); }
          65%  {          transform:translateX(calc(-50% - 10px)) rotate(-5deg); opacity:1; }
          100% { top:85%; transform:translateX(-50%) rotate(3deg);   opacity:0; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="kt-modal-backdrop"
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="kt-modal-card"
          style={{
            background: "white",
            borderRadius: 24,
            width: "100%",
            maxWidth: 420,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
            position: "relative",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute", top: 14, right: 14, zIndex: 10,
              width: 32, height: 32, borderRadius: "50%",
              background: "#F3F4F6", border: "none", cursor: "pointer",
              fontSize: 16, color: "#6B7280", display: "flex",
              alignItems: "center", justifyContent: "center",
              minWidth: 44, minHeight: 44,
            }}
          >✕</button>

          <div style={{ padding: 24 }}>
            {/* Photo scrapbook */}
            {photos.length > 0 && (
              <div style={{ position: "relative", height: 170, marginBottom: 12, display: "flex", justifyContent: "center" }}>
                {photos.map((url, i) => {
                  const isActive = i === photoIdx;
                  return (
                    <div
                      key={url + i}
                      onClick={() => photos.length > 1 && setPhotoIdx((photoIdx + 1) % photos.length)}
                      style={{
                        position: "absolute",
                        transform: `rotate(${isActive ? 0 : rotations[i % 3]}deg) scale(${isActive ? 1 : 0.95})`,
                        zIndex: isActive ? 10 : i,
                        cursor: photos.length > 1 ? "pointer" : "default",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <div style={{ padding: 3, background: "linear-gradient(135deg,#06B6D4,#3B82F6)", borderRadius: 16 }}>
                        <img
                          src={url}
                          alt={current.pet_name}
                          style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 13, display: "block" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Photo dots */}
            {photos.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 10 }}>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    style={{
                      width: i === photoIdx ? 18 : 6, height: 6, borderRadius: 3,
                      background: i === photoIdx ? "#06B6D4" : "#E5E7EB",
                      border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s",
                      minWidth: 44, minHeight: 44,
                    }}
                  />
                ))}
              </div>
            )}

            {/* No photo placeholder */}
            {photos.length === 0 && (
              <div style={{
                width: 110, height: 110, borderRadius: 18, margin: "0 auto 12px",
                background: "linear-gradient(135deg,#E0F7FA,#DBEAFE)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52,
              }}>
                {PET_EMOJI[current.pet_type] || "🐾"}
              </div>
            )}

            {/* Name + location */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{
                fontFamily: "'Courier Prime','Source Code Pro',monospace",
                fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4,
              }}>{current.pet_name}</h2>
              <p style={{ fontSize: 13, color: "#9CA3AF" }}>
                {PET_EMOJI[current.pet_type] || "🐾"} {current.pet_type} · {current.city}, {current.country}
              </p>
            </div>

            {/* Owner tabs */}
            {isOwner && (
              <div
                style={{
                  display: "flex", borderRadius: 12, overflow: "hidden",
                  border: "1px solid #E5E7EB", marginBottom: 16, background: "#F9FAFB",
                }}
              >
                {(["memorial", "log"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: "10px 8px", border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                      background: tab === t ? "linear-gradient(135deg,#06B6D4,#3B82F6)" : "transparent",
                      color: tab === t ? "white" : "#6B7280",
                      borderRadius: tab === t ? 11 : 0,
                      minHeight: 44,
                    }}
                  >
                    {t === "memorial" ? "Memorial" : "Your Memorial ❤️"}
                  </button>
                ))}
              </div>
            )}

            {tab === "memorial" ? (
              <>
                {/* Memorial text */}
                <div
                  style={{
                    fontFamily: "'Courier Prime','Source Code Pro',monospace",
                    fontSize: 14, color: "#374151", lineHeight: 1.7,
                    background: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 12,
                    border: "1px solid #F3F4F6",
                  }}
                >
                  {showTranslation && translated && translated !== "__english__"
                    ? translated
                    : current.memorial_text}
                </div>

                {/* Translation link */}
                <div style={{ marginBottom: 12, textAlign: "right" }}>
                  {translated === "__english__" ? (
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>Already in English</span>
                  ) : (
                    <button
                      onClick={handleTranslate}
                      disabled={translating}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontSize: 11, color: "#06B6D4", fontWeight: 600,
                        minHeight: 44, padding: "0 4px",
                      }}
                    >
                      {translating ? "Translating…" : showTranslation ? "See original" : "See translation"}
                    </button>
                  )}
                </div>

                {/* Personality tags */}
                {(current.personality_tags || []).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {current.personality_tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 12, padding: "4px 10px", borderRadius: 20,
                          background: "linear-gradient(135deg,#06B6D4,#3B82F6)", color: "white",
                        }}
                      >{tag}</span>
                    ))}
                  </div>
                )}

                {/* Seeds */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>Tribute Seeds:</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: i < seeds ? "linear-gradient(135deg,#06B6D4,#3B82F6)" : "#E5E7EB",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{seeds}/5 ⚡</span>
                  </div>
                  {seeds <= 0 && countdown && (
                    <span style={{ fontSize: 11, color: "#F97316" }}>Resets in {countdown}</span>
                  )}
                </div>

                {locating && (
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8, textAlign: "center" }}>
                    Detecting your city for the tribute log…
                  </div>
                )}

                {/* Tribute buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {tributeButtons.map(({ type, count }) => {
                    const canTribute = seeds > 0 && !tributeLoading;
                    const sending = tributeLoading === type;
                    return (
                      <button
                        key={type}
                        disabled={!canTribute}
                        onClick={() => handleTribute(type)}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "center",
                          gap: 4, padding: "12px 8px", borderRadius: 14,
                          border: "1px solid #E5E7EB",
                          background: sending ? "linear-gradient(135deg,#D946EF,#F97316)" : canTribute ? "white" : "#FAFAFA",
                          opacity: canTribute ? 1 : 0.5,
                          cursor: canTribute ? "pointer" : "not-allowed",
                          transform: sending ? "scale(0.95)" : "scale(1)",
                          transition: "all 0.15s",
                          minHeight: 44,
                        }}
                      >
                        <span style={{ fontSize: 26 }}>{TRIBUTE_EMOJI[type]}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: sending ? "white" : "#374151" }}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: sending ? "rgba(255,255,255,0.85)" : "#06B6D4" }}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Your Memorial tab — tribute logs */
              <div>
                {/* Totals */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                  {tributeButtons.map(({ type, count }) => (
                    <div key={type} style={{
                      textAlign: "center", background: "#F9FAFB",
                      borderRadius: 14, padding: "12px 8px",
                      border: "1px solid #F3F4F6",
                    }}>
                      <div style={{ fontSize: 28 }}>{TRIBUTE_EMOJI[type]}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}s
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{count}</div>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                  Tribute log
                </div>

                {logsLoading ? (
                  <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, padding: 24 }}>Loading…</div>
                ) : logs.length === 0 ? (
                  <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, padding: 24 }}>
                    No tributes yet. Share your memorial and watch the love arrive! 🌸
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 240, overflowY: "auto" }}>
                    {logs.map((log) => (
                      <div key={log.id} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 12px", borderRadius: 12, background: "#F9FAFB",
                      }}>
                        <span style={{ fontSize: 22, flexShrink: 0 }}>{TRIBUTE_EMOJI[log.tribute_type]}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
                            {log.from_city}{log.from_country ? `, ${log.from_country}` : ""}
                          </div>
                          <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                            {new Date(log.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "capitalize" }}>
                          {log.tribute_type}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
