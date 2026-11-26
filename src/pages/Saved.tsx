import React from 'react';
import {Link} from 'react-router-dom';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {ListingCard} from '@/components/ListingCard';
import {useSaved} from '@/contexts/SavedContext';
import {getListings} from '@/api/api';
export default function Saved(){
  const {saved}=useSaved();const l=getListings().filter(x=>saved.includes(x.id));
  return <><InnerPageBanner eyebrow="Your shortlist" title="Saved properties" sub="Properties you’ve saved on this device." img="interior.jpg" crumbs={[['Home','/'],['Saved']]}/>
    <section className="w sec">{l.length?<div className="grid g3">{l.map(x=><ListingCard key={x.id} l={x}/>)}</div>
      :<div className="empty"><h3>No saved properties yet</h3><p>Tap the heart on any property to save it here.</p><Link className="btn" to="/properties">Browse properties</Link></div>}</section></>;
}
