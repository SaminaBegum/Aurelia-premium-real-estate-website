import type {Listing} from '@/data/types';
import {listings} from '@/data/listings';
import {PAGE_SIZE} from './constants';

export interface Filters{
  status:string;
  market:string;
  category?:string;
  loc:string;
  types:string[];
  beds:string;
  min:number;
  max:number;
  sort:string;
  page:number;
}

export const LOCATIONS=[...new Set(listings.map(l=>l.loc))];
export const locationsFor=(market:string)=>LOCATIONS.filter(l=>!market||(market==='Pune'?l.includes('Pune'):!l.includes('Pune')));

export function readFilters(g:(k:string)=>string):Filters{
  return {
    status:g('status'),
    market:g('market'),
    category:g('category'),
    loc:g('loc'),
    types:g('type')?g('type').split(','):[],
    beds:g('beds'),
    min:+g('min')||0,
    max:+g('max')||0,
    sort:g('sort')||'new',
    page:+g('page')||1
  };
}

export function filterListings(f:Filters,source:Listing[]=listings):Listing[]{
  let r=source.filter(l=>
    (!f.status||l.status===f.status)&&
    (!f.market||l.market===f.market)&&
    (!f.category||l.category===f.category)&&
    (!f.loc||l.loc===f.loc)&&
    (!f.types.length||f.types.includes(l.type))&&
    (!f.beds||(f.beds==='5'?l.beds>=5:l.beds===+f.beds))&&
    (!f.min||l.aed>=f.min)&&
    (!f.max||l.aed<=f.max)
  );
  if(f.sort==='lo') r=[...r].sort((a,b)=>a.aed-b.aed);
  if(f.sort==='hi') r=[...r].sort((a,b)=>b.aed-a.aed);
  return r;
}

export function paginate<T>(items:T[],page:number,size=PAGE_SIZE){
  const pages=Math.max(1,Math.ceil(items.length/size)),current=Math.min(Math.max(page,1),pages);
  return {pages,current,items:items.slice((current-1)*size,current*size)};
}
