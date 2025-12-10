"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

export default function ContactPage() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

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

  // --- Mouse Magnet Effect ---
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const MAGNET_STRENGTH = 0.3;
    const MAX_DISTANCE = 20;

    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const center_x = left + width / 2;
    const center_y = top + height / 2;
    const distance_x = e.clientX - center_x;
    const distance_y = e.clientY - center_y;

    const move_x = Math.max(-MAX_DISTANCE, Math.min(MAX_DISTANCE, distance_x * MAGNET_STRENGTH));
    const move_y = Math.max(-MAX_DISTANCE, Math.min(MAX_DISTANCE, distance_y * MAGNET_STRENGTH));

    setTransform({ x: move_x, y: move_y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans pt-20">
      <div className="text-center pt-20 pb-10">
        <h1 className="text-xl tracking-[0.2rem] font-marcellus">CONTACT</h1>
        <p className="text-xs mt-2 opacity-60 tracking-widest font-outfit">
          THE ROOTS DIGITAL &gt; CONTACT
        </p>
      </div>
      <hr className="border-[#242424]" />

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-wide font-marcellus">{line1}</h2>
          <h3 className="text-3xl text-gray-400 tracking-wide mt-1 font-marcellus">{line2}</h3>
        </div>

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
              At The Root Digital, We Value <br /> Communication And Transparency. By <br /> Reaching Out, You Can:
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
          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">Your Name</label>
            <input
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="Gomez Galatria"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">Email</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="gomez@example.com"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">Skype/Phone</label>
            <input
              type="tel"
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="+1 800 123 456 789"
            />
          </div>

          <div className="col-span-1">
            <label className="text-xs uppercase block mb-1 font-marcellus">Company</label>
            <input
              className="w-full bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors"
              placeholder="XpressBuddy Digital Solutions"
            />
          </div>

          {/* MESSAGE + BUTTON */}
          <div className="sm:col-span-2 flex flex-col pt-10 relative">
            <div className="grow sm:flex sm:justify-start">
              <label className="text-xs uppercase block mb-1 font-marcellus">Your Message</label>
              <textarea
                className="w-full sm:w-[calc(100%/2+1rem)] bg-transparent border-b border-gray-600 text-sm py-1 focus:border-lime-400 focus:outline-none transition-colors resize-none h-[220px] lg:h-[300px]"
                placeholder="Hello Dennis, can you help me with..."
                rows={10}
              />
            </div>

            <div className="absolute right-0 bottom-0 sm:bottom-1/2 transform translate-y-1/2 pr-2">
              <div
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-block p-4 rounded-full"
                style={{ willChange: "transform" }}
              >
                <button
                  type="submit"
                  style={{
                    transform: `translate(${transform.x}px, ${transform.y}px)`,
                    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                  className="bg-lime-400 text-black w-32 h-32 rounded-full text-lg tracking-wider shadow-lg uppercase font-bold font-marcellus"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
