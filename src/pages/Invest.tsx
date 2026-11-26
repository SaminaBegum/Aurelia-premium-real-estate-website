import React from 'react';
import {TrendingUp,Globe,ShieldCheck} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {Reveal} from '@/components/ui/Reveal';
import {SectionHead} from '@/components/ui/SectionHead';
import {CtaBanner} from '@/components/CtaBanner';
import {MortgageCalculator} from '@/components/MortgageCalculator';
import {investCards} from '@/data/invest';
const ICONS={TrendingUp,Globe,ShieldCheck};
export default function Invest(){
  return <><InnerPageBanner eyebrow="Invest" title="Invest with confidence" sub="High-ROI markets, transparent numbers, expert advisory." img="dubai3.jpg" crumbs={[['Home','/'],['Invest']]}/>
    <section className="w sec"><div className="sv">{investCards.map(([t,d,ic],k)=>{const C=ICONS[ic];return <Reveal key={t} d={k*80}><div className="svc"><C size={30}/><h3>{t}</h3><p>{d}</p></div></Reveal>})}</div></section>
    <section className="w sec two"><div><SectionHead eyebrow="Plan ahead" title="Know your numbers before you buy"/><p>Estimate your monthly payment for a Pune or Dubai purchase. Adjust price, down payment, interest rate and tenure to see what fits.</p></div><div className="card"><MortgageCalculator amt={10000000} cur="₹" rate={8.5} title="Pune purchase (₹)"/></div></section>
    <section className="w sec two"><div className="card"><MortgageCalculator amt={1500000} cur="AED" rate={4.5} title="Dubai purchase (AED)"/></div><div><p>Dubai mortgage terms differ for residents and non-residents. Our advisors can explain current down-payment rules and lender options.</p></div></section>
    <CtaBanner title="Talk to an investment advisor" label="Book a consultation"/></>;
}
