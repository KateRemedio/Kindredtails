import { useEffect, useState } from "react";
import { getFeed, type FeedItem } from "../utils/api";

const FALLBACK: FeedItem[] = [
  { id: "1", created_at: "", type: "tribute", pet_name: "Buddy", city: "Tokyo", country: "Japan", message: "Someone in Tokyo just sent a 🌸 to Buddy" },
  { id: "2", created_at: "", type: "new_memorial", pet_name: "Luna", city: "Paris", country: "France", message: "A new memorial for Luna was planted in Paris 🌱" },
  { id: "3", created_at: "", type: "tribute", pet_name: "Mochi", city: "Seoul", country: "Korea", message: "Someone in Seoul just sent a 🍖 to Mochi" },
];

export function MarqueeFeed() {
  const [items, setItems] = useState<FeedItem[]>(FALLBACK);

  useEffect(() => {
    const load = async () => {
      try {
        const feed = await getFeed();
        if (feed.length > 0) setItems(feed);
      } catch {}
    };
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  // Double the items so the marquee loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div
      className="rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
      style={{ height: 34, position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          animation: `kindred-marquee ${Math.max(items.length * 6, 20)}s linear infinite`,
          whiteSpace: "nowrap",
        }}
      >
        {doubled.map((item, i) => (
          <span key={`${item.id}-${i}`} style={{ paddingRight: 48, fontSize: 12, color: "#6B7280", flexShrink: 0 }}>
            {item.message}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes kindred-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
