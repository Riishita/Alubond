import { motion, useReducedMotion } from "framer-motion";
import CursorGridTrail from "./CursorFollower";
import Navbar from "./Navbar";

/* Hero video: modern glass tower façades (curtain-wall / composite panel context).
 * Footage: Mixkit — Stock Video Free License —
 * https://mixkit.co/free-stock-video/aerial-view-to-modern-glass-buildings-of-a-big-city-49844/ */

/** ~fixed nav bar height (py-5 + logo); trail ignores this top band so the navbar keeps a normal cursor and no grid. */
const NAV_EXCLUDE_TOP_PX = 96;

const stats = [
  { value: "35+", label: "YEARS" },
  { value: "90+", label: "COUNTRIES" },
  { value: "50K+", label: "PROJECTS" },
];

const LandingHero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient">
      <CursorGridTrail excludeTopPx={NAV_EXCLUDE_TOP_PX} />
      <Navbar />

      {/* Full-bleed architectural hero — glass façades / tower envelope (premium automotive-style grade) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden shadow-[inset_0_0_160px_rgba(0,0,0,0.35)]">
        <motion.div
          className="absolute inset-[-12%] h-[124%] w-[124%]"
          initial={{ scale: 1 }}
          animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.05, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <video
            className="h-full w-full cursor-none object-cover object-center brightness-[0.92] contrast-[1.09] saturate-[1.14]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-facade-poster.jpg"
            aria-hidden
          >
            <source src="/hero-facade-premium.mp4" type="video/mp4" />
            <source
              src="https://assets.mixkit.co/videos/49844/49844-720.mp4"
              type="video/mp4"
            />
            <source src="/hero-alubond.mp4" type="video/mp4" />
            {/* <source
              src="https://alubond-web-design.vercel.app/assets/videos/alubond%20fr.mp4"
              type="video/mp4"
            /> */}
          </video>
        </motion.div>
        {/* Richer gold-navy grade so glass highlights read “luxury” without washing out type */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[hsl(233_55%_6%/0.2)] via-[hsl(233_50%_12%/0.48)] to-[hsl(233_55%_8%/0.82)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[hsl(233_55%_10%/0.2)] via-[hsl(233_45%_15%/0.15)] to-[hsl(230_40%_18%/0.4)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_70%_35%,hsl(32_90%_48%/0.07),transparent_30%)]"
          aria-hidden
        />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-[1] cursor-none bg-radial-glow" />

      {/* Content — cursor hidden only on landing body, not the navbar */}
      <div className="relative z-10 flex w-full cursor-none items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Left side - Text */}
        <div className="max-w-3xl">
          <motion.p
            className="mb-6 text-xs tracking-[0.4em] text-muted-foreground uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 }}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Alubond U.S.A — Est. 1989
          </motion.p>

          <motion.h1
            className="mb-0 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.8, delay: 0.6 }}
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
      <div className="absolute bottom-0 left-0 right-0 z-[8] h-32 cursor-none bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default LandingHero;