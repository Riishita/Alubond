import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("exit"), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "exit") {
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 1200);
    }
  }, [phase, onComplete]);

  // Diamond shapes for the logo mark
  const diamonds = [
    { size: 90, color: "hsl(var(--navy))" },
    { size: 64, color: "hsl(233 50% 22%)" },
    { size: 42, color: "hsl(var(--orange-brand))" },
  ];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background that zooms */}
          <motion.div
            className="absolute inset-0 bg-background"
            animate={
              phase === "exit"
                ? { scale: 20, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Logo group */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            animate={
              phase === "exit"
                ? { scale: 0.4, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Diamond logo mark */}
            <div className="relative flex items-center justify-center">
              {diamonds.map((d, i) => (
                <motion.div
                  key={i}
                  className="absolute rotate-45"
                  style={{
                    width: d.size,
                    height: d.size,
                    backgroundColor: d.color,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* Brand name */}
            <motion.h1
              className="mt-12 text-3xl font-bold tracking-[0.35em] text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ fontFamily: "var(--font-display)" }}
            >
              ALUBOND
            </motion.h1>

            {/* Progress bar */}
            <motion.div
              className="h-[2px] w-40 overflow-hidden rounded-full bg-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
