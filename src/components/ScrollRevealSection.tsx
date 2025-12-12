"use client";

import React, { useRef, useEffect, useState } from "react";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

const mockImages: ImageItem[] = [
  { id: 1, src: "/images/scroll-section/way 2.webp", alt: "Main project" },
  { id: 2, src: "/images/scroll-section/way 1.webp", alt: "Left project" },
  { id: 3, src: "/images/scroll-section/way 3.webp", alt: "Right project" },
];

const ScrollRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTextVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = rect.height * 0.4;
      const raw = (start - rect.top) / end;
      const p = ease(Math.min(1, Math.max(0, raw)));

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        if (window.innerWidth < 768) {
          card.style.transform =
            index === 0
              ? "translateX(-50%) scale(1)"
              : "translateX(-50%) scale(0.95)";
          card.style.opacity = index === 0 ? "1" : "0";
          return;
        }

        switch (index) {
          case 0:
            card.style.transform = `translateX(-50%) scale(${1 + p * 0.08})`;
            card.style.opacity = `${0.75 + p * 0.25}`;
            break;
          case 1:
            card.style.transform = `translateX(calc(-50% - ${
              p * 60
            }px)) rotate(${p * -10}deg) scale(${1 - p * 0.08})`;
            card.style.opacity = `${0.4 + p * 0.4}`;
            break;
          case 2:
            card.style.transform = `translateX(calc(-50% + ${
              p * 60
            }px)) rotate(${p * 10}deg) scale(${1 - p * 0.08})`;
            card.style.opacity = `${0.4 + p * 0.4}`;
            break;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-black text-white container mx-auto">
      <div ref={containerRef} className="h-[200vh]">
        <div className="sticky top-[10vh] w-full px-4 md:px-8">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 items-center">
            <div
              ref={textRef}
              className="order-2 sm:mb-0 md:order-1 pt-8 md:pt-0 text-center md:text-left"
            >
              <h3
                className={`text-sm uppercase tracking-widest text-lime-accent mb-2 font-bold transition-all duration-500 ${
                  isTextVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
              >
                Our Mission
              </h3>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="block overflow-hidden">
                  <span
                    className={`inline-block transition-all duration-500 ${
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
                    className={`inline-block transition-all duration-500 ${
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

              <p
                className={`text-base md:text-lg text-gray-400 max-w-xl leading-relaxed transition-all duration-500 ${
                  isTextVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                The truly affordable done-for-you website solution.
              </p>

              <button
                className={`mt-6 px-6 py-3 bg-lime-accent text-black font-semibold rounded-lg hover:bg-lime-400 transition-all duration-500 ${
                  isTextVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                See Our Case Studies
              </button>
            </div>

            <div className="order-2 md:order-2 relative w-full h-[50vh] md:h-[70vh]">
              {mockImages.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el: HTMLDivElement | null) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute bottom-8 left-1/2 w-[55%] max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  style={{
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealSection;
