"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ================= DATA ================= */

const projects = [
  { title: "Burj Khalifa", location: "Dubai, UAE", image: "/Gallary/10.webp" },
  { title: "Doha Tower", location: "Qatar", image: "/Gallary/2.jpg" },
  { title: "Airport Terminal", location: "Abu Dhabi", image: "/Gallary/3.jpg" },
  { title: "Stadium", location: "Qatar", image: "/Gallary/4.jpg" },
  { title: "Expo Pavilion", location: "Dubai", image: "/Gallary/5.jpg" },
  { title: "City Tower", location: "UAE", image: "/Gallary/6.jpg" },
  { title: "Cultural Center", location: "Europe", image: "/Gallary/7.jpg" },
  { title: "Business Hub", location: "Singapore", image: "/Gallary/8.jpg" },
  { title: "Glass Tower", location: "London", image: "/Gallary/9.webp" },
  { title: "Mega Mall", location: "Dubai", image: "/Gallary/12.webp" },
  { title: "Smart Building", location: "Tokyo", image: "/Gallary/15.jpg" },
  { title: "Urban Plaza", location: "New York", image: "/Gallary/14.jpg" },
];

export default function ProjectsGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative bg-[#0b0b0c] text-white py-28 px-6 md:px-16 overflow-hidden">

      {/* ================= PREMIUM BACKGROUND ================= */}

      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c] via-[#111111] to-[#0b0b0c]" />

      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity }}
        style={{ top: "10%", left: "10%" }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[140px]"
        animate={{ x: [0, -60, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 35, repeat: Infinity }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* ================= HEADER ================= */}
      <div className="relative z-10 text-center mb-20">
        <p className="text-xs tracking-[0.3em] text-white/40 mb-4">
          005 / Global Projects
        </p>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          TRUSTED BY <br /> ARCHITECTS WORLDWIDE
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl mx-auto">
          From iconic towers in the Gulf to cultural landmarks across Europe —
          Alubond panels define skylines on every continent.
        </p>
      </div>

      {/* ================= MASONRY GRID ================= */}
      <div
        ref={ref}
        className="relative z-10 columns-1 md:columns-3 gap-6 space-y-6"
      >
        {projects.map((item, i) => (
          <motion.div
            key={i}
            className="break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.05,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -8 }}
          >
            {/* glow border */}
            <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 blur-[10px]" />
              <div className="absolute inset-[1px] rounded-2xl bg-[#0b0b0c]" />
            </div>

            {/* image */}
            <motion.img
              src={item.image}
              className="w-full h-auto object-cover relative z-10"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.6 }}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500 z-10" />

            {/* text */}
            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition duration-500 z-20">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-white/70">{item.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}