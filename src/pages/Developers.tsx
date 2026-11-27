import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { DeveloperLogo } from '@/components/DeveloperLogo';
import StatsSection from '@/components/home/StatsSection';
import { getDevelopers } from '@/data/developers';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Developers() {
  const { market, isPune } = useLocationContext();
  const devs = getDevelopers(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Partners"
        title={isPune ? 'Our Pune developer partners' : 'Our Dubai developer partners'}
        sub={
          isPune
            ? 'Pune’s most trusted builders and developers, all vetted and verified by Aurelia.'
            : 'Dubai’s most trusted master developers, all vetted and verified by Aurelia.'
        }
        img={isPune ? 'interior.jpg' : 'hero.jpg'}
        crumbs={[['Home', '/'], ['Developer Partners']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {devs.map((d, k) => (
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
