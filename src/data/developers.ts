import type { Developer, Market } from './types';

export const developers: Developer[] = [
  // Pune Developers
  { n: 'Godrej Properties', l: 'd-godrej.png', m: 'Pune' },
  { n: 'VTP Realty', l: 'd-vtp.png', m: 'Pune' },
  { n: 'Kolte-Patil', l: 'd-kolte.png', m: 'Pune' },
  { n: 'Panchshil', l: 'd-panchshil.png', m: 'Pune' },
  { n: 'L&T Realty', l: 'd-lt.png', m: 'Pune' },
  { n: 'Rohan Builders', m: 'Pune' },
  { n: 'Lodha', m: 'Pune' },
  { n: 'Kalpataru', m: 'Pune' },

  // Dubai Developers
  { n: 'SOBHA', w: 'sobha', m: 'Dubai' },
  { n: 'EMAAR', w: 'emaar', m: 'Dubai' },
  { n: 'DAMAC', w: 'damac', m: 'Dubai' },
  { n: 'Binghatti', m: 'Dubai' },
  { n: 'Omniyat', m: 'Dubai' },
  { n: 'Nakheel', m: 'Dubai' },
  { n: 'Danube Properties', m: 'Dubai' },
  { n: 'Majid Al Futtaim', m: 'Dubai' },
];

export const getDevelopers = (market?: Market): Developer[] => {
  if (!market) return developers;
  return developers.filter((d) => d.m === market);
};
