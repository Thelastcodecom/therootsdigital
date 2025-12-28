"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// --- Data Definition ---
interface ClientDataType {
  name: string;
  designation: string;
  work: string;
  videoAlt: string;
  videoLink: string;
  quote?: string;
}

const clientData: ClientDataType[] = [
  {
    name: "Derek Shull",
    designation: "Co-Founder",
    work: "Corporate Branding & Website",
    videoAlt: "Client feedback video from Derek Shull",
    videoLink: "https://youtu.be/zkNRbzNacF0",
    quote:
      "The Roots Digital transformed our online presence with a level of precision we hadn't seen before.",
  },
  {
    name: "Miska Tupla Kupla",
    designation: "Co-Founder",
    work: "Product Illustration",
    videoAlt: "Client feedback video from Miska Tupla Kupla",
    videoLink: "https://youtu.be/TZsyNfEAcV0",
    quote:
      "Extraordinary attention to detail. They didn't just build a site; they built a brand experience.",
  },
];

const getVideoId = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") return parsedUrl.pathname.slice(1);
    if (parsedUrl.searchParams.has("v")) return parsedUrl.searchParams.get("v");
    if (parsedUrl.pathname.startsWith("/embed/"))
      return parsedUrl.pathname.split("/embed/")[1];
    return null;
  } catch {
    return null;
  }
};

const VideoPlayer = ({ client }: { client: ClientDataType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getVideoId(client.videoLink);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/10 group">
      {!isPlaying ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt={client.videoAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110 shadow-xl">
              <svg
                className="w-5 h-5 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={client.videoAlt}
        />
      )}
    </div>
  );
};

const ClientFeedback = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a scroll trigger for the whole section.
  // We use 300vh height to create "stickiness" while cycling through videos.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which video to show based on scroll progress
  // 0 to 0.5 = First video, 0.5 to 1 = Second video
  const currentIndex = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [0, 0, 1, 1]
  );

  // We use a state to handle the AnimatePresence triggers
  const [activeIdx, setActiveIdx] = useState(0);

  // Update local state when scroll cross-fades
  currentIndex.on("change", (latest) => {
    const rounded = Math.round(latest);
    if (rounded !== activeIdx) setActiveIdx(rounded);
  });

  const client = clientData[activeIdx];

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-black text-white"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 lg:px-16">
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-lime-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-lime-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              {/* Left Side: Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 h-[1px] bg-lime-400" />
                    <span className="text-lime-400 text-xs font-bold uppercase tracking-[0.3em]">
                      Client Story {activeIdx + 1}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.2] text-zinc-100 italic">
                    &quot;{client.quote}&quot;
                  </h3>
                </div>

                <div className="flex flex-wrap gap-x-12 gap-y-6 pt-10 border-t border-white/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                      Partner
                    </p>
                    <p className="text-lg font-semibold">{client.name}</p>
                    <p className="text-sm text-white/50">
                      {client.designation}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                      Impact
                    </p>
                    <p className="text-lg font-semibold text-lime-400/90">
                      {client.work}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Video */}
              <div className="relative group">
                <VideoPlayer client={client} />
                {/* Decorative Corner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-lime-400/20 rounded-tr-3xl pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Progress & UI Elements */}
        <div className="absolute bottom-12 left-6 lg:left-16 right-6 lg:right-16 flex justify-between items-center pointer-events-none">
          <div className="flex gap-2">
            {clientData.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  activeIdx === i ? "w-12 bg-lime-400" : "w-4 bg-white/20"
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col items-end">
            <div className="w-px h-12 bg-gradient-to-b from-lime-400 to-transparent relative">
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 left-[-2px] w-1 h-1 bg-white rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
