import {describe,it,expect} from 'vitest';
import {projects} from '@/data/projects';
import {listings} from '@/data/listings';
describe('data integrity',()=>{
  it('has unique project ids',()=>expect(new Set(projects.map(p=>p.id)).size).toBe(projects.length));
  it('has unique listing ids',()=>expect(new Set(listings.map(l=>l.id)).size).toBe(listings.length));
  it('links every listing to a project',()=>expect(listings.every(l=>projects.some(p=>p.id===l.projectId))).toBe(true));
  it('gives each project coordinates and amenities',()=>expect(projects.every(p=>p.coords.length===2&&p.amenities.length>0&&p.gallery.length>0)).toBe(true));
});
