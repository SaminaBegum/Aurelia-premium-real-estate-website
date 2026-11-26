export type Market='Pune'|'Dubai';
export type Category='Residential'|'Commercial';
export type ListingStatus='buy'|'rent';
export type VideoKind='youtube'|'mp4';

export interface ProjectVideo{
  kind:VideoKind;
  /** YouTube video ID (for kind='youtube') */
  id?:string;
  /** Full embed URL (for youtube iframes) */
  embed?:string;
  /** Direct MP4 URL (for kind='mp4') */
  url?:string;
  /** Optional thumbnail override; falls back to YouTube thumb or video poster */
  thumb?:string;
}

export interface Project{
  id:string;name:string;dev:string;category:Category;loc:string;market:Market;tag:string;bhk:string;area:string;
  price:number;type:string;img:string;logo:string|null;sold:number;done:string;beds:number[];
  coords:[number,number];near:string[];amenities:string[];gallery:string[];desc:string;quote:string;
  videos:ProjectVideo[];
}
export interface Listing{
  id:string;status:ListingStatus;market:Market;loc:string;project:string;projectId:string;type:string;
  beds:number;baths:number;area:number;img:string;gallery:string[];furn:string;desc:string;
  amenities:string[];tag:string;title:string;amt:number;aed:number;
  category?:Category;bhk?:string;areaText?:string;dev?:string;done?:string;price?:number;
}
export interface Developer{n:string;m:Market;l?:string;w?:string}
export type FieldType='text'|'email'|'tel'|'area'|'select';
export type Field=[label:string,type:FieldType,options?:string[],half?:boolean];
export type NavItem=[title:string,to:string,children:[string,string][]];
