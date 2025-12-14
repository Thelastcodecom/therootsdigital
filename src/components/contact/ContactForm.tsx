"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

// ArrowUpRight SVG equivalent (functional component with props)
interface ArrowUpRightProps {
  className?: string;
}

const ArrowUpRight: React.FC<ArrowUpRightProps> = ({
  className = "w-5 h-5",
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ContactPage: React.FC = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const text1 = "WE CREATE DIGITAL";
  const text2 = "SOLUTIONS";

  // --- Typewriter Effect ---
  useEffect(() => {
    let i = 0;
    const interval1 = setInterval(() => {
      setLine1(text1.slice(0, i));
      i++;
      if (i > text1.length) clearInterval(interval1);
    }, 60);

    let j = 0;
    const interval2 = setInterval(() => {
      setLine2(text2.slice(0, j));
      j++;
      if (j > text2.length) clearInterval(interval2);
    }, 60);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [text1, text2]);

  /**
   * FIX: Explicitly type the event 'e' as a synthetic mouse event
   * originating from an HTMLDivElement. (This is line 55).
   */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    // e.clientX and e.clientY are now guaranteed to exist and be numbers
    const clientX = e.clientX;
    const clientY = e.clientY;

    const MAGNET_STRENGTH = 0.3;
    const MAX_DISTANCE = 20;

    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const center_x = left + width / 2;
    const center_y = top + height / 2;
    const distance_x = clientX - center_x;
    const distance_y = clientY - center_y;

    const move_x = Math.max(
      -MAX_DISTANCE,
      Math.min(MAX_DISTANCE, distance_x * MAGNET_STRENGTH)
    );
    const move_y = Math.max(
      -MAX_DISTANCE,
      Math.min(MAX_DISTANCE, distance_y * MAGNET_STRENGTH)
    );

    setTransform({ x: move_x, y: move_y });
  }, []);

  /**
   * FIX: handleMouseLeave takes no arguments and is correctly typed for a React handler. (This is line 69).
   * Note: We don't need to type the event if we don't use it, which is safer in this context.
   */
  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-20">
      {/* Custom Keyframes for the required animations */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes ping-slow {
            0% { transform: scale(0.9); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 0.1; }
            100% { transform: scale(0.9); opacity: 0.8; }
          }

          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }

          /* Font Fallbacks (Using system fonts for compatibility) */
          .font-marcellus {
            font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
          }
          .font-outfit {
            font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          }
        `}
      </style>

      {/* Header Section */}
      <div className="text-center pt-20 pb-10">
        <h1 className="text-xl tracking-[0.2rem] font-marcellus">CONTACT</h1>
        <p className="text-xs mt-2 opacity-60 tracking-widest font-outfit">
          THE ROOTS DIGITAL &gt; CONTACT
        </p>
      </div>
      <hr className="border-[#242424]" />

      <div className="max-w-5xl mx-auto px-6 mt-16">
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-wide font-marcellus">
            {line1}
          </h2>
          <h3 className="text-3xl text-gray-400 tracking-wide mt-1 font-marcellus">
            {line2}
          </h3>
        </div>

        {/* Info Box Section */}
        <div className="space-y-6 border-t border-gray-700 pt-6 font-outfit">
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="uppercase text-sm">OUR OFFICE</span>
            <span className="text-xs opacity-70 text-right">
              7901 4th Street, Saint Petersburg, FL, United States, Florida
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="uppercase text-sm">CONTACT</span>
            <span className="text-xs opacity-70 text-right">
              CONTACT@THEROOTSDIGITAL.COM <br /> Tel: 727-334-6557
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="uppercase text-sm">SOCIAL</span>
            <span className="text-xs opacity-70">INSTAGRAM • FACEBOOK</span>
          </div>
        </div>

        <div className="mt-12 font-outfit">
          <ul className="uppercase text-[0.65rem] text-white mb-2 list-disc marker:text-lime-400 marker:text-xl ml-4">
            <li>
              At The Root Digital, We Value <br /> Communication And
              Transparency. By <br /> Reaching Out, You Can:
            </li>
          </ul>
          <input
            placeholder="info@therootsdigital.com"
            className="w-full bg-[#1a1a1a] px-4 py-2 text-sm text-gray-300"
            readOnly
          />
        </div>

        {/* FORM */}
        <form className="mt-16 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {/* 4 Input Fields */}
          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">
              Your Name
            </label>
            <input
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="Gomez Galatria"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="gomez@example.com"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">
              Skype/Phone
            </label>
            <input
              type="tel"
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="+1 800 123 456 789"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">
              Company
            </label>
            <input
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="XpressBuddy Digital Solutions"
            />
          </div>

          {/* MESSAGE + BUTTON — SCREENSHOT MATCH */}
          <div className="col-start-2  ml-[-120px] md:ml-[-180px] lg:ml-[-220px] xl:ml-[-240px]  mt-24 relative">
            {/* LABEL */}
            <label className="text-xs uppercase mb-4 block font-marcellus">
              Your Message
            </label>

            {/* MESSAGE AREA */}
            <div className="relative min-h-[180px]">
              {/* TEXT */}
              <textarea
                className="w-full bg-transparent text-sm text-gray-300 focus:outline-none resize-none"
                rows={4}
                placeholder="Hello Dennis, can you help me with..."
              />

              {/* FULL WIDTH LINE */}
              <div className="absolute left-0 right-0 bottom-6 h-px bg-gray-600" />

              {/* SEND BUTTON — OVERLAPPING LINE */}
              <div className="absolute right-0 bottom-6 translate-y-1/2">
                <div
                  ref={wrapperRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ willChange: "transform" }}
                >
                  <button
                    type="submit"
                    style={{
                      transform: `translate(${transform.x}px, ${transform.y}px)`,
                      transition:
                        "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                    className="relative rounded-full w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-lime-400 flex items-center justify-center"
                  >
                    {/* Outer Glow Ring */}
                    <div className="absolute -inset-2 rounded-full bg-lime-400/20 blur-xl group-hover:bg-lime-400/40 transition-all duration-500" />

                    {/* Rotating Border */}
                    <div className="absolute -inset-1 rounded-full border-2 border-dashed border-lime-400/30 group-hover:border-lime-400/60 animate-spin-slow" />

                    {/* Pulse Rings */}
                    <div className="absolute -inset-2 rounded-full border-2 border-lime-400/50 animate-ping-slow" />

                    <div
                      className="absolute -inset-2 rounded-full border-2 border-lime-400/30 animate-ping-slow"
                      style={{ animationDelay: "0.5s" }}
                    />

                    {/* Main Button */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 flex items-center justify-center shadow-2xl shadow-lime-400/30 group-hover:shadow-lime-400/60 transition-all duration-500">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />

                      <span className="relative text-xl lg:text-2xl font-black text-black tracking-wider">
                        SEND
                      </span>

                      <ArrowUpRight className="relative w-6 h-6 text-black mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
