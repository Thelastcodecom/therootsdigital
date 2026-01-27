'use client';
import React from 'react';

/**
 * Interface for individual process steps
 */
interface ProcessStep {
  title: string;
  icon: React.ReactNode;
  description: string;
}

/**
 * Custom SVG Icons based on the image provided
 */
const AmazonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
    <circle cx="12" cy="13" r="4" />
    <path d="M9 13h6" />
  </svg>
);

const ShopifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18M3 12h18M3 18h18" />
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EtsyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const EBayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const WalmartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ScalingIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-[#C5EF16]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21h18M3 10l6-6 6 6 6-6M9 4v17M15 10v11" />
  </svg>
);

const ProcessCard: React.FC<ProcessStep> = ({ title, icon, description }) => (
  <div className="group relative bg-[#111111] border border-white/5 rounded-xl p-8 flex flex-col items-start transition-all duration-300 hover:bg-[#151515] hover:border-[#C5EF16]/30">
    {/* Accent line at the top of the card */}
    <div className="absolute top-0 left-4 right-4 h-0.5 bg-[#C5EF16] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    
    <div className="mb-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
      {icon}
    </div>

    <h3 className="text-xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
      {title}
    </h3>

    <p className="text-white/40 text-[13px] leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const DevelopmentProcess: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      title: "Amazon Store Setup & Management",
      icon: <AmazonIcon />,
      description: "Our Amazon experts begin by understanding your business goals, product type, and target audience. We setup your account, optimize categories, prepare product listings, and configure fulfillment settings. From branding to PPC and compliance, we ensure your Amazon store is fully built for visibility, conversions, and long-term growth."
    },
    {
      title: "Shopify Store Design & Development",
      icon: <ShopifyIcon />,
      description: "We build and customize Shopify stores that are visually appealing and conversion-focused. Our process includes UI/UX design, theme customization, payment setup, and performance optimization. From branding to checkout, we create seamless customer experiences that boost sales and strengthen your business identity."
    },
    {
      title: "Etsy Store Setup & Optimization",
      icon: <EtsyIcon />,
      description: "We analyze your niche, design store layouts, and build product listings tailored for handmade and creative-focused buyers. Our team optimizes descriptions, tags, titles, and imagery to improve discoverability and ranking. The result is fully launched Etsy shop that attracts the right customers and generates consistent orders."
    },
    {
      title: "TikTok Shop Setup & Automation",
      icon: <TikTokIcon />,
      description: "We configure your TikTok Shop with product catalog, branding elements, and checkout settings. Our experts integrate influencer marketing and social commerce features to help you convert viewers into buyers. The process ensures your store is ready to go viral, drive revenue, and scale with TikTok stream automation."
    },
    {
      title: "eBay Store Configuration & Management",
      icon: <EBayIcon />,
      description: "Our eBay setup begins with marketplace research, category analysis, and listing optimization. We customize store layouts, pricing strategies, and product pages while integrating shipping and policies. Every step is designed to maximize visibility, enhance buyer experience, and build steady sales performance."
    },
    {
      title: "Walmart Marketplace Setup & Growth",
      icon: <WalmartIcon />,
      description: "We set up your seller account, organize product categories, and optimize listings for ranking and marketplace rules. Our approach ensures seamless inventory, fulfillment, and performance settings. From branding to growth planning, we create a store built for high visibility and marketplace trust."
    },
    {
      title: "Instagram Shop & Social Commerce Integration",
      icon: <InstagramIcon />,
      description: "We connect your brand with Instagram and Facebook Commerce, upload your product catalog, and enable shop tagging for direct purchases. Our team focuses on branding, visual consistency, and automation setup to drive maximum conversions. The result is a fully interactive storefront that turns social followers into paying customers."
    },
    {
      title: "Multi-Platform Growth & Scaling",
      icon: <ScalingIcon />,
      description: "Our final step focuses on ongoing growth across all platforms. We implement optimization, analytics, SEO, ads, and sales automation to scale your store. From performance tracking to long-term management, we make sure your business keeps expanding and generating predictable results."
    }
  ];

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <p className="text-[#C5EF16] text-[10px] uppercase font-black tracking-[0.4em] mb-4">
            E-Commerce Development Process
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight mb-8">
            For High-Performing Stores and Scalable Growth
          </h2>
          <p className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
            We follow a proven and structured launch process to build, optimize and scale your online store across top marketplaces. From setup and design to product listings, optimization and growth strategies we ensure every platform delivers better conversions, visibility and long-term business success.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ProcessCard 
              key={index}
              title={step.title}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevelopmentProcess;