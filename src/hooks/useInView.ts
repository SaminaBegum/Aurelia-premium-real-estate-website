import {RefObject,useEffect} from 'react';
/** Calls cb once when the element first becomes visible (or immediately if IntersectionObserver is unavailable). */
export function useInView(ref:RefObject<HTMLElement>,cb:()=>void,threshold=.1){
  useEffect(()=>{const el=ref.current;if(!el)return;if(!('IntersectionObserver' in window)){cb();return}
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){cb();o.disconnect()}},{threshold});o.observe(el);return()=>o.disconnect()},[]);
}
