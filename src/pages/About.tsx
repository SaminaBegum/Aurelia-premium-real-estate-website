import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import StatsSection from '@/components/home/StatsSection';
import { differentiators, values } from '@/data/about';
import { A } from '@/lib/assets';

export default function About() {
  return (
    <>
      <InnerPageBanner
        eyebrow="Who we are"
        title="Beyond Properties. Beyond Expectations."
        sub="Aurelia is a premium real estate company serving Pune and Dubai."
        img="hero.jpg"
        crumbs={[['Home', '/'], ['Who We Are']]}
      />

      <section className="w sec about">
        <Reveal>
          <img src={A('office.jpg')} alt="Aurelia office" />
        </Reveal>

        <Reveal d={100}>
          <small className="eb">Our story</small>
          <h2>Everything, handled</h2>
          <p>
            Aurelia was founded to make property decisions across India and the UAE
            simpler, safer and more rewarding. We partner only with developers whose
            track records we trust, and we guide every client from first search to
            final handover.
          </p>
          <p>
            Whether you’re a first-time buyer, a seasoned investor or a developer
            bringing a project to market, our promise is the same: we handle the
            process so you can focus on the outcome.
          </p>
          <div className="vals">
            {values.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <div className="row">
            <Link className="btn" to="/team">
              Meet the team
            </Link>
            <Link className="btn-o" to="/contact-us">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="w sec">
        <Reveal>
          <SectionHead
            eyebrow="What sets us apart"
            title="Built to handle every stage of your journey"
          />
        </Reveal>

        <div className="sv sv4">
          {differentiators.map(([t, x], k) => (
            <Reveal key={t} d={k * 60}>
              <div className="svc">
                <Check size={26} />
                <h3>{t}</h3>
                <p>{x}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsSection />
    </>
  );
}