"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";

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

export default function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 🎥 VIDEO SCRUB
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }

      // STEP CHANGE
      const step = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );

      setActiveStep(step);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="h-[400vh] relative">

      {/* STICKY */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* VIDEO */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/drgg4st9a/video/upload/v1775642742/Scroll-Controll_j55tct.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
          muted
          playsInline
          preload="auto"
        />

        {/* LEFT CONTENT */}
        <div className="absolute left-16 top-1/4 -translate-y-1/2 max-w-xl text-white z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-orange-400 mb-2">
                {steps[activeStep].id}
              </p>

              <h2 className="text-4xl mb-4">
                {steps[activeStep].title}
              </h2>

              <p className="text-white/70 mb-4">
                {steps[activeStep].desc}
              </p>

              <p className="text-xs text-white/50">
                {steps[activeStep].details}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT NAV */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-right space-y-4 z-10">
          {steps.map((item, i) => (
            <p
              key={item.id}
              className={`cursor-pointer text-sm ${
                i === activeStep
                  ? "text-orange-500"
                  : "text-white/40"
              }`}
              onClick={() => setActiveStep(i)}
            >
              {item.id}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
}