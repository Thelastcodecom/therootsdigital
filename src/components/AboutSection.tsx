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
        Our mission is to <span className="text-lime-accent">rethink</span> how
        digital innovation shapes brands in an ever-evolving world. We see
        technology not just as tools or trends, but as the language of modern
        connection. Every brand has a story our goal is to transform that story
        into a powerful, memorable digital experience.
      </p>
      <p className="leading-8 text-gray-300">
        We craft human-centered journeys that connect, inspire, and deliver
        measurable impact. From creative design and branding to smart
        development and strategy, we create solutions that drive real growth. In
        a constantly changing world, we blend creativity with
        <span className="text-lime-accent">innovation</span> to help brands
        stand out with purpose and progress.
      </p>
    </>
  ),
  vision: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        Our vision is to <span className="text-lime-accent">reinvent</span> how
        brands connect and create impact in the digital age. We continue to
        reinvent the boundaries of creativity and technology, shaping
        experiences that inspire trust and build lasting relationships. For us,
        <span className="text-lime-accent">innovation</span> isn’t just about
        being new it’s about being meaningful.
      </p>
      <p className="leading-8 text-gray-300">
        We aim to <span className="text-lime-accent">reimagine</span> digital
        storytelling that sparks emotion, drives engagement, and fuels growth.
        By blending imagination, innovation, and intelligence, we help brands
        move beyond trends and into transformation redefining the digital world
        with purpose, creativity, and heart. The future belongs to those who
        dare to <span className="text-lime-accent">reinvent</span>.
      </p>
    </>
  ),
  value: (
    <>
      <p className="leading-8 text-gray-300 mb-10">
        At the heart of everything we do lies one powerful belief to
        <span className="text-lime-accent">revolutionize</span> how creativity
        and technology empower human potential. We seek to revolutionize the way
        ideas are born, built, and experienced, turning imagination into impact
        and <span className="text-lime-accent">innovation</span> into emotion.
      </p>
      <p className="leading-8 text-gray-300">
        Our vision goes beyond change; it’s a movement to{" "}
        <span className="text-lime-accent">revolutionize</span>
        connection, collaboration, and growth through digital transformation. We
        believe every brand, every idea, and every story has the power to
        evolve, inspire, and make a difference when guided by purpose, fueled by
        creativity, and driven by the will to{" "}
        <span className="text-lime-accent">revolutionize.</span>
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const rotateY = ((offsetX - rect.width / 2) / rect.width) * 20;
            const rotateX = -((offsetY - rect.height / 2) / rect.height) * 20;

            setTilt({ x: rotateX, y: rotateY });
          }}
        >
          {/* TEXT LAYER */}
          <div
            ref={textLayerRef}
            className="absolute inset-0 z-0 flex flex-col items-center justify-center select-none pointer-events-none"
          >
            <div className="flex justify-between w-full px-4 lg:px-0">
              <span
                className={`text-[80px] lg:text-[120px] font-bold leading-none text-transparent uppercase transition-all duration-1000 ${
                  textLayerInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  transitionDelay: "200ms",
                }}
              >
                the
              </span>

              <span
                className={`text-[80px] lg:text-[120px] font-bold leading-none text-transparent uppercase transition-all duration-1000 ${
                  textLayerInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  transitionDelay: "400ms",
                }}
              >
                roots
              </span>
            </div>

            <span
              className={`text-[80px] lg:text-[130px] font-bold leading-none text-transparent uppercase -mt-4 lg:-mt-8 transition-all duration-1000 ${
                textLayerInView
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                transitionDelay: "600ms",
              }}
            >
              digital.
            </span>
          </div>

          {/* ASTRONAUT */}
          <div
            ref={astronautRef}
            className={`relative z-10 w-full h-full flex items-center justify-center transition-all duration-1000 ${
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
              className="object-contain select-none drop-shadow-2xl transition-transform duration-300 ease-out"
              style={{
                transform: isHovered
                  ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.1)`
                  : "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
              }}
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
