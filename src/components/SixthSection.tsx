"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const filters = [
  "Wood",
  "Metallic",
  "Stone & Marbles",
  "Patina",
  "Concrete",
  "Texture",
  "Brush",
  "Anodised",
  "Prismatic",
  "Sparkle",
];

const swatches = [
  "/wood/1.jpg",
  "/wood/2.jpg",
  "/wood/3.jpg",
  "/wood/4.jpg",
  "/wood/5.jpg",
  "/wood/6.jpg",
  "/wood/7.jpg",
  "/wood/8.jpg",
  "/wood/9.jpg",
  "/wood/10.jpg",
  "/wood/11.jpg",
  "/wood/12.jpg",
];

export default function PaletteSection() {
  const [active, setActive] = useState("Wood");

  return (
    <section className="w-full bg-[#f8f8f8] text-black">

      {/* ================= HERO ================= */}
      <div className="relative h-[40vh] w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="/images/Building"
          className="absolute inset-0 w-full h-12x0% object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-10 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-sm text-white/60 mb-3 tracking-widest">
              003 / Color & Finishes
            </p>

            <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight">
              A Palette <br /> Without Limits
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0b1a3a]/90 px-6 md:px-16 py-4 flex gap-3 overflow-x-auto">

        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300
              ${
                active === item
                  ? "bg-white text-black shadow-md"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 md:px-20 py-16">

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-500 max-w-xl mb-10"
        >
          Wood-grain ACP finishes — natural warmth and depth for façades and
          interiors.
        </motion.p>

        {/* Swatches */}
        <div className="flex gap-5 overflow-x-auto pb-6">

          {swatches.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[90px] h-[90px] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={img}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <p className="text-gray-500">
            Over 200 colours, wood grains, stone finishes, and metallic effects
            available.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            Explore Color Studio →
          </motion.button>
        </div>
      </div>
    </section>
  );
}