import ValueSection from "@/components/AboutSection";
import ClientFeedback from "@/components/ClientFeedback";
import Navbar from "@/components/HeaderSection";
import Hero from "@/components/Hero";
import LaunchProcessAndMarquee from "@/components/LaunchProcess";
import PortfolioGrid from "@/components/PortfolioShowcaseSection";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import TestimonialsSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ValueSection />
      <PortfolioGrid />
      <ScrollRevealSection />
      <LaunchProcessAndMarquee />
      <ClientFeedback />
      <TestimonialsSection/>
    </>
  );
}
