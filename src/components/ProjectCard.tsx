import React from 'react';
import {Link} from 'react-router-dom';
import {MapPin} from 'lucide-react';
import type {Project} from '@/data/types';
import {A} from '@/lib/assets';
import {startPrice} from '@/lib/format';
export const ProjectCard=({p}:{p:Project})=><Link to={'/exclusive-projects/'+p.id} className="prc">
  <div className="prc-i"><img src={A(p.img)} alt={p.name} loading="lazy"/><span className="tag">{p.tag}</span>{p.sold>0&&<span className="sold">{p.sold}% Sold</span>}</div>
  <div className="prc-b"><div className="prc-h"><div><h3>{p.name}</h3><small><MapPin size={13}/> {p.loc}</small></div>{p.logo?<img className="dl" src={A(p.logo)} alt={p.dev}/>:<em className="wm">{p.dev}</em>}</div>
    {p.sold>0&&<div className="bar"><i style={{width:p.sold+'%'}}/></div>}
    <dl><div><dt>Starting from</dt><dd>{startPrice(p)}</dd></div><div><dt>Completion</dt><dd>{p.done}</dd></div></dl></div></Link>;
