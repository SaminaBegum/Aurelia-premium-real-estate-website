import React from 'react';
import {Link} from 'react-router-dom';
import {MapPin,BedDouble,Bath,Ruler,ArrowRight,Heart} from 'lucide-react';
import type {Listing} from '@/data/types';
import {A} from '@/lib/assets';
import {money} from '@/lib/format';
import {useSaved} from '@/contexts/SavedContext';

export function ListingCard({l}:{l:Listing}){
  const {has,toggle}=useSaved();
  const on=has(l.id);
  const bedLabel = l.bhk || (l.beds > 0 ? `${l.beds} ${l.market==='Pune'?'BHK':'Beds'}` : (l.type || 'Commercial'));

  return (
    <div className="lcw">
      <Link to={'/properties/'+l.id} className="lc">
        <div className="lc-i">
          <img src={A(l.img)} alt={l.title} loading="lazy"/>
          <span className="chip">{l.tag || 'For Sale'}</span>
        </div>
        <div className="lc-b">
          <small><MapPin size={13}/> {l.loc}{l.dev ? ` · ${l.dev}` : ''}</small>
          <h4>{l.title}</h4>
          <div className="lc-m">
            <span><BedDouble size={15}/>{bedLabel}</span>
            <span><Bath size={15}/>{l.baths} Baths</span>
            <span><Ruler size={15}/>{l.areaText || `${l.area.toLocaleString('en-US')} sqft`}</span>
          </div>
          <div className="lc-p">
            <b>{money(l)}</b>
            <i><ArrowRight size={15}/></i>
          </div>
        </div>
      </Link>
      <button
        className={'heart'+(on?' on':'')}
        aria-pressed={on}
        aria-label={on?'Remove from saved':'Save property'}
        onClick={()=>toggle(l.id)}
      >
        <Heart size={18}/>
      </button>
    </div>
  );
}
