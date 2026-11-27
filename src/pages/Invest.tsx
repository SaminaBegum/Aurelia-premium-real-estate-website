import React from 'react';
import { TrendingUp, Globe, ShieldCheck } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { CtaBanner } from '@/components/CtaBanner';
import { MortgageCalculator } from '@/components/MortgageCalculator';
import { getInvestCards } from '@/data/invest';
import { useLocationContext } from '@/contexts/LocationContext';

const ICONS = { TrendingUp, Globe, ShieldCheck };

export default function Invest() {
  const { market, isPune } = useLocationContext();
  const cards = getInvestCards(market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Invest"
        title={isPune ? 'Invest in Pune with confidence' : 'Invest in Dubai with confidence'}
        sub={
          isPune
            ? 'High-growth Pune IT corridors, steady commercial yields, and transparent advisory.'
            : 'High-ROI Dubai freehold markets, transparent numbers, and expert international advisory.'
        }
        img={isPune ? 'office.jpg' : 'dubai3.jpg'}
        crumbs={[['Home', '/'], ['Invest']]}
      />

      <section className="w sec">
        <div className="sv">
          {cards.map(([t, d, ic], k) => {
            const C = ICONS[ic];
            return (
              <Reveal key={t} d={k * 80}>
                <div className="svc">
                  <C size={30} />
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {isPune ? (
        <section className="w sec two">
          <div>
            <SectionHead eyebrow="Plan ahead" title="Calculate your Pune property investment" />
            <p>
              Estimate your monthly EMI for a residential or commercial purchase in Pune.
              Adjust property value, down payment, bank interest rate and loan tenure.
            </p>
            <p>
              Our Pune team coordinates with leading Indian lenders (HDFC, SBI, ICICI) to secure
              pre-approved home loans and preferential interest rates for our clients.
            </p>
          </div>
          <div className="card">
            <MortgageCalculator amt={15000000} cur="₹" rate={8.5} title="Pune purchase (₹)" />
          </div>
        </section>
      ) : (
        <section className="w sec two">
          <div className="card">
            <MortgageCalculator amt={2000000} cur="AED" rate={4.5} title="Dubai purchase (AED)" />
          </div>
          <div>
            <SectionHead eyebrow="Financing options" title="Dubai mortgage terms & eligibility" />
            <p>
              Dubai mortgage terms differ for UAE residents and non-residents. Foreign investors
              typically access financing up to 60-70% loan-to-value (LTV) from premier UAE banks.
            </p>
            <p>
              Our Dubai advisors guide you through developer payment plans (1% monthly, post-handover)
              and institutional mortgage options.
            </p>
          </div>
        </section>
      )}

      <CtaBanner
        title={isPune ? 'Talk to a Pune investment advisor' : 'Talk to a Dubai investment advisor'}
        label="Book a consultation"
      />
    </>
  );
}
