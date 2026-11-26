import React, { useEffect, useRef } from 'react';
import { Search, CalendarCheck, ShieldCheck, KeyRound } from 'lucide-react';
import { journey } from '@/data/journey';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

const ICONS = [Search, CalendarCheck, ShieldCheck, KeyRound];

const TONES = [
  { c1: '#6FE7AC', c2: '#2FB36D', rgb: '47,179,109' },  // parrot green
  { c1: '#6BDDEA', c2: '#17B3C4', rgb: '23,179,196' },  // sky teal
  { c1: '#FFA895', c2: '#E8553D', rgb: '232,85,61' },   // macaw coral
  { c1: '#F5DE9B', c2: '#B08D3C', rgb: '176,141,60' },  // gold
];

const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const STYLES = `
/* section background (cream) */
.jr.jr2{background:#f0eee9 !important}
.jr2 h2{color:#14130f !important}

.jr2{position:relative;overflow:hidden}
.jr2::before,.jr2::after{content:'';position:absolute;border-radius:50%;pointer-events:none;filter:blur(14px);z-index:0}
.jr2::before{top:-120px;left:-100px;width:440px;height:440px;
  background:radial-gradient(circle,rgba(47,179,109,.16),transparent 70%);animation:jr2-float 10s ease-in-out infinite}
.jr2::after{bottom:-140px;right:-100px;width:460px;height:460px;
  background:radial-gradient(circle,rgba(232,85,61,.14),transparent 70%);animation:jr2-float 12s ease-in-out infinite reverse}
@keyframes jr2-float{0%,100%{transform:translate(0,0)}50%{transform:translate(34px,26px)}}
.jr2 > .w{position:relative;z-index:1}

.jr2-bar{display:block;width:96px;height:3px;border-radius:3px;margin:18px 0 44px;
  background:linear-gradient(90deg,#2FB36D,#17B3C4,#E8553D,#B08D3C,#2FB36D);background-size:300% 100%;
  animation:jr2-shim 5s linear infinite}
@keyframes jr2-shim{to{background-position:-300% 0}}

.jr2-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:30px}

.jr2-col{position:relative}

/* timeline node */
.jr2-node{position:relative;width:56px;height:56px;margin-bottom:22px;
  transform:scale(0);transition:transform .7s cubic-bezier(.3,1.6,.5,1) calc(var(--i) * .25s + .15s)}
.jr2.on .jr2-node{transform:scale(1)}
.jr2-dot{position:relative;width:100%;height:100%;border-radius:50%;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--c1),var(--c2));color:#0f1012;
  font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:22px;
  box-shadow:0 8px 26px rgba(var(--rgb),.45)}
.jr2-dot::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid rgba(var(--rgb),.7);
  animation:jr2-ring 2.6s ease-out infinite;animation-delay:calc(var(--i) * .5s)}
@keyframes jr2-ring{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.9);opacity:0}}

/* connector line to next step */
.jr2-line{position:absolute;top:27px;left:70px;right:-22px;height:2px;z-index:1;
  background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 6px,transparent 6px 12px)}
.jr2-line i{position:absolute;inset:0;background:linear-gradient(90deg,var(--c2),var(--nx));
  transform:scaleX(0);transform-origin:left;
  transition:transform 1s cubic-bezier(.4,0,.2,1) calc(var(--i) * .5s + .6s)}
.jr2.on .jr2-line i{transform:scaleX(1)}

/* card */
.jr2-card{position:relative;overflow:hidden;height:100%;padding:34px 30px 32px;border-radius:20px;
  background:linear-gradient(160deg,#2b2d34,#202227);
  border:1px solid rgba(255,255,255,.07);
  transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s ease,border-color .45s ease}
.jr2-card:hover{transform:translateY(-10px);border-color:rgba(var(--rgb),.6);
  box-shadow:0 28px 55px rgba(var(--rgb),.25)}
.jr2-card::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .4s ease;
  background:radial-gradient(300px circle at var(--mx,50%) var(--my,50%),rgba(var(--rgb),.18),transparent 65%)}
.jr2-card:hover::before{opacity:1}
.jr2-card::after{content:'';position:absolute;left:0;top:0;width:100%;height:3px;
  background:linear-gradient(90deg,var(--c1),var(--c2));
  transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.jr2-card:hover::after{transform:scaleX(1)}

.jr2-ic{position:absolute;top:22px;right:22px;color:rgba(var(--rgb),.16);
  transition:transform .6s cubic-bezier(.2,.8,.2,1),color .4s ease}
.jr2-card:hover .jr2-ic{transform:rotate(-10deg) scale(1.15);color:rgba(var(--rgb),.38)}

.jr2-card h3{position:relative;margin:0 0 10px}
.jr2-card p{position:relative;margin:0}

@media (max-width:1100px){
  .jr2-grid{grid-template-columns:repeat(2,1fr)}
  .jr2-line{display:none}
}
@media (max-width:600px){
  .jr2-grid{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){
  .jr2::before,.jr2::after,.jr2-bar,.jr2-dot::after{animation:none}
  .jr2-node{transform:none;transition:none}
  .jr2-line i{transform:scaleX(1);transition:none}
  .jr2-card,.jr2-ic{transition:none}
  .jr2-card:hover{transform:none}
}
`;

export default function JourneySection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('on');
      return;
    }
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('on');
          o.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} className="jr jr2">
      <style>{STYLES}</style>
      <div className="w">
        <Reveal>
          <SectionHead eyebrow="How it works" title="Your journey with Aurelia" />
          <span className="jr2-bar" />
        </Reveal>
        <div className="jr2-grid">
          {journey.map(([t, d], k) => {
            const tone = TONES[k % TONES.length];
            const next = TONES[(k + 1) % TONES.length];
            const Icon = ICONS[k % ICONS.length];
            const vars = {
              '--c1': tone.c1,
              '--c2': tone.c2,
              '--rgb': tone.rgb,
              '--nx': next.c1,
              '--i': k,
            } as React.CSSProperties;
            return (
              <Reveal key={t} d={k * 80}>
                <div className="jr2-col" style={vars}>
                  <div className="jr2-node">
                    <div className="jr2-dot">{k + 1}</div>
                  </div>
                  {k < journey.length - 1 && (
                    <div className="jr2-line"><i /></div>
                  )}
                  <div className="jr2-card" onMouseMove={onMove}>
                    <Icon className="jr2-ic" size={84} strokeWidth={1.2} />
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}