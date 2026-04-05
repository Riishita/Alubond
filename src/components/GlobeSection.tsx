import Globe from "react-globe.gl";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

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
  const globeRef = useRef<any>();
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = LOCATIONS.find((l) => l.id === activeId);

  const grouped = {
    Manufacturing: LOCATIONS.filter((l) => l.group === "Manufacturing"),
    Offices: LOCATIONS.filter((l) => l.group === "Offices"),
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const globeX = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.05]);

  const headingX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
const contentY = useTransform(scrollYProgress, [0.1, 0.4], [30, 0]);

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
  }, []);

  // ✅ prevent re-render lag
  const handleMarkerClick = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const globeComponent = useMemo(() => (
    <Globe
      ref={globeRef}
      width={window.innerWidth < 768 ? 320 : 480}
      height={window.innerWidth < 768 ? 320 : 480}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="rgba(0,0,0,0)"
      htmlElementsData={LOCATIONS}
      htmlLat="lat"
      htmlLng="lng"
      htmlElement={(d: any) => {
        const el = document.createElement("div");
        el.innerHTML = `<span style="color:white;font-size:10px">${d.name}</span>`;
        el.style.pointerEvents = "auto";
        el.onclick = () => handleMarkerClick(d.id);
        return el;
      }}
    />
  ), []);

  return (
    <section ref={sectionRef} className="h-[320vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#020617]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(59,130,246,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#141B3A]" />
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
        </div>

        {/* HEADING */}
        <motion.div
          style={{ x: headingX, y: headingY }}
          className="absolute top-16 w-full flex justify-center px-6"
        >
          <h2 className="text-white text-center max-w-4xl leading-tight"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(28px, 5vw, 56px)",
            }}>
            Our Global Presence <br />
            <span className="text-white/80">Powers Local Delivery</span>
          </h2>
        </motion.div>

        {/* GLOBE */}
        <motion.div
          style={{ x: globeX, scale: globeScale, y: "-50%" }}
          className="absolute left-1/2 top-1/2"
        >
          <div className="-translate-x-1/2 -translate-y-1/6 relative">

            <div className="absolute w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] 
            bg-[radial-gradient(circle,rgba(59,130,246,0.35),transparent_70%)] 
            blur-[120px] rounded-full -z-10" />

            {globeComponent}
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute left-[5%] md:left-[8%] lg:left-[10%] max-w-lg text-white"
        >
          <div>

            {/* MANUFACTURING */}
            <div className="mb-6">
              <p className="text-xs text-white/60 mb-2">● MANUFACTURING</p>
              <div className="flex flex-wrap gap-3">
                {grouped.Manufacturing.map((l) => (
                  <motion.button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                      activeId === l.id
                        ? "bg-orange-500 text-white border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-105"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    {l.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* OFFICES */}
            <div className="mb-6">
              <p className="text-xs text-white/60 mb-2">● OFFICES</p>
              <div className="flex flex-wrap gap-3">
                {grouped.Offices.map((l) => (
                  <motion.button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                      activeId === l.id
                        ? "bg-orange-500 text-white border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-105"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    {l.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CARD */}
            <AnimatePresence mode="wait">
  {active && (
    <motion.div
      key="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 relative min-h-[140px]"
    >
      {/* CLOSE */}
      <button
        onClick={() => setActiveId(null)}
        className="absolute top-2 right-2 text-white/60 hover:text-white text-sm"
      >
        ✕
      </button>

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold">{active.name}</h3>

          <p className="text-sm text-white/70 mt-2">
            {active.details}
          </p>

          {/* 🔥 CONTACT BUTTON */}
          <div className="mt-4">
            <button
              className="px-4 py-2 text-sm rounded-full border border-orange-500 
              text-orange-400 hover:bg-orange-500 hover:text-white 
              transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}