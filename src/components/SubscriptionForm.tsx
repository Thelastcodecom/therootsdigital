"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import Image from "next/image";

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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const form = formRef.current;
  if (!form) return;

  const formData = new FormData(form);
  const payload = {
    firstName: formData.get("fname")?.toString().trim(),
    lastName: formData.get("lname")?.toString().trim(),
    email: formData.get("email")?.toString().trim(),
    phone: formData.get("phone")?.toString().trim(),
    message: formData.get("message")?.toString().replace(/\s+/g, " "),
    planId: plan?.id || null,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      setIsSuccess(true);
      form.reset(); // now safe
    } else {
      console.error(result.error);
      alert("Failed to send message. Try again later.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again later.");
  } finally {
    setIsSubmitting(false);
  }
};


const formRef = useRef<HTMLFormElement>(null);
  if (!plan) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
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
            className="relative w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl bg-[#0B0D0F] border-0 sm:border border-white/10 shadow-2xl sm:rounded-3xl sm:my-8 min-h-screen sm:min-h-0"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 sm:right-5 sm:top-5 md:right-6 md:top-6 z-20 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* SUCCESS */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 lg:p-20 text-center min-h-screen sm:min-h-0"
                >
                  <div className="mb-6 sm:mb-8 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-lime-400 shadow-[0_0_40px_rgba(163,230,53,0.5)]">
                    <Check
                      size={32}
                      className="sm:w-10 sm:h-10 text-black stroke-[3px]"
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-3 sm:mb-4">
                    Mission Initiated
                  </h2>

                  <p className="text-sm sm:text-base text-white/60 max-w-md mb-6 sm:mb-8 px-4">
                    The Roots Digital team will contact you shortly.
                  </p>

                  <button
                    onClick={onClose}
                    className="bg-lime-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition"
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
                  <div className="flex flex-col justify-between gap-4 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-br from-black to-zinc-900">
                    {/* LOGO */}
                    <Image
                      src="/images/logo.webp"
                      alt="The Roots Digital"
                      width={512}
                      height={256}
                      priority
                      className="h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40 w-auto object-contain"
                    />

                    {/* ASTRONAUT */}
                    <div className="flex justify-center items-center flex-1 py-4 sm:py-6 md:py-8">
                      <Image
                        src="/images/astronaut.webp"
                        alt="Astronaut"
                        width={600}
                        height={800}
                        loading="eager"
                        className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[340px] object-contain"
                      />
                    </div>

                    {/* TRUSTPILOT */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Image
                        src="/images/testimonial/trustpilot.webp"
                        alt="Trustpilot"
                        width={300}
                        height={80}
                        loading="eager"
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                      />
                      <span className="text-xs sm:text-sm md:text-base text-white/70 font-medium">
                        Rated Excellent on Trustpilot
                      </span>
                    </div>
                  </div>

                  {/* RIGHT FORM */}
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-[#101214]">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-3 sm:mb-4">
                      Get in <span className="text-lime-400">Touch</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-white/50 mb-4 sm:mb-6">
                      Selected plan:{" "}
                      <span className="text-white font-semibold">
                        {plan.title}
                      </span>
                    </p>

                    <form ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <input
                          name="fname"
                          required
                          placeholder="First Name*"
                          className="form-input"
                        />
                        <input
                          name="lname"
                          required
                          placeholder="Last Name*"
                          className="form-input"
                        />
                      </div>

                      <input
                        name="email"
                        required
                        type="email"
                        placeholder="Email*"
                        className="form-input"
                      />
                      <input
                        name="phone"
                        placeholder="Phone Number"
                        className="form-input"
                      />
                      <textarea
                        name="message"
                        placeholder="Your Feedback"
                        className="form-input min-h-[100px] sm:min-h-[120px] resize-none"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-lime-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-md font-black text-sm sm:text-base hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              padding: 12px 14px;
              background: #9a9a9a;
              border-radius: 6px;
              border: none;
              outline: none;
              font-size: 13px;
              color: #000;
              transition: all 0.2s ease;
            }

            @media (min-width: 640px) {
              .form-input {
                padding: 14px 16px;
                font-size: 14px;
              }
            }

            @media (min-width: 768px) {
              .form-input {
                padding: 15px 18px;
                font-size: 15px;
              }
            }

            .form-input::placeholder {
              color: #f0f0f0;
            }

            .form-input:focus {
              background: #a5a5a5;
              box-shadow: 0 0 0 2px rgba(163, 230, 53, 0.3);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionPopup;
