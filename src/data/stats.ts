import type { Market } from './types';

export const STATS_BY_LOCATION: Record<Market, [value: string, label: string][]> = {
  Pune: [
    ['450+', 'Satisfied Homebuyers'],
    ['20+', 'Verified Pune Projects'],
    ['₹1,800 Cr+', 'Property Value Managed'],
    ['100%', 'RERA Verified Listings'],
    ['12+', 'Years in Pune Market'],
  ],
  Dubai: [
    ['380+', 'Global Investors'],
    ['21+', 'Iconic Dubai Developments'],
    ['AED 3.5B+', 'Property Value Managed'],
    ['8.4%', 'Average Rental Yield'],
    ['8+', 'Years in UAE Freehold'],
  ],
};

export const getStats = (market: Market = 'Pune'): [value: string, label: string][] =>
  STATS_BY_LOCATION[market] || STATS_BY_LOCATION.Pune;

export const stats: [value: string, label: string][] = STATS_BY_LOCATION.Pune;
