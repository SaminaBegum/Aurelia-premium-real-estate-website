import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { A } from '@/lib/assets';
import { useLocationContext } from '@/contexts/LocationContext';

export default function ParallaxBand() {
  const { market, isPune } = useLocationContext();

  return (
    <section
      className="band"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(12,12,13,.9),rgba(12,12,13,.45)),url(${A(
          isPune ? 'interior.jpg' : 'hero.jpg',
        )})`,
      }}
    >
      <div className="w">
        <small>{isPune ? 'Every premier Pune address' : 'Every prime Dubai address'}</small>
        <h2>
          {isPune
            ? 'From Balewadi to Kharadi, we know the Pune market inside out'
            : 'From Business Bay to Palm Jebel Ali, we know the Dubai market inside out'}
        </h2>
        <p>
          {isPune
            ? 'Years of dedicated experience across Pune’s luxury off-plan developments and commercial corridors, ensuring verified value and high appreciation.'
            : 'Years of combined market experience across off-plan and prime developments, so every recommendation is grounded in real value and high returns.'}
        </p>
        <Link className="btn gold" to={`/properties?market=${market}`}>
          {isPune ? 'Explore Pune properties' : 'Explore Dubai properties'} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
