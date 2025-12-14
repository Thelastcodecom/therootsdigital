"use client";
import styles from "./PortfolioSection.module.css";
import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Define the structure for a project item
type ProjectItem = {
  type: "image" | "video";
  src: string;
  poster?: string; // Thumbnail for videos
  title?: string; // Optional title for accessibility/overlay
};

// Scroll animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
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
    ],
    "UI/UX Design": [
      { type: "image", src: "/images/portfolio-images/ui/ui 1.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 2.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 3.webp" },
      { type: "image", src: "/images/portfolio-images/ui/ui 4.webp" },
    ],
    "Logo Design": [
      { type: "image", src: "/images/portfolio-images/logo/logo 1.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 2.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 3.webp" },
      { type: "image", src: "/images/portfolio-images/logo/logo 4.webp" },
    ],
    "Social Media Management": [
      { type: "image", src: "/images/portfolio-images/social/social 1.webp" },
      { type: "image", src: "/images/portfolio-images/social/social 1.webp" },
      { type: "image", src: "/images/portfolio-images/social/social 1.webp" },
    ],
    "Mobile App": [
      { type: "image", src: "/images/portfolio-images/app/app 1.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 2.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 3.webp" },
      { type: "image", src: "/images/portfolio-images/app/app 4.webp" },
    ],
    SEO: [
      { type: "image", src: "/images/portfolio-images/seo/seo 1.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 2.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 3.webp" },
      { type: "image", src: "/images/portfolio-images/seo/seo 4.webp" },
    ],
  };

  const currentProjects = projectsByCategory[activeTab] || [];

  const getGridClass = (category: string) => {
    switch (category) {
      case "Logo Design":
      case "Branding":
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case "Web Design":
      case "Mobile App":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
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
          viewport={{ once: false, amount: 0.3 }}
          variants={headingVariants}
        >
          Creative Portfolio
        </motion.h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 md:max-w-4xl xl:max-w-6xl mx-auto">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category)}
              data-active={activeTab === category} // ← add this
              className={`${
                styles.tabButton
              } border border-lime-accent text-xs ${
                activeTab === category ? "bg-lime-accent text-black" : ""
              }`}
            >
              <span className={styles.glowBorder} />
              {category}
            </motion.button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="w-full min-h-[400px]">
          {currentProjects.length > 0 ? (
            <div className={`grid gap-8 ${getGridClass(activeTab)}`}>
              {currentProjects.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  variants={cardVariants}
                >
                  <PortfolioCard
                    category={activeTab}
                    item={item}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <p className="text-xl">No projects found for {activeTab}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---- Keep your original PortfolioCard logic intact ----
function PortfolioCard({
  category,
  item,
  index,
}: {
  category: string;
  item: ProjectItem;
  index: number;
}) {
  if (category === "Web Design" || category === "Social Media Management") {
    return (
      <div className="group relative w-full h-[400px] md:h-[550px] rounded-2xl overflow-hidden border border-2 border-lime-accent bg-zinc-900">
        <div className="absolute inset-0 overflow-hidden">
          {item.type === "video" ? (
            <video
              src={item.src}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
              autoPlay
            />
          ) : (
            <Image
              src={item.src}
              alt={`Web Design Project ${index + 1}`}
              width={600}
              height={1200}
              className="w-full h-auto object-cover object-top transition-transform duration-[5s] ease-linear group-hover:-translate-y-[calc(100%-500px)]"
            />
          )}
        </div>
      </div>
    );
  }

  if (category === "Video Editing" || category === "Video Animation") {
    return (
      <div className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer">
        {item.type === "video" ? (
          <>
            <video
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              loop
              autoPlay
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 opacity-0" />
          </>
        ) : (
          <Image
            src={item.src}
            alt={`Video Project ${index + 1}`}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
    );
  }

  if (category === "Branding" || category === "Logo Design") {
    return (
      <div className="group relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-lime-accent/50 transition-colors">
        <div className="flex items-center justify-center w-full h-full bg-zinc-900 group-hover:bg-zinc-800 transition-colors">
          {item.type === "video" ? (
            <video
              src={item.src}
              className="w-full h-full object-cover p-0 transition-transform duration-500 group-hover:scale-105"
              muted
              playsInline
              loop
              autoPlay
            />
          ) : (
            <Image
              src={item.src}
              alt={`Branding Project ${index + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
      </div>
    );
  }

  if (category === "SEO") {
    return (
      <div className="group relative w-full h-[500px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
        <Image
          src={item.src}
          alt={`App Project ${index + 1}`}
          width={500}
          height={800}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="group relative w-full aspect-4/3 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900">
      <Image
        src={item.src}
        alt={`Project ${index + 1}`}
        width={800}
        height={600}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
