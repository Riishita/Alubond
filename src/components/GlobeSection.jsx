import Globe from "react-globe.gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  { id: "uae", name: "UAE", group: "Manufacturing", lat: 25.2048, lng: 55.2708, details: "Dubai manufacturing and regional specification support." },
  { id: "india", name: "India", group: "Manufacturing", lat: 20.5937, lng: 78.9629, details: "High-volume ACP production and coating lines." },
  { id: "europe", name: "Europe", group: "Manufacturing", lat: 50.1109, lng: 8.6821, details: "European finishing and logistics network." },
  { id: "usa", name: "USA", group: "Offices", lat: 40.7128, lng: -74.006, details: "North America project advisory and technical sales." },
  { id: "canada", name: "Canada", group: "Offices", lat: 43.6532, lng: -79.3832, details: "Architect and consultant engagement office." },
  { id: "egypt", name: "Egypt", group: "Offices", lat: 30.0444, lng: 31.2357, details: "MENA project coordination and support." },
  { id: "turkey", name: "Turkey", group: "Offices", lat: 41.0082, lng: 28.9784, details: "Façade engineering and regional operations." },
  { id: "vietnam", name: "Vietnam", group: "Offices", lat: 10.8231, lng: 106.6297, details: "APAC commercial and technical office." },
];

export default function GlobeSection() {
  const globeRef = useRef();
  const [activeId, setActiveId] = useState(null);

  const active = LOCATIONS.find(l => l.id === activeId);

  const grouped = {
    Manufacturing: LOCATIONS.filter(l => l.group === "Manufacturing"),
    Offices: LOCATIONS.filter(l => l.group === "Offices"),
  };

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.enableZoom = false;     // ❌ disable zoom
      controls.enablePan = false;      // optional (no dragging)
      controls.minDistance = 300;      // fixed distance
      controls.maxDistance = 300;  
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    if (active) {
      globeRef.current.pointOfView(
        { lat: active.lat, lng: active.lng, altitude: 1.6 },
        1000
      );
    }
  }, [active]);

  return (
    <section className="relative py-20 overflow-hidden text-center">

      {/* 🔵 PREMIUM BLUE BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </div>

      {/* 🔥 HEADING */}
      <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-10">
        Our Global Presence Powers Local Delivery
      </h2>

      {/* 🌍 GLOBE */}
      <div className="flex justify-center relative">
        <Globe
          ref={globeRef}
          width={500}
          height={500}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)"
          htmlElementsData={LOCATIONS}
          htmlLat="lat"
          htmlLng="lng"
          htmlElement={(d) => {
            const el = document.createElement("div");

            el.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="/alubond-logo.png" style="width:28px;" />
                <span style="font-size:10px;color:white;margin-top:2px;">
                  ${d.name}
                </span>
              </div>
            `;

            el.onclick = () => setActiveId(d.id);
            return el;
          }}
        />
      </div>

      {/* 🔘 FILTER BUTTONS */}
<div className="mt-10 flex flex-col gap-6 items-center">

  {/* MANUFACTURING */}
  <div className="flex flex-wrap gap-3 justify-center items-center">
    <span className="text-xs text-orange-400 tracking-wider">
      ● MANUFACTURING
    </span>

    {grouped.Manufacturing.map((l) => (
      <button
        key={l.id}
        onClick={() => setActiveId(l.id)}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
          activeId === l.id
            ? "bg-orange-500 text-white shadow-lg scale-105"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
        }`}
      >
        {l.name}
      </button>
    ))}
  </div>

  {/* OFFICES */}
  <div className="flex flex-wrap gap-3 justify-center items-center">
    <span className="text-xs text-white/70 tracking-wider">
      ● OFFICES
    </span>

    {grouped.Offices.map((l) => (
      <button
        key={l.id}
        onClick={() => setActiveId(l.id)}
        className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
          activeId === l.id
            ? "bg-white text-black shadow-lg scale-105"
            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
        }`}
      >
        {l.name}
      </button>
    ))}
  </div>

</div>

      {/* 💎 FLOATING CARD (CENTERED LIKE IMAGE 2) */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="mt-10 flex justify-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] text-center relative">

              <button
                onClick={() => setActiveId(null)}
                className="absolute top-3 right-3 text-black/70"
              >
                ✕
              </button>

              <p className="text-xs text-orange-400 tracking-widest">
                {active.group.toUpperCase()}
              </p>

              <h3 className="text-xl font-semibold mt-2">
                {active.name}
              </h3>

              <p className="text-gray-600 text-sm mt-3">
                {active.details}
              </p>

              <button className="mt-4 bg-orange-400 text-white px-5 py-2 rounded-full">
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}