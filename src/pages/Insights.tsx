import React from 'react';
import { ArrowRight } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { getArticles } from '@/data/articles';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Insights() {
  const { market, isPune } = useLocationContext();
  const currentArticles = getArticles(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Insights"
        title={isPune ? 'Pune Market Notes & Guides' : 'Dubai Market Notes & Guides'}
        sub={
          isPune
            ? 'In-depth market research and buying guides for Pune homebuyers and investors.'
            : 'In-depth market research and investment guides for Dubai freehold property buyers.'
        }
        img={isPune ? 'interior.jpg' : 'dubai3.jpg'}
        crumbs={[['Home', '/'], ['Insights']]}
      />

      <section className="w sec">
        <div className="grid g4">
          {currentArticles.map(([t, c, d], k) => (
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
