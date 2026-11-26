import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {Reveal} from '@/components/ui/Reveal';
import {SectionHead} from '@/components/ui/SectionHead';
import {EnquiryForm} from '@/components/EnquiryForm';
import {ContactInfo} from '@/components/ContactInfo';
import {managementSteps} from '@/data/management';
import {NAME_FIELDS,MESSAGE_FIELD} from '@/data/forms';
export default function PropertyManagement(){
  return <><InnerPageBanner eyebrow="For landlords" title="Peace of mind for landlords" sub="We have your rental property under control — from tenant sourcing to maintenance and rent collection, we handle the day-to-day so you don’t have to." img="interior.jpg" crumbs={[['Home','/'],['Property Management']]}/>
    <section className="w sec"><Reveal><SectionHead eyebrow="Our process" title="How we manage your investment"/></Reveal>
      <div className="steps">{managementSteps.map(([t,d],k)=><Reveal key={t} d={k*70}><div className="stp"><b>{k+1}</b><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></section>
    <section className="w sec two enq"><div><small className="eb">Get started</small><h2>Speak to our property management team</h2><p>Reach out for a free rental valuation, or leave your details and we’ll call you back.</p><ContactInfo/></div>
      <div className="card"><EnquiryForm type="management" btn="Send message" fields={[...NAME_FIELDS,MESSAGE_FIELD]}/></div></section></>;
}
