"use client";
import { JSX, useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";

// Custom hook to detect if element is in view
const useInView = (
  threshold: number = 0.1
): { ref: RefObject<HTMLElement | null>; isInView: boolean } => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once in view, stop observing (animation plays once)
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

// Define a type for the possible active tabs
type Tab = "mission" | "vision" | "value";

// Content structure for each tab (with the type `Tab` keys)
const content: Record<Tab, JSX.Element> = {
  mission: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        At the heart of everything we do lies one powerful belief to{" "}
        <span className="text-lime-accent">revolutionize</span> how creativity
        and technology empower human potential. We seek to revolutionize the way
        ideas are born, built, and experienced, turning imagination into impact
        and <span className="text-lime-accent">innovation</span> into emotion.
      </p>
      <p className="leading-8 text-gray-300">
        Our mission is to ignite the power of ideas and amplify the voices of
        those who dare to dream. Through the fusion of technology, creativity,
        and passion, we aim to reshape industries, elevate communities, and make
        a positive impact on the world. Every project we take on is a step
        toward creating a more vibrant and inclusive future where creativity
        drives meaningful change.
      </p>
    </>
  ),
  vision: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        Our vision goes beyond change; it's a movement to{" "}
        <span className="text-lime-accent">revolutionize</span> connection,
        collaboration, and growth through digital transformation. We believe
        every brand, every idea, and every story has the power to evolve,
        inspire, and make a difference when guided by purpose, fueled by
        creativity, and driven by the will to{" "}
        <span className="text-lime-accent">revolutionize</span>.
      </p>
      <p className="leading-8 text-gray-300">
        We envision a world where technology serves as a bridge, not a barrier,
        empowering individuals and organizations to collaborate, innovate, and
        transform. Our goal is to create a future where digital experiences not
        only drive business growth but also foster human connections that
        transcend borders and cultures. We believe in a future where ideas
        flourish and creativity is the key to solving the world's most pressing
        challenges.
      </p>
    </>
  ),
  value: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        We believe in the power of creativity, technology, and human potential.
        Our values are rooted in innovation, collaboration, and making a
        meaningful impact. We are committed to building a future where ideas
        inspire, transform, and drive change.
      </p>
      <p className="leading-8 text-gray-300">
        Our core values define everything we do, guiding us to always aim for
        excellence and to embrace challenges as opportunities. We place a high
        value on transparency, integrity, and accountability, ensuring that
        every action we take is aligned with our mission and vision. By
        fostering a culture of collaboration, we believe we can harness the
        collective genius of our teams, clients, and partners to achieve great
        things.
      </p>
      <p className="leading-8 text-gray-300">
        We are deeply committed to creating positive social and environmental
        impact, recognizing that the future we build today will shape the world
        of tomorrow. Our values inspire us to act responsibly and with purpose,
        championing diversity, inclusion, and sustainability in all our
        endeavors.
      </p>
    </>
  ),
};

const ValueSection: React.FC = () => {
  // Set initial state for the active tab
  const [activeTab, setActiveTab] = useState<Tab>("value");
  const [isHovered, setIsHovered] = useState(false);

  // Intersection Observer hooks for different elements
  const { ref: sectionRef, isInView: sectionInView } = useInView(0.1);
  const { ref: tabsRef, isInView: tabsInView } = useInView(0.2);
  const { ref: contentRef, isInView: contentInView } = useInView(0.2);
  const { ref: textLayerRef, isInView: textLayerInView } = useInView(0.3);
  const { ref: astronautRef, isInView: astronautInView } = useInView(0.3);

  // Mouse move handler to create the hover effect
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className="w-full bg-black text-white py-15 relative overflow-hidden container mx-auto"
    >
      {/* Optional: Giant faint background text for the whole section */}
      <div
        className={`absolute inset-0 flex items-center justify-end pointer-events-none transition-all duration-1000 ${
          sectionInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/images/about-logo.webp"
          alt="background text"
          width={1200}
          height={1200}
          className="opacity-[0.03] object-contain select-none"
        />
      </div>

      <div className="relative z-10 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE CONTENT */}
        <div>
          {/* Tabs with staggered animation */}
          <div
            ref={tabsRef as RefObject<HTMLDivElement>}
            className="flex gap-12 text-gray-400 text-lg font-medium mb-10"
          >
            <button
              onClick={() => setActiveTab("mission")}
              className={`${
                activeTab === "mission" ? "text-white" : "hover:text-white"
              } transition-all duration-700 ${
                tabsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              OUR MISSION
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`${
                activeTab === "vision" ? "text-white" : "hover:text-white"
              } transition-all duration-700 ${
                tabsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              OUR VISION
            </button>
            <button
              onClick={() => setActiveTab("value")}
              className={`${
                activeTab === "value" ? "text-white" : "hover:text-white"
              } transition-all duration-700 ${
                tabsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              VALUE
            </button>
          </div>

          {/* Display content based on active tab with animation */}
          <div
            ref={contentRef as RefObject<HTMLDivElement>}
            className={`transition-all duration-1000 ease-out ${
              contentInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div key={activeTab} className="animate-fadeSlideUp">
              {content[activeTab]}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE ASTRONAUT & TEXT */}
        <div
          className="w-full h-[500px] lg:h-[600px] relative flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 1. TEXT LAYER (Behind the Astronaut) with scroll animation */}
          <div
            ref={textLayerRef as RefObject<HTMLDivElement>}
            className="absolute inset-0 z-0 flex flex-col items-center justify-center select-none pointer-events-none"
          >
            {/* Top Row: "the" ..... "roots" */}
            <div className="flex justify-between w-full px-4 lg:px-0">
              <span
                className={`text-[80px] lg:text-[120px] font-bold leading-none text-transparent uppercase font-sans transition-all duration-1000 ease-out ${
                  textLayerInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
                  transitionDelay: "200ms",
                }}
              >
                the
              </span>
              <span
                className={`text-[80px] lg:text-[120px] font-bold leading-none text-transparent uppercase font-sans transition-all duration-1000 ease-out ${
                  textLayerInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
                  transitionDelay: "400ms",
                }}
              >
                roots
              </span>
            </div>
            {/* Bottom Row: "digital." */}
            <span
              className={`text-[80px] lg:text-[130px] font-bold leading-none text-transparent uppercase font-sans -mt-4 lg:-mt-8 transition-all duration-1000 ease-out ${
                textLayerInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
                transitionDelay: "600ms",
              }}
            >
              digital.
            </span>
          </div>

          {/* 2. ASTRONAUT LAYER (Front) with scroll animation */}
          <div
            ref={astronautRef as RefObject<HTMLDivElement>}
            className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-1200 ease-out ${
              astronautInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-20 scale-90"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Image
              src="/images/astronaut.webp"
              alt="astronaut"
              width={500}
              height={500}
              className={`object-contain select-none drop-shadow-2xl transition-all duration-500 ease-in-out ${
                isHovered
                  ? "transform -translate-y-6 scale-105"
                  : "transform translate-y-0 scale-100"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Add keyframe animations via style tag */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes textReveal {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </section>
  );
};

export default ValueSection;
