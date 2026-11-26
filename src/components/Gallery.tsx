import React,{useState} from 'react';
import {A} from '@/lib/assets';
import {Lightbox} from '@/components/ui/Lightbox';
import type {ProjectVideo} from '@/data/types';

export type MediaItem=string|ProjectVideo;

function ytThumb(id:string){return`https://img.youtube.com/vi/${id}/hqdefault.jpg`;}
function mediaSrc(m:MediaItem):string{
  if(typeof m==='string')return A(m);
  if(m.kind==='youtube'&&m.id)return ytThumb(m.id);
  if(m.kind==='mp4'&&m.url)return m.url;
  return '';
}
function isVideo(m:MediaItem):boolean{return typeof m!=='string';}

export function Gallery({imgs,videos=[],alt}:{imgs:string[];videos?:ProjectVideo[];alt:string}){
  const [i,setI]=useState<number|null>(null);
  const media:MediaItem[]=[...imgs,...videos];
  if(!media.length)return null;
  return <><div className="gal">{media.map((m,k)=>{
    const isVid=isVideo(m);
    return(
      <button key={k} className={k===0?'big':''} onClick={()=>setI(k)} aria-label={isVid?`Play video ${k+1}`:`Open image ${k+1}`} style={{position:'relative'}}>
        <img src={mediaSrc(m)} alt={`${alt} ${k+1}`} loading="lazy"/>
        {isVid&&<span className="vid-play" aria-hidden="true">▶</span>}
      </button>
    );
  })}</div><Lightbox media={media} i={i} set={setI}/></>;
}
