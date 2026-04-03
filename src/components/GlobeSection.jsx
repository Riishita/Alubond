import Globe from "react-globe.gl";
import { useEffect, useRef, useState } from "react";
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
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true; 
    controls.minDistance = 300;
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

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b1a3a] via-[#0f2a5c] to-[#020617]" />

      {/* HEADING */}
      <h2 className="text-4xl md:text-5xl font-semibold text-white mb-12">
        Our Global Presence Powers Local Delivery
      </h2>

      {/* GLOBE */}
      
      <div className="flex justify-center relative z-0 ">
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

      // IMPORTANT: allow clicks ONLY on markers
      el.style.pointerEvents = "auto";

      el.onclick = () => setActiveId(d.id);
      return el;
    }}
  />
</div>

      {/* 🔘 BUTTONS + CARD WRAPPER */}
      <div className="mt-8 flex flex-col items-center gap-10 md:gap-14 relative z-10 pointer-events-auto">

        {/* BUTTONS */}
        <div className="flex flex-col gap-6 items-center">

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
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>

        {/* 💎 CARD */}
        <AnimatePresence mode="wait">
  {active && (
    <motion.div
      key={active.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="w-30% flex justify-center mt-6 md:mt-10"
    >
      <div className="relative w-full max-w-[320px] rounded-2xl p-6 text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        {/* CLOSE */}
        <button
          onClick={() => setActiveId(null)}
          className="absolute top-3 right-3 text-white/60 hover:text-white text-sm"
        >
          ✕
        </button>

        {/* TYPE */}
        <p className="text-[10px] tracking-[0.3em] text-orange-400 uppercase">
          {active.group}
        </p>

        {/* TITLE */}
        <h3 className="text-xl font-semibold mt-2 text-white">
          {active.name}
        </h3>

        {/* DESC */}
        <p className="text-white/70 text-sm mt-3 leading-relaxed px-2">
          {active.details}
        </p>

        {/* BUTTON */}
        <button className="mt-5 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-medium shadow hover:scale-105 transition">
          Contact Us
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </section>
  );
}