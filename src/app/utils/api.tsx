import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-585e0bb7`;
const HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

export interface Pet {
  id: string;
  created_at: string;
  pet_name: string;
  pet_type: string;
  memorial_text: string;
  photo_url: string | null;
  personality_tags: string[];
  city: string;
  country: string;
  lat_fuzzy: number;
  lng_fuzzy: number;
  flowers: number;
  treats: number;
  toys: number;
  owner_token?: string;
}

export interface TributeLog {
  id: string;
  created_at: string;
  pet_id: string;
  tribute_type: "flower" | "treat" | "toy";
  from_city: string;
  from_country: string;
}

export interface FeedItem {
  id: string;
  created_at: string;
  type: "tribute" | "new_memorial";
  pet_name: string;
  city: string;
  country: string;
  message: string;
}

export async function uploadPhoto(imageData: string): Promise<string> {
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ imageData }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Photo upload failed");
  return data.url;
}

export async function createPet(payload: {
  pet_name: string;
  pet_type: string;
  memorial_text: string;
  photo_url?: string;
  personality_tags?: string[];
  city: string;
  country: string;
  owner_token: string;
}): Promise<Pet> {
  console.log("[api] POST", `${BASE}/pets`);
  const res = await fetch(`${BASE}/pets`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log("[api] POST /pets status:", res.status, "body:", data);
  if (!res.ok) throw new Error(data.error || "Failed to create memorial");
  return data;
}

export async function getPets(bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): Promise<Pet[]> {
  const params = new URLSearchParams({
    north: String(bounds.north),
    south: String(bounds.south),
    east: String(bounds.east),
    west: String(bounds.west),
  });
  const res = await fetch(`${BASE}/pets?${params}`, { headers: HEADERS });
  if (!res.ok) return [];
  return res.json();
}

export async function sendTribute(
  petId: string,
  tributeType: "flower" | "treat" | "toy",
  fromCity: string,
  fromCountry: string
): Promise<{ flowers: number; treats: number; toys: number }> {
  const res = await fetch(`${BASE}/pets/${petId}/tribute`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ tribute_type: tributeType, from_city: fromCity, from_country: fromCountry }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Tribute failed");
  return data;
}

export async function getPet(petId: string, ownerToken?: string): Promise<Pet | null> {
  const extraHeaders: Record<string, string> = ownerToken
    ? { "X-Owner-Token": ownerToken }
    : {};
  const res = await fetch(`${BASE}/pets/${petId}`, {
    headers: { ...HEADERS, ...extraHeaders },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getTributeLogs(petId: string, ownerToken: string): Promise<TributeLog[]> {
  const res = await fetch(`${BASE}/pets/${petId}/tributes`, {
    headers: { ...HEADERS, "X-Owner-Token": ownerToken },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch tribute logs");
  return data;
}

export async function getFeed(): Promise<FeedItem[]> {
  const res = await fetch(`${BASE}/feed`, { headers: HEADERS });
  if (!res.ok) return [];
  return res.json();
}

export async function patchPet(
  petId: string,
  ownerToken: string,
  updates: Partial<Pick<Pet, "pet_name" | "pet_type" | "memorial_text">>
): Promise<Pet> {
  const res = await fetch(`${BASE}/pets/${petId}`, {
    method: "PATCH",
    headers: { ...HEADERS, "X-Owner-Token": ownerToken },
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Update failed");
  return data;
}

export async function deletePet(petId: string, ownerToken: string): Promise<void> {
  const res = await fetch(`${BASE}/pets/${petId}`, {
    method: "DELETE",
    headers: { ...HEADERS, "X-Owner-Token": ownerToken },
  });
  if (!res.ok) throw new Error("Delete failed");
}
