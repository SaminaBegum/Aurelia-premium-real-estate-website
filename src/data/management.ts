import type { Market } from './types';

export const MANAGEMENT_STEPS_BY_LOCATION: Record<Market, [string, string][]> = {
  Pune: [
    [
      'Rental valuation & strategy',
      'We assess your Pune property and build a competitive rental pricing model tailored to IT executives.',
    ],
    [
      'Tenant screening & viewings',
      'We market your unit, conduct thorough background and employment checks, and coordinate viewings.',
    ],
    [
      'Leave & license agreement',
      'We prepare registered 11-month lease deeds, society NOCs, and police verification end-to-end.',
    ],
    [
      'Turnover & ongoing care',
      'Move-in inventory inspection, prompt rent collection, routine maintenance, and seamless lease renewals.',
    ],
  ],
  Dubai: [
    [
      'RERA valuation & strategy',
      'We evaluate your property according to the RERA Rental Index to optimize annual yields.',
    ],
    [
      'Tenant screening & viewings',
      'Targeted marketing to verified international and corporate tenants with complete credit vetting.',
    ],
    [
      'Ejari & contract management',
      'From unified tenancy contracts to DLD Ejari registration and security deposit management.',
    ],
    [
      'Turnover, DEWA & snagging',
      'Key handover, move-in inspections, DEWA connection coordination, and ongoing property upkeep.',
    ],
  ],
};

export const getManagementSteps = (market: Market = 'Pune'): [string, string][] =>
  MANAGEMENT_STEPS_BY_LOCATION[market] || MANAGEMENT_STEPS_BY_LOCATION.Pune;

export const managementSteps: [string, string][] = MANAGEMENT_STEPS_BY_LOCATION.Pune;
