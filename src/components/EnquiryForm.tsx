import React,{useState} from 'react';
import {Check} from 'lucide-react';
import type {Field} from '@/data/types';
import {submitEnquiry,EnquiryType} from '@/api/api';

interface Props{fields:Field[];btn:string;type?:EnquiryType;note?:string;init?:string}
/** Generic form: builds inputs from a field list and posts them through api/enquiries. */
export function EnquiryForm({fields,btn,type='contact',note='We’ll respond within one business day.',init=''}:Props){
  const [state,setState]=useState<'idle'|'sending'|'done'|'error'>('idle');
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();setState('sending');
    const data=Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string,string>;
    try{await submitEnquiry(type,data);setState('done')}catch(err){setState('error')}
  };
  if(state==='done')return <div className="ok"><Check size={22}/><p><b>Thank you!</b> {note}</p></div>;
  return <form className="form" onSubmit={onSubmit}>
    {fields.map(([label,t,opts,half])=>{
      const c=half?'half':'',req=!/optional/i.test(label);
      return <label key={label} className={c}><span>{label}</span>
        {t==='area'?<textarea name={label} required={req} rows={4} defaultValue={init}/>
        :t==='select'?<select name={label} required defaultValue=""><option value="" disabled>Select</option>{opts!.map(o=><option key={o}>{o}</option>)}</select>
        :<input name={label} required type={t}/>}</label>;
    })}
    {state==='error'&&<p className="err" role="alert">Something went wrong. Please try again or call us.</p>}
    <button className="btn" disabled={state==='sending'}>{state==='sending'?'Sending…':btn}</button>
  </form>;
}
