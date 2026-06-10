const OWNER_TOKEN_KEY = "kindred_owner_token";
const SEEDS_KEY = "kindred_seeds";
const SEEDS_RESET_KEY = "kindred_seeds_reset";
const USER_CITY_KEY = "kindred_user_city";

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

/** Attempt to spend 1 seed. Returns true on success, false if empty. */
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
