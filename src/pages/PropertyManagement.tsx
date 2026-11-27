import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ContactInfo } from '@/components/ContactInfo';
import { getManagementSteps } from '@/data/management';
import { NAME_FIELDS, MESSAGE_FIELD } from '@/data/forms';
import { useLocationContext } from '@/contexts/LocationContext';

export default function PropertyManagement() {
  const { market, isPune } = useLocationContext();
  const steps = getManagementSteps(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="For landlords"
        title={isPune ? 'Peace of mind for Pune landlords' : 'Peace of mind for Dubai landlords'}
        sub={
          isPune
            ? 'We have your Pune rental property under control — verified IT tenant sourcing, leave & license deeds, rent collection, and routine maintenance.'
            : 'Turnkey property management in Dubai — RERA-compliant tenant vetting, Ejari registration, DEWA coordination, and maximum rental yields.'
        }
        img={isPune ? 'interior.jpg' : 'dubai1.jpg'}
        crumbs={[['Home', '/'], ['Property Management']]}
      />

      <section className="w sec">
        <Reveal>
          <SectionHead
            eyebrow="Our process"
            title={
              isPune
                ? 'How we manage your Pune property'
                : 'How we manage your Dubai investment'
            }
          />
        </Reveal>

        <div className="steps">
          {steps.map(([t, d], k) => (
            <Reveal key={t} d={k * 70}>
              <div className="stp">
                <b>{k + 1}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="w sec two enq">
        <div>
          <small className="eb">Get started</small>
          <h2>
            {isPune
              ? 'Speak to our Pune property management team'
              : 'Speak to our Dubai property management team'}
          </h2>
          <p>
            {isPune
              ? 'Reach out for a free rental valuation for your Pune home or commercial unit, or leave your details below.'
              : 'Reach out for an expert rental yield valuation of your Dubai property, or leave your details below.'}
          </p>
          <ContactInfo />
        </div>

        <div className="card">
          <EnquiryForm
            type="management"
            btn="Send message"
            fields={[...NAME_FIELDS, MESSAGE_FIELD]}
          />
        </div>
      </section>
    </>
  );
}
