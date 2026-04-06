"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Item {
  image: string;
  title: string;
  subtitle: string;
  index: string;
}

export default function ChromaGrid({ items }: { items: Item[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 320; // card width scroll
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative max-w-[1300px] mx-auto">

      {/* LEFT BUTTON */}
      <button
        onClick={() => scroll("left")}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
      >
        <ChevronLeft className="text-white" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => scroll("right")}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="min-w-[280px] max-w-[280px] bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 group"
            whileHover={{ y: -8 }}
          >
            {/* IMAGE */}
            <div className="h-[180px] overflow-hidden">
              <motion.img
                src={item.image}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* TEXT */}
            <div className="p-4">
              <p className="text-xs text-white/50 mb-1">{item.index}</p>
              <h3 className="text-sm font-semibold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}