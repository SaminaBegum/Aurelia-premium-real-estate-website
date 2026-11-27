import type { Market } from './types';

export type IconName = 'Home' | 'KeyRound' | 'Layers' | 'Building2' | 'UserRound' | 'Globe';

export type ServiceItem = [title: string, icon: IconName, desc: string, to: string];

export const SERVICES_BY_LOCATION: Record<Market, ServiceItem[]> = {
  Pune: [
    ['Buy in Pune', 'Home', 'Hand-picked RERA-verified luxury homes and apartments across Pune’s top micro-markets.', '/properties?market=Pune'],
    ['Exclusive Pune Projects', 'KeyRound', 'Iconic off-plan & new launch townships by Godrej, Kolte-Patil, Lodha & Rohan.', '/exclusive-projects?market=Pune'],
    ['High-Growth Pune Investment', 'Layers', 'High-appreciation opportunities in Kharadi, Balewadi, Baner & Hinjewadi.', '/invest'],
    ['Commercial & IT Spaces', 'Building2', 'Grade-A bare-shell and corporate office spaces in prime Pune business districts.', '/properties?market=Pune&category=Commercial'],
    ['Pune Property Advisory', 'UserRound', 'One-to-one consultation and micro-market analysis from our Pune property experts.', '/contact-us'],
    ['NRI Property Investment', 'Globe', 'Comprehensive FEMA, RBI compliance, title verification & repatriation support for NRIs.', '/invest'],
  ],
  Dubai: [
    ['Buy in Dubai', 'Home', 'Hand-picked luxury freehold apartments, sky penthouses, and waterfront villas in Dubai.', '/properties?market=Dubai'],
    ['Exclusive Dubai Projects', 'KeyRound', 'Iconic off-plan master developments from Emaar, Sobha, Nakheel, Binghatti & DAMAC.', '/exclusive-projects?market=Dubai'],
    ['High-Yield Dubai Investments', 'Layers', 'Tax-free rental yields (7–10%) and high capital appreciation opportunities across Dubai.', '/invest'],
    ['Prime Dubai Commercial', 'Building2', 'Grade-A executive headquarters and boutique offices in Business Bay & Downtown Dubai.', '/properties?market=Dubai&category=Commercial'],
    ['Private Client Advisory', 'UserRound', 'Bespoke portfolio management and direct developer allocations with zero buyer commission.', '/contact-us'],
    ['Golden Visa & Global Inward', 'Globe', 'Complete UAE Golden Visa advisory, government escrow security, and cross-border purchase support.', '/invest'],
  ],
};

export const getServices = (market: Market = 'Pune'): ServiceItem[] => SERVICES_BY_LOCATION[market];

export const services: ServiceItem[] = SERVICES_BY_LOCATION.Pune;
