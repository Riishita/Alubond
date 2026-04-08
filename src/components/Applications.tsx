"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const cards = [
  {
    img: "/images/BUILDINGFACADES.png",
    title: "BUILDING FACADES",
    desc:
      "Curtain walls, rainscreen cladding, and architectural envelope systems.",
    id: "01",
  },
  {
    img: "/images/trailer.jpeg",
    title: "AUTOMOBILE INDUSTRY",
    desc: "Lightweight panels for vehicle bodies and trailers.",
    id: "02",
  },
  {
    img: "/images/coporate identity.png",
    title: "CORPORATE IDENTITY",
    desc: "Signage and branded installations.",
    id: "03",
  },
  {
    img: "/images/machine covers.jpg",
    title: "MACHINE COVERS",
    desc: "Industrial enclosures and housings.",
    id: "04",
  },
  {
    img: "/images/elevators .avif",
    title: "ELEVATORS & INTERIORS",
    desc: "Interior panels and partitions.",
    id: "05",
  },
  {
    img: "/images/marine .jpg",
    title: "MARINE & OFFSHORE",
    desc: "Corrosion-resistant panels.",
    id: "06",
  },
  {
    img: "/images/bullet train.png",
    title: "TRAINS & COACHES",
    desc: "Fire-rated lightweight panels.",
    id: "07",
  },
];

export default function HeroSection() {
  const [pause, setPause] = useState(false);

  return (
    <div className="w-full h-screen relative overflow-hidden text-white gradient-amaterasu px-0 py-29">
      
        {/* LEFT BIG HEADING */}
        <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "50px",
        }}
      >
        {/* small label */}
        <p className="text-xs tracking-[0.3em] text-white/50 uppercase mt-16">
          004 / Applications
        </p>

        {/* heading + right text */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h2 className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight mt-5">
              <span className="block text-[#dadada]">
                WHERE ALUBOND <br />
                PERFORMS
              </span>
            </h2>

          <p
            style={{
              maxWidth: "300px",
              color: "#d7d7d7",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            Seven industries. One material.
            <br />
            Endless architectural possibility.
          </p>
        </div>
      </div>

      {/* CARDS SECTION */}
      <div className="relative mt-12 md:mt-20">
        
        {/* LEFT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-40 bg-gradient-to-r from-[#1e2a5a] to-transparent z-10" />

        {/* RIGHT FADE */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-40 bg-gradient-to-l from-[#4da3a6] to-transparent z-10" />

        <motion.div
          className="flex gap-5 md:gap-8 px-6 md:px-16 w-max"
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          animate={{ x: pause ? 0 : ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {[...cards, ...cards].map((card, i) => (
            <div
              key={i}
              className="w-[260px] md:w-[320px] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-[160px] md:h-[200px] object-cover"
              />

              <div className="p-4 md:p-5">
                <p className="text-xs text-gray-300">{card.id}</p>

                <h3 className="text-sm md:text-lg font-semibold mt-1">
                  {card.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}