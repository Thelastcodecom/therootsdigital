"use client";

import React, { useEffect, useRef, useMemo } from "react";
import Image from "next/image";

// --- Step Data Type ---
interface StepData {
  step: number;
  title: string;
  image: string;
  description: string;
  time: string;
  desktopTransform: string;
}

const stepsData: StepData[] = [
  {
    step: 1,
    title: "Questionnaire",
    image: "/images/steps/step 1.webp",
    description: "Complete our online questionnaire",
    time: "15-30 min",
    desktopTransform: "0%",
  },
  {
    step: 2,
    title: "Hello New Sunny",
    image: "/images/steps/step 2.webp",
    description: "We build your website fully, from A to Z",
    time: "7 days",
    desktopTransform: "5%",
  },
  {
    step: 3,
    title: "Eat, Drink & Like",
    image: "/images/steps/step 3.webp",
    description: "We launch your website with you live over Zoom",
    time: "30 min",
    desktopTransform: "10%",
  },
];

// --- Logo Data Type ---
interface LogoData {
  url: string;
  alt?: string;
}

const mockLogos: LogoData[] = [
  { url: "/images/marquee-logo/1.webp", alt: "Logo 1" },
  { url: "/images/marquee-logo/2-1.webp", alt: "Logo 2" },
  { url: "/images/marquee-logo/2-2.webp", alt: "Logo 3" },
  { url: "/images/marquee-logo/2-3.webp", alt: "Logo 4" },
  { url: "/images/marquee-logo/2-4.webp", alt: "Logo 5" },
  { url: "/images/marquee-logo/2-5.webp", alt: "Logo 6" },
  { url: "/images/marquee-logo/2-6.webp", alt: "Logo 7" },
  { url: "/images/marquee-logo/3.webp", alt: "Logo 8" },
  { url: "/images/marquee-logo/4.webp", alt: "Logo 9" },
  { url: "/images/marquee-logo/5.webp", alt: "Logo 10" },
];

// --- LogoCard Props ---
interface LogoCardProps {
  logo: LogoData;
  isLimeBanner: boolean;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo, isLimeBanner }) => (
  <div className="shrink-0 min-w-[220px] mx-6 flex items-center justify-center">
    <div
      className={`w-[200px] h-[72px] flex items-center justify-center rounded-md p-2 transition-transform duration-300 ${
        isLimeBanner ? "bg-white/5" : "bg-white/10"
      } `}
    >
      <Image
        src={logo.url}
        alt={logo.alt || "logo"}
        width={180}
        height={64}
        quality={90}
        className="object-contain"
        priority={false}
      />
    </div>
  </div>
);

// --- MarqueeBand Props ---
interface MarqueeBandProps {
  direction: "left" | "right";
  rotation: number;
  isLimeBanner: boolean;
}

const MarqueeBand: React.FC<MarqueeBandProps> = ({
  direction,
  rotation,
  isLimeBanner,
}) => {
  const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";
  const duration = direction === "left" ? "35s" : "40s";

  // pick 6 random logos for this band (stable per-mount)
  const selectedLogos = useMemo(() => {
    const arr = [...mockLogos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 6);
  }, []);

  return (
    <div
      className="
  w-[200vw]
  h-[120px]
  md:h-[140px]
  xl:h-40
  py-2
  shadow-lg
  overflow-hidden
  border-y-2
  flex items-center
"
      style={{
        backgroundColor: isLimeBanner ? "#c4ef17" : "#ffffff",
        borderColor: "#000000",
        transform: `translateX(-50vw) rotate(${rotation}deg)`,
      }}
    >
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* scroll fade-up */
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .fade-step-inner {
          opacity: 0;
          transform: translateY(18px);
        }
        .fade-step-inner.visible {
          animation: fadeInUp 0.60s cubic-bezier(.22,.98,.38,1) forwards;
        }
      `}</style>

      <div
        className="flex items-center"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {Array.from({ length: 4 }).flatMap((_, groupIndex) =>
          selectedLogos.map((logo, i) => (
            <LogoCard
              key={`logo-${groupIndex}-${i}`}
              logo={logo}
              isLimeBanner={isLimeBanner}
            />
          ))
        )}
      </div>
    </div>
  );
};

// --- Main Component ---
const LaunchProcessAndMarquee: React.FC = () => {
  const stepRefs = useRef<HTMLDivElement[]>([]);

  // SCROLL OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.35 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white py-20 font-inter">
      {/* Steps Section */}
      <div className="px-4 text-center mb-24 container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
          3 steps to launch your website
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step, i) => (
            <div
              key={step.step}
              className="
    group
    border-lime-accent border-2 rounded-2xl
    bg-gray-900 shadow-2xl
    transition-all duration-300 ease-out
    md:hover:-translate-y-3
    md:hover:shadow-[0_20px_60px_rgba(196,239,23,0.25)]
  "
              style={{
                transform: `translateY(${step.desktopTransform})`,
              }}
            >
              {/* INNER: scroll animation */}
              <div
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="
    p-6 bg-black rounded-xl h-full
    flex flex-col items-center
    fade-step-inner
    transition-transform duration-300
    md:group-hover:scale-[1.02]
  "
                style={{
                  animationDelay: `${i * 0.22}s`,
                }}
              >
                <div className="w-full h-40 mb-6 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={step.image}
                    alt={`Step ${step.step} preview`}
                    className="
    w-full h-full object-cover
    transition-transform duration-300 ease-out
    md:group-hover:scale-105
  "
                  />
                </div>
                <h4 className="text-xl font-bold text-lime-accent mb-2">
                  STEP {step.step}
                </h4>
                <p className="text-lg font-semibold text-white mb-1 mt-4">
                  {step.description}
                </p>
                <p className="text-md text-gray-400">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full relative h-48 md:h-64 overflow-hidden">
        <div className="absolute w-full left-2/3 -translate-x-1/2 top-1/2 -translate-y-[70%] md:-translate-y-[60%] z-20">
          <div className="hidden md:block">
            <MarqueeBand direction="left" rotation={-3} isLimeBanner={true} />
          </div>
          <div className="block md:hidden">
            <MarqueeBand direction="left" rotation={0} isLimeBanner={true} />
          </div>
        </div>

        <div className="absolute w-full left-2/3 -translate-x-1/2 top-1/2 -translate-y-[3%] md:-translate-y-[40%] z-10">
          <div className="hidden md:block">
            <MarqueeBand direction="right" rotation={3} isLimeBanner={false} />
          </div>
          <div className="block md:hidden">
            <MarqueeBand direction="right" rotation={0} isLimeBanner={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchProcessAndMarquee;
