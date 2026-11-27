import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { Seg } from '@/components/ui/Seg';
import { getProjects } from '@/api/api';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Projects() {
  const { market, setMarket, isPune } = useLocationContext();
  const list = getProjects(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Off-plan"
        title={isPune ? 'Exclusive Pune off-plan projects' : 'Exclusive Dubai off-plan projects'}
        sub={
          isPune
            ? 'Hand-picked off-plan and new launch developments in Pune, backed end-to-end by Aurelia.'
            : 'Hand-picked luxury off-plan developments in Dubai, backed end-to-end by Aurelia.'
        }
        img={isPune ? '24k-manor-1.jpg' : 'hero.jpg'}
        crumbs={[['Home', '/'], ['Off-Plan Projects']]}
      />

      <section className="w sec">
        <div className="tools">
          <Seg
            v={market}
            set={(v) => {
              const target = v === 'Dubai' ? 'Dubai' : 'Pune';
              setMarket(target);
            }}
            opts={[
              ['Pune', 'Pune Projects'],
              ['Dubai', 'Dubai Projects'],
            ]}
          />
          <span>{list.length} {isPune ? 'Pune' : 'Dubai'} projects</span>
        </div>

        <div className="grid g3">
          {list.map((p, k) => (
            <Reveal key={p.id} d={(k % 3) * 60}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
