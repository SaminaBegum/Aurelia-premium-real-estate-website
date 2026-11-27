import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, KeyRound, Layers, Building2, UserRound, Globe } from 'lucide-react';
import { getServices, IconName } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { useLocationContext } from '@/contexts/LocationContext';

import serviceBg1 from '@/assets/images/service-bg-1.jpg';
import serviceBg2 from '@/assets/images/service-bg-2.jpg';
import serviceBg3 from '@/assets/images/service-bg-3.jpg';
import serviceBg4 from '@/assets/images/service-bg-4.jpg';
import serviceBg5 from '@/assets/images/service-bg-5.jpg';
import serviceBg6 from '@/assets/images/service-bg-6.jpg';

const SERVICE_IMAGES = [
  serviceBg1,
  serviceBg2,
  serviceBg3,
  serviceBg4,
  serviceBg5,
  serviceBg6,
];

const ICONS: Record<IconName, React.ElementType> = { Home, KeyRound, Layers, Building2, UserRound, Globe };

const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const STYLES = `
.sx-card {
  --gold: #b08d3c;
  --gold-light: #dfb77c;
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 330px;
  border-radius: 22px;
  border: 1px solid rgba(197, 168, 128, 0.4);
  padding: 28px 26px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease, border-color 0.45s ease;
  background-color: #161311;
}

.sx-card:hover {
  transform: translateY(-8px);
  border-color: rgba(223, 183, 124, 0.75);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.42), 0 0 25px rgba(176, 141, 60, 0.25);
}

.sx-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  z-index: 3;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(223, 183, 124, 0.18), transparent 65%);
  transition: opacity 0.4s ease;
}
.sx-card:hover::before {
  opacity: 1;
}

.sx-card::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  z-index: 3;
  background: linear-gradient(90deg, #b08d3c, #f3db98);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sx-card:hover::after {
  transform: scaleX(1);
}

.sx-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  transform: scale(1);
  transition: transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sx-card:hover .sx-bg-img {
  transform: scale(1.08);
}

.sx-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(14, 12, 10, 0.42) 0%,
    rgba(14, 12, 10, 0.15) 28%,
    rgba(12, 10, 8, 0.72) 65%,
    rgba(10, 8, 6, 0.95) 100%
  );
  transition: background 0.45s ease;
}
.sx-card:hover .sx-overlay {
  background: linear-gradient(
    180deg,
    rgba(14, 12, 10, 0.35) 0%,
    rgba(14, 12, 10, 0.12) 28%,
    rgba(12, 10, 8, 0.76) 65%,
    rgba(10, 8, 6, 0.96) 100%
  );
}

.sx-card-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.sx-ic {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(165, 125, 55, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  margin-bottom: 0;
  transition: background 0.4s ease, color 0.4s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s ease;
}
.sx-card:hover .sx-ic {
  background: rgba(190, 148, 70, 0.88);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.08) rotate(-4deg);
}

.sx-no {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 1;
  color: rgba(255, 255, 255, 0.65);
  user-select: none;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: color 0.4s ease, transform 0.4s ease;
}
.sx-card:hover .sx-no {
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
}

.sx-card-content {
  position: relative;
  z-index: 2;
  margin-top: 36px;
}

.sx-card h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
  line-height: 1.25;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.65);
  transition: color 0.3s ease;
}

.sx-card p {
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(235, 230, 224, 0.92);
  margin: 0 0 16px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

.sx-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #dfb77c;
  text-decoration: none;
  border-bottom: 1px solid rgba(223, 183, 124, 0.5);
  padding-bottom: 2px;
  width: fit-content;
  transition: color 0.35s ease, border-color 0.35s ease, gap 0.35s ease;
}
.sx-link svg {
  color: #dfb77c;
  transition: transform 0.35s ease, color 0.35s ease;
}
.sx-card:hover .sx-link {
  color: #f7deb0;
  border-bottom-color: #f7deb0;
  gap: 10px;
}
.sx-card:hover .sx-link svg {
  color: #f7deb0;
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .sx-card {
    min-height: 300px;
    padding: 24px 20px 22px;
  }
  .sx-ic {
    width: 46px;
    height: 46px;
  }
  .sx-no {
    font-size: 28px;
  }
  .sx-card h3 {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sx-card, .sx-card::after, .sx-ic, .sx-no, .sx-bg-img, .sx-link svg {
    transition: none !important;
  }
  .sx-card:hover {
    transform: none !important;
  }
  .sx-card:hover .sx-bg-img {
    transform: none !important;
  }
}
`;

export default function ServicesSection() {
  const { market, isPune } = useLocationContext();
  const currentServices = getServices(market);

  return (
    <section className="w sec">
      <style>{STYLES}</style>
      <Reveal>
        <SectionHead
          eyebrow="What we do"
          title=""
          sub={
            isPune
              ? 'Whether you’re buying a luxury residence in Pune, acquiring an off-plan unit or investing from abroad, our team handles the full journey.'
              : 'Whether you’re buying a luxury residence in Dubai, acquiring an off-plan unit or investing from abroad, our team handles the full journey.'
          }
        />
      </Reveal>
      <div className="sv">
        {currentServices.map(([t, ic, d, to], k) => {
          const C = ICONS[ic];
          const bgImg = SERVICE_IMAGES[k % SERVICE_IMAGES.length];
          return (
            <Reveal key={t} d={k * 80}>
              <div className="sx-card" onMouseMove={onMove}>
                <img
                  src={bgImg}
                  alt={t}
                  className="sx-bg-img"
                  loading="lazy"
                />
                <div className="sx-overlay" />
                <div className="sx-card-top">
                  <div className="sx-ic">
                    <C size={22} strokeWidth={1.8} />
                  </div>
                  <span className="sx-no">{String(k + 1).padStart(2, '0')}</span>
                </div>
                <div className="sx-card-content">
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <Link to={to} className="sx-link">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
