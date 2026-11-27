import React from 'react';
import { getDevelopers } from '@/data/developers';
import { DeveloperLogo } from '@/components/DeveloperLogo';
import { Reveal } from '@/components/ui/Reveal';
import { useLocationContext } from '@/contexts/LocationContext';

/* dark border around the developer partners box */
const STYLES = `
.partners.dev-border{
  border:2px solid #1a1a1a !important;
  border-radius:16px !important;
}
`;

export default function DevelopersMarquee() {
  const { market, isPune } = useLocationContext();
  const devs = getDevelopers(market);

  return (
    <>
      <style>{STYLES}</style>
      <Reveal className="w partners dev-border">
        <h3>{isPune ? 'Our Pune developer partners' : 'Our Dubai developer partners'}</h3>
        <div className="mq">
          <div className="mq-t">
            {[...devs, ...devs].map((d, k) => (
              <DeveloperLogo key={k} d={d} />
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
