"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Plan {
  id: number;
  title: string;
  description: string;
  color: string;
  image: string;
  features: string[];
}

interface Pricing {
  monthly: { price: string; buttonText: string };
  early: { price: string; buttonText: string };
}

// Shared plan data
const plans: Plan[] = [
  {
    id: 1,
    title: "Starter Launchpad",
    description:
      "Get your business online quickly with all the essentials to take off Successfully Today.",
    color: "from-[#46911F] to-[#46911F]",
    image: "/images/subscription-images/1.jpg",
    features: [
      "3 page or multi-section starter website",
      "Mobile & tablet responsive design",
      "Personalized design and copy",
      "Custom domain name or connect if you have one",
      "1x professional business email",
      "Basic SEO setup (titles, meta tags)",
      "Search Engine Submission",
      "Same page URLs as product title",
      "Google Friendly Sitemap Integration",
      "Contact form integration",
      "Social links connection",
      "Basic website maintenance bug and error fixes",
      "Quick delivery to get you online fast",
      "24 to 48 hours turn around time",
    ],
  },
  {
    id: 2,
    title: "Orbit Essentials",
    description:
      "Build a strong, reliable digital presence with the features every business needs",
    color: "from-[#0D1B3A] to-[#091123]",
    image: "/images/subscription-images/2.webp",
    features: [
      "8 page or multi-section website",
      "Professional website design with modern layout",
      "Custom domain setup & SSL security",
      "2x professional business email & hosting included",
      "Profile setup across Google & directories",
      "Google Friendly Sitemap Integration",
      "On-page SEO basics for visibility",
      "Search Engine submission",
      "Same page URLs as product title",
      "Ongoing site maintenance & updates",
      "Unlimited revisions",
      "24 to 48 hours turn around time",
    ],
  },
  {
    id: 3,
    title: "Expansion Pro",
    description:
      "Go beyond the basics and establish a powerful brand presence online.",
    color: "from-[#3A003F] to-[#19001C]",
    image: "/images/subscription-images/3.webp",
    features: [
      "Custom website designed for your industry",
      "More than 10 pages or multi section website",
      "Optimized service & product pages",
      "SEO foundation to improve rankings",
      "Profile setup across Google & directories",
      "Google Friendly Sitemap Integration",
      "Google Analytics (GA4) setup",
      "Marketing plan for your business",
      "Social media integration (Facebook, Instagram, etc.)",
      "2x Blog setup to boost online authority",
      "Search Engine submission",
      "Same page URLs as product title",
      "Regular updates & technical support",
      "Unlimited revisions",
      "24 to 48 hours turn around time",
    ],
  },
  {
    id: 4,
    title: "Extreme E-Commerce",
    description: "A complete, online store designed for smooth, scalable sales",
    color: "from-[#4A0C0C] to-[#260606]",
    image: "/images/subscription-images/4.webp",
    features: [
      "Fully customized e-commerce website store",
      "10x custom designed website inner pages",
      "Upto 50 to 60 products",
      "Upto 7 product categories",
      "Content Management System",
      "Sales & Inventory Management",
      "Mini Shopping Cart Integration",
      "Payment Gateway Integration",
      "Social Media Integration (Facebook, Twitter, Linkedin)",
      "Easy Product Search",
      "5x Premium Stock Photos",
      "3x Website Promotional Banners",
      "Interactive Website Slider",
      "2x Blogs Post",
      "Cross platform optimization (Desktop, iPhone, Android, etc) responsive compatibility",
      "Cross browser (Chrome, Firefox, Safari, etc) compatibility",
      "Google Friendly Sitemap",
      "Complete Deployment",
      "Unlimited Revisions",
      "Complete Brand Kit ($299)",
      "Live Chat/Bot Chat Integration ($199)",
    ],
  },
  {
    id: 5,
    title: "Custom Website / Web App",
    description: "Custom Websites & Web Apps crafted to match your vision.",
    color: "from-[#0F2725] to-[#071312]",
    image: "/images/subscription-images/5.webp",
    features: [
      "Fully custom website design (UI/UX, no templates)",
      "Web application development (dashboards, booking systems, CRMs, etc.)",
      "Membership portals, client dashboards & user accounts",
      "E-commerce with complex product flows & custom checkout",
      "Multi-language & multi-currency support",
      "Integration with APIs, CRMs, and third-party tools",
      "Cloud-hosted, scalable architecture for performance",
      "Advanced security protocols & data protection",
      "AI-powered chatbots or automation tools (optional)",
      "Premium SEO setup & digital strategy consultation",
      "Dedicated project manager + extended post-launch support",
      "Staff training & documentation for ongoing use",
    ],
  },
];

// Pricing only changes per plan
const pricing: Record<number, Pricing> = {
  1: {
    monthly: { price: "$25", buttonText: "Launch My Website" },
    early: { price: "$20", buttonText: "Launch Early" },
  },
  2: {
    monthly: { price: "$55", buttonText: "Let's Go" },
    early: { price: "$45", buttonText: "Go Early" },
  },
  3: {
    monthly: { price: "$75", buttonText: "Go Pro!" },
    early: { price: "$65", buttonText: "Go Pro Early" },
  },
  4: {
    monthly: { price: "$150", buttonText: "Go Extreme" },
    early: { price: "$130", buttonText: "Go Extreme Early" },
  },
  5: {
    monthly: { price: "Custom", buttonText: "Launch My Website" },
    early: { price: "Custom", buttonText: "Launch Early" },
  },
};

const PricingSection = () => {
  const [tab, setTab] = useState<"monthly" | "early">("monthly");

  return (
    <section className="w-full bg-black py-20 text-white">
      <div className="w-full px-4 xl:px-16 2xl:px-24">
        {/* Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          {(["monthly", "early"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full font-semibold transition 
                ${
                  tab === t
                    ? "bg-lime-500 text-black shadow-lg"
                    : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                }`}
            >
              {t === "monthly" ? "Monthly" : "Early"}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:gap-4 xl:gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {plans.map((plan) => {
            const activePricing = pricing[plan.id][tab];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: plan.id * 0.15 }}
                className="overflow-hidden border border-white/10 shadow-xl flex flex-col md:max-h-[750px]
             transition duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-lime-500/20"
              >
                {/* Top Image */}
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Lower content */}
                <div
                  className={`flex flex-col justify-between flex-1 bg-gradient-to-b ${plan.color} p-6`}
                >
                  <h2 className="text-xl 2xl:text-2xl font-bold text-center mb-2">
                    {plan.title}
                  </h2>
                  <p className="text-center mb-2">{plan.description}</p>

                  <p className="text-4xl font-extrabold text-center mb-1">
                    {activePricing.price}
                  </p>
                  <p className="text-center text-gray-300 mb-4">
                    {tab === "monthly" ? "Billed Monthly" : "Early Pricing"}
                  </p>

                  <button className="w-full text-black bg-white hover:bg-gray-200 font-semibold py-2 rounded-lg transition mb-4">
                    {activePricing.buttonText}
                  </button>

                  <ul
                    className="mt-2 space-y-2 text-sm text-gray-200 max-h-[250px] overflow-y-auto pr-2 scrollbar-custom"
                    style={
                      {
                        "--thumb":
                          plan.color.match(/#([0-9A-Fa-f]{6})/)?.[0] ||
                          "#46911F",
                      } as React.CSSProperties
                    } // dynamic thumb color per card
                  >
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-lime-400 mt-0.5">➜</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
