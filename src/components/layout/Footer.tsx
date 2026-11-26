import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Send,
} from 'lucide-react';
import { A } from '@/lib/assets';
import { SITE } from '@/data/site';
import { FOOTER_EXPLORE, FOOTER_COMPANY } from '@/data/navigation';
import { post } from '@/api/api';

export default function Footer() {
  const links = (items: [string, string][]) =>
    items.map(([t, to]) => (
      <Link key={t} to={to}>
        {t}
      </Link>
    ));

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = new FormData(f).get('email');
    await post('/subscribe', { email });
    f.reset();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-brand">
          <img src={A('logo-new.png')} alt={SITE.name} />
          <p>
            {SITE.tagline} Premium real estate in Pune and Dubai — from first search to
            final handover.
          </p>
          <div className="soc">
            <a href={SITE.socials.linkedin} aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={SITE.socials.instagram} aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={SITE.socials.youtube} aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href={SITE.socials.facebook} aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h5>Explore</h5>
          {links(FOOTER_EXPLORE)}
        </div>

        <div>
          <h5>Company</h5>
          {links(FOOTER_COMPANY)}
        </div>

        <div>
          <h5>Get in Touch</h5>
          {SITE.offices.map((o) => (
            <p key={o.city}>
              <MapPin size={14} /> {o.address}
            </p>
          ))}
          {SITE.phones.map((p) => (
            <p key={p.href}>
              <Phone size={14} /> <a href={p.href}>{p.display}</a>
            </p>
          ))}

          <h6>Subscribe for latest properties</h6>
          <form onSubmit={subscribe} className="sub">
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email"
            />
            <button aria-label="Subscribe">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="copy">
        <span>© 2026 {SITE.name}. All Rights Reserved.</span>
        <span>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact-us">Contact Us</Link>
        </span>
      </div>
    </footer>
  );
}