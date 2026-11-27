import type { Market } from './types';

export const JOBS_BY_LOCATION: Record<Market, [title: string, location: string, type: string][]> = {
  Pune: [
    ['Senior Property Consultant', 'Pune (Camp / Baner)', 'Full-time'],
    ['Commercial Real Estate Advisor', 'Pune (Hinjewadi)', 'Full-time'],
    ['Property Management Executive', 'Pune', 'Full-time'],
    ['Digital Marketing Executive', 'Pune / Hybrid', 'Full-time'],
  ],
  Dubai: [
    ['Off-Plan Sales Executive', 'Business Bay, Dubai', 'Full-time'],
    ['Luxury Portfolio Manager', 'Dubai', 'Full-time'],
    ['Golden Visa & Client Relations Coordinator', 'Dubai', 'Full-time'],
    ['International Investor Advisor', 'Dubai', 'Full-time'],
  ],
};

export const getJobs = (market: Market = 'Pune'): [title: string, location: string, type: string][] =>
  JOBS_BY_LOCATION[market] || JOBS_BY_LOCATION.Pune;

export const jobs: [title: string, location: string, type: string][] = JOBS_BY_LOCATION.Pune;
