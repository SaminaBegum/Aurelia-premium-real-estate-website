import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLocationContext } from '@/contexts/LocationContext';
import type { Market } from '@/data/types';

const IndiaFlag = () => (
  <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px', boxShadow: '0 0 1px rgba(0,0,0,0.3)', flexShrink: 0 }}>
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="54" fill="none" stroke="#000088" strokeWidth="8" />
    <circle cx="320" cy="240" r="14" fill="#000088" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="320"
        y1="240"
        x2={320 + 50 * Math.cos((i * Math.PI) / 12)}
        y2={240 + 50 * Math.sin((i * Math.PI) / 12)}
        stroke="#000088"
        strokeWidth="4"
      />
    ))}
  </svg>
);

const UaeFlag = () => (
  <svg width="20" height="15" viewBox="0 0 640 480" style={{ borderRadius: '2px', boxShadow: '0 0 1px rgba(0,0,0,0.3)', flexShrink: 0 }}>
    <path fill="#00732f" d="M0 0h640v160H0z" />
    <path fill="#ffffff" d="M0 160h640v160H0z" />
    <path fill="#000000" d="M0 320h640v160H0z" />
    <path fill="#ff0000" d="M0 0h160v480H0z" />
  </svg>
);

const OPTIONS = [
  { key: 'Dubai', label: 'Dubai', market: 'Dubai' as Market, Flag: UaeFlag },
  { key: 'India', label: 'Pune', market: 'Pune' as Market, Flag: IndiaFlag },
] as const;

interface CountrySelectorProps {
  className?: string;
  isMobile?: boolean;
}

export default function CountrySelector({ className = '', isMobile = false }: CountrySelectorProps) {
  const { market, setMarket } = useLocationContext();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const select = (opt: (typeof OPTIONS)[number]) => {
    setMarket(opt.market);
    setOpen(false);
  };

  const cur = OPTIONS.find(o => o.market === market) || OPTIONS[1];

  return (
    <div className={`country-sel-wrap ${className}`} ref={wrapRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="country-trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Select location, currently ${cur.label}`}
      >
        <cur.Flag />
        <span className="country-label">{cur.label}</span>
        <ChevronDown size={14} className={`country-arrow ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="country-dd" role="listbox" aria-label="Country options">
          {OPTIONS.map(opt => {
            const isSel = market === opt.market;
            return (
              <button
                key={opt.key}
                type="button"
                className={`country-opt ${isSel ? 'active' : ''}`}
                onClick={() => select(opt)}
                role="option"
                aria-selected={isSel}
              >
                <span className="country-opt-left">
                  <opt.Flag />
                  <span className="country-opt-name">{opt.label}</span>
                </span>
                {isSel && <Check size={14} className="country-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}