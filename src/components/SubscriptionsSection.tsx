"use client";

import  { useState } from "react";
import { motion } from "framer-motion";
import SubscriptionPopup from "@/components/SubscriptionForm";

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

const plans: Plan[] = [
  {
    id: 1,
    title: "Starter Launchpad",
    description:
      "Get your business online quickly with all the essentials to take off Successfully Today.",
    color: "from-[#46911F] to-[#2A5212]",
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
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section className="w-full bg-black py-20 text-white overflow-hidden mt-15">
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
      `}</style>

      <div className="w-full px-4 xl:px-16 2xl:px-24">
        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-zinc-900/50 p-1.5 rounded-full flex gap-1 border border-white/5">
            {(["monthly", "early"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 md:whitespace-nowrap
                  ${
                    tab === t
                      ? "bg-lime-500 text-black shadow-lg scale-105"
                      : "text-gray-400 hover:text-white"
                  }`}
              >
                {t === "monthly" ? "Monthly Billing" : "Early Bird Access"}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 lg:gap-4 xl:gap-6 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-stretch">
          {plans.map((plan) => {
            const activePricing = pricing[plan.id][tab];

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: plan.id * 0.1 }}
                className="group flex flex-col h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/20 transition-all duration-500 hover:border-lime-500/40 hover:shadow-[0_20px_40px_-15px_rgba(163,230,53,0.15)]"
              >
                {/* Image Container - Adjusted aspect and object position */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className={`w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-110 `}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content Area */}
                <div
                  className={`flex flex-col flex-1 p-6 bg-gradient-to-b ${plan.color}`}
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-center mb-2 leading-tight min-h-[56px] flex items-center justify-center">
                      {plan.title}
                    </h3>
                    <p className="text-center text-sm text-white/70 mb-6 leading-relaxed min-h-[60px]">
                      {plan.description}
                    </p>

                    <div className="text-center mb-6 py-4 bg-black/20 rounded-2xl border border-white/5">
                      <p className="text-4xl font-black mb-1">
                        {activePricing.price}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                        {tab === "monthly" ? "Per Month" : "One-Time Offer"}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlan(plan);
                        setIsPopupOpen(true);
                      }}
                      className="w-full bg-white text-black hover:bg-lime-500 hover:scale-[1.02] active:scale-[0.98] font-black py-4 rounded-2xl transition-all duration-300 mb-8 shadow-xl"
                    >
                      {activePricing.buttonText}
                    </button>
                  </div>

                  {/* Feature List */}
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-4">
                      What&apos;s included:
                    </p>
                    <ul className="space-y-4 text-[13px] text-white/80 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex gap-3 items-start leading-snug group/item"
                        >
                          <div className="mt-1 w-4 h-4 rounded-full bg-lime-500/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-lime-500/40 transition-colors">
                            <svg
                              className="w-2.5 h-2.5 text-lime-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={4}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="group-hover/item:text-white transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {selectedPlan && (
        <SubscriptionPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          plan={{
            ...selectedPlan,
            price: pricing[selectedPlan.id][tab].price,
            billingType: tab,
          }}
        />
      )}
    </section>
  );
};

export default PricingSection;
