import {describe,it,expect} from 'vitest';
import {listings} from '@/data/listings';
import {filterListings,paginate,Filters} from '@/lib/listingFilters';
const base:Filters={status:'',market:'',loc:'',types:[],beds:'',min:0,max:0,sort:'new',page:1};
describe('filterListings',()=>{
  it('returns everything with no filters',()=>expect(filterListings(base)).toHaveLength(listings.length));
  it('filters by market',()=>{const r=filterListings({...base,market:'Dubai'});expect(r.length).toBeGreaterThan(0);expect(r.every(l=>l.market==='Dubai')).toBe(true)});
  it('sorts by price ascending',()=>{const r=filterListings({...base,sort:'lo'});for(let i=1;i<r.length;i++)expect(r[i].aed).toBeGreaterThanOrEqual(r[i-1].aed)});
  it('paginates and clamps the page',()=>{const p=paginate(listings,99,9);expect(p.current).toBe(p.pages);expect(p.items.length).toBeGreaterThan(0)});
});
