"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ValueSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detect viewport width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const travelP = useTransform(progress, [0.05, 0.95], [0, 1], {
    clamp: true,
  });

  // Mobile and desktop movement
  const astronautX = useTransform(
    travelP,
    [0, 1],
    isMobile ? ["-10vw", "60vw"] : ["-10vw", "80vw"]
  );

  const astronautY = useTransform(
    travelP,
    [0, 0.5, 1],
    isMobile ? ["0vh", "-5vh", "0vh"] : ["0vh", "-10vh", "0vh"]
  );

  const astronautRotate = useTransform(travelP, [0, 1], [-10, 15]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Background */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img
            src="/images/astronaut_background.webp"
            alt="Space"
            className="
              w-[280px] sm:w-[360px] md:w-[460px] lg:w-[560px] xl:w-[640px] 2xl:w-[720px]
              opacity-30 object-contain pointer-events-none
            "
          />
        </div>

        {/* Optional overlay text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.h2
            style={{ opacity: useTransform(progress, [0, 0.2], [0, 1]) }}
            className="text-white/10 text-[15vw] font-black uppercase tracking-tighter"
          >
            Explore
          </motion.h2>
        </div>

        {/* Astronaut */}
        <motion.div
          style={{ x: astronautX, y: astronautY, rotate: astronautRotate }}
          className="absolute left-0 z-20 will-change-transform"
        >
          <img
            src="/images/astronaut.webp"
            alt="Astronaut"
            className={`
              ${isMobile ? "w-[150px]" : "w-[180px]"} sm:w-[220px] md:w-[300px] lg:w-[380px] xl:w-[450px] 2xl:w-[550px]
              h-auto object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] pointer-events-none
            `}
          />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-10 left-10 overflow-hidden w-40 h-[1px] bg-white/10">
          <motion.div
            style={{ scaleX: progress }}
            className="w-full h-full bg-lime-400 origin-left"
          />
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
