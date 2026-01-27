"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  ShoppingBag,
  Smartphone,
  Home,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";

// --- Type Definitions ---

interface Tab {
  id: string;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
}

interface CaseStudy {
  platform: string;
  tag: string;
  title: string;
  description: string;
  stats: Stat[];
  image: string;
}

interface Review {
  name: string;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const SuccessStories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Fashion Brand");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [itemsToShow, setItemsToShow] = useState<number>(5);

  const tabs: Tab[] = [
    { id: "Fashion Brand", icon: <ShoppingBag size={14} /> },
    { id: "Tech Store", icon: <Smartphone size={14} /> },
    { id: "Home Goods", icon: <Home size={14} /> },
    { id: "Beauty Products", icon: <Sparkles size={14} /> },
  ];

  const content: Record<string, CaseStudy> = {
    "Fashion Brand": {
      platform: "Amazon + Shopify Multi-Platform",
      tag: "Amazon Success",
      title: "Luxury Fashion Brand 3X Revenue Growth",
      description:
        "We helped a premium fashion brand expand from single-channel sales to a multi-platform empire. By implementing advanced SEO strategies, optimizing product listings, and launching targeted PPC campaigns, we transformed their online presence and significantly increased market share.",
      stats: [
        { label: "REVENUE INCREASE", value: "312%" },
        { label: "PROFIT MARGIN", value: "89%" },
        { label: "MONTHLY ORDERS", value: "45K" },
        { label: "AVG RATING", value: "4.8★" },
      ],
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000",
    },
    "Tech Store": {
      platform: "Amazon Brand Registry",
      tag: "Electronics Hub",
      title: "Tech Retailer Dominates Electronics Niche",
      description:
        "From a garage startup to a top-tier Amazon seller, we provided the technical infrastructure and marketing muscle to scale their electronics store globally.",
      stats: [
        { label: "ROAS", value: "6.4x" },
        { label: "GLOBAL REACH", value: "12 Countries" },
        { label: "STOCK TURNOVER", value: "14 Days" },
        { label: "REPEAT RATE", value: "22%" },
      ],
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    },
    // Adding fallbacks for other tabs to prevent undefined errors
    "Home Goods": {
      platform: "Wayfair + Shopify",
      tag: "Interior Design",
      title: "Home Decor Scaling Strategy",
      description:
        "Optimizing supply chain logic with high-converting storefront design.",
      stats: [
        { label: "CONVERSION", value: "+45%" },
        { label: "AOV", value: "$210" },
        { label: "ORDERS", value: "12K" },
        { label: "GROWTH", value: "120%" },
      ],
      image:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=1000",
    },
    "Beauty Products": {
      platform: "TikTok Shop + Instagram",
      tag: "Viral Growth",
      title: "Skincare Line Goes Viral",
      description:
        "Leveraging social commerce to drive instant checkout experiences.",
      stats: [
        { label: "TIKTOK SALES", value: "$1.2M" },
        { label: "FOLLOWERS", value: "250K" },
        { label: "UGC VIDEOS", value: "1.4K" },
        { label: "SENTIMENT", value: "Positive" },
      ],
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000",
    },
  };

  const reviews: Review[] = [
    {
      name: "Robert Watson",
      text: "The Roots Digital built my Shopify store flawlessly. Everything from design to back-end execution was perfect.",
    },
    {
      name: "Edward",
      text: "I was impressed with how smooth the whole process was. They managed our Amazon account with extreme care.",
    },
    {
      name: "Grant Davidson",
      text: "The Roots Digital created a stunning and professional website that actually converts visitors into buyers.",
    },
    {
      name: "Derek",
      text: "I had a great experience with my logo creation. Mike Marshall was helpful and very professional throughout.",
    },
    {
      name: "Spirit Tails",
      text: "We had a great experience working with the team on our multi-channel marketing strategy. Highly professional.",
    },
    {
      name: "Sarah J.",
      text: "Managed to scale our Amazon store from $5k to $50k monthly revenue in less than 4 months. Incredible!",
    },
    {
      name: "Michael T.",
      text: "Expertise in TikTok shop integration was the game changer for our Q4 sales. We hit record numbers.",
    },
    {
      name: "Linda Chen",
      text: "Professional, communicative, and results-driven. They treated my brand as if it were their own.",
    },
    {
      name: "James Wilson",
      text: "The PPC management alone paid for their monthly fee within the first two weeks of our partnership.",
    },
    {
      name: "Elena R.",
      text: "Beautiful UI/UX work on our new storefront. Customers love the simplicity and speed of the mobile app.",
    },
    {
      name: "Easton Hammond",
      text: "Working with The Roots Digital was a fantastic experience. They paid attention to every detail.",
    },
    {
      name: "Sophia K.",
      text: "Their SEO strategy pushed us to the front page for all our major keywords within 60 days.",
    },
  ];

  const faqs: FAQ[] = [
    {
      question:
        "What e-commerce platforms does The Roots Digital specialize in?",
      answer:
        "The Roots Digital specializes in Amazon, Shopify, Etsy, eBay, Walmart, TikTok Shop, and Instagram Shop. Our team ensures maximum visibility and sales on each platform.",
    },
    {
      question: "How long does it take to see results with The Roots Digital?",
      answer:
        "Initial optimizations show results within 30 days, with scaling typically occurring in 3-6 months.",
    },
    {
      question: "Does The Roots Digital provide ongoing support?",
      answer:
        "Yes, we provide 24/7 account monitoring and proactive management.",
    },
    {
      question: "Can The Roots Digital help improve an existing store?",
      answer:
        "Absolutely. We specialize in both new launches and existing store turnarounds.",
    },
    {
      question: "How can I get started with The Roots Digital?",
      answer:
        "Contact us via our website form to schedule a free strategy audit.",
    },
  ];

  const maxIndex = Math.max(0, reviews.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setReviewIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Handle Resize
  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      if (width >= 1536) setItemsToShow(6);
      else if (width >= 1024) setItemsToShow(5);
      else if (width >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 20 Second Interval
  useEffect(() => {
    const interval = setInterval(nextSlide, 20000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const StarIcon = () => (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="#EAB308"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const current: CaseStudy = content[activeTab] || content["Fashion Brand"];

  return (
    <section className="bg-black py-24 px-6 md:px-12 font-sans selection:bg-[#C5EF16] selection:text-black antialiased overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-[#C5EF16] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
            E-Commerce Success Stories
          </h2>
          <h3 className="text-white text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Featuring Our Proud Client Achievements
          </h3>
          <p className="text-white/40 text-[11px] max-w-3xl mx-auto leading-relaxed uppercase tracking-wider">
            We build e-commerce brands that do&apos;’t just launch they scale.
            From multi-platform store setups to marketplace growth and
            automation, our proven strategies drive revenue, increase
            visibility, and deliver measurable business impact.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${activeTab === tab.id ? "bg-[#C5EF16] text-black border-[#C5EF16]  transform transition duration-300 hover:-translate-y-1" : "bg-transparent text-white/40 border-white/20 hover:text-[#C5EF16] hover:border-[#C5EF16]"}`}
            >
              {tab.icon}
              {tab.id}
            </button>
          ))}
        </div>

        {/* CASE STUDY BOX */}
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="bg-[#050505] border border-white/10 rounded-[20px] overflow-hidden p-8 mb-32">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 relative rounded-lg overflow-hidden w-full h-[400px]">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover grayscale-[0.2]"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-[#C5EF16] text-black px-4 py-1.5 rounded-full font-bold text-[9px] uppercase">
                    {current.tag}
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#C5EF16] text-[10px] font-bold tracking-widest uppercase mb-4">
                  <span className="text-[#C5EF16] text-[14px]">★</span>{" "}
                  {current.platform}
                </div>
                <h4 className="text-white text-4xl font-bold mb-6 tracking-tight leading-none">
                  {current.title}
                </h4>
                <p className="text-white/40 text-[13px] leading-relaxed mb-10 max-w-xl">
                  {current.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {current.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="bg-[#C5EF16]/10 border border-[#C5EF16]/20 p-6 rounded-xl text-center hover: transition-all
                  duration-300
                  hover:bg-[#C5EF16]/20
                  hover:-translate-y-1"
                    >
                      <div className="text-[#C5EF16] text-3xl font-bold mb-1">
                        {stat.value}
                      </div>
                      <div className="text-white/30 text-[9px] font-bold tracking-widest uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center gap-3 bg-[#C5EF16] text-black px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest w-fit hover:scale-105 transition-transform">
                  View Full Case Study <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="max-w-7xl 2xl:max-w-[1920px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-20 mb-40 items-start lg:items-center">
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-white text-4xl font-bold leading-tight mb-8 max-w-md">
                Why Your Business Needs Professional E-Commerce Support
              </h3>
              <p className="text-white/60 text-[13px] leading-relaxed max-w-lg mb-8">
                A professional e-commerce setup gives your business the power to
                launch and scale across multiple platforms including Shopify,
                Amazon, and more.
              </p>
            </div>
            <div className="lg:w-1/2 w-full space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 ${openFaq === i ? "bg-[#050505] border-[#C5EF16] shadow-[0_0_15px_rgba(197,239,22,0.1)]" : "bg-[#050505] border-white/10"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-5 flex items-center justify-between text-left"
                  >
                    <span
                      className={`text-[13px] font-bold leading-snug pr-4 ${openFaq === i ? "text-[#C5EF16]" : "text-white"}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${openFaq === i ? "bg-[#C5EF16] text-black" : "bg-white/5 text-[#C5EF16]"}`}
                    >
                      {openFaq === i ? (
                        <Minus size={12} strokeWidth={4} />
                      ) : (
                        <Plus size={12} strokeWidth={4} />
                      )}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-8 text-white/40 text-[11px] leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mb-10 overflow-hidden shadow-[#C5EF16]">
              {reviews
                .slice(reviewIndex, reviewIndex + itemsToShow)
                .map((rev, i) => (
                  <div
                    key={`${rev.name}-${i}`}
                    className="relative h-55 rounded-[18px] border border-[#C5EF16] overflow-hidden bg-black group transition-all duration-1000 ease-in-out hover:border-[#C5EF16]/50"
                  >
                    {/* Forest Dark Gradient */}
                    <div
                      className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        backgroundImage: `
                      radial-gradient(
                        110% 110% at 0% 100%,
                        rgba(190,255,0,0.35) 25%,
                        rgba(190,255,0,0.18) 50%,
                        rgba(0,0,0,0.9) 75%
                      ),
                      radial-gradient(
                        85% 85% at 100% 0%,
                        rgba(0,0,0,0.92) 0%,
                        rgba(0,0,0,1) 70%
                      )
                    `,
                      }}
                    />

                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div className="flex gap-0.5 mb-5 opacity-60">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon key={s} />
                        ))}
                      </div>

                      <p className="text-white text-[12px] font-medium leading-normal mb-auto">
                        {rev.text.slice(0, 100)}
                      </p>

                      <div className="mt-6 border-t border-white/5 pt-4">
                        <p className="text-white font-bold text-[11px] tracking-tight uppercase opacity-80">
                          {rev.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* DOT INDICATORS */}
            <div className="flex justify-center items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
                  className={`transition-all duration-500 rounded-full ${
                    reviewIndex === i
                      ? "w-6 h-1 bg-[#C5EF16]"
                      : "w-1.5 h-1.5 bg-white/10 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
