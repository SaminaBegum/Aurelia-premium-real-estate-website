import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { getTestimonials } from '@/data/testimonials';
import { useLocationContext } from '@/contexts/LocationContext';

const CSS = `
.home-tst{position:relative;overflow:hidden;padding:90px 0;background:#fbfbf9;
  border-top:1px solid rgba(176,141,60,.12);border-bottom:1px solid rgba(176,141,60,.12)}
.home-tst::before{content:'';position:absolute;top:-160px;right:-120px;width:460px;height:460px;border-radius:50%;
  background:radial-gradient(circle,rgba(176,141,60,.13),transparent 70%);pointer-events:none}
.home-tst::after{content:'';position:absolute;bottom:-180px;left:-120px;width:460px;height:460px;border-radius:50%;
  background:radial-gradient(circle,rgba(176,141,60,.09),transparent 70%);pointer-events:none}
.home-tst>.w{position:relative;z-index:1}

/* grid: every column stretches, so all cards are the same height */
.home-tst-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:44px;align-items:stretch}
.home-tst-grid>*{display:flex;flex-direction:column;min-width:0}

.home-tst-card{position:relative;overflow:hidden;flex:1;display:flex;flex-direction:column;
  background:#fff;border:1px solid rgba(176,141,60,.22);border-radius:18px;padding:32px 28px 26px;
  box-shadow:0 10px 28px rgba(0,0,0,.05);
  transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s ease,border-color .4s ease}
.home-tst-card::before{content:'';position:absolute;left:0;top:0;width:100%;height:3px;
  background:linear-gradient(90deg,#b08d3c,#d4b46a);transform:scaleX(0);transform-origin:left;
  transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.home-tst-card:hover{transform:translateY(-8px);border-color:rgba(176,141,60,.6);box-shadow:0 26px 50px rgba(176,141,60,.18)}
.home-tst-card:hover::before{transform:scaleX(1)}

.home-tst-qi{position:absolute;top:22px;right:22px;color:rgba(176,141,60,.16);transition:transform .5s ease,color .4s ease}
.home-tst-card:hover .home-tst-qi{transform:rotate(-8deg) scale(1.12);color:rgba(176,141,60,.32)}

.home-tst-stars{display:flex;gap:4px;color:#b08d3c;margin-bottom:18px}

.home-tst-quote{position:relative;flex:1;font-size:15.5px;line-height:1.75;color:#334155;margin:0 0 26px;font-style:italic}

/* author block always sits at the bottom of the card */
.home-tst-author{margin-top:auto;border-top:1px dashed rgba(0,0,0,.12);padding-top:18px;display:flex;flex-direction:column;gap:14px}
.home-tst-who{display:flex;align-items:center;gap:14px}
.home-tst-av{flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;
  background:#000;color:#d4b46a;font-weight:700;font-size:15px;letter-spacing:.03em;
  box-shadow:0 0 0 3px #fff,0 0 0 4px #b08d3c}
.home-tst-info{display:flex;flex-direction:column;gap:2px;min-width:0}
.home-tst-name{font-weight:700;color:#1e293b;font-size:15.5px;line-height:1.3}
.home-tst-role{font-size:13px;color:#64748b;line-height:1.4}
.home-tst-loc{display:flex;align-items:center;gap:5px;font-size:12.5px;color:#94a3b8;line-height:1.4}
.home-tst-loc svg{flex:none;color:#b08d3c}

.home-tst-proj{align-self:flex-start;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;
  padding:5px 11px;background:rgba(176,141,60,.12);color:#9a7a2e;border-radius:99px;border:1px solid rgba(176,141,60,.25)}

@media (max-width:600px){
  .home-tst{padding:64px 0}
  .home-tst-card{padding:28px 22px 24px}
}
@media (prefers-reduced-motion:reduce){
  .home-tst-card,.home-tst-card::before,.home-tst-qi{transition:none}
  .home-tst-card:hover{transform:none}
}
`;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export default function TestimonialsSection() {
  const { market, isPune } = useLocationContext();
  const list = getTestimonials(market);

  return (
    <section className="home-tst">
      <style>{CSS}</style>
      <div className="w">
        <Reveal>
          <SectionHead
            eyebrow="Client Testimonials"
            title={
              isPune
                ? 'Trusted by Pune’s Most Discerning Homebuyers'
                : 'Trusted by Global Investors & Homeowners in Dubai'
            }
            sub={
              isPune
                ? 'Read firsthand experiences from families, tech leaders, and NRI investors who secured their Pune luxury homes with Aurelia.'
                : 'Read firsthand experiences from international high-net-worth investors and families who acquired premium Dubai properties with Aurelia.'
            }
          />
        </Reveal>

        <div className="home-tst-grid">
          {list.map((item, k) => (
            <Reveal key={item.id} d={k * 80}>
              <div className="home-tst-card">
                <Quote className="home-tst-qi" size={64} strokeWidth={1.2} />

                <div className="home-tst-stars" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, starIdx) => (
                    <Star key={starIdx} size={16} fill="#b08d3c" strokeWidth={0} />
                  ))}
                </div>

                <p className="home-tst-quote">“{item.quote}”</p>

                <div className="home-tst-author">
                  <div className="home-tst-who">
                    <span className="home-tst-av">{initials(item.name)}</span>
                    <div className="home-tst-info">
                      <span className="home-tst-name">{item.name}</span>
                      <span className="home-tst-role">{item.role}</span>
                      {item.location && (
                        <span className="home-tst-loc">
                          <MapPin size={12} /> {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.project && <span className="home-tst-proj">{item.project}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}