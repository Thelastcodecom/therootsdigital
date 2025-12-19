"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ValueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

const progress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 20,
  mass: 0.5
});

  const travelP = useTransform(progress, [0.1, 0.9], [0, 1], {clamp: true});

  const astronautX = useTransform(travelP, [0, 1], ["0vw", "74vw"]);
  const astronautRotate = useTransform(travelP, [0, 1], [-6, 8]);
  const astronautY = useTransform(travelP, [0, 0.5, 1], [0, -12, 0]);



  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-screen overflow-hidden relative flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img
            src="/images/astronaut_background.webp"
            alt="Space"
            className="w-[360px] sm:w-[440px] md:w-[520px] lg:w-[600px] xl:w-[680px] 2xl:w-[720px] opacity-40 object-contain"
          />
        </div>

        {/* Astronaut */}
        <motion.div
          style={{ x: astronautX, y: astronautY, rotate: astronautRotate }}
          className="absolute left-0 z-20"
        >
          <img
            src="/images/astronaut.webp"
            alt="Astronaut"
            className="w-[200px] sm:w-[200px] md:w-[290px] lg:w-[420px] 2xl:w-[500px] h-auto object-contain drop-shadow-[0_0_28px_rgba(255,255,255,0.25)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;
