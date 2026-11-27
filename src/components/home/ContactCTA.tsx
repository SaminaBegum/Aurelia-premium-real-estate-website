import React from 'react';
import { Link } from 'react-router-dom';
import { A } from '@/lib/assets';

// Existing Hero Section video (Lumena Omniyat / The Opus)
const CTA_VIDEO_SRC =
  'https://cdn.prod.website-files.com/64cd0df1806781d956403b26/651712fc5af65256949fa279_opus-hero-d-transcode.mp4';

export default function ContactCTA() {
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
        src={CTA_VIDEO_SRC}
        poster={A('office.jpg')}
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
        <small>Own property in Pune or Dubai?</small>
        <h2>Sell or lease through a partner you can trust</h2>
        <p>
          List with Aurelia and let our team handle marketing, viewings, contracts and
          management.
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