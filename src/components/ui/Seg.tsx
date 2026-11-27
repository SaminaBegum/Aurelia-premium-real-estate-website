import React from 'react';

export function Seg({
  v,
  set,
  opts,
}: {
  v: string;
  set: (v: string) => void;
  opts: string[][];
}) {
  return (
    <div className="seg" role="group">
      {opts.map(([k, t]) => (
        <button
          type="button"
          key={k}
          className={v === k ? 'on' : ''}
          onClick={() => set(k)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}