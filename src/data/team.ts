import type { Market } from './types';

export const TEAM_BY_LOCATION: Record<Market, [role: string, desc: string][]> = {
  Pune: [
    ['Founder & Managing Director', 'Leads overall group strategy and developer relationships across Pune and India.'],
    ['Director – Pune', 'Oversees Pune sales, luxury township launches, and client advisory services.'],
    ['Senior Property Consultant – Pune', 'Specializes in West Pune (Baner, Balewadi, Hinjewadi) and arranges curated site tours.'],
    ['Commercial & IT Corridors Lead', 'Advises corporate clients and investors on Grade-A office acquisitions and bare-shell spaces.'],
    ['NRI & Investment Advisor', 'Cross-border purchase, FEMA legalities, and Indian home loan assistance with leading banks.'],
    ['Head of Marketing – India', 'Brings Pune new launches and luxury developments to qualified homebuyers.'],
    ['Client Relations & Registration Manager', 'Handles developer agreements, stamp duty, sub-registrar filing, and handover.'],
    ['Property Management Lead – Pune', 'Oversees verified tenant screening, registered lease deeds, and property upkeep.'],
  ],
  Dubai: [
    ['Founder & Managing Director', 'Leads group strategy and master developer partnerships across Dubai and the UAE.'],
    ['Director – Dubai', 'Oversees Dubai off-plan sales, prime resale, and international investor relations.'],
    ['Senior Off-Plan Consultant – Dubai', 'Direct developer allocations and VIP access to iconic Dubai off-plan launches.'],
    ['Luxury Waterfront Specialist', 'Curates private island villas, penthouses, and branded residences in Dubai.'],
    ['Golden Visa & Legal Advisor', 'Specialist in DLD registration, escrow protection, and 10-year UAE Golden Visas.'],
    ['Head of International Marketing', 'Connects global high-net-worth investors with premier UAE developments.'],
    ['Client Relations Manager – UAE', 'Manages developer liaison, payment plans, and handover snagging.'],
    ['Property Management Lead – Dubai', 'Full holiday-home licensing, long-term leasing, and Ejari registration.'],
  ],
};

export const getTeam = (market: Market = 'Pune'): [role: string, desc: string][] =>
  TEAM_BY_LOCATION[market] || TEAM_BY_LOCATION.Pune;

export const team: [role: string, desc: string][] = TEAM_BY_LOCATION.Pune;
