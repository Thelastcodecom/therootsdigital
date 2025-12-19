"use client";

import React, { useState, useRef } from "react";

// --- Icon Definitions ---
type IconProps = React.SVGProps<SVGSVGElement>;

const Facebook: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const ArrowUpRight: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

// --- Magnetic Button Component ---
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  href = "#",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const strength = 0.3;

    setPosition({
      x: deltaX * strength,
      y: deltaY * strength,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative block ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered
          ? "transform 0.15s ease-out"
          : "transform 0.5s ease-out",
      }}
    >
      {children}
    </a>
  );
};

const Footer: React.FC = () => {
  const backgroundImageUrl = "/images/footer/footer.webp";

  const socialLinks = [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Our Pricing", href: "/pricing" },

  ];

  const utilityLinks = [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden ">
      {/* Background Image Section - FIXED: Full height with horizontal repeat */}
      <div className="relative min-h-[380px] md:min-h-[360px] lg:min-h-[380px]">
        {/* Background Image Container */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "auto 100%", // Full height, auto width
            backgroundRepeat: "repeat-x", // Repeat horizontally
            backgroundPosition: "center bottom", // Align to bottom center
          }}
        >
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

          {/* Seamless blend overlay for repeated images */}
          <div
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                to right,
                transparent 0%,
                transparent 45%,
                rgba(0,0,0,0.1) 50%,
                transparent 55%,
                transparent 100%
              )`,
              backgroundSize: "auto 100%",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
            {/* 1. Magnetic PING US Button */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start items-center">
              <MagneticButton href="/contact" className="group">
                <div className=" relative w-44 h-44 sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-72 xl:h-72">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-lime-400/20 blur-xl group-hover:bg-lime-400/40 transition-all duration-500" />

                  {/* Rotating Border */}
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-lime-400/30 group-hover:border-lime-400/60 animate-spin-slow" />

                  {/* Pulse Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-lime-400/50 animate-ping-slow" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-lime-400/30 animate-ping-slow"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Main Button */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 flex flex-col items-center justify-center shadow-2xl shadow-lime-400/30 group-hover:shadow-lime-400/60 transition-all duration-500">
                    {/* Inner Highlight */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />

                    {/* Text */}
                    <span className="relative text-xl md:text-xl lg:text-2xl xl:text-3xl font-black text-black tracking-wider">
                      PING
                    </span>
                    <span className="relative text-xl md:text-xl lg:text-2xl xl:text-3xl font-black text-black tracking-wider">
                      US
                    </span>

                    {/* Arrow Icon */}
                    <ArrowUpRight className="relative w-6 h-6 text-black mt-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
              </MagneticButton>
            </div>

            {/* 2. Links Columns */}
            <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-lime-400" />
                  Quick Links
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                      >
                        <span className="w-0 h-px bg-lime-400 group-hover:w-4 transition-all duration-300" />
                        <span className="text-sm">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Utility Links */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-lime-400" />
                  More Info
                </h3>
                <ul className="space-y-4">
                  {utilityLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                      >
                        <span className="w-0 h-px bg-lime-400 group-hover:w-4 transition-all duration-300" />
                        <span className="text-sm">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-sm font-bold uppercase tracking-wider text-lime-400 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-lime-400" />
                  Follow Us
                </h3>
                <ul className="space-y-4">
                  {socialLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                      >
                        <span className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-lime-400 flex items-center justify-center transition-all duration-300">
                          <link.icon className="w-4 h-4 group-hover:text-black transition-colors duration-300" />
                        </span>
                        <span className="text-sm">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8 md:space-y-0 md:flex md:items-center md:justify-between lg:flex-col xl:flex-col">
              {/* Logo */}
              <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
                <a
                  href="#"
                  className="inline-block group text-center md:text-left"
                >
                  <span className="text-3xl md:text-4xl font-black tracking-tight text-white">
                    the roots{" "}
                    <span className="text-lime-400 group-hover:text-lime-300 transition-colors">
                      digital.
                    </span>
                  </span>
                </a>
                <p className="text-gray-500 text-sm mt-3 md:mt-0 max-w-xs">
                  Crafting digital excellence for businesses worldwide since
                  2020.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col items-center mt-4 md:flex-row md:mt-0 md:gap-4 md:items-start">
                <div className="flex py-2">
                  <img
                    src="/images/footer/google.webp"
                    alt="Google Partner"
                    className="w-40 h-15"
                  />
                </div>
                <div className="flex py-2">
                  <img
                    src="/images/footer/trustpilot.webp"
                    alt="Trustpilot"
                    className="w-40 h-15"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative border-t border-lime-accent bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} The Roots Digital. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-lime-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-lime-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-lime-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%,
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
