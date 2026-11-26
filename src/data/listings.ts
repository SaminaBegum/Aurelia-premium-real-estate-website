import type {Listing} from './types';
import {projects} from './projects';
import {RATE} from '@/lib/constants';

/**
 * Extracts a numeric sq.ft estimate from area string or falls back to bedroom size.
 */
const firstNumber = (s: string, beds: number): number => {
  const m = String(s).replace(/,/g, '').match(/\d+/);
  const n = m ? parseInt(m[0], 10) : 0;
  return n >= 200 ? n : (beds > 0 ? 500 + beds * 450 : 850);
};

/**
 * Verified listings for the Properties section.
 * Aurelia is exclusively focused on sales (no rentals).
 * Every project from the Projects section is directly mapped as a property for sale,
 * preserving exact names, locations, configurations, pricing, descriptions, images and amenities.
 */
export const listings: Listing[] = projects.map((p) => {
  const pune = p.market === 'Pune';
  const beds = p.beds.length > 0 ? p.beds[0] : (p.category === 'Commercial' ? 0 : 2);
  const baths = Math.max(1, beds);
  const area = firstNumber(p.area, beds);
  const amt = Math.round(p.price * (pune ? 1e7 : 1e6));
  const aed = Math.round(pune ? amt / RATE : amt);

  return {
    id: p.id,
    status: 'buy',
    market: p.market,
    category: p.category,
    loc: p.loc,
    project: p.name,
    projectId: p.id,
    title: p.name,
    type: p.type,
    beds,
    baths,
    area,
    areaText: p.area,
    bhk: p.bhk,
    dev: p.dev,
    done: p.done,
    price: p.price,
    img: p.img,
    gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.img],
    furn: 'Unfurnished',
    desc: p.desc,
    amenities: p.amenities,
    tag: p.tag,
    amt,
    aed,
  };
});
