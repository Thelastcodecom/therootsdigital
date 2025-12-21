"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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

// --- Sub Component: Video Card ---
const VideoPlayer = ({ client }: { client: ClientDataType }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getVideoId(client.videoLink);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <div className="relative w-full aspect-[16/10] max-w-xl mx-auto rounded-2xl overflow-hidden bg-zinc-900 shadow-xl group border border-white/10">
      {!isPlaying ? (
        <div
          className="relative w-full h-full cursor-pointer overflow-hidden"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt={client.videoAlt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-black scale-90 group-hover:scale-100 transition-transform duration-500 shadow-xl">
              <svg
                className="w-6 h-6 ml-1"
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

// --- Main Card Component ---
const FeedbackCard = ({
  client,
  index,
}: {
  client: ClientDataType;
  index: number;
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
      className={`flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-10 lg:gap-20 mb-20 lg:mb-32 items-center`}
    >
      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="space-y-4">
          <div className="text-lime-400 text-xs font-bold uppercase tracking-[0.2em]">
            Client Success
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-snug text-zinc-100">
            "{client.quote}"
          </h3>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/5">
          <div className="min-w-[120px]">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
              Client
            </p>
            <p className="text-base font-semibold">{client.name}</p>
            <p className="text-xs text-white/50">{client.designation}</p>
          </div>
          <div className="min-w-[120px]">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
              Scope
            </p>
            <p className="text-base font-semibold text-lime-400/90">
              {client.work}
            </p>
          </div>
        </div>
      </div>

      {/* Video Side */}
      <div className="w-full lg:w-1/2">
        <VideoPlayer client={client} />
      </div>
    </motion.div>
  );
};

const ClientFeedback = () => {
  return (
    <section className="relative bg-black text-white py-24 md:py-40 overflow-hidden">
      {/* Soft Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-lime-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-lime-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Feedback List */}
        <div className="flex flex-col">
          {clientData.map((client, index) => (
            <FeedbackCard key={client.name} client={client} index={index} />
          ))}
        </div>

        {/* Minimal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12"
        >
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/30 font-bold">
              The Standard
            </p>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <span className="text-3xl font-light">
                  98<span className="text-lime-400">%</span>
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-widest">
                  Score
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-light">
                  200<span className="text-lime-400">+</span>
                </span>
                <span className="text-[10px] uppercase text-white/40 tracking-widest">
                  Clients
                </span>
              </div>
            </div>
          </div>

          <button className="group relative flex items-center gap-4 text-sm font-bold uppercase tracking-widest py-2">
            <span className="relative z-10">Partner with us</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-all duration-300">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientFeedback;
