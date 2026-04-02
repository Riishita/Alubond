import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "shrink" | "expand">("loading");

  // timing control (cleaner than progress)
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
    { size: 260, color: "hsl(233 55% 14%)" },
    { size: 200, color: "hsl(233 50% 22%)" },
    { size: 140, color: "hsl(230 40% 28%)" },
    { size: 90, color: "hsl(32 90% 48%)" },
    { size: 50, color: "hsl(32 85% 58%)" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-hero-gradient"

        // 🔥 FULL SCREEN → SQUARE → FULL SCREEN
        animate={{
          scale: phase === "shrink" ? 0.25 : 1,
          borderRadius: phase === "shrink" ? "28px" : "0px",
        }}

        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* INNER SQUARE */}
        <motion.div
          className="flex items-center justify-center relative"

          animate={{
            scale:
              phase === "shrink"
                ? 0.85 // 👈 micro shrink
                : phase === "expand"
                ? 14 // 👈 explode
                : 1,

            opacity: phase === "expand" ? 0 : 1,
          }}

          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}

          style={{
            width: 260,
            height: 260,
            background: "hsl(233 55% 14%)",
          }}
        >
          {/* LAYERS */}
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              {squares.map((sq, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: sq.size,
                    height: sq.size,
                    backgroundColor: sq.color,
                  }}
                  initial={{ scale: 0, rotate: 45, opacity: 0 }}
                  animate={{
                    scale: [0, 1.1, 1],
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

          {/* LOGO */}
          <motion.span
            className="relative z-10 text-white font-bold tracking-widest"

            animate={{
              opacity: phase === "shrink" ? 0 : 1,
              scale: phase === "shrink" ? 0.8 : 1,
            }}

            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            ALUBOND
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;