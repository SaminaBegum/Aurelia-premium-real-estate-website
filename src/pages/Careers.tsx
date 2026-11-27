import React from 'react';
import { MapPin } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { EnquiryForm } from '@/components/EnquiryForm';
import { jobs } from '@/data/careers';
import { CAREER_FIELDS } from '@/data/forms';

export default function Careers() {
  return (
    <>
      <InnerPageBanner
        eyebrow="Careers"
        title="Build your career with Aurelia"
        sub="Join a growing team serving clients in Pune and Dubai."
        img="office.jpg"
        crumbs={[['Home', '/'], ['Careers']]}
      />

      <section className="w sec two">
        <div>
          <h2>Open positions</h2>
          <div className="jobs">
            {jobs.map(([t, l, ty]) => (
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