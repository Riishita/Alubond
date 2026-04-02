import Globe from "react-globe.gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

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

  // ❌ no default selection
  const [activeId, setActiveId] = useState(null);

  const active = useMemo(
    () => LOCATIONS.find((l) => l.id === activeId),
    [activeId]
  );

  const grouped = useMemo(() => ({
    Manufacturing: LOCATIONS.filter((l) => l.group === "Manufacturing"),
    Offices: LOCATIONS.filter((l) => l.group === "Offices"),
  }), []);

  useEffect(() => {
  if (!globeRef.current) return;

  const controls = globeRef.current.controls();

  // ✅ Always rotating
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6; // smooth premium speed

  // ✅ Lock zoom range (fix size feel)
  controls.enableZoom = true;
  controls.minDistance = 380; // closer limit
  controls.maxDistance = 420; // farther limit

  // ✅ Smooth zoom when location selected
  if (active) {
    globeRef.current.pointOfView(
      { lat: active.lat, lng: active.lng, altitude: 1.6 },
      1200
    );
  }

}, [active]);

  return (
    <section className="relative py-28 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-100 to-white" />

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-6 relative z-10">
  <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-slate-100">
    Our Global Presence Powers Local Delivery
    <br />

  </h2>
</div>

      {/* Globe */}
      <div className="mt-20 flex justify-center">
        <div className="relative">

          {/* Glow */}
          <div className="absolute w-[500px] h-[500px] bg-blue-200/40 blur-3xl rounded-full -z-10" />

          <Globe
  ref={globeRef}
  width={Math.min(window.innerWidth * 0.5, 700)}
  height={Math.min(window.innerWidth * 0.5, 700)}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundColor="rgba(0,0,0,0)"

            htmlElementsData={LOCATIONS}
            htmlLat="lat"
            htmlLng="lng"

            htmlElement={(d) => {
              const el = document.createElement("div");
              const isActive = d.id === activeId;

              el.style.transform = "translate(-50%, -50%)";
              el.style.cursor = "pointer";

              el.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;">
                  
                  <div style="
                    width:${isActive ? 36 : 24}px;
                    height:${isActive ? 36 : 24}px;
                    border-radius:50%;
                    background:white;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-shadow:${isActive ? "0 8px 20px rgba(245,158,11,0.4)" : "0 2px 8px rgba(0,0,0,0.1)"};
                    border:${isActive ? "2px solid #f59e0b" : "1px solid #e5e7eb"};
                  ">
                    <img src="/alubond-logo.png" style="width:60%;" />
                  </div>

                  <span style="
                    margin-top:4px;
                    font-size:10px;
                    font-weight:${isActive ? "600" : "500"};
                    color:${isActive ? "#111827" : "#6b7280"};
                  ">
                    ${d.name}
                  </span>
                </div>
              `;

              el.onclick = () => setActiveId(d.id);

              return el;
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-14 flex flex-col items-center gap-6">

        {/* Manufacturing */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <span className="text-xs tracking-widest text-amber-500 font-medium">
            ● MANUFACTURING
          </span>

          {grouped.Manufacturing.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveId(l.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeId === l.id
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        {/* Offices */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <span className="text-xs tracking-widest text-slate-400 font-medium">
            ● OFFICES
          </span>

          {grouped.Offices.map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveId(l.id)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeId === l.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      {/* Info Card (ONLY WHEN CLICKED) */}
      {active && (
        <div className="mt-16 flex justify-center">
          <motion.div
            key={active.id}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] px-10 py-8 max-w-md text-center border border-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Close */}
            <button
              onClick={() => setActiveId(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <p className="text-xs tracking-widest text-amber-500 font-semibold">
              {active.group.toUpperCase()}
            </p>

            <h3 className="text-2xl font-semibold text-slate-900 mt-2">
              {active.name}
            </h3>

            <p className="text-slate-600 mt-4 leading-relaxed">
              {active.details}
            </p>

            <button className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md hover:scale-105 transition">
              Contact Us
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}