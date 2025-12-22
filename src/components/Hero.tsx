"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  // Headline animation
  const headlineVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 + i * 0.2, duration: 0.6 },
    }),
  };

  // Logo animation
  const logoVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [-4, 4, -4, 0],
      transition: { delay: 1.2, duration: 1 },
    },
  };

  // About text animation
  const aboutVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.5 + i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <section className="relative w-full h-screen md:h-[150vh] overflow-hidden bg-black">
      {/* ===========================
          BACKGROUND VIDEO
      ============================ */}
      <div className="absolute inset-0 h-screen w-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://therootsdigital.com/wp-content/uploads/2025/10/Untitled-design.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ===========================
          DESKTOP HERO (md+)
      ============================ */}
      <div className="hidden md:flex relative z-20 flex-col h-full justify-between">
        {/* Headline */}
        <div className="pt-40 pl-16">
          <h2 className="text-5xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold leading-none text-lime-accent">
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
        {/* Logo + About Section */}
        <div className="relative w-full flex items-end justify-center md:gap-8 gap-12 pb-12">
          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="-mt-40 shrink-0"
          >
            <Image
              src="/images/b_logo.webp"
              alt="Brand Logo"
              width={600}
              height={600}
              className="h-[26rem] md:h-[14rem] xl:h-[16rem] 2xl:h-[26rem] w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col items-start text-white">
            <motion.h2
              custom={0}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="relative text-sm font-bold text-gray-300 mb-3 pl-6
                before:content-[''] before:w-2 before:h-2 before:bg-lime-accent
                before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-full"
            >
              ABOUT THE ROOTS DIGITAL
            </motion.h2>

            <motion.h2
              custom={1}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="text-4xl xl:text-5xl 2xl:text-6xl uppercase font-bold lg:whitespace-nowrap"
            >
              CRAFTING DIGITAL
            </motion.h2>

            <motion.h2
              custom={2}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="text-4xl xl:text-5xl 2xl:text-6xl uppercase text-[#868686]"
            >
              EXCELLENCE
            </motion.h2>
          </div>
        </div>
      </div>

      {/* ===========================
          MOBILE HERO (sm)
      ============================ */}
      <div className="md:hidden relative z-20 flex flex-col h-full justify-end">
        {/* Headline - Mobile */}
        <div className="pt-32 px-4 text-center">
          <h2 className="text-4xl font-bold leading-tight text-lime-accent">
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

        {/* Black Section */}
        <div className="w-full bg-black mt-6 pt-10 pb-12 flex flex-col items-center">
          {/* Center Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="mb-6"
          >
            <Image
              src="/images/b_logo.webp"
              alt="Brand Logo"
              width={400}
              height={400}
              className="h-40 w-auto object-contain"
            />
          </motion.div>

          {/* About Text */}
          <div className="flex flex-col items-center text-center text-white">
            <motion.h2
              custom={0}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="text-xs font-bold text-gray-300 tracking-wide mb-2"
            >
              ABOUT THE ROOTS DIGITAL
            </motion.h2>

            <motion.h2
              custom={1}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="text-3xl uppercase font-bold"
            >
              CRAFTING DIGITAL
            </motion.h2>

            <motion.h2
              custom={2}
              initial="hidden"
              animate="visible"
              variants={aboutVariants}
              className="text-3xl uppercase text-[#868686]"
            >
              EXCELLENCE
            </motion.h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
