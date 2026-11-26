import React, { useEffect, useRef, useState } from 'react';

/* Parrot-style gradients, made for the dark stats strip */
export const GRADS: [string, string][] = [
  ['#8CF5BC', '#2FB36D'], // parrot green
  ['#8AEAF5', '#17B3C4'], // sky teal
  ['#FFAE9C', '#E8553D'], // macaw coral
  ['#F5DE9B', '#B08D3C'], // gold
  ['#FFE49A', '#F5B82E'], // sunny yellow
  ['#A5C4FF', '#2F6FDE'], // sapphire
];

type Props = {
  v: string;
  /** index of the stat, picks a gradient automatically */
  i?: number;
  /** or pass your own two colors */
  from?: string;
  to?: string;
  /** font size of the number (any CSS value) */
  size?: string;
};

/** Animates a value like "500+" or "₹2,500 Cr+" from 0 when scrolled into view. */
export function Count({ v, i, from, to, size = 'clamp(1.75rem, 3vw, 2.75rem)' }: Props) {
  const m = String(v).match(/^(\D*)([\d,]+)(.*)$/);
  const target = m ? +m[2].replace(/,/g, '') : 0;
  const [n, setN] = useState(target);
  const r = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!m || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setN(0);
    let raf = 0;
    const o = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        o.disconnect();
        const t0 = performance.now();
        const f = (t: number) => {
          const p = Math.min(1, (t - t0) / 1500);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(f);
        };
        raf = requestAnimationFrame(f);
      },
      { threshold: 0.4 }
    );
    o.observe(r.current!);
    return () => {
      o.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [v]);

  const pair = from && to ? [from, to] : i !== undefined ? GRADS[i % GRADS.length] : null;
  const style: React.CSSProperties = {
    fontVariantNumeric: 'tabular-nums',
    fontSize: size,
    lineHeight: 1.1,
    display: 'inline-block',
    ...(pair && {
      backgroundImage: `linear-gradient(135deg, ${pair[0]} 0%, ${pair[1]} 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      filter: `drop-shadow(0 4px 18px ${pair[1]}55)`,
    }),
  };

  if (!m) return <span style={style}>{v}</span>;
  return (
    <span ref={r} style={style}>
      {m[1]}
      {n.toLocaleString('en-IN')}
      {m[3]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats strip section — now with proper top & bottom gap            */
/* ------------------------------------------------------------------ */

const STATS = [
  { v: '500+', label: 'Happy clients' },
  { v: '75+', label: 'Projects' },
  { v: '2', label: 'Markets: Pune & Dubai' },
  { v: '₹2,500 Cr+', label: 'Property value' },
  { v: '12+', label: 'Years of excellence' },
];

export function StatsStrip() {
  return (
    <section
      style={{
        background: '#2b2b2b',
        margin: '56px 0',        // 👈 gap above & below — no longer touching neighbours
        padding: '56px 0',       // 👈 inner breathing room
        borderRadius: 16,        // 👈 soft corners (remove if you want full-bleed)
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32,
          textAlign: 'center',
        }}
      >
        {STATS.map((s, idx) => (
          <div key={s.label}>
            <Count v={s.v} i={3} /> {/* i={3} = gold gradient like your screenshot */}
            <p
              style={{
                margin: '8px 0 0',
                color: '#e8e8e8',
                fontSize: '0.95rem',
                letterSpacing: '0.02em',
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}