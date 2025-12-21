import ValueSection from "@/components/AboutSection";
import ClientFeedback from "@/components/ClientFeedback";
import Hero from "@/components/Hero";
import LaunchProcessAndMarquee from "@/components/LaunchProcess";
import PortfolioGrid from "@/components/PortfolioShowcaseSection";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import TestimonialsSection from "@/components/TestimonialSection";
import SubscriptionsSection from "@/components/SubscriptionsSection";


export default function Home() {
  return (
    <>
      <Hero />
      <ValueSection />
      <PortfolioGrid />
      <ScrollRevealSection />
      <LaunchProcessAndMarquee />
      <ClientFeedback />
      <TestimonialsSection />
      <SubscriptionsSection />

    </>
  );
}
