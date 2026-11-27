import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getListings } from '@/api/api';
import { ListingCard } from '@/components/ListingCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { useLocationContext } from '@/contexts/LocationContext';

const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  el.style.setProperty('--mx', `${x}px`);
  el.style.setProperty('--my', `${y}px`);
  el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -5}deg`);
  el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 5}deg`);
};
const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
};

const STYLES = `
.fl-sec{position:relative}
.fl-sec::before{
  content:'';position:absolute;top:-60px;left:-80px;width:420px;height:420px;border-radius:50%;
  background:radial-gradient(circle,rgba(176,141,60,.16),transparent 70%);
  filter:blur(10px);pointer-events:none;z-index:0;
  animation:fl-float 9s ease-in-out infinite;
}
.fl-sec::after{
  content:'';position:absolute;bottom:-40px;right:-60px;width:340px;height:340px;border-radius:50%;
  background:radial-gradient(circle,rgba(176,141,60,.12),transparent 70%);
  filter:blur(10px);pointer-events:none;z-index:0;
  animation:fl-float 11s ease-in-out infinite reverse;
}
.fl-sec > *{position:relative;z-index:1}
@keyframes fl-float{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,24px)}}

/* heading accent line */
.fl-line{display:block;width:70px;height:3px;border-radius:3px;margin:0 0 26px;
  background:linear-gradient(90deg,#b08d3c,#e3c77a,#b08d3c);background-size:200% 100%;
  animation:fl-shimmer 3s linear infinite}
@keyframes fl-shimmer{to{background-position:-200% 0}}

/* view all button */
.fl-sec .fl-btn{position:relative;overflow:hidden;z-index:0;transition:color .35s ease,border-color .35s ease,transform .35s ease,box-shadow .35s ease}
.fl-sec .fl-btn::before{
  content:'';position:absolute;inset:0;z-index:-1;background:#b08d3c;
  transform:translateX(-101%);transition:transform .45s cubic-bezier(.2,.8,.2,1);
}
.fl-sec .fl-btn:hover{color:#fff;border-color:#b08d3c;transform:translateY(-3px);box-shadow:0 14px 28px rgba(176,141,60,.3)}
.fl-sec .fl-btn:hover::before{transform:translateX(0)}
.fl-sec .fl-btn svg{transition:transform .35s ease}
.fl-sec .fl-btn:hover svg{transform:translateX(6px)}

/* card wrapper */
.fl-item{
  position:relative;overflow:hidden;border-radius:20px;height:100%;
  transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .35s ease,box-shadow .45s ease;
  box-shadow:0 8px 24px rgba(0,0,0,.05);
  will-change:transform;
}
.fl-item:hover{
  transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateY(-10px);
  box-shadow:0 0 0 2px rgba(176,141,60,.55),0 30px 60px rgba(176,141,60,.25);
}

/* spotlight */
.fl-item::before{
  content:'';position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;
  background:radial-gradient(280px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.18),transparent 65%);
  transition:opacity .4s ease;
}
.fl-item:hover::before{opacity:1}

/* shine sweep */
.fl-item::after{
  content:'';position:absolute;top:0;left:-80%;width:50%;height:100%;z-index:4;pointer-events:none;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,.35),transparent);
  transform:skewX(-18deg);
}
.fl-item:hover::after{left:140%;transition:left .9s ease}

/* image zoom */
.fl-item img{transition:transform 1.1s cubic-bezier(.2,.8,.2,1)}
.fl-item:hover img{transform:scale(1.1)}

/* buttons inside card (heart, arrow) */
.fl-item button{transition:transform .3s cubic-bezier(.3,1.6,.5,1),background .3s ease,color .3s ease,border-color .3s ease}
.fl-item button:hover{transform:scale(1.18)}
.fl-item button:active{transform:scale(.92)}

@media (max-width:900px){
  .fl-item{transform:none!important}
  .fl-sec::before,.fl-sec::after{display:none}
}
@media (prefers-reduced-motion:reduce){
  .fl-sec::before,.fl-sec::after,.fl-line{animation:none}
  .fl-item,.fl-item img,.fl-item::after{transition:none}
  .fl-item{transform:none!important}
}
`;

export default function FeaturedListings() {
  const { market, isPune } = useLocationContext();
  const marketListings = getListings(market).slice(0, 8);

  return (
    <section className="w sec fl-sec">
      <style>{STYLES}</style>
      <Reveal>
        <SectionHead
          eyebrow="Featured listings"
          title={isPune ? 'Featured Pune properties' : 'Featured Dubai properties'}
          sub={
            isPune
              ? 'A snapshot of premier luxury residential and commercial properties for sale in Pune.'
              : 'A snapshot of premier luxury residential and commercial properties for sale in Dubai.'
          }
          right={
            <Link className="btn-o fl-btn" to={`/properties?market=${market}`}>
              {isPune ? 'View all Pune properties' : 'View all Dubai properties'} <ArrowRight size={16} />
            </Link>
          }
        />
        <span className="fl-line" />
      </Reveal>
      <div className="grid">
        {marketListings.map((l, k) => (
          <Reveal key={`${market}-${l.id}`} d={(k % 4) * 80}>
            <div className="fl-item" onMouseMove={onMove} onMouseLeave={onLeave}>
              <ListingCard l={l} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
