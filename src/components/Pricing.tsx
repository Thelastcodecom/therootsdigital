"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

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

/* ---------- DATA (UNCHANGED) ---------- */

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
    monthly: { price: "Custom", buttonText: "Launch My Website" },
    early: { price: "Custom", buttonText: "Launch Early" },
  },
};

/* ---------- BACKGROUND ---------- */

const BackgroundAnimation = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        top: `${(i * 7) % 100}%`,
        left: `${(i * 11) % 100}%`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[#020203]" />
      <div className="absolute inset-0">
        {stars.map((s) => (
          <span
            key={s.id}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full animate-pulse"
            style={{ top: s.top, left: s.left }}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------- MAIN SECTION ---------- */

const PricingSection = () => {
  const [tab, setTab] = useState<"monthly" | "early">("monthly");

  const loopedPlans = useMemo(
    () => [...plans, ...plans].map((p, i) => ({ ...p, key: `${p.id}-${i}` })),
    []
  );

  return (
    <section className="relative py-24 text-white overflow-hidden">
      <BackgroundAnimation />

      <style>{`
        :root {
          --card-width: 320px;
          --card-gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          :root { --card-width: 280px; }
        }

        @media (max-width: 640px) {
          :root { --card-width: 260px; }
        }

        .marquee {
          display: flex;
          gap: var(--card-gap);
          width: max-content;
          animation: scroll 55s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* ---------- HEADER ---------- */}
      <div className="relative z-10 text-center mb-16 px-6">
        <div className="inline-flex bg-black/40 border border-white/10 rounded-full p-1">
          {(["monthly", "early"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 text-xs font-black uppercase rounded-full transition ${
                tab === t
                  ? "bg-lime-400 text-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {t === "monthly" ? "Standard" : "Early"}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- MARQUEE ---------- */}
      <div className="relative z-10 overflow-hidden">
        <div className="marquee px-6">
          {loopedPlans.map((plan) => {
            const active = pricing[plan.id][tab];

            return (
              <motion.div
                key={plan.key}
                whileHover={{ y: -6 }}
                className="w-[var(--card-width)] flex-shrink-0"
              >
                <div className="h-full rounded-2xl bg-zinc-900/70 border border-white/10 p-6 flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                    <p className="text-sm text-white/40 leading-snug">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-black text-lime-400">
                      {active.price}
                    </span>
                    {active.price !== "Custom" && (
                      <span className="text-xs text-white/30 ml-1">/orbit</span>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="mb-6 py-3 rounded-xl bg-lime-400 text-black text-xs font-black uppercase tracking-widest hover:bg-lime-500 transition">
                    {active.buttonText}
                  </button>

                  {/* Features */}
                  <ul className="space-y-3 text-xs text-white/50 overflow-y-auto pr-1">
                    {plan.features.slice(0, 10).map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-lime-400" />
                        <span>{f}</span>
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
