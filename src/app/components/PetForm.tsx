import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createPet, uploadPhoto, type Pet } from "../utils/api";
import svgPaths from "../../imports/🔣Icons/svg-zcp33176r3";
import { compressImage } from "../utils/imageCompression";
import { getOwnerToken, saveUserCity, saveOwnedPet } from "../utils/localStorage";
import { LocationSearch, type LocationResult } from "./LocationSearch";

const PET_TYPES = ["dog", "cat", "bird", "bunny", "reptile", "fish", "other"];
const META_SEP = "\n\n---kindred-meta---\n";

const PET_TYPE_COLORS: Record<string, string> = {
  dog: "#D4885A", cat: "#9ABCCC", bird: "#6AAA5A",
  bunny: "#E898B0", reptile: "#7AB87A", fish: "#E8A030", other: "#B898CC",
};
function getPetColor(type: string): string { return PET_TYPE_COLORS[type] || "#2A6B4A"; }
function buildPetIconHtml(type: string, size = 36): string {
  const fw = 'fill="rgba(255,255,255,0.92)"'; const fl = 'fill="rgba(255,255,255,0.70)"';
  const s  = 'fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const sm = 'fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"';
  const icons: Record<string, string> = {
    dog: `<g transform="translate(4.40,7.27)"><path d="${svgPaths.p32012100}" ${fw}/><path d="${svgPaths.p16127d00}" ${fl}/><path d="${svgPaths.p22fe2e80}" ${fl}/></g><g transform="translate(3.31,7.00)"><path d="${svgPaths.pac65c00}" ${s}/><path d="${svgPaths.p364500}" ${s}/><path d="${svgPaths.p338d8a00}" ${s}/><path d="${svgPaths.p35101500}" ${s}/><path d="${svgPaths.p2d547c00}" ${s}/><path d="${svgPaths.pa19eb80}" ${s}/></g>`,
    cat: `<g transform="translate(3.52,10.72)"><path d="${svgPaths.p30728340}" ${fw}/><path d="${svgPaths.pf444a00}" ${fw}/><path d="${svgPaths.p22c7c80}" ${fw}/></g><g transform="translate(2.27,9.79)"><path d="${svgPaths.pf863040}" ${s}/><path d="${svgPaths.p2f1cad00}" ${s}/><path d="${svgPaths.p1fb12d00}" ${s}/><path d="${svgPaths.p37c2adc0}" ${s}/><path d="${svgPaths.p38aa6380}" ${s}/><path d="${svgPaths.p2427ce00}" ${s}/></g>`,
    bird: `<g transform="translate(15.33,4.97)"><path d="${svgPaths.peb8000}" ${fw}/><path d="${svgPaths.p1a341200}" ${fl}/><path d="${svgPaths.p20526d00}" ${fw}/><path d="${svgPaths.p18d9bf00}" ${fl}/><path d="${svgPaths.p16e4c680}" ${fl}/><path d="${svgPaths.p1f8ce300}" ${fw}/></g><g transform="translate(7.67,3.97)"><path d="${svgPaths.pf24b700}" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="2" stroke-miterlimit="10"/><path d="${svgPaths.p774b140}" ${s}/><path d="${svgPaths.p1456dc00}" ${s}/><path d="${svgPaths.p2cb32740}" ${s}/><path d="M15.4638 26.0257V30.6923" ${s}/><path d="M30.3915 30.6923H33" ${s}/><path d="M1 30.8071H20.993" ${s}/><path d="${svgPaths.p1863a600}" ${s}/><path d="${svgPaths.p4f86400}" ${s}/><path d="M19.4638 28.0257V30.6923" ${s}/></g>`,
    bunny: `<g transform="translate(6.28,7.84)"><path d="${svgPaths.p32592400}" ${fw}/><path d="${svgPaths.p380f6f40}" ${fw}/><path d="${svgPaths.p35081f00}" fill="rgba(255,200,220,0.85)"/><path d="${svgPaths.p2e679200}" fill="rgba(255,200,220,0.85)"/><path d="${svgPaths.pa5f0f00}" ${fw}/></g><g transform="translate(5.07,6.53)"><path d="${svgPaths.p22d59300}" ${s}/><path d="${svgPaths.p1d9adf00}" ${s}/><path d="${svgPaths.p1aa2fdc0}" ${s}/><path d="${svgPaths.p21044000}" ${s}/></g>`,
    fish: `<g transform="translate(11.27,11.87)"><path d="${svgPaths.p289aaf80}" fill="rgba(255,255,210,0.9)"/><path d="${svgPaths.pf8e6b00}" ${fw}/><path d="${svgPaths.p229dcd00}" ${fw}/><path d="${svgPaths.p33f88d80}" fill="rgba(255,255,210,0.9)"/><path d="${svgPaths.p2dfd200}" fill="rgba(255,220,160,0.9)"/><path d="${svgPaths.p34cfbc80}" ${fw}/></g><g transform="translate(7.67,10.46)"><path d="${svgPaths.p13031780}" ${s}/><path d="${svgPaths.p1ad19a80}" ${s}/><path d="${svgPaths.p68d3480}" ${s}/><path d="${svgPaths.p1dace880}" ${s}/><path d="${svgPaths.p26bfdd00}" ${s}/><path d="${svgPaths.p2bdab900}" ${s}/></g>`,
    reptile: `<g transform="translate(2.92,10.13)"><path d="${svgPaths.pa506c00}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.pa188980}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p3c72e400}" fill="rgba(170,210,170,0.9)"/><path d="${svgPaths.p1efa0d00}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p1395bf80}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p3ffb5e00}" fill="rgba(170,210,170,0.9)"/></g><g transform="translate(2.92,10.13)"><path d="${svgPaths.pd6ba80}" ${sm}/><path d="${svgPaths.p1c1f0d80}" ${sm}/><path d="${svgPaths.p3c930600}" ${sm}/><path d="${svgPaths.p1f630a40}" ${sm}/><path d="${svgPaths.p361eed80}" ${sm}/><path d="${svgPaths.pe18c580}" ${sm}/><path d="${svgPaths.p3f1a540}" ${sm}/><path d="${svgPaths.p164758c0}" ${sm}/><path d="${svgPaths.p3b426c2a}" ${sm}/><path d="${svgPaths.p1db67480}" ${sm}/><path d="${svgPaths.p357fd480}" ${sm}/><path d="${svgPaths.p13b80e80}" ${sm}/></g>`,
    other: `<g transform="translate(7.86,5.09)"><path d="${svgPaths.p1ab01e00}" ${fl}/><path d="${svgPaths.p3c9c7a00}" ${fl}/><path d="${svgPaths.p17c6aa00}" ${fl}/><path d="${svgPaths.p39822c00}" ${fl}/><path d="${svgPaths.p1a5a9200}" ${fl}/><path d="${svgPaths.p30386780}" ${fl}/><path d="${svgPaths.p18f71500}" ${fl}/><path d="${svgPaths.p22483970}" ${fl}/><path d="${svgPaths.p2a78bc30}" ${fl}/><path d="${svgPaths.p252f5600}" ${fl}/></g><g transform="translate(6.38,3.50)"><path d="${svgPaths.p636fff0}" ${s}/><path d="${svgPaths.p3583cb00}" ${s}/><path d="${svgPaths.pd2c5c10}" ${s}/><path d="${svgPaths.p15c98800}" ${s}/><path d="${svgPaths.p1c6ade00}" ${s}/><path d="${svgPaths.p196a9b00}" ${s}/><path d="${svgPaths.p25b76000}" ${s}/><path d="${svgPaths.p209700f0}" ${s}/><path d="${svgPaths.p87b9000}" ${s}/><path d="${svgPaths.p284cf500}" ${s}/></g>`,
  };
  const body = icons[type] || icons.other;
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${body}</svg>`;
}
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
              {PET_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPetType(type)}
                  title={t(`petType_${type}`)}
                  style={{
                    width: 56, height: 56, borderRadius: 12, padding: 0,
                    border: petType === type ? "2px solid #2A6B4A" : "2px solid #E8DDD0",
                    background: getPetColor(type),
                    cursor: "pointer", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.15s, transform 0.1s",
                    transform: petType === type ? "scale(1.08)" : "scale(1)",
                    flexShrink: 0,
                    boxShadow: petType === type ? "0 2px 8px rgba(42,107,74,0.3)" : "none",
                  }}
                  dangerouslySetInnerHTML={{ __html: buildPetIconHtml(type, 36) }}
                />
              ))}
            </div>
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
