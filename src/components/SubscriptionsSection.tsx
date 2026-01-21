"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SubscriptionPopup from "./SubscriptionForm";

interface Plan {
  id: number;
  title: string;
  description: string;
  features: string[];
}

interface Pricing {
  monthly: { price: string; buttonText: string };
  early: { price: string; buttonText: string };
}

interface PopupPlan extends Plan {
  price: string;
  billingType: "monthly" | "early";
}

const plans: Plan[] = [
  {
    id: 1,
    title: "Starter Launchpad",
    description:
      "Get your business online quickly with all the essentials to take off Successfully Today.",
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
    monthly: { price: "Custom", buttonText: "Let's talk" },
    early: { price: "Custom", buttonText: "Let's discuss" },
  },
};

const PricingSection = () => {
  const [tab, setTab] = useState<"monthly" | "early">("monthly");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PopupPlan | null>(null);

  return (
    <section className="w-full bg-black py-20 text-white overflow-hidden mt-15 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163, 230, 53, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163, 230, 53, 0.6);
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(163, 230, 53, 0.1) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="w-full px-4 xl:px-16 2xl:px-24 relative z-10">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-center mb-16"
        >
          <div className="bg-zinc-900/50 p-1.5 rounded-full flex gap-1 border border-white/5 backdrop-blur-xl">
            {(["monthly", "early"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-150 ease-out md:whitespace-nowrap relative overflow-hidden
                  ${
                    tab === t
                      ? "bg-lime-500 text-black shadow-lg scale-105"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab === t && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-lime-500 -z-10"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                {t === "monthly" ? "Monthly Billing" : "Early Bird Access"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 lg:gap-4 xl:gap-6 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-stretch">
          {plans.map((plan, index) => {
            const activePricing = pricing[plan.id][tab];

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.015, y: -4 }}
                className="group flex flex-col h-full rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/50 to-zinc-900/30 backdrop-blur-sm transition-all duration-100 ease-out hover:border-lime-500/50 hover:shadow-[0_20px_80px_-15px_rgba(163,230,53,0.4)] relative will-change-transform"
              >
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-lime-500/20 via-lime-400/20 to-lime-500/20 shimmer" />
                </div>

                {/* Floating particles effect on hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-lime-400 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: "100%",
                      }}
                      animate={{
                        y: [0, -300],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                {/* Header Section */}
                <div className="relative p-8 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 group-hover:from-zinc-800/70 group-hover:to-zinc-900/70 transition-all duration-150 ease-out">
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/5 rounded-bl-full transition-all duration-150 ease-out" />

                  {/* Glowing orb */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-lime-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.15 + index * 0.05, duration: 0.3, ease: "easeOut" }}
                      className="inline-block px-4 py-1.5 bg-black/40 backdrop-blur-sm rounded-full border border-lime-500/30 mb-4"
                    >
                      <span className="text-[10px] uppercase tracking-widest font-bold text-lime-400">
                        Plan {plan.id}
                      </span>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.3, ease: "easeOut" }}
                      className="text-2xl font-black mb-3 leading-tight group-hover:text-lime-400 transition-colors duration-150 ease-out"
                    >
                      {plan.title}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.25 + index * 0.05, duration: 0.3, ease: "easeOut" }}
                      className="text-sm text-white/80 leading-relaxed"
                    >
                      {plan.description}
                    </motion.p>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="px-8 py-6 bg-zinc-900/70 border-y border-white/5 relative overflow-hidden">
                  {/* Animated background line */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-500/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10 flex items-end justify-center gap-2">
                    <motion.span
                      key={`${plan.id}-${tab}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-5xl font-black bg-gradient-to-r from-lime-400 to-lime-500 bg-clip-text text-transparent"
                    >
                      {activePricing.price}
                    </motion.span>
                    {activePricing.price !== "Custom" && (
                      <span className="text-white/40 text-sm font-bold mb-2">
                        /{tab === "monthly" ? "mo" : "once"}
                      </span>
                    )}
                  </div>
                  <p className="text-center text-[11px] uppercase tracking-wider font-bold text-white/30 mt-2">
                    {tab === "monthly" ? "Monthly Billing" : "One-Time Payment"}
                  </p>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 p-8">
                  {/* CTA Button */}
                  <motion.button
                    onClick={() => {
                      setSelectedPlan({
                        ...plan,
                        price: pricing[plan.id][tab].price,
                        billingType: tab,
                      });
                      setIsPopupOpen(true);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-black font-black py-4 rounded-xl transition-all duration-150 ease-out mb-8 shadow-lg shadow-lime-500/20 group-hover:shadow-lime-500/50 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                    <span className="relative z-10">{activePricing.buttonText}</span>
                  </motion.button>

                  {/* Feature List */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                        Features
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    <ul className="space-y-3 text-[13px] text-white/70 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.02, duration: 0.2, ease: "easeOut" }}
                          className="flex gap-3 items-start leading-snug group/item"
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-lime-500/20 to-lime-600/20 flex items-center justify-center flex-shrink-0 group-hover/item:from-lime-500/40 group-hover/item:to-lime-600/40 transition-all duration-100 ease-out border border-lime-500/20"
                          >
                            <svg
                              className="w-3 h-3 text-lime-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                          <span className="group-hover/item:text-white transition-colors duration-100 ease-out">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-lime-500/50 via-lime-400 to-lime-500/50"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Popup - Keep original logic unchanged */}
      {selectedPlan &&  (
        <SubscriptionPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          plan={selectedPlan}
        />
      )}
    </section>
  );
};

export default PricingSection;