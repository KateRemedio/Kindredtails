import { useState, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { MapView } from "./components/MapView";
import { PetModal } from "./components/PetModal";
import type { Pet } from "./utils/api";

export default function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [successPet, setSuccessPet] = useState<Pet | null>(null);
  const clearSuccessTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePetCreated = (pet: Pet) => {
    setPets((prev) => {
      const exists = prev.some((p) => p.id === pet.id);
      return exists ? prev : [...prev, pet];
    });
    setSuccessPet(pet);
    if (clearSuccessTimer.current) clearTimeout(clearSuccessTimer.current);
    clearSuccessTimer.current = setTimeout(() => setSuccessPet(null), 10_000);
  };

  const handleTributeSuccess = (updated: Pet) => {
    setPets((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
    setSelectedPet((prev) => (prev?.id === updated.id ? { ...prev, ...updated } : prev));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#FFFFFF",
        fontFamily: "'Inter', 'Roboto', sans-serif",
      }}
    >
      <Sidebar onPetCreated={handlePetCreated} successPet={successPet} />

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <MapView pets={pets} setPets={setPets} onPetClick={setSelectedPet} />
      </div>

      {selectedPet && (
        <PetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onTributeSuccess={handleTributeSuccess}
        />
      )}
    </div>
  );
}
