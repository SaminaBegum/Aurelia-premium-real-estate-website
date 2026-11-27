import type { Market } from './types';

export const JOURNEY_BY_LOCATION: Record<Market, [string, string][]> = {
  Pune: [
    ['Discover', 'Share your budget and requirements. We shortlist RERA-registered Pune projects with clear titles.'],
    ['Visit', 'Curated site tours across Pune’s top IT corridors, or immersive virtual walkthroughs for NRI buyers.'],
    ['Secure', 'Direct developer pricing, legal document verification, and home loan coordination with top banks.'],
    ['Own', 'Possession walkthrough, property registration at the sub-registrar office, and handover management.'],
  ],
  Dubai: [
    ['Discover', 'Outline your capital growth or yield targets. We shortlist prime freehold Dubai master developments.'],
    ['Visit', 'Live 3D walkthroughs from anywhere in the world, or VIP private on-site viewings across Dubai.'],
    ['Secure', 'Zero buyer commission, DLD-approved contracts, and secure payments via government escrow accounts.'],
    ['Own', 'Key handover, UAE Golden Visa processing assistance, and complete turnkey property management.'],
  ],
};

export const WHY_US_BY_LOCATION: Record<
  Market,
  [icon: 'Gem' | 'Handshake' | 'TrendingUp' | 'Headset', label: string][]
> = {
  Pune: [
    ['Gem', 'Vetted Pune Homes'],
    ['Handshake', 'Top RERA Builders'],
    ['TrendingUp', 'IT Corridor Growth'],
    ['Headset', 'Full Handover Care'],
  ],
  Dubai: [
    ['Gem', 'Prime Freehold Assets'],
    ['Handshake', 'Master Developers'],
    ['TrendingUp', 'High Tax-Free Yields'],
    ['Headset', 'Golden Visa Assistance'],
  ],
};

export const getJourney = (market: Market = 'Pune'): [string, string][] =>
  JOURNEY_BY_LOCATION[market] || JOURNEY_BY_LOCATION.Pune;

export const getWhyUs = (market: Market = 'Pune') =>
  WHY_US_BY_LOCATION[market] || WHY_US_BY_LOCATION.Pune;

export const journey: [string, string][] = JOURNEY_BY_LOCATION.Pune;
export const whyUs = WHY_US_BY_LOCATION.Pune;
