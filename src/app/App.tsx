import { useState, useEffect, useCallback, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { MapView } from "./components/MapView";
import { PetModal } from "./components/PetModal";
import { ToastContainer, type Toast } from "./components/ToastContainer";
import { OnboardingCarousel } from "./components/OnboardingCarousel";
import { saveOwnedPet, hasVisited, getOwnerToken } from "./utils/localStorage";
import type { Pet } from "./utils/api";

const MOBILE_BP = 768;

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [successPet, setSuccessPet] = useState<Pet | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BP);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(!hasVisited());
  const clearSuccessRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track mobile breakpoint
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < MOBILE_BP;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false); // start closed on mobile
    };
    window.addEventListener("resize", handler);
    // On first mount, collapse sidebar on mobile
    if (window.innerWidth < MOBILE_BP) setSidebarOpen(false);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const addToast = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handlePetCreated = (pet: Pet) => {
    saveOwnedPet(pet.id, getOwnerToken());
    setPets((prev) => (prev.some((p) => p.id === pet.id) ? prev : [...prev, pet]));
    setSuccessPet(pet);
    addToast(`🌱 ${pet.pet_name}'s memorial was planted in ${pet.city}`);
    if (clearSuccessRef.current) clearTimeout(clearSuccessRef.current);
    clearSuccessRef.current = setTimeout(() => setSuccessPet(null), 10_000);
    // On mobile, close sidebar after creation so user can see map
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
        {/* Sidebar (desktop: left panel | mobile: bottom sheet) */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onToggle={() => setSidebarOpen((o) => !o)}
          onPetCreated={handlePetCreated}
          successPet={successPet}
        />

        {/* Map area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <MapView pets={pets} setPets={setPets} onPetClick={setSelectedPet} />

          {/* Floating "expand sidebar" button — shown when sidebar is collapsed */}
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

          {/* Desktop: chevron to re-open if closed is not on sidebar (sidebar is hidden) —
              the floating button above handles this. But when sidebar is open on desktop,
              show expand chevron on right edge of sidebar — handled inside Sidebar component. */}
        </div>

        {/* Pet Memorial Modal */}
        {selectedPet && (
          <PetModal
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
            onTributeSuccess={handleTributeSuccess}
            onToast={addToast}
          />
        )}
      </div>

      {/* Bottom-left toast stack */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* First-visit onboarding */}
      {showOnboarding && (
        <OnboardingCarousel onDismiss={() => setShowOnboarding(false)} />
      )}
    </>
  );
}
