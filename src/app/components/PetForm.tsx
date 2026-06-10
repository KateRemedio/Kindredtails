import { useState, useRef } from "react";
import { createPet, uploadPhoto, type Pet } from "../utils/api";
import { compressImage } from "../utils/imageCompression";
import { getOwnerToken, saveUserCity, saveOwnedPet } from "../utils/localStorage";
import { LocationSearch, type LocationResult } from "./LocationSearch";

const PET_TYPES = ["dog", "cat", "bird", "bunny", "reptile", "fish", "other"];

interface Props {
  onSuccess: (pet: Pet) => void;
}

export function PetForm({ onSuccess }: Props) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [memorialText, setMemorialText] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImageLoading(true);
    setError("");
    try {
      const compressed = await Promise.all(
        files.slice(0, 3 - imagePreviews.length).map(compressImage)
      );
      setImagePreviews((prev) => [...prev, ...compressed].slice(0, 3));
    } catch (err) {
      setError(String(err));
    }
    setImageLoading(false);
    e.target.value = "";
  };

  const removePhoto = (idx: number) =>
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) { setError("Please search and select a city."); return; }
    setLoading(true);
    setError("");
    try {
      let photo_url: string | undefined;
      if (imagePreviews.length > 0) {
        const urls = await Promise.all(imagePreviews.map(uploadPhoto));
        photo_url = urls.length === 1 ? urls[0] : JSON.stringify(urls);
      }
      const ownerToken = getOwnerToken();
      console.log("[PetForm] Submitting pet:", { petName, petType, city: location.city, country: location.country });
      const pet = await createPet({
        pet_name: petName,
        pet_type: petType,
        memorial_text: memorialText,
        photo_url,
        city: location.city,
        country: location.country,
        owner_token: ownerToken,
      });
      console.log("[PetForm] Pet created:", pet);
      saveUserCity(location.city, location.country);
      saveOwnedPet(pet.id, ownerToken);
      onSuccess(pet);
      // Reset
      setPetName(""); setPetType("dog"); setMemorialText("");
      setImagePreviews([]); setLocation(null);
    } catch (err) {
      console.log("[PetForm] Error:", err);
      setError(String(err));
    }
    setLoading(false);
  };

  const input =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 bg-white transition-all";
  const label = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">

      {/* Pet Name */}
      <div>
        <label className={label}>Pet Name</label>
        <input
          className={input}
          style={{ fontFamily: "'Courier Prime', 'Source Code Pro', monospace" }}
          value={petName}
          onChange={(e) => setPetName(e.target.value.slice(0, 100))}
          placeholder="e.g. Buddy, Luna, Oliver…"
          required
          maxLength={100}
        />
      </div>

      {/* Pet Type */}
      <div>
        <label className={label}>Pet Type</label>
        <select className={input} value={petType} onChange={(e) => setPetType(e.target.value)}>
          {PET_TYPES.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Memorial Text */}
      <div>
        <label className={label}>
          Memorial Text{" "}
          <span className="text-gray-400 font-normal normal-case">({memorialText.length}/600)</span>
        </label>
        <textarea
          className={input + " resize-none"}
          style={{ fontFamily: "'Courier Prime', 'Source Code Pro', monospace", minHeight: 96 }}
          value={memorialText}
          onChange={(e) => setMemorialText(e.target.value.slice(0, 600))}
          placeholder="Share a cherished memory or a message to your beloved companion…"
          required
          maxLength={600}
          rows={4}
        />
      </div>

      {/* Photo(s) — up to 3 */}
      <div>
        <label className={label}>
          Photos{" "}
          <span className="text-gray-400 font-normal normal-case">({imagePreviews.length}/3)</span>
        </label>

        {/* Thumbnails row */}
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {imagePreviews.map((src, i) => (
              <div key={i} style={{ position: "relative", width: 72, height: 72 }}>
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 10, border: "1px solid #E5E7EB" }}
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  style={{
                    position: "absolute", top: -6, right: -6,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#EF4444", color: "white",
                    border: "none", cursor: "pointer",
                    fontSize: 11, lineHeight: "18px", textAlign: "center",
                  }}
                >×</button>
              </div>
            ))}
            {imagePreviews.length < 3 && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 72, height: 72, borderRadius: 10,
                  border: "2px dashed #D1D5DB",
                  background: "transparent", cursor: "pointer",
                  fontSize: 22, color: "#9CA3AF",
                }}
              >+</button>
            )}
          </div>
        )}

        {imagePreviews.length === 0 && (
          <div
            onClick={() => !imageLoading && fileRef.current?.click()}
            className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl hover:border-cyan-300 transition-colors"
            style={{ height: 100, background: "#F9FAFB" }}
          >
            {imageLoading ? (
              <div className="text-gray-400 text-sm">Compressing…</div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-3xl mb-1">📷</div>
                <div className="text-xs">Click to add up to 3 photos<br /><span className="text-gray-300">PNG · JPG · WebP · HEIC</span></div>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />
      </div>

      {/* Location search */}
      <div>
        <label className={label}>City / Location</label>
        <LocationSearch
          onSelect={(r) => setLocation(r)}
          required
        />
        {location && (
          <div className="mt-1 text-xs text-cyan-600 font-medium">
            📍 {location.city}, {location.country}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg p-3">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading || imageLoading}
        style={{
          width: "100%", padding: "13px", borderRadius: 12, border: "none",
          background: loading || imageLoading ? "#F3F4F6" : "linear-gradient(135deg,#D946EF,#F97316)",
          color: loading || imageLoading ? "#9CA3AF" : "white",
          fontSize: 15, fontWeight: 700,
          cursor: loading || imageLoading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      >
        {loading ? "Planting your memory…" : "🌱 Plant This Memory"}
      </button>
    </form>
  );
}
