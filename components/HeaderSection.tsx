"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Navigation links data
const navLinks = [
  { name: "HOME", href: "/" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
  { name: "OUR PRICING", href: "/pricing" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper to determine link classes based on scroll state and active route
  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    const baseClasses =
      "text-md  tracking-wider transition-colors tracking-widest duration-300 hover:text-lime-accent";

    if (isScrolled) {
      // Scrolled state: Active is lime, inactive is white
      return `${baseClasses} ${isActive ? "text-lime-accent" : "text-white"}`;
    } else {
      // Top state (transparent): All links are white (based on Image 2)
      // Note: If you want the active state to show even on transparent bg, change 'text-white' to:
      // isActive ? "text-lime-accent" : "text-white"
      return `${baseClasses} text-white`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-dark-bg shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* --- Logo --- */}
        <Link
          href="/"
          className="flex flex-col leading-none text-white font-bold text-2xl"
        >
          {/* Simple text representation of the logo */}
          <Image
            src="/images/logo.webp"
            alt="The Roots Digital Logo"
            width={150}
            height={50}
          />
        </Link>

        {/* --- Desktop Navigation --- */}
        {/* Hidden on mobile (md:flex) */}
        <nav className="hidden md:flex items-center space-x-15">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={getLinkClasses(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {}
        <div
          className="flex items-center justify-center h-14 w-14 rounded-full"
          style={{ backgroundColor: "#C4EF17" }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-lime-accent p-3 rounded-full hover:bg-opacity-90 transition duration-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {/* The grid icon SVG */}
            <Image
              src="/images/category.svg"
              alt="Category Icon"
              width={20}
              height={20}
              className="text-dark-bg"
            />
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay (Optional based on request, but necessary for responsiveness) --- */}
      <div
        className={`fixed inset-0 bg-dark-bg bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button for mobile menu */}
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
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            className={`text-2xl font-bold tracking-wider ${
              pathname === link.href ? "text-lime-accent" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
