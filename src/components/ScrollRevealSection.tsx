//@ts-nocheck
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

const mockImages = [
  {
    id: 1,
    src: "/images/scroll-section/way 2.webp",
    alt: "Main project",
  },
  {
    id: 2,
    src: "/images/scroll-section/way 1.webp",
    alt: "Left project",
  },
  {
    id: 3,
    src: "/images/scroll-section/way 3.webp",
    alt: "Right project",
  },
];

const ScrollRevealSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const animationRef = useRef(null);

  // Intersection Observer for text animation only
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
          observer.unobserve(textElement);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(textElement);

    return () => {
      if (textElement) {
        observer.unobserve(textElement);
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { top, height } = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    const start = vh * 0.8;
    const end = height * 0.7;

    const rawProgress = (start - top) / end;
    const progress = Math.min(1, Math.max(0, rawProgress));

    const easedProgress = easeOutQuad(progress);

    setScrollProgress(easedProgress);
  }, []);

  const easeOutQuad = (x) => {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  };

  const animate = useCallback(() => {
    handleScroll();
    animationRef.current = requestAnimationFrame(animate);
  }, [handleScroll]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Original card styles - UNCHANGED
  const getCardStyles = (index) => {
    if (isMobile) {
      return {
        transform: "translateX(-50%)",
        opacity: 1,
        zIndex: 1,
      };
    }

    const p = scrollProgress;

    if (index === 0) {
      return {
        transform: "translateX(-50%)",
        opacity: 1,
        zIndex: 30,
      };
    }

    if (index === 1) {
      return {
        transform: `translateX(-50%) rotate(${p * -18}deg)`,
        opacity: 0.4 + p * 0.6,
        zIndex: 20,
      };
    }

    return {
      transform: `translateX(-50%) rotate(${p * 18}deg)`,
      opacity: 0.4 + p * 0.6,
      zIndex: 10,
    };
  };

  return (
    <section className="bg-black text-white container mx-auto">
      <div ref={containerRef} className={isMobile ? "py-16" : "h-[200vh]"}>
        <div className="sticky top-[10vh] w-full px-4 md:px-8">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">
            {/* LEFT: Text with animations */}
            <div
              ref={textRef}
              className="order-2 mb-15 sm:mb-0 md:order-1 pt-8 md:pt-0 text-center md:text-left"
            >
              {/* Subtitle */}
              <h3
                className={`text-sm uppercase tracking-widest text-lime-accent mb-2 font-bold
                  transition-all duration-700 ease-out
                  ${
                    isTextVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4"
                  }`}
                style={{ transitionDelay: "0ms" }}
              >
                Our Mission
              </h3>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight overflow-hidden">
                <span className="block overflow-hidden">
                  <span
                    className={`inline-block transition-all duration-700 ease-out
                      ${
                        isTextVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-full"
                      }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    Thankfully, there is
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className={`inline-block transition-all duration-700 ease-out
                      ${
                        isTextVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-full"
                      }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    The Roots Digital.
                  </span>
                </span>
              </h2>

              {/* Description */}
              <p
                className={`text-base md:text-lg text-gray-400 max-w-xl leading-relaxed
                  transition-all duration-700 ease-out
                  ${
                    isTextVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                The truly affordable done-for-you website solution.
              </p>

              {/* Button */}
              <button
                className={`mt-6 px-6 py-3 bg-lime-accent text-black font-semibold rounded-lg 
                  hover:bg-lime-400 transition-all duration-700 ease-out
                  ${
                    isTextVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                See Our Case Studies
              </button>
            </div>

            {/* RIGHT: Cards - COMPLETELY UNCHANGED */}
            <div className="order-2 md:order-2 relative w-full h-[50vh] md:h-[70vh]">
              {mockImages.map((item, index) => {
                if (isMobile && index !== 0) return null;

                const styles = getCardStyles(index);

                return (
                  <div
                    key={item.id}
                    className="absolute bottom-8 left-1/2 w-[55%] max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    style={{
                      ...styles,
                      transformOrigin: "bottom center",
                      transition:
                        "transform 0.2s ease-out, opacity 0.2s ease-out",
                    }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
