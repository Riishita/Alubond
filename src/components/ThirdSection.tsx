import { motion } from "framer-motion";

const ThirdSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0b1a3a] text-white py-32 px-6 md:px-16 overflow-hidden">

      {/* 🔵 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1a3a] via-[#0f2a5c] to-[#020617]" />

      {/* 🪨 MARBLE PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-5xl rounded-3xl p-16 mb-24 shadow-[0_40px_120px_rgba(0,0,0,0.6)] border border-white/20"
        style={{
          backgroundImage: `
            url("https://www.transparenttextures.com/patterns/marble.png"),
            linear-gradient(145deg, #e5e7eb, #9ca3af)
          `,
          backgroundBlendMode: "overlay",
        }}
      >
        {/* ✨ INNER SHADOW (engraved feel) */}
        <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" />

        {/* 🔥 ENGRAVED TEXT */}
        <div className="text-center">

          <p className="text-xs tracking-[0.3em] text-black/60 uppercase mb-6">
            001 / Technology
          </p>

          <h2
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{
              color: "#1f2937",
              textShadow: `
                1px 1px 0px #ffffff,
                -1px -1px 0px #9ca3af
              `,
            }}
          >
            ALUBOND
          </h2>

          <h2
            className="text-5xl md:text-7xl font-bold tracking-tight"
            style={{
              color: "#f59e0b",
              textShadow: `
                1px 1px 0px #fff7ed,
                -1px -1px 0px #92400e
              `,
            }}
          >
            PHILOSOPHY
          </h2>

          {/* 💬 QUOTE */}
          <p className="mt-8 italic text-black/70 text-lg">
            “Architecture should speak of its time and place, but yearn for timelessness.”
          </p>

          <p className="mt-3 text-xs text-orange-500 tracking-widest">
            — FRANK GEHRY
          </p>
        </div>
      </motion.div>

      {/* 📖 STORY CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Highlight */}
        <div className="flex items-start justify-center gap-4 mb-8">
          <div className="w-[2px] h-12 bg-orange-400 mt-1" />
          <p className="text-white/80 italic text-lg">
            A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity.
          </p>
        </div>

        {/* Paragraph */}
        <p className="text-white/60 leading-relaxed text-base md:text-lg">
          At Alubond, we believe every façade must do justice to the architect's vision while delivering the precision,
          consistency, and reliability demanded on site. Our philosophy is rooted in quality without compromise, care in every detail,
          and a deep understanding of what each project requires — from architects and consultants to façade contractors and developers.
          Because great façades are not simply manufactured. They are understood, engineered, and brought to life with intent.
        </p>
      </motion.div>

      {/* 🌫️ BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />

    </section>
  );
};

export default ThirdSection;