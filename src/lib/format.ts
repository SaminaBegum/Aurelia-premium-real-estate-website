import type { Listing, Project } from '@/data/types';

export const unit = (p: Project) =>
  p.category === 'Commercial' ? 'Unit' : p.market === 'Pune' ? 'BHK' : 'BR';

export const startPrice = (p: Project) =>
  p.market === 'Pune'
    ? `₹ ${p.price.toFixed(2)} Cr`
    : `AED ${(p.price * 1e6).toLocaleString('en-US')}`;

export const money = (l: Listing) =>
  l.market === 'Pune'
    ? l.status === 'buy'
      ? `₹ ${(l.amt / 1e7).toFixed(2)} Cr`
      : `₹ ${l.amt.toLocaleString('en-IN')} / month`
    : `AED ${l.amt.toLocaleString('en-US')}${l.status === 'rent' ? ' / yearly' : ''}`;

export const initials = (role: string) =>
  role
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || 'A';