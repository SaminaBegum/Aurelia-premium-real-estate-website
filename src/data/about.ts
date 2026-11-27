import type { Market } from './types';

export const DIFFERENTIATORS_BY_LOCATION: Record<Market, [string, string][]> = {
  Pune: [
    [
      'Pune Market Mastery',
      'Deep, hands-on knowledge of Baner, Balewadi, Hinjewadi, Kharadi, and prime Pune CBD corridors.',
    ],
    [
      'RERA & Title Verification',
      'Comprehensive legal due diligence, title clearance, and RERA registration checks on every project.',
    ],
    [
      'Full Transaction Care',
      'We manage site viewings, developer agreements, home financing with leading banks, and stamp duty registration.',
    ],
    [
      'Landlord & NRI Services',
      'End-to-end property care for Pune landlords and NRIs — tenant vetting, leave & license deeds, and rent collection.',
    ],
  ],
  Dubai: [
    [
      'UAE Freehold Expertise',
      'Specialist insight into Downtown, Business Bay, Dubai Marina, and iconic waterfront master developments.',
    ],
    [
      'Direct Developer Access',
      'Preferred agency partnerships with Emaar, Sobha, Nakheel, Binghatti, and DAMAC with zero buyer commission.',
    ],
    [
      'Golden Visa & Escrow Security',
      'Complete assistance with remote reservations, government-protected escrow accounts, and UAE Golden Visa qualification.',
    ],
    [
      'Turnkey Asset Management',
      'Full property handover, snagging, holiday home setup, and long-term tenant placement.',
    ],
  ],
};

export const getDifferentiators = (market: Market = 'Pune'): [string, string][] =>
  DIFFERENTIATORS_BY_LOCATION[market] || DIFFERENTIATORS_BY_LOCATION.Pune;

export const differentiators: [string, string][] = DIFFERENTIATORS_BY_LOCATION.Pune;

export const values = ['Luxury', 'Integrity', 'Long term value'];
