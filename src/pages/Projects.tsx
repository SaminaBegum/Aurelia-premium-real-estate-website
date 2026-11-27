import React, { useState } from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { Seg } from '@/components/ui/Seg';
import { getProjects } from '@/api/api';

export default function Projects() {
  const [m, setM] = useState('All');
  const list = getProjects(m);

  return (
    <>
      <InnerPageBanner
        eyebrow="Off-plan"
        title="Exclusive off-plan projects"
        sub="Hand-picked developments in Pune and Dubai, backed end-to-end by Aurelia."
        img="hero.jpg"
        crumbs={[['Home', '/'], ['Off-Plan Projects']]}
      />

      <section className="w sec">
        <div className="tools">
          <Seg
            v={m}
            set={setM}
            opts={[
              ['All', 'All projects'],
              ['Pune', 'Pune'],
              ['Dubai', 'Dubai'],
            ]}
          />
          <span>{list.length} projects</span>
        </div>

        <div className="grid g3">
          {list.map((p, k) => (
            <Reveal key={p.id} d={k * 60}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}