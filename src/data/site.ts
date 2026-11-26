// Company-wide contact details. Edit here and the whole site updates.
export const SITE={
  name:'Aurelia Real Estate Company',
  tagline:'Beyond Properties. Beyond Expectations.',
  phones:[{label:'India',display:'+91 20 4123 4567',href:'tel:+912041234567'},{label:'UAE',display:'+971 4 589 7822',href:'tel:+97145897822'}],
  offices:[{city:'Pune',address:'Camp, Pune - 411001, India'},{city:'Dubai',address:'Business Bay, Dubai, UAE'}],
  whatsapp:'https://wa.me/912041234567',
  socials:{linkedin:'#',instagram:'#',youtube:'#',facebook:'#'},
};
// Navbar market tabs: each tab opens that market's properties and shows its own contact number.
export const MARKETS=[
  {key:'Pune',to:'/properties?market=Pune',phone:SITE.phones[0]},
  {key:'Dubai',to:'/properties?market=Dubai',phone:SITE.phones[1]},
];