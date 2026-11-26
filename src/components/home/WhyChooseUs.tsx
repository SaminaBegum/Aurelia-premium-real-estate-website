import React from 'react';
import { Gem, Handshake, TrendingUp, Headset } from 'lucide-react';
import { whyUs } from '@/data/journey';
import { A } from '@/lib/assets';
import { Reveal } from '@/components/ui/Reveal';

const ICONS = { Gem, Handshake, TrendingUp, Headset };

export default function WhyChooseUs() {
  return (
    <Reveal className="w">
      <section className="why">
        <img src={A('interior.jpg')} alt="" />
        <div className="why-c">
          <small>Why choose Aurelia</small>
          <h2>Your trusted property partner for Pune &amp; Dubai</h2>
          <div className="why-g">
            {whyUs.map(([ic, t]) => {
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
        <img src={A('dubai1.jpg')} alt="" />
      </section>
    </Reveal>
  );
}