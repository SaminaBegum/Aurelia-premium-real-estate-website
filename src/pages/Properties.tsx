import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { ListingCard } from '@/components/ListingCard';
import { Seg } from '@/components/ui/Seg';
import { getListings } from '@/api/api';
import { BUY_BANDS, PROPERTY_TYPES } from '@/lib/constants';
import { filterListings, locationsFor, paginate, readFilters } from '@/lib/listingFilters';
import { fmtAed } from '@/lib/utils';
import { useLocationContext } from '@/contexts/LocationContext';

export default function Properties() {
  const [q, setQ] = useSearchParams();
  const [open, setOpen] = useState(false);
  const top = useRef<HTMLElement>(null);
  const { market, setMarket, isPune } = useLocationContext();

  const f = readFilters((k) => q.get(k) || '');
  // Always enforce the active location's market so content is completely separated
  f.market = market;

  const set = (o: Record<string, string | number>, keepPage = false) => {
    const n = new URLSearchParams(q);
    Object.entries(o).forEach(([k, v]) => (v ? n.set(k, String(v)) : n.delete(k)));
    n.set('market', market);
    if (!keepPage) n.delete('page');
    setQ(n, { replace: true, preventScrollReset: true });
  };

  useEffect(() => {
    if (q.get('market') && q.get('market') !== market) {
      const n = new URLSearchParams(q);
      n.set('market', market);
      setQ(n, { replace: true, preventScrollReset: true });
    }
  }, [market]);

  const list = useMemo(() => filterListings(f, getListings(market)), [q, market]);
  const pg = paginate(list, f.page);
  const bands = BUY_BANDS;

  const toggleType = (t: string) =>
    set({
      type: (f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t]).join(
        ',',
      ),
    });

  const goPage = (n: number) => {
    set({ page: n }, true);
    top.current?.scrollIntoView();
  };

  const priceSel = (label: string, key: 'min' | 'max', val: number) => (
    <label className="fg">
      <span>{label}</span>
      <select value={val || ''} onChange={(e) => set({ [key]: e.target.value })}>
        <option value="">{`No ${key}`}</option>
        {bands.map((o) => (
          <option key={o} value={o}>
            {isPune ? `₹ ${(o * 23 / 1e7).toFixed(1)} Cr` : fmtAed(o)}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <>
      <InnerPageBanner
        title={isPune ? 'Pune Properties for Sale' : 'Dubai Properties for Sale'}
        sub={
          isPune
            ? 'Verified luxury residential and commercial properties across Pune, India.'
            : 'Verified luxury residential and commercial properties across Dubai, UAE.'
        }
        img={isPune ? 'interior.jpg' : 'dubai1.jpg'}
        crumbs={[['Home', '/'], ['Properties']]}
      />

      <section className="w sec" ref={top}>
        <button className="btn-o fbtn" onClick={() => setOpen(!open)}>
          <SlidersHorizontal size={16} /> Filters
        </button>

        <div className={'fil' + (open ? ' open' : '')}>
          <div className="fg">
            <span>Market</span>
            <Seg
              v={market}
              set={(v) => {
                const target = v === 'Dubai' ? 'Dubai' : 'Pune';
                setMarket(target);
              }}
              opts={[
                ['Pune', 'Pune (India)'],
                ['Dubai', 'Dubai (UAE)'],
              ]}
            />
          </div>

          <div className="fg">
            <span>Property type</span>
            <div className="chk">
              {PROPERTY_TYPES.map((t) => (
                <label key={t}>
                  <input
                    type="checkbox"
                    checked={f.types.includes(t)}
                    onChange={() => toggleType(t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <label className="fg">
            <span>Location</span>
            <select value={f.loc} onChange={(e) => set({ loc: e.target.value })}>
              <option value="">Any location</option>
              {locationsFor(market).map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>

          <label className="fg">
            <span>Bedrooms</span>
            <select value={f.beds} onChange={(e) => set({ beds: e.target.value })}>
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((b) => (
                <option key={b} value={b}>
                  {b}
                  {b === 5 ? '+' : ''}
                </option>
              ))}
            </select>
          </label>

          {priceSel(isPune ? 'Min price' : 'Min price (AED)', 'min', f.min)}
          {priceSel(isPune ? 'Max price' : 'Max price (AED)', 'max', f.max)}

          <label className="fg">
            <span>Sort</span>
            <select value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
              <option value="new">Newest</option>
              <option value="lo">Price: Low to High</option>
              <option value="hi">Price: High to Low</option>
            </select>
          </label>

          <button className="lk reset" onClick={() => setQ({ market }, { replace: true })}>
            Reset all
          </button>
        </div>

        <p className="cnt">
          <b>{list.length}</b> {list.length === 1 ? 'property' : 'properties'} in {market}
          {isPune ? ' · prices in INR (₹ Crores & Lakhs)' : ' · prices in AED'}
        </p>

        <div className="grid g3">
          {pg.items.map((l) => (
            <ListingCard key={l.id} l={l} />
          ))}
        </div>

        {!list.length && (
          <div className="empty">
            <h3>No properties match these filters</h3>
            <p>Try widening your budget or location.</p>
            <button className="btn" onClick={() => setQ({ market }, { replace: true })}>
              Reset filters
            </button>
          </div>
        )}

        {pg.pages > 1 && (
          <div className="pager">
            <button
              disabled={pg.current < 2}
              onClick={() => goPage(pg.current - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: pg.pages }, (_, k) => (
              <button
                key={k}
                className={pg.current === k + 1 ? 'on' : ''}
                onClick={() => goPage(k + 1)}
              >
                {k + 1}
              </button>
            ))}

            <button
              disabled={pg.current >= pg.pages}
              onClick={() => goPage(pg.current + 1)}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
