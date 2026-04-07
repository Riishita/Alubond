"use client";

import Globe from "react-globe.gl";
import { useRef, useEffect, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export default function GlobeHero() {
  const globeRef = useRef<any>();
  const sectionRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [showPoints, setShowPoints] = useState(false); // ✅ NEW

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* 🌍 GLOBE ANIMATION */
  const globeScale = useTransform(scrollYProgress, [0, 1], [2.2, 1]);
  const globeY = useTransform(scrollYProgress, [0, 1], ["55%", "-10%"]);
  const globeX = useTransform(scrollYProgress, [0, 1], ["-50%", "25%"]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // ✅ FIXED
  const textScale = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const leftY = useTransform(scrollYProgress, [0.15, 0.4], [80, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* 📍 LOCATIONS */
  const locations = [
    { name: "India", lat: 20.5937, lng: 78.9629, logo: "alubond-logo.png", description: "Alubond India, Gurugram Haryana, India." },
    { name: "Europe", lat: 50.1109, lng: 8.6821, logo: "alubond-logo.png", description: "Alubond Europe Industrial Zone Europe." },
    { name: "UAE", lat: 23.4241, lng: 53.8478, logo: "alubond-logo.png", description: "Dubai Investment Park, UAE." },
    { name: "USA", lat: 37.0902, lng: -95.7129, logo: "alubond-logo.png", description: "New York, USA." },
    { name: "Canada", lat: 56.1304, lng: -106.3468, logo: "alubond-logo.png", description: "Toronto, Canada." },
    { name: "Turkey", lat: 38.9637, lng: 35.2433, logo: "alubond-logo.png", description: "Istanbul, Turkey." },
    { name: "Vietnam", lat: 14.0583, lng: 108.2772, logo: "alubond-logo.png", description: "Ho Chi Minh City, Vietnam." },
    { name: "Egypt", lat: 26.8206, lng: 30.8025, logo: "alubond-logo.png", description: "Cairo, Egypt." },
  ];

  /* 🎯 HANDLE CLICK */
  const handleClick = (name: string) => {
    const place = locations.find((l) => l.name === name);
    if (!place) return;

    setSelectedPlace(place);

    globeRef.current.pointOfView(
      {
        lat: place.lat,
        lng: place.lng,
        altitude: 1.8,
      },
      1200
    );
  };

  /* ⚙️ CONTROLS */
  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
  }, []);

  /* 🔥 SHOW POINTS WHEN LEFT CONTENT APPEARS */
  useEffect(() => {
    const unsubscribe = leftOpacity.on("change", (val) => {
      if (val > 0.5) {
        setShowPoints(true);
      } else {
        setShowPoints(false);
      }
    });

    return () => unsubscribe();
  }, [leftOpacity]);

  /* 🌍 GLOBE */
  const globe = useMemo(
    () => (
      <Globe
        ref={globeRef}
        width={600}
        height={600}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="rgba(0,0,0,0)"

        // ✅ CONDITIONAL MARKERS
        pointsData={showPoints ? locations : []}
        pointLat={(d: any) => d.lat}
        pointLng={(d: any) => d.lng}
        pointColor={() => "#3b82f6"}
        pointAltitude={0.02}
        pointRadius={0.5}

        htmlElementsData={showPoints ? locations : []}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          el.innerHTML = `
            <div style="
              display:flex;
              flex-direction:column;
              align-items:center;
              transform: translate(-50%, -120%);
              color:white;
              font-size:12px;
            ">
              <img src="${d.logo}" style="width:24px;height:24px;margin-bottom:4px;" />
              <span>${d.name}</span>
            </div>
          `;
          return el;
        }}
      />
    ),
    [showPoints] // ✅ important
  );

  return (
    <section ref={sectionRef} className="h-[300vh] relative bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">

        <div className="gradient-amaterasu min-h-screen px-10 py-24" />

        {/* TEXT */}
        <motion.h1
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute top-[15%] w-full text-center text-white font-light tracking-[-2px] text-[clamp(60px,12vw,180px)]"
        >
          Global Impact
        </motion.h1>

        {/* GLOBE */}
        <motion.div
          style={{ scale: globeScale, y: globeY, x: globeX }}
          className="absolute left-1/2 bottom-0 -translate-x-1/2"
        >
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute w-[800px] h-[800px] 
            bg-[radial-gradient(circle,rgba(59,130,246,0.25),transparent_70%)] 
            blur-[120px] rounded-full -z-10"
          />
          {globe}
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          style={{ opacity: leftOpacity, y: leftY }}
          className="absolute left-[6%] top-[32%] -translate-y-1/2 max-w-xl text-white"
        >
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Our Global Presence <br />
            <span>Powers Local Delivery</span>
          </h2>

          <div className="mb-6">
            <p className="text-xs text-white/70 mb-2">● MANUFACTURING</p>
            <div className="flex flex-wrap gap-3">
              {["UAE", "India", "Europe"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleClick(item)}
                  className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-white/70 mb-2">● OFFICES</p>
            <div className="flex flex-wrap gap-3">
              {["USA", "Canada", "Egypt", "Turkey", "Vietnam"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleClick(item)}
                  className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-[6%] bottom-[3%] w-[30%] max-w-xl 
              p-8 rounded-2xl bg-gradient-to-r from-[#020617] to-[#0f172a] 
              border border-white/10 text-white"
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 text-white/50"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-2">
                {selectedPlace.name}
              </h2>

              <p className="text-white/70 mb-4">
                {selectedPlace.description}
              </p>

              <button className="px-6 py-2 rounded-full border border-orange-400 text-orange-400">
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}