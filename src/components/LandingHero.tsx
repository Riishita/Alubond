"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";

import CursorGridTrail from "./CursorFollower";
import Navbar from "./Navbar";

const NAV_EXCLUDE_TOP_PX = 96;

const stats = [
  { value: "35+", label: "YEARS" },
  { value: "90+", label: "COUNTRIES" },
  { value: "50K+", label: "PROJECTS" },
];

const LandingHero = () => {
  const reduceMotion = useReducedMotion();
  const heroSectionRef = useRef<HTMLDivElement>(null);

  // 🎥 VIDEO CONTROL
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 🔥 start video exactly when preloader finishes
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 3000); // match preloader expand timing

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={heroSectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 🌊 BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 40%),
            radial-gradient(circle at 30% 70%, rgba(80,140,220,0.35), transparent 50%),
            linear-gradient(135deg, #dbeafe 0%, #93c5fd 40%, #60a5fa 70%, #3b82f6 100%)
          `,
        }}
      />

      <CursorGridTrail
        excludeTopPx={NAV_EXCLUDE_TOP_PX}
        sectionRef={heroSectionRef}
      />
      <Navbar />

      {/* 🎥 VIDEO */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          className="absolute inset-[-12%] h-[124%] w-[124%]"
          initial={{ scale: 1.2 }}
          animate={
            reduceMotion
              ? { scale: 1 }
              : { scale: [1.2, 1] }
          }
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center brightness-[0.9] contrast-[1.05]"
            muted
            playsInline
            preload="auto"
            poster="/hero-facade-poster.jpg"
          >
            <source src="https://cdn.pixabay.com/video/2024/07/04/219337_large.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-[#0f172a]/60 to-[#0f172a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/50 via-transparent to-[#0f172a]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_40%,rgba(96,165,250,0.15),transparent_20%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex w-full items-center justify-between px-8 md:px-16 lg:px-24">

        {/* LEFT */}
        <div className="max-w-3xl">
          <motion.p
            className="mb-6 text-xs tracking-[0.4em] text-white/50 uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Alubond U.S.A — Est. 1989
          </motion.p>

          <motion.h1
            className="text-5xl font-medium leading-tight text-white md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            WORLD’S LARGEST
          </motion.h1>

          <motion.h2
            className="mb-8 text-5xl font-medium md:text-7xl lg:text-8xl"
            style={{ color: "#59c4ee" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ACP <br /> BRAND
          </motion.h2>

          <motion.p
            className="mb-10 max-w-md text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            High-performance composite panels engineered for safety,
            designed for the extraordinary.
          </motion.p>

          <button className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-xs tracking-[0.3em] text-white uppercase backdrop-blur-md hover:bg-white/20">
            Discover Innovation ↓
          </button>
        </div>

        {/* RIGHT */}
        <div className="hidden flex-col items-end gap-10 md:flex">
          {stats.map((stat) => (
            <div key={stat.label} className="text-right">
              <p className="text-4xl text-white lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />
    </div>
  );
};

export default LandingHero;