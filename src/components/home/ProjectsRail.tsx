import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProjects } from '@/api/api';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { useLocationContext } from '@/contexts/LocationContext';

const SPEED = 0.6; // px per frame (~36px/sec)

export default function ProjectsRail() {
  const { market, isPune } = useLocationContext();
  const projectsList = getProjects(market);

  const rail = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const pos = useRef(0);

  // width of one full set of cards (distance from first card to its duplicate)
  const loopWidth = () => {
    const el = rail.current;
    if (!el || el.children.length <= projectsList.length) return 0;
    const first = el.children[0] as HTMLElement;
    const dup = el.children[projectsList.length] as HTMLElement;
    return dup.offsetLeft - first.offsetLeft;
  };

  const by = (d: number) => {
    const el = rail.current;
    if (!el) return;
    const w = loopWidth();
    if (w && el.scrollLeft + d < 0) el.scrollLeft += w;
    el.scrollBy({ left: d, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.scrollSnapType = 'none';
    pos.current = el.scrollLeft;
    let raf = 0;

    const tick = () => {
      const w = loopWidth();
      if (!paused.current && w) {
        pos.current += SPEED;
        if (pos.current >= w) pos.current -= w;
        el.scrollLeft = pos.current;
      } else {
        pos.current = el.scrollLeft;
      }
      if (w && el.scrollLeft >= w) el.scrollLeft -= w;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [market, projectsList.length]);

  const pause = () => { paused.current = true; };
  const play = () => { paused.current = false; };

  return (
    <section className="w sec">
      <Reveal>
        <SectionHead
          eyebrow="Off-plan"
          title={isPune ? 'Exclusive Pune off-plan projects' : 'Exclusive Dubai off-plan projects'}
          sub={
            isPune
              ? 'Hand-picked Pune developments with strong fundamentals, backed end-to-end by our team.'
              : 'Hand-picked Dubai developments with strong fundamentals, backed end-to-end by our team.'
          }
          right={
            <Link className="btn-o" to={`/exclusive-projects?market=${market}`}>
              View all projects <ArrowRight size={16} />
            </Link>
          }
        />
      </Reveal>
      <div className="rail-w">
        <button className="arr l" aria-label="Previous" onClick={() => by(-340)}><ArrowLeft /></button>
        <div
          className="rail"
          ref={rail}
          onMouseEnter={pause}
          onMouseLeave={play}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(play, 1500)}
          onFocus={pause}
          onBlur={play}
        >
          {[...projectsList, ...projectsList].map((p, i) => (
            <ProjectCard key={`${market}-${p.id}-${i}`} p={p} />
          ))}
        </div>
        <button className="arr r" aria-label="Next" onClick={() => by(340)}><ArrowRight /></button>
      </div>
    </section>
  );
}
