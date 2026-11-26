import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, KeyRound, Layers, Building2, UserRound, Globe } from 'lucide-react';
import { services, IconName } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

const ICONS: Record<IconName, React.ElementType> = { Home, KeyRound, Layers, Building2, UserRound, Globe };

const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const STYLES = `
.sx-card{
  --gold:#b08d3c;
  position:relative;overflow:hidden;height:100%;
  background:#fff;border-radius:22px;border-top:3px solid var(--gold);
  padding:38px 32px 34px;
  box-shadow:0 10px 30px rgba(0,0,0,.05);
  transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s ease;
}
.sx-card:hover{transform:translateY(-10px);box-shadow:0 28px 55px rgba(176,141,60,.22)}

.sx-card::before{
  content:'';position:absolute;inset:0;pointer-events:none;opacity:0;
  background:radial-gradient(320px circle at var(--mx,50%) var(--my,50%),rgba(176,141,60,.16),transparent 65%);
  transition:opacity .4s ease;
}
.sx-card:hover::before{opacity:1}

.sx-card::after{
  content:'';position:absolute;left:0;bottom:0;width:100%;height:3px;
  background:linear-gradient(90deg,var(--gold),#e3c77a);
  transform:scaleX(0);transform-origin:left;
  transition:transform .5s cubic-bezier(.2,.8,.2,1);
}
.sx-card:hover::after{transform:scaleX(1)}

.sx-no{
  position:absolute;top:14px;right:22px;
  font-family:'Playfair Display',Georgia,serif;font-size:72px;line-height:1;
  color:rgba(176,141,60,.12);user-select:none;
  transition:color .4s ease,transform .5s ease;
}
.sx-card:hover .sx-no{color:rgba(176,141,60,.25);transform:translateY(-4px) scale(1.06)}

.sx-ic{
  width:62px;height:62px;display:grid;place-items:center;border-radius:50%;
  background:rgba(176,141,60,.1);color:var(--gold);margin-bottom:24px;
  transition:background .4s ease,color .4s ease,transform .5s cubic-bezier(.2,.8,.2,1);
}
.sx-card:hover .sx-ic{background:var(--gold);color:#fff;transform:rotate(-8deg) scale(1.08)}

.sx-card h3{position:relative;margin:0 0 10px}
.sx-card p{position:relative;margin:0 0 22px}

.sx-link{
  position:relative;display:inline-flex;align-items:center;gap:8px;
  font-weight:500;color:inherit;text-decoration:none;
  border-bottom:1px solid var(--gold);padding-bottom:2px;
}
.sx-link svg{transition:transform .35s ease;color:var(--gold)}
.sx-card:hover .sx-link svg{transform:translateX(6px)}

@media (prefers-reduced-motion:reduce){
  .sx-card,.sx-card::after,.sx-ic,.sx-no,.sx-link svg{transition:none}
  .sx-card:hover{transform:none}
}
`;

export default function ServicesSection() {
  return (
    <section className="w sec">
      <style>{STYLES}</style>
      <Reveal>
        <SectionHead
          eyebrow="What we do"
          title=""
          sub="Whether you’re buying a luxury residence, acquiring an off-plan unit or investing from abroad, our team handles the full journey."
        />
      </Reveal>
      <div className="sv">
        {services.map(([t, ic, d, to], k) => {
          const C = ICONS[ic];
          return (
            <Reveal key={t} d={k * 80}>
              <div className="sx-card" onMouseMove={onMove}>
                <span className="sx-no">{String(k + 1).padStart(2, '0')}</span>
                <div className="sx-ic"><C size={28} strokeWidth={1.6} /></div>
                <h3>{t}</h3>
                <p>{d}</p>
                <Link to={to} className="sx-link">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}