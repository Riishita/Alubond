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

const LEFT_LOCATIONS = ["UAE", "EUROPE", "INDIA", "EGYPT"];
const RIGHT_LOCATIONS = ["USA", "TURKEY", "CANADA", "VIETNAM"];

const GlobeSection = () => {
  const globeEl = useRef(null);
  const [activeId, setActiveId] = useState("uae");

  const active = useMemo(
    () => LOCATIONS.find((location) => location.id === activeId) ?? LOCATIONS[0],
    [activeId]
  );

  const grouped = useMemo(
    () => ({
      Manufacturing: LOCATIONS.filter((l) => l.group === "Manufacturing"),
      Offices: LOCATIONS.filter((l) => l.group === "Offices"),
    }),
    []
  );

  const points = useMemo(
    () =>
      LOCATIONS.map((location) => ({
        ...location,
        color: location.id === activeId ? "#f59e0b" : "#94a3b8",
        size: location.id === activeId ? 0.64 : 0.34,
        altitude: location.id === activeId ? 0.12 : 0.06,
      })),
    [activeId]
  );

  const activePoint = useMemo(
    () => points.filter((p) => p.id === activeId),
    [points, activeId]
  );

  const arcs = useMemo(
    () =>
      LOCATIONS.filter((l) => l.id !== active.id).map((l) => ({
        startLat: active.lat,
        startLng: active.lng,
        endLat: l.lat,
        endLng: l.lng,
        color: ["rgba(245, 158, 11, 0.36)", "rgba(148, 163, 184, 0.12)"],
      })),
    [active]
  );

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.25;
    controls.enablePan = false;
    controls.minDistance = 180;
    controls.maxDistance = 300;

    const material = globeEl.current.globeMaterial();
    material.color.set("#f8fafc");
    material.emissive.set("#f1f5f9");
    material.emissiveIntensity = 0.08;
    material.shininess = 0.08;

    globeEl.current.pointOfView(
      { lat: active.lat, lng: active.lng, altitude: 2.2 },
      900
    );
  }, [active]);

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.h2
          className="text-center text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Global Presence Powers Local Delivery
        </motion.h2>

        {/* Globe */}
        <div className="relative mt-14 flex items-center justify-center">

          {/* Left buttons */}
          <div className="hidden lg:absolute lg:left-2 lg:grid lg:grid-cols-2 lg:gap-6">
            {LEFT_LOCATIONS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveId(label.toLowerCase())}
                className="text-xs tracking-[0.14em] text-slate-600 hover:text-black"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right buttons */}
          <div className="hidden lg:absolute lg:right-2 lg:grid lg:grid-cols-2 lg:gap-6">
            {RIGHT_LOCATIONS.map((label) => (
              <button
                key={label}
                onClick={() => setActiveId(label.toLowerCase())}
                className="text-xs tracking-[0.14em] text-slate-600 hover:text-black"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Globe container (clean) */}
          <motion.div
            className="w-full max-w-[900px]"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Globe
              ref={globeEl}
              height={650}
              width={900}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              atmosphereColor="#cbd5e1"
              atmosphereAltitude={0.055}
              pointsData={points}
              pointLat="lat"
              pointLng="lng"
              pointColor="color"
              pointRadius="size"
              pointAltitude="altitude"
              labelsData={activePoint}
              labelLat="lat"
              labelLng="lng"
              labelText="name"
              arcsData={arcs}
              arcColor="color"
              arcDashLength={0.5}
              arcDashGap={0.3}
              arcDashAnimateTime={1800}
              arcStroke={0.44}
              onPointClick={(p) => setActiveId(p.id)}
              onLabelClick={(p) => setActiveId(p.id)}
            />
          </motion.div>
        </div>

        {/* Bottom section */}
        <div className="mx-auto mt-12 max-w-3xl text-center">

          {/* Groups */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(grouped).map(([group, groupLocations]) =>
              groupLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setActiveId(location.id)}
                  className={`text-sm transition ${
                    location.id === activeId
                      ? "text-amber-600"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  {location.name}
                </button>
              ))
            )}
          </div>

          {/* Active info */}
          <motion.div
            key={active.id}
            className="mt-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {active.group}
            </p>
            <h3 className="text-xl text-slate-900 mt-1">
              {active.name}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              {active.details}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default GlobeSection;