"use client";

import { useState } from "react";
import Image from "next/image";
export default function PortfolioGrid() {
  const [activeTab, setActiveTab] = useState("Web Design");

  const categories = [
    "Web Design",
    "Video Editing",
    "Video Animation",
    "Branding",
    "UI/UX Design",
    "Logo Design",
    "Socialmedia Management",
    "Mobile App",
    "SEO",
  ];

  // Define projects for each category
  const projectsByCategory = {
    "Web Design": [
      "/images/portfolio-images/retro-biker.png",
      "/images/portfolio-images/muecy.webp",
    ],
    "Video Editing":
    ["/images/portfolio-images/retro-biker.png"],
    "Video Animation":
    ["/images/portfolio-images/muecy.webp"],
    Branding: [
      "/images/portfolio-images/retro-biker.png",
      "/images/portfolio-images/muecy.webp",
    ],
    "UI/UX Design": 
    ["/images/portfolio-images/retro-biker.png"],
    "Logo Design": 
    ["/images/portfolio-images/muecy.webp"],
    "Socialmedia Management": 
    ["/images/portfolio-images/retro-biker.png"],
    "Mobile App": 
    ["/images/portfolio-images/muecy.webp"],
    "SEO": 
    ["/images/portfolio-images/retro-biker.png"],
  };

  const currentProjects = projectsByCategory[activeTab] || [];

  return (
    <section className="w-full py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-8 text-center bg-black">
        {/* Title */}
        <h2 className="text-7xl md:text-8xl text-white mb-10">
          Creative Portfolio
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center max-w-8xl mx-auto mb-12">
          {/* categories*/}
          <div className="flex flex-wrap justify-center mb-4 bg-transparent">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-2 m-2 text-2xl md:3xl lg:4xl rounded-full transition-all duration-300 border border-lime-accent ${
                  activeTab === category
                    ? "bg-lime-accent text-black font-semibold text-black"
                    : "bg-transparent text-white hover:bg-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid - Content changes based on active tab */}
      <div className="w-full min-h-screen bg-black flex justify-center py-10">
        <div className="w-[90%]">
          {currentProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProjects.map((src, i) => (
                <div
                  key={i}
                  className="border-2 border-lime-accent rounded-xl overflow-hidden h-[600px] bg-transparent"
                >
                  <div className="relative h-full overflow-hidden group">
                    <Image
                      src={src}
                      alt={`${activeTab} project ${i + 1}`}
                      width={200}
                      height={200}
                      className="
                        w-full 
                        h-auto 
                        object-top
                        transition-transform 
                        duration-[8000ms] 
                        ease-linear 
                        group-hover:-translate-y-[calc(100%-600px)]
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-xl py-20">
              No projects available for {activeTab}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
