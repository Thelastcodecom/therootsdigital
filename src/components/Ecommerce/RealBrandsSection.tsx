"use client";
import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Interface for the Case Study content
 */
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

const RealBrandsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('FEATURED');

  const tabs = ['FEATURED', 'B2B', 'B2P', 'ECOMMERCE'];

  const caseStudies: Record<string, CaseStudy> = {
    FEATURED: {
      id: 'featured',
      title: 'Shopify Plus Rebuild To Support B2B Engagement',
      description: 'We transform simple stores into profitable online businesses. From new sellers to established brands our work speaks for itself. Our case studies cover full-scale store setup, product optimization, ads, branding, automation and ongoing marketplace management.',
      imagePath: '/images/e-commerce/featured.webp',
    },
    B2B: {
      id: 'b2b',
      title: 'Food & Beverage Web Development',
      description: 'We redesigned Ventura Foods’ corporate website to create a fully optimized digital experience. Included in the user-centric design is a video in the hero section, engaging micro-animations, a custom cursor and chatbot functionality.',
      imagePath: '/images/e-commerce/b2b.webp',
    },
    B2P: {
      id: 'b2p',
      title: 'Driving Growth Through Strategic Shopify Design',
      description: 'The Roots Digital created a fully custom Shopify site for Absolute Dogs with brand-new messaging, conversion funnels and rearchitected products and collections. The new platform led to a 5.9% increase in new users, a 32.4% rise in organic search sessions and a 77.88% boost in add-to-cart actions.',
      imagePath: '/images/e-commerce/b2p.webp',
    },
    ECOMMERCE: {
      id: 'ecommerce',
      title: 'Modernizing An American Snack Favorite',
      description: 'Glenwood Snacks reimagined its online store with a custom WooCommerce build designed to replace its outdated Squarespace site. The new platform streamlines shopping for retail and wholesale buyers with organized products, automatic updates and secure checkout. A built-in subscription feature makes reordering simple, encouraging repeat purchases and brand loyalty.',
      imagePath: '/images/e-commerce/ecom.webp',
    },
  };

  // FIX: Dynamically select data based on activeTab
  const currentStudy = caseStudies[activeTab];

  return (
    <div className="bg-[#0A0A0A] min-h-screen py-24 px-6 flex flex-col items-center">
      <section className="max-w-[1200px] w-full mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-[#C5EF16] text-[12px] uppercase font-black tracking-[0.3em] mb-6">
            E-Commerce Stores We&apos;ve Launched, Managed & Scaled
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
            Real Brands. Real Growth.
          </h2>
          <p className="text-white/60 text-base max-w-3xl mx-auto leading-relaxed font-medium">
            We transform simple stores into profitable online businesses. From new sellers to established brands our work speaks for itself. Our case studies cover full-scale store setup, product optimization, ads, branding, automation and ongoing marketplace management.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-black tracking-widest px-8 py-3 rounded-lg border-2 transition-all duration-300 ${
                activeTab === tab
                  ? 'border-[#C5EF16] text-white'
                  : 'border-transparent text-white/40 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div key={activeTab} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-fadeIn">
          
          {/* Dashboard/Image Placeholder */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#C5EF16]/10 rounded-2xl blur-xl group-hover:bg-[#C5EF16]/20 transition-all duration-500"></div>
            
            {/* Container Fix: 
                - Removed internal padding (p-2) so image touches borders.
                - Added 'overflow-hidden' and 'rounded-2xl' to container.
            */}
            <div className="relative bg-[#0F0F0F] border border-white/10  overflow-hidden rounded-2xl flex items-center justify-center">
              <Image 
                src={currentStudy.imagePath} 
                alt={currentStudy.title}
                width={1280}
                height={720}
                /* Image Fix: 
                   - Added 'rounded-2xl' directly to image.
                   - Ensured it fills the space while maintaining aspect ratio via 'object-contain'.
                */
                className="w-full h-full object-contain rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex flex-col items-center text-white/20 p-8 text-center">
                        <svg class="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p class="text-sm font-bold uppercase tracking-widest">Case Study Visualization</p>
                        <p class="text-xs mt-2 italic">${currentStudy.id.toUpperCase()} Image</p>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-2xl xl:text-3xl font-medium text-white leading-tight mb-8">
              {currentStudy.title}
            </h3>
            <p className="text-white/50 text-lg leading-relaxed mb-10 ">
              {currentStudy.description}
            </p>
            
            <button className="group flex items-center justify-center gap-3 bg-[#C5EF16] text-black px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest  transition-all duration-300 w-full sm:w-fit">
            <span className="relative h-[1em] overflow-hidden leading-none">
    
    {/* Normal state text */}
    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
      Get A Quote
    </span>

    {/* Hover state text */}
    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
      Get A Quote
    </span>
    </span>
            </button>

          </div>

        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default RealBrandsSection;