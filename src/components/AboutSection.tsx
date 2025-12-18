"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useVelocity,
  useSpring,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";

const SPEED = 240;

const ValueSection: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const direction = useRef(1);

  const [screenWidth, setScreenWidth] = useState(0);
  const [astroWidth, setAstroWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      setScreenWidth(window.innerWidth);
      if (imgRef.current) {
        setAstroWidth(imgRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const x = useMotionValue(0);

  useAnimationFrame((_, delta) => {
  if (!screenWidth || !astroWidth) return;

  const v = smoothVelocity.get();

  // Base continuous drift (always on)
  let baseDrift = (direction.current * SPEED * delta) / 1000;

  // Scroll direction: 1 = down, -1 = up
  const scrollDir = v > 5 ? 1 : v < -5 ? -1 : 0;

  // ONLY react if scroll OPPOSES movement
  if (scrollDir !== 0 && scrollDir !== direction.current) {
    // flip direction
    direction.current = scrollDir;

    // apply impulse
    baseDrift += scrollDir * Math.min(Math.abs(v) / 60, 12);
  }

  let nextX = x.get() + baseDrift;

  const limit = screenWidth / 2 + astroWidth / 2;

  if (nextX > limit) nextX = -limit;
  if (nextX < -limit) nextX = limit;

  x.set(nextX);
});


  return (
    <section className="relative w-screen h-screen bg-black overflow-hidden">
      {/* BACKGROUND */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Image
          src="/images/astronaut_background.webp"
          alt="Background"
          fill
          priority
          className="object-contain"
        />
      </motion.div>

      {/* ASTRONAUT */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <motion.img
          ref={imgRef}
          src="/images/astronaut.webp"
          alt="Astronaut"
          style={{ x }}
          className="
            absolute
            w-[260px]
            sm:w-[260px]
            md:w-[320px]
            lg:w-[380px]
            xl:w-[420px]
            2xl:w-[580px]
            object-contain
            select-none
            drop-shadow-2xl
          "
        />
      </div>
    </section>
  );
};

export default ValueSection;
