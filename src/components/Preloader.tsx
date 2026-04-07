"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<
    "loading" | "shrink" | "circle" | "fade" | "expand"
  >("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 1400);
    const t2 = setTimeout(() => setPhase("circle"), 2000);
    const t3 = setTimeout(() => setPhase("fade"), 2400);
    const t4 = setTimeout(() => setPhase("expand"), 2800);
    const t5 = setTimeout(() => onComplete(), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const squares = [
    { size: 260, color: "#141B3A" },
    { size: 200, color: "#1E2A5A" },
    { size: 140, color: "#2C3E78" },
    { size: 90, color: "#EA6A2A" },
    { size: 50, color: "#F28C52" },
  ];

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

        {/* 🌈 MOVING GRADIENT BACKGROUND */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #0a1445, #1e3a8a, #4f9fb8)",
              "radial-gradient(circle at 80% 30%, #1e3a8a, #4f9fb8, #0a1445)",
              "radial-gradient(circle at 40% 80%, #4f9fb8, #0a1445, #1e3a8a)",
              "radial-gradient(circle at 20% 20%, #0a1445, #1e3a8a, #4f9fb8)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        

        {/* 🔥 MAIN SHAPE */}
        <motion.div
          className="flex items-center justify-center relative overflow-hidden"
          animate={{
            scale:
              phase === "shrink" ||
              phase === "circle" ||
              phase === "fade"
                ? 0.5
                : phase === "expand"
                ? 14
                : 1,

            borderRadius:
              phase === "circle" ||
              phase === "fade" ||
              phase === "expand"
                ? "50%"
                : "20px",

            opacity: phase === "expand" ? 0 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            width: 260,
            height: 260,
            background: "#141B3A",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          }}
        >
          {/* 🌊 GLOW */}
          {phase !== "expand" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: phase === "shrink" ? 0.85 : 1.15,
                opacity: 0.25,
              }}
              transition={{ duration: 0.6 }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #4C63B6, transparent)",
                  filter: "blur(60px)",
                }}
              />
            </motion.div>
          )}

          {/* 🟦 SQUARE LAYERS (UNCHANGED BUT ENHANCED) */}
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {squares.map((sq, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-lg"
                  style={{
                    width: sq.size,
                    height: sq.size,
                    backgroundColor: sq.color,
                  }}
                  initial={{ scale: 0, rotate: 45, opacity: 0 }}
                  animate={{
                    scale: [0, 1.08, 1],
                    rotate: [45, 0],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          )}

          {/* 🔥 LOGO */}
          <motion.img
            src="/alubond-logo.png"
            alt="Alubond"
            className="relative z-10 w-24"
            animate={{
              opacity: phase === "fade" ? 0 : 1,
              scale: phase === "fade" ? 0.85 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;