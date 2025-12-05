//@ts-nocheck
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Hero = () => {
  // Refs for animations
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const logoRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const aboutText1Ref = useRef(null);
  const aboutText2Ref = useRef(null);

  useEffect(() => {
    // Sequential animations with timeouts
    const timeout1 = setTimeout(() => {
      if (line1Ref.current)
        line1Ref.current.classList.add("opacity-100", "translate-x-0");
    }, 500);

    const timeout2 = setTimeout(() => {
      if (line2Ref.current)
        line2Ref.current.classList.add("opacity-100", "translate-x-0");
    }, 800);

    const timeout3 = setTimeout(() => {
      if (line3Ref.current)
        line3Ref.current.classList.add("opacity-100", "translate-x-0");
    }, 1100);

    const timeout4 = setTimeout(() => {
      if (logoRef.current)
        logoRef.current.classList.add("opacity-100", "translate-y-0");
    }, 1500);

    const timeout5 = setTimeout(() => {
      if (aboutHeadingRef.current)
        aboutHeadingRef.current.classList.add("opacity-100", "translate-y-0");
    }, 1700);

    const timeout6 = setTimeout(() => {
      if (aboutText1Ref.current)
        aboutText1Ref.current.classList.add("opacity-100", "translate-y-0");
    }, 1900);

    const timeout7 = setTimeout(() => {
      if (aboutText2Ref.current)
        aboutText2Ref.current.classList.add("opacity-100", "translate-y-0");
    }, 2100);

    // Clean up timeouts
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      clearTimeout(timeout5);
      clearTimeout(timeout6);
      clearTimeout(timeout7);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-black overflow-hidden">
      {/* --- Background Video --- */}
      <video
        className="absolute top-0 left-0 w-full h-[80%] object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://therootsdigital.com/wp-content/uploads/2025/10/Untitled-design.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* --- Left-aligned Headline --- */}
      <div className="relative z-20 h-full mt-auto w-full container px-4 md:px-8 flex flex-col justify-between pt-40 pb-8 md:pb-16">
        <div className="max-w-4xl flex-grow flex items-start">
          <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold leading-none text-lime-accent">
            <span
              ref={line1Ref}
              className="block opacity-0 -translate-x-12 transition-all duration-700 ease-out"
            >
              Rethink
            </span>
            <span
              ref={line2Ref}
              className="block opacity-0 -translate-x-12 transition-all duration-700 ease-out"
            >
              Reinvent
            </span>
            <span
              ref={line3Ref}
              className="block opacity-0 -translate-x-12 transition-all duration-700 ease-out"
            >
              Revolutionize
            </span>
          </h2>
        </div>
      </div>

      {/* --- Centered Image + About Text --- */}
      <div className="relative z-20 w-full px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16 max-w-6xl mx-auto pb-8 md:pb-12">
          {/* --- Image --- */}
          <div
            ref={logoRef}
            className="flex-shrink-0 flex items-center justify-center opacity-0 translate-y-12 transition-all duration-700 ease-out"
          >
            <Image
              src="/images/b_logo.webp"
              alt="About Us Graphic"
              width={800}
              height={1000}
              className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[34rem] h-auto object-contain"
              priority
            />
          </div>

          {/* --- About Text --- */}
          <div className="flex flex-col items-end md:items-start text-white text-center md:text-left">
            <h5
              ref={aboutHeadingRef}
              className="relative text-base font-bold text-gray-400 mb-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-accent
                                       opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              ABOUT THE ROOTS DIGITAL
            </h5>
            <h2
              ref={aboutText1Ref}
              className="text-4xl md:text-5xl lg:text-6xl uppercase leading-tight
                                     opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              CRAFTING DIGITAL
            </h2>
            <h2
              ref={aboutText2Ref}
              className="text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-[#868686]
                                     opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              EXCELLENCE
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
