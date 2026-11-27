// Company-wide contact details. Edit here and the whole site updates.
export const SITE = {
  name: 'Aurelia Real Estate Company',
  tagline: 'Beyond Properties. Beyond Expectations.',
  phones: [
    { label: 'India', display: '+91 20 4123 4567', href: 'tel:+912041234567' },
    { label: 'UAE', display: '+971 4 589 7822', href: 'tel:+97145897822' },
  ],
  offices: [
    { city: 'Pune', address: 'Camp, Pune - 411001, Maharashtra, India' },
    { city: 'Dubai', address: 'Business Bay, Dubai, United Arab Emirates' },
  ],
  emails: {
    Pune: 'pune@aureliarealestate.com',
    Dubai: 'dubai@aureliarealestate.com',
    general: 'info@aureliarealestate.com',
  },
  whatsapp: 'https://wa.me/912041234567',
  whatsappPune: 'https://wa.me/912041234567',
  whatsappDubai: 'https://wa.me/97145897822',
  socials: { linkedin: '#', instagram: '#', youtube: '#', facebook: '#' },
};

export const SITE_LOCATION = {
  Pune: {
    city: 'Pune',
    country: 'India',
    address: 'Camp, Pune - 411001, Maharashtra, India',
    topBarLocation: 'Pune, Maharashtra, India',
    phone: SITE.phones[0],
    email: 'pune@aureliarealestate.com',
    whatsapp: 'https://wa.me/912041234567',
    currency: '₹' as const,
    currencyName: 'INR',
    footerTagline: 'Beyond Properties. Beyond Expectations. Premium real estate across Pune, Maharashtra — from first search to final handover.',
  },
  Dubai: {
    city: 'Dubai',
    country: 'UAE',
    address: 'Business Bay, Dubai, United Arab Emirates',
    topBarLocation: 'Business Bay, Dubai, UAE',
    phone: SITE.phones[1],
    email: 'dubai@aureliarealestate.com',
    whatsapp: 'https://wa.me/97145897822',
    currency: 'AED' as const,
    currencyName: 'AED',
    footerTagline: 'Beyond Properties. Beyond Expectations. Premium real estate across Dubai, UAE — from first search to final handover.',
  },
};

// Navbar market tabs: each tab opens that market's properties and shows its own contact number.
export const MARKETS = [
  { key: 'Pune', to: '/properties?market=Pune', phone: SITE.phones[0] },
  { key: 'Dubai', to: '/properties?market=Dubai', phone: SITE.phones[1] },
];
