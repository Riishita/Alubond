import { motion, useReducedMotion } from "framer-motion";
import CursorGridTrail from "./CursorFollower";
import Navbar from "./Navbar";


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
      
      {/* Cursor + Navbar */}
      <CursorGridTrail excludeTopPx={NAV_EXCLUDE_TOP_PX} />
      <Navbar />

      {/* 🔥 HERO VIDEO (smooth entry synced with preloader) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden shadow-[inset_0_0_160px_rgba(0,0,0,0.35)]">
        
        <motion.div
          className="absolute inset-[-12%] h-[124%] w-[124%]"
          
          // 👇 THIS makes transition feel continuous from preloader
          initial={{ scale: 1.1 }}
          animate={reduceMotion ? { scale: 1 } : { scale: [1.1, 1.03, 1] }}
          
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <video
            className="h-full w-full cursor-none object-cover object-center brightness-[0.92] contrast-[1.09] saturate-[1.14]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-facade-poster.jpg"
          >
            <source src="/hero-facade-premium.mp4" type="video/mp4" />
            <source
              src="https://assets.mixkit.co/videos/49844/49844-720.mp4"
              type="video/mp4"
            />
            <source src="/hero-alubond.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 🎨 GRADIENT OVERLAYS (premium look) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(233_55%_6%/0.2)] via-[hsl(233_50%_12%/0.48)] to-[hsl(233_55%_8%/0.82)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(233_55%_10%/0.2)] via-[hsl(233_45%_15%/0.15)] to-[hsl(230_40%_18%/0.4)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_70%_35%,hsl(32_90%_48%/0.07),transparent_30%)]" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-[1] cursor-none bg-radial-glow" />

      {/* 🔥 MAIN CONTENT */}
      <div className="relative z-10 flex w-full cursor-none items-center justify-between px-8 md:px-16 lg:px-24">
        
        {/* LEFT SIDE */}
        <div className="max-w-3xl">
          
          <motion.p
            className="mb-6 text-xs tracking-[0.4em] text-muted-foreground uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Alubond U.S.A — Est. 1989
          </motion.p>

          <motion.h1
            className="mb-0 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Tested for
            <br />
            Safety.
          </motion.h1>

          <motion.h2
            className="mb-8 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ color: "hsl(var(--cursor-blue))" }}
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
          >
            High-performance composite panels engineered for safety,
            designed for the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button className="group flex items-center gap-3 rounded-full border border-foreground/20 bg-secondary/50 px-8 py-4 text-xs tracking-[0.3em] text-foreground uppercase transition-colors hover:bg-secondary">
              <span>Discover Innovation</span>
              <span className="text-base">↓</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="hidden flex-col items-end gap-10 md:flex">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.2 }}
            >
              <p className="text-4xl font-bold text-foreground lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
          <div className="h-20 w-[1px] bg-foreground/20" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[8] h-32 cursor-none bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default LandingHero;