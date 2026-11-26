// Videos for each project, sourced from PDF property links and their associated media pages.
// YouTube embeds use youtube-nocookie.com for privacy. MP4 urls are direct CDN links found on developer sites.
import type {ProjectVideo} from './types';

export const PROJECT_VIDEOS: Record<string, ProjectVideo[]> = {
  // --- Pune Residential ---
  'rohan-ekam': [
    {kind:'youtube',id:'TMtQ0Jlb5kQ',embed:'https://www.youtube-nocookie.com/embed/TMtQ0Jlb5kQ'},
    {kind:'youtube',id:'BoAg-YuczUA',embed:'https://www.youtube-nocookie.com/embed/BoAg-YuczUA'},
    {kind:'youtube',id:'wmZg6dUAq84',embed:'https://www.youtube-nocookie.com/embed/wmZg6dUAq84'},
  ],
  'godrej-river-crest': [
    {kind:'youtube',id:'XMQr8cHxEbU',embed:'https://www.youtube-nocookie.com/embed/XMQr8cHxEbU'},
    {kind:'youtube',id:'3oDfHUObhz4',embed:'https://www.youtube-nocookie.com/embed/3oDfHUObhz4'},
  ],
  'kalpataru-blossoms': [
    {kind:'youtube',id:'YDhqSO9M-WU',embed:'https://www.youtube-nocookie.com/embed/YDhqSO9M-WU'},
    {kind:'youtube',id:'RjpM_SCX49k',embed:'https://www.youtube-nocookie.com/embed/RjpM_SCX49k'},
  ],
  'kohinoor-kaleido': [
    {kind:'youtube',id:'ou_f_cIwp7w',embed:'https://www.youtube-nocookie.com/embed/ou_f_cIwp7w'},
  ],
  'anp-privado': [
    {kind:'youtube',id:'esa-6cEMaKc',embed:'https://www.youtube-nocookie.com/embed/esa-6cEMaKc'},
  ],
  'casagrand-caladium': [
    {kind:'youtube',id:'Ax9lL8FM--Q',embed:'https://www.youtube-nocookie.com/embed/Ax9lL8FM--Q'},
    {kind:'youtube',id:'utaHK4RNu7c',embed:'https://www.youtube-nocookie.com/embed/utaHK4RNu7c'},
  ],

  // --- Dubai Residential ---
  'ghaf-woods': [
    {kind:'mp4',url:'https://d4.maf.ae/videos/ghafwoodslibraries/default-video-library/261029-maf-lyra-4k-mini(1).mp4'},
  ],
  'damac-lagoons': [
    {kind:'mp4',url:'https://videos.ctfassets.net/zoq5l15g49wj/2etFwSF3aF3OINPnSe2nMj/492315c71ec8af3dc5379518f2d73e17/DP.com_Lagoons_Project_video__16X9_.mp4'},
    {kind:'mp4',url:'https://videos.ctfassets.net/zoq5l15g49wj/3PQRJUwk0ilUOkxiPb5uwE/c2150ccf01ebb0f75384e3d54b058477/DP.com_Lagoons_Project_video__9X16_.mp4'},
  ],
  'one-by-binghatti': [
    {kind:'mp4',url:'https://binghattiweb.imgix.net/listing.mp4'},
  ],
  'shahrukhz-residences': [
    {kind:'mp4',url:'https://asraarealty.com/wp-content/uploads/2026/10/shahrukhz-residences-video-tour-720.mp4'},
  ],

  // --- Dubai Commercial ---
  'lumena-omniyat': [
    {kind:'mp4',url:'https://cdn.prod.website-files.com/64cd0df1806781d956403b26%2F69cf932b3e47b7a8924e5179_OMNIYAT%20-%20Office%20Screen%20Content_WEB_mp4.mp4'},
    {kind:'youtube',id:'uFqFXxRjJG4',embed:'https://www.youtube-nocookie.com/embed/uFqFXxRjJG4'},
    {kind:'youtube',id:'lSapRUceTQA',embed:'https://www.youtube-nocookie.com/embed/lSapRUceTQA'},
    {kind:'youtube',id:'fy8VlBj1pAU',embed:'https://www.youtube-nocookie.com/embed/fy8VlBj1pAU'},
  ],
  'ahs-tower': [
    {kind:'mp4',url:'https://ahsproperties.com/wp-content/uploads/2026/05/Ceo-Video.mp4'},
    {kind:'mp4',url:'https://ahsproperties.com/wp-content/uploads/2026/05/new-web-vertical-video-.mp4'},
  ],
};
