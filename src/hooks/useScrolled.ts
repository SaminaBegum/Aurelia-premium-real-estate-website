import {useEffect,useState} from 'react';
export const useScrolled=(px=30)=>{const [s,setS]=useState(false);useEffect(()=>{const f=()=>setS(window.scrollY>px);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[px]);return s};
