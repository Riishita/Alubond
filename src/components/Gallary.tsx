"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const panels = [
  { src: "/Gallary/10.webp", title: "The Address Downtown", location: "Dubai, UAE" },
  { src: "/Gallary/9.webp", title: "Red Sea Airport", location: "NEOM, Saudi Arabia" },
  { src: "/Gallary/7.jpg", title: "Yas Marina Circuit", location: "Abu Dhabi, UAE" },
  { src: "/Gallary/4.jpg", title: "Landmark Development", location: "Croatiar" },
  { src: "/Gallary/5.jpg", title: "Wood Finish", location: "Luxury" },
  { src: "/Gallary/14.jpg", title: "Burj Khalifa", location: "Dubai, UAE" },
];

export default function PremiumGridGallery() {
  return (
    <section className="relative text-white py-32 overflow-hidden">

      {/* 🔥 PREMIUM BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* 🔥 RADIAL GLOW */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 🔳 GRID */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/10" />
          ))}
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 mb-24">
        <p className="text-sm tracking-[0.3em] text-white/40 mb-6">
          005 / GLOBAL PROJECTS
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          TRUSTED BY <br />
          ARCHITECTS WORLDWIDE
        </h1>

        <p className="mt-8 text-lg text-white/60 leading-relaxed">
          From iconic towers in the Gulf to cultural landmarks across Europe —
          Alubond panels define skylines on every continent.
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {panels.map((panel, i) => (
          <GridCard key={i} panel={panel} index={i} />
        ))}
      </div>

      {/* ================= BUTTON ================= */}
      <div className="relative z-10 flex justify-center mt-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative px-10 py-4 border border-white/20 rounded-full overflow-hidden"
        >
          {/* SHIMMER */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700" />

          {/* TEXT */}
          <span className="relative z-10 text-sm tracking-[0.3em] uppercase text-white">
            View All Projects
          </span>
        </motion.button>
      </div>

    </section>
  );
}

/* ================= GRID CARD ================= */

function GridCard({ panel, index }: any) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      transition={{ delay: index * 0.05 }}
      className="relative h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden group"
    >
      {/* IMAGE */}
      <motion.img
        src={panel.src}
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* GRID LINES */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-white/20" />
          ))}
        </div>
      </div>

      {/* TEXT */}
      <div className="absolute bottom-6 left-6">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/60">
          {panel.location}
        </p>

        <h3 className="text-lg md:text-xl font-semibold mt-2">
          {panel.title}
        </h3>

        <div className="w-0 group-hover:w-20 h-[2px] bg-white mt-2 transition-all duration-500" />
      </div>

      {/* BORDER */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition duration-500" />
    </motion.div>
  );
}