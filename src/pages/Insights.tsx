import React from 'react';
import { ArrowRight } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { articles } from '@/data/articles';

export default function Insights() {
  return (
    <>
      <InnerPageBanner
        eyebrow="Insights"
        title="Market notes & guides"
        sub="For buyers and investors in Pune and Dubai."
        img="interior.jpg"
        crumbs={[['Home', '/'], ['Insights']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {articles.map(([t, c, d], k) => (
            <Reveal key={t} d={k * 60}>
              <article className="art">
                <span className="chip">{c}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="lk">
                  Read more <ArrowRight size={14} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}