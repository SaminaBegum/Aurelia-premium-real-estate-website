import React from 'react';
import { developers } from '@/data/developers';
import { DeveloperLogo } from '@/components/DeveloperLogo';
import { Reveal } from '@/components/ui/Reveal';

/* dark border around the developer partners box */
const STYLES = `
.partners.dev-border{
  border:2px solid #1a1a1a !important;
  border-radius:16px !important;
}
`;

export default function DevelopersMarquee() {
  return (
    <>
      <style>{STYLES}</style>
      <Reveal className="w partners dev-border">
        <h3>Our developer partners</h3>
        <div className="mq">
          <div className="mq-t">
            {[...developers, ...developers].map((d, k) => (
              <DeveloperLogo key={k} d={d} />
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}