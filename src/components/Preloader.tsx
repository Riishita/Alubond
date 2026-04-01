import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "shrink" | "expand">("loading");

  // progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("shrink"), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "shrink") {
      setTimeout(() => setPhase("expand"), 600);
    }
    if (phase === "expand") {
      setTimeout(() => onComplete(), 900);
    }
  }, [phase, onComplete]);

  const squares = [
    { size: 280, color: "hsl(233 55% 14%)" }, // 👈 OUTER COLOR
    { size: 210, color: "hsl(233 50% 22%)" },
    { size: 150, color: "hsl(230 40% 28%)" },
    { size: 100, color: "hsl(32 90% 48%)" },
    { size: 60, color: "hsl(32 85% 58%)" },
  ];

  return (
    <AnimatePresence>
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    
    {/* 🔥 THIS is the animated square */}
    <motion.div
      className="flex items-center justify-center"
      
      animate={{
        scale:
          phase === "shrink"
            ? 0.2
            : phase === "expand"
            ? 20
            : 1,

        opacity: phase === "expand" ? 0 : 1,

        borderRadius: phase === "shrink" ? "20px" : "0px",
      }}

      transition={{
        scale: {
          type: "spring",
          stiffness: 90,
          damping: 20,
        },
        opacity: {
          duration: 0.6,
        },
      }}

      style={{
        width: 280,
        height: 280,
        background: "hsl(233 55% 14%)", // 👈 outer square color
      }}
    >

      {/* 👇 CONTENT INSIDE SQUARE */}
      {phase === "loading" && (
        <div className="relative flex items-center justify-center">
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
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          <span className="relative z-10 text-white font-bold tracking-widest">
            ALUBOND
          </span>
        </div>
      )}
    </motion.div>

  </div>
</AnimatePresence>
  );
};

export default Preloader;