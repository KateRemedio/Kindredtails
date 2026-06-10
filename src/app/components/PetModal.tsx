import { useState, useEffect, useCallback } from "react";
import { sendTribute, getTributeLogs, getPet, type Pet, type TributeLog } from "../utils/api";
import {
  getOwnerToken,
  getSeedCount,
  getSeedResetAt,
  useSeed,
  getUserCity,
} from "../utils/localStorage";

const PET_EMOJI: Record<string, string> = {
  dog: "🐕", cat: "🐈", bird: "🐦", bunny: "🐰",
  reptile: "🦎", fish: "🐠", other: "🐾",
};
const TRIBUTE_EMOJI: Record<string, string> = { flower: "🌸", treat: "🍖", toy: "🧸" };

function formatCountdown(ms: number): string {
  if (ms <= 0) return "0s";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1_000);
  return h > 0 ? `${h}h ${m}m` : m > 0 ? `${m}m ${s}s` : `${s}s`;
}

interface Props {
  pet: Pet;
  onClose: () => void;
  onTributeSuccess: (pet: Pet) => void;
}

export function PetModal({ pet, onClose, onTributeSuccess }: Props) {
  const [current, setCurrent] = useState<Pet>(pet);
  const [seeds, setSeeds] = useState(getSeedCount);
  const [countdown, setCountdown] = useState("");
  const [tab, setTab] = useState<"memorial" | "log">("memorial");
  const [logs, setLogs] = useState<TributeLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [tributeLoading, setTributeLoading] = useState<string | null>(null);

  const ownerToken = getOwnerToken();
  const [isActualOwner, setIsActualOwner] = useState(
    typeof pet.owner_token === "string" && pet.owner_token === ownerToken
  );
  const userCity = getUserCity();

  // Verify ownership via the individual pet endpoint (handles returning users)
  useEffect(() => {
    if (isActualOwner) return;
    getPet(pet.id, ownerToken).then((data) => {
      if (data && typeof data.owner_token === "string") {
        const tok = data.owner_token;
        setIsActualOwner(true);
        setCurrent((prev) => ({ ...prev, owner_token: tok }));
      }
    }).catch(() => {});
  }, [pet.id, ownerToken, isActualOwner]);

  // Countdown timer when seeds are empty
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
      const data = await getTributeLogs(pet.id, ownerToken);
      setLogs(data);
    } catch {}
    setLogsLoading(false);
  }, [pet.id, ownerToken]);

  useEffect(() => {
    if (tab === "log" && isActualOwner) loadLogs();
  }, [tab, isActualOwner, loadLogs]);

  const handleTribute = async (type: "flower" | "treat" | "toy") => {
    if (seeds <= 0 || tributeLoading) return;
    if (!useSeed()) return;
    setSeeds(getSeedCount());
    setTributeLoading(type);
    try {
      const counts = await sendTribute(
        pet.id, type,
        userCity?.city || "Anonymous",
        userCity?.country || ""
      );
      const updated: Pet = { ...current, ...counts };
      setCurrent(updated);
      onTributeSuccess(updated);
    } catch (e) {
      console.log("Tribute error:", e);
    }
    setTributeLoading(null);
  };

  const tributeButtons = [
    { type: "flower" as const, label: "Flower", count: current.flowers },
    { type: "treat" as const, label: "Treat", count: current.treats },
    { type: "toy" as const, label: "Toy", count: current.toys },
  ];

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative bg-white overflow-hidden"
        style={{
          width: 420,
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "90vh",
          borderRadius: 24,
          boxShadow: "0 24px 64px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",
          overflowY: "auto",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6">
          {/* Hero: photo + name */}
          <div className="flex flex-col items-center mb-5">
            {current.photo_url ? (
              <div
                style={{
                  padding: 3,
                  background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                  borderRadius: 20,
                  marginBottom: 14,
                  flexShrink: 0,
                }}
              >
                <img
                  src={current.photo_url}
                  alt={current.pet_name}
                  style={{
                    width: 150, height: 150, objectFit: "cover",
                    borderRadius: 17, display: "block",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 150, height: 150, borderRadius: 20,
                  background: "linear-gradient(135deg, #E0F7FA, #DBEAFE)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 64, marginBottom: 14, flexShrink: 0,
                }}
              >
                {PET_EMOJI[current.pet_type] || "🐾"}
              </div>
            )}

            <h2
              style={{
                fontFamily: "'Courier Prime', 'Source Code Pro', monospace",
                fontSize: 24, fontWeight: 700, color: "#111827",
                textAlign: "center", marginBottom: 4,
              }}
            >
              {current.pet_name}
            </h2>
            <p className="text-sm text-gray-400">
              {PET_EMOJI[current.pet_type] || "🐾"} {current.pet_type} · {current.city}, {current.country}
            </p>
          </div>

          {/* Owner tabs */}
          {isActualOwner && (
            <div
              className="flex rounded-xl overflow-hidden border border-gray-200 mb-5"
              style={{ background: "#F9FAFB" }}
            >
              {(["memorial", "log"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-2.5 text-xs font-semibold transition-all"
                  style={{
                    background: tab === t ? "linear-gradient(135deg, #06B6D4, #3B82F6)" : "transparent",
                    color: tab === t ? "white" : "#6B7280",
                    borderRadius: tab === t ? 10 : 0,
                  }}
                >
                  {t === "memorial" ? "Memorial" : "Your Memorial 💌"}
                </button>
              ))}
            </div>
          )}

          {tab === "memorial" ? (
            <>
              {/* Memorial text */}
              <div
                className="text-sm text-gray-700 leading-relaxed rounded-xl p-4 mb-4"
                style={{
                  fontFamily: "'Courier Prime', 'Source Code Pro', monospace",
                  background: "#F9FAFB",
                  border: "1px solid #F3F4F6",
                }}
              >
                {current.memorial_text}
              </div>

              {/* Tags */}
              {current.personality_tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {current.personality_tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #06B6D4, #3B82F6)",
                        color: "white",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Seed indicator */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Tribute Seeds:</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: i < seeds
                            ? "linear-gradient(135deg, #06B6D4, #3B82F6)"
                            : "#E5E7EB",
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{seeds}/5 ⚡</span>
                </div>
                {seeds <= 0 && countdown && (
                  <span className="text-xs text-orange-500 font-medium">
                    Resets in {countdown}
                  </span>
                )}
              </div>

              {/* Tribute buttons */}
              <div className="grid grid-cols-3 gap-2">
                {tributeButtons.map(({ type, label, count }) => {
                  const active = seeds > 0 && !tributeLoading;
                  const sending = tributeLoading === type;
                  return (
                    <button
                      key={type}
                      disabled={!active}
                      onClick={() => handleTribute(type)}
                      className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all"
                      style={{
                        border: "1px solid #E5E7EB",
                        background: sending
                          ? "linear-gradient(135deg, #D946EF, #F97316)"
                          : active ? "white" : "#FAFAFA",
                        opacity: active ? 1 : 0.55,
                        cursor: active ? "pointer" : "not-allowed",
                        transform: sending ? "scale(0.96)" : "scale(1)",
                        transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 26 }}>{TRIBUTE_EMOJI[type]}</span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: sending ? "white" : "#374151" }}
                      >
                        {label}
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: sending ? "rgba(255,255,255,0.9)" : "#06B6D4" }}
                      >
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
              <div className="text-sm font-semibold text-gray-700 mb-3">Tributes received</div>

              {/* Totals summary */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {tributeButtons.map(({ type, label, count }) => (
                  <div
                    key={type}
                    className="text-center rounded-xl p-3"
                    style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
                  >
                    <div style={{ fontSize: 26 }}>{TRIBUTE_EMOJI[type]}</div>
                    <div className="text-xs text-gray-500">{label}s</div>
                    <div className="text-xl font-bold text-gray-800">{count}</div>
                  </div>
                ))}
              </div>

              {/* Log list */}
              {logsLoading ? (
                <div className="text-sm text-gray-400 text-center py-8">Loading...</div>
              ) : logs.length === 0 ? (
                <div className="text-sm text-gray-400 text-center py-8">
                  No tributes yet.
                  <br />
                  <span className="text-xs">Share your memorial so others can send love! 🌸</span>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "#F9FAFB" }}
                    >
                      <span style={{ fontSize: 22 }}>{TRIBUTE_EMOJI[log.tribute_type]}</span>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-700">
                          {log.from_city}
                          {log.from_country ? `, ${log.from_country}` : ""}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(log.created_at).toLocaleDateString(undefined, {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 capitalize">{log.tribute_type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
