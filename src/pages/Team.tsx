import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/CtaBanner';
import { getTeam } from '@/data/team';
import { initials } from '@/lib/format';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Team() {
  const { market, isPune } = useLocationContext();
  const activeTeam = getTeam(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Our people"
        title={isPune ? 'Meet our Pune team' : 'Meet our Dubai team'}
        sub={
          isPune
            ? 'Our Pune-based property advisors, sales consultants, commercial specialists, and legal managers.'
            : 'Our Dubai-based off-plan consultants, private wealth advisors, and client relations team.'
        }
        img={isPune ? 'office.jpg' : 'dubai2.jpg'}
        crumbs={[['Home', '/'], ['Meet the Team']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {activeTeam.map(([r, d], k) => (
            <Reveal key={r} d={(k % 4) * 60}>
              <div className="tm">
                <span>{initials(r)}</span>
                <h3>{r}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner title="Want to join the team?" to="/careers" label="View careers" />
    </>
  );
}
