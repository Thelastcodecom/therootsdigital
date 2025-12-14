"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ScrollRevealSection.module.css";
import { motion } from "framer-motion";

const images = [
  { src: "/images/scroll-section/way 1.webp", z: 1 },
  { src: "/images/scroll-section/way 2.webp", z: 3 }, // CENTER
  { src: "/images/scroll-section/way 3.webp", z: 2 },
];

export default function ScrollRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const ticking = useRef(false);


  useEffect(() => {
    if (window.innerWidth < 768) return;

    const animate = () => {
      ticking.current = false;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / window.innerHeight)
      );

      // smoothstep easing
      const eased = progress * progress * (3 - 2 * progress);

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        if (i === 1) {
          // center image
          card.style.transform = `translate(-50%, 0) scale(${
            1 + eased * 0.05
          })`;
          return;
        }
        const dir = i === 0 ? -1 : 1;

        card.style.transform = `
          translate(-50%, ${eased * -40}px)
          translateX(${dir * eased * 80}px)
          rotate(${dir * eased * 12}deg)
          scale(${1 - eased * 0.12})
        `;
      });
    };
    
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(animate);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    animate(); // initial state

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay,
      },
    }),
  };
  return (
    <section ref={sectionRef} className="bg-black text-white container mx-auto">
      <div className="h-[200vh]">
        <div className="sticky top-[10vh] px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* LEFT SIDE — UNTOUCHED */}
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

            {/* RIGHT SIDE — IMAGE STACK */}
            <div className="relative h-[70vh] w-full">
              {images.map((img, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className="absolute bottom-0 left-1/2 w-[55%] max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    zIndex: img.z,
                    transform: "translate(-50%, 0)",
                    transition: "transform 0.25s ease-out",
                  }}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
