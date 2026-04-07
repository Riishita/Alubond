"use client";

import { motion } from "framer-motion";

const images = [
  {
    src: "/Gallary/1.jpg",
    title: "Burj Khalifa",
    location: "Dubai",
  },
  {
    src: "/Gallary/2.jpg",
    title: "Sky Tower",
    location: "New York",
  },
  {
    src: "/images/building3.jpg",
    title: "Glass House",
    location: "London",
  },
  {
    src: "/images/building4.jpg",
    title: "Urban Edge",
    location: "Singapore",
  },
];

export default function BuildingGallery() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {images.map((img, i) => (
          <Card key={i} img={img} />
        ))}

      </div>
    </section>
  );
}

/* ================= CARD ================= */

function Card({ img }: any) {
  return (
    <div className="group relative h-[420px] overflow-hidden rounded-2xl cursor-pointer">

      {/* 🔳 BASE IMAGE */}
      <img
        src={img.src}
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-700"
      />

      {/* 🔥 BUILDING REVEAL LAYER */}
      <motion.div
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileHover={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={img.src}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 🌫 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-500" />

      {/* 🧱 GRID LINES (construction feel) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-500 pointer-events-none">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-white/20" />
          ))}
        </div>
      </div>

      {/* ✨ TEXT */}
      <div className="absolute bottom-6 left-6 text-white">
        <p className="text-xs tracking-[0.3em] uppercase opacity-70">
          {img.location}
        </p>
        <h3 className="text-xl font-semibold mt-1">
          {img.title}
        </h3>
      </div>

    </div>
  );
}