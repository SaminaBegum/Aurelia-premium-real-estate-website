import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  MapPin, BedDouble, Bath, Ruler, Building, Check, Phone, ArrowRight,
  Waves, Dumbbell, Trees, Baby, Users, Car, ShieldCheck, Zap, Trophy, Film, Building2,
  ChevronLeft, ChevronRight, X, Images,
} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHead } from '@/components/ui/SectionHead';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ListingCard } from '@/components/ListingCard';
import { MortgageCalculator } from '@/components/MortgageCalculator';
import { getListing, getSimilarListings } from '@/api/api';
import { listings } from '@/data/listings';
import { ENQUIRY_FIELDS } from '@/data/forms';
import { SITE } from '@/data/site';
import { A } from '@/lib/assets';
import { money } from '@/lib/format';
import { useLocationContext } from '@/contexts/LocationContext';

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

/* ---------- Gallery (photo mosaic + lightbox) ---------- */
.prx .gx-mosaic{position:relative;display:grid;gap:.7rem;height:clamp(300px,42vw,500px);border-radius:16px;overflow:hidden}
.prx .gx-tile{position:relative;padding:0;border:0;background:#e9e4d8;cursor:pointer;overflow:hidden;display:block;min-height:0}
.prx .gx-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.prx .gx-tile:hover img{transform:scale(1.06)}
.prx .gx-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(0,0,0,.25));opacity:0;transition:opacity .3s}
.prx .gx-tile:hover::after{opacity:1}
.prx .gx-more{position:absolute;inset:0;z-index:1;display:grid;place-items:center;background:rgba(0,0,0,.55);color:#fff;
  font-size:1.5rem;font-weight:600;letter-spacing:.02em;backdrop-filter:blur(2px)}
.prx .gx-all{position:absolute;right:1rem;bottom:1rem;z-index:2;display:inline-flex;align-items:center;gap:.5rem;
  padding:.65rem 1.1rem;border-radius:99px;border:1px solid rgba(255,255,255,.6);background:rgba(0,0,0,.72);
  color:#fff;font-weight:500;font-size:.9rem;cursor:pointer;backdrop-filter:blur(6px);transition:background .25s,border-color .25s}
.prx .gx-all:hover{background:var(--g);border-color:var(--g)}

/* layouts by number of tiles shown */
.prx .gx-m1{grid-template-columns:1fr}
.prx .gx-m2{grid-template-columns:1fr 1fr}
.prx .gx-m3{grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr}
.prx .gx-m3 .gx-tile:first-child{grid-row:1/3}
.prx .gx-m4{grid-template-columns:2fr 1fr;grid-template-rows:repeat(3,1fr)}
.prx .gx-m4 .gx-tile:first-child{grid-row:1/4}
.prx .gx-m5{grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr}
.prx .gx-m5 .gx-tile:first-child{grid-row:1/3}

@media(max-width:720px){
  .prx .gx-mosaic{height:auto}
  .prx .gx-m2,.prx .gx-m3,.prx .gx-m4,.prx .gx-m5{grid-template-columns:1fr 1fr;grid-template-rows:none}
  .prx .gx-mosaic .gx-tile{aspect-ratio:4/3}
  .prx .gx-mosaic .gx-tile:first-child{grid-column:1/3;grid-row:auto;aspect-ratio:16/10}
  .prx .gx-m1 .gx-tile{aspect-ratio:16/10}
  .prx .gx-all{right:.6rem;bottom:.6rem;font-size:.8rem;padding:.5rem .85rem}
}

/* lightbox */
.prx .gx-lb{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.94);display:flex;flex-direction:column;
  animation:gxFade .25s ease both}
@keyframes gxFade{from{opacity:0}to{opacity:1}}
.prx .gx-lb-top{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.4rem;color:#fff;font-size:.95rem}
.prx .gx-lb-top span{color:var(--g2);letter-spacing:.06em}
.prx .gx-lb-x,.prx .gx-lb-nav{display:grid;place-items:center;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);
  color:#fff;border-radius:50%;cursor:pointer;transition:background .25s,border-color .25s}
.prx .gx-lb-x{width:42px;height:42px}
.prx .gx-lb-x:hover,.prx .gx-lb-nav:hover{background:var(--g);border-color:var(--g);color:#000}
.prx .gx-lb-stage{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 4.5rem}
.prx .gx-lb-stage img{max-width:100%;max-height:100%;border-radius:10px;box-shadow:0 30px 80px -20px rgba(0,0,0,.8)}
.prx .gx-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px}
.prx .gx-lb-nav.p{left:1rem}
.prx .gx-lb-nav.n{right:1rem}
.prx .gx-lb-strip{display:flex;gap:.55rem;overflow-x:auto;padding:1rem 1.2rem 1.2rem;justify-content:safe center;scrollbar-width:thin}
.prx .gx-lb-strip button{flex:none;width:84px;height:58px;padding:0;border-radius:8px;overflow:hidden;border:2px solid transparent;
  background:#222;cursor:pointer;opacity:.55;transition:opacity .25s,border-color .25s}
.prx .gx-lb-strip button.on{opacity:1;border-color:var(--g)}
.prx .gx-lb-strip img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:720px){
  .prx .gx-lb-stage{padding:0 .5rem}
  .prx .gx-lb-nav{width:40px;height:40px}
  .prx .gx-lb-nav.p{left:.4rem}
  .prx .gx-lb-nav.n{right:.4rem}
  .prx .gx-lb-strip button{width:64px;height:46px}
}

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

/* ====================================================================
   Photo gallery: 1 big + up to 4 small tiles in an equal-height grid,
   "+N" overlay on the last tile, and a full-screen lightbox
   (arrows, keyboard, thumbnails) for the rest.
   ==================================================================== */
function PropertyGallery({ imgs, alt }: { imgs: string[]; alt: string }) {
  const photos = (imgs || []).map((s) => A(s));
  const [lb, setLb] = useState<number | null>(null);

  const close = useCallback(() => setLb(null), []);
  const step = useCallback(
    (d: number) =>
      setLb((i) => (i === null || !photos.length ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  // keyboard + body scroll lock while lightbox is open
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lb, close, step]);

  if (!photos.length) return null;

  const shown = photos.slice(0, 5);
  const extra = photos.length - shown.length;

  return (
    <>
      <div className={`gx-mosaic gx-m${shown.length}`}>
        {shown.map((src, i) => (
          <button
            key={src + i}
            className="gx-tile"
            onClick={() => setLb(i)}
            aria-label={`Open photo ${i + 1}`}
          >
            <img src={src} alt={`${alt} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
            {i === shown.length - 1 && extra > 0 && <span className="gx-more">+{extra}</span>}
          </button>
        ))}
        {photos.length > 1 && (
          <button className="gx-all" onClick={() => setLb(0)}>
            <Images size={16} /> View all {photos.length} photos
          </button>
        )}
      </div>

      {lb !== null && (
        <div
          className="gx-lb"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} gallery`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="gx-lb-top" onClick={(e) => e.stopPropagation()}>
            <span>
              {alt} · {lb + 1} / {photos.length}
            </span>
            <button className="gx-lb-x" onClick={close} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="gx-lb-stage" onClick={(e) => e.target === e.currentTarget && close()}>
            {photos.length > 1 && (
              <button className="gx-lb-nav p" onClick={() => step(-1)} aria-label="Previous">
                <ChevronLeft size={24} />
              </button>
            )}

            <img key={photos[lb]} src={photos[lb]} alt={`${alt} ${lb + 1}`} />

            {photos.length > 1 && (
              <button className="gx-lb-nav n" onClick={() => step(1)} aria-label="Next">
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {photos.length > 1 && (
            <div className="gx-lb-strip" onClick={(e) => e.stopPropagation()}>
              {photos.map((src, i) => (
                <button
                  key={src + i}
                  className={i === lb ? 'on' : ''}
                  onClick={() => setLb(i)}
                  aria-label={`Go to photo ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function PropertyDetail() {
  const { id = '' } = useParams();
  const { market } = useLocationContext();
  const navigate = useNavigate();

  // Find listing strictly belonging to the currently active market
  const exact = useMemo(() => listings.find((item) => item.id === id && item.market === market), [id, market]);

  // If not found in active market, check if this ID belongs to the previous market to find an equivalent
  const prevL = useMemo(() => (!exact ? listings.find((item) => item.id === id) : undefined), [exact, id]);

  const equivL = useMemo(() => {
    if (!prevL) return undefined;
    const targetListings = listings.filter((item) => item.market === market);
    if (!targetListings.length) return undefined;
    return (
      targetListings.find((item) => item.dev.toLowerCase() === prevL.dev.toLowerCase()) ||
      targetListings.find(
        (item) => item.category === prevL.category && item.type.toLowerCase() === prevL.type.toLowerCase()
      ) ||
      targetListings.find((item) => item.category === prevL.category) ||
      targetListings[0]
    );
  }, [prevL, market]);

  const l = exact || equivL;

  // Sync route if viewing an equivalent listing in the new market
  useEffect(() => {
    if (!exact && prevL) {
      if (equivL) {
        navigate(`/properties/${equivL.id}`, { replace: true });
      } else {
        navigate('/properties', { replace: true });
      }
    }
  }, [exact, prevL, equivL, navigate]);

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
        <PropertyGallery imgs={l.gallery} alt={l.title} />
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
                  .filter((p) => (l.market === 'Pune' ? p.label === 'India' : p.label === 'UAE'))
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
        <a href={(l.market === 'Pune' ? SITE.phones[0] : SITE.phones[1]).href}>
          <Phone size={16} /> Call
        </a>
      </div>
    </div>
  );
}