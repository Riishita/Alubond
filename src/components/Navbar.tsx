import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import alubondLogo from "@/assets/alubond-logo.png";

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
      <motion.nav
        className="fixed left-0 right-0 top-0 z-50 flex cursor-auto items-center justify-between px-8 py-5 md:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={alubondLogo} alt="Alubond U.S.A" className="h-10 w-auto brightness-0 invert md:h-12" />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px]"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-[2px] w-7 bg-foreground"
            animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-[2px] w-7 bg-foreground"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-[2px] w-7 bg-foreground"
            animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex cursor-auto items-center justify-center bg-background"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold tracking-tight text-foreground transition-colors hover:text-primary md:text-6xl lg:text-7xl"
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
              className="absolute bottom-10 left-0 right-0 flex justify-center gap-12 text-[11px] tracking-[0.2em] text-muted-foreground uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>info@alubondusa.com</span>
              <span>+1 (305) 000-0000</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
