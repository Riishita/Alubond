"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ================= DATA CONFIG ================= */

const heroData = {
  image: "/images/Hero-palatte.jpeg",

  label: "003 / Color & Finishes",
  title: ["A Palette", "Without Limits"],

  // 🔥 CONTROL HERE
  overlay: {
    opacityFrom: 0.5, // bottom (0–1)
    opacityVia: 0.4,  // middle
    opacityTo: 0.0,   // top
  },

  text: {
    color: "#ffffff",
    opacity: 1,
  },
};

const categories = [
  "Wood",
  "Metallic",
  "Stone & Marbles",
  "Patina",
  "Concrete",
  "Texture",
  "Brush",
  "Anodised",
  "Najdi",
  "Prismatic",
  "Sparkle",
];

const words = [
  "Innovation", "Durability", "Sustainability", "Performance",
  "Precision", "Excellence", "Design", "Quality",
];

const materials = [
  { name: "Dark Slate", image: "/materials/swatch-marble.jpg", category: "Stone & Marbles" },
  { name: "Brushed Silver", image: "/images/metal.jpg", category: "Metallic" },
  { name: "Travertine Beige", image: "/images/marble.jpg", category: "Stone & Marbles" },
  { name: "Copper Patina", image: "/images/patina.jpg", category: "Patina" },
  { name: "Raw Concrete", image: "/images/concrete.jpg", category: "Concrete" },
  { name: "Natural Oak", image: "/materials/wood1.jpeg", category: "Wood" },
];

/* ================= HERO ================= */

const HeroSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100vh]">
      
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={heroData.image}
          className="w-full h-[110%] object-cover"
        />

        {/* 🔥 DYNAMIC OVERLAY */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top,
              rgba(0,0,0,${heroData.overlay.opacityFrom}),
              rgba(0,0,0,${heroData.overlay.opacityVia}),
              rgba(0,0,0,${heroData.overlay.opacityTo})
            )`,
          }}
        />
      </motion.div>

      

      {/* Text */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full px-8 md:px-16 pb-20"
        style={{ y: textY }}
      >
        <motion.p
  className="text-xs tracking-[0.3em] text-white/50 uppercase mb-16"
  style={{
    color: heroData.text.color,
    opacity: 0.9,
    textShadow: "0 2px 10px rgba(106, 106, 106, 0.6)",
  }}
>
  {heroData.label}
</motion.p>


        <motion.h1
  className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight"
  style={{
    color: heroData.text.color,
    textShadow: "0 4px 20px rgba(0,0,0,0.8)", // 🔥 makes text pop
  }}
>
          {heroData.title[0]}
          <br />
          {heroData.title[1]}
        </motion.h1>
      </motion.div>
    </section>
  );
};

/* ================= MARQUEE ================= */


const MarqueeStrip = () => {
  return (
    <div className="py-6 bg-[#1a5c80] text-white overflow-hidden">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20, // 🔥 speed control (lower = faster)
        }}
      >
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-[0.15em] uppercase opacity-60"
          >
            {word} <span className="mx-4 opacity-30">●</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ================= MATERIALS ================= */

const MaterialsSection = () => {
  const [active, setActive] = useState("Wood");
  const [hovered, setHovered] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "Wood"
      ? materials
      : materials.filter((m) => m.category === active);

  return (
    <section ref={ref} className="py-24 px-8 md:px-16 bg-white">

      {/* ================= FILTERS ================= */}
      <motion.div
        className="flex flex-wrap gap-3 mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {categories.map((cat, i) => (
  <motion.button
    key={cat}
    onClick={() => setActive(cat)}
    className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300
      ${
        active === cat
          ? "border-blue-500 text-orange-500 bg-white shadow-sm"
          : "border-gray-300 text-gray-700 bg-white hover:border-gray-500"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: i * 0.05 }}
  >
    {cat}
  </motion.button>
))}
      </motion.div>

      {/* ================= DESCRIPTION ================= */}
      <motion.p
        className="text-gray-500 text-base md:text-lg mb-12 max-w-xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
      >
        Texture series — tactile surface interest for feature walls and cladding.
      </motion.p>

      {/* ================= SWATCHES ================= */}
      <div className="flex flex-wrap gap-5 mb-20">
        <AnimatePresence mode="popLayout">
          {filtered.map((mat, i) => (
            <motion.div
              key={mat.name}
              layout
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Card */}
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shadow-md"
                whileHover={{ scale: 1.15, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap z-20"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                  >
                    {mat.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ================= BOTTOM ================= */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-500 text-sm md:text-base max-w-md mb-6 md:mb-0">
          Over 200 colours, wood grains, stone finishes, and metallic effects available.
        </p>

          <button className="group mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E5E5E5] text-[#1A1A1A] overflow-hidden relative transition-all duration-300">
            
            <span className="relative z-10 group-hover:text-white transition">
              Explore Color Studio
            </span>

            <span className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white">
              →
            </span>

            {/* hover bg */}
            <span className="absolute inset-0 bg-[#1A1A1A] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
          </button>
      </motion.div>
    </section>
  );
};

/* ================= FINAL ================= */

export default function SixthSection() {
  return (
    <div className="relative">

      {/* HERO (sticks) */}
      <HeroSection />

      {/* SCROLL CONTENT (slides over) */}
      <div className="relative z-20 bg-white">
        <MarqueeStrip />
        <MaterialsSection />
      </div>

    </div>
  );
}