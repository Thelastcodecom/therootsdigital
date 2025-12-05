//@ts-nocheck

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
    desktopTransform: "translateY(5%)", // Slight offset to match UI
  },
  {
    step: 3,
    title: "Eat, Drink & Like",
    image: "/images/steps/step 3.webp",
    description: "We launch your website with you live over Zoom",
    time: "30 min",
    desktopTransform: "translateY(10%)", // Slight offset to match UI
  },
];

// Sample data for the logos (doubled for the seamless loop effect)
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
  // min-w-[200px] ensures space between logos and prevents wrapping
  <div className="flex-shrink-0 min-w-[250px] mx-8 flex flex-col items-center justify-center text-center">
    {/* Placeholder Icon/Logo */}
    <div
      // Reduced logo size
      className="w-10 h-10 rounded-full border-2 mb-2 flex items-center justify-center"
      style={{
        backgroundColor: isLimeBanner ? "#c4ef17 " : "#ffffff",
        color: "#000000",
        borderColor: "#000000",
      }}
    >
      <span className="font-bold text-lg uppercase text-black">
        {logo.name[0]}
      </span>
    </div>

    {/* Logo Name/Tagline */}
    <p className="text-[10px] font-semibold uppercase text-black whitespace-normal">
      {logo.name}
    </p>
    <p className="text-[8px] text-black whitespace-normal">Partner Since '23</p>
  </div>
);

/**
 * MarqueeBand Component
 * Handles the duplication, scrolling animation, and rotation for one band.
 */
const MarqueeBand = ({ directionClass, rotationClass, isLimeBanner }) => {
  // Determine animation duration based on direction
  const duration = directionClass === "scrollLeft" ? "40s" : "45s"; // Subtle speed difference

  return (
    <div
      // Reduced height from 150px to 100px for a smaller banner
      className={`absolute inset-0 w-full h-[100px] py-2 shadow-md overflow-hidden border-y-2 z-10 
                 md:transform ${rotationClass} origin-center transition-transform duration-300 ease-in-out`}
      style={{
        backgroundColor: isLimeBanner ? "#c4ef17 " : "#ffffff",
        borderColor: "#000000",
      }}
    >
      <style>{`
        /* Separate keyframes for left and right scrolling */
        @keyframes scrollLeft {
            from { transform: translateX(0%); }
            to { transform: translateX(-100%); }
        }
        @keyframes scrollRight {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
        }
        /* Ensure logos are vertically centered */
        .marquee-content {
          height: 100%;
          align-items: center;
        }
      `}</style>

      <div className="marquee-container h-full">
        <div
          className="marquee-content inline-flex"
          style={{
            animation: `${directionClass} ${duration} linear infinite`,
            width: "200%",
          }}
        >
          {/* Content Strip 1 */}
          {mockLogos.map((logo, index) => (
            <LogoCard
              key={`s1-${index}`}
              logo={logo}
              isLimeBanner={isLimeBanner}
            />
          ))}
          {/* Content Strip 2 (Duplicate for seamless loop) */}
          {mockLogos.map((logo, index) => (
            <LogoCard
              key={`s2-${index}`}
              logo={logo}
              isLimeBanner={isLimeBanner}
              isDuplicate={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * LaunchProcessAndMarquee Component
 * Implements the 3-step process section and the continuous, angled logo banner.
 */
const LaunchProcessAndMarquee = () => {
  return (
    <div className="bg-black text-white py-20 font-inter ">
      {/* --- Section 1: 3 Steps to Launch Your Website (Cards are fine, keeping them as is) --- */}
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

      {/* --- Section 2: X-shaped Scrolling Logo Banners on desktop, stacked on mobile --- */}
      {/* Reduced overall height and used fixed sizes for better control */}
      <div className="w-full relative h-40 md:h-56 overflow-hidden">
        {/* Band 1: Rotates Left-Down (Lime Banner) */}
        {/* Softer angle: -3deg. Positioned to cross slightly above center */}
        <div className="absolute inset-0 z-20 md:top-1/4 md:translate-y-[-25%]">
          <div className="hidden md:block">
            <MarqueeBand
              directionClass="scrollLeft"
              rotationClass="rotate-[-3deg]"
              isLimeBanner={true}
            />
          </div>
          {/* Mobile: Straight, positioned in the top half */}
          <div className="block md:hidden h-1/2 relative">
            <MarqueeBand
              directionClass="scrollLeft"
              rotationClass="rotate-0"
              isLimeBanner={true}
            />
          </div>
        </div>

        {/* Band 2: Rotates Right-Down (White Banner) */}
        {/* Softer angle: 3deg. Positioned to cross slightly below center */}
        <div className="absolute inset-0 z-10 md:bottom-1/4 md:translate-y-[25%]">
          <div className="hidden md:block">
            <MarqueeBand
              directionClass="scrollRight"
              rotationClass="rotate-[3deg]"
              isLimeBanner={false}
            />
          </div>
          {/* Mobile: Straight, positioned in the bottom half */}
          <div className="block md:hidden h-1/2 relative top-1/2">
            <MarqueeBand
              directionClass="scrollRight"
              rotationClass="rotate-0"
              isLimeBanner={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchProcessAndMarquee;
