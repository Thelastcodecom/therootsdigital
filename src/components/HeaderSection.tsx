"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [show16171B, setShow16171B] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos < 20) {
      setScrollDirection(null);
      setShow16171B(false);
    } else {
      if (currentScrollPos < prevScrollPos) {
        // scrolling up
        setScrollDirection("up");
        setShow16171B(true);
      } else if (currentScrollPos > prevScrollPos) {
        // scrolling down
        setScrollDirection("down");
        setShow16171B(false);
      }
    }

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const getLinkClasses = (href: string, isScrolled: boolean) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    const base =
      "text-md tracking-wider tracking-widest transition-colors duration-300 hover:text-lime-accent";
    if (isScrolled) {
      return `${base} ${isActive ? "text-lime-accent" : "text-white"}`;
    } else {
      return `${base} ${isActive ? "text-lime-accent" : "text-white"}`;
    }
  };

  // Variant for nav link stagger
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
      {/* Transparent / Black Navbar */}
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrollDirection === null ? "py-4" : "py-3 shadow-lg"
        }`}
        style={{
          backgroundColor: scrollDirection === null ? "transparent" : "black",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-col leading-none text-white font-bold text-2xl"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [-5, 5, -5, 0] }}
              transition={{
                duration: 1.2,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="flex flex-col leading-none text-white font-bold text-2xl"
            >
              <Image
                src="/images/logo.webp"
                alt="The Roots Digital Logo"
                width={180}
                height={120}
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-15">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex space-x-15"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={navLinkVariants}>
                  <Link
                    href={link.href}
                    className={getLinkClasses(
                      link.href,
                      scrollDirection !== null
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full"
            style={{ backgroundColor: "#C4EF17" }}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-lime-accent p-3 rounded-full hover:bg-opacity-90 transition duration-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <Image
                src="/images/category.svg"
                alt="Category Icon"
                width={20}
                height={20}
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* #16171B Slide-In Navbar */}
      {show16171B && (
        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 w-full z-50 bg-[#16171B] shadow-lg py-3"
        >
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
            <Link
              href="/"
              className="flex flex-col leading-none text-white font-bold text-2xl"
            >
              <Image
                src="/images/logo.webp"
                alt="The Roots Digital Logo"
                width={180}
                height={120}
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-15">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="flex space-x-15"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={navLinkVariants}>
                    <Link
                      href={link.href}
                      className={getLinkClasses(link.href, true)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </nav>

            <div
              className="flex items-center justify-center h-14 w-14 rounded-full"
              style={{ backgroundColor: "#C4EF17" }}
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-lime-accent p-3 rounded-full hover:bg-opacity-90 transition duration-300 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <Image
                  src="/images/category.svg"
                  alt="Category Icon"
                  width={20}
                  height={20}
                />
              </motion.button>
            </div>
          </div>
        </motion.header>
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-black z-40 flex flex-col pl-5 justify-center space-y-8 md:hidden"
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {navLinks.map((link) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl tracking-wider ${
                pathname === link.href ? "text-lime-accent" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Navbar;
