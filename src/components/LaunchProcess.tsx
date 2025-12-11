"use client";

import React, { useEffect, useRef } from "react";

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
  name: string;
  color: string;
}

const mockLogos: LogoData[] = [
  { name: "ONE STOP HOME REPAIRS", color: "#000000" },
  { name: "MY FINANCIAL", color: "#000000" },
  { name: "GREEN ORCHARDS", color: "#000000" },
  { name: "LAXIOM", color: "#000000" },
  { name: "DLC BOOKING", color: "#000000" },
  { name: "AXIOM", color: "#000000" },
  { name: "VINDEMIATRIX FILTER", color: "#000000" },
  { name: "MY FINANCIAL", color: "#000000" },
  { name: "GREEN ORCHARDS", color: "#000000" },
  { name: "ONE STOP HOME REPAIRS", color: "#000000" },
];

// --- LogoCard Props ---
interface LogoCardProps {
  logo: LogoData;
  isLimeBanner: boolean;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo, isLimeBanner }) => (
  <div className="shrink-0 min-w-[200px] mx-6 flex flex-col items-center justify-center text-center">
    <div
      className="w-10 h-10 rounded-full border-2 mb-2 flex items-center justify-center"
      style={{
        backgroundColor: isLimeBanner ? "#c4ef17" : "#ffffff",
        color: "#000000",
        borderColor: "#000000",
      }}
    >
      <span className="font-bold text-lg uppercase text-black">
        {logo.name[0]}
      </span>
    </div>
    <p className="text-[10px] font-semibold uppercase text-black whitespace-nowrap">
      {logo.name}
    </p>
    <p className="text-[8px] text-black whitespace-nowrap">
      Partner Since &apos;23
    </p>
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

  return (
    <div
      className="w-[200vw] h-[100px] py-2 shadow-lg overflow-hidden border-y-2 flex items-center"
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
          animation: fadeInUp 0.75s cubic-bezier(.22,.98,.38,1) forwards;
        }
      `}</style>

      <div
        className="flex items-center"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {[...mockLogos, ...mockLogos, ...mockLogos, ...mockLogos].map(
          (logo, index) => (
            <LogoCard
              key={`logo-${index}`}
              logo={logo}
              isLimeBanner={isLimeBanner}
            />
          )
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
              className="border-lime-accent border-2 rounded-2xl bg-gray-900 shadow-2xl"
              style={{
                transform: `translateY(${step.desktopTransform})`,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
              }}
            >
              {/* INNER: scroll animation */}
              <div
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="p-6 bg-black rounded-xl h-full flex flex-col items-center fade-step-inner"
                style={{
                  animationDelay: `${i * 0.22}s`,
                }}
              >
                <div className="w-full h-40 mb-6 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={`Step ${step.step} preview`}
                    className="w-full h-full object-cover"
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
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-[70%] md:-translate-y-[60%] z-20">
          <div className="hidden md:block">
            <MarqueeBand direction="left" rotation={-3} isLimeBanner={true} />
          </div>
          <div className="block md:hidden">
            <MarqueeBand direction="left" rotation={0} isLimeBanner={true} />
          </div>
        </div>

        <div className="absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-[30%] md:-translate-y-[40%] z-10">
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
