import React from 'react';

/** Indicative schematic floor plan (replace with real plan images when available). */
export function FloorPlan({ beds, n = 0 }: { beds: number; n?: number }) {
  const b = Math.max(beds, 1);
  const h = 220 / b;

  const rooms: [string, number, number, number, number][] = [
    ['Living', 0, 0, 150, 120],
    ['Kitchen & Dining', 0, 120, 150, 100],
  ];

  for (let k = 0; k < b; k++) {
    rooms.push([`Bedroom ${k + 1}`, 150, k * h, 110, h]);
    rooms.push(['Bath', 260, k * h, 40, h]);
  }

  return (
    <svg viewBox="-6 -6 312 232" role="img" aria-label={`${beds} bedroom floor plan`}>
      <g transform={n % 2 ? 'translate(300,0) scale(-1,1)' : undefined}>
        {rooms.map(([t, x, y, w, hh], k) => (
          <rect
            key={k}
            x={x}
            y={y}
            width={w}
            height={hh}
            fill={t === 'Bath' ? '#e8e3d6' : '#fff'}
            stroke="#0C0C0D"
            strokeWidth="2"
          />
        ))}
        <rect x="-4" y="40" width="4" height="50" fill="#B4924A" />
      </g>

      {rooms.map(([t, x, y, w, hh], k) => {
        const X = n % 2 ? 300 - x - w / 2 : x + w / 2;
        return (
          <text
            key={k}
            x={X}
            y={y + hh / 2 + 3}
            textAnchor="middle"
            fontSize={t === 'Bath' ? 7 : 10}
            fill="#292A2D"
          >
            {t}
          </text>
        );
      })}
    </svg>
  );
}