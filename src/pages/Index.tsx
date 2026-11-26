import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesSection from '@/components/home/ServicesSection';
import ParallaxBand from '@/components/home/ParallaxBand';
import ProjectsRail from '@/components/home/ProjectsRail';
import FeaturedListings from '@/components/home/FeaturedListings';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import DevelopersMarquee from '@/components/home/DevelopersMarquee';
import JourneySection from '@/components/home/JourneySection';
import ContactCTA from '@/components/home/ContactCTA';

/* gap above the stats strip (change 56px to increase / decrease) */
const GAP_CSS = `
.stats-gap{display:flow-root;padding-top:56px;margin-bottom:56px}
.stats-gap > *{margin-top:0 !important}
`;

export default function Index() {
  return (
    <>
      <style>{GAP_CSS}</style>
      <HeroSection />
      <DevelopersMarquee />
      <ServicesSection />
      <ParallaxBand />
      <ProjectsRail />
      <FeaturedListings />
      <WhyChooseUs />
      <div className="stats-gap">
        <StatsSection />
      </div>
      <JourneySection />
      <ContactCTA />
    </>
  );
}