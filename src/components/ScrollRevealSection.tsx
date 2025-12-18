"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./ScrollRevealSection.module.css"
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
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]); // images move up
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]); // fade in quickly

  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -320]); // left image
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 320]); // right image
  const scaleCenter = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]); // center scale
  const scaleSide = useTransform(scrollYProgress, [0, 1], [0.9, 1]); // side images

  return (
    <section ref={sectionRef} className="bg-black text-white container mx-auto">
      {/* Scroll space */}
      <div className="h-screen">
        <div className="top-[10vh] px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div>
              <motion.h3
                className="text-sm uppercase tracking-widest text-lime-accent font-bold mb-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Our Mission
              </motion.h3>

              <motion.h2
                className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                Thankfully, there is
                <br />
                The Roots Digital.
              </motion.h2>

              <motion.p
                className="text-gray-400 max-w-xl mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                The truly affordable done-for-you website solution.
              </motion.p>

              <motion.button
                className={`${styles.button} border border-lime-accent`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
              >
                <span className={styles.glow} />
                See Our Case Studies
              </motion.button>
            </div>

            {/* RIGHT IMAGE STACK */}
            <div className="relative h-[70vh] w-full">
              {images.map((img) => {
                const x = img.dir === -1 ? xLeft : img.dir === 1 ? xRight : 0;
                const scale = img.dir === 0 ? scaleCenter : scaleSide;

                return (
                  <motion.div
                    key={img.src}
                    className="absolute bottom-0 left-1/2 w-[55%] max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      zIndex: img.z,
                      x,
                      y,
                      scale,
                      opacity,
                      translateX: "-50%",
                    }}
                  >
                    <img
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover"
                    />
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
