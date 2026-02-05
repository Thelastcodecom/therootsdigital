"use client";

import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

// Define the structure for a project item
type ProjectItem = {
  type: "image" | "video";
  src: string;
  poster?: string; // Thumbnail for videos
  title?: string; // Optional title
};

// Animation variants - triggering on load/tab change to prevent scroll flickering
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
      delay: index * 0.05, // Subtle stagger
    },
  }),
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState("Web Design");

  const categories = [
    "Web Design",
    "Video Editing",
    "Video Animation",
    "Branding",
    "UI/UX Design",
    "Logo Design",
    "Social Media Management",
    "Mobile App",
    "SEO",
  ];

  // RESTORED: Your original data and local paths
  const projectsByCategory: Record<string, ProjectItem[]> = {
    "Web Design": [
      { type: "image", src: "/images/portfolio-images/web/web 1.webp" },
      { type: "image", src: "/images/portfolio-images/web/web 2.webp" },
      { type: "image", src: "/images/portfolio-images/web/web 3.webp" },
      { type: "image", src: "/images/portfolio-images/web/web 4.webp" },
      { type: "image", src: "/images/portfolio-images/web/web 5.png" },
      { type: "image", src: "/images/portfolio-images/web/web 6.png" },
      { type: "image", src: "/images/portfolio-images/web/web 7.png" },
      { type: "image", src: "/images/portfolio-images/web/web 8.png" },
    ],
    "Video Editing": [
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 1.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 2.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 3.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 4.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 5.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 6.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 7.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-editing/video 8.mp4",
      },
    ],
    "Video Animation": [
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 1.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 2.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 3.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 4.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 5.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 6.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 7.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/video-animation/animation 8.mp4",
      },
    ],
    Branding: [
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 1.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 2.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 3.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 4.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 5.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 6.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 7.mp4",
      },
      {
        type: "video",
        src: "/images/portfolio-images/branding/branding 8.mp4",
      },
    ],
    "UI/UX Design": [
      { type: "image", src: "/images/portfolio-images/ui/ui 1.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 2.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 3.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 4.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 5.png" },
      { type: "image", src: "/images/portfolio-images/ui/ui 6.png" },
      { type: "image", src: "/images/portfolio-images/ui/ui 7.jpeg" },
      { type: "image", src: "/images/portfolio-images/ui/ui 8.jpg" },
    ],
    "Logo Design": [
      { type: "image", src: "/images/portfolio-images/logo/logo 1.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 2.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 3.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 4.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 5.jpg" },
      { type: "image", src: "/images/portfolio-images/logo/logo 6.jpg" },
      { type: "image", src: "/images/portfolio-images/logo/logo 7.jpg" },
      { type: "image", src: "/images/portfolio-images/logo/logo 8.jpg" },
    ],
    "Social Media Management": [
      { type: "image", src: "/images/portfolio-images/social/social 1.png" },
      { type: "image", src: "/images/portfolio-images/social/social 2.png" },
      { type: "image", src: "/images/portfolio-images/social/social 3.png" },
      { type: "image", src: "/images/portfolio-images/social/social 4.png" },
      { type: "image", src: "/images/portfolio-images/social/social 1.png" },
      { type: "image", src: "/images/portfolio-images/social/social 2.png" },
      { type: "image", src: "/images/portfolio-images/social/social 3.png" },
      { type: "image", src: "/images/portfolio-images/social/social 4.png" },
    ],
    "Mobile App": [
      { type: "image", src: "/images/portfolio-images/app/app 1.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 2.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 3.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 4.png" },
      { type: "image", src: "/images/portfolio-images/app/app 5.png" },
      { type: "image", src: "/images/portfolio-images/app/app 6.png" },
      { type: "image", src: "/images/portfolio-images/app/app 7.png" },
      { type: "image", src: "/images/portfolio-images/app/app 8.png" },
    ],
    SEO: [
      { type: "image", src: "/images/portfolio-images/seo/seo 1.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 2.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 3.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 4.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 5.png" },
      { type: "image", src: "/images/portfolio-images/seo/seo 6.png" },
      { type: "image", src: "/images/portfolio-images/seo/seo 7.png" },
      { type: "image", src: "/images/portfolio-images/seo/seo 8.jfif" },
    ],
  };

  const currentProjects = projectsByCategory[activeTab] || [];

  const getGridClass = (category: string) => {
    switch (category) {
      case "Logo Design":
      case "Branding":
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <section className="w-full container mx-auto py-16 md:py-24 bg-black">
      <div className="px-4 md:px-8 text-center">
        <motion.h2
          className="text-5xl md:text-7xl lg:text-5xl xl:text-8xl text-white mb-10 font-bold tracking-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Creative Portfolio
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:max-w-2xl xl:max-w-3xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-xs transition-all duration-300 border ${
                activeTab === category
                  ? "bg-lime-400 border-lime-400 text-black"
                  : "border-white/10 text-white hover:border-lime-400/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="w-full min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className={`grid gap-8 ${getGridClass(activeTab)}`}
            >
              {currentProjects.length > 0 ? (
                currentProjects.map((item, index) => (
                  <motion.div
                    key={`${activeTab}-${index}`}
                    custom={index}
                    variants={cardVariants}
                  >
                    <PortfolioCard
                      category={activeTab}
                      item={item}
                      index={index}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-gray-500">
                  <p className="text-xl">No projects found for {activeTab}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({
  category,
  item,
  index,
}: {
  category: string;
  item: ProjectItem;
  index: number;
}) {
  const isTall =
    category === "Web Design" ||
    category === "Social Media Management" ||
    category === "SEO";
  const isLogo = category === "Logo Design";

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 ${
        isTall ? "h-[400px] md:h-[550px]" : "aspect-square md:aspect-video"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            className="w-full h-full object-cover"
            muted
            playsInline
            loop
            autoPlay
          />
        ) : (
          /* Using standard img for compatibility in this preview environment */
          <img
            src={item.src}
            alt={`${category} Project ${index + 1}`}
            className={`w-full transition-transform duration-[5s] ease-linear ${
              isLogo
                ? "h-full object-cover object-center"
                : `object-cover object-top ${
                    isTall
                      ? "h-auto group-hover:-translate-y-[calc(100%-400px)] md:group-hover:-translate-y-[calc(100%-550px)]"
                      : "h-full group-hover:scale-105"
                  }`
            }`}
          />
        )}
      </div>
    </div>
  );
}
