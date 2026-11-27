import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Market } from '@/data/types';
import { SITE_LOCATION, SITE } from '@/data/site';

export type LocationInfo = (typeof SITE_LOCATION)[Market];

export interface LocationContextType {
  market: Market;
  country: 'India' | 'Dubai';
  isPune: boolean;
  isDubai: boolean;
  setMarket: (market: Market) => void;
  currency: '₹' | 'AED';
  phone: { label: string; display: string; href: string };
  office: { city: string; address: string };
  locationInfo: LocationInfo;
  whatsapp: string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return ctx;
};

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialMarket = (): Market => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const urlMarket = searchParams.get('market');
      if (urlMarket === 'Dubai') return 'Dubai';
      if (urlMarket === 'Pune') return 'Pune';

      const savedMarket = localStorage.getItem('aurelia_market');
      if (savedMarket === 'Dubai') return 'Dubai';
      if (savedMarket === 'Pune') return 'Pune';

      const savedCountry = localStorage.getItem('aurelia_country');
      if (savedCountry === 'Dubai') return 'Dubai';
      if (savedCountry === 'India') return 'Pune';
    } catch (e) {
      // Fallback
    }
    return 'Pune';
  };

  const [market, setMarketState] = useState<Market>(getInitialMarket);

  // Sync state if URL query param 'market' changes externally (e.g. browser navigation)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlMarket = searchParams.get('market');
    if ((urlMarket === 'Dubai' || urlMarket === 'Pune') && urlMarket !== market) {
      setMarketState(urlMarket);
      try {
        localStorage.setItem('aurelia_market', urlMarket);
        localStorage.setItem('aurelia_country', urlMarket === 'Pune' ? 'India' : 'Dubai');
      } catch (e) {}
    }
  }, [location.search]);

  const setMarket = (nextMarket: Market) => {
    setMarketState(nextMarket);
    try {
      localStorage.setItem('aurelia_market', nextMarket);
      localStorage.setItem('aurelia_country', nextMarket === 'Pune' ? 'India' : 'Dubai');
    } catch (e) {}

    // If the current URL has an explicit 'market' query param, update it in-place
    // without redirecting to any other page or resetting the scroll position.
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('market') && searchParams.get('market') !== nextMarket) {
      searchParams.set('market', nextMarket);
      navigate(
        { pathname: location.pathname, search: searchParams.toString(), hash: location.hash },
        { replace: true, preventScrollReset: true }
      );
    }
  };

  const locationInfo = SITE_LOCATION[market];
  const isPune = market === 'Pune';
  const isDubai = market === 'Dubai';
  const country: 'India' | 'Dubai' = isPune ? 'India' : 'Dubai';

  const value = useMemo<LocationContextType>(
    () => ({
      market,
      country,
      isPune,
      isDubai,
      setMarket,
      currency: locationInfo.currency,
      phone: locationInfo.phone,
      office: { city: locationInfo.city, address: locationInfo.address },
      locationInfo,
      whatsapp: locationInfo.whatsapp,
    }),
    [market, isPune, isDubai, country, locationInfo],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}
