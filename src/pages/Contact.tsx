import React from 'react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {EnquiryForm} from '@/components/EnquiryForm';
import {ContactInfo} from '@/components/ContactInfo';
import {NAME_FIELDS,MESSAGE_FIELD} from '@/data/forms';
export default function Contact(){
  return <><InnerPageBanner eyebrow="Get in touch" title="We’d love to hear from you" sub="Whether you’re buying, selling or investing, send us a message and our team will reply within one business day." img="dubai2.jpg" crumbs={[['Home','/'],['Contact Us']]}/>
    <section className="w sec two enq"><div><h2>Our offices</h2><ContactInfo/></div><div className="card"><EnquiryForm type="contact" btn="Send message" fields={[...NAME_FIELDS,MESSAGE_FIELD]}/></div></section></>;
}
