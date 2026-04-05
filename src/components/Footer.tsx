"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* ================= CTA SECTION ================= */

const CTASection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const glowX = useTransform(mouseX, (v) => v - 200);
  const glowY = useTransform(mouseY, (v) => v - 200);

  return (
    <section className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff0f_1px,transparent_1px),linear-gradient(90deg,#ffffff0f_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-orange-500/20 blur-[120px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* BLOBS */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[100px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "10%" }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[120px]"
        animate={{ x: [0, -60, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "10%", right: "10%" }}
      />

      <motion.div
        className="absolute w-[250px] h-[250px] bg-white/5 rounded-full blur-[90px]"
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "50%", left: "50%" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl">
        <p className="text-xs tracking-[0.3em] text-white/40 mb-6">
          006 / Let's Build
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          REQUEST <br /> TECHNICAL SPECS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 max-w-xl mb-10"
        >
          Get datasheets, fire test reports, and sample panels delivered
          to your specification team.
        </motion.p>

        {/* BUTTONS */}
        <div className="flex gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-medium flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all"
          >
            Request Technical Specs <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-all"
          >
            Downloads
          </motion.button>
        </div>
      </div>

      {/* BOTTOM LIGHT */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-orange-500/10 to-transparent" />
    </section>
  );
};

/* ================= FOOTER ================= */

const Footer = () => {
  const links = [
    "BIM Families",
    "Technical Datasheets",
    "Installation Guidelines",
    "Certifications & Reports",
    "Brochures",
    "Request a Sample",
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10 px-6 md:px-16 py-20">

      <div className="grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Alubond</h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Precision-engineered façade solutions designed to bring
            architectural vision to life.
          </p>
        </div>

        {/* TECH */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">
            Technical Resources
          </h4>
          <ul className="space-y-3">
            {links.map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="text-white/70 text-sm cursor-pointer hover:text-white transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {["Home", "Technology", "Projects", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="text-white/70 text-sm cursor-pointer hover:text-white transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/40 mb-4">
            Social
          </h4>
          <ul className="space-y-3">
            {["LinkedIn", "Instagram", "Facebook", "YouTube"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6 }}
                className="text-white/70 text-sm cursor-pointer hover:text-white transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-16 pt-6 border-t border-white/10 text-white/40 text-sm flex justify-between flex-col md:flex-row gap-4">
        <p>© 2026 Alubond. All rights reserved.</p>
        <p>Designed with premium UI.</p>
      </div>
    </footer>
  );
};

/* ================= FINAL ================= */

export default function FinalSection() {
  return (
    <>
      <CTASection />
      <Footer />
    </>
  );
}