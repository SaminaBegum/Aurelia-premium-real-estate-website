import {useCallback,useEffect,useRef,useState} from 'react';
export function useSlideshow(length:number,ms=7500){
  const [i,setI]=useState(0);
  const timerRef=useRef<ReturnType<typeof setInterval>|null>(null);

  const restart=useCallback(()=>{
    if(timerRef.current)clearInterval(timerRef.current);
    timerRef.current=setInterval(()=>setI(x=>(x+1)%length),ms);
  },[length,ms]);

  useEffect(()=>{
    restart();
    return()=>{if(timerRef.current)clearInterval(timerRef.current)};
  },[restart]);

  const go=useCallback((idx:number)=>{
    setI(idx);
    restart();
  },[restart]);

  return [i,go] as const;
}
