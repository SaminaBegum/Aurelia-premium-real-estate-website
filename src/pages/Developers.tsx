import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { DeveloperLogo } from '@/components/DeveloperLogo';
import StatsSection from '@/components/home/StatsSection';
import { developers } from '@/data/developers';

export default function Developers() {
  return (
    <>
      <InnerPageBanner
        eyebrow="Partners"
        title="Our developer partners"
        sub="India and the UAE’s most trusted builders, all vetted by Aurelia."
        img="hero.jpg"
        crumbs={[['Home', '/'], ['Developer Partners']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {developers.map((d, k) => (
            <Reveal key={d.n} d={k * 50}>
              <div className="dev">
                <div className="dev-l">
                  <DeveloperLogo d={d} />
                </div>
                <h3>{d.n}</h3>
                <small>{d.m}</small>
                <Link to={`/properties?market=${d.m}`} className="lk">
                  View properties <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsSection />
    </>
  );
}