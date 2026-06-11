import { useEffect, useRef, useCallback, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Pet } from "../utils/api";
import { supabase } from "../utils/supabaseClient";
import svgPaths from "../../imports/🔣Icons/svg-zcp33176r3";

interface Props {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  onPetClick: (pet: Pet) => void;
  newPetId?: string | null;
}

interface Cluster {
  pets: Pet[];
  lat: number;
  lng: number;
}

interface Suggestion {
  label: string;
  lat: number;
  lng: number;
}

function computeClusters(pets: Pet[], zoom: number): Cluster[] {
  const radius = zoom < 3 ? 15 : zoom < 5 ? 8 : zoom < 7 ? 3 : zoom < 9 ? 1 : zoom < 11 ? 0.3 : 0.05;
  const clusters: Cluster[] = [];
  for (const pet of pets) {
    let merged = false;
    for (const c of clusters) {
      const dlat = pet.lat_fuzzy - c.lat;
      const dlng = pet.lng_fuzzy - c.lng;
      if (Math.sqrt(dlat * dlat + dlng * dlng) < radius) {
        c.pets.push(pet);
        c.lat = c.pets.reduce((s, p) => s + p.lat_fuzzy, 0) / c.pets.length;
        c.lng = c.pets.reduce((s, p) => s + p.lng_fuzzy, 0) / c.pets.length;
        merged = true;
        break;
      }
    }
    if (!merged) clusters.push({ pets: [pet], lat: pet.lat_fuzzy, lng: pet.lng_fuzzy });
  }
  return clusters;
}

// ── Pet-type brand colors ────────────────────────────────────────────────────
const PET_TYPE_COLORS: Record<string, string> = {
  dog: "#D4885A", cat: "#9ABCCC", bird: "#6AAA5A",
  bunny: "#E898B0", reptile: "#7AB87A", fish: "#E8A030", other: "#B898CC",
};
function getPetColor(type: string): string { return PET_TYPE_COLORS[type] || "#2A6B4A"; }

// ── SVG icon HTML for each pet type ─────────────────────────────────────────
// Builds a composite 48×48 viewBox SVG from the Figma Icon/Pet/* design system.
// Color fills → white (contrast on colored bg). Outlines → semi-transparent black.
function buildPetIconHtml(type: string): string {
  const fw = 'fill="rgba(255,255,255,0.92)"';
  const fl = 'fill="rgba(255,255,255,0.70)"';
  const s  = 'fill="none" stroke="rgba(0,0,0,0.65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const sm = 'fill="none" stroke="rgba(0,0,0,0.65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"';

  const icons: Record<string, string> = {
    dog: `
      <g transform="translate(4.40,7.27)">
        <path d="${svgPaths.p32012100}" ${fw}/><path d="${svgPaths.p16127d00}" ${fl}/><path d="${svgPaths.p22fe2e80}" ${fl}/>
      </g>
      <g transform="translate(3.31,7.00)">
        <path d="${svgPaths.pac65c00}" ${s}/><path d="${svgPaths.p364500}" ${s}/><path d="${svgPaths.p338d8a00}" ${s}/>
        <path d="${svgPaths.p35101500}" ${s}/><path d="${svgPaths.p2d547c00}" ${s}/><path d="${svgPaths.pa19eb80}" ${s}/>
      </g>`,
    cat: `
      <g transform="translate(3.52,10.72)">
        <path d="${svgPaths.p30728340}" ${fw}/><path d="${svgPaths.pf444a00}" ${fw}/><path d="${svgPaths.p22c7c80}" ${fw}/>
      </g>
      <g transform="translate(2.27,9.79)">
        <path d="${svgPaths.pf863040}" ${s}/><path d="${svgPaths.p2f1cad00}" ${s}/><path d="${svgPaths.p1fb12d00}" ${s}/>
        <path d="${svgPaths.p37c2adc0}" ${s}/><path d="${svgPaths.p38aa6380}" ${s}/><path d="${svgPaths.p2427ce00}" ${s}/>
      </g>`,
    bird: `
      <g transform="translate(15.33,4.97)">
        <path d="${svgPaths.peb8000}" ${fw}/><path d="${svgPaths.p1a341200}" ${fl}/>
        <path d="${svgPaths.p20526d00}" ${fw}/><path d="${svgPaths.p18d9bf00}" ${fl}/>
        <path d="${svgPaths.p16e4c680}" ${fl}/><path d="${svgPaths.p1f8ce300}" ${fw}/>
      </g>
      <g transform="translate(7.67,3.97)">
        <path d="${svgPaths.pf24b700}" fill="none" stroke="rgba(0,0,0,0.65)" stroke-width="2" stroke-miterlimit="10"/>
        <path d="${svgPaths.p774b140}" ${s}/><path d="${svgPaths.p1456dc00}" ${s}/>
        <path d="${svgPaths.p2cb32740}" ${s}/>
        <path d="M15.4638 26.0257V30.6923" ${s}/><path d="M30.3915 30.6923H33" ${s}/>
        <path d="M1 30.8071H20.993" ${s}/><path d="${svgPaths.p1863a600}" ${s}/>
        <path d="${svgPaths.p4f86400}" ${s}/><path d="M19.4638 28.0257V30.6923" ${s}/>
      </g>`,
    bunny: `
      <g transform="translate(6.28,7.84)">
        <path d="${svgPaths.p32592400}" ${fw}/><path d="${svgPaths.p380f6f40}" ${fw}/>
        <path d="${svgPaths.p35081f00}" fill="rgba(255,200,220,0.85)"/><path d="${svgPaths.p2e679200}" fill="rgba(255,200,220,0.85)"/>
        <path d="${svgPaths.pa5f0f00}" ${fw}/>
      </g>
      <g transform="translate(5.07,6.53)">
        <path d="${svgPaths.p22d59300}" ${s}/><path d="${svgPaths.p1d9adf00}" ${s}/>
        <path d="${svgPaths.p1aa2fdc0}" ${s}/><path d="${svgPaths.p21044000}" ${s}/>
      </g>`,
    fish: `
      <g transform="translate(11.27,11.87)">
        <path d="${svgPaths.p289aaf80}" fill="rgba(255,255,210,0.9)"/><path d="${svgPaths.pf8e6b00}" ${fw}/>
        <path d="${svgPaths.p229dcd00}" ${fw}/><path d="${svgPaths.p33f88d80}" fill="rgba(255,255,210,0.9)"/>
        <path d="${svgPaths.p2dfd200}" fill="rgba(255,220,160,0.9)"/><path d="${svgPaths.p34cfbc80}" ${fw}/>
      </g>
      <g transform="translate(7.67,10.46)">
        <path d="${svgPaths.p13031780}" ${s}/><path d="${svgPaths.p1ad19a80}" ${s}/>
        <path d="${svgPaths.p68d3480}" ${s}/><path d="${svgPaths.p1dace880}" ${s}/>
        <path d="${svgPaths.p26bfdd00}" ${s}/><path d="${svgPaths.p2bdab900}" ${s}/>
      </g>`,
    reptile: `
      <g transform="translate(2.92,10.13)">
        <path d="${svgPaths.pa506c00}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.pa188980}" fill="rgba(210,230,170,0.9)"/>
        <path d="${svgPaths.p3c72e400}" fill="rgba(170,210,170,0.9)"/><path d="${svgPaths.p1efa0d00}" fill="rgba(210,230,170,0.9)"/>
        <path d="${svgPaths.p1395bf80}" fill="rgba(210,230,170,0.9)"/><path d="${svgPaths.p3ffb5e00}" fill="rgba(170,210,170,0.9)"/>
      </g>
      <g transform="translate(2.92,10.13)">
        <path d="${svgPaths.pd6ba80}" ${sm}/><path d="${svgPaths.p1c1f0d80}" ${sm}/>
        <path d="${svgPaths.p3c930600}" ${sm}/><path d="${svgPaths.p1f630a40}" ${sm}/>
        <path d="${svgPaths.p361eed80}" ${sm}/><path d="${svgPaths.pe18c580}" ${sm}/>
        <path d="${svgPaths.p3f1a540}" ${sm}/><path d="${svgPaths.p164758c0}" ${sm}/>
        <path d="${svgPaths.p3b426c2a}" ${sm}/><path d="${svgPaths.p1db67480}" ${sm}/>
        <path d="${svgPaths.p357fd480}" ${sm}/><path d="${svgPaths.p13b80e80}" ${sm}/>
      </g>`,
    other: `
      <g transform="translate(7.86,5.09)">
        <path d="${svgPaths.p1ab01e00}" ${fl}/><path d="${svgPaths.p3c9c7a00}" ${fl}/>
        <path d="${svgPaths.p17c6aa00}" ${fl}/><path d="${svgPaths.p39822c00}" ${fl}/>
        <path d="${svgPaths.p1a5a9200}" ${fl}/><path d="${svgPaths.p30386780}" ${fl}/>
        <path d="${svgPaths.p18f71500}" ${fl}/><path d="${svgPaths.p22483970}" ${fl}/>
        <path d="${svgPaths.p2a78bc30}" ${fl}/><path d="${svgPaths.p252f5600}" ${fl}/>
      </g>
      <g transform="translate(6.38,3.50)">
        <path d="${svgPaths.p636fff0}" ${s}/><path d="${svgPaths.p3583cb00}" ${s}/>
        <path d="${svgPaths.pd2c5c10}" ${s}/><path d="${svgPaths.p15c98800}" ${s}/>
        <path d="${svgPaths.p1c6ade00}" ${s}/><path d="${svgPaths.p196a9b00}" ${s}/>
        <path d="${svgPaths.p25b76000}" ${s}/><path d="${svgPaths.p209700f0}" ${s}/>
        <path d="${svgPaths.p87b9000}" ${s}/><path d="${svgPaths.p284cf500}" ${s}/>
      </g>`,
  };
  const body = icons[type] || icons.other;
  return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="26" height="26">${body}</svg>`;
}

function petPinIcon(petType: string): L.DivIcon {
  const color = getPetColor(petType);
  return L.divIcon({
    html: `<div class="kt-pet-pin" style="background:${color};">${buildPetIconHtml(petType)}</div>`,
    className: "kt-icon-wrap",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function newPetPinIcon(petType: string): L.DivIcon {
  const color = getPetColor(petType);
  const typeKey = PET_TYPE_COLORS[petType] ? petType : "default";
  return L.divIcon({
    html: `<div class="kt-pet-pin kt-pet-pin-new-${typeKey}" style="background:${color};width:36px;height:36px;">${buildPetIconHtml(petType)}</div>`,
    className: "kt-icon-wrap",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function clusterIcon(count: number): L.DivIcon {
  const size = count > 100 ? 54 : count > 30 ? 46 : count > 10 ? 40 : 34;
  return L.divIcon({
    html: `<div class="kt-cluster" style="width:${size}px;height:${size}px;">${count}</div>`,
    className: "kt-icon-wrap",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

const MAP_STYLES = `
  .kt-icon-wrap { background: none !important; border: none !important; }

  /* Pet-type pin: rounded square with SVG icon */
  .kt-pet-pin {
    width: 32px; height: 32px; border-radius: 8px;
    border: 2.5px solid white;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.22);
    overflow: hidden;
  }

  /* New-pin 3× pulse glow (0.8s per pulse, then stops) */
  @keyframes kt-pulse-dog     { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(212,136,90,0.35)} }
  @keyframes kt-pulse-cat     { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(154,188,204,0.35)} }
  @keyframes kt-pulse-bird    { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(106,170,90,0.35)} }
  @keyframes kt-pulse-bunny   { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(232,152,176,0.35)} }
  @keyframes kt-pulse-reptile { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(122,184,122,0.35)} }
  @keyframes kt-pulse-fish    { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(232,160,48,0.35)} }
  @keyframes kt-pulse-other   { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(184,152,204,0.35)} }
  @keyframes kt-pulse-default { 0%,100%{transform:scale(1);box-shadow:0 2px 8px rgba(0,0,0,0.22)} 50%{transform:scale(1.4);box-shadow:0 0 0 10px rgba(42,107,74,0.35)} }

  .kt-pet-pin-new-dog     { animation: kt-pulse-dog     0.8s ease-out 3; }
  .kt-pet-pin-new-cat     { animation: kt-pulse-cat     0.8s ease-out 3; }
  .kt-pet-pin-new-bird    { animation: kt-pulse-bird    0.8s ease-out 3; }
  .kt-pet-pin-new-bunny   { animation: kt-pulse-bunny   0.8s ease-out 3; }
  .kt-pet-pin-new-reptile { animation: kt-pulse-reptile 0.8s ease-out 3; }
  .kt-pet-pin-new-fish    { animation: kt-pulse-fish    0.8s ease-out 3; }
  .kt-pet-pin-new-other   { animation: kt-pulse-other   0.8s ease-out 3; }
  .kt-pet-pin-new-default { animation: kt-pulse-default 0.8s ease-out 3; }

  /* Cluster pin */
  .kt-cluster {
    border-radius: 50%;
    background: #2A6B4A;
    border: 3px solid white;
    color: white; font-weight: 800; font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(42,107,74,0.4);
    font-family: 'Inter', sans-serif;
  }
  .leaflet-container { font-family: 'Inter', 'Roboto', sans-serif !important; }
  .leaflet-control-attribution { font-size: 10px !important; }
`;

const WORLD_BOUNDS: L.LatLngBoundsExpression = [[-75, -180], [85, 180]];

export function MapView({ pets, setPets, onPetClick, newPetId }: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const seenPetsRef = useRef<Map<string, Pet>>(new Map());
  const [zoom, setZoom] = useState(3);
  const [ready, setReady] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mergePets = useCallback((incoming: Pet[]) => {
    for (const pet of incoming) {
      seenPetsRef.current.set(pet.id, pet);
    }
    setPets(Array.from(seenPetsRef.current.values()));
  }, [setPets]);

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "kindred-map-styles";
    style.innerHTML = MAP_STYLES;
    document.head.appendChild(style);
    return () => document.getElementById("kindred-map-styles")?.remove();
  }, []);

  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    const map = L.map(mapDivRef.current, {
      center: [20, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
      maxBounds: WORLD_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
        keepBuffer: 4,
      }
    ).addTo(map);

    setTimeout(() => map.invalidateSize(), 0);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    map.on("zoomend", () => setZoom(map.getZoom()));

    // Fix grey bar when sidebar resizes container
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(mapDivRef.current!);

    mapRef.current = map;
    setReady(true);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const fetchAllPets = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("id, pet_name, pet_type, lat_fuzzy, lng_fuzzy, city, country, memorial_text, photo_url, personality_tags, flowers, treats, toys, created_at")
        .limit(500);
      if (error) throw error;
      mergePets((data as Pet[]) || []);
    } catch (e) {
      console.log("Initial pets fetch error:", e);
    }
  }, [mergePets]);

  useEffect(() => {
    if (!ready) return;
    fetchAllPets();
  }, [ready, fetchAllPets]);

  // Fly map to a result
  const flyToResult = useCallback((lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    const clampedLat = Math.max(-75, Math.min(85, lat));
    const clampedLng = Math.max(-180, Math.min(180, lng));
    map.setView([clampedLat, clampedLng], 8);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  // Fetch autocomplete suggestions (debounced 400ms)
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1`,
        { headers: { "User-Agent": "KindredTails/1.0 memorial-app" } }
      );
      const data = await res.json();
      const results: Suggestion[] = (data || []).map((item: any) => ({
        label: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSearchError("");
    if (suggestTimer.current) clearTimeout(suggestTimer.current);
    suggestTimer.current = setTimeout(() => fetchSuggestions(val), 400);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        flyToResult(suggestions[0].lat, suggestions[0].lng);
      } else {
        handleManualSearch();
      }
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleManualSearch = useCallback(async () => {
    const query = searchQuery.trim();
    if (!query) return;
    setSearching(true);
    setSearchError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        { headers: { "User-Agent": "KindredTails/1.0 memorial-app" } }
      );
      const data = await res.json();
      if (data?.[0]) {
        flyToResult(parseFloat(data[0].lat), parseFloat(data[0].lon));
      } else {
        setSearchError("Location not found");
        setTimeout(() => setSearchError(""), 3000);
      }
    } catch {
      setSearchError("Search failed, try again");
      setTimeout(() => setSearchError(""), 3000);
    }
    setSearching(false);
  }, [searchQuery, flyToResult]);

  // Re-render markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const clusters = computeClusters(pets, zoom);

    for (const cluster of clusters) {
      let marker: L.Marker;
      if (cluster.pets.length === 1) {
        const pet = cluster.pets[0];
        const isNew = newPetId != null && pet.id === newPetId;
        const icon = isNew ? newPetPinIcon(pet.pet_type) : petPinIcon(pet.pet_type);
        marker = L.marker([cluster.lat, cluster.lng], { icon });
        marker.on("click", () => onPetClick(pet));
      } else {
        marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon(cluster.pets.length) });
        const clusterCenter: [number, number] = [cluster.lat, cluster.lng];
        const currentZoom = zoom;
        marker.on("click", () => map.setView(clusterCenter, Math.min(currentZoom + 3, 18)));
      }
      marker.addTo(map);
      markersRef.current.push(marker);
    }
  }, [pets, zoom, onPetClick, newPetId]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Map container */}
      <div ref={mapDivRef} style={{ position: "absolute", inset: 0, background: "#F8FAFC" }} />

      {/* Search bar — floating top center */}
      <div ref={searchContainerRef} style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900,
        width: "min(360px, calc(100vw - 32px))",
      }}>
        {/* Input row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "white",
          borderRadius: showSuggestions ? "20px 20px 0 0" : 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          padding: "6px 6px 6px 16px",
        }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleQueryChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search city or country…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 13,
              color: "#111827",
              background: "transparent",
              fontFamily: "'Inter','Roboto',sans-serif",
              minWidth: 0,
            }}
          />
          <button
            onClick={handleManualSearch}
            disabled={searching || !searchQuery.trim()}
            style={{
              padding: "7px 14px",
              borderRadius: 50,
              border: "none",
              background: searching || !searchQuery.trim()
                ? "#E5E7EB"
                : "linear-gradient(135deg,#06B6D4,#3B82F6)",
              color: searching || !searchQuery.trim() ? "#9CA3AF" : "white",
              fontSize: 12,
              fontWeight: 700,
              cursor: searching || !searchQuery.trim() ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              minHeight: 32,
            }}
          >
            {searching ? "…" : "Go"}
          </button>
        </div>

        {/* Autocomplete dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div style={{
            background: "white",
            borderRadius: "0 0 16px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
            borderTop: "1px solid #F3F4F6",
          }}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onMouseDown={() => flyToResult(s.lat, s.lng)}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: 12,
                  color: "#374151",
                  borderBottom: i < suggestions.length - 1 ? "1px solid #F9FAFB" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'Inter','Roboto',sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <span style={{ flexShrink: 0, fontSize: 14 }}>📍</span>
                <span style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search error */}
      {searchError && (
        <div style={{
          position: "absolute",
          top: 68,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 900,
          background: "#FEF2F2",
          color: "#EF4444",
          fontSize: 12,
          fontWeight: 600,
          borderRadius: 20,
          padding: "6px 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          whiteSpace: "nowrap",
        }}>
          {searchError}
        </div>
      )}
    </div>
  );
}
