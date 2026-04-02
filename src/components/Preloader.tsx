import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "shrink" | "expand">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 1200);
    const t2 = setTimeout(() => setPhase("expand"), 2000);
    const t3 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, #3B4D8F 0%, #1E2A5A 50%, #141B3A 100%)",
        }}
      >
        {/* 🔥 MAIN CONTAINER (LOGO + SHAPE TOGETHER) */}
        <motion.div
          className="relative flex items-center justify-center overflow-hidden"
          animate={{
            scale:
              phase === "shrink"
                ? 0.4
                : phase === "expand"
                ? 20 // 🚀 zoom everything together
                : 1,
            borderRadius: phase === "shrink" ? "50%" : "20px",
          }}
          transition={{
            duration: phase === "expand" ? 1.2 : 0.9,
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
                  initial={{ scale: 0, rotate: 45, opacity: 0 }}
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

          {/* 🔥 LOGO (NOW ZOOMS WITH CONTAINER) */}
          <motion.img
  src="/alubond-logo.png"
  alt="logo"
  className="relative z-10 w-24"
  animate={{
    scale: phase === "shrink" ? 0.9 : 1,
    opacity: phase === "expand" ? 0 : 1,
  }}
  transition={{
    duration: 0.2,
    delay: phase === "expand" ? 0.2 : 0,
    ease: "easeOut",
  }}
/>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;