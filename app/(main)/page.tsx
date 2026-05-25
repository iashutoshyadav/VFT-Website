import HeroSection from "@/components/HeroSection";
import MembershipCards from "@/components/MembershipCards";
import ClassPreview from "@/components/ClassPreview";
import FacilitiesSection from "@/components/FacilitiesSection";
import InstagramSection from "@/components/InstagramSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FacilitiesSection />
      <MembershipCards />
      <ClassPreview />
      <InstagramSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
