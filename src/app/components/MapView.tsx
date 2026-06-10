import { useEffect, useRef, useCallback, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getPets, type Pet } from "../utils/api";

interface Props {
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  onPetClick: (pet: Pet) => void;
}

interface Cluster {
  pets: Pet[];
  lat: number;
  lng: number;
}

// Geographic distance-based clustering — no map instance needed
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
  .leaflet-container { font-family: 'Inter', 'Roboto', sans-serif !important; }
  .leaflet-control-attribution { font-size: 10px !important; }
`;

export function MapView({ pets, setPets, onPetClick }: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [zoom, setZoom] = useState(3);
  const [ready, setReady] = useState(false);

  // Inject map marker styles once
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "kindred-map-styles";
    style.innerHTML = MAP_STYLES;
    document.head.appendChild(style);
    return () => document.getElementById("kindred-map-styles")?.remove();
  }, []);

  // Initialize the Leaflet map
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    const map = L.map(mapDivRef.current, {
      center: [20, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;
    setReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fetch pets for the visible bounds (debounced 300ms)
  const fetchBounds = useCallback(async () => {
    const map = mapRef.current;
    if (!map) return;
    const b = map.getBounds();
    try {
      const data = await getPets({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
      setPets(data);
    } catch (e) {
      console.log("Map fetch error:", e);
    }
  }, [setPets]);

  // Listen to map move/zoom events
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const onMove = () => {
      if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
      fetchTimerRef.current = setTimeout(fetchBounds, 300);
    };
    const onZoom = () => {
      setZoom(map.getZoom());
      if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
      fetchTimerRef.current = setTimeout(fetchBounds, 300);
    };

    map.on("moveend", onMove);
    map.on("zoomend", onZoom);
    fetchBounds();

    return () => {
      map.off("moveend", onMove);
      map.off("zoomend", onZoom);
      if (fetchTimerRef.current) clearTimeout(fetchTimerRef.current);
    };
  }, [ready, fetchBounds]);

  // Re-render markers when pets or zoom changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const clusters = computeClusters(pets, zoom);

    for (const cluster of clusters) {
      let marker: L.Marker;

      if (cluster.pets.length === 1) {
        marker = L.marker([cluster.lat, cluster.lng], { icon: pinIcon() });
        const pet = cluster.pets[0];
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
  }, [pets, zoom, onPetClick]);

  return (
    <div
      ref={mapDivRef}
      style={{ width: "100%", height: "100%", background: "#F8FAFC" }}
    />
  );
}
