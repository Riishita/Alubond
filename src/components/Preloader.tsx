import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 2000);
    const t2 = setTimeout(() => setPhase("expand"), 2800);
    const t3 = setTimeout(() => onComplete(), 4200); // ⏱ slightly delayed

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const squares = [
    { size: 260, color: "hsl(233 55% 14%)" },
    { size: 200, color: "hsl(233 50% 22%)" },
    { size: 140, color: "hsl(230 40% 28%)" },
    { size: 90, color: "hsl(32 90% 48%)" },
    { size: 50, color: "hsl(32 85% 58%)" },
  ];

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

        {/* 🔵 BACKGROUND (NO FADE NOW) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, #3B4D8F 0%, #1E2A5A 50%, #141B3A 100%)",
          }}
        />

        {/* 🔲 MAIN BOX */}
        <motion.div
          className="relative flex items-center justify-center overflow-hidden"
          animate={{
            scale:
              phase === "shrink"
                ? 0.4
                : phase === "expand"
                ? 18
                : 1,
            borderRadius: phase === "shrink" ? "50%" : "20px",
          }}
          transition={{
            duration: phase === "expand" ? 1.4 : 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            width: 260,
            height: 260,
            background: "#141B3A",
          }}
        >
          {/* 🔳 LAYERS */}
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
                  initial={{ scale: 0, rotate: 90, opacity: 0 }}
                  animate={{
                    scale: [0, 1.05, 1],
                    rotate: [45, 0],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          )}

          {/* 🔥 LOGO (ONLY THIS FADES) */}
          <motion.img
            src="/alubond-logo.png"
            alt="logo"
            className="relative z-10 w-24"
            animate={{
              scale: phase === "shrink" ? 0.9 : 1,
              opacity: phase === "expand" ? 0 : 1,
              filter: phase === "expand" ? "blur(6px)" : "blur(0px)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;