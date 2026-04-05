"use client";

import { motion } from "framer-motion";

export default function ChromaGrid({ items }: any) {
  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">

      {items.map((item: any, i: number) => {
        const center = (items.length - 1) / 2;
        const distance = i - center;

        // 🔥 curved spread
        const offsetX = distance * 180;
        const offsetY = Math.abs(distance) * 25;

        // 🔥 depth scale
        const scale = 1 - Math.abs(distance) * 0.08;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: offsetX + 50 }}
            animate={{ opacity: 1, x: offsetX }}
            transition={{ delay: i * 0.07 }}
            className="absolute"
            style={{
              transform: `translateY(${offsetY}px) scale(${scale})`,
              zIndex: 100 - Math.abs(distance),
            }}
          >
            <Card item={item} />
          </motion.div>
        );
      })}

    </div>
  );
}

/* ================= CARD ================= */
function Card({ item }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.12, y: -25, zIndex: 999 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-[260px] h-[320px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] cursor-pointer relative bg-black"
      style={{
        border: `1px solid ${item.borderColor}`,
      }}
    >
      {/* IMAGE */}
      <img
        src={item.image}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e";
        }}
        className="w-full h-full object-cover opacity-90"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* TEXT */}
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <p className="text-xs opacity-60">{item.handle}</p>
        <h3 className="text-lg font-semibold leading-tight">
          {item.title}
        </h3>
        <p className="text-sm opacity-80">{item.subtitle}</p>
      </div>
    </motion.div>
  );
}