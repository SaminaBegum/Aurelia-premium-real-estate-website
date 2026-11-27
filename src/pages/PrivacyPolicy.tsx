import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { privacySections } from '@/data/privacy';

export default function PrivacyPolicy() {
  return (
    <>
      <InnerPageBanner
        title="Privacy Policy"
        sub="Last updated: 2026"
        crumbs={[['Home', '/'], ['Privacy Policy']]}
      />

      <section className="w sec narrow legal">
        {privacySections.map(([t, d]) => (
          <div key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
        <p className="fine">
          Replace this placeholder with your reviewed legal policy before launch.
        </p>
      </section>
    </>
  );
}