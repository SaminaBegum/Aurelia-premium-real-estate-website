import type { Market } from './types';

export type InvestCard = [
  title: string,
  desc: string,
  icon: 'TrendingUp' | 'Globe' | 'ShieldCheck',
];

export const INVEST_CARDS_BY_LOCATION: Record<Market, InvestCard[]> = {
  Pune: [
    [
      'Pune IT Corridors',
      'High capital appreciation and strong rental demand driven by tech expansions in Hinjewadi, Baner, and Kharadi.',
      'TrendingUp',
    ],
    [
      'Commercial Grade-A',
      'High-occupancy bare-shell and corporate office spaces delivering stable 8–10% commercial rental returns in Pune CBD.',
      'Globe',
    ],
    [
      'RERA & NRI Security',
      'Clear title verification, transparent payment schedules, and streamlined RBI/FEMA repatriation for NRI investors.',
      'ShieldCheck',
    ],
  ],
  Dubai: [
    [
      'Tax-Free High Yields',
      'Earn 7–10% net rental yields with 0% property tax and zero capital gains tax in Dubai’s freehold market.',
      'TrendingUp',
    ],
    [
      'Freehold & Global Liquidity',
      '100% foreign ownership in premier global destinations with strong international investor demand.',
      'Globe',
    ],
    [
      'Golden Visa Eligibility',
      'Qualify for a renewable 10-year UAE Golden Visa with property investments of AED 2M and above.',
      'ShieldCheck',
    ],
  ],
};

export const getInvestCards = (market: Market = 'Pune'): InvestCard[] =>
  INVEST_CARDS_BY_LOCATION[market] || INVEST_CARDS_BY_LOCATION.Pune;

export const investCards: InvestCard[] = INVEST_CARDS_BY_LOCATION.Pune;
