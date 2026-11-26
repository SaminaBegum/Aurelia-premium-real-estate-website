import React from 'react';
import { Link } from 'react-router-dom';
import { A } from '@/lib/assets';

export default function ContactCTA() {
  return (
    <section
      className="cta"
      style={{
        backgroundImage: `linear-gradient(rgba(12,12,13,.82),rgba(12,12,13,.82)),url(${A('office.jpg')})`,
      }}
    >
      <div className="w">
        <small>Own property in Pune or Dubai?</small>
        <h2>Sell or lease through a partner you can trust</h2>
        <p>
          List with Aurelia and let our team handle marketing, viewings, contracts and
          management.
        </p>
        <div className="row">
          <Link className="btn gold" to="/list-your-property">
            List Your Property
          </Link>
          <Link className="btn-o lt" to="/property-management">
            Explore Property Management
          </Link>
        </div>
      </div>
    </section>
  );
}