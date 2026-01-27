'use client';
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  PenTool,
  Code,
  Rocket,
  TrendingUp,
} from "lucide-react";

/**
 * EcommerceProcess Component
 * Features a custom "shrinking from left" line animation.
 */
const EcommerceProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Analysis",
      icon: <Search size={28} />,
      description:
        "We begin by understanding your business goals, target audience, and competitive landscape. Our team conducts comprehensive market research and competitor analysis to identify opportunities.",
    },
    {
      id: 2,
      title: "Strategy & Planning",
      icon: <PenTool size={28} />,
      description:
        "Based on our analysis, we develop a comprehensive e-commerce strategy covering platform selection, technical requirements, and growth metrics. We create detailed project roadmaps.",
    },
    {
      id: 3,
      title: "Development & Setup",
      icon: <Code size={28} />,
      description:
        "Our expert developers bring your vision to life. We set up your stores, optimize product listings, configure payment systems, and implement automation tools with precision.",
    },
    {
      id: 4,
      title: "Launch & Growth",
      icon: <Rocket size={28} />,
      description:
        "We execute a strategic launch across your chosen platforms. Our team continuously monitors performance, making data-driven adjustments to maximize ROI and accelerate scaling.",
    },
    {
      id: 5,
      title: "Scale & Support",
      icon: <TrendingUp size={28} />,
      description:
        "Our partnership doesn't end at launch. We provide ongoing support and performance tracking. As your business grows, we scale operations and explore new market opportunities.",
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev === processSteps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? processSteps.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#050505] py-24 px-8 font-sans selection:bg-[#C5EF16] selection:text-black antialiased overflow-hidden">
      <style>{`
        @keyframes shrinkRight {
          0% {
            left: 0%;
            width: 100%;
          }
          100% {
            left: 100%;
            width: 0%;
          }
        }
        .animate-shrink-line {
          animation: shrinkRight 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="max-w-[1000px] mx-auto text-center">
        {/* Header Section */}
        <p className="text-[#C5EF16] text-[10px] uppercase font-black tracking-[0.4em] mb-4">
          OUR PROCESS
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Custom E-Commerce Launch & Growth Process
        </h2>
        <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed font-medium mb-12">
          From strategy and platform setup to design, optimization and scaling
          we follow a proven end-to-end process to build and grow your online store.
        </p>

        {/* Animated Progress Line Container */}
        <div className="relative w-full h-0.5 bg-white/5 mb-16 overflow-hidden rounded-full">
          {/* Background Highlight segments based on current step */}
          
          {/* Custom Shrinking Animation Line */}
          <div className="absolute top-0 h-full bg-[#C5EF16] shadow-[0_0_15px_rgba(197,239,22,0.8)] animate-shrink-line" />
        </div>

        {/* Carousel/Card Container */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Step Indicator */}
          <div className="mb-6">
            <span className="text-white/30 text-[10px] font-black tracking-widest uppercase">
              Step{" "}
              <span className="text-[#C5EF16]">
                {processSteps[currentStep].id}
              </span>{" "}
              of 5
            </span>
          </div>

          {/* Main Card */}
          <div className="group relative bg-[#0D0D0D] border border-white/5 rounded-4xl p-8 md:p-14 flex flex-col items-center transition-all duration-500 hover:border-[#C5EF16]/40 hover:shadow-[0_0_40px_rgba(197,239,22,0.1)]">
            
            {/* Round Number Indicator */}
            <div className="w-14 h-14 bg-[#C5EF16] rounded-full flex items-center justify-center text-black text-xl font-black mb-8 shadow-[0_0_25px_rgba(197,239,22,0.2)]">
              {processSteps[currentStep].id}
            </div>

            {/* Icon - Straight by default, rotates on hover */}
            <div className="text-[#C5EF16] mb-6 p-5 bg-white/5 rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:bg-[#C5EF16]/10">
              {processSteps[currentStep].icon}
            </div>

            {/* Content */}
            <h3 className="text-white text-2xl md:text-3xl font-black mb-4 tracking-tight">
              {processSteps[currentStep].title}
            </h3>
            <p className="text-white/40 text-center text-sm md:text-base leading-relaxed max-w-lg font-medium">
              {processSteps[currentStep].description}
            </p>

            {/* Navigation Buttons */}
            <button
              onClick={prevStep}
              className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C5EF16] hover:border-[#C5EF16] transition-all bg-[#050505] z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextStep}
              className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C5EF16] hover:border-[#C5EF16] transition-all bg-[#050505] z-10"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {processSteps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentStep ? "w-6 bg-[#C5EF16]" : "w-1.5 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceProcess;