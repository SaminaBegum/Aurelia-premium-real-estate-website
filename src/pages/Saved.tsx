import React from 'react';
import { Link } from 'react-router-dom';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { ListingCard } from '@/components/ListingCard';
import { useSaved } from '@/contexts/SavedContext';
import { getListings } from '@/api/api';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Saved() {
  const { saved } = useSaved();
  const { market, isPune } = useLocationContext();
  const allSaved = getListings().filter((x) => saved.includes(x.id));
  const l = allSaved.filter((x) => x.market === market);

  return (
    <>
      <InnerPageBanner
        eyebrow="Your shortlist"
        title={isPune ? 'Saved Pune properties' : 'Saved Dubai properties'}
        sub={
          isPune
            ? 'Pune properties you’ve saved on this device.'
            : 'Dubai properties you’ve saved on this device.'
        }
        img={isPune ? 'interior.jpg' : 'dubai1.jpg'}
        crumbs={[['Home', '/'], ['Saved']]}
      />

      <section className="w sec">
        {l.length ? (
          <div className="grid g3">
            {l.map((x) => (
              <ListingCard key={x.id} l={x} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>No saved {market} properties yet</h3>
            <p>Tap the heart on any {isPune ? 'Pune' : 'Dubai'} property to save it here.</p>
            <Link className="btn" to={`/properties?market=${market}`}>
              Browse {isPune ? 'Pune' : 'Dubai'} properties
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
