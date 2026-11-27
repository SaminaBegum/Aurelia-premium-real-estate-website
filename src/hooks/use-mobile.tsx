import { useEffect, useState } from 'react';

/** True when the viewport is at or below the breakpoint (default 980px, where the nav becomes a drawer). */
export function useIsMobile(bp = 980) {
  const [m, setM] = useState(false);

  useEffect(() => {
    const q = window.matchMedia(`(max-width:${bp}px)`);
    const f = () => setM(q.matches);
    f();
    q.addEventListener('change', f);
    return () => q.removeEventListener('change', f);
  }, [bp]);

  return m;
}