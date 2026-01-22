"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Note: Ensure your global CSS or tailwind config handles .lime-accent if needed.
// For this file, I'm using lime-400 as a fallback for the accent color.

const images = [
  { src: "/images/scroll-section/way 1.webp", z: 1, dir: -1 },
  { src: "/images/scroll-section/way 2.webp", z: 3, dir: 0 }, // center
  { src: "/images/scroll-section/way 3.webp", z: 2, dir: 1 },
];

export default function ScrollRevealSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // 0 at start, 1 at end
  });

  // Common transform values
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]); // images move up
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]); // fade in quickly

  const xLeft = useTransform(scrollYProgress, [0.1, 0.9], [0, -250], {
    clamp: false,
  });
  const xRight = useTransform(scrollYProgress, [0.1, 0.9], [0, 250], {
    clamp: false,
  });

  // Responsive X-transform adjustment for desktop vs mobile is handled by translateX: "-50%"
  // and the absolute positioning logic.

  const scaleCenter = useTransform(scrollYProgress, [0, 1], [0.95, 1.1]);
  const scaleSide = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white min-h-screen w-full flex items-center overflow-hidden py-24 md:py-0"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="z-20 relative order-2 md:order-1">
            <motion.h3
              className="text-xs md:text-sm uppercase tracking-widest text-lime-400 font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Our Mission
            </motion.h3>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Thankfully, there is
              <br />
              <span className="text-white/90">The Roots Digital.</span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              The truly affordable done-for-you website solution for modern
              brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <button className="group relative px-8 py-4 bg-transparent border border-lime-400/50 text-lime-400 font-bold rounded-full overflow-hidden transition-all hover:border-lime-400 hover:text-black">
                <span className="absolute inset-0 bg-lime-400 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">See Our Case Studies</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT IMAGE STACK */}
          <div className="relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              {images.map((img) => {
                // Adjust translation based on direction
                const x = img.dir === -1 ? xLeft : img.dir === 1 ? xRight : 0;
                const scale = img.dir === 0 ? scaleCenter : scaleSide;

                return (
                  <motion.div
                    key={img.src}
                    className="absolute bottom-1/2 translate-y-1/2 left-1/2 w-[45%] md:w-[50%] max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                    style={{
                      zIndex: img.z,
                      x,
                      y,
                      scale,
                      opacity,
                      translateX: "-50%",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt="The Roots Digital Showcase"
                      width={800} // default width (can adjust)
                      height={600} // default height (can adjust)
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle inner glow to define the phone edges */}
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/20 rounded-3xl" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
