import "./i18n";
import { useState, useEffect, useCallback, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { MapView } from "./components/MapView";
import { PetModal } from "./components/PetModal";
import { ToastContainer, type Toast } from "./components/ToastContainer";
import { OnboardingCarousel } from "./components/OnboardingCarousel";
import { SuccessOverlay } from "./components/SuccessOverlay";
import { saveOwnedPet, hasVisited, getOwnerToken } from "./utils/localStorage";
import { getPet, type Pet } from "./utils/api";

const MOBILE_BP = 768;

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [successPet, setSuccessPet] = useState<Pet | null>(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [panTo, setPanTo] = useState<{ lat: number; lng: number } | null>(null);
  const [newPetId, setNewPetId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BP);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(!hasVisited());
  const clearSuccessRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const newPetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Favicon + page meta (no index.html in this environment)
  useEffect(() => {
    document.title = "Kindred Tails — A Living Memorial Garden for Beloved Pets";

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };

    const desc = "Honor your beloved pet with a memorial pin on a living global map. Send tributes, share memories, and join a worldwide community of pet lovers.";
    setMeta("description", desc);
    setMeta("og:title", "Kindred Tails — A Living Memorial Garden for Beloved Pets", true);
    setMeta("og:description", desc, true);
    setMeta("og:url", "https://kindredtails.vercel.app", true);
    setMeta("og:type", "website", true);

    let favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!favicon) { favicon = document.createElement("link"); favicon.rel = "icon"; document.head.appendChild(favicon); }
    favicon.type = "image/svg+xml";
    favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>";
  }, []);

  // Track mobile breakpoint
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < MOBILE_BP;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handler);
    if (window.innerWidth < MOBILE_BP) setSidebarOpen(false);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // On mount: check ?pet=id URL param and auto-open that pet's modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const petId = params.get("pet");
    if (!petId) return;
    const token = localStorage.getItem("kindred_owner_token_" + petId) || getOwnerToken();
    getPet(petId, token).then((pet) => {
      if (pet) {
        if (pet.owner_token) {
          localStorage.setItem("kindred_owner_token_" + petId, token);
        }
        setSelectedPet(pet);
        setPets((prev) => prev.some((p) => p.id === pet.id) ? prev : [...prev, pet]);
      }
    }).catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addToast = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handlePetCreated = (pet: Pet) => {
    if (pet.owner_token) {
      localStorage.setItem("kindred_owner_token_" + pet.id, pet.owner_token);
    }
    saveOwnedPet(pet.id, getOwnerToken());
    setPets((prev) => (prev.some((p) => p.id === pet.id) ? prev : [...prev, pet]));
    setSuccessPet(pet);
    setShowSuccessOverlay(true);

    // Fly map to new pet location
    setPanTo({ lat: pet.lat_fuzzy, lng: pet.lng_fuzzy });
    setNewPetId(pet.id);

    // Clear glowing pin after 30s
    if (newPetTimerRef.current) clearTimeout(newPetTimerRef.current);
    newPetTimerRef.current = setTimeout(() => setNewPetId(null), 30_000);

    if (clearSuccessRef.current) clearTimeout(clearSuccessRef.current);
    clearSuccessRef.current = setTimeout(() => setSuccessPet(null), 10_000);

    if (isMobile) setSidebarOpen(false);
  };

  const handleTributeSuccess = (updated: Pet) => {
    setPets((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
    setSelectedPet((prev) => (prev?.id === updated.id ? { ...prev, ...updated } : prev));
  };

  return (
    <>
      {/* Global mobile bottom-sheet + modal styles */}
      <style>{`
        @media (max-width: ${MOBILE_BP}px) {
          .kt-modal-backdrop {
            align-items: flex-end !important;
            padding: 0 !important;
          }
          .kt-modal-card {
            max-width: 100% !important;
            width: 100% !important;
            max-height: 92vh !important;
            border-radius: 20px 20px 0 0 !important;
          }
        }
      `}</style>

      <div style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#FFFFFF",
        fontFamily: "'Inter','Roboto',sans-serif",
      }}>
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onToggle={() => setSidebarOpen((o) => !o)}
          onPetCreated={handlePetCreated}
          successPet={successPet}
        />

        {/* Map area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <MapView
            pets={pets}
            setPets={setPets}
            onPetClick={setSelectedPet}
            panTo={panTo}
            newPetId={newPetId}
          />

          {/* Floating "expand sidebar" button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                position: "absolute",
                top: isMobile ? undefined : 20,
                bottom: isMobile ? 20 : undefined,
                left: isMobile ? "50%" : 20,
                transform: isMobile ? "translateX(-50%)" : "none",
                zIndex: 800,
                padding: "12px 20px",
                borderRadius: 50,
                border: "none",
                background: "linear-gradient(135deg,#06B6D4,#3B82F6)",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(6,182,212,0.4)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                minHeight: 44,
                whiteSpace: "nowrap",
              }}
            >
              🌱 Plant a Memory
            </button>
          )}
        </div>

        {/* Pet Memorial Modal */}
        {selectedPet && (
          <PetModal
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
            onTributeSuccess={handleTributeSuccess}
            onToast={addToast}
            onPetDeleted={(id) => setPets((prev) => prev.filter((p) => p.id !== id))}
          />
        )}
      </div>

      {/* Bottom-left toast stack */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Success overlay after planting */}
      {showSuccessOverlay && successPet && (
        <SuccessOverlay
          pet={successPet}
          onDismiss={() => setShowSuccessOverlay(false)}
        />
      )}

      {/* First-visit onboarding */}
      {showOnboarding && (
        <OnboardingCarousel onDismiss={() => {
          setShowOnboarding(false);
          if (pets.length > 0) {
            const newest = pets.reduce((a, b) => a.created_at > b.created_at ? a : b);
            setPanTo({ lat: newest.lat_fuzzy, lng: newest.lng_fuzzy });
          }
        }} />
      )}
    </>
  );
}
