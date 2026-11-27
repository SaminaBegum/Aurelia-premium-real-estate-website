import React from 'react';
import { MapPin } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { EnquiryForm } from '@/components/EnquiryForm';
import { getJobs } from '@/data/careers';
import { CAREER_FIELDS } from '@/data/forms';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Careers() {
  const { market, isPune } = useLocationContext();
  const currentJobs = getJobs(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Careers"
        title={isPune ? 'Build your career in Pune with Aurelia' : 'Build your career in Dubai with Aurelia'}
        sub={
          isPune
            ? 'Join a growing team serving premier clients and developers in Pune, Maharashtra.'
            : 'Join an international team serving high-net-worth investors and buyers in Dubai, UAE.'
        }
        img={isPune ? 'office.jpg' : 'dubai2.jpg'}
        crumbs={[['Home', '/'], ['Careers']]}
      />

      <section className="w sec two">
        <div>
          <h2>Open positions in {isPune ? 'Pune' : 'Dubai'}</h2>
          <div className="jobs">
            {currentJobs.map(([t, l, ty]) => (
              <div key={t}>
                <b>{t}</b>
                <span>
                  <MapPin size={14} />
                  {l}
                </span>
                <em>{ty}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Apply now</h3>
          <EnquiryForm
            type="career"
            btn="Submit application"
            note="We’ll review your application and get back to you."
            fields={CAREER_FIELDS}
          />
        </div>
      </section>
    </>
  );
}
