import { motion } from "framer-motion";

const ThirdSection = () => {
  return (
    <section className="relative min-h-screen bg-[#eae7e2] text-[#1f2937] pt-40 pb-32 overflow-hidden">

      {/* ✨ VERY LIGHT GRID */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-r border-black" />
          ))}
        </div>
      </div>

      {/* 📦 CONTENT */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto">

        {/* 🔶 LABEL */}
        <p className="text-xs tracking-[0.3em] text-black/40 uppercase mb-16">
          001 / Technology
        </p>

        {/* 🧱 TOP GRID */}
        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.95] tracking-tight">
              <span className="block text-[#2b2b2b]">
                ALUBOND
              </span>
              <span className="block text-orange-500">
                PHILOSOPHY
              </span>
            </h2>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-black/70 leading-relaxed"
          >
            Architecture should speak of its time and place, but yearn for timelessness.
            <div className="mt-4 text-sm text-orange-500 tracking-widest">
              — FRANK GEHRY
            </div>
          </motion.div>
        </div>

        {/* 🔸 DIVIDER */}
        <div className="flex items-center gap-4 my-20">
          <div className="flex-1 h-[1px] bg-black/10" />
          <div className="w-2 h-2 bg-orange-500 rotate-45" />
          <div className="flex-1 h-[1px] bg-black/10" />
        </div>

        {/* 📖 STORY */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <p className="text-lg italic text-black/70 mb-6">
            A façade is not just the outer skin of a building — it is the expression of its character, ambition, and identity.
          </p>

          <p className="text-black/60 leading-relaxed">
            At Alubond, we believe every façade must do justice to the architect's vision while delivering precision,
            consistency, and reliability. Our philosophy is rooted in quality without compromise, care in every detail,
            and a deep understanding of what each project requires.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ThirdSection;