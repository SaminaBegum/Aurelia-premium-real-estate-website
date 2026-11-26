import React from 'react';
import { stats } from '@/data/stats';
import { Count } from '@/components/ui/Count';

export default function StatsSection() {
  return (
    <section className="stats">
      <div className="w">
        {stats.map(([n, t]) => (
          <div key={t}>
            <b>
              <Count v={n} />
            </b>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}