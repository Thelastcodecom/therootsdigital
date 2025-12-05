//@ts-nocheck
"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    text: "I was impressed how smooth the whole process was with them. They have been proactive to resolve my concerns in a timely manner.",
    company: "Design Studio",
  },
  {
    id: 2,
    name: "Mark Thompson",
    rating: 4,
    text: "Their attention to detail exceeded my expectations. The final product was delivered ahead of schedule and looked better than I imagined.",
    company: "Tech Innovations",
  },
  {
    id: 3,
    name: "Amanda Lee",
    rating: 5,
    text: "Working with this team was a breath of fresh air. They listened carefully to what I needed and delivered exactly that.",
    company: "Marketing Agency",
  },
  {
    id: 4,
    name: "Robert Chen",
    rating: 5,
    text: "The communication throughout the project was excellent. I always knew what stage we were at and what was coming next.",
    company: "Finance Consultants",
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    rating: 4,
    text: "They managed to transform our outdated website into something modern and functional while maintaining our brand identity.",
    company: "Retail Business",
  },
  {
    id: 6,
    name: "David Wright",
    rating: 5,
    text: "The support after launch has been outstanding. Any minor adjustments needed were handled quickly and efficiently.",
    company: "Healthcare Services",
  },
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [textKey, setTextKey] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update text key when testimonial changes for animation reset
  useEffect(() => {
    setTextKey((prev) => prev + 1);
  }, [activeTestimonial]);

  // Function to render star ratings
  const renderStars = (rating, animated = false) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 star-icon ${
              i < rating ? "text-lime-400" : "text-gray-600"
            } ${animated ? "star-animate" : ""}`}
            style={animated ? { animationDelay: `${i * 100}ms` } : {}}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Scroll to card function
  const scrollToCard = (id) => {
    const cardElement = document.getElementById(`card-${id}`);
    if (cardElement && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: cardElement.offsetLeft - 20,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScrollEnabled || isHovering) return;

    const interval = setInterval(() => {
      const currentIndex = testimonials.findIndex(
        (t) => t.id === activeTestimonial.id
      );
      const nextIndex = (currentIndex + 1) % testimonials.length;
      const nextTestimonial = testimonials[nextIndex];

      setActiveTestimonial(nextTestimonial);
      scrollToCard(nextTestimonial.id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTestimonial, isHovering, autoScrollEnabled]);

  // Manual navigation functions
  const scrollLeft = () => {
    const currentIndex = testimonials.findIndex(
      (t) => t.id === activeTestimonial.id
    );
    const prevIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const prevTestimonial = testimonials[prevIndex];

    setActiveTestimonial(prevTestimonial);
    scrollToCard(prevTestimonial.id);
  };

  const scrollRight = () => {
    const currentIndex = testimonials.findIndex(
      (t) => t.id === activeTestimonial.id
    );
    const nextIndex = (currentIndex + 1) % testimonials.length;
    const nextTestimonial = testimonials[nextIndex];

    setActiveTestimonial(nextTestimonial);
    scrollToCard(nextTestimonial.id);
  };

  return (
    <section className="bg-black pb-10" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Banner section with lime accent */}
        <div
          className={`testimonial-banner mb-12 rounded-lg p-6 border border-lime-400/30 relative overflow-hidden ${
            isVisible ? "fade-in-up" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, rgba(132,204,22,0.2), rgba(163,230,53,0.3), rgba(132,204,22,0.2))",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-lime-300 blur-3xl rounded-full -right-20 -top-20 w-1/2 h-1/2 opacity-20 blob-float"></div>
            <div className="absolute inset-0 bg-lime-500 blur-3xl rounded-full -left-20 -bottom-20 w-1/2 h-1/2 opacity-20 blob-float-delayed"></div>
          </div>

          {/* Shimmer effect */}
          <div className="shimmer-overlay"></div>

          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            {/* Left - Logo */}
            <div
              className={`logo-container p-4 rounded-lg border border-lime-400/20 shadow-xl min-w-[180px] flex items-center justify-center ${
                isVisible ? "fade-in-left" : "opacity-0"
              }`}
            >
              <div className="w-36 h-36 relative bg-gradient-to-br from-lime-500/30 to-lime-800/30 rounded-full flex items-center justify-center border-2 border-lime-400/50 pulse-slow">
                <Image
                  src={"/images/Trust Pilot.webp"}
                  fill
                  alt="Trust Pilot"
                />
              </div>
            </div>

            {/* Right - Featured Testimonial */}
            <div
              className={`flex-1 flex flex-col items-center md:items-start ${
                isVisible ? "fade-in-right" : "opacity-0"
              }`}
            >
              {/* Stars with animation */}
              <div key={`stars-${textKey}`} className="stars-container">
                {renderStars(activeTestimonial.rating, true)}
              </div>

              {/* Animated testimonial text */}
              <p
                key={`text-${textKey}`}
                className="testimonial-text mt-4 text-xl md:text-2xl text-white font-light leading-relaxed italic"
              >
                "{activeTestimonial.text}"
              </p>

              {/* Name with slide animation */}
              <div
                key={`name-${textKey}`}
                className="author-info mt-4 slide-up-delayed"
              >
                <p className="text-lime-400 font-medium author-name">
                  {activeTestimonial.name}
                </p>
                <p className="text-gray-300 text-sm company-name">
                  {activeTestimonial.company}
                </p>
              </div>

              <div className="source-badge mt-4 bg-black/60 backdrop-blur-sm py-1 px-3 rounded-full border border-lime-400/20 text-gray-200 text-xs">
                <span className="badge-text">
                  Source: Every TRD Customer · Rated 4.8 Excellent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial cards carousel */}
        <div
          className={`relative carousel-container ${
            isVisible ? "fade-in-up-delayed" : "opacity-0"
          }`}
        >
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className="nav-button nav-button-left absolute -left-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-lime-400/30 flex items-center justify-center text-lime-400"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 arrow-bounce-left"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="nav-button nav-button-right absolute -right-10 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-lime-400/30 flex items-center justify-center text-lime-400"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 arrow-bounce-right"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-6 gap-4 snap-x scrollbar-hide px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {testimonials.map((testimonial, index) => (
              <div
                id={`card-${testimonial.id}`}
                key={testimonial.id}
                onClick={() => {
                  setActiveTestimonial(testimonial);
                  setAutoScrollEnabled(false);
                  setTimeout(() => setAutoScrollEnabled(true), 10000);
                }}
                className={`testimonial-card flex-shrink-0 w-[280px] snap-start rounded-lg border p-4 cursor-pointer text-sm
                  ${isVisible ? "card-fade-in" : "opacity-0"}
                  ${
                    activeTestimonial.id === testimonial.id
                      ? "border-lime-400 bg-lime-400/10 card-active"
                      : "border-lime-400/20 bg-black/60"
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Rating */}
                <div className="mb-2">{renderStars(testimonial.rating)}</div>

                {/* Testimonial */}
                <p className="text-gray-200 mb-3 line-clamp-3 card-text">
                  {testimonial.text}
                </p>

                {/* Name */}
                <p className="text-white font-medium card-name">
                  {testimonial.name}
                </p>
                <p className="text-gray-400 text-xs">{testimonial.company}</p>

                {/* Bottom dot indicator */}
                <div className="mt-3 flex justify-center">
                  <div
                    className={`w-2 h-2 rounded-full card-dot ${
                      activeTestimonial.id === testimonial.id
                        ? "bg-lime-400 dot-active"
                        : "bg-lime-900/50"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator dots */}
        <div
          className={`flex justify-center mt-6 gap-2 ${
            isVisible ? "fade-in-up-more-delayed" : "opacity-0"
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setActiveTestimonial(testimonial);
                scrollToCard(testimonial.id);
                setAutoScrollEnabled(false);
                setTimeout(() => setAutoScrollEnabled(true), 10000);
              }}
              className={`indicator-dot h-2 rounded-full ${
                activeTestimonial.id === testimonial.id
                  ? "bg-lime-400 w-6 indicator-active"
                  : "bg-lime-400/30 w-2"
              }`}
              style={{ animationDelay: `${700 + index * 50}ms` }}
              aria-label={`View testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
