import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Ruler, Building, Check } from 'lucide-react';
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


export default function PropertyDetail() {
  const { id = '' } = useParams();
  const l = getListing(id);
  if (!l) return <InnerPageBanner title="Property not found" crumbs={[['Home', '/'], ['Properties', '/properties']]}><Link className="btn gold" to="/properties">Browse properties</Link></InnerPageBanner>;

  const u = l.market === 'Pune' ? 'BHK' : 'Beds';
  const bedCountLabel = l.bhk || (l.beds > 0 ? `${l.beds} ${u}` : (l.type || 'Commercial'));
  const sim = getSimilarListings(l.id, l.market);

  return (
    <>
      <section className="ph sm">
        <div className="w">
          <Breadcrumbs items={[['Home', '/'], ['Properties', '/properties'], [l.title]]} />
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
          <p><MapPin size={16} /> {l.loc}{l.dev ? ` · ${l.dev}` : ''}</p>
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
            <span><BedDouble size={18} />{bedCountLabel}</span>
            <span><Bath size={18} />{l.baths} Baths</span>
            <span><Ruler size={18} />{l.areaText || `${l.area.toLocaleString('en-US')} sqft`}</span>
            <span><Building size={18} />{l.type}</span>
          </div>
          <h2>Description</h2>
          <p>{l.desc}</p>
          <h2>Amenities &amp; Features</h2>
          <div className="am">
            {l.amenities.map(a => <div key={a}><Check size={18} />{a}</div>)}
          </div>
          <h2>Plan your finances</h2>
          <MortgageCalculator amt={l.amt} cur={l.market === 'Pune' ? '₹' : 'AED'} rate={l.market === 'Pune' ? 8.5 : 4.5} />
        </div>
        <aside>
          <div className="box">
            <small>Starting Price</small>
            <h3>{money(l)}</h3>
            <div className="agent">
              <span>A</span>
              <div>
                <b>Aurelia Property Consultant</b>
                {SITE.phones.filter(p => p.label === 'India' || l.market === 'Dubai').map(p => <a key={p.href} href={p.href}>{p.display}</a>)}
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
          {sim.map(x => <ListingCard key={x.id} l={x} />)}
        </div>
      </section>
    </>
  );
}
