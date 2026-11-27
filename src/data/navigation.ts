import { projects } from './projects';
import type { NavItem, Market } from './types';

export const getNav = (market: Market = 'Pune'): NavItem[] => {
  const isPune = market === 'Pune';
  const marketProjects = projects.filter((p) => p.market === market);

  return [
    [
      'Exclusive Projects',
      '/exclusive-projects',
      [
        ...marketProjects
          .slice(0, 5)
          .map((p) => [p.name, '/exclusive-projects/' + p.id] as [string, string]),
        [isPune ? 'View All Pune Projects' : 'View All Dubai Projects', '/exclusive-projects'],
      ],
    ],
    [
      'Properties',
      '/properties',
      [
        [isPune ? 'All Pune Properties' : 'All Dubai Properties', '/properties'],
        [isPune ? 'Pune Residential' : 'Dubai Residential', '/properties?category=Residential'],
        [isPune ? 'Pune Commercial' : 'Dubai Commercial', '/properties?category=Commercial'],
      ],
    ],
    [
      'Services',
      '/property-management',
      [
        ['Property Management', '/property-management'],
        [isPune ? 'Invest & NRI Advisory' : 'Invest & Golden Visa', '/invest'],
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
};

export const NAV: NavItem[] = getNav('Pune');

export const getFooterExplore = (market: Market = 'Pune'): [string, string][] => {
  const isPune = market === 'Pune';
  return [
    [isPune ? 'Pune Properties for Sale' : 'Dubai Properties for Sale', '/properties'],
    [isPune ? 'Pune Off-Plan Projects' : 'Dubai Off-Plan Projects', '/exclusive-projects'],
    [isPune ? 'Residential in Pune' : 'Residential in Dubai', '/properties?category=Residential'],
    [isPune ? 'Commercial in Pune' : 'Commercial in Dubai', '/properties?category=Commercial'],
    ['Property Management', '/property-management'],
    ['Who We Are', '/about'],
    ['Meet the Team', '/team'],
    ['List Your Property', '/list-your-property'],
  ];
};

export const FOOTER_EXPLORE: [string, string][] = getFooterExplore('Pune');

export const FOOTER_COMPANY: [string, string][] = [
  ['All Properties', '/properties'],
  ['Developer Partners', '/developers'],
  ['Invest', '/invest'],
  ['Insights', '/insights'],
  ['Careers', '/careers'],
  ['Contact', '/contact-us'],
  ['Privacy Policy', '/privacy-policy'],
];
