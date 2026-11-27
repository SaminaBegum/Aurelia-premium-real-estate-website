import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Ruler, Building, Check, Phone, ArrowRight,
  Waves, Dumbbell, Trees, Baby, Users, Car, ShieldCheck, Zap, Trophy, Film, Building2,
} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHead } from '@/components/ui/SectionHead';
import { Gallery } from '@/components/Gallery';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ListingCard } from '@/components/ListingCard';
import { MortgageCalculator } from '@/components/MortgageCalculator';
import { getListing, getSimilarListings } from '@/api/api';
import { ENQUIRY_FIELDS } from '@/data/forms';
import { SITE } from '@/data/site';
import { money } from '@/lib/format';

/* All new styles are scoped under .prx so other pages are not affected.
   Colours stay the existing Aurelia gold / black / cream. */
const CSS = `
.prx{--g:#b08d3c;--g2:#d4b46a;--ink:#1e293b}

/* ---------- Title block: one load sequence ---------- */
.prx .pdh{display:flex!important;justify-content:space-between;align-items:flex-end;gap:1.5rem;flex-wrap:wrap}
.prx .pdh>*{animation:prxIn .8s cubic-bezier(.2,.7,.2,1) both}
.prx .pdh>*:nth-child(2){animation-delay:.15s}
@keyframes prxIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.prx .pdh h1{margin:.7rem 0 .6rem;line-height:1.1;max-width:20ch}
.prx .pdh p{display:flex;align-items:center;gap:.4rem;color:#64748b;margin:0}
.prx .pdh p svg{color:var(--g);flex:none}

.prx .bdg{display:flex;flex-wrap:wrap;gap:.5rem}
.prx .bdg .chip{background:var(--g);color:#fff;border:1px solid var(--g);border-radius:99px;padding:.3rem .9rem;font-size:.8rem;font-weight:600}
.prx .bdg .chip.s{background:transparent;color:var(--ink);border-color:rgba(176,141,60,.55);font-weight:500}

.prx .pdp{display:flex;flex-direction:column;gap:.2rem;text-align:right;background:#000;border-radius:14px;
  border-bottom:3px solid var(--g);padding:1rem 1.7rem;box-shadow:0 24px 44px -26px rgba(0,0,0,.6)}
.prx .pdp b{font-size:2rem;line-height:1.1;color:var(--g2);font-weight:700}
.prx .pdp small{color:rgba(255,255,255,.6);font-size:.8rem}
@media(max-width:720px){.prx .pdp{text-align:left;width:100%}}

/* ---------- Details band ---------- */
.prx .det{background:#fff;box-shadow:0 0 0 100vmax #fff;clip-path:inset(0 -100vmax)}
.prx .det>aside{align-self:stretch}

.prx .kf{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;margin-bottom:2.2rem}
.prx .kf span{display:flex;flex-direction:column;gap:.15rem;padding:1.1rem 1.2rem;background:#faf8f3;
  border:1px solid rgba(0,0,0,.08);border-radius:14px;transition:border-color .25s,transform .25s}
.prx .kf span:hover{border-color:var(--g);transform:translateY(-3px)}
.prx .kf .prx-ic{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;margin-bottom:.5rem;
  background:rgba(176,141,60,.15);color:var(--g)}
.prx .kf em{font-style:normal;font-size:.78rem;color:#64748b}
.prx .kf b{font-size:1.05rem;color:var(--ink);font-weight:600}

.prx .det h2{position:relative;margin:2.6rem 0 1.1rem;padding-bottom:.8rem}
.prx .det h2::after{content:"";position:absolute;left:0;bottom:0;width:44px;height:3px;border-radius:2px;background:var(--g)}
.prx .det .kf+h2{margin-top:.6rem}
.prx .det>div>p{line-height:1.85;max-width:70ch;color:#334155}

/* amenities */
.prx .am{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:.9rem}
.prx .am>div{display:flex;align-items:center;gap:.85rem;padding:.9rem 1.1rem;background:#faf8f3;border:1px solid rgba(0,0,0,.08);
  border-radius:12px;font-weight:500;color:var(--ink);transition:border-color .25s,transform .25s}
.prx .am>div:hover{border-color:var(--g);transform:translateY(-3px)}
.prx .am .prx-ai{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;
  background:rgba(176,141,60,.14);color:var(--g);transition:all .25s}
.prx .am>div:hover .prx-ai{background:var(--g);color:#fff}

/* mortgage calculator wrapper */
.prx .prx-calc{padding:1.5rem;background:#faf8f3;border:1px solid rgba(176,141,60,.35);border-radius:16px}

/* ---------- Enquiry box ---------- */
.prx .det aside .box{position:sticky;top:130px;max-height:calc(100vh - 150px);overflow-y:auto;scrollbar-width:thin;
  background:#fff;border-radius:16px;border-top:4px solid var(--g);padding:1.7rem;
  box-shadow:0 30px 60px -30px rgba(0,0,0,.45)}
.prx .det aside .box>small{color:#64748b}
.prx .det aside .box>h3{margin:.2rem 0 1.2rem;font-size:2.1rem;line-height:1.1;color:var(--g)}
.prx .agent{display:flex;align-items:center;gap:.9rem;padding:0 0 1.2rem;margin-bottom:1.2rem;border-bottom:1px dashed rgba(0,0,0,.18)}
.prx .agent>span{flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;
  background:#000;color:var(--g2);font-weight:700;font-size:1.1rem;box-shadow:0 0 0 3px #fff,0 0 0 4px var(--g)}
.prx .agent>div{display:flex;flex-direction:column;gap:.15rem}
.prx .agent b{color:var(--ink);font-size:.98rem}
.prx .agent a{color:var(--g);text-decoration:none;font-weight:500;font-size:.92rem}
.prx .agent a:hover{text-decoration:underline}
.prx .det aside .box h4{margin:0 0 .2rem}

/* ---------- Mobile sticky CTA ---------- */
.prx .prx-mcta{display:none}
@media(max-width:720px){
  .prx{padding-bottom:70px}
  .prx .prx-mcta{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;gap:.6rem;padding:.7rem 1rem;
    background:#000;border-top:1px solid rgba(176,141,60,.5)}
  .prx .prx-mcta button,.prx .prx-mcta a{flex:1;display:flex;align-items:center;justify-content:center;gap:.4rem;
    padding:.8rem;border-radius:8px;font-weight:600;font-size:.95rem;text-decoration:none;border:0;cursor:pointer}
  .prx .prx-mcta button{background:var(--g);color:#000}
  .prx .prx-mcta a{background:transparent;color:var(--g2);border:1px solid var(--g)}
  .prx .det aside .box{position:static;max-height:none}
}

@media(prefers-reduced-motion:reduce){
  .prx *,.prx *::before{animation:none!important;transition:none!important}
}
`;

const amenityIcon = (name: string) => {
  const n = name.toLowerCase();
  const sz = 18;
  if (/pool|swim|spa|jacuzzi/.test(n)) return <Waves size={sz} />;
  if (/gym|fitness|yoga|health/.test(n)) return <Dumbbell size={sz} />;
  if (/garden|park|jog|tree|green|landscap|walk/.test(n)) return <Trees size={sz} />;
  if (/kid|child|play|creche/.test(n)) return <Baby size={sz} />;
  if (/club|party|hall|lounge|banquet|community|social/.test(n)) return <Users size={sz} />;
  if (/park(ing)?|ev |charging|car/.test(n)) return <Car size={sz} />;
  if (/secur|cctv|gate|safe|fire/.test(n)) return <ShieldCheck size={sz} />;
  if (/power|backup|solar|energy|lift|elevator/.test(n)) return <Zap size={sz} />;
  if (/sport|court|tennis|cricket|badminton|basket|squash|game/.test(n)) return <Trophy size={sz} />;
  if (/theatre|theater|cinema|movie/.test(n)) return <Film size={sz} />;
  if (/tower|building|sky|terrace|deck|library|co-?work/.test(n)) return <Building2 size={sz} />;
  return <Check size={sz} />;
};

export default function PropertyDetail() {
  const { id = '' } = useParams();
  const l = getListing(id);

  if (!l)
    return (
      <InnerPageBanner
        title="Property not found"
        crumbs={[
          ['Home', '/'],
          ['Properties', '/properties'],
        ]}
      >
        <Link className="btn gold" to="/properties">
          Browse properties
        </Link>
      </InnerPageBanner>
    );

  const u = l.market === 'Pune' ? 'BHK' : 'Beds';
  const bedCountLabel =
    l.bhk || (l.beds > 0 ? `${l.beds} ${u}` : l.type || 'Commercial');
  const hasBeds = !!l.bhk || l.beds > 0;
  const sim = getSimilarListings(l.id, l.market);

  const goEnquire = () =>
    document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="prx">
      <style>{CSS}</style>

      <section className="ph sm">
        <div className="w">
          <Breadcrumbs
            items={[
              ['Home', '/'],
              ['Properties', '/properties'],
              [l.title],
            ]}
          />
        </div>
      </section>

      <section className="w sec pdh">
        <div>
          <div className="bdg">
            <span className="chip">For Sale</span>
            {l.tag && <span className="chip s">{l.tag}</span>}
            {l.dev && <span className="chip s">{l.dev}</span>}
            {l.category && <span className="chip s">{l.category}</span>}
          </div>
          <h1>{l.title}</h1>
          <p>
            <MapPin size={16} /> {l.loc}
            {l.dev ? ` · ${l.dev}` : ''}
          </p>
        </div>

        <div className="pdp">
          <b>{money(l)}</b>
          <small>Ref {l.id.toUpperCase()}</small>
        </div>
      </section>

      <section className="w">
        <Gallery imgs={l.gallery} alt={l.title} />
      </section>

      <section className="w sec det">
        <div>
          <div className="kf">
            <span>
              <i className="prx-ic">
                <BedDouble size={18} />
              </i>
              <em>{hasBeds ? (l.bhk ? 'Configuration' : 'Bedrooms') : 'Category'}</em>
              <b>{bedCountLabel}</b>
            </span>
            <span>
              <i className="prx-ic">
                <Bath size={18} />
              </i>
              <em>Bathrooms</em>
              <b>{l.baths} Baths</b>
            </span>
            <span>
              <i className="prx-ic">
                <Ruler size={18} />
              </i>
              <em>Area</em>
              <b>{l.areaText || `${l.area.toLocaleString('en-US')} sqft`}</b>
            </span>
            <span>
              <i className="prx-ic">
                <Building size={18} />
              </i>
              <em>Property type</em>
              <b>{l.type}</b>
            </span>
          </div>

          <h2>Description</h2>
          <p>{l.desc}</p>

          <h2>Amenities &amp; Features</h2>
          <div className="am">
            {l.amenities.map((a) => (
              <div key={a}>
                <span className="prx-ai">{amenityIcon(a)}</span>
                {a}
              </div>
            ))}
          </div>

          <h2>Plan your finances</h2>
          <div className="prx-calc">
            <MortgageCalculator
              amt={l.amt}
              cur={l.market === 'Pune' ? '₹' : 'AED'}
              rate={l.market === 'Pune' ? 8.5 : 4.5}
            />
          </div>
        </div>

        <aside>
          <div className="box" id="enquire">
            <small>Starting Price</small>
            <h3>{money(l)}</h3>

            <div className="agent">
              <span>A</span>
              <div>
                <b>Aurelia Property Consultant</b>
                {SITE.phones
                  .filter((p) => p.label === 'India' || l.market === 'Dubai')
                  .map((p) => (
                    <a key={p.href} href={p.href}>
                      {p.display}
                    </a>
                  ))}
              </div>
            </div>

            <h4>Request a viewing</h4>
            <p className="fine">We’ll respond within one business day.</p>
            <EnquiryForm
              type="property"
              btn="Send enquiry"
              init={`Hi, I’m interested in “${l.title}” in ${l.loc}. Please share more details.`}
              fields={ENQUIRY_FIELDS}
            />
          </div>
        </aside>
      </section>

      <section className="w sec">
        <SectionHead title={`Similar properties in ${l.market}`} />
        <div className="grid g3">
          {sim.map((x) => (
            <ListingCard key={x.id} l={x} />
          ))}
        </div>
      </section>

      <div className="prx-mcta">
        <button onClick={goEnquire}>
          Request a viewing <ArrowRight size={16} />
        </button>
        <a href={SITE.phones[0].href}>
          <Phone size={16} /> Call
        </a>
      </div>
    </div>
  );
}