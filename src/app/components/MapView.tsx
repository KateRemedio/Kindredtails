import { useEffect, useRef, useCallback, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Pet } from "../utils/api";
import { supabase } from "../utils/supabaseClient";

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

function pinIcon(): L.DivIcon {
  return L.divIcon({
    html: `<div class="kt-pin"></div>`,
    className: "kt-icon-wrap",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
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
  .kt-pin {
    width: 18px; height: 18px; border-radius: 50%;
    background: linear-gradient(135deg, #06B6D4, #3B82F6);
    border: 2.5px solid white;
    cursor: pointer;
    animation: kt-glow 2s ease-in-out infinite;
    box-shadow: 0 2px 8px rgba(6,182,212,0.5);
  }
  .kt-pin-new {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #D946EF, #F97316);
    border: 3px solid white;
    cursor: pointer;
    animation: kt-glow-new 1.1s ease-in-out infinite;
  }
  .kt-cluster {
    border-radius: 50%;
    background: linear-gradient(135deg, #06B6D4, #3B82F6);
    border: 3px solid white;
    color: white; font-weight: 800; font-size: 11px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    animation: kt-glow 2.5s ease-in-out infinite;
    box-shadow: 0 2px 12px rgba(6,182,212,0.5);
    font-family: 'Inter', sans-serif;
  }
  @keyframes kt-glow {
    0%, 100% { box-shadow: 0 2px 8px rgba(6,182,212,0.5), 0 0 0 0 rgba(6,182,212,0.3); }
    50%       { box-shadow: 0 4px 16px rgba(6,182,212,0.7), 0 0 0 6px rgba(6,182,212,0.08); }
  }
  @keyframes kt-glow-new {
    0%, 100% { box-shadow: 0 2px 12px rgba(217,70,239,0.7), 0 0 0 0 rgba(217,70,239,0.4); }
    50%       { box-shadow: 0 4px 22px rgba(217,70,239,0.95), 0 0 0 12px rgba(217,70,239,0.12); }
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

  // Search bar state
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

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
        bounds: WORLD_BOUNDS,
      }
    ).addTo(map);

    setTimeout(() => map.invalidateSize(), 0);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    map.on("zoomend", () => setZoom(map.getZoom()));

    mapRef.current = map;
    setReady(true);

    return () => {
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

  // Map search using Nominatim
  const handleSearch = useCallback(async () => {
    const query = searchQuery.trim();
    if (!query) return;
    const map = mapRef.current;
    if (!map) return;

    setSearching(true);
    setSearchError("");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        { headers: { "User-Agent": "KindredTails/1.0 memorial-app" } }
      );
      const data = await res.json();
      if (data?.[0]) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        // Clamp to world bounds before setting view
        const clampedLat = Math.max(-75, Math.min(85, lat));
        const clampedLng = Math.max(-180, Math.min(180, lng));
        map.setView([clampedLat, clampedLng], 8);
        setSearchQuery("");
      } else {
        setSearchError("Location not found");
        setTimeout(() => setSearchError(""), 3000);
      }
    } catch {
      setSearchError("Search failed, try again");
      setTimeout(() => setSearchError(""), 3000);
    }

    setSearching(false);
  }, [searchQuery]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // Re-render markers when pets or zoom changes
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
        const icon = isNew
          ? L.divIcon({ html: `<div class="kt-pin-new"></div>`, className: "kt-icon-wrap", iconSize: [22, 22], iconAnchor: [11, 11] })
          : pinIcon();
        marker = L.marker([cluster.lat, cluster.lng], { icon });
        marker.on("click", () => onPetClick(pet));
      } else {
        marker = L.marker([cluster.lat, cluster.lng], {
          icon: clusterIcon(cluster.pets.length),
        });
        const clusterCenter: [number, number] = [cluster.lat, cluster.lng];
        const currentZoom = zoom;
        marker.on("click", () => {
          map.setView(clusterCenter, Math.min(currentZoom + 3, 18));
        });
      }

      marker.addTo(map);
      markersRef.current.push(marker);
    }
  }, [pets, zoom, onPetClick, newPetId]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Map container */}
      <div
        ref={mapDivRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#aec8d0",
        }}
      />

      {/* Search bar — floating top center of map */}
      <div style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 900,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "white",
        borderRadius: 50,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        padding: "6px 6px 6px 16px",
        width: "min(320px, calc(100vw - 180px))",
      }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
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
          onClick={handleSearch}
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

      {/* Search error toast */}
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
