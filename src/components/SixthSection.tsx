"use client";

import { motion } from "framer-motion";

const tabs = [
  "Wood", "Metallic", "Stone & Marbles", "Patina",
  "Concrete", "Texture", "Brush", "Anodised",
  "Najdi", "Prismatic", "Sparkle"
];

const woods = [
  "/wood1.jpg", "/wood2.jpg", "/wood3.jpg", "/wood4.jpg",
  "/wood5.jpg", "/wood6.jpg", "/wood7.jpg", "/wood8.jpg",
  "/wood9.jpg", "/wood10.jpg", "/wood11.jpg", "/wood12.jpg"
];

export default function PaletteSection() {
  return (
    <section className="bg-[#f7f7f5]">

      {/* ================= HERO ================= */}
      <div className="relative h-[70vh] w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="/building.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-16">
          
          <p className="text-white/70 text-sm tracking-[0.3em] mb-6">
            003 / COLOR & FINISHES
          </p>

          <h1 className="text-white text-6xl md:text-8xl font-bold leading-[0.95] max-w-3xl">
            A PALETTE <br /> WITHOUT LIMITS
          </h1>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="relative -mt-12 z-20 flex justify-center">
        <div className="bg-[#0b1a3a] px-6 py-4 rounded-full flex gap-3 overflow-x-auto">

          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all
              ${i === 0
                ? "bg-white text-black"
                : "text-white/70 hover:text-white border border-white/10"}
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-10 mt-16">

        <p className="text-[#6B6B6B] text-lg mb-10">
          <span className="font-medium text-black">
            Wood-grain ACP finishes
          </span>{" "}
          — natural warmth and depth for façades and interiors.
        </p>

        {/* ================= SWATCH CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-[#e5e5e5]"
        >

          <div className="flex gap-6 overflow-x-auto pb-2">
            {woods.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08 }}
                className="min-w-[90px] h-[90px] rounded-xl overflow-hidden shadow-md cursor-pointer"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
      {/* ================= CTA STRIP ================= */}
<div className="max-w-6xl mx-auto px-10 mt-20">

  {/* divider line */}
  <div className="w-full h-[1px] bg-black/10 mb-10" />

  <div className="flex items-center justify-between gap-6">

    {/* LEFT TEXT */}
    <p className="text-[#6B6B6B] text-lg max-w-xl leading-relaxed">
      Over 200 colours, wood grains, stone finishes, and metallic
      effects available.
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
</div>

      {/* spacing */}
      <div className="h-24" />
    </section>
  );
}