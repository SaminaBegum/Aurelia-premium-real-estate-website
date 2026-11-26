import React,{useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {MapPin,Phone,Check} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import {Breadcrumbs} from '@/components/ui/Breadcrumbs';
import {SectionHead} from '@/components/ui/SectionHead';
import {Gallery} from '@/components/Gallery';
import {FloorPlan} from '@/components/FloorPlan';
import {EnquiryForm} from '@/components/EnquiryForm';
import {getProject} from '@/api/api';
import {PAYMENT_PLANS} from '@/data/paymentPlans';
import {ENQUIRY_FIELDS} from '@/data/forms';
import {SITE} from '@/data/site';
import {A} from '@/lib/assets';
import {startPrice,unit} from '@/lib/format';

const SECTIONS=[['overview','Overview'],['gallery','Gallery'],['floor-plans','Floor Plans'],['location','Location'],['amenities','Amenities'],['payment-plan','Payment Plan'],['enquire','Enquire']];
export default function ProjectDetail(){
  const {id=''}=useParams();const p=getProject(id);
  const [fb,setFb]=useState(0),[pl,setPl]=useState(0),[act,setAct]=useState('overview');
  useEffect(()=>{setFb(0);setPl(0)},[id]);
  useEffect(()=>{if(!p)return;const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setAct(e.target.id)),{rootMargin:'-35% 0px -55% 0px'});
    SECTIONS.forEach(([s])=>{const el=document.getElementById(s);el&&o.observe(el)});return()=>o.disconnect()},[id]);
  if(!p)return <InnerPageBanner title="Project not found" crumbs={[['Home','/'],['Off-Plan Projects','/exclusive-projects']]}><Link className="btn gold" to="/exclusive-projects">Browse projects</Link></InnerPageBanner>;
  const go=(s:string)=>document.getElementById(s)?.scrollIntoView({behavior:'smooth',block:'start'});
  const u=unit(p),bed=p.beds[fb],[lat,lng]=p.coords;
  return <>
    <section className="ph pd" style={{'--bg':`url(${A(p.img)})`} as React.CSSProperties}><div className="w"><Breadcrumbs items={[['Home','/'],['Off-Plan Projects','/exclusive-projects'],[p.name]]}/><small>{p.dev}</small><h1>{p.name}</h1><p><MapPin size={16}/> {p.loc}</p><button className="btn gold" onClick={()=>go('enquire')}>Register Your Interest</button></div></section>
    <div className="sub-n"><div className="w">{SECTIONS.map(([s,t])=><button key={s} className={act===s?'on':''} onClick={()=>go(s)}>{t}</button>)}</div></div>
    <section id="overview" className="w sec two"><div><small className="eb">About</small><h2>{p.name}</h2><blockquote>“{p.quote}”</blockquote>
        {(()=>{
          const hasCfg = p.desc.includes('Configurations & Indicative Price:');
          const [aboutTxt, cfgTxt] = hasCfg ? p.desc.split('Configurations & Indicative Price:') : [p.desc, ''];
          const items = cfgTxt ? cfgTxt.split('|').map(s=>s.trim().replace(/\.$/, '')).filter(Boolean) : [];
          return (
            <>
              <p>{aboutTxt.trim()}</p>
              {items.length > 0 && (
                <div style={{marginTop:'1.5rem',padding:'1.1rem 1.3rem',background:'rgba(0,0,0,0.04)',border:'1px solid rgba(176,141,60,0.35)',borderRadius:'8px'}}>
                  <h4 style={{fontSize:'0.82rem',textTransform:'uppercase',letterSpacing:'0.06em',color:'#b08d3c',marginBottom:'0.75rem',fontWeight:600}}>Configurations & Indicative Price</h4>
                  <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    {items.map((item, idx) => {
                      const cIdx = item.indexOf(':');
                      if (cIdx > -1) {
                        const cfg = item.slice(0, cIdx).trim();
                        const prc = item.slice(cIdx + 1).trim();
                        return (
                          <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'0.5rem',paddingBottom:'0.4rem',borderBottom:idx < items.length - 1 ? '1px dashed rgba(0,0,0,0.12)' : 'none'}}>
                            <span style={{color:'#1e293b',fontSize:'0.92rem',fontWeight:500}}>{cfg}</span>
                            <span style={{color:'#b08d3c',fontSize:'0.92rem',fontWeight:600}}>{prc}</span>
                          </div>
                        );
                      }
                      return <div key={idx} style={{color:'#1e293b',fontSize:'0.92rem'}}>{item}</div>;
                    })}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
      <div className="facts"><div><span>Starting price</span><b>{startPrice(p)}</b></div><div><span>Completion</span><b>{p.done}</b></div>
        {p.sold>0&&<div><span>Sales progress</span><b>{p.sold}% sold</b><i className="bar"><i style={{width:p.sold+'%'}}/></i></div>}<div><span>Property type</span><b>{p.type} · {p.bhk}</b></div></div></section>
    <section id="gallery" className="w sec"><SectionHead eyebrow="Gallery" title={`${p.name} in pictures`}/><Gallery imgs={p.gallery} videos={p.videos} alt={p.name}/></section>
    <section id="floor-plans" className="w sec"><SectionHead eyebrow="Layouts" title={`${p.name} floor plans`} sub="Indicative layouts. Detailed plans are shared on request."/>
      <div className="tabs">{p.beds.map((b,k)=><button key={b} className={k===fb?'on':''} onClick={()=>setFb(k)}>{b} {u}</button>)}</div>
      <div className="fps">{[0,1,2].map(n=><figure key={bed+'-'+n}><FloorPlan beds={bed} n={n}/><figcaption>{bed} {u} — Layout {n+1}</figcaption></figure>)}</div></section>
    <section id="location" className="w sec"><SectionHead eyebrow="Location" title={p.loc}/><div className="loc">
      <iframe title="Map" loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng-.03}%2C${lat-.02}%2C${lng+.03}%2C${lat+.02}&layer=mapnik&marker=${lat}%2C${lng}`}/>
      <div><ul className="tick">{p.near.map(n=><li key={n}><Check size={16}/>{n}</li>)}</ul><p className="fine">Approximate drive times.</p><button className="btn" onClick={()=>go('enquire')}>Ask about this location</button></div></div></section>
    <section id="amenities" className="w sec"><SectionHead eyebrow="Lifestyle" title={`${p.name} amenities`}/><div className="am">{p.amenities.map(a=><div key={a}><Check size={18}/>{a}</div>)}</div></section>
    <section id="payment-plan" className="w sec"><SectionHead eyebrow="Payment plan" title={`${p.name} payment plan`} sub="Indicative plans. Final terms are confirmed by the developer."/>
      <div className="tabs">{PAYMENT_PLANS.map((x,k)=><button key={x.k} className={k===pl?'on':''} onClick={()=>setPl(k)}>{x.k}</button>)}</div>
      <div className="pp">{PAYMENT_PLANS[pl].rows.map(([t,v])=><div key={t}><b>{v}</b><span>{t}{t==='On completion'?` — ${p.done}`:''}</span></div>)}</div></section>
    <section id="enquire" className="w sec two enq"><div><small className="eb">Register interest</small><h2>Get the full details on {p.name}</h2><p>Share your details and our team will follow up with floor plans, pricing and the latest availability.</p>
      <p className="cl"><Phone size={16}/> {SITE.phones.map((x,i)=><React.Fragment key={x.href}>{i>0&&' · '}<a href={x.href}>{x.display}</a></React.Fragment>)}</p></div>
      <div className="card"><EnquiryForm type="project" btn="Send enquiry" init={`Hi, please send me more details on ${p.name} in ${p.loc}.`} fields={ENQUIRY_FIELDS}/></div></section></>;
}
