import React from "react";

// Sample data for the three steps
const stepsData = [
  {
    step: 1,
    title: "Questionnaire",
    image: "/images/steps/step 1.webp",
    description: "Complete our online questionnaire",
    time: "15-30 min",
    desktopTransform: "translateY(0%)",
  },
  {
    step: 2,
    title: "Hello New Sunny",
    image: "/images/steps/step 2.webp",
    description: "We build your website fully, from A to Z",
    time: "7 days",
    desktopTransform: "translateY(5%)",
  },
  {
    step: 3,
    title: "Eat, Drink & Like",
    image: "/images/steps/step 3.webp",
    description: "We launch your website with you live over Zoom",
    time: "30 min",
    desktopTransform: "translateY(10%)",
  },
];

// Sample data for the logos
const mockLogos = [
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

/**
 * Helper component for individual logo cards
 */
const LogoCard = ({ logo, isLimeBanner }) => (
  <div className="flex-shrink-0 min-w-[200px] mx-6 flex flex-col items-center justify-center text-center">
    {/* Placeholder Icon/Logo */}
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

    {/* Logo Name/Tagline */}
    <p className="text-[10px] font-semibold uppercase text-black whitespace-nowrap">
      {logo.name}
    </p>
    <p className="text-[8px] text-black whitespace-nowrap">Partner Since &apos;23</p>
  </div>
);

/**
 * MarqueeBand Component - Improved version with full-width coverage
 */
const MarqueeBand = ({ direction, rotation, isLimeBanner }) => {
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
      `}</style>

      <div
        className="flex items-center"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {/* Quadruple the logos for seamless infinite scroll */}
        {[...mockLogos, ...mockLogos, ...mockLogos, ...mockLogos].map((logo, index) => (
          <LogoCard
            key={`logo-${index}`}
            logo={logo}
            isLimeBanner={isLimeBanner}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * LaunchProcessAndMarquee Component
 */
const LaunchProcessAndMarquee = () => {
  return (
    <div className="bg-black text-white py-20 font-inter">
      {/* --- Section 1: 3 Steps to Launch Your Website --- */}
      <div className="px-4 text-center mb-24 container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
          3 steps to launch your website
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stepsData.map((step) => (
            <div
              key={step.step}
              className="border-lime-accent border-2 rounded-2xl bg-gray-900 shadow-2xl transition duration-500 ease-out"
              style={{
                transform: `translateY(${step.desktopTransform})`,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
              }}
            >
              {/* Inner Content Card */}
              <div className="p-6 bg-black rounded-xl h-full flex flex-col items-center">
                {/* Image/Preview Area */}
                <div className="w-full h-40 mb-6 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={`Step ${step.step} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step Marker */}
                <h4 className="text-xl font-bold text-lime-accent mb-2">
                  STEP {step.step}
                </h4>

                {/* Description and Time */}
                <p className="text-lg font-semibold text-white mb-1 mt-4">
                  {step.description}
                </p>
                <p className="text-md text-gray-400">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Section 2: X-shaped Scrolling Logo Banners --- */}
      <div className="w-full relative h-48 md:h-64 overflow-hidden">
        
        {/* Band 1: Lime Banner - Rotates Left-Down */}
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-[70%] md:-translate-y-[60%] z-20">
          {/* Desktop: Rotated */}
          <div className="hidden md:block">
            <MarqueeBand
              direction="left"
              rotation={-3}
              isLimeBanner={true}
            />
          </div>
          {/* Mobile: Straight */}
          <div className="block md:hidden">
            <MarqueeBand
              direction="left"
              rotation={0}
              isLimeBanner={true}
            />
          </div>
        </div>

        {/* Band 2: White Banner - Rotates Right-Down */}
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-[30%] md:-translate-y-[40%] z-10">
          {/* Desktop: Rotated */}
          <div className="hidden md:block">
            <MarqueeBand
              direction="right"
              rotation={3}
              isLimeBanner={false}
            />
          </div>
          {/* Mobile: Straight */}
          <div className="block md:hidden">
            <MarqueeBand
              direction="right"
              rotation={0}
              isLimeBanner={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchProcessAndMarquee;