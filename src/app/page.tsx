import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import ProductFeatures from "@/components/sections/ProductFeatures";
import TrustSignals from "@/components/sections/TrustSignals";
import FounderStory from "@/components/sections/FounderStory";
import FAQPreview from "@/components/sections/FAQPreview";
import CTAFooter from "@/components/sections/CTAFooter";
import CoFounderComments from "@/components/sections/CoFounderComments";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <ProductFeatures />
      <TrustSignals />
      <FounderStory />
      <FAQPreview />
      <CoFounderComments />
      <CTAFooter />
    </main>
  );
}
