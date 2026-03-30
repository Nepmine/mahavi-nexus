import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandStrip from "@/components/BrandStrip";
import DualExperience from "@/components/DualExperience";
import WhyChooseUs from "@/components/WhyChooseUs";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrandStrip />
      <DualExperience />
      <WhyChooseUs />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
