import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { sendTribute, getTributeLogs, getPet, patchPet, deletePet, type Pet, type TributeLog } from "../utils/api";
import { getSeedCount, getSeedResetAt, useSeed, getOwnerToken } from "../utils/localStorage";
import svgPaths from "../../imports/🔣Icons/svg-zcp33176r3";

const PET_TYPES = ["dog", "cat", "bird", "bunny", "reptile", "fish", "other"];

const PET_TYPE_COLORS: Record<string, string> = {
  dog: "#D4885A", cat: "#9ABCCC", bird: "#6AAA5A",
  bunny: "#E898B0", reptile: "#7AB87A", fish: "#E8A030", other: "#B898CC",
};
function getPetColor(type: string): string { return PET_TYPE_COLORS[type] || "#2A6B4A"; }

// Builds the same composite SVG used in map pins — white fills on colored bg
function buildPetIconHtml(type: string, size = 26): string {
  const fw = 'fill="rgba(255,255,255,0.92)"';
  const fl = 'fill="rgba(255,255,255,0.70)"';
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
const TRIBUTE_EMOJI: Record<string, string> = { flower: "🌸", treat: "🍖", toy: "🧸" };

// SVG tribute icons (flower / toy / treat) with actual Figma colors
function buildTributeIconHtml(type: string, size = 40): string {
  const s  = 'fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"';
  const sm = 'fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"';
  const icons: Record<string, string> = {
    flower: `
      <g transform="translate(5.67,5.67)">
        <path d="${svgPaths.p98f1000}" fill="#DA6D68" stroke="#DA6D68" stroke-miterlimit="10" stroke-width="2"/>
        <path d="${svgPaths.p2e8d9700}" fill="#EC8F83"/>
        <path d="${svgPaths.p301de600}" fill="#FDC677" stroke="#FDC677" stroke-miterlimit="10" stroke-width="2"/>
        <path d="${svgPaths.p2e36cb40}" fill="#F8EA54" stroke="#F8EA54" stroke-miterlimit="10" stroke-width="2"/>
      </g>
      <g transform="translate(5.67,5.67)">
        <path d="${svgPaths.p2e8d9700}" ${s}/><path d="${svgPaths.p16c4be00}" ${s}/>
        <path d="${svgPaths.pc5c7200}" ${s}/><path d="${svgPaths.p1df06fe0}" ${s}/>
        <path d="${svgPaths.p16c14800}" ${s}/>
        <path d="${svgPaths.p301de600}" fill="none" stroke="black" stroke-linejoin="round" stroke-width="2"/>
        <path d="${svgPaths.p2e36cb40}" fill="none" stroke="black" stroke-linejoin="round" stroke-width="2"/>
      </g>`,
    toy: `
      <g transform="translate(6.67,3.40)">
        <path d="${svgPaths.p363e300}" fill="#D7D68D"/><path d="${svgPaths.p3482d080}" fill="#D7D68D"/>
        <path d="${svgPaths.p2d8ef500}" fill="#82BDB3"/><path d="${svgPaths.p300e8700}" fill="#D7D68D"/>
        <path d="${svgPaths.p12f98300}" fill="#3F3F3F"/><path d="${svgPaths.p278ebb80}" fill="#D7D68D"/>
        <path d="${svgPaths.p228b7000}" fill="#D7D68D"/>
      </g>
      <g transform="translate(6.33,2.40)">
        <path d="${svgPaths.p29da4c80}" fill="black"/><path d="${svgPaths.p1a8b0b80}" fill="black"/>
        <path d="${svgPaths.p369f5d00}" ${s}/><path d="${svgPaths.p1dccf800}" ${sm}/>
        <path d="${svgPaths.p135c300}" ${sm}/><path d="${svgPaths.p1048fa00}" ${sm}/>
        <path d="${svgPaths.p340bd400}" ${sm}/><path d="${svgPaths.p2cb2ac00}" ${sm}/>
        <path d="${svgPaths.p33511b00}" ${sm}/><path d="${svgPaths.p1471f500}" ${sm}/>
        <path d="${svgPaths.p26067000}" ${sm}/>
        <path d="M17.6667 19.1563V21.1563" ${s}/><path d="${svgPaths.p1f531b80}" ${s}/>
        <path d="${svgPaths.p1a329580}" ${s}/><path d="${svgPaths.p3c9c3ee0}" ${s}/>
        <path d="${svgPaths.p3a0f3800}" ${s}/><path d="${svgPaths.p296756e0}" ${s}/>
        <path d="${svgPaths.p74cfe80}" ${s}/>
      </g>`,
    treat: `
      <g transform="translate(5.33,5.33)">
        <path d="${svgPaths.p3b677100}" fill="#B68647"/><path d="${svgPaths.p2f507580}" fill="#89654D"/>
        <path d="${svgPaths.p13b0dc00}" fill="#89654D"/><path d="${svgPaths.p75e370}" fill="#89654D"/>
        <path d="${svgPaths.p283a2300}" fill="#89654D"/><path d="${svgPaths.p97304f0}" fill="#89654D"/>
        <path d="${svgPaths.p337c800}" fill="#89654D"/><path d="${svgPaths.p392d9800}" fill="#89654D"/>
      </g>
      <g transform="translate(4.36,4.28)">
        <path d="${svgPaths.p32fc1230}" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p123c2b00}" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p106411f0}" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p37a91c00}" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.pe90ec80}"  fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p1e9a280}"  fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p45de800}"  fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
        <path d="${svgPaths.p7782e00}"  fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.9394"/>
      </g>`,
  };
  const body = icons[type] || "";
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${body}</svg>`;
}
const META_SEP = "\n\n---kindred-meta---\n";

interface PetMeta {
  breed?: string;
  age_years?: string;
  date_of_passing?: string;
}

function parseMemoText(raw: string): { text: string; meta: PetMeta } {
  const idx = raw.indexOf(META_SEP);
  if (idx === -1) return { text: raw, meta: {} };
  const text = raw.slice(0, idx);
  try {
    const meta = JSON.parse(raw.slice(idx + META_SEP.length));
    return { text, meta };
  } catch {
    return { text, meta: {} };
  }
}

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

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

async function getTributerLocation(): Promise<{ city: string; country: string }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ city: "Unknown location", country: "" });
    const timer = setTimeout(() => resolve({ city: "Unknown location", country: "" }), 6000);
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
            data.address?.city || data.address?.town ||
            data.address?.village || data.address?.county || "Unknown location";
          resolve({ city, country: data.address?.country || "" });
        } catch {
          resolve({ city: "Unknown location", country: "" });
        }
      },
      () => { clearTimeout(timer); resolve({ city: "Unknown location", country: "" }); },
      { timeout: 6000, maximumAge: 300_000 }
    );
  });
}

// Lightweight language detection using Unicode ranges and stop-word scoring.
// Returns a 2-char lang code (en/es/fr/zh/ja/ko/ru/pt/fil) or null if uncertain.
function detectTextLanguage(text: string): string | null {
  if (text.length < 15) return null;
  if (/[぀-ヿ]/.test(text)) return "ja"; // hiragana / katakana
  if (/[一-鿿㐀-䶿]/.test(text)) return "zh"; // CJK
  if (/[가-힯ᄀ-ᇿ]/.test(text)) return "ko"; // Hangul
  if (/[Ѐ-ӿ]/.test(text)) return "ru"; // Cyrillic
  const words = text.toLowerCase().split(/[\s,!?.;:()"']+/).filter((w) => w.length > 1);
  if (words.length < 4) return null;
  const sw: Record<string, string[]> = {
    es: ["el","la","los","las","de","que","y","en","un","una","es","con","por","para","se","del","al","me","mi","su"],
    fr: ["le","la","les","de","et","est","en","un","une","du","des","que","je","il","nous","vous","sur","pas","plus","au"],
    pt: ["de","e","em","um","uma","com","por","para","se","do","da","dos","das","ao","mas","como","seu","sua","ele","ela"],
    fil:["ang","ng","sa","na","at","ay","mga","ko","ako","siya","niya","naman","po","din","ito","nang","wala","kaya"],
    en: ["the","is","was","are","and","of","to","in","that","he","she","it","we","they","my","you","me","this","her","his"],
  };
  const scores: Record<string, number> = { es:0, fr:0, pt:0, fil:0, en:0 };
  for (const w of words) for (const [lang, list] of Object.entries(sw)) if (list.includes(w)) scores[lang]++;
  const max = Math.max(...Object.values(scores));
  if (max < 2) return null;
  return Object.entries(scores).sort(([,a],[,b]) => b - a)[0][0];
}

interface Props {
  pet: Pet;
  onClose: () => void;
  onTributeSuccess: (pet: Pet) => void;
  onToast?: (msg: string) => void;
  onPetDeleted?: (id: string) => void;
}

export function PetModal({ pet, onClose, onTributeSuccess, onToast, onPetDeleted }: Props) {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState<Pet>(pet);
  const [seeds, setSeeds] = useState(getSeedCount);
  const [countdown, setCountdown] = useState("");
  const [tab, setTab] = useState<"memorial" | "log">("memorial");
  const [logs, setLogs] = useState<TributeLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [tributeLoading, setTributeLoading] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [translated, setTranslated] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translateError, setTranslateError] = useState("");
  const [dropEmoji, setDropEmoji] = useState<{ html: string; key: number } | null>(null);

  const [isOwner, setIsOwner] = useState(
    () => !!localStorage.getItem('kindred_owner_token_' + pet.id)
  );

  // Owner sub-view within the "log" tab
  const [ownerView, setOwnerView] = useState<"log" | "edit" | "delete">("log");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("dog");
  const [editBreed, setEditBreed] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editText, setEditText] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete state
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // If the local key is absent (e.g. different device, or localStorage was cleared),
  // ask the server: send our global owner token and see if it matches.
  // The server echoes back owner_token only when the tokens match.
  useEffect(() => {
    if (isOwner) return;
    const token = getOwnerToken();
    getPet(pet.id, token).then((data) => {
      if (data?.owner_token) {
        localStorage.setItem('kindred_owner_token_' + pet.id, token);
        setIsOwner(true);
      }
    }).catch(() => {});
  }, [pet.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const { text: memoText, meta } = parseMemoText(current.memorial_text);
  const photos = parsePhotoUrls(current.photo_url);

  // Derive user's 2-char lang from i18next and detect memorial text language.
  // Hide the translate button when the text appears to already be in the user's language.
  const userLang = useMemo(() => i18n.language.split("-")[0].toLowerCase().slice(0, 2) || "en", [i18n.language]);
  const detectedLang = useMemo(() => detectTextLanguage(memoText), [memoText]);
  const showTranslateButton = detectedLang === null || detectedLang !== userLang;

  // Seed countdown
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

  // Load tribute logs when owner opens the log tab
  const loadLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const token = localStorage.getItem('kindred_owner_token_' + pet.id) || "";
      const data = await getTributeLogs(pet.id, token);
      setLogs(data);
    } catch {}
    setLogsLoading(false);
  }, [pet.id]);

  useEffect(() => {
    if (tab === "log" && isOwner) loadLogs();
  }, [tab, isOwner, loadLogs]);

  const handleTribute = async (type: "flower" | "treat" | "toy") => {
    if (seeds <= 0 || tributeLoading) return;
    if (!useSeed()) return;
    setSeeds(getSeedCount());
    setTributeLoading(type);

    setLocating(true);
    const loc = await getTributerLocation();
    setLocating(false);

    setDropEmoji({ html: buildTributeIconHtml(type, 52), key: Date.now() });
    setTimeout(() => setDropEmoji(null), 2600);

    try {
      const counts = await sendTribute(pet.id, type, loc.city, loc.country);
      const updated: Pet = { ...current, ...counts };
      setCurrent(updated);
      onTributeSuccess(updated);
      const fromLabel = loc.city && loc.city !== "Unknown location" ? ` from ${loc.city}` : "";
      const iconHtml = buildTributeIconHtml(type, 20);
      onToast?.(`<span style="display:inline-flex;align-items:center;gap:6px;vertical-align:middle">${iconHtml}<span>You sent a ${type} to ${current.pet_name}${fromLabel}</span></span>`);
    } catch (e) {
      console.log("Tribute error:", e);
    }
    setTributeLoading(null);
  };

  const handleTranslate = async () => {
    if (translated !== null) { setShowTranslation((v) => !v); return; }
    setTranslating(true);
    setTranslateError("");
    try {
const sourceLang = detectedLang || "es";
const res = await fetch(
  `https://api.mymemory.translated.net/get?q=${encodeURIComponent(memoText.slice(0, 450))}&langpair=${sourceLang}|${userLang}`
);
      if (!res.ok) throw new Error("HTTP error");
      const data = await res.json();
      const status = Number(data.responseStatus);
      if (status === 200) {
        const tx: string = data.responseData.translatedText || "";
        // Treat as "same language" if the translation is identical or MyMemory warns quota exceeded
        const isSame =
          tx.trim().toLowerCase().replace(/\s+/g, " ") ===
          memoText.trim().toLowerCase().replace(/\s+/g, " ") ||
          tx.toUpperCase().includes("MYMEMORY WARNING") ||
          tx.toUpperCase().includes("QUOTA");
        setTranslated(isSame ? "__same__" : tx);
        if (!isSame) setShowTranslation(true);
      } else {
        throw new Error(data.responseDetails || `Status ${status}`);
      }
    } catch (e) {
      console.log("Translation error:", e);
      setTranslateError("Translation unavailable");
    }
    setTranslating(false);
  };

  const openEdit = () => {
    const { text, meta } = parseMemoText(current.memorial_text);
    setEditName(current.pet_name);
    setEditType(current.pet_type);
    setEditBreed(meta.breed || "");
    setEditAge(meta.age_years || "");
    setEditDate(meta.date_of_passing || "");
    setEditText(text);
    setEditError("");
    setOwnerView("edit");
  };

  const handleEditSave = async () => {
    if (!editName.trim() || !editText.trim()) {
      setEditError("Pet name and memorial text are required.");
      return;
    }
    setEditSaving(true);
    setEditError("");
    try {
      const metaObj: Record<string, string> = {};
      if (editBreed.trim()) metaObj.breed = editBreed.trim();
      if (editAge.trim()) metaObj.age_years = editAge.trim();
      if (editDate) metaObj.date_of_passing = editDate;
      const fullText = Object.keys(metaObj).length > 0
        ? editText + META_SEP + JSON.stringify(metaObj)
        : editText;
      const token = localStorage.getItem("kindred_owner_token_" + pet.id) || "";
      const updated = await patchPet(pet.id, token, {
        pet_name: editName.trim(),
        pet_type: editType,
        memorial_text: fullText,
      });
      setCurrent(updated);
      setOwnerView("log");
      onToast?.(t("memorialUpdated"));
    } catch (err) {
      setEditError(String(err));
    }
    setEditSaving(false);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const token = localStorage.getItem("kindred_owner_token_" + pet.id) || "";
      await deletePet(pet.id, token);
      localStorage.removeItem("kindred_owner_token_" + pet.id);
      onPetDeleted?.(pet.id);
      onClose();
    } catch (err) {
      setDeleteError(String(err));
      setDeleteLoading(false);
    }
  };

  const tributeButtons = [
    { type: "flower" as const, count: current.flowers },
    { type: "treat" as const, count: current.treats },
    { type: "toy" as const, count: current.toys },
  ];

  const stackRotations = [-7, 4, -3];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 12px", fontSize: 13, borderRadius: 10,
    border: "1px solid #E8DDD0", outline: "none", background: "white",
    boxSizing: "border-box",
  };

  // Edit form field definitions (built here so t() is in component scope)
  const editFields = [
    { key: "petName",       label: t("petName"),       node: (
      <input value={editName} onChange={(e) => setEditName(e.target.value.slice(0, 100))}
        maxLength={100} style={inputStyle} placeholder="e.g. Buddy" />
    )},
    { key: "petType",       label: t("petType"),       node: (
      <select value={editType} onChange={(e) => setEditType(e.target.value)} style={inputStyle}>
        {PET_TYPES.map((typeKey) => (
          <option key={typeKey} value={typeKey}>{t(`petType_${typeKey}`)}</option>
        ))}
      </select>
    )},
    { key: "breed",         label: t("breed"),         node: (
      <input value={editBreed} onChange={(e) => setEditBreed(e.target.value.slice(0, 80))}
        maxLength={80} style={inputStyle} placeholder="e.g. Labrador" />
    )},
    { key: "age",           label: t("age"),           node: (
      <input value={editAge} onChange={(e) => setEditAge(e.target.value.slice(0, 40))}
        maxLength={40} style={inputStyle} placeholder="e.g. 13 years" />
    )},
    { key: "dateOfPassing", label: t("dateOfPassing"), node: (
      <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]} style={inputStyle} />
    )},
  ];

  return (
    <>
      {/* Parachute tribute drop animation */}
      {dropEmoji && (
        <div
          key={dropEmoji.key}
          style={{
            position: "fixed",
            top: 0,
            left: "50%",
            zIndex: 9999,
            pointerEvents: "none",
            animation: "kt-parachute 2.5s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
          }}
          dangerouslySetInnerHTML={{ __html: dropEmoji.html }}
        />
      )}

      <style>{`
        @keyframes kt-parachute {
          0%   { top: 2%;  transform: translateX(-50%) rotate(0deg);         opacity: 1; }
          15%  {           transform: translateX(calc(-50% - 22px)) rotate(-14deg); }
          30%  {           transform: translateX(calc(-50% + 22px)) rotate(10deg);  }
          45%  {           transform: translateX(calc(-50% - 14px)) rotate(-8deg);  }
          60%  {           transform: translateX(calc(-50% + 10px)) rotate(5deg);   opacity: 1; }
          80%  { top: 78%; transform: translateX(calc(-50% - 6px)) rotate(-3deg);   opacity: 0.6; }
          100% { top: 88%; transform: translateX(-50%) rotate(0deg);         opacity: 0; }
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
            background: "white", borderRadius: 24, width: "100%",
            maxWidth: 420, maxHeight: "92vh", overflowY: "auto",
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
            {/* ── Photo scrapbook ─────────────────────────────────────── */}
            {photos.length > 0 && (
              <div style={{ position: "relative", height: 175, marginBottom: 12, display: "flex", justifyContent: "center" }}>
                {photos.map((url, i) => {
                  const isActive = i === photoIdx;
                  return (
                    <div
                      key={url + i}
                      onClick={() => photos.length > 1 && setPhotoIdx((photoIdx + 1) % photos.length)}
                      style={{
                        position: "absolute",
                        transform: `rotate(${isActive ? 0 : stackRotations[i % 3]}deg) scale(${isActive ? 1 : 0.94})`,
                        zIndex: isActive ? 10 : photos.length - i,
                        cursor: photos.length > 1 ? "pointer" : "default",
                        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    >
                      <div style={{
                        padding: 4,
                        background: isActive ? "#2A6B4A" : "#E5E7EB",
                        borderRadius: 16,
                        boxShadow: isActive
                          ? "0 8px 24px rgba(42,107,74,0.3)"
                          : "0 2px 8px rgba(0,0,0,0.10)",
                      }}>
                        <img
                          src={url}
                          alt={current.pet_name}
                          style={{ width: 152, height: 152, objectFit: "cover", borderRadius: 13, display: "block" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Photo dot nav */}
            {photos.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 }}>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    style={{
                      width: i === photoIdx ? 20 : 6, height: 6, borderRadius: 3,
                      background: i === photoIdx ? "#2A6B4A" : "#E8DDD0",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.3s", minWidth: 0, minHeight: 0,
                    }}
                  />
                ))}
              </div>
            )}

            {/* No photo placeholder */}
            {photos.length === 0 && (
              <div
                style={{
                  width: 80, height: 80, borderRadius: 16, margin: "0 auto 12px",
                  background: getPetColor(current.pet_type),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
                dangerouslySetInnerHTML={{ __html: buildPetIconHtml(current.pet_type, 52) }}
              />
            )}

            {/* ── Name + location ─────────────────────────────────────── */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{
                fontFamily: "'Courier Prime','Source Code Pro',monospace",
                fontSize: 22, fontWeight: 700, color: "#111827", marginBottom: 4,
              }}>{current.pet_name}</h2>
              <p style={{ fontSize: 13, color: "#9CA3AF", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, flexWrap: "wrap" }}>
                <span
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: 6, background: getPetColor(current.pet_type), overflow: "hidden", flexShrink: 0, verticalAlign: "middle" }}
                  dangerouslySetInnerHTML={{ __html: buildPetIconHtml(current.pet_type, 18) }}
                />
                <span>{current.pet_type}{meta.breed && ` · ${meta.breed}`}{" · "}{current.city}, {current.country}</span>
              </p>
              {(meta.age_years || meta.date_of_passing) && (
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>
                  {meta.age_years && `🕰 ${meta.age_years}`}
                  {meta.age_years && meta.date_of_passing && " · "}
                  {meta.date_of_passing && `🕊 ${formatDate(meta.date_of_passing)}`}
                </p>
              )}
            </div>

            {/* ── Owner tabs ──────────────────────────────────────────── */}
            {isOwner && (
              <div style={{
                display: "flex", borderRadius: 12, overflow: "hidden",
                border: "1px solid #E8DDD0", marginBottom: 16, background: "#F5F0E8",
              }}>
                {(["memorial", "log"] as const).map((tabKey) => (
                  <button
                    key={tabKey}
                    onClick={() => setTab(tabKey)}
                    style={{
                      flex: 1, padding: "10px 8px", border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                      background: tab === tabKey ? "#2A6B4A" : "#F5F0E8",
                      color: tab === tabKey ? "white" : "#5A4A3A",
                      borderRadius: tab === tabKey ? 11 : 0,
                      minHeight: 44,
                    }}
                  >
                    {tabKey === "memorial" ? t("memorial") : t("yourMemorial")}
                  </button>
                ))}
              </div>
            )}

            {/* ── Memorial tab ─────────────────────────────────────────── */}
            {tab === "memorial" ? (
              <>
                <div style={{
                  fontFamily: "'Courier Prime','Source Code Pro',monospace",
                  fontSize: 13, color: "#374151", lineHeight: 1.7,
                  background: "#F9FAFB", borderRadius: 14, padding: 16, marginBottom: 12,
                  border: "1px solid #F3F4F6",
                  maxHeight: 180, overflowY: "auto",
                }}>
                  {showTranslation && translated && translated !== "__same__"
                    ? translated
                    : memoText}
                </div>

                {/* Share button */}
                <div style={{ marginBottom: 10, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}${window.location.pathname}?pet=${current.id}`;
                      navigator.clipboard.writeText(url).then(() => {
                        onToast?.(t("linkCopied"));
                      }).catch(() => {
                        onToast?.(t("linkCopied"));
                      });
                    }}
                    style={{
                      background: "#F3F4F6", border: "none", cursor: "pointer",
                      fontSize: 12, color: "#374151", fontWeight: 600,
                      borderRadius: 10, padding: "7px 14px",
                      display: "flex", alignItems: "center", gap: 5,
                      minHeight: 36,
                    }}
                  >
                    {t("shareMemorial")}
                  </button>
                </div>

                {/* Translation — only shown when text appears to be in a foreign language */}
                {(showTranslateButton || translated !== null) && (
                  <div style={{ marginBottom: 12, textAlign: "right" }}>
                    {translated === "__same__" ? (
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>Already in your language</span>
                    ) : (
                      <>
                        <button
                          onClick={handleTranslate}
                          disabled={translating}
                          style={{
                            background: "none", border: "none", cursor: translating ? "not-allowed" : "pointer",
                            fontSize: 11, color: "#2A6B4A", fontWeight: 600,
                            minHeight: 44, padding: "0 4px",
                            opacity: translating ? 0.6 : 1,
                          }}
                        >
                          {translating ? t("translating") : showTranslation ? t("seeOriginal") : t("seeTranslation")}
                        </button>
                        {translateError && (
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{translateError}</div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* Personality tags (legacy) */}
                {(current.personality_tags || []).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {current.personality_tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 12, padding: "4px 10px", borderRadius: 20,
                        background: "#2A6B4A", color: "white",
                      }}>{tag}</span>
                    ))}
                  </div>
                )}

                {/* Seeds row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{t("tributeSeeds")}</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: i < seeds ? "#2A6B4A" : "#E8DDD0",
                          transition: "background 0.3s",
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>{seeds}/5 ⚡</span>
                  </div>
                  {seeds <= 0 && countdown && (
                    <span style={{ fontSize: 11, color: "#F97316" }}>{t("resetsIn")} {countdown}</span>
                  )}
                </div>

                {locating && (
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 8, textAlign: "center" }}>
                    {t("detectingCity")}
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
                          border: "1px solid #E8DDD0",
                          background: sending ? "#2A6B4A" : canTribute ? "white" : "#FAFAFA",
                          opacity: canTribute ? 1 : 0.5,
                          cursor: canTribute ? "pointer" : "not-allowed",
                          transform: sending ? "scale(0.95)" : "scale(1)",
                          transition: "all 0.15s",
                          minHeight: 44,
                        }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: buildTributeIconHtml(type, 40) }} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: sending ? "white" : "#374151" }}>
                          {t(type)}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: sending ? "rgba(255,255,255,0.85)" : "#2A6B4A" }}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              /* ── Your Memorial tab ──────────────────────────────────── */
              <div>

                {/* ── Edit form ── */}
                {ownerView === "edit" && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14 }}>
                      {t("editMemorial")}
                    </div>

                    {editFields.map(({ key, label, node }) => (
                      <div key={key} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                        {node}
                      </div>
                    ))}

                    <div style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {t("memorialText")} <span style={{ color: editText.length > 900 ? "#EF4444" : "#9CA3AF", fontWeight: 400 }}>({editText.length}/1000)</span>
                      </div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value.slice(0, 1000))}
                        maxLength={1000}
                        rows={5}
                        style={{ ...inputStyle, resize: "none", fontFamily: "'Courier Prime','Source Code Pro',monospace" }}
                        placeholder={t("memorialPlaceholder")}
                      />
                    </div>

                    {editError && (
                      <div style={{ color: "#EF4444", fontSize: 12, marginBottom: 10, background: "#FEF2F2", borderRadius: 8, padding: "8px 12px" }}>{editError}</div>
                    )}

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => setOwnerView("log")}
                        style={{ flex: 1, padding: "11px", borderRadius: 12, border: "1px solid #E8DDD0", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        {t("cancel")}
                      </button>
                      <button
                        type="button"
                        onClick={handleEditSave}
                        disabled={editSaving}
                        style={{ flex: 2, padding: "11px", borderRadius: 12, border: "none", background: editSaving ? "#F3F4F6" : "#2A6B4A", color: editSaving ? "#9CA3AF" : "white", fontSize: 13, fontWeight: 700, cursor: editSaving ? "not-allowed" : "pointer" }}
                      >
                        {editSaving ? t("saving") : t("saveChanges")}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Delete confirmation ── */}
                {ownerView === "delete" && (
                  <div style={{ textAlign: "center", padding: "8px 0" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🕊️</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 8 }}>
                      {t("areYouSure")}
                    </div>
                    <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 20 }}>
                      {t("removeConfirm", { name: current.pet_name })}
                    </div>

                    {deleteError && (
                      <div style={{ color: "#EF4444", fontSize: 12, marginBottom: 12, background: "#FEF2F2", borderRadius: 8, padding: "8px 12px" }}>{deleteError}</div>
                    )}

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => setOwnerView("log")}
                        style={{ flex: 1, padding: "11px", borderRadius: 12, border: "1px solid #E8DDD0", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        {t("keepMemorial")}
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteConfirm}
                        disabled={deleteLoading}
                        style={{ flex: 1, padding: "11px", borderRadius: 12, border: "none", background: deleteLoading ? "#F3F4F6" : "#EF4444", color: deleteLoading ? "#9CA3AF" : "white", fontSize: 13, fontWeight: 700, cursor: deleteLoading ? "not-allowed" : "pointer" }}
                      >
                        {deleteLoading ? t("removing") : t("removeForever")}
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Log view (default) ── */}
                {ownerView === "log" && (
                  <>
                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={openEdit}
                      style={{ width: "100%", padding: "12px", borderRadius: 14, border: "1px solid #E8DDD0", background: "white", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 8, textAlign: "center" }}
                    >
                      {t("editMemorial")}
                    </button>

                    {/* Delete link */}
                    <button
                      type="button"
                      onClick={() => { setDeleteError(""); setOwnerView("delete"); }}
                      style={{ width: "100%", padding: "4px", background: "none", border: "none", color: "#EF4444", fontSize: 12, cursor: "pointer", marginBottom: 16, textAlign: "center" }}
                    >
                      {t("removeMemorial")}
                    </button>

                    {/* Tribute totals */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                      {tributeButtons.map(({ type, count }) => (
                        <div key={type} style={{
                          textAlign: "center", background: "#F9FAFB",
                          borderRadius: 14, padding: "12px 8px", border: "1px solid #F3F4F6",
                        }}>
                          <div style={{ display: "flex", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: buildTributeIconHtml(type, 32) }} />
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                            {t(type)}s
                          </div>
                          <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{count}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                      {t("tributeLog")}
                    </div>

                    {logsLoading ? (
                      <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, padding: 24 }}>{t("loading")}</div>
                    ) : logs.length === 0 ? (
                      <div style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, padding: 24 }}>
                        {t("noTributes")}
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 260, overflowY: "auto" }}>
                        {logs.map((log) => (
                          <div key={log.id} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "10px 12px", borderRadius: 12, background: "#F9FAFB",
                          }}>
                            <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: buildTributeIconHtml(log.tribute_type, 26) }} />
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
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
