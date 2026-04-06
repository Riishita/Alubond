"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= 3D MODEL ================= */
function PanelModel({ activeLayer }: { activeLayer: number }) {
  const layers = [
    { y: 0.9, base: "#2E5BFF", active: "#081f6e" },
    { y: 0.45, base: "#BFC5CC", active: "#aeaca5" },
    { y: 0, base: "#E8EAED", active: "#cb650b" },
    { y: -0.45, base: "#778899", active: "#AAB4BF" },
    { y: -0.9, base: "#BFC5CC", active: "#707070" },
  ];

  return (
    <group scale={0.8}>
      {layers.map((layer, i) => {
        const isActive = i === activeLayer;

        return (
          <mesh key={i} position={[0, layer.y, 0]}>
            <boxGeometry args={[2.5, 0.1, 2.5]} />
            <meshStandardMaterial
              color={isActive ? layer.active : layer.base}
              transparent
              opacity={isActive ? 1 : 0.65}   // 👈 transparent inactive
              emissive={isActive ? layer.active : "#000"}
              emissiveIntensity={isActive ? 0.5 : 0}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ================= DATA ================= */
const steps = [
  {
    id: "01",
    title: "HIGH-PERFORMANCE SURFACE FINISH",
    desc: "PVDF and FEVE fluoropolymer coatings applied over chromate pre-treatment and epoxy resin primer. Delivers exceptional UV resistance, colour retention, and weatherability for 20+ years.",
    details: "AAMA 2605 • GSB MASTER • QUALICOAT CLASS 3 • ASTM D2244 • ISO 2813",
    right: "Specialisted Coating",
  },
  {
    id: "02",
    title: "PRECISION-GRADE ALUMINIUM ALLOY",
    desc: "0.50mm aluminium alloy 3003-H24/5005-H34 top skin provides the structural face of the panel. Hot-bonded to the core using a proprietary lamination process that ensures zero delamination under thermal cycling and wind-load stress.",
    details: "EN 485-2 • ASTM B209 • EN 573-3 • ISO 6361 • AAMA 2604",
    right: "Top Metal Skin",
  },
  {
    id: "03",
    title: "FIRE-RETARDANT MINERAL CORE",
    desc: "Engineered mineral-filled core achieving FR-A2 classification -the highest non-combustible rating for metal composite panels. Comprises over 90% inorganic mineral content with zero halogen compounds, ensuring minimal smoke generation and no flaming droplets under fire conditions.",
    details: "EN 13501-1 • NFPA 285 • ASTM E84 • BS 8414 • DIN 4102-B1 • UL 1040",
    right: "Fire Raared Core",
  },
  {
    id: "04",
    title: "STRUCTURAL BACKING LAYER",
    desc: "0.50mm aluminium alloy rear skin provides dimensional stability, rigidity, and resistance to panel warping under thermal expansion. Acts as a structural diaphragm that distributes wind-load forces evenly across the composite cross-section.",
    details: "EN 485-2 • ASTM B209 • ISO 7438 • ASTM D1781 • EN 14509",
    right: "Bottom Metal Skin",
  },
  {
    id: "05",
    title: "CORROSION-RESISTANT FOUNDATION",
    desc: "Multi-stage chromate conversion coating followed by epoxy resin primer and protective service coat. This tri-layer treatment provides the corrosion barrier essential for coastal, industrial, and high-humidity environments - protecting the panel substrate from inside out.",
    details: "AAMA 2605 • ISO 2409 • ASTM D3359 • ASTM B117 • ISO 9227",
    right: "Base Treatment",
  },
];

/* ================= COMPONENT ================= */
export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  /* ================= SCROLL ================= */
  useEffect(() => {
    let isScrolling = false;

    const isInView = () => {
      if (!sectionRef.current) return false;
      const rect = sectionRef.current.getBoundingClientRect();

      return (
        rect.top <= window.innerHeight * 0.2 &&
        rect.bottom >= window.innerHeight * 0.8
      );
    };

    const handleScroll = (e: WheelEvent) => {
      if (!isInView()) return;
      if (isScrolling) return;

      isScrolling = true;

      setIndex((prev) => {
        if (e.deltaY > 0) {
          if (prev === steps.length - 1) {
            setShowNext(true);
            return prev;
          }
          return Math.min(prev + 1, steps.length - 1);
        } else {
          if (showNext) {
            setShowNext(false);
            return prev;
          }
          return Math.max(prev - 1, 0);
        }
      });

      setTimeout(() => (isScrolling = false), 700);
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [showNext]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at center, #3B4D8F 0%, #1E2A5A 45%, #141B3A 100%)",
      }}
    >
      {/* 🔵 3D */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [3, 3, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />

          <group rotation={[0.3, 0.5, 0]}>
            <PanelModel activeLayer={index} />
          </group>

          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* LEFT TEXT (unchanged UI + clickable) */}
      <div className="absolute top-24 left-16 max-w-md z-10">
        <AnimatePresence mode="wait">
          {!showNext && (
            <motion.div
              key={index}
              onClick={() => {
                setIndex((prev) => (prev + 1) % steps.length);
                setShowNext(false);
              }}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-orange-500 text-sm mb-4">
                {steps[index].id} / {steps[index].right}
              </p>

              <h2 className="text-4xl mb-4">
                {steps[index].title}
              </h2>

              <p className="text-gray-300 text-sm">
                {steps[index].desc}
              </p>

              <p className="text-gray-500 text-xs mt-4">
                {steps[index].details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT LIST → NOW CLICKABLE */}
      {!showNext && (
        <div className="absolute bottom-24 right-16 text-right space-y-4 z-10">
          {steps.map((item, i) => (
            <div
              key={item.id}
              onClick={() => {
                setIndex(i);
                setShowNext(false);
              }}
              className="cursor-pointer"
            >
              <p
                className={`text-sm ${
                  i === index ? "text-orange-400" : "text-white"
                }`}
              >
                {item.id}. {item.right}
              </p>

              {i !== steps.length - 1 && (
                <div className="h-[1px] bg-white/20 my-2 w-40 ml-auto"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* NEXT SECTION */}
 <AnimatePresence>
  {showNext && (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      {/* 🔥 STATS */}
      <div className="flex items-center justify-center gap-16 mb-16">
        
        {/* ITEM 1 */}
        <div className="text-center">
          <h2 className="text-orange-400 text-5xl font-bold">100+</h2>
          <p className="text-white/50 text-xs tracking-widest mt-2">
            COUNTRIES
          </p>
        </div>

        {/* DIVIDER */}
        <div className="w-[1px] h-12 bg-white/20"></div>

        {/* ITEM 2 */}
        <div className="text-center">
          <h2 className="text-orange-400 text-5xl font-bold">50,000+</h2>
          <p className="text-white/50 text-xs tracking-widest mt-2">
            PROJECTS WORLDWIDE
          </p>
        </div>

        {/* DIVIDER */}
        <div className="w-[1px] h-12 bg-white/20"></div>

        {/* ITEM 3 */}
        <div className="text-center">
          <h2 className="text-orange-400 text-5xl font-bold">35+</h2>
          <p className="text-white/50 text-xs tracking-widest mt-2">
            INDUSTRY LEADERSHIP
          </p>
        </div>
      </div>

      {/* 🔥 HEADING */}
      <h2 className="text-6xl font-bold mb-6 leading-tight">
        Engineered Without <br /> Compromise
      </h2>

      {/* 🔥 SUBTEXT */}
      <p className="text-white/50 max-w-xl">
        Every panel. Every layer. Tested, certified, and trusted on six continents.
      </p>
    </motion.div>
  )}
</AnimatePresence>
    </section>
  );
}