import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  onComplete: () => void;
};

const Preloader = ({ onComplete }: Props) => {
  const [phase, setPhase] = useState<"loading" | "shrink" | "expand">("loading");
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 1200);
    const t2 = setTimeout(() => setPhase("expand"), 2000);

    // 🔥 start fade
    const t3 = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsFading(true);
      });
    }, 2300);

    // 🔥 remove after fade
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
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
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "rgba(15, 23, 42, 0.6)", // 🔥 KEY FIX
      }}
    >
      {/* MAIN BOX */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden"
        animate={{
          scale:
            phase === "shrink"
              ? 0.3
              : phase === "expand"
              ? 18
              : 1,
          borderRadius: phase === "shrink" ? "24px" : "0px",
        }}
        transition={{
          duration: phase === "expand" ? 1.2 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: 260,
          height: 260,
          background: "#141B3A",
        }}
      >
        {/* SQUARES */}
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

        {/* LOGO */}
        <motion.img
          src="/alubond-logo.png"
          alt="logo"
          className="relative z-10 w-24"
          animate={{
            opacity: phase === "expand" ? 0 : 1,
            scale: phase === "shrink" ? 0.9 : 1,
            filter: phase === "expand" ? "blur(10px)" : "blur(0px)",
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;