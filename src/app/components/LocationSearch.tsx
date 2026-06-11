import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

export interface LocationResult {
  city: string;
  country: string;
  displayName: string;
  lat: number;
  lng: number;
}

interface Props {
  onSelect: (result: LocationResult) => void;
  required?: boolean;
}

export function LocationSearch({ onSelect, required }: Props) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LocationResult | null>(null);
  const [noResults, setNoResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); setNoResults(false); return; }
    setLoading(true);
    setNoResults(false);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6&featuretype=city`;
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      const mapped: LocationResult[] = (data as any[])
        .filter((item: any) => item.address)
        .map((item: any) => {
          const addr = item.address;
          const city =
            addr.city || addr.town || addr.village || addr.municipality || addr.county || q;
          const country = addr.country || "";
          return {
            city,
            country,
            displayName: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          };
        })
        .filter((r) => r.city);
      setResults(mapped);
      setOpen(mapped.length > 0);
      setNoResults(mapped.length === 0);
    } catch {
      setResults([]);
      setOpen(false);
    }
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(null);
    setNoResults(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 350);
  };

  const handleSelect = (r: LocationResult) => {
    setSelected(r);
    setQuery(`${r.city}, ${r.country}`);
    setOpen(false);
    onSelect(r);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 bg-white transition-all";

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <input
          className={inputClass}
          value={query}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={t("searchCity")}
          required={required && !selected}
          autoComplete="off"
        />
        {loading && (
          <div style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            width: 14, height: 14, border: "2px solid #E5E7EB",
            borderTopColor: "#06B6D4", borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }} />
        )}
        {selected && !loading && (
          <div style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            color: "#10B981", fontSize: 14, fontWeight: 700,
          }}>✓</div>
        )}
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "1px solid #E5E7EB", borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 900, overflow: "hidden",
        }}>
          {results.map((r, i) => (
            <div
              key={i}
              onMouseDown={() => handleSelect(r)}
              style={{
                padding: "9px 12px", cursor: "pointer", fontSize: 13,
                borderBottom: i < results.length - 1 ? "1px solid #F3F4F6" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <div style={{ fontWeight: 600, color: "#111827" }}>{r.city}, {r.country}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {r.displayName}
              </div>
            </div>
          ))}
        </div>
      )}

      {noResults && !loading && !open && (
        <div style={{ marginTop: 4, fontSize: 12, color: "#EF4444", fontWeight: 500 }}>
          {t("cityNotFound")}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }`}</style>
    </div>
  );
}
