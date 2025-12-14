"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
interface Testimonial {
  id: number;
  text: string;
  author: string;
  stars: number;
}

interface StarRatingProps {
  count: number;
}

interface TestimonialCardProps {
  item: Testimonial;
  isActive: boolean;
}

const TestimonialSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The Roots Digital went above and beyond in creating my animation project...",
      author: "Kayden Gauthier",
      stars: 5,
    },
    {
      id: 2,
      text: "The team handled my Shopify project with professionalism and delivered...",
      author: "Sofia Mooree",
      stars: 5,
    },
    {
      id: 3,
      text: "I needed animated content for my business and The Roots Digital...",
      author: "Hedda Martin",
      stars: 5,
    },
    {
      id: 4,
      text: "I wanted a customized Shopify store and The Roots Digital exceeded my expectations...",
      author: "James",
      stars: 5,
    },
    {
      id: 5,
      text: "Working with The Roots Digital was a fantastic experience. They Paid....",
      author: "Easton Hammond",
      stars: 5,
    },
    {
      id: 6,
      text: "The animation project turned out better than I imagined. The Roots Digital...",
      author: "Max Cook",
      stars: 5,
    },
    {
      id: 7,
      text: "The Roots Digital built my Shopify store flawlessly. Everything from...",
      author: "Robert Watson",
      stars: 5,
    },
    {
      id: 8,
      text: "I was impressed with how smooth the whole process was....",
      author: "Edward",
      stars: 5,
    },
    {
      id: 9,
      text: "The Roots Digital created a stunning and professional website...",
      author: "Grant Davidson",
      stars: 5,
    },
    {
      id: 10,
      text: "I had a great experience with my logo creation. Mike Marshall was...",
      author: "Derek",
      stars: 5,
    },
    {
      id: 11,
      text: "We had a great experience working with therootsdigital on our...",
      author: "Spirit Talks",
      stars: 5,
    },
    {
      id: 12,
      text: "I recently contacted the team to build my practice website and was...",
      author: "Sound Health Practice LLC.",
      stars: 5,
    },
    {
      id: 13,
      text: "I recently had the pleasure of working with this fantastic company...",
      author: "Grey _Zone",
      stars: 5,
    },
    {
      id: 14,
      text: "Thank you for the amazing work on our logo. You perfectly captured...",
      author: "SalcedocleaningservicesLlc",
      stars: 5,
    },
  ];

  const totalSlides = testimonials.length;
  const cloneCount = 5;

  const extendedTestimonials: Testimonial[] = [
    ...testimonials.slice(-cloneCount),
    ...testimonials,
    ...testimonials.slice(0, cloneCount),
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const cardWidth = 272;

  const extendedIndex = activeIndex + cloneCount;

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) setContainerWidth(sliderRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getTransformValue = useCallback(() => {
    const centerOffset = containerWidth / 2 - cardWidth / 2;
    const slideOffset = extendedIndex * cardWidth;
    return centerOffset - slideOffset;
  }, [containerWidth, extendedIndex]);

  const handleTransitionEnd = useCallback(() => {
    if (activeIndex >= totalSlides) {
      setIsTransitioning(false);
      setActiveIndex(0);
    } else if (activeIndex < 0) {
      setIsTransitioning(false);
      setActiveIndex(totalSlides - 1);
    }
  }, [activeIndex, totalSlides]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => setActiveIndex((prev) => prev - 1);
  const handleNext = () => setActiveIndex((prev) => prev + 1);
  const handleDotClick = (index: number) => setActiveIndex(index);

  const getRealIndex = () => {
    if (activeIndex < 0) return totalSlides + activeIndex;
    if (activeIndex >= totalSlides) return activeIndex - totalSlides;
    return activeIndex;
  };

  const StarRating: React.FC<StarRatingProps> = ({ count }) => (
    <div className="flex space-x-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition duration-300 ${
            i < count ? "text-lime-400 fill-lime-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );

  const TestimonialCard: React.FC<TestimonialCardProps> = ({
    item,
    isActive,
  }) => (
    <div
      className={`shrink-0 w-64 p-4 mx-2 rounded-lg backdrop-blur-sm shadow-2xl 
        transition-all duration-500 ease-out cursor-pointer
        ${
          isActive
            ? "bg-zinc-800 border-2 border-lime-400 scale-105 shadow-lime-400/30"
            : "bg-zinc-800/50 border border-lime-400/30 scale-95 opacity-70 hover:opacity-90"
        }`}
    >
      <StarRating count={item.stars} />
      <p className="mt-2 text-xs text-gray-300 line-clamp-4">{item.text}</p>
      <p className="mt-3 text-sm font-semibold text-white">{item.author}</p>
      <p className="text-xs text-gray-400">Client</p>
    </div>
  );

  return (
    <section className="w-full min-h-[80vh] bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
    relative rounded-xl overflow-hidden
    p-6
    md:p-8
    lg:p-10
    xl:p-20
    bg-linear-to-r from-lime-400/60 to-zinc-900/95
    shadow-2xl shadow-lime-400/20
  "
        >
          <div className="absolute inset-0 bg-linear-to-l from-zinc-900 to-transparent z-0"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* IMAGE */}
            <div className="flex justify-center lg:justify-start w-full lg:w-1/3 mb-8 lg:mb-0">
              <img
                src="/images/testimonial/trustpilot.webp"
                alt="Trustpilot"
                className="
          w-32
          md:w-40
          lg:w-48
          xl:w-64
          object-contain
        "
              />
            </div>

            {/* TEXT */}
            <div className="text-center lg:text-left w-full lg:w-2/3">
              <h2
                className="
          font-extrabold text-white leading-tight tracking-tight max-w-3xl
          text-lg
          md:text-xl
          lg:text-2xl
          xl:text-4xl
        "
              >
                I was impressed how smooth the whole process was with them. They
                have been proactive to resolve my concerns in a timely manner.
              </h2>

              <div className="mt-6 xl:mt-8 text-white">
                <p
                  className="
            font-semibold
            text-sm
            md:text-sm
            lg:text-base
            xl:text-base
          "
                >
                  Source: Every TRD Customer
                </p>

                <p
                  className="
            font-bold mt-1
            text-lg
            md:text-lg
            lg:text-xl
            xl:text-xl
          "
                >
                  Rated 4.8 Excellent
                </p>

                <img
                  src="/images/testimonial/stars.png"
                  alt="stars"
                  className="
            mt-2
            w-32
            md:w-36
            lg:w-40
            xl:w-48
          "
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* SLIDER SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mt-4 md:mt-8 lx:mt-16 relative"
        >
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-800 hover:bg-lime-400 hover:text-black text-white transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-800 hover:bg-lime-400 hover:text-black text-white transition-all duration-300 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={sliderRef} className="overflow-hidden mx-8 md:mx-12">
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-16 md:w-24 bg-liner-to-r from-zinc-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-8 md:right-12 top-0 bottom-0 w-16 md:w-24 bg-linear-to-l from-zinc-900 to-transparent z-10 pointer-events-none"></div>

            <div
              className={`flex py-4 ${
                isTransitioning
                  ? "transition-transform duration-500 ease-out"
                  : ""
              }`}
              style={{ transform: `translateX(${getTransformValue()}px)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((item, index) => {
                const isActive = index === extendedIndex;
                return (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: (index % totalSlides) * 0.05,
                    }}
                    onClick={() => {
                      const clickedRealIndex = index - cloneCount;
                      if (
                        clickedRealIndex >= 0 &&
                        clickedRealIndex < totalSlides
                      ) {
                        setActiveIndex(clickedRealIndex);
                      }
                    }}
                  >
                    <TestimonialCard item={item} isActive={isActive} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-10 space-x-2 flex-wrap gap-y-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  getRealIndex() === i
                    ? "bg-lime-400 w-8"
                    : "bg-gray-700 hover:bg-lime-400/50 w-2.5"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              ></button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
