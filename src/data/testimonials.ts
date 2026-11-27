import type { Market } from './types';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  project?: string;
  market: Market;
}

export const TESTIMONIALS: Record<Market, Testimonial[]> = {
  Pune: [
    {
      id: 'pune-1',
      name: 'Dr. Rajesh Deshmukh',
      role: 'Homeowner & Surgeon',
      location: 'Baner, Pune',
      quote: 'Aurelia made buying our home at Lodha Massimo completely stress-free. Their understanding of the Baner Hill micro-market and RERA documentation is unmatched.',
      rating: 5,
      project: 'Lodha Massimo',
      market: 'Pune',
    },
    {
      id: 'pune-2',
      name: 'Pooja Kulkarni',
      role: 'VP of Technology',
      location: 'Balewadi, Pune',
      quote: 'As an IT professional with limited time, I needed a trusted advisor. Aurelia shortlisted Rohan Ekam for us and negotiated the best configuration directly with the builder.',
      rating: 5,
      project: 'Rohan Ekam',
      market: 'Pune',
    },
    {
      id: 'pune-3',
      name: 'Vikram Joshi',
      role: 'Commercial Investor',
      location: 'Hinjewadi, Pune',
      quote: 'Secured two corporate bare-shell office floors in Baner through Aurelia. Their rental yield analysis and handover support have been flawless.',
      rating: 5,
      project: 'Kohinoor Business Tower',
      market: 'Pune',
    },
    {
      id: 'pune-4',
      name: 'Sunil & Anita Shah',
      role: 'NRI Investors (UK)',
      location: 'Pimple Nilakh, Pune',
      quote: 'Investing from London was made seamless by Aurelia. From video walkthroughs to power of attorney and registration at 24K Manor, everything was handled transparently.',
      rating: 5,
      project: '24K Manor',
      market: 'Pune',
    },
  ],
  Dubai: [
    {
      id: 'dubai-1',
      name: 'Tariq Al-Mansoor',
      role: 'Private Equity Investor',
      location: 'Downtown, Dubai',
      quote: 'Aurelia secured an exclusive high-floor unit for us at Burj Binghatti Jacob & Co. Their direct developer relationships and zero-commission advisory are first class.',
      rating: 5,
      project: 'Burj Binghatti Jacob & Co',
      market: 'Dubai',
    },
    {
      id: 'dubai-2',
      name: 'Elena Rostova',
      role: 'Luxury Homeowner',
      location: 'Palm Jebel Ali, Dubai',
      quote: 'Purchasing our beachfront villa through Aurelia was the smoothest international real estate transaction we have experienced. Professional, discreet, and deeply knowledgeable.',
      rating: 5,
      project: 'Palm Jebel Ali',
      market: 'Dubai',
    },
    {
      id: 'dubai-3',
      name: 'Sameer Merchant',
      role: 'Global Tech Founder',
      location: 'Business Bay, Dubai',
      quote: 'Aurelia helped us acquire our regional corporate headquarters at Lumena by Omniyat and managed our Golden Visa applications seamlessly.',
      rating: 5,
      project: 'Lumena by Omniyat',
      market: 'Dubai',
    },
    {
      id: 'dubai-4',
      name: 'Marcus & Sophie Vance',
      role: 'Family Relocation (Singapore)',
      location: 'Dubailand, Dubai',
      quote: 'Our eco-luxury townhouse at Ghaf Woods was handpicked by Aurelia. Their post-handover property management has given us tremendous peace of mind.',
      rating: 5,
      project: 'Ghaf Woods',
      market: 'Dubai',
    },
  ],
};

export const getTestimonials = (market: Market) => TESTIMONIALS[market];
