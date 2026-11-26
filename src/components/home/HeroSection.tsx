import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { projects, HERO_PROJECT_IDS } from '@/data';
import { A } from '@/lib/assets';
import { LOCATIONS } from '@/lib/listingFilters';
import { BUY_BANDS, PROPERTY_TYPES } from '@/lib/constants';
import { fmtAed } from '@/lib/utils';
import { useSlideshow } from '@/hooks/useSlideshow';

// Map each hero project ID to its purpose-built, clean b-roll hero video.
// All URLs confirmed HTTP 200, video/mp4, no burned-in text or watermarks.
const HERO_VIDEOS: Record<string, string> = {
  'damac-lagoons':
    'https://videos.ctfassets.net/zoq5l15g49wj/5lT6VSTCWBTxDrNH1bRnLp/db2c7d1ae4447797505fb35a13ade904/Damac_island_Hero_video_16X9.mp4',
  'ghaf-woods':
    'https://d4.maf.ae/videos/ghafwoodslibraries/default-video-library/261029-maf-lyra-4k-mini(1).mp4',
  'lumena-omniyat':
    'https://cdn.prod.website-files.com/64cd0df1806781d956403b26/651712fc5af65256949fa279_opus-hero-d-transcode.mp4',
  'burj-binghatti-jacob-co':
    'https://binghattiweb.imgix.net/hero-desktop-new-1.mp4',
};

const SLIDES = HERO_PROJECT_IDS.map(id => projects.find(p => p.id === id)!).filter(Boolean);

export default function HeroSection() {
  const nav = useNavigate();
  const [i, go] = useSlideshow(SLIDES.length);
  const [f, setF] = useState({ loc: '', type: '', min: '', max: '' });
  const [more, setMore] = useState(false);
  const bands = BUY_BANDS;

  // One ref per slide so we can pause/play individual <video> elements.
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(SLIDES.map(() => null));

  // When the active slide index changes: pause all, then play the active one from 0.
  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      if (k === i) {
        v.currentTime = 0;
        v.play().catch(() => {/* autoplay policy – silent, muted so it always works */ });
      } else {
        v.pause();
      }
    });
  }, [i]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => v && q.set(k, v));
    nav('/properties?' + q);
  };

  return (
    <section className="hero">
      {SLIDES.map((s, k) => {
        const videoSrc = HERO_VIDEOS[s.id] ?? '';
        return (
          <div
            key={s.id}
            className={'hs' + (k === i ? ' on' : '')}
            // poster image as background so there is never a black frame
            style={{ backgroundImage: `url(${A(s.img)})` }}
            aria-hidden="true"
          >
            {videoSrc && (
              <video
                ref={el => { videoRefs.current[k] = el; }}
                src={videoSrc}
                poster={A(s.img)}
                muted
                loop
                playsInline
                preload={k === 0 ? 'auto' : 'metadata'}
              />
            )}
          </div>
        );
      })}

      <div className="w hero-in">
        <small className="eyebrow">Pune&nbsp;|&nbsp; Dubai&nbsp;|&nbsp; Partner Developers</small>
        <h1>Invest. Live. Grow.<br />Across Pune &amp; Dubai</h1>
        <p>Curated properties from top developers for homebuyers and investors in India and the UAE — managed from search to handover.</p>
        <form className="hsb" onSubmit={submit}>
          <div className="hsb-r">
            <label>
              <span>Location</span>
              <select value={f.loc} onChange={e => setF({ ...f, loc: e.target.value })}>
                <option value="">Any location</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </label>
            <label>
              <span>Type</span>
              <select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
                <option value="">Any type</option>
                {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </label>
            <button className="btn" type="submit"><Search size={16} /> Search</button>
            <button type="button" className="mf" onClick={() => setMore(!more)} aria-expanded={more}>
              <SlidersHorizontal size={15} /> More filters
            </button>
          </div>
          {more && (
            <div className="hsb-m">
              <label>
                <span>Min price</span>
                <select value={f.min} onChange={e => setF({ ...f, min: e.target.value })}>
                  <option value="">No min</option>
                  {bands.map(o => <option key={o} value={o}>{fmtAed(o)}</option>)}
                </select>
              </label>
              <label>
                <span>Max price</span>
                <select value={f.max} onChange={e => setF({ ...f, max: e.target.value })}>
                  <option value="">No max</option>
                  {bands.map(o => <option key={o} value={o}>{fmtAed(o)}</option>)}
                </select>
              </label>
              <p>Pune prices are matched on AED equivalent (1 AED ≈ ₹23).</p>
            </div>
          )}
        </form>
      </div>

      <div className="hcap">
        <Link to={'/exclusive-projects/' + SLIDES[i].id}>
          <b>{SLIDES[i].name}</b>
          <span>{SLIDES[i].loc}</span>
        </Link>
        <div>
          {SLIDES.map((s, k) => (
            <button
              key={s.id}
              className={k === i ? 'on' : ''}
              onClick={() => go(k)}
              aria-label={'Show ' + s.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
