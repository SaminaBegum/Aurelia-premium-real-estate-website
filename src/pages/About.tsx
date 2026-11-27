import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Quote } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import StatsSection from '@/components/home/StatsSection';
import { getDifferentiators, values } from '@/data/about';
import { getTestimonials } from '@/data/testimonials';
import { A } from '@/lib/assets';
import { useLocationContext } from '@/contexts/LocationContext';

const TESTIMONIAL_STYLES = `
.tst-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}
.tst-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(176, 141, 60, 0.25);
  border-radius: 16px;
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
}
.tst-card:hover {
  transform: translateY(-6px);
  border-color: rgba(176, 141, 60, 0.6);
  box-shadow: 0 20px 40px rgba(176, 141, 60, 0.12);
}
.tst-stars {
  display: flex;
  gap: 4px;
  color: #b08d3c;
  margin-bottom: 16px;
}
.tst-quote {
  font-size: 15px;
  line-height: 1.65;
  color: #334155;
  margin: 0 0 20px;
  font-style: italic;
}
.tst-author {
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.tst-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 15px;
}
.tst-role {
  font-size: 13px;
  color: #64748b;
}
.tst-proj {
  font-size: 12px;
  color: #b08d3c;
  font-weight: 600;
  margin-top: 2px;
}
`;

export default function About() {
  const { market, isPune } = useLocationContext();
  const diffs = getDifferentiators(market);
  const clientTestimonials = getTestimonials(market);

  return (
    <>
      <style>{TESTIMONIAL_STYLES}</style>
      <InnerPageBanner
        eyebrow="Who we are"
        title="Beyond Properties. Beyond Expectations."
        sub={
          isPune
            ? 'Aurelia is a premier real estate advisory firm serving Pune and Maharashtra.'
            : 'Aurelia is a premier real estate advisory firm serving Dubai and the UAE.'
        }
        img={isPune ? 'office.jpg' : 'hero.jpg'}
        crumbs={[['Home', '/'], ['Who We Are']]}
      />

      <section className="w sec about">
        <Reveal>
          <img src={A(isPune ? 'office.jpg' : 'dubai3.jpg')} alt="Aurelia office" />
        </Reveal>

        <Reveal d={100}>
          <small className="eb">Our story</small>
          <h2>{isPune ? 'Pune Real Estate, Handled' : 'Dubai Real Estate, Handled'}</h2>
          <p>
            {isPune
              ? 'Aurelia was founded to bring institutional standards, complete transparency, and end-to-end guidance to Pune’s luxury residential and Grade-A commercial property market. We partner only with Pune’s top RERA-registered developers whose delivery track records we trust, guiding every client from first search to final possession and registration.'
              : 'Aurelia was founded to guide international and local buyers through Dubai’s dynamic property landscape with total clarity. We partner directly with Dubai’s leading master developers, ensuring direct developer pricing, government escrow protections, and seamless support from reservation to title deed handover.'}
          </p>
          <p>
            {isPune
              ? 'Whether you’re purchasing a home in Baner or Balewadi, investing in a commercial bare-shell office in Hinjewadi, or managing an NRI property portfolio, our promise is the same: we handle the process so you can focus on the outcome.'
              : 'Whether you’re acquiring an off-plan waterfront villa, expanding a high-yield residential portfolio, or applying for a UAE Golden Visa, our promise is the same: we handle the process so you can focus on the outcome.'}
          </p>
          <div className="vals">
            {values.map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <div className="row">
            <Link className="btn" to="/team">
              Meet the team
            </Link>
            <Link className="btn-o" to="/contact-us">
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="w sec">
        <Reveal>
          <SectionHead
            eyebrow="What sets us apart"
            title={
              isPune
                ? 'Built to handle every stage of your Pune journey'
                : 'Built to handle every stage of your Dubai journey'
            }
          />
        </Reveal>

        <div className="sv sv4">
          {diffs.map(([t, x], k) => (
            <Reveal key={t} d={k * 60}>
              <div className="svc">
                <Check size={26} />
                <h3>{t}</h3>
                <p>{x}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Location-Specific Testimonials Section */}
      <section className="w sec">
        <Reveal>
          <SectionHead
            eyebrow="Testimonials"
            title={
              isPune
                ? 'What our Pune clients say'
                : 'What our Dubai clients say'
            }
            sub={
              isPune
                ? 'Trusted by homebuyers, IT leaders, and NRI investors across Pune.'
                : 'Trusted by global investors, high-net-worth families, and business leaders across Dubai.'
            }
          />
        </Reveal>

        <div className="tst-grid">
          {clientTestimonials.map((item, k) => (
            <Reveal key={item.id} d={k * 70}>
              <div className="tst-card">
                <div>
                  <div className="tst-stars">
                    {Array.from({ length: item.rating }).map((_, starIdx) => (
                      <Star key={starIdx} size={16} fill="#b08d3c" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="tst-quote">“{item.quote}”</p>
                </div>
                <div className="tst-author">
                  <span className="tst-name">{item.name}</span>
                  <span className="tst-role">{item.role} · {item.location}</span>
                  {item.project && <span className="tst-proj">{item.project}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsSection />
    </>
  );
}
