import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  ChevronDown,
  Menu,
  X,
  Building2,
  Heart,
  User,
} from 'lucide-react';
import { A } from '@/lib/assets';
import { getNav } from '@/data/navigation';
import { SITE } from '@/data/site';
import { useSaved } from '@/contexts/SavedContext';
import { useLocationContext } from '@/contexts/LocationContext';
import { useScrolled } from '@/hooks/useScrolled';
import { useIsMobile } from '@/hooks/use-mobile';
import CountrySelector from '@/components/layout/CountrySelector';
import '@/styles/auth.css';

export default function Header() {
  const { saved } = useSaved();
  const { market, locationInfo } = useLocationContext();
  const { pathname, search } = useLocation();
  const sc = useScrolled();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [ac, setAc] = useState<number | null>(null);
  const [hid, setHid] = useState(false);
  const home = pathname === '/';
  const navItems = getNav(market);

  // Close every menu after a link is clicked (CSS :hover/:focus-within would otherwise keep the dropdown open).
  const closeMenus = () => {
    setOpen(false);
    setAc(null);
    setHid(true);
    (document.activeElement as HTMLElement | null)?.blur?.();
  };

  useEffect(() => {
    setOpen(false);
    setAc(null);
  }, [pathname, search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={
        'hd' +
        (home && !sc && !open ? ' tr' : '') +
        (sc ? ' sc' : '') +
        (hid ? ' nodd' : '')
      }
    >
      <div className="top">
        <span>
          <MapPin size={13} /> {locationInfo.topBarLocation}
        </span>
        <a href={locationInfo.phone.href}>
          <Phone size={13} /> {locationInfo.phone.display}
        </a>
        <div className="top-auth hide-m">
          <Link to="/login">
            <User size={13} /> Log In
          </Link>
          <span className="sep">·</span>
          <Link to="/create-account">Create Account</Link>
        </div>
      </div>

      <div className="hbar">
        <Link to="/" className="brand">
          <img src={A('logo-new.png')} alt="Aurelia Real Estate Company" />
        </Link>

        <nav
          className={open ? 'open' : ''}
          aria-label="Main"
          onMouseLeave={() => setHid(false)}
        >
          {navItems.map(([t, to, sub], i) => (
            <div className={'ni' + (ac === i ? ' ex' : '')} key={t}>
              <Link
                to={to}
                className={pathname.startsWith(to) ? 'active' : ''}
                onClick={(e) => {
                  if (isMobile) {
                    e.preventDefault();
                    setAc(ac === i ? null : i);
                  } else {
                    closeMenus();
                  }
                }}
              >
                {t}
                <ChevronDown size={14} />
              </Link>
              <div className="dd">
                {sub.map(([s, l]) => (
                  <Link key={s} to={l} onClick={closeMenus}>
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="country-sel-m show-m">
            <CountrySelector isMobile />
          </div>

          <div className="auth-m show-m">
            <Link to="/login" className="btn-o" onClick={closeMenus}>
              Log In
            </Link>
            <Link to="/create-account" className="btn gold" onClick={closeMenus}>
              Create Account
            </Link>
          </div>

          <Link to="/list-your-property" className="btn show-m" onClick={closeMenus}>
            List Your Property
          </Link>
        </nav>

        <Link
          to="/saved"
          className="hrt"
          aria-label={`Saved properties (${saved.length})`}
        >
          <Heart size={20} />
          {saved.length > 0 && <i>{saved.length}</i>}
        </Link>

        <CountrySelector className="hide-m" />

        <Link to="/list-your-property" className="btn hide-m">
          <Building2 size={16} /> List Your Property
        </Link>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}