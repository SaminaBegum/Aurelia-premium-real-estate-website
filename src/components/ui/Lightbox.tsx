import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { A } from '@/lib/assets';
import type { ProjectVideo } from '@/data/types';
import type { MediaItem } from '@/components/Gallery';

function renderMedia(m: MediaItem) {
  if (typeof m === 'string') {
    return <img src={A(m)} alt="" onClick={(e) => e.stopPropagation()} />;
  }

  if (m.kind === 'youtube' && m.embed) {
    return (
      <div className="lb-video" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={m.embed + '?autoplay=1&rel=0'}
          title="Project video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  if (m.kind === 'mp4' && m.url) {
    return (
      <div className="lb-video" onClick={(e) => e.stopPropagation()}>
        <video controls autoPlay playsInline>
          <source src={m.url} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  return null;
}

export function Lightbox({
  media,
  i,
  set,
}: {
  media: MediaItem[];
  i: number | null;
  set: (i: number | null) => void;
}) {
  useEffect(() => {
    if (i == null) return;

    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') set(null);
      if (e.key === 'ArrowRight') set((i + 1) % media.length);
      if (e.key === 'ArrowLeft') set((i - 1 + media.length) % media.length);
    };

    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [i]);

  if (i == null) return null;

  const go = (d: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    set((i + d + media.length) % media.length);
  };

  return (
    <div className="lb" onClick={() => set(null)}>
      <button aria-label="Close" className="lb-x">
        <X />
      </button>
      <button aria-label="Previous" className="lb-a l" onClick={go(-1)}>
        <ChevronLeft />
      </button>
      {renderMedia(media[i])}
      <button aria-label="Next" className="lb-a r" onClick={go(1)}>
        <ChevronRight />
      </button>
    </div>
  );
}