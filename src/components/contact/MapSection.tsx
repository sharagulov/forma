"use client";

import Image from "next/image";
import { MAP_COORDS } from "@/lib/site";

function staticMapboxUrl(token: string) {
  const lon = MAP_COORDS.lng;
  const lat = MAP_COORDS.lat;
  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+ea580c(${lon},${lat})/${lon},${lat},14,0/800x480@2x?access_token=${encodeURIComponent(token)}`;
}

export function MapSection() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (token) {
    return (
      <div className="overflow-hidden rounded-sm border border-[var(--line)]">
        <Image
          src={staticMapboxUrl(token)}
          alt="Map showing FORMA studio location in Moscow"
          width={800}
          height={480}
          className="h-auto w-full object-cover"
          unoptimized
        />
        <p className="border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
          Map data © Mapbox © OpenStreetMap. Restrict this token by URL in the
          Mapbox dashboard (SEC-001).
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[var(--line)]">
      <iframe
        title="FORMA studio on OpenStreetMap"
        className="h-[min(420px,50vh)] w-full border-0"
        loading="lazy"
        src="https://www.openstreetmap.org/export/embed.html?bbox=37.575%2C55.754%2C37.606%2C55.769&layer=mapnik&marker=55.7614%2C37.5905"
      />
      <p className="border-t border-[var(--line)] px-3 py-2 text-xs text-[var(--muted)]">
        Fallback map without Mapbox token. Set{" "}
        <code className="text-[var(--fg)]">NEXT_PUBLIC_MAPBOX_TOKEN</code> for a
        static Mapbox preview.
      </p>
    </div>
  );
}
