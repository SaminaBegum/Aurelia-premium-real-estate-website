import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { EnquiryForm } from '@/components/EnquiryForm';
import { LIST_PROPERTY_FIELDS } from '@/data/forms';
import { useLocationContext } from '@/contexts/LocationContext';

const BENEFITS_PUNE = [
  'Direct access to an exclusive network of qualified homebuyers and IT executives in Pune',
  'Professional architectural photography, 3D floor plans and high-reach digital marketing',
  'A dedicated local property consultant managing site viewings, buyer vetting, and price negotiations',
  'Full legal assistance through developer NOCs, agreement drafting, and sub-registrar registration',
];

const BENEFITS_DUBAI = [
  'Direct access to an exclusive network of qualified international high-net-worth investors',
  'Global multi-channel marketing across UAE, GCC, European, and Asian investment networks',
  'A dedicated Dubai consultant managing viewings, escrow compliance, and price negotiations',
  'Complete transfer facilitation through the Dubai Land Department (DLD) and Trustee offices',
];

export default function ListProperty() {
  const { isPune } = useLocationContext();
  const benefits = isPune ? BENEFITS_PUNE : BENEFITS_DUBAI;

  return (
    <>
      <InnerPageBanner
        eyebrow="Property owners & investors"
        title={isPune ? 'Sell your Pune property' : 'Sell your Dubai property'}
        sub={
          isPune
            ? 'Submit your Pune property details and our dedicated advisory team will follow up to discuss valuation, marketing and next steps.'
            : 'Submit your Dubai property details and our dedicated advisory team will follow up to discuss valuation, marketing and next steps.'
        }
        img={isPune ? 'office.jpg' : 'dubai1.jpg'}
        crumbs={[['Home', '/'], ['List Your Property']]}
      />

      <section className="w sec two enq">
        <div>
          <h2>Why list with Aurelia in {isPune ? 'Pune' : 'Dubai'}</h2>
          <ul className="tick big">
            {benefits.map((x) => (
              <li key={x}>
                <Check size={18} />
                {x}
              </li>
            ))}
          </ul>
          <p>
            Looking for complete rental management? Visit{' '}
            <Link className="lk" to="/property-management">
              Property Management
            </Link>
            .
          </p>
        </div>

        <div className="card">
          <EnquiryForm
            type="list-property"
            btn="Submit property"
            note="Our team will contact you shortly."
            fields={LIST_PROPERTY_FIELDS}
          />
        </div>
      </section>
    </>
  );
}
