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
    <section className="relative text-white py-32 px-6 md:px-16 overflow-hidden">

      {/* ================= PREMIUM BLUE BACKGROUND ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3B4D8F_0%,#1E2A5A_45%,#141B3A_100%)]" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff0f_1px,transparent_1px),linear-gradient(90deg,#ffffff0f_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[120px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* BLOBS */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[120px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ top: "10%", left: "10%" }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[140px]"
        animate={{ x: [0, -60, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        style={{ bottom: "10%", right: "10%" }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl">
        <p className="text-xs tracking-[0.3em] text-white/50 mb-6">
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

        <p className="text-white/70 max-w-xl mb-10">
          Get datasheets, fire test reports, and sample panels delivered
          to your specification team.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 flex-wrap">

          {/* PRIMARY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white text-[#1E2A5A] font-medium flex items-center gap-2 shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Request Technical Specs <ArrowRight size={16} />
          </motion.button>

          {/* SECONDARY */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-all"
          >
            Downloads
          </motion.button>
        </div>
      </div>

      {/* BOTTOM LIGHT */}
      <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-t from-blue-500/20 to-transparent" />
    </section>
  );
};

/* ================= FOOTER ================= */

const Footer = () => {
  return (
    <footer className="bg-[#E9E6E1] text-[#3D4B2F] px-8 md:px-20 py-20">

      {/* ================= TOP ================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">

        {/* PRODUCTS */}
        <div>
          <p className=" text-xs tracking-widest opacity-60 mb-4">
            Precision-engineered façade solutions designed to bring architectural vision to life.
          </p>
          {/* <ul className="space-y-2">
            {[
              "Macronutrient Fertilizers",
              "Micronutrient Fertilizers",
              "Feed Additives",
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className="cursor-pointer hover:opacity-70 transition"
              >
                {item}
              </motion.li>
            ))}
          </ul> */}
        </div>

        {/* Technical Resources */}
        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Technical Resources
          </p>
          <ul className="space-y-2">
            {[
             "BIM Families",
            "Technical Datasheets",
            "Installation Guidelines",
            "Certifications & Reports",
             "Brochures",
            "Request a Sample",
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className="cursor-pointer hover:opacity-70 transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Quick Links
          </p>
          <ul className="space-y-2">
            {["Home", "Technology", "Projects", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className="cursor-pointer hover:opacity-70 transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            Social
          </p>
          <ul className="space-y-2">
            {[
             "LinkedIn",
            "Instagram",
            "Facebook",
            "YouTube",

            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className="cursor-pointer hover:opacity-70 transition"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:text-right">
          <p className="uppercase text-xs tracking-widest opacity-60 mb-4">
            If you have any questions
          </p>

          <p className="uppercase text-xs tracking-widest opacity-60 mb-6">
            Feel free to contact us:
          </p>

          <h3 className="text-lg md:text-xl font-semibold tracking-wide">
            info@alubondusa.com
          </h3>

          <p className="mt-6 text-xs tracking-widest cursor-pointer hover:opacity-70">
            +1 (305) 000-0000
          </p>
        </div>
      </div>

      {/* ================= CENTER LOGO ================= */}
      <div className="flex justify-center my-16">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 bg-[#141B3A] rounded-full flex items-center justify-center"
        >
          {/* Replace with actual logo */}
          <span className="text-white text-4xl">
            <img
  src="/alubond-logo.png"
  alt="logo"
  className="w-30 h-30 object-contain"
/>
          </span>
        </motion.div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs tracking-wide opacity-70 gap-4">
        <p>© 2026 Alubond U.S.A. All rights reserved.</p>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:opacity-100">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:opacity-100">
            Terms of Use
          </span>
        </div>
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