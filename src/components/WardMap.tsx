"use client";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export interface MapWard { id: string; name: string; ring: [number, number][]; color: string; selected?: boolean }

/** Basemap-free MapLibre view of ward polygons (no external tile requests → works on low data). */
export default function WardMap({ wards, center, zoom = 10, height = 320 }: { wards: MapWard[]; center: [number, number]; zoom?: number; height?: number }) {
  const el = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let map: import("maplibre-gl").Map | undefined;
    (async () => {
      try {
        const ml = (await import("maplibre-gl")).default;
        map = new ml.Map({ container: el.current!, center, zoom, attributionControl: false,
          style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#E9EEF3" } }] } });
        map.addControl(new ml.NavigationControl({ showCompass: false }));
        map.on("load", () => {
          map!.addSource("wards", { type: "geojson", data: { type: "FeatureCollection", features: wards.map((w) => ({
            type: "Feature", properties: { id: w.id, name: w.name, color: w.color, sel: w.selected ? 1 : 0 },
            geometry: { type: "Polygon", coordinates: [w.ring] } })) } });
          map!.addLayer({ id: "fill", type: "fill", source: "wards", paint: { "fill-color": ["get", "color"], "fill-opacity": 0.55 } });
          map!.addLayer({ id: "line", type: "line", source: "wards", paint: { "line-color": "#0B1F3A", "line-width": ["case", ["==", ["get", "sel"], 1], 3, 1] } });
          map!.on("click", "fill", (e) => { const f = e.features?.[0]; if (f) window.location.href = `/area/${f.properties!.id}`; });
        });
      } catch { setErr(true); }
    })();
    return () => map?.remove();
  }, [wards, center, zoom]);
  if (err) return <p className="card">The map could not load. The list below has the same information.</p>;
  return <div ref={el} style={{ height }} className="rounded-xl border" role="img" aria-label={`Map of ${wards.length} ward boundaries (illustrative demo boundaries). A list alternative follows.`} />;
}
