"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
  { name: "OUR PRICING", href: "/our-pricing" },
];

const Navbar = () => {
  const pathname = usePathname();

  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ---------------- SCROLL LOGIC ---------------- */
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 20);

      if (currentY > lastY && currentY > 80) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- LINK STYLES ---------------- */
  const getLinkClasses = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return `
      text-md tracking-widest transition-colors duration-300
      ${isActive ? "text-lime-accent" : "text-white hover:text-lime-accent"}
    `;
  };

  const handleToggleClick = () => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen((p) => !p);
    } else {
      setIsMobileMenuOpen((p) => !p);
    }
  };

  /* ---------------- ANIMATIONS ---------------- */
  const navLinkVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 ${
          isMobileMenuOpen ? "hidden md:flex" : "flex"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: scrollDir === "down" ? "-100%" : "0%",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: scrolled ? "#16171B" : "transparent",
        }}
      >
        <div
          className={`container mx-auto px-4 md:px-8 flex justify-between items-center transition-all duration-300
    ${
      scrolled
        ? "py-2 md:py-2 lg:py-2 xl:py-3 shadow-lg"
        : "py-3 md:py-3 lg:py-3 xl:py-4"
    }
  `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [-5, 5, -5, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src="/images/logo.webp"
                alt="The Roots Digital Logo"
                width={160}
                height={105}
                className="md:w-[150px] lg:w-[150px] xl:w-[180px]"
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-14">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className="flex space-x-14"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={navLinkVariants}>
                  <Link href={link.href} className={getLinkClasses(link.href)}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Toggle Button */}
          <div
            className="flex items-center justify-center
  h-12 w-12 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-14 xl:w-14
  rounded-full bg-lime-accent"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleToggleClick}
              className="p-3 rounded-full"
            >
              <Image
                src="/images/category.svg"
                alt="Menu"
                width={20}
                height={20}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-black z-40 flex flex-col pl-5 justify-center space-y-8 md:hidden"
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white"
        >
          ✕
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-2xl tracking-wider ${
              pathname === link.href ? "text-lime-accent" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </motion.div>

      {/* ================= SIDEBAR OVERLAY ================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-60"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= SIDEBAR ================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-1/3 bg-[#16171B] z-70"
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition"
            >
              ✕
            </button>

            <div className="p-12 pt-24 space-y-12">
              <div>
                <h2 className="text-3xl text-white font-light mb-6">
                  Brief us
                </h2>
                <p className="text-gray-400">info@therootsdigital.com</p>
                <p className="text-gray-400">tel: 727-334-6567</p>
              </div>

              <div>
                <h2 className="text-3xl text-white font-light mb-6">
                  Our Office
                </h2>
                <p className="text-gray-400">
                  7901 4th Street, Saint Petersburg, FL
                </p>
              </div>

              <div>
                <h2 className="text-3xl text-white font-light mb-6">
                  Follow us
                </h2>

                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://www.instagram.com/therootsdigital/"
                      target="_blank"
                      className="group inline-flex items-center gap-3 text-gray-300 hover:text-white transition"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        Instagram
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-3 text-gray-300 hover:text-white transition"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 group-hover:translate-x-1" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        Facebook
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
