import type { Market } from './types';

export const ARTICLES_BY_LOCATION: Record<Market, [title: string, category: string, summary: string][]> = {
  Pune: [
    [
      'Pune Real Estate Outlook 2026',
      'Market',
      'Infrastructure milestones, metro line expansions, and residential capital appreciation across Pune.',
    ],
    [
      'A Luxury Buyer’s Guide to Baner & Balewadi',
      'Guide',
      'Why Baner and Balewadi continue to lead Pune’s luxury high-rise and lifestyle residential demand.',
    ],
    [
      'NRI Property Investment Checklist for Pune',
      'NRI',
      'RERA protections, NRE/NRO banking, power of attorney, and tax repatriation explained simply.',
    ],
    [
      'Commercial Real Estate in Hinjewadi & Baner',
      'Commercial',
      'Why Grade-A bare-shell offices are generating robust rental yields in Pune’s tech corridors.',
    ],
  ],
  Dubai: [
    [
      'Dubai Freehold Outlook 2026',
      'Market',
      'Projected rental yields, population growth, and high-demand freehold corridors in Dubai.',
    ],
    [
      'The Complete Guide to Dubai Off-Plan',
      'Guide',
      'Understanding DLD escrow accounts, construction milestones, and payment plans.',
    ],
    [
      'UAE Golden Visa via Real Estate',
      'Visa',
      'How AED 2M+ property investment unlocks a 10-year renewable residency visa for your family.',
    ],
    [
      'Waterfront vs Master Community Living',
      'Lifestyle',
      'Comparing long-term returns and capital growth across Dubai’s iconic master communities.',
    ],
  ],
};

export const getArticles = (market: Market = 'Pune'): [title: string, category: string, summary: string][] =>
  ARTICLES_BY_LOCATION[market] || ARTICLES_BY_LOCATION.Pune;

export const articles: [title: string, category: string, summary: string][] = ARTICLES_BY_LOCATION.Pune;
