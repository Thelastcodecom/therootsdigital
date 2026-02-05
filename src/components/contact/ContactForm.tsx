"use client";
import React, { useEffect, useState, useRef } from "react";


const ContactPage: React.FC = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");


  const text1 = "WE CREATE DIGITAL";
  const text2 = "SOLUTIONS";

  // Form validation states
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    skype: false,
    company: false,
    message: false,
  });

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





  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const skypeRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !nameRef.current?.value.trim(),
      email: !emailRef.current?.value.trim(),
      skype: !skypeRef.current?.value.trim(),
      company: !companyRef.current?.value.trim(),
      message: !messageRef.current?.value.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (!hasErrors) {
      // Split full name into firstName + lastName
      const fullName = nameRef.current?.value.trim() || "";
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ") || "-";

      const payload = {
        firstName,
        lastName,
        email: emailRef.current?.value.trim(),
        phone: skypeRef.current?.value.trim(),
        message: messageRef.current?.value.replace(/\s+/g, " "),
        planId: null, // Contact form has no plan
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok && result.success) {
          alert("Message sent successfully!");
          // Clear form
          nameRef.current!.value = "";
          emailRef.current!.value = "";
          skypeRef.current!.value = "";
          companyRef.current!.value = "";
          messageRef.current!.value = "";
          setErrors({
            name: false,
            email: false,
            skype: false,
            company: false,
            message: false,
          });
        } else {
          console.error(result.error);
          alert("Failed to send message. Try again later.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Try again later.");
      }
    }
  };

  const handleInputChange = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

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
        <h1 className="text-xl md:text-2xl lg:text-3xl tracking-[0.2rem] font-marcellus">
          CONTACT
        </h1>
        <p className="text-xs md:text-sm lg:text-base mt-2 opacity-60 tracking-widest font-outfit">
          THE ROOTS DIGITAL &gt; CONTACT
        </p>
      </div>
      <hr className="border-[#242424]" />

      <div className="mx-auto px-6 mt-16 md:max-w-none 2xl:max-w-7xl">
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide font-marcellus">
            {line1}
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-400 tracking-wide mt-1 font-marcellus">
            {line2}
          </h3>
        </div>

        {/* Info Box Section */}
        <div className="space-y-6 border-t border-gray-700 pt-6 font-outfit">
          <div className="flex justify-between border-b border-gray-700 pb-3">
            <span className="uppercase text-sm md:text-base lg:text-lg">
              OUR OFFICE
            </span>
            <span className="text-xs md:text-sm lg:text-base opacity-70 text-right">
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
          <ul className="uppercase text-[0.65rem] md:text-xs lg:text-sm text-white mb-2">
            <li>
              At The Root Digital, We Value <br /> Communication And
              Transparency. By <br /> Reaching Out, You Can:
            </li>
          </ul>
          <input
            placeholder="info@therootsdigital.com"
            className="w-full bg-[#1a1a1a] px-4 py-2 text-sm md:text-base lg:text-lg"
            readOnly
          />
        </div>

        {/* FORM */}
        <form
  onSubmit={handleSubmit}
  className="
  mt-20 mb-20
  w-full
  max-w-5xl    /* increase max width */
  mx-auto
  bg-[#0f0f0f]
  border border-white/10
  rounded-2xl
  p-8 md:p-12
  shadow-2xl
  "
>
  {/* Form Header */}
  <div className="mb-10 text-center">
    <h3 className="text-2xl md:text-3xl font-marcellus">
      Start a Conversation
    </h3>
    <p className="text-sm md:text-base text-gray-400 mt-2 font-outfit">
      Tell us about your project and we’ll get back to you within 24 hours.
    </p>
  </div>

  {/* Inputs Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name */}
    <div>
      <label className="block text-sm font-outfit mb-2">
        Full Name
      </label>
      <input
        ref={nameRef}
        onChange={() => handleInputChange("name")}
        className={`w-full rounded-lg bg-black border px-4 py-3 text-base
          ${errors.name ? "border-red-500" : "border-white/10"}
          focus:outline-none focus:border-lime-400`}
        placeholder="John Doe"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-outfit mb-2">
        Email Address
      </label>
      <input
        ref={emailRef}
        type="email"
        onChange={() => handleInputChange("email")}
        className={`w-full rounded-lg bg-black border px-4 py-3 text-base
          ${errors.email ? "border-red-500" : "border-white/10"}
          focus:outline-none focus:border-lime-400`}
        placeholder="john@example.com"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-outfit mb-2">
        Phone / Skype
      </label>
      <input
        ref={skypeRef}
        onChange={() => handleInputChange("skype")}
        className={`w-full rounded-lg bg-black border px-4 py-3 text-base
          ${errors.skype ? "border-red-500" : "border-white/10"}
          focus:outline-none focus:border-lime-400`}
        placeholder="+1 800 123 456"
      />
    </div>

    {/* Company */}
    <div>
      <label className="block text-sm font-outfit mb-2">
        Company
      </label>
      <input
        ref={companyRef}
        onChange={() => handleInputChange("company")}
        className={`w-full rounded-lg bg-black border px-4 py-3 text-base
          ${errors.company ? "border-red-500" : "border-white/10"}
          focus:outline-none focus:border-lime-400`}
        placeholder="Acme Inc."
      />
    </div>
  </div>

  {/* Message */}
  <div className="mt-8">
    <label className="block text-sm font-outfit mb-2">
      Message
    </label>
    <textarea
      ref={messageRef}
      onChange={() => handleInputChange("message")}
      rows={5}
      className={`w-full rounded-lg bg-black border px-4 py-3 text-base resize-none
        ${errors.message ? "border-red-500" : "border-white/10"}
        focus:outline-none focus:border-lime-400`}
      placeholder="Tell us about your project, goals, and timeline..."
    />
  </div>

  {/* CTA */}
  <div className="mt-12 flex justify-center">
    <button
      type="submit"
      className="
        relative
        rounded-full
        px-12 py-5
        bg-lime-400
        text-black
        font-bold
        tracking-wide
        hover:scale-105
        transition-transform
      "
    >
      Send Message
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default ContactPage;
