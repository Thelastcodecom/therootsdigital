"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

type Tab = "mission" | "vision" | "value";

const content: Record<Tab, React.ReactNode> = {
  mission: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        Our mission is to <span className="text-lime-accent">rethink</span> how
        digital innovation shapes brands in an ever-evolving world. We see
        technology not just as tools or trends, but as the language of modern
        connection. Every brand has a story our goal is to transform that story
        into a powerful, memorable digital experience.
      </p>
      <p className="leading-8 text-gray-300">
        We craft human-centered journeys that connect, inspire, and deliver
        measurable impact. From creative design and branding to smart
        development and strategy, we create solutions that drive real growth. In
        a constantly changing world, we blend creativity with
        <span className="text-lime-accent">innovation</span> to help brands
        stand out with purpose and progress.
      </p>
    </>
  ),
  vision: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        Our vision is to <span className="text-lime-accent">reinvent</span> how
        brands connect and create impact in the digital age. We continue to
        reinvent the boundaries of creativity and technology, shaping
        experiences that inspire trust and build lasting relationships. For us,{" "}
        <span className="text-lime-accent">innovation</span> isn&apos;t just
        about being new it&apos;s about being meaningful.
      </p>
      <p className="leading-8 text-gray-300">
        We aim to <span className="text-lime-accent">reimagine</span> digital
        storytelling that sparks emotion, drives engagement, and fuels growth.
        By blending imagination, innovation, and intelligence, we help brands
        move beyond trends and into transformation redefining the digital world
        with purpose, creativity, and heart. The future belongs to those who
        dare to <span className="text-lime-accent">reinvent</span>.
      </p>
    </>
  ),
  value: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        At the heart of everything we do lies one powerful belief to
        <span className="text-lime-accent">revolutionize</span> how creativity
        and technology empower human potential. We seek to revolutionize the way
        ideas are born, built, and experienced, turning imagination into impact
        and <span className="text-lime-accent">innovation</span> into emotion.
      </p>
      <p className="leading-8 text-gray-300">
        Our vision goes beyond change; it’s a movement to{" "}
        <span className="text-lime-accent">revolutionize</span>
        connection, collaboration, and growth through digital transformation. We
        believe every brand, every idea, and every story has the power to
        evolve, inspire, and make a difference when guided by purpose, fueled by
        creativity, and driven by the will to{" "}
        <span className="text-lime-accent">revolutionize</span>.
      </p>
    </>
  ),
};

// Framer Motion variants
const tabVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ValueSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("value");
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section className="w-full bg-black text-white py-15 relative overflow-hidden container mx-auto">
      <div className="relative z-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE CONTENT */}
        <div className="w-full md:w-130 border p-10 lg:p-14 rounded-xl bg-gradient-to-b from-gray-900/60 to-gray-900/30 backdrop-blur-md">
          {/* Tabs */}
          <div className="flex text-gray-400 gap-16 text-lg font-medium mb-10 ">
            {(["mission", "vision", "value"] as Tab[]).map((tab, i) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={tabVariants}
                className={`transition-all duration-700 ${
                  activeTab === tab ? "text-white" : "hover:text-white"
                }`}
              >
                {tab === "mission"
                  ? "OUR MISSION"
                  : tab === "vision"
                  ? "OUR VISION"
                  : "VALUE"}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={contentVariants}
          >
            {content[activeTab]}
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div
          className="w-full h-[500px] lg:h-[600px] relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const rotateY = ((offsetX - rect.width / 2) / rect.width) * 20;
            const rotateX = -((offsetY - rect.height / 2) / rect.height) * 20;
            setTilt({ x: rotateX, y: rotateY });
          }}
        >
          {/* Background image under astronaut */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <Image
              src="/images/astronaut_background.webp"
              alt="Background visual"
              width={1200}
              height={600}
              className="object-contain opacity-20"
            />
          </motion.div>

          {/* Astronaut image */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <Image
              src="/images/astronaut.webp"
              alt="astronaut"
              width={500}
              height={500}
              className="object-contain select-none drop-shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: isHovered
                  ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.1)`
                  : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
