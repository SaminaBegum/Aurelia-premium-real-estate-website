
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { projects } from '@/data';
import { A } from '@/lib/assets';
import { locationsFor } from '@/lib/listingFilters';
import { BUY_BANDS, PROPERTY_TYPES } from '@/lib/constants';
import { fmtAed } from '@/lib/utils';
import { useSlideshow } from '@/hooks/useSlideshow';
import { useLocationContext } from '@/contexts/LocationContext';

// Pune local hero videos
import puneHero1 from '@/assets/images/pune-hero-1.mp4';
import puneHero2 from '@/assets/images/pune-hero-2.mp4';

// Existing Dubai hero video slides – unchanged.
export const DUBAI_HERO_PROJECT_IDS = [
  'damac-lagoons',
  'ghaf-woods',
  'lumena-omniyat',
  'burj-binghatti-jacob-co',
];

const DUBAI_HERO_VIDEOS: Record<string, string> = {
  'damac-lagoons':
    'https://videos.ctfassets.net/zoq5l15g49wj/5lT6VSTCWBTxDrNH1bRnLp/db2c7d1ae4447797505fb35a13ade904/Damac_island_Hero_video_16X9.mp4',
  'ghaf-woods':
    'https://d4.maf.ae/videos/ghafwoodslibraries/default-video-library/261029-maf-lyra-4k-mini(1).mp4',
  'lumena-omniyat':
    'https://cdn.prod.website-files.com/64cd0df1806781d956403b26/651712fc5af65256949fa279_opus-hero-d-transcode.mp4',
  'burj-binghatti-jacob-co':
    'https://binghattiweb.imgix.net/hero-desktop-new-1.mp4',
};

// Pune hero slides – two local videos.
export const PUNE_HERO_PROJECT_IDS = [
  'rohan-ekam',
  '24k-manor',
];

const PUNE_HERO_VIDEOS: Record<string, string> = {
  '24k-manor': puneHero1,
  'rohan-ekam': puneHero2,
};

export default function HeroSection() {
  const nav = useNavigate();
  const { market, isPune } = useLocationContext();

  const heroIds = isPune
    ? PUNE_HERO_PROJECT_IDS
    : DUBAI_HERO_PROJECT_IDS;

  const heroVideos = isPune
    ? PUNE_HERO_VIDEOS
    : DUBAI_HERO_VIDEOS;

  const slides = heroIds
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);

  const [i, go] = useSlideshow(slides.length);
  const [f, setF] = useState({
    loc: '',
    type: '',
    min: '',
    max: '',
  });

  const [more, setMore] = useState(false);
  const bands = BUY_BANDS;
  const availableLocations = locationsFor(market);

  // Reset slide and filters when location changes.
  useEffect(() => {
    go(0);
    setF({ loc: '', type: '', min: '', max: '' });
  }, [market]);

  // Video references.
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Play active video and pause inactive videos.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === i) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, [i, market]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const q = new URLSearchParams();
    q.set('market', market);

    Object.entries(f).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });

    nav('/properties?' + q);
  };

  const currentSlide = slides[i] || slides[0];

  return (
    <section className="hero">
      {slides.map((s, k) => {
        const videoSrc = heroVideos[s.id] ?? '';

        return (
          <div
            key={`${market}-${s.id}`}
            className={'hs' + (k === i ? ' on' : '')}
            style={{ backgroundImage: `url(${A(s.img)})` }}
            aria-hidden="true"
          >
            {videoSrc && (
              <video
                ref={el => {
                  videoRefs.current[k] = el;
                }}
                src={videoSrc}
                poster={A(s.img)}
                muted
                loop
                playsInline
                preload={k === 0 ? 'auto' : 'metadata'}
              />
            )}

            {isPune && (
              <style>{`
                .hero .hs.on video,
                .hero .hs video {
                  filter: none !important;
                  opacity: 1 !important;
                }
              `}</style>
            )}
          </div>
        );
      })}

      <div className="w hero-in">
        <small className="eyebrow">
          {isPune
            ? 'Pune | India | Partner Developers'
            : 'Dubai | UAE | Partner Developers'}
        </small>

        <h1>
          Invest. Live. Grow.<br />
          {isPune
            ? 'Across Pune, India'
            : 'Across Dubai, UAE'}
        </h1>

        <p>
          {isPune
            ? 'Curated luxury properties from top builders for homebuyers and investors in Pune — managed from search to handover.'
            : 'Curated properties from top developers for homebuyers and investors in Dubai & the UAE — managed from search to handover.'}
        </p>

        <form className="hsb" onSubmit={submit}>
          <div className="hsb-r">
            <label>
              <span>Location</span>
              <select
                value={f.loc}
                onChange={e =>
                  setF({ ...f, loc: e.target.value })
                }
              >
                <option value="">Any location</option>
                {availableLocations.map(l => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Type</span>
              <select
                value={f.type}
                onChange={e =>
                  setF({ ...f, type: e.target.value })
                }
              >
                <option value="">Any type</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <button className="btn" type="submit">
              <Search size={16} /> Search
            </button>

            <button
              type="button"
              className="mf"
              onClick={() => setMore(!more)}
              aria-expanded={more}
            >
              <SlidersHorizontal size={15} /> More filters
            </button>
          </div>

          {more && (
            <div className="hsb-m">
              <label>
                <span>
                  {isPune ? 'Min price' : 'Min price (AED)'}
                </span>

                <select
                  value={f.min}
                  onChange={e =>
                    setF({ ...f, min: e.target.value })
                  }
                >
                  <option value="">No min</option>

                  {bands.map(o => (
                    <option key={o} value={o}>
                      {isPune
                        ? `₹ ${(o * 23 / 1e7).toFixed(1)} Cr`
                        : fmtAed(o)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>
                  {isPune ? 'Max price' : 'Max price (AED)'}
                </span>

                <select
                  value={f.max}
                  onChange={e =>
                    setF({ ...f, max: e.target.value })
                  }
                >
                  <option value="">No max</option>

                  {bands.map(o => (
                    <option key={o} value={o}>
                      {isPune
                        ? `₹ ${(o * 23 / 1e7).toFixed(1)} Cr`
                        : fmtAed(o)}
                    </option>
                  ))}
                </select>
              </label>

              <p>
                {isPune
                  ? 'Showing verified residential and commercial properties in Pune, India.'
                  : 'Showing verified freehold luxury properties in Dubai, UAE.'}
              </p>
            </div>
          )}
        </form>
      </div>

      {currentSlide && (
        <div className="hcap">
          <Link to={'/exclusive-projects/' + currentSlide.id}>
            <b>{currentSlide.name}</b>
            <span>{currentSlide.loc}</span>
          </Link>

          <div>
            {slides.map((s, k) => (
              <button
                key={s.id}
                className={k === i ? 'on' : ''}
                onClick={() => go(k)}
                aria-label={'Show ' + s.name}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
