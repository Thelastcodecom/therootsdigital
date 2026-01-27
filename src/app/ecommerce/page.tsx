import React from 'react'
import AnalyticsSection from '@/components/Ecommerce/AnalyticsSection'
import ServicesWeOfferSection from '@/components/Ecommerce/ServicesWeOffer'
import RealBrandsSection from '@/components/Ecommerce/RealBrandsSection'
import DevelopmentProcess from '@/components/Ecommerce/DevelopmentProcess'
import EcommerceProcess from '@/components/Ecommerce/EcommerceProcess'

export default function page() {
  return (
    <>
    <AnalyticsSection />
    <ServicesWeOfferSection />
    <RealBrandsSection />
    <DevelopmentProcess />
    <EcommerceProcess />
    </>
  )
}
