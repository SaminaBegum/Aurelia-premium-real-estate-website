import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { EnquiryForm } from '@/components/EnquiryForm';
import { ContactInfo } from '@/components/ContactInfo';
import { NAME_FIELDS, MESSAGE_FIELD } from '@/data/forms';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Contact() {
  const { isPune } = useLocationContext();

  return (
    <>
      <InnerPageBanner
        eyebrow="Get in touch"
        title={isPune ? 'Contact our Pune office' : 'Contact our Dubai office'}
        sub={
          isPune
            ? 'Whether you’re buying, selling or investing in Pune, send us a message and our Pune advisory team will reply within one business day.'
            : 'Whether you’re buying, selling or investing in Dubai, send us a message and our Dubai team will reply within one business day.'
        }
        img={isPune ? 'office.jpg' : 'dubai2.jpg'}
        crumbs={[['Home', '/'], ['Contact Us']]}
      />

      <section className="w sec two enq">
        <div>
          <h2>{isPune ? 'Our Pune office' : 'Our Dubai office'}</h2>
          <ContactInfo />
        </div>

        <div className="card">
          <EnquiryForm
            type="contact"
            btn="Send message"
            fields={[...NAME_FIELDS, MESSAGE_FIELD]}
          />
        </div>
      </section>
    </>
  );
}
