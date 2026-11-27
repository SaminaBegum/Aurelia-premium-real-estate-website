import { useEffect, useState } from 'react';

export function useScrollProgress() {
  const [s, setS] = useState({ y: 0, pct: 0 });

  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setS({
        y: window.scrollY,
        pct: h > 0 ? (window.scrollY / h) * 100 : 0,
      });
    };

    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return s;
}