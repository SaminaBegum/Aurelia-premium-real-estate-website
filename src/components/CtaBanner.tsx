import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
export const CtaBanner=({title='Talk to an Aurelia consultant',to='/contact-us',label='Get in touch'}:{title?:string;to?:string;label?:string})=>
  <section className="cta sm"><div className="w"><h2>{title}</h2><Link className="btn gold" to={to}>{label} <ArrowRight size={16}/></Link></div></section>;
