import React from 'react';
import { getStats } from '@/data/stats';
import { Count } from '@/components/ui/Count';
import { useLocationContext } from '@/contexts/LocationContext';

export default function StatsSection() {
  const { market } = useLocationContext();
  const activeStats = getStats(market);

  return (
    <section className="stats">
      <div className="w">
        {activeStats.map(([n, t]) => (
          <div key={`${market}-${t}`}>
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
