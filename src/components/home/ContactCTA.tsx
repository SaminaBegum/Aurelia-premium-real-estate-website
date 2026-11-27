import React from 'react';
import { Link } from 'react-router-dom';
import { A } from '@/lib/assets';
import { useLocationContext } from '@/contexts/LocationContext';

// Existing Dubai CTA video (The Opus by Omniyat)
const DUBAI_CTA_VIDEO =
  'https://cdn.prod.website-files.com/64cd0df1806781d956403b26/651712fc5af65256949fa279_opus-hero-d-transcode.mp4';

// Premium Pune luxury real estate video (Kolte-Patil luxury residences)
const PUNE_CTA_VIDEO =
  'https://www.koltepatil.com/assets/dist/videos/home_main_video_desktop.mp4';

export default function ContactCTA() {
  const { isPune } = useLocationContext();
  const videoSrc = isPune ? PUNE_CTA_VIDEO : DUBAI_CTA_VIDEO;

  return (
    <section
      className="cta"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      }}
    >
      <video
        key={videoSrc}
        src={videoSrc}
        poster={A(isPune ? '24k-manor-1.jpg' : 'office.jpg')}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <div className="w" style={{ position: 'relative', zIndex: 2 }}>
        <small>{isPune ? 'Own property in Pune?' : 'Own property in Dubai?'}</small>
        <h2>
          {isPune
            ? 'Sell or lease your Pune property through a partner you can trust'
            : 'Sell or lease your Dubai property through a partner you can trust'}
        </h2>
        <p>
          {isPune
            ? 'List with Aurelia in Pune and let our team handle professional marketing, verified viewings, legal agreements and property management.'
            : 'List with Aurelia in Dubai and let our team handle international marketing, tenant vetting, Ejari and complete property management.'}
        </p>
        <div className="row">
          <Link className="btn gold" to="/list-your-property">
            List Your Property
          </Link>
          <Link className="btn-o lt" to="/property-management">
            Explore Property Management
          </Link>
        </div>
      </div>
    </section>
  );
}
