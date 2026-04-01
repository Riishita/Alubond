import { motion } from "framer-motion";
import CursorGridTrail from "./CursorFollower";
import Navbar from "./Navbar";

/** ~fixed nav bar height (py-5 + logo); trail ignores this top band so the navbar keeps a normal cursor and no grid. */
const NAV_EXCLUDE_TOP_PX = 96;

const stats = [
  { value: "35+", label: "YEARS" },
  { value: "90+", label: "COUNTRIES" },
  { value: "50K+", label: "PROJECTS" },
];

const LandingHero = () => {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient">
      <CursorGridTrail excludeTopPx={NAV_EXCLUDE_TOP_PX} />
      <Navbar />

      {/* Radial glow */}
      <div className="absolute inset-0 cursor-none bg-radial-glow" />

      {/* Content — cursor hidden only on landing body, not the navbar */}
      <div className="relative z-10 flex w-full cursor-none items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Left side - Text */}
        <div className="max-w-3xl">
          <motion.p
            className="mb-6 text-xs tracking-[0.4em] text-muted-foreground uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Alubond U.S.A — Est. 1989
          </motion.p>

          <motion.h1
            className="mb-0 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tested for
            <br />
            Safety.
          </motion.h1>

          <motion.h2
            className="mb-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-display)", color: "hsl(var(--cursor-blue))" }}
          >
            Crafted for
            <br />
            Legacy.
          </motion.h2>

          <motion.p
            className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ fontFamily: "var(--font-body)" }}
          >
            High-performance composite panels engineered for safety,
            designed for the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <button className="group flex items-center gap-3 rounded-full border border-foreground/20 bg-secondary/50 px-8 py-4 text-xs tracking-[0.3em] text-foreground uppercase transition-colors hover:bg-secondary">
              <span style={{ fontFamily: "var(--font-body)" }}>Discover Innovation</span>
              <span className="text-base">↓</span>
            </button>
          </motion.div>
        </div>

        {/* Right side - Stats */}
        <div className="hidden flex-col items-end gap-10 md:flex">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.2 }}
            >
              <p className="text-4xl font-bold text-foreground lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground uppercase" style={{ fontFamily: "var(--font-body)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
          {/* Vertical line */}
          <div className="h-20 w-[1px] bg-foreground/20" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 cursor-none bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default LandingHero;
