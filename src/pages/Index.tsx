
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureCards } from "@/components/feature-cards";
import { AboutSection } from "@/components/about-section";
import { AppInfoSection } from "@/components/app-info-section";
import { RubricModelsSection } from "@/components/rubric-models-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureCards />
        <AboutSection />
        <AppInfoSection />
        <RubricModelsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
