import { useState, useRef } from "react";
import { createPet, uploadPhoto, type Pet } from "../utils/api";
import { compressImage } from "../utils/imageCompression";
import { getOwnerToken, saveUserCity } from "../utils/localStorage";

const PET_TYPES = ["dog", "cat", "bird", "bunny", "reptile", "fish", "other"];

interface Props {
  onSuccess: (pet: Pet) => void;
}

export function PetForm({ onSuccess }: Props) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [memorialText, setMemorialText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);
    setError("");
    try {
      const compressed = await compressImage(file);
      setImagePreview(compressed);
    } catch (err) {
      setError(String(err));
    }
    setImageLoading(false);
    e.target.value = "";
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/[^a-z0-9\s\-]/g, "");
    if (t && !tags.includes(t) && tags.length < 10) {
      setTags((prev) => [...prev, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let photo_url: string | undefined;
      if (imagePreview) {
        console.log("[PetForm] Uploading photo...");
        photo_url = await uploadPhoto(imagePreview);
        console.log("[PetForm] Photo uploaded:", photo_url);
      }
      const ownerToken = getOwnerToken();
      const payload = { pet_name: petName, pet_type: petType, memorial_text: memorialText, photo_url, personality_tags: tags, city, country, owner_token: ownerToken };
      console.log("[PetForm] Calling POST /pets with payload:", payload);
      const pet = await createPet(payload);
      console.log("[PetForm] POST /pets response:", pet);
      saveUserCity(city, country);
      onSuccess(pet);
      setPetName(""); setPetType("dog"); setMemorialText("");
      setImagePreview(null); setCity(""); setCountry(""); setTags([]);
    } catch (err) {
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
          placeholder="e.g. Buddy, Luna, Oliver..."
          required
          maxLength={100}
        />
        <div className="text-right text-xs text-gray-400 mt-0.5">{petName.length}/100</div>
      </div>

      {/* Pet Type */}
      <div>
        <label className={label}>Pet Type</label>
        <select
          className={input}
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        >
          {PET_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Memorial Text */}
      <div>
        <label className={label}>
          Memorial Text
          <span className="text-gray-400 font-normal normal-case ml-1">({memorialText.length}/600)</span>
        </label>
        <textarea
          className={input + " resize-none"}
          style={{ fontFamily: "'Courier Prime', 'Source Code Pro', monospace", minHeight: 96 }}
          value={memorialText}
          onChange={(e) => setMemorialText(e.target.value.slice(0, 600))}
          placeholder="Share a cherished memory, a moment, or a message to your beloved companion..."
          required
          maxLength={600}
          rows={4}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className={label}>Photo</label>
        <div
          onClick={() => !imageLoading && fileRef.current?.click()}
          className="cursor-pointer flex items-center justify-center border-2 border-dashed rounded-xl transition-all hover:border-cyan-300"
          style={{
            width: "100%",
            aspectRatio: "1",
            borderColor: imagePreview ? "transparent" : "#E5E7EB",
            overflow: "hidden",
            background: imagePreview ? "transparent" : "#F9FAFB",
            maxHeight: 180,
          }}
        >
          {imageLoading ? (
            <div className="text-center text-gray-400">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-xs">Compressing...</div>
            </div>
          ) : imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="text-center text-gray-400 p-4">
              <div className="text-3xl mb-2">📷</div>
              <div className="text-xs">
                Click to upload
                <br />
                <span className="text-gray-300">PNG · JPG · WebP · HEIC</span>
              </div>
            </div>
          )}
        </div>
        {imagePreview && (
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            className="mt-1 text-xs text-gray-400 hover:text-gray-600"
          >
            Remove photo
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* City & Country */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={label}>City</label>
          <input
            className={input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
        </div>
        <div>
          <label className={label}>Country</label>
          <input
            className={input}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          />
        </div>
      </div>

      {/* Personality Tags */}
      <div>
        <label className={label}>Personality Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2 min-h-[24px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full"
              style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)", color: "white" }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 opacity-70 hover:opacity-100 leading-none"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className={input}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="e.g. playful, loving, goofy"
            maxLength={30}
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #06B6D4, #3B82F6)" }}
          >
            Add
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || imageLoading}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 12,
          background: loading || imageLoading
            ? "#F3F4F6"
            : "linear-gradient(135deg, #D946EF, #F97316)",
          color: loading || imageLoading ? "#9CA3AF" : "white",
          fontSize: 15,
          fontWeight: 700,
          border: "none",
          cursor: loading || imageLoading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          letterSpacing: "0.01em",
        }}
      >
        {loading ? "Planting your memory..." : "🌱 Plant This Memory"}
      </button>
    </form>
  );
}
