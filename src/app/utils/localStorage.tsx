const OWNER_TOKEN_KEY = "kindred_owner_token";
const SEEDS_KEY = "kindred_seeds";
const SEEDS_RESET_KEY = "kindred_seeds_reset";
const USER_CITY_KEY = "kindred_user_city";
const OWNED_PETS_KEY = "kindred_owned_pets";
const VISITED_KEY = "kindred_visited";

const MAX_SEEDS = 5;
const RESET_MS = 24 * 60 * 60 * 1000;

export function getOwnerToken(): string {
  let token = localStorage.getItem(OWNER_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(OWNER_TOKEN_KEY, token);
  }
  return token;
}

function refreshSeeds(): { count: number; resetAt: number } {
  const resetAt = parseInt(localStorage.getItem(SEEDS_RESET_KEY) || "0");
  const now = Date.now();
  if (now >= resetAt) {
    const newResetAt = now + RESET_MS;
    localStorage.setItem(SEEDS_KEY, String(MAX_SEEDS));
    localStorage.setItem(SEEDS_RESET_KEY, String(newResetAt));
    return { count: MAX_SEEDS, resetAt: newResetAt };
  }
  const count = Math.max(0, parseInt(localStorage.getItem(SEEDS_KEY) || String(MAX_SEEDS)));
  return { count, resetAt };
}

export function getSeedCount(): number {
  return refreshSeeds().count;
}

export function getSeedResetAt(): number {
  return refreshSeeds().resetAt;
}

export function useSeed(): boolean {
  const state = refreshSeeds();
  if (state.count <= 0) return false;
  localStorage.setItem(SEEDS_KEY, String(state.count - 1));
  return true;
}

export function getSeedCountdownMs(): number {
  const { resetAt } = refreshSeeds();
  return Math.max(0, resetAt - Date.now());
}

export function saveUserCity(city: string, country: string): void {
  localStorage.setItem(USER_CITY_KEY, JSON.stringify({ city, country }));
}

export function getUserCity(): { city: string; country: string } | null {
  const raw = localStorage.getItem(USER_CITY_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Per-pet owner token: kindred_owner_token_{petId} = ownerToken
// Written at creation time so "Your Memorial" tab survives page reloads reliably.
export function saveOwnedPet(petId: string, ownerToken?: string): void {
  const token = ownerToken || getOwnerToken();
  localStorage.setItem(`${OWNER_TOKEN_KEY}_${petId}`, token);
  // Keep the legacy list for backward compatibility
  const owned = getOwnedPetIds();
  if (!owned.includes(petId)) {
    owned.push(petId);
    localStorage.setItem(OWNED_PETS_KEY, JSON.stringify(owned));
  }
}

export function getOwnedPetIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(OWNED_PETS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getPetOwnerToken(petId: string): string | null {
  return localStorage.getItem(`${OWNER_TOKEN_KEY}_${petId}`);
}

export function isPetOwner(petId: string): boolean {
  // Check per-pet key first (new approach), fall back to legacy list
  if (localStorage.getItem(`${OWNER_TOKEN_KEY}_${petId}`)) return true;
  return getOwnedPetIds().includes(petId);
}

// First-visit onboarding gate
export function hasVisited(): boolean {
  return localStorage.getItem(VISITED_KEY) === "1";
}

export function markVisited(): void {
  localStorage.setItem(VISITED_KEY, "1");
}
