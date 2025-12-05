"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    const baseClasses =
      "text-md  tracking-wider transition-colors tracking-widest duration-300 hover:text-lime-accent";

    if (isScrolled) {
      return `${baseClasses} ${isActive ? "text-lime-accent" : "text-white"}`;
    } else {
      return `${baseClasses} text-white`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "bg-black shadow-lg py-3" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {}
        <Link
          href="/"
          className="flex flex-col leading-none text-white font-bold text-2xl"
        >
          {}
          <Image
            src="/images/logo.webp"
            alt="The Roots Digital Logo"
            width={180}
            height={120}
          />
        </Link>

        {}
        {}
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
            {}
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

      {}
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
