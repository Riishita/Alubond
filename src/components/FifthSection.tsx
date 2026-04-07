"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import MarbleResilienceVideo from "@/components/MarbleResilienceVideo";

const certs = [
  { title: "EN 13501", desc: "European Fire Classification", tag: "CLASS A2-S1,D0" },
  { title: "NFPA 285", desc: "Fire Propagation", tag: "FULLY COMPLIANT" },
  { title: "BS 8414", desc: "British Standard", tag: "BRE CERTIFIED" },
  { title: "ULC-S134", desc: "Canadian Fire Test", tag: "COMPLIANT" },
  { title: "ASTM E-84", desc: "Smoke & Flame Spread", tag: "CLASS A RATING" },
  { title: "ISO 9001", desc: "Quality Management", tag: "CERTIFIED FACILITY" },
];

export default function FireHorizontalExperience() {
  const [isHovered, setIsHovered] = useState(false);

  const topRow = certs.slice(0, 3);
  const bottomRow = certs.slice(3, 6);

  return (
    <section className="relative py-32 bg-[#F7F7F5] overflow-hidden">


       {/* ✨ VERY LIGHT GRID */}
<div className="absolute inset-0 pointer-events-none opacity-[0.06]">

  {/* Vertical lines */}
  <div className="grid grid-cols-6 h-full">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="border-r border-black" />
    ))}
  </div>

  {/* 🔥 Horizontal line 1 (top half) */}
  <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black" />

  {/* 🔥 Horizontal line 2 (bottom half) */}
  <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black" />

</div>

      <div className="max-w-7xl mx-auto px-10 relative z-10">

        {/* HEADER */}
        <div className="mb-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <div className="max-w-3xl">

          <p className="text-xs tracking-[0.3em] text-black/40 uppercase mb-16">
          002 / FIRE & SAFETY
        </p>

          <h2 className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight">
              <span className="block text-[#2b2b2b]">
                Fire Standards
              </span>
              <span className="block text-orange-500">
                & Certifications
              </span>
            </h2>

          <p className="mt-6 text-[#6B6B6B] text-lg max-w-xl">
            From European classifications to American NFPA codes,
            every panel is independently tested and globally certified
            for fire performance.
          </p>

          {/* 🔥 PREMIUM BUTTON */}
          <button className="group mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300">
            
            <span className="relative z-10 group-hover:text-white transition">
              View all certifications
            </span>

            <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>

            {/* hover bg */}
            <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
          </button>
          </div>

          {/* Right: marble resilience video (visual only) */}
          <div className="mx-auto w-full max-w-md mt-14  lg:mx-0 lg:max-w-none">
            <MarbleResilienceVideo />
          </div>
        </div>

        {/* EDGE FADE (LEFT + RIGHT)
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#F7F7F5] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#F7F7F5] to-transparent z-20" /> */}

       <div
  className="overflow-hidden cursor-grab active:cursor-grabbing"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <motion.div
    drag="x"
    dragConstraints={{ left: -500, right: 0 }}
    animate={{ x: isHovered ? 0 : [0, -500] }}
    transition={{
      repeat: Infinity,
      duration: 15,
      ease: "linear",
    }}
    className="flex gap-8 w-max"
  >
    {[...certs, ...certs].map((item, i) => (
      <Card key={i} item={item} />
    ))}
  </motion.div>
</div>

      </div>
    </section>
  );
}

/* ================= CARD ================= */
function Card({ item }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="min-w-[280px] p-6 rounded-2xl border bg-white/90 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300"
      style={{ borderColor: "#E5E5E5" }}
    >
      <h3 className="text-xl font-semibold tracking-tight text-[#1A1A1A]">
        {item.title}
      </h3>

      <p className="text-sm mt-2 text-[#6B6B6B]">
        {item.desc}
      </p>

      <p className="text-sm mt-4 font-medium tracking-wide text-[#E1654A]">
        {item.tag}
      </p>
    </motion.div>
  );
}