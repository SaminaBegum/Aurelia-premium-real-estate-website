import { projects } from './projects';
import type { NavItem } from './types';

export const NAV: NavItem[] = [
  [
    'Exclusive Projects',
    '/exclusive-projects',
    [
      ...projects
        .slice(0, 5)
        .map((p) => [p.name, '/exclusive-projects/' + p.id] as [string, string]),
      ['View All Off-Plan Projects', '/exclusive-projects'],
    ],
  ],
  [
    'Properties',
    '/properties',
    [
      ['All Properties', '/properties'],
      ['Pune Properties', '/properties?market=Pune'],
      ['Dubai Properties', '/properties?market=Dubai'],
      ['Residential', '/properties?category=Residential'],
      ['Commercial', '/properties?category=Commercial'],
    ],
  ],
  [
    'Services',
    '/property-management',
    [
      ['Property Management', '/property-management'],
      ['Invest & NRI Advisory', '/invest'],
      ['Developer Partners', '/developers'],
    ],
  ],
  [
    'About Us',
    '/about',
    [
      ['Who We Are', '/about'],
      ['Meet the Team', '/team'],
      ['Insights', '/insights'],
    ],
  ],
];

export const FOOTER_EXPLORE: [string, string][] = [
  ['Properties for Sale', '/properties'],
  ['Off-Plan Projects', '/exclusive-projects'],
  ['Pune Properties', '/properties?market=Pune'],
  ['Dubai Properties', '/properties?market=Dubai'],
  ['Property Management', '/property-management'],
  ['Who We Are', '/about'],
  ['Meet the Team', '/team'],
  ['List Your Property', '/list-your-property'],
];

export const FOOTER_COMPANY: [string, string][] = [
  ['All Properties', '/properties'],
  ['Developer Partners', '/developers'],
  ['Invest', '/invest'],
  ['Insights', '/insights'],
  ['Careers', '/careers'],
  ['Contact', '/contact-us'],
  ['Privacy Policy', '/privacy-policy'],
];