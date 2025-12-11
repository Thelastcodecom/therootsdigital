"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  // Variants for the three headline lines
  const headlineVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 + i * 0.3, duration: 0.7, ease: "easeOut" },
    }),
  };

  // Variant for logo: fade + slide + slight shake
  const logoVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [-5, 5, -5, 0], // shake effect once
      transition: { delay: 1.5, duration: 1.2, ease: "easeInOut" },
    },
  };

  // Variant for about heading & texts
  const aboutVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.7 + i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-black overflow-hidden">
      {/* --- Background Video --- */}
      <video
        className="absolute top-0 left-0 w-full h-[77%] object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://therootsdigital.com/wp-content/uploads/2025/10/Untitled-design.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* --- Left-aligned Headline --- */}
      <div className="relative z-20 h-full mt-auto w-full container px-4 md:px-8 flex flex-col justify-between pt-40 pb-8 md:pb-16">
        <div className="max-w-4xl flex-grow flex items-start">
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold leading-none text-lime-accent">
            {["Rethink", "Reinvent", "Revolutionize"].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      {/* --- Centered Image + About Text --- */}
      <div className="relative z-20 w-full px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16 max-w-xl mx-auto md:pb-12">
          {/* --- Image --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="shrink-0 flex items-center justify-center"
          >
            <Image
              src="/images/b_logo.webp"
              alt="About Us Graphic"
              width={1000}
              height={1200}
              className="w-full 
                max-w-[24rem] 
                sm:max-w-[28rem] 
                md:max-w-[36rem] 
                lg:max-w-[44rem] 
                h-auto object-contain 
                lg:mb-7"
              priority
            />
          </motion.div>

          {/* --- About Text --- */}
          <div className="flex flex-col items-end md:items-start text-white text-center md:text-left">
            {[
              {
                ref: "aboutHeading",
                text: "ABOUT THE ROOTS DIGITAL",
                className:
                  "relative text-base font-bold text-gray-400 mb-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-accent",
              },
              {
                ref: "aboutText1",
                text: "CRAFTING DIGITAL",
                className:
                  "text-4xl md:text-5xl lg:text-6xl uppercase leading-tight whitespace-nowrap",
              },
              {
                ref: "aboutText2",
                text: "EXCELLENCE",
                className:
                  "text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-[#868686]",
              },
            ].map((item, i) => (
              <motion.h2
                key={item.ref}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={aboutVariants}
                className={item.className}
              >
                {item.text}
              </motion.h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
