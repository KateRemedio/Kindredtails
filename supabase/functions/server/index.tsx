import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();
const BUCKET = "make-585e0bb7-pet-photos";
const BASE = "/make-server-585e0bb7";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

app.use("*", logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Owner-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// Initialize public storage bucket for pet photos
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === BUCKET);
    if (!exists) {
      const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
      if (error) console.log("Bucket create error:", error.message);
      else console.log("Created bucket:", BUCKET);
    }
  } catch (e) {
    console.log("Bucket init error:", e);
  }
})();

async function geocodeCity(city: string, country: string) {
  try {
    const q = encodeURIComponent(`${city}, ${country}`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
      { headers: { "User-Agent": "KindredTails/1.0 memorial-app" } }
    );
    const data = await res.json();
    if (data?.[0]) return { lat: +data[0].lat, lng: +data[0].lon };
  } catch (e) {
    console.log("Geocoding error:", e);
  }
  return null;
}

function addFuzzyJitter(lat: number, lng: number) {
  const magnitude = 0.05 + Math.random() * 0.10;
  const angle = Math.random() * 2 * Math.PI;
  return { lat: lat + magnitude * Math.sin(angle), lng: lng + magnitude * Math.cos(angle) };
}

app.get(`${BASE}/health`, (c) => c.json({ status: "ok" }));

// Upload compressed pet photo (base64 WebP) → Supabase Storage
app.post(`${BASE}/upload`, async (c) => {
  try {
    const { imageData } = await c.req.json();
    if (!imageData) return c.json({ error: "Missing imageData" }, 400);
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, "");
    const bytes = Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0));
    const path = `${crypto.randomUUID()}.webp`;
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: "image/webp" });
    if (error) {
      console.log("Storage upload error:", error.message);
      return c.json({ error: "Upload failed: " + error.message }, 500);
    }
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    return c.json({ url: urlData.publicUrl });
  } catch (e) {
    console.log("Upload handler error:", e);
    return c.json({ error: "Upload error: " + String(e) }, 500);
  }
});

// Create a pet memorial → INSERT into pets table
app.post(`${BASE}/pets`, async (c) => {
  console.log("[POST /pets] Request received");
  try {
    const body = await c.req.json();
    console.log("[POST /pets] Body parsed:", JSON.stringify(body));

    const { pet_name, pet_type, memorial_text, photo_url, personality_tags, city, country, owner_token } = body;

    if (!pet_name || !pet_type || !memorial_text || !city || !country) {
      console.log("[POST /pets] Validation failed — missing fields");
      return c.json({ error: "Missing required fields: pet_name, pet_type, memorial_text, city, country" }, 400);
    }
    console.log("[POST /pets] Validation passed");

    // Geocode city to fuzzy coordinates
    console.log("[POST /pets] Geocoding:", city, country);
    const coords = await geocodeCity(city, country);
    console.log("[POST /pets] Geocode result:", coords);

    let lat_fuzzy = (Math.random() - 0.5) * 60;
    let lng_fuzzy = (Math.random() - 0.5) * 120;
    if (coords) {
      const j = addFuzzyJitter(coords.lat, coords.lng);
      lat_fuzzy = j.lat;
      lng_fuzzy = j.lng;
    }
    console.log("[POST /pets] Fuzzy coords:", lat_fuzzy, lng_fuzzy);

    // Log Supabase connection info (no secret)
    console.log("[POST /pets] SUPABASE_URL set:", !!Deno.env.get("SUPABASE_URL"));
    console.log("[POST /pets] SERVICE_ROLE_KEY set:", !!Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

    const insertPayload = {
      pet_name,
      pet_type,
      memorial_text,
      photo_url: photo_url || null,
      personality_tags: personality_tags || [],
      city,
      country,
      lat_fuzzy,
      lng_fuzzy,
      flowers: 0,
      treats: 0,
      toys: 0,
      owner_token: owner_token || crypto.randomUUID(),
    };
    console.log("[POST /pets] Attempting DB insert with payload:", JSON.stringify(insertPayload));

    const { data, error } = await supabase
      .from("pets")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.log("[POST /pets] DB insert FAILED — code:", error.code, "message:", error.message, "details:", error.details, "hint:", error.hint);
      return c.json({ error: "Failed to create memorial: " + error.message, details: error.details, hint: error.hint }, 500);
    }

    console.log("[POST /pets] DB insert SUCCESS — id:", data?.id);
    return c.json(data, 201);
  } catch (e) {
    console.log("[POST /pets] Unexpected exception:", String(e));
    return c.json({ error: "Create pet error: " + String(e) }, 500);
  }
});

// Get pets in map bounds → SELECT from pets table with lat/lng filter
app.get(`${BASE}/pets`, async (c) => {
  try {
    const north = parseFloat(c.req.query("north") || "90");
    const south = parseFloat(c.req.query("south") || "-90");
    const east = parseFloat(c.req.query("east") || "180");
    const west = parseFloat(c.req.query("west") || "-180");

    const { data, error } = await supabase
      .from("pets")
      .select("id, created_at, pet_name, pet_type, memorial_text, photo_url, personality_tags, city, country, lat_fuzzy, lng_fuzzy, flowers, treats, toys")
      .gte("lat_fuzzy", south)
      .lte("lat_fuzzy", north)
      .gte("lng_fuzzy", west)
      .lte("lng_fuzzy", east)
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.log("Select pets error:", error.message);
      return c.json({ error: "Failed to fetch pets: " + error.message }, 500);
    }

    return c.json(data || []);
  } catch (e) {
    console.log("Get pets handler error:", e);
    return c.json({ error: "Get pets error: " + String(e) }, 500);
  }
});

// Get single pet — returns owner_token only if requester is owner
app.get(`${BASE}/pets/:id`, async (c) => {
  try {
    const id = c.req.param("id");
    const ownerTok = c.req.header("X-Owner-Token");

    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return c.json({ error: "Pet not found" }, 404);

    // Only expose owner_token to the actual owner
    if (ownerTok !== data.owner_token) {
      const { owner_token, ...safe } = data;
      return c.json(safe);
    }

    return c.json(data);
  } catch (e) {
    console.log("Get pet handler error:", e);
    return c.json({ error: "Get pet error: " + String(e) }, 500);
  }
});

// Send a tribute → UPDATE pets integer column + INSERT into tribute_logs
app.post(`${BASE}/pets/:id/tribute`, async (c) => {
  try {
    const id = c.req.param("id");
    const { tribute_type, from_city, from_country } = await c.req.json();

    if (!["flower", "treat", "toy"].includes(tribute_type)) {
      return c.json({ error: "Invalid tribute_type. Must be flower, treat, or toy" }, 400);
    }

    // Read current counts
    const { data: pet, error: readErr } = await supabase
      .from("pets")
      .select("flowers, treats, toys, pet_name")
      .eq("id", id)
      .single();

    if (readErr || !pet) return c.json({ error: "Pet not found" }, 404);

    // Increment the correct column
    const updates: Record<string, number> = {
      flowers: pet.flowers,
      treats: pet.treats,
      toys: pet.toys,
    };
    if (tribute_type === "flower") updates.flowers = (pet.flowers || 0) + 1;
    if (tribute_type === "treat") updates.treats = (pet.treats || 0) + 1;
    if (tribute_type === "toy") updates.toys = (pet.toys || 0) + 1;

    const { error: updateErr } = await supabase
      .from("pets")
      .update(updates)
      .eq("id", id);

    if (updateErr) {
      console.log("Update tribute count error:", updateErr.message);
      return c.json({ error: "Failed to update tribute: " + updateErr.message }, 500);
    }

    // Insert tribute log row
    const { error: logErr } = await supabase
      .from("tribute_logs")
      .insert({
        pet_id: id,
        tribute_type,
        from_city: from_city || "Anonymous",
        from_country: from_country || "",
      });

    if (logErr) {
      console.log("Insert tribute log error:", logErr.message);
      // Non-fatal — the counter already incremented
    }

    return c.json({ flowers: updates.flowers, treats: updates.treats, toys: updates.toys });
  } catch (e) {
    console.log("Tribute handler error:", e);
    return c.json({ error: "Tribute error: " + String(e) }, 500);
  }
});

// Get tribute logs for a pet (owner only)
app.get(`${BASE}/pets/:id/tributes`, async (c) => {
  try {
    const id = c.req.param("id");
    const ownerTok = c.req.header("X-Owner-Token");

    // Verify ownership
    const { data: pet, error: petErr } = await supabase
      .from("pets")
      .select("owner_token")
      .eq("id", id)
      .single();

    if (petErr || !pet) return c.json({ error: "Pet not found" }, 404);
    if (ownerTok !== pet.owner_token) return c.json({ error: "Unauthorized" }, 401);

    const { data, error } = await supabase
      .from("tribute_logs")
      .select("*")
      .eq("pet_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Get tributes error:", error.message);
      return c.json({ error: "Failed to fetch tribute logs: " + error.message }, 500);
    }

    return c.json(data || []);
  } catch (e) {
    console.log("Get tributes handler error:", e);
    return c.json({ error: "Get tributes error: " + String(e) }, 500);
  }
});

// Live feed — recent tribute_logs joined with pet name
app.get(`${BASE}/feed`, async (c) => {
  try {
    const { data, error } = await supabase
      .from("tribute_logs")
      .select("id, created_at, tribute_type, from_city, from_country, pet_id, pets(pet_name, city, country)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      console.log("Feed error:", error.message);
      return c.json([]);
    }

    const emojiMap: Record<string, string> = { flower: "🌸", treat: "🍖", toy: "🧸" };

    const feed = (data || []).map((row: any) => ({
      id: row.id,
      created_at: row.created_at,
      type: "tribute",
      tribute_type: row.tribute_type,
      pet_name: row.pets?.pet_name || "a beloved pet",
      city: row.from_city || "Somewhere",
      country: row.from_country || "",
      message: `Someone in ${row.from_city || "Somewhere"} just sent a ${emojiMap[row.tribute_type] || "💛"} to ${row.pets?.pet_name || "a beloved pet"}`,
    }));

    return c.json(feed);
  } catch (e) {
    console.log("Feed handler error:", e);
    return c.json([]);
  }
});

Deno.serve(app.fetch);
