import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { A } from '@/lib/assets';

export default function ParallaxBand() {
  return (
    <section
      className="band"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(12,12,13,.9),rgba(12,12,13,.45)),url(${A('hero.jpg')})`,
      }}
    >
      <div className="w">
        <small>Every address that matters</small>
        <h2>From India to Downtown Dubai, we know both markets inside out</h2>
        <p>
          Years of combined market experience across off-plan and prime developments, so
          every recommendation is grounded in real value and high returns.
        </p>
        <Link className="btn gold" to="/properties">
          Explore all properties <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}