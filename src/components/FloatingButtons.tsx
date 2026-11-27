import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { SITE } from '@/data/site';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/** Scroll-progress line, WhatsApp button and back-to-top button. */
export default function FloatingButtons() {
  const { y, pct } = useScrollProgress();

  return (
    <>
      <div className="prog" style={{ width: pct + '%' }} aria-hidden="true" />

      <div className="dock">
        <button
          className={'up' + (y > 500 ? ' on' : '')}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={18} />
        </button>

        <a
          className="wa"
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </>
  );
}