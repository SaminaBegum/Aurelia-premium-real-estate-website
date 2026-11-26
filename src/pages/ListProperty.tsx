import React from 'react';
import {Link} from 'react-router-dom';
import {Check} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {EnquiryForm} from '@/components/EnquiryForm';
import {LIST_PROPERTY_FIELDS} from '@/data/forms';
const BENEFITS=['Access to an exclusive network of qualified high-net-worth buyers','Professional photography and marketing','A dedicated consultant managing viewings and negotiations','Full support through contracts and title transfer'];
export default function ListProperty(){
  return <><InnerPageBanner eyebrow="Property owners & agents" title="Sell your property" sub="Submit your property details and our team will follow up to discuss valuation, marketing and next steps." img="dubai1.jpg" crumbs={[['Home','/'],['List Your Property']]}/>
    <section className="w sec two enq"><div><h2>Why list with Aurelia</h2><ul className="tick big">{BENEFITS.map(x=><li key={x}><Check size={18}/>{x}</li>)}</ul>
      <p>Looking for complete asset management? Visit <Link className="lk" to="/property-management">Property Management</Link>.</p></div>
      <div className="card"><EnquiryForm type="list-property" btn="Submit property" note="Our team will contact you shortly." fields={LIST_PROPERTY_FIELDS}/></div></section></>;
}
