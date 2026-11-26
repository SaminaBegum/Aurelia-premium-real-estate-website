import {listings} from '@/data/listings';
export const getListings=()=>listings;
export const getListing=(id:string)=>listings.find(l=>l.id===id);
export const getSimilarListings=(id:string,market:string,n=3)=>listings.filter(l=>l.id!==id&&l.market===market).slice(0,n);
