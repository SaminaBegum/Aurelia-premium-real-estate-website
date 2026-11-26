import React from 'react';
import {MapPin,Phone} from 'lucide-react';
import {SITE} from '@/data/site';
export const ContactInfo=()=><div className="info">
  {SITE.offices.map(o=><p key={o.city}><MapPin size={18}/><span><b>{o.city} Office</b>{o.address}</span></p>)}
  <p><Phone size={18}/><span><b>Phone</b>{SITE.phones.map((p,i)=><React.Fragment key={p.href}>{i>0&&<br/>}<a href={p.href}>{p.display}</a></React.Fragment>)}</span></p></div>;
