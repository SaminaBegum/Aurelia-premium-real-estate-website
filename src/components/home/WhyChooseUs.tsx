import React from 'react';
import { Gem, Handshake, TrendingUp, Headset } from 'lucide-react';
import { getWhyUs } from '@/data/journey';
import { A } from '@/lib/assets';
import { Reveal } from '@/components/ui/Reveal';
import { useLocationContext } from '@/contexts/LocationContext';

const ICONS = { Gem, Handshake, TrendingUp, Headset };

export default function WhyChooseUs() {
  const { market, isPune } = useLocationContext();
  const items = getWhyUs(market);

  return (
    <Reveal className="w">
      <section className="why">
        <img src={A(isPune ? 'interior.jpg' : 'dubai2.jpg')} alt="" />
        <div className="why-c">
          <small>Why choose Aurelia</small>
          <h2>{isPune ? 'Your trusted property partner in Pune, India' : 'Your trusted property partner in Dubai, UAE'}</h2>
          <div className="why-g">
            {items.map(([ic, t]) => {
              const C = ICONS[ic];
              return (
                <div key={t}>
                  <C size={28} />
                  {t}
                </div>
              );
            })}
          </div>
        </div>
        <img src={A(isPune ? '24k-manor-1.jpg' : 'dubai1.jpg')} alt="" />
      </section>
    </Reveal>
  );
}
