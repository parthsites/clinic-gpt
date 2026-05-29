import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { StatsSection } from '@/components/landing/stats-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { DoctorsSection } from '@/components/landing/doctors-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <main className="bg-[#020617]">
      <Navbar />

      <HeroSection />

      <StatsSection />

      <ServicesSection />

      <WhyUsSection />

      <DoctorsSection />

      <TestimonialsSection />

      <CtaSection />

      <Footer />
    </main>
  );
}