import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "Safety", href: "#safety" },
  { label: "Finishes", href: "#finishes" },
  { label: "Applications", href: "#applications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
  src="/Logo1.png"
  alt="Alubond U.S.A"
  className="h-20 md:h-22 object-contain brightness-110 contrast-110"
/>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
        >
          <motion.span
            className="block h-[2px] w-7 bg-white/90"
            animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-[2px] w-7 bg-white/90"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-[2px] w-7 bg-white/90"
            animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      {/* Overlay + Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 🔵 Gradient Overlay */}
            <motion.div
              className="fixed inset-0 z-30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,27,58,0.5), rgba(20,27,58,0.7))",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 🔥 Gradient Side Menu */}
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-full w-full items-center justify-center sm:w-1/2"
              style={{
                background:
                  "linear-gradient(135deg, #1f2b5e 0%, #3db3d7 100%)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl md:text-3xl lg:text-5xl font-medium text-white/90 transition-colors hover:text-[#EA6A2A]"
                    style={{ fontFamily: "var(--font-display)" }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom info */}
              <motion.div
                className="absolute bottom-10 left-0 right-0 flex justify-center gap-12 text-[11px] uppercase tracking-[0.2em] text-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>info@alubondusa.com</span>
                <span>+1 (305) 000-0000</span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;