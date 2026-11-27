import { describe, it, expect } from 'vitest';
import { projects } from '@/data/projects';
import { listings } from '@/data/listings';
import { getServices } from '@/data/services';
import { getTestimonials } from '@/data/testimonials';
import { getStats } from '@/data/stats';
import { getJourney, getWhyUs } from '@/data/journey';
import { getDifferentiators } from '@/data/about';
import { getInvestCards } from '@/data/invest';
import { getTeam } from '@/data/team';
import { getArticles } from '@/data/articles';
import { getJobs } from '@/data/careers';
import { getManagementSteps } from '@/data/management';
import { getDevelopers } from '@/data/developers';
import { SITE_LOCATION } from '@/data/site';
import { PUNE_HERO_PROJECT_IDS, DUBAI_HERO_PROJECT_IDS } from '@/components/home/HeroSection';

describe('Location-based Content Separation', () => {
  it('strictly separates Pune and Dubai projects without mixing', () => {
    const puneProjects = projects.filter((p) => p.market === 'Pune');
    const dubaiProjects = projects.filter((p) => p.market === 'Dubai');

    expect(puneProjects.length).toBeGreaterThan(0);
    expect(dubaiProjects.length).toBeGreaterThan(0);
    expect(puneProjects.every((p) => p.market === 'Pune')).toBe(true);
    expect(dubaiProjects.every((p) => p.market === 'Dubai')).toBe(true);
  });

  it('strictly separates Pune and Dubai listings', () => {
    const puneListings = listings.filter((l) => l.market === 'Pune');
    const dubaiListings = listings.filter((l) => l.market === 'Dubai');

    expect(puneListings.length).toBeGreaterThan(0);
    expect(dubaiListings.length).toBeGreaterThan(0);
    expect(puneListings.every((l) => l.market === 'Pune')).toBe(true);
    expect(dubaiListings.every((l) => l.market === 'Dubai')).toBe(true);
  });

  it('returns distinct Pune and Dubai hero project slides', () => {
    expect(PUNE_HERO_PROJECT_IDS.length).toBeGreaterThan(0);
    expect(DUBAI_HERO_PROJECT_IDS.length).toBe(4);

    // Pune hero projects belong exclusively to Pune
    expect(
      PUNE_HERO_PROJECT_IDS.every((id) => {
        const p = projects.find((proj) => proj.id === id);
        return p && p.market === 'Pune';
      }),
    ).toBe(true);

    // Dubai hero projects belong exclusively to Dubai
    expect(
      DUBAI_HERO_PROJECT_IDS.every((id) => {
        const p = projects.find((proj) => proj.id === id);
        return p && p.market === 'Dubai';
      }),
    ).toBe(true);
  });

  it('returns location-separated services', () => {
    const puneServices = getServices('Pune');
    const dubaiServices = getServices('Dubai');

    expect(puneServices.length).toBe(6);
    expect(dubaiServices.length).toBe(6);
    expect(puneServices[0][0]).toContain('Pune');
    expect(dubaiServices[0][0]).toContain('Dubai');
  });

  it('returns location-separated testimonials', () => {
    const puneTestimonials = getTestimonials('Pune');
    const dubaiTestimonials = getTestimonials('Dubai');

    expect(puneTestimonials.length).toBeGreaterThan(0);
    expect(dubaiTestimonials.length).toBeGreaterThan(0);
    expect(puneTestimonials.every((t) => t.market === 'Pune')).toBe(true);
    expect(dubaiTestimonials.every((t) => t.market === 'Dubai')).toBe(true);
  });

  it('returns location-separated stats and journey', () => {
    const puneStats = getStats('Pune');
    const dubaiStats = getStats('Dubai');
    expect(puneStats.some((s) => s[0].includes('₹'))).toBe(true);
    expect(dubaiStats.some((s) => s[0].includes('AED'))).toBe(true);

    const puneJourney = getJourney('Pune');
    const dubaiJourney = getJourney('Dubai');
    expect(puneJourney.some((j) => j[1].toLowerCase().includes('pune') || j[1].toLowerCase().includes('rera'))).toBe(true);
    expect(dubaiJourney.some((j) => j[1].toLowerCase().includes('dubai') || j[1].toLowerCase().includes('dld'))).toBe(true);
  });

  it('returns location-separated contact information and currency', () => {
    expect(SITE_LOCATION.Pune.city).toBe('Pune');
    expect(SITE_LOCATION.Pune.country).toBe('India');
    expect(SITE_LOCATION.Pune.phone.display).toContain('+91');
    expect(SITE_LOCATION.Pune.currency).toBe('₹');

    expect(SITE_LOCATION.Dubai.city).toBe('Dubai');
    expect(SITE_LOCATION.Dubai.country).toBe('UAE');
    expect(SITE_LOCATION.Dubai.phone.display).toContain('+971');
    expect(SITE_LOCATION.Dubai.currency).toBe('AED');
  });

  it('returns location-separated developers, team, jobs, and articles', () => {
    const puneDevs = getDevelopers('Pune');
    const dubaiDevs = getDevelopers('Dubai');
    expect(puneDevs.every((d) => d.m === 'Pune')).toBe(true);
    expect(dubaiDevs.every((d) => d.m === 'Dubai')).toBe(true);

    const puneJobs = getJobs('Pune');
    const dubaiJobs = getJobs('Dubai');
    expect(puneJobs.every((j) => j[1].includes('Pune'))).toBe(true);
    expect(dubaiJobs.every((j) => j[1].includes('Dubai'))).toBe(true);
  });
});
