'use client';
import React, { useState } from 'react';
import { ShoppingCart,  ChevronDown, ChevronUp, Globe, Instagram } from 'lucide-react';

/**
 * Interface for Service features and card properties
 */
interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  features: string[];
  defaultVisibleCount?: number;
}

/**
 * Custom LayoutGrid Icon 
 */
const LayoutGrid = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

/**
 * Custom TikTok Icon
 */
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

/**
 * Individual Service Card Component with Hover Animations and Expandable Content
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, features, defaultVisibleCount = 4 }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="group relative bg-[#111111] border border-white/5 p-7 rounded-2xl flex flex-col h-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,239,22,0.15)] overflow-hidden">
      
      {/* Top Border Animation (Left to Right) */}
      <div className="absolute top-0 left-0 h-0.5 w-0 bg-[#C5EF16] transition-all duration-500 group-hover:w-full" />

      {/* Icon Container with Rotation and Color Swap */}
      <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-[#C5EF16] transition-all duration-500 group-hover:bg-[#C5EF16] group-hover:text-black group-hover:rotate-12 group-hover:shadow-[0_0_20px_rgba(197,239,22,0.4)] group-hover:-translate-y-1">
        {icon}
      </div>

      {/* Increased Heading Font Size (text-xl) */}
      <h4 className="text-xl font-bold text-white mb-6 pr-4 group-hover:text-[#C5EF16] transition-colors duration-300 leading-tight">
        {title}
      </h4>

      {/* Increased Feature List Font Size (text-sm) */}
      <ul className="space-y-4 mb-8 grow">
        {(isExpanded ? features : features.slice(0, defaultVisibleCount)).map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 animate-fadeIn">
            <svg className="w-4 h-4 mt-1 text-[#C5EF16] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-white/70 leading-relaxed font-medium">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Read More / Read Less Button */}
      {features.length > defaultVisibleCount && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 w-fit border border-[#C5EF16] ${
            isExpanded ? 'bg-[#C5EF16] text-black' : 'bg-transparent text-[#C5EF16] hover:bg-[#C5EF16] hover:text-black'
          }`}
        >
          {isExpanded ? 'Read Less' : 'Read More'} 
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}
    </div>
  );
};

/**
 * Main Services Section Component
 */
const ServicesWeOfferSection: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      title: "Amazon Store Setup & Management",
      icon: <ShoppingCart size={24} />,
      features: [
        "Complete Amazon Seller Central account setup & configuration",
        "In-depth product listing creation optimized for conversions",
        "Advanced keyword research & Amazon SEO optimization",
        "A+ Content & Enhanced Brand Storefront development",
        "Strategic Amazon PPC campaign setup, scaling & monitoring",
        "Product ranking improvement through data-driven tactics",
        "Competitor analysis & market positioning strategy",
        "Inventory, order management & account health monitoring"
      ]
    },
    {
      title: "Shopify Store Development & Growth",
      icon: <LayoutGrid size={24} />,
      features: [
        "Full Shopify store setup from scratch or redesign",
        "Custom theme development aligned with brand identity",
        "Conversion-focused UI/UX layout optimization",
        "Mobile responsiveness & page speed enhancement",
        "Secure payment gateway & checkout configuration",
        "App integrations for automation & scalability",
        "Ongoing maintenance, updates & technical support",
        "Growth-focused optimization & performance tracking"
      ]
    },
    {
      title: "Etsy Store Setup & Optimization",
      icon: <span className="text-2xl font-black italic">E</span>,
      features: [
        "Etsy shop setup tailored for handmade & custom products",
        "High-converting product listing creation",
        "Etsy SEO keyword research & tag optimization",
        "Branding, banners & storefront customization",
        "Competitive pricing & trend research analysis",
        "Sales growth strategy for organic visibility",
        "Product photography enhancement & listing improvements",
        "Shop performance optimization & best-practice compliance"
      ]
    },
    {
      title: "TikTok Shop Setup & Automation",
      icon: <TikTokIcon size={24} />,
      features: [
        "TikTok Shop account & product catalog setup",
        "Seamless checkout & order fulfillment configuration",
        "Viral content strategy for organic reach",
        "High-performing product launch frameworks",
        "Influencer & affiliate integration strategy",
        "Automation tools for order & message handling",
        "Engagement optimization & conversion tracking",
        "Scalable growth strategy aligned with TikTok trends"
      ]
    },
    {
      title: "eBay Store Management",
      icon: <span className="text-xl font-black">ebay</span>,
      features: [
        "Professional eBay store setup & branding",
        "SEO-optimized titles, images & descriptions",
        "Smart pricing strategy based on market analysis",
        "Competitor research & performance benchmarking",
        "Category setup for maximum visibility",
        "Order processing & customer communication management",
        "Review management & seller reputation growth",
        "Inventory tracking & long-term scaling strategy"
      ]
    },
    {
      title: "Walmart Marketplace Growth",
      icon: <ShoppingCart size={24} />,
      features: [
        "Walmart Seller account setup & approval assistance",
        "Optimized product listing creation & categorization",
        "Inventory, order & shipping management",
        "Ranking improvement through Walmart SEO strategies",
        "Competitive pricing & buy-box optimization",
        "Sponsored Ads setup & campaign management",
        "Sales performance tracking & optimization",
        "Marketplace compliance & account health management"
      ]
    },
    {
      title: "Instagram Shop & Social Commerce",
      icon: <Instagram size={24} />,
      features: [
        "Instagram & Facebook Shop setup & integration",
        "Product catalog upload & product tagging",
        "Branded storefront UI customization",
        "Social commerce conversion optimization",
        "Engagement strategy for organic sales growth",
        "Facebook Pixel & conversion tracking setup",
        "Ad campaign strategy for product sales",
        "Performance monitoring & scaling optimization"
      ]
    },
    {
      title: "Multi-Platform Scaling & Automation",
      icon: <Globe size={24} />,
      features: [
        "Cross-marketplace growth strategy & audits",
        "SEO, listings & ads optimization across platforms",
        "Automation tools for orders & fulfillment",
        "Centralized inventory & store management",
        "Monthly reporting & performance analytics",
        "Cost optimization & operational efficiency improvement",
        "Long-term brand & marketplace scaling",
        "Dedicated account management & growth support"
      ]
    }
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24 px-6 flex justify-center">
      <section className="max-w-[1200px] w-full mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C5EF16] text-[10px] uppercase font-black tracking-[0.4em] mb-4">Services We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight mb-6">
            The Roots Digital ROI-Driven E-Commerce Development Services
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto leading-relaxed font-medium">
            The Roots Digital delivers ROI-focused e-commerce development and growth solutions built for real results. We design high-converting stores and marketplace setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title} 
              icon={service.icon}
              features={service.features} 
            />
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}} />
    </div>
  );
};

export default ServicesWeOfferSection;