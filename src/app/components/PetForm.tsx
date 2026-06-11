import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPet, uploadPhoto, type Pet } from "../utils/api";
import { compressImage } from "../utils/imageCompression";
import { getOwnerToken, saveUserCity, saveOwnedPet } from "../utils/localStorage";
import { LocationSearch, type LocationResult } from "./LocationSearch";

const PET_TYPES = ["dog", "cat", "bird", "bunny", "reptile", "fish", "other"];
const META_SEP = "\n\n---kindred-meta---\n";
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/heic", "image/heif"];

interface Props {
  onSuccess: (pet: Pet) => void;
}

export function PetForm({ onSuccess }: Props) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mobileStep, setMobileStep] = useState(1);

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [memorialText, setMemorialText] = useState("");
  const [breed, setBreed] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [datePassing, setDatePassing] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const invalid = files.filter((f) => f.type && !ACCEPTED_TYPES.includes(f.type));
    if (invalid.length > 0) {
      setFieldErrors((prev) => ({ ...prev, photo: "Only PNG, JPG, WebP, and HEIC photos are supported." }));
      e.target.value = "";
      return;
    }
    setFieldErrors((prev) => { const n = { ...prev }; delete n.photo; return n; });
    setImageLoading(true);
    try {
      const compressed = await Promise.all(
        files.slice(0, 3 - imagePreviews.length).map(compressImage)
      );
      setImagePreviews((prev) => [...prev, ...compressed].slice(0, 3));
    } catch (err) {
      setFieldErrors((prev) => ({ ...prev, photo: String(err) }));
    }
    setImageLoading(false);
    e.target.value = "";
  };

  const removePhoto = (idx: number) =>
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));

  const validateStep = (step: number): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!petName.trim()) errors.petName = "Pet name is required.";
    }
    if (step === 2 || (!isMobile && step === 0)) {
      if (!memorialText.trim()) errors.memorialText = "Please write a memorial message.";
    }
    if (step === 3 || (!isMobile && step === 0)) {
      if (!location) errors.location = "Please search and select a city.";
    }
    return errors;
  };

  const goNext = () => {
    const errors = validateStep(mobileStep);
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) setMobileStep((s) => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Full validation
    const e1 = validateStep(1);
    const e2 = validateStep(2);
    const e3 = validateStep(3);
    const allErrors = { ...e1, ...e2, ...e3 };
    setFieldErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      // On mobile, go back to the step with the first error
      if (isMobile) {
        if (e1.petName) setMobileStep(1);
        else if (e2.memorialText) setMobileStep(2);
        else setMobileStep(3);
      }
      return;
    }

    setLoading(true);
    setGlobalError("");
    try {
      let photo_url: string | undefined;
      if (imagePreviews.length > 0) {
        const urls = await Promise.all(imagePreviews.map(uploadPhoto));
        photo_url = urls.length === 1 ? urls[0] : JSON.stringify(urls);
      }

      const meta: Record<string, string> = {};
      if (breed.trim()) meta.breed = breed.trim();
      if (ageYears.trim()) meta.age_years = ageYears.trim();
      if (datePassing) meta.date_of_passing = datePassing;
      const fullText = Object.keys(meta).length > 0
        ? memorialText + META_SEP + JSON.stringify(meta)
        : memorialText;

      const ownerToken = getOwnerToken();
      const pet = await createPet({
        pet_name: petName,
        pet_type: petType,
        memorial_text: fullText,
        photo_url,
        city: location!.city,
        country: location!.country,
        owner_token: ownerToken,
      });

      localStorage.setItem("kindred_owner_token_" + pet.id, pet.owner_token!);
      saveUserCity(location!.city, location!.country);
      saveOwnedPet(pet.id, ownerToken);
      onSuccess(pet);

      // Reset
      setPetName(""); setPetType("dog"); setMemorialText("");
      setBreed(""); setAgeYears(""); setDatePassing("");
      setImagePreviews([]); setLocation(null);
      setMobileStep(1); setFieldErrors({});
    } catch (err) {
      console.log("[PetForm] Error:", err);
      setGlobalError(String(err));
    }
    setLoading(false);
  };

  const input =
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8DDD0] bg-white transition-all placeholder:text-[#9C8A7A]";
  const inputOk = input + " border-[#E8DDD0]";
  const inputErr = input + " border-red-400 focus:ring-red-200 bg-red-50";
  const label = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";
  const errMsg = (msg: string) => (
    <div style={{ color: "#EF4444", fontSize: 11, marginTop: 3, fontWeight: 500 }}>{msg}</div>
  );

  const showStep1 = !isMobile || mobileStep === 1;
  const showStep2 = !isMobile || mobileStep === 2;
  const showStep3 = !isMobile || mobileStep === 3;

  const STEP_LABELS = [t("step_1"), t("step_2"), t("step_3")];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-6">

      {/* Mobile step indicator */}
      {isMobile && (
        <div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6 }}>
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  width: s === mobileStep ? 28 : 8, height: 8, borderRadius: 4,
                  background: s <= mobileStep ? "#2A6B4A" : "#E8DDD0",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>
            {STEP_LABELS[mobileStep - 1]}
          </div>
        </div>
      )}

      {/* ── Step 1: Name + Type + Breed ── */}
      {showStep1 && (
        <>
          <div>
            <label className={label}>{t("petName")}</label>
            <input
              className={fieldErrors.petName ? inputErr : inputOk}
              style={{ fontFamily: "'Courier Prime', 'Source Code Pro', monospace" }}
              value={petName}
              onChange={(e) => {
                setPetName(e.target.value.slice(0, 100));
                if (e.target.value.trim()) setFieldErrors((p) => { const n = { ...p }; delete n.petName; return n; });
              }}
              placeholder="e.g. Buddy, Luna, Oliver…"
              maxLength={100}
            />
            {fieldErrors.petName && errMsg(fieldErrors.petName)}
          </div>

          <div>
            <label className={label}>{t("petType")}</label>
            <select className={inputOk} value={petType} onChange={(e) => setPetType(e.target.value)}>
              {PET_TYPES.map((type) => (
                <option key={type} value={type}>{t(`petType_${type}`)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>{t("breed")}</label>
            <input
              className={inputOk}
              value={breed}
              onChange={(e) => setBreed(e.target.value.slice(0, 80))}
              placeholder="e.g. German Shepherd"
              maxLength={80}
            />
          </div>
        </>
      )}

      {/* ── Step 2: Memorial + Age + Date ── */}
      {showStep2 && (
        <>
          <div>
            <label className={label}>
              {t("memorialText")}{" "}
              <span
                style={{
                  fontWeight: memorialText.length > 540 ? 700 : "normal",
                  color: memorialText.length > 540 ? "#EF4444" : "#9CA3AF",
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                ({memorialText.length}/600)
              </span>
            </label>
            <textarea
              className={(fieldErrors.memorialText ? inputErr : inputOk) + " resize-none"}
              style={{ fontFamily: "'Courier Prime', 'Source Code Pro', monospace", minHeight: 96 }}
              value={memorialText}
              onChange={(e) => {
                setMemorialText(e.target.value.slice(0, 600));
                if (e.target.value.trim()) setFieldErrors((p) => { const n = { ...p }; delete n.memorialText; return n; });
              }}
              placeholder={t("memorialPlaceholder")}
              maxLength={600}
              rows={4}
            />
            {fieldErrors.memorialText && errMsg(fieldErrors.memorialText)}
          </div>

          <div>
            <label className={label}>{t("age")}</label>
            <input
              className={inputOk}
              value={ageYears}
              onChange={(e) => setAgeYears(e.target.value.slice(0, 40))}
              placeholder="e.g. 13 years"
              maxLength={40}
            />
          </div>

          <div>
            <label className={label}>{t("dateOfPassing")}</label>
            <input
              type="date"
              className={inputOk}
              value={datePassing}
              onChange={(e) => setDatePassing(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </>
      )}

      {/* ── Step 3: Photos + City ── */}
      {showStep3 && (
        <>
          {/* Photos */}
          <div>
            <label className={label}>
              {t("photos")}{" "}
              <span className="text-gray-400 font-normal normal-case">({imagePreviews.length}/3)</span>
            </label>

            {imagePreviews.length > 0 && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {imagePreviews.map((src, i) => (
                  <div key={i} style={{ position: "relative", width: 72, height: 72 }}>
                    <img
                      src={src}
                      alt={`Photo ${i + 1}`}
                      style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 10, border: "1px solid #E8DDD0" }}
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
                      border: "2px dashed #E8DDD0",
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
                className="cursor-pointer flex items-center justify-center border-2 border-dashed border-[#E8DDD0] rounded-xl hover:border-[#2A6B4A] transition-colors"
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

            {fieldErrors.photo && errMsg(fieldErrors.photo)}

            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* Location */}
          <div>
            <label className={label}>{t("cityLocation")}</label>
            <LocationSearch
              onSelect={(r) => {
                setLocation(r);
                setFieldErrors((p) => { const n = { ...p }; delete n.location; return n; });
              }}
              required
            />
            {location && (
              <div className="mt-1 text-xs font-medium" style={{ color: "#2A6B4A" }}>
                📍 {location.city}, {location.country}
              </div>
            )}
            {fieldErrors.location && errMsg(fieldErrors.location)}
          </div>
        </>
      )}

      {/* Global error */}
      {globalError && (
        <div className="text-red-600 text-xs bg-red-50 border border-red-100 rounded-lg p-3">{globalError}</div>
      )}

      {/* Mobile navigation */}
      {isMobile && (
        <div style={{ display: "flex", gap: 8 }}>
          {mobileStep > 1 && (
            <button
              type="button"
              onClick={() => { setMobileStep((s) => s - 1); setFieldErrors({}); }}
              style={{
                flex: "0 0 auto", padding: "13px 18px", borderRadius: 12, border: "1.5px solid #E8DDD0",
                background: "white", color: "#374151", fontSize: 14, fontWeight: 600, cursor: "pointer",
              }}
            >
              ← {t("back")}
            </button>
          )}
          {mobileStep < 3 ? (
            <button
              type="button"
              onClick={goNext}
              style={{
                flex: 1, padding: "13px", borderRadius: 12, border: "none",
                background: "#2A6B4A",
                color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              {t("continue")}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || imageLoading}
              style={{
                flex: 1, padding: "0 20px", borderRadius: 24, border: "none",
                background: loading || imageLoading ? "#F3F4F6" : "#2A6B4A",
                color: loading || imageLoading ? "#9CA3AF" : "white",
                fontSize: 15, fontWeight: 700, height: 48,
                cursor: loading || imageLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? t("planting") : t("plantThisMemory")}
            </button>
          )}
        </div>
      )}

      {/* Desktop submit */}
      {!isMobile && (
        <button
          type="submit"
          disabled={loading || imageLoading}
          style={{
            width: "100%", padding: "0 20px", borderRadius: 24, border: "none",
            background: loading || imageLoading ? "#F3F4F6" : "#2A6B4A",
            color: loading || imageLoading ? "#9CA3AF" : "white",
            fontSize: 15, fontWeight: 700, height: 48,
            cursor: loading || imageLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? t("planting") : t("plantThisMemory")}
        </button>
      )}
    </form>
  );
}
