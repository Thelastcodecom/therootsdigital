"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface SubscriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    id: number;
    title: string;
    price: string;
  } | null;
}

const SubscriptionPopup = ({
  isOpen,
  onClose,
  plan,
}: SubscriptionPopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl rounded-3xl overflow-hidden bg-[#0B0D0F] border border-white/10 shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-20 text-white/40 hover:text-white"
            >
              <X size={22} />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* SUCCESS */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-20 text-center"
                >
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-lime-400 shadow-[0_0_40px_rgba(163,230,53,0.5)]">
                    <Check size={42} className="text-black stroke-[3px]" />
                  </div>

                  <h2 className="text-3xl font-black uppercase mb-4">
                    Mission Initiated
                  </h2>

                  <p className="text-white/60 max-w-md mb-8">
                    The Roots Digital team will contact you shortly.
                  </p>

                  <button
                    onClick={onClose}
                    className="bg-lime-400 text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* FORM */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-2"
                >
                  {/* LEFT PANEL */}
                  <div className="flex flex-col justify-between gap-2 p-8 md:p-10 bg-gradient-to-br from-black to-zinc-900">
                    {/* LOGO */}
                    <img
                      src="/images/logo.webp"
                      alt="The Roots Digital"
                      className="h-20 md:h-40 w-40"
                    />

                    {/* ASTRONAUT */}
                    <div className="flex justify-center">
                      <img
                        src="/images/astronaut.webp"
                        alt="Astronaut"
                        className="w-full max-w-[280px] md:max-w-[340px] object-contain"
                      />
                    </div>

                    {/* TRUSTPILOT */}
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/testimonial/trustpilot.webp"
                        alt="Trustpilot"
                        className="h-12 md:h-14"
                      />
                      <span className="text-sm md:text-base text-white/70 font-medium">
                        Rated Excellent on Trustpilot
                      </span>
                    </div>
                  </div>

                  {/* RIGHT FORM */}
                  <div className="p-8 md:p-10 bg-[#101214]">
                    <h2 className="text-2xl md:text-3xl font-black mb-4">
                      Get in <span className="text-lime-400">Touch</span>
                    </h2>

                    <p className="text-sm text-white/50 mb-6">
                      Selected plan:{" "}
                      <span className="text-white font-semibold">
                        {plan.title}
                      </span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          required
                          placeholder="First Name*"
                          className="form-input"
                        />
                        <input
                          required
                          placeholder="Last Name*"
                          className="form-input"
                        />
                      </div>

                      <input
                        required
                        type="email"
                        placeholder="Email*"
                        className="form-input"
                      />
                      <input
                        placeholder="Phone Number"
                        className="form-input"
                      />
                      <textarea
                        placeholder="Your Feedback"
                        className="form-input min-h-[120px]"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-400 text-black px-10 py-4 rounded-md font-black hover:scale-105 transition"
                      >
                        {isSubmitting ? "Submitting..." : "🚀 Get in Touch"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* GLOBAL INPUT STYLES */}
          <style jsx global>{`
            .form-input {
              width: 100%;
              padding: 14px 16px;
              background: #9a9a9a;
              border-radius: 6px;
              border: none;
              outline: none;
              font-size: 14px;
              color: #000;
            }

            .form-input::placeholder {
              color: #f0f0f0;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionPopup;




