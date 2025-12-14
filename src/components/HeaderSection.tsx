"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
        className="fixed top-0 left-0 w-full z-50"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSidebarOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        className={`hidden md:block fixed inset-0 bg-black z-40 ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* ================= SIDEBAR ================= */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block fixed top-0 right-0 h-full w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 z-50"
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-8 right-8 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <div className="p-12 pt-24 space-y-12">
          <div>
            <h2 className="text-3xl font-light mb-6">Brief us</h2>
            <p className="text-gray-400">info@therootsdigital.com</p>
            <p className="text-gray-400">tel: 727-334-6567</p>
          </div>

          <div>
            <h2 className="text-3xl font-light mb-6">Our Office</h2>
            <p className="text-gray-400">
              7901 4th Street, Saint Petersburg, FL
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
