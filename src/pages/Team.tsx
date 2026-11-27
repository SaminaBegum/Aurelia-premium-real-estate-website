import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/CtaBanner';
import { team } from '@/data/team';
import { initials } from '@/lib/format';

export default function Team() {
  return (
    <>
      <InnerPageBanner
        eyebrow="Our people"
        title="Meet the team"
        sub="An international team bringing together sales, advisory, operations and support to deliver on our promise."
        img="office.jpg"
        crumbs={[['Home', '/'], ['Meet the Team']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {team.map(([r, d], k) => (
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