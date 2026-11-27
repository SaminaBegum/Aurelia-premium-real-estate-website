import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  MapPin, Phone, Check, ArrowRight, Waves, Dumbbell, Trees, Baby, Users,
  Car, ShieldCheck, Zap, Trophy, Film, Building2,
  ChevronLeft, ChevronRight, X, Play, Images,
} from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHead } from '@/components/ui/SectionHead';
import { FloorPlan } from '@/components/FloorPlan';
import { EnquiryForm } from '@/components/EnquiryForm';
import { getProject } from '@/api/api';
import { projects } from '@/data/projects';
import { PAYMENT_PLANS } from '@/data/paymentPlans';
import { ENQUIRY_FIELDS } from '@/data/forms';
import { SITE } from '@/data/site';
import { A } from '@/lib/assets';
import { startPrice, unit } from '@/lib/format';
import { useLocationContext } from '@/contexts/LocationContext';

const SECTIONS = [
  ['overview', 'Overview'],
  ['gallery', 'Gallery'],
  ['floor-plans', 'Floor Plans'],
  ['location', 'Location'],
  ['amenities', 'Amenities'],
  ['payment-plan', 'Payment Plan'],
  ['enquire', 'Enquire'],
];

/* All new styles are scoped under .pdx so they never leak to other pages.
   Colours are the existing Aurelia gold / black / cream. */
const CSS = `
.pdx{--g:#b08d3c;--g2:#d4b46a;--ink:#1e293b}

/* ---------- Hero: one staggered load sequence ---------- */
.pdx .ph.pd .w>*{animation:pdxIn .8s cubic-bezier(.2,.7,.2,1) both}
.pdx .ph.pd .w>*:nth-child(1){animation-delay:.05s}
.pdx .ph.pd .w>*:nth-child(2){animation-delay:.15s}
.pdx .ph.pd .w>*:nth-child(3){animation-delay:.25s}
.pdx .ph.pd .w>*:nth-child(4){animation-delay:.35s}
.pdx .ph.pd .w>*:nth-child(5){animation-delay:.45s}
.pdx .ph.pd .w>*:nth-child(6){animation-delay:.6s}
@keyframes pdxIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}

.pdx .pdx-stats{display:flex;flex-wrap:wrap;gap:1px;margin-top:2.2rem;max-width:660px;
  background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.22);border-radius:12px;
  overflow:hidden;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.pdx .pdx-stats>div{flex:1 1 160px;padding:1rem 1.3rem;background:rgba(0,0,0,.5);display:flex;flex-direction:column;gap:.25rem}
.pdx .pdx-stats span{font-size:.78rem;letter-spacing:.04em;color:var(--g2)}
.pdx .pdx-stats b{font-size:1.15rem;font-weight:600;color:#fff}

/* ---------- Sticky sub-nav ---------- */
.pdx .sub-n .w{overflow-x:auto;white-space:nowrap;scrollbar-width:none}
.pdx .sub-n .w::-webkit-scrollbar{display:none}
.pdx .sub-n button{transition:color .25s}
.pdx .sub-n button:hover{color:var(--g)}
.pdx .pdx-prog{position:absolute;left:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--g),var(--g2));
  transition:width .12s linear;pointer-events:none}

/* ---------- Overview ---------- */
.pdx #overview{align-items:start}
.pdx #overview blockquote{margin:1.2rem 0 1.6rem;padding:.4rem 0 .4rem 1.4rem;border-left:3px solid var(--g);
  font-size:1.2rem;line-height:1.6;font-style:italic;color:var(--ink);max-width:62ch}
.pdx #overview p{line-height:1.8}

.pdx .pdx-cfg{margin-top:1.8rem;border:1px solid rgba(176,141,60,.35);border-radius:12px;overflow:hidden;background:#fff;
  box-shadow:0 10px 30px -18px rgba(0,0,0,.25)}
.pdx .pdx-cfg h4{margin:0;padding:.85rem 1.3rem;background:#000;color:var(--g2);font-size:.85rem;font-weight:600;letter-spacing:.06em}
.pdx .pdx-cfg-row{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:.5rem;
  padding:.9rem 1.3rem;border-bottom:1px dashed rgba(0,0,0,.12);transition:background .2s}
.pdx .pdx-cfg-row:last-child{border-bottom:0}
.pdx .pdx-cfg-row:hover{background:rgba(176,141,60,.07)}
.pdx .pdx-cfg-row span{color:var(--ink);font-weight:500}
.pdx .pdx-cfg-row b{color:var(--g);font-weight:700;font-size:1.02rem}

.pdx #overview .facts{display:block!important;grid-template-columns:none!important;position:sticky;top:140px;align-self:start;
  background:#000!important;color:#fff;border-radius:16px!important;border-top:4px solid var(--g);
  padding:1.8rem 1.8rem 1.6rem!important;box-shadow:0 30px 60px -30px rgba(0,0,0,.55)!important}
.pdx #overview .facts>div{background:transparent!important;box-shadow:none!important;border-radius:0!important;margin:0!important;
  padding:.95rem 0!important;border:0;border-bottom:1px solid rgba(255,255,255,.14);
  display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:.3rem .8rem}
.pdx #overview .facts>div span{font-size:.86rem;font-weight:400;color:rgba(255,255,255,.6)}
.pdx #overview .facts>div b{font-size:1rem;font-weight:600;color:#fff;text-align:right}
.pdx #overview .facts>div:first-child{display:block;padding-top:0!important;border-bottom:1px solid rgba(176,141,60,.6)}
.pdx #overview .facts>div:first-child b{display:block;margin-top:.35rem;font-size:2.3rem;line-height:1.1;color:var(--g2);text-align:left}
.pdx #overview .facts .bar{display:block;flex-basis:100%;height:7px;border-radius:99px;background:rgba(255,255,255,.18);overflow:hidden;margin-top:.5rem}
.pdx #overview .facts .bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--g),var(--g2));
  animation:pdxBar 1.2s .4s cubic-bezier(.2,.7,.2,1) both;transform-origin:left}
@keyframes pdxBar{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.pdx #overview .facts .btn{display:flex;width:100%;margin-top:1.5rem;justify-content:center}
.pdx .pdx-call{display:flex;align-items:center;justify-content:center;gap:.5rem;margin:1rem 0 0;font-size:.92rem;color:rgba(255,255,255,.75)}
.pdx .pdx-call a{color:var(--g2);text-decoration:none;font-weight:500}
.pdx .pdx-call a:hover{text-decoration:underline}

/* ---------- Alternating full-width bands ---------- */
.pdx #floor-plans,.pdx #amenities{background:#fff;box-shadow:0 0 0 100vmax #fff;clip-path:inset(0 -100vmax)}
.pdx #floor-plans .fps figure,.pdx #amenities .am>div{background:#faf8f3}

/* ---------- Tabs (floor plans / payment plans) ---------- */
.pdx .tabs{display:flex;gap:.6rem;flex-wrap:wrap;margin:1.4rem 0 1.8rem}
.pdx .tabs button{padding:.6rem 1.3rem;border-radius:99px;border:1px solid rgba(176,141,60,.45);background:transparent;
  color:var(--ink);font-weight:500;cursor:pointer;transition:all .25s}
.pdx .tabs button:hover{border-color:var(--g);color:var(--g)}
.pdx .tabs button.on{background:var(--g);border-color:var(--g);color:#fff}

/* ---------- Gallery (photos mosaic + videos + lightbox) ---------- */
.pdx .gx-tabs{margin-top:1.2rem}
.pdx .gx-tabs button{display:inline-flex;align-items:center;gap:.45rem}
.pdx .gx-tabs em{font-style:normal;font-size:.78rem;opacity:.75}

.pdx .gx-mosaic{position:relative;display:grid;gap:.7rem;height:clamp(300px,42vw,500px);border-radius:16px;overflow:hidden}
.pdx .gx-tile{position:relative;padding:0;border:0;background:#e9e4d8;cursor:pointer;overflow:hidden;display:block;min-height:0}
.pdx .gx-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.pdx .gx-tile:hover img{transform:scale(1.06)}
.pdx .gx-tile::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(0,0,0,.25));opacity:0;transition:opacity .3s}
.pdx .gx-tile:hover::after{opacity:1}
.pdx .gx-more{position:absolute;inset:0;z-index:1;display:grid;place-items:center;background:rgba(0,0,0,.55);color:#fff;
  font-size:1.5rem;font-weight:600;letter-spacing:.02em;backdrop-filter:blur(2px)}
.pdx .gx-all{position:absolute;right:1rem;bottom:1rem;z-index:2;display:inline-flex;align-items:center;gap:.5rem;
  padding:.65rem 1.1rem;border-radius:99px;border:1px solid rgba(255,255,255,.6);background:rgba(0,0,0,.72);
  color:#fff;font-weight:500;font-size:.9rem;cursor:pointer;backdrop-filter:blur(6px);transition:background .25s,border-color .25s}
.pdx .gx-all:hover{background:var(--g);border-color:var(--g)}

/* layouts by number of tiles shown */
.pdx .gx-m1{grid-template-columns:1fr}
.pdx .gx-m2{grid-template-columns:1fr 1fr}
.pdx .gx-m3{grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr}
.pdx .gx-m3 .gx-tile:first-child{grid-row:1/3}
.pdx .gx-m4{grid-template-columns:2fr 1fr;grid-template-rows:repeat(3,1fr)}
.pdx .gx-m4 .gx-tile:first-child{grid-row:1/4}
.pdx .gx-m5{grid-template-columns:2fr 1fr 1fr;grid-template-rows:1fr 1fr}
.pdx .gx-m5 .gx-tile:first-child{grid-row:1/3}

@media(max-width:720px){
  .pdx .gx-mosaic{height:auto}
  .pdx .gx-m2,.pdx .gx-m3,.pdx .gx-m4,.pdx .gx-m5{grid-template-columns:1fr 1fr;grid-template-rows:none}
  .pdx .gx-mosaic .gx-tile{aspect-ratio:4/3}
  .pdx .gx-mosaic .gx-tile:first-child{grid-column:1/3;grid-row:auto;aspect-ratio:16/10}
  .pdx .gx-m1 .gx-tile{aspect-ratio:16/10}
  .pdx .gx-all{right:.6rem;bottom:.6rem;font-size:.8rem;padding:.5rem .85rem}
}

/* videos */
.pdx .gx-vids{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.1rem}
.pdx .gx-vid{position:relative;padding:0;border:0;border-radius:14px;overflow:hidden;background:#111;cursor:pointer;
  aspect-ratio:16/9;box-shadow:0 18px 36px -24px rgba(0,0,0,.5);transition:transform .3s,box-shadow .3s}
.pdx .gx-vid:hover{transform:translateY(-4px);box-shadow:0 26px 44px -22px rgba(0,0,0,.6)}
.pdx .gx-vid img{width:100%;height:100%;object-fit:cover;display:block;opacity:.85;transition:opacity .3s,transform .5s}
.pdx .gx-vid:hover img{opacity:1;transform:scale(1.05)}
.pdx .gx-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;
  display:grid;place-items:center;background:var(--g);color:#000;box-shadow:0 0 0 8px rgba(176,141,60,.3);transition:transform .3s}
.pdx .gx-vid:hover .gx-play{transform:translate(-50%,-50%) scale(1.12)}

/* lightbox */
.pdx .gx-lb{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.94);display:flex;flex-direction:column;
  animation:gxFade .25s ease both}
@keyframes gxFade{from{opacity:0}to{opacity:1}}
.pdx .gx-lb-top{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.4rem;color:#fff;font-size:.95rem}
.pdx .gx-lb-top span{color:var(--g2);letter-spacing:.06em}
.pdx .gx-lb-x,.pdx .gx-lb-nav{display:grid;place-items:center;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);
  color:#fff;border-radius:50%;cursor:pointer;transition:background .25s,border-color .25s}
.pdx .gx-lb-x{width:42px;height:42px}
.pdx .gx-lb-x:hover,.pdx .gx-lb-nav:hover{background:var(--g);border-color:var(--g);color:#000}
.pdx .gx-lb-stage{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:0 4.5rem}
.pdx .gx-lb-stage img,.pdx .gx-lb-stage iframe,.pdx .gx-lb-stage video{max-width:100%;max-height:100%;border-radius:10px;border:0;
  box-shadow:0 30px 80px -20px rgba(0,0,0,.8)}
.pdx .gx-lb-stage iframe,.pdx .gx-lb-stage video{width:min(100%,1100px);aspect-ratio:16/9;background:#000}
.pdx .gx-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px}
.pdx .gx-lb-nav.p{left:1rem}
.pdx .gx-lb-nav.n{right:1rem}
.pdx .gx-lb-strip{display:flex;gap:.55rem;overflow-x:auto;padding:1rem 1.2rem 1.2rem;justify-content:safe center;scrollbar-width:thin}
.pdx .gx-lb-strip button{flex:none;width:84px;height:58px;padding:0;border-radius:8px;overflow:hidden;border:2px solid transparent;
  background:#222;cursor:pointer;opacity:.55;transition:opacity .25s,border-color .25s}
.pdx .gx-lb-strip button.on{opacity:1;border-color:var(--g)}
.pdx .gx-lb-strip img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:720px){
  .pdx .gx-lb-stage{padding:0 .5rem}
  .pdx .gx-lb-nav{width:40px;height:40px}
  .pdx .gx-lb-nav.p{left:.4rem}
  .pdx .gx-lb-nav.n{right:.4rem}
  .pdx .gx-lb-strip button{width:64px;height:46px}
}

/* ---------- Floor plans ---------- */
.pdx .fps{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.4rem}
.pdx .fps figure{margin:0;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:14px;padding:1rem;
  transition:transform .3s,box-shadow .3s,border-color .3s}
.pdx .fps figure:hover{transform:translateY(-5px);box-shadow:0 22px 40px -22px rgba(0,0,0,.35);border-color:var(--g)}
.pdx .fps figcaption{margin-top:.8rem;text-align:center;font-weight:500;color:var(--ink)}

/* ---------- Location ---------- */
.pdx .loc{display:grid;grid-template-columns:1.4fr 1fr;gap:2rem;align-items:center}
.pdx .loc iframe{width:100%;min-height:380px;border:0;border-radius:14px;box-shadow:0 24px 50px -28px rgba(0,0,0,.4)}
.pdx .loc .tick{list-style:none;padding:0;margin:0 0 1rem}
.pdx .loc .tick li{display:flex;align-items:center;gap:.7rem;padding:.7rem 0;border-bottom:1px dashed rgba(0,0,0,.14)}
.pdx .loc .tick li svg{flex:none;color:var(--g)}
@media(max-width:820px){.pdx .loc{grid-template-columns:1fr}}

/* ---------- Amenities ---------- */
.pdx .am{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1rem}
.pdx .am>div{display:flex;align-items:center;gap:.9rem;padding:1rem 1.2rem;background:#fff;border:1px solid rgba(0,0,0,.08);
  border-radius:12px;font-weight:500;color:var(--ink);transition:border-color .25s,transform .25s}
.pdx .am>div:hover{border-color:var(--g);transform:translateY(-3px)}
.pdx .am .pdx-ai{flex:none;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:rgba(176,141,60,.14);color:var(--g);transition:all .25s}
.pdx .am>div:hover .pdx-ai{background:var(--g);color:#fff}

/* ---------- Payment plan: instalments in sequence ---------- */
.pdx .pp{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:1.2rem;position:relative;padding-top:1.6rem}
.pdx .pp::before{content:"";position:absolute;left:0;right:0;top:.45rem;height:2px;background:rgba(176,141,60,.35)}
.pdx .pp>div{position:relative;display:flex;flex-direction:column;gap:.35rem;padding:1.2rem 1.3rem;background:#fff;
  border:1px solid rgba(0,0,0,.08);border-radius:12px;transition:border-color .25s,box-shadow .25s}
.pdx .pp>div::before{content:"";position:absolute;top:-1.55rem;left:1.3rem;width:12px;height:12px;border-radius:50%;
  background:var(--g);box-shadow:0 0 0 4px #fff,0 0 0 5px var(--g)}
.pdx .pp>div:hover{border-color:var(--g);box-shadow:0 18px 36px -24px rgba(0,0,0,.4)}
.pdx .pp b{font-size:1.8rem;color:var(--g);font-weight:700;line-height:1.1}
.pdx .pp span{color:var(--ink);font-size:.92rem}

/* ---------- Enquire panel ---------- */
.pdx #enquire.enq{background:#000;border:1px solid rgba(176,141,60,.45);border-radius:18px;padding:3rem 2.5rem;
  margin-bottom:3rem;align-items:center}
.pdx #enquire.enq h2{color:#fff}
.pdx #enquire.enq .eb{color:var(--g2)}
.pdx #enquire.enq p{color:rgba(255,255,255,.78);line-height:1.75}
.pdx #enquire.enq .cl{display:flex;align-items:center;flex-wrap:wrap;gap:.5rem;color:#fff}
.pdx #enquire.enq .cl a{color:var(--g2);text-decoration:none;font-weight:500}
.pdx #enquire.enq .cl a:hover{text-decoration:underline}
.pdx #enquire.enq .card{background:#fff;border-radius:14px;padding:1.8rem}
@media(max-width:720px){.pdx #enquire.enq{padding:2rem 1.2rem;border-radius:14px}}

/* ---------- Mobile sticky CTA ---------- */
.pdx .pdx-mcta{display:none}
@media(max-width:720px){
  .pdx{padding-bottom:70px}
  .pdx .pdx-mcta{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:50;gap:.6rem;padding:.7rem 1rem;
    background:#000;border-top:1px solid rgba(176,141,60,.5)}
  .pdx .pdx-mcta button,.pdx .pdx-mcta a{flex:1;display:flex;align-items:center;justify-content:center;gap:.4rem;
    padding:.8rem;border-radius:8px;font-weight:600;font-size:.95rem;text-decoration:none;border:0;cursor:pointer}
  .pdx .pdx-mcta button{background:var(--g);color:#000}
  .pdx .pdx-mcta a{background:transparent;color:var(--g2);border:1px solid var(--g)}
}

@media(prefers-reduced-motion:reduce){
  .pdx *,.pdx *::before{animation:none!important;transition:none!important}
}
`;

const amenityIcon = (name: string) => {
  const n = name.toLowerCase();
  const sz = 18;
  if (/pool|swim|spa|jacuzzi/.test(n)) return <Waves size={sz} />;
  if (/gym|fitness|yoga|health/.test(n)) return <Dumbbell size={sz} />;
  if (/garden|park|jog|tree|green|landscap|walk/.test(n)) return <Trees size={sz} />;
  if (/kid|child|play|creche/.test(n)) return <Baby size={sz} />;
  if (/club|party|hall|lounge|banquet|community|social/.test(n)) return <Users size={sz} />;
  if (/park(ing)?|ev |charging|car/.test(n)) return <Car size={sz} />;
  if (/secur|cctv|gate|safe|fire/.test(n)) return <ShieldCheck size={sz} />;
  if (/power|backup|solar|energy|lift|elevator/.test(n)) return <Zap size={sz} />;
  if (/sport|court|tennis|cricket|badminton|basket|squash|game/.test(n)) return <Trophy size={sz} />;
  if (/theatre|theater|cinema|movie/.test(n)) return <Film size={sz} />;
  if (/tower|building|sky|terrace|deck|library|co-?work/.test(n)) return <Building2 size={sz} />;
  return <Check size={sz} />;
};

/* ====================================================================
   Gallery: photos and videos are kept apart, so the layout stays clean.
   - Photos: 1 big + up to 4 small tiles (same-height grid), "+N" overlay
   - Videos: separate tab, uniform 16:9 cards
   - Click anything -> full-screen lightbox with arrows, keys, thumbnails
   ==================================================================== */
type Media = { kind: 'img' | 'yt' | 'file'; src: string; thumb?: string };

const ytId = (v: string) => {
  const m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(v) ? v : null;
};

const toVideo = (v: unknown): Media | null => {
  const o = v as any;
  const raw: string = typeof v === 'string' ? v : o?.url || o?.src || o?.id || '';
  if (!raw) return null;
  const id = ytId(raw);
  if (id) {
    return {
      kind: 'yt',
      src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }
  return { kind: 'file', src: A(raw) };
};

function ProjectGallery({
  imgs,
  videos,
  alt,
}: {
  imgs: string[];
  videos?: unknown[];
  alt: string;
}) {
  const photos: Media[] = (imgs || []).map((s) => ({ kind: 'img', src: A(s), thumb: A(s) }));
  const vids: Media[] = (videos || []).map(toVideo).filter(Boolean) as Media[];

  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [lb, setLb] = useState<number | null>(null);

  const list = tab === 'photos' ? photos : vids;

  const close = useCallback(() => setLb(null), []);
  const step = useCallback(
    (d: number) =>
      setLb((i) => (i === null || !list.length ? i : (i + d + list.length) % list.length)),
    [list.length],
  );

  // keyboard + body scroll lock while lightbox is open
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [lb, close, step]);

  const shown = photos.slice(0, 5);
  const extra = photos.length - shown.length;
  const cur = lb !== null ? list[lb] : null;

  return (
    <>
      {vids.length > 0 && photos.length > 0 && (
        <div className="tabs gx-tabs">
          <button className={tab === 'photos' ? 'on' : ''} onClick={() => { setTab('photos'); setLb(null); }}>
            <Images size={16} /> Photos <em>{photos.length}</em>
          </button>
          <button className={tab === 'videos' ? 'on' : ''} onClick={() => { setTab('videos'); setLb(null); }}>
            <Play size={16} /> Videos <em>{vids.length}</em>
          </button>
        </div>
      )}

      {tab === 'photos' || !vids.length ? (
        photos.length > 0 && (
          <div className={`gx-mosaic gx-m${shown.length}`} style={vids.length ? undefined : { marginTop: '1.4rem' }}>
            {shown.map((m, i) => (
              <button
                key={m.src + i}
                className="gx-tile"
                onClick={() => setLb(i)}
                aria-label={`Open photo ${i + 1}`}
              >
                <img src={m.src} alt={`${alt} ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
                {i === shown.length - 1 && extra > 0 && <span className="gx-more">+{extra}</span>}
              </button>
            ))}
            <button className="gx-all" onClick={() => setLb(0)}>
              <Images size={16} /> View all {photos.length} photos
            </button>
          </div>
        )
      ) : (
        <div className="gx-vids">
          {vids.map((m, i) => (
            <button key={m.src + i} className="gx-vid" onClick={() => setLb(i)} aria-label={`Play video ${i + 1}`}>
              {m.thumb && <img src={m.thumb} alt={`${alt} video ${i + 1}`} loading="lazy" />}
              <span className="gx-play">
                <Play size={22} fill="currentColor" />
              </span>
            </button>
          ))}
        </div>
      )}

      {cur && lb !== null && (
        <div
          className="gx-lb"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} gallery`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="gx-lb-top" onClick={(e) => e.stopPropagation()}>
            <span>
              {alt} · {lb + 1} / {list.length}
            </span>
            <button className="gx-lb-x" onClick={close} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="gx-lb-stage" onClick={(e) => e.target === e.currentTarget && close()}>
            {list.length > 1 && (
              <button className="gx-lb-nav p" onClick={() => step(-1)} aria-label="Previous">
                <ChevronLeft size={24} />
              </button>
            )}

            {cur.kind === 'img' && <img key={cur.src} src={cur.src} alt={`${alt} ${lb + 1}`} />}
            {cur.kind === 'yt' && (
              <iframe
                key={cur.src}
                src={cur.src}
                title={`${alt} video`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
            {cur.kind === 'file' && <video key={cur.src} src={cur.src} controls autoPlay playsInline />}

            {list.length > 1 && (
              <button className="gx-lb-nav n" onClick={() => step(1)} aria-label="Next">
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {list.length > 1 && (
            <div className="gx-lb-strip" onClick={(e) => e.stopPropagation()}>
              {list.map((m, i) => (
                <button key={m.src + i} className={i === lb ? 'on' : ''} onClick={() => setLb(i)} aria-label={`Go to ${i + 1}`}>
                  {m.thumb && <img src={m.thumb} alt="" loading="lazy" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function ProjectDetail() {
  const { id = '' } = useParams();
  const { market } = useLocationContext();
  const navigate = useNavigate();

  // Find project strictly belonging to the currently active market
  const exact = useMemo(() => projects.find((proj) => proj.id === id && proj.market === market), [id, market]);

  // If not found in active market, check if this ID belongs to the previous market to find an equivalent
  const prevP = useMemo(() => (!exact ? projects.find((proj) => proj.id === id) : undefined), [exact, id]);

  const equivP = useMemo(() => {
    if (!prevP) return undefined;
    const targetProjects = projects.filter((proj) => proj.market === market);
    if (!targetProjects.length) return undefined;
    return (
      targetProjects.find((proj) => proj.dev.toLowerCase() === prevP.dev.toLowerCase()) ||
      targetProjects.find(
        (proj) => proj.category === prevP.category && proj.type.toLowerCase() === prevP.type.toLowerCase()
      ) ||
      targetProjects.find((proj) => proj.category === prevP.category) ||
      targetProjects[0]
    );
  }, [prevP, market]);

  const p = exact || equivP;

  // Sync route if viewing an equivalent project in the new market
  useEffect(() => {
    if (!exact && prevP) {
      if (equivP) {
        navigate(`/exclusive-projects/${equivP.id}`, { replace: true });
      } else {
        navigate('/exclusive-projects', { replace: true });
      }
    }
  }, [exact, prevP, equivP, navigate]);

  const [fb, setFb] = useState(0);
  const [pl, setPl] = useState(0);
  const [act, setAct] = useState('overview');
  const [prog, setProg] = useState(0);

  useEffect(() => {
    setFb(0);
    setPl(0);
  }, [id, p?.id]);

  // highlight the active section in the sub-nav
  useEffect(() => {
    if (!p) return;

    const o = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAct(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );

    SECTIONS.forEach(([s]) => {
      const el = document.getElementById(s);
      el && o.observe(el);
    });

    return () => o.disconnect();
  }, [id]);

  // thin gold reading-progress line under the sub-nav
  useEffect(() => {
    if (!p) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProg(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [id]);

  if (!p)
    return (
      <InnerPageBanner
        title="Project not found"
        crumbs={[
          ['Home', '/'],
          ['Off-Plan Projects', '/exclusive-projects'],
        ]}
      >
        <Link className="btn gold" to="/exclusive-projects">
          Browse projects
        </Link>
      </InnerPageBanner>
    );

  const go = (s: string) =>
    document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const u = unit(p);
  const bed = p.beds[fb];
  const [lat, lng] = p.coords;

  const hasCfg = p.desc.includes('Configurations & Indicative Price:');
  const [aboutTxt, cfgTxt] = hasCfg
    ? p.desc.split('Configurations & Indicative Price:')
    : [p.desc, ''];
  const cfgItems = cfgTxt
    ? cfgTxt
      .split('|')
      .map((s) => s.trim().replace(/\.$/, ''))
      .filter(Boolean)
    : [];

  const projectPhone = p.market === 'Pune' ? SITE.phones[0] : SITE.phones[1];

  return (
    <div className="pdx">
      <style>{CSS}</style>

      <section
        className="ph pd"
        style={{ '--bg': `url(${A(p.img)})` } as React.CSSProperties}
      >
        <div className="w">
          <Breadcrumbs
            items={[
              ['Home', '/'],
              ['Off-Plan Projects', '/exclusive-projects'],
              [p.name],
            ]}
          />
          <small>{p.dev}</small>
          <h1>{p.name}</h1>
          <p>
            <MapPin size={16} /> {p.loc}
          </p>
          <button className="btn gold" onClick={() => go('enquire')}>
            Register Your Interest
          </button>
          <div className="pdx-stats">
            <div>
              <span>Starting price</span>
              <b>{startPrice(p)}</b>
            </div>
            <div>
              <span>Completion</span>
              <b>{p.done}</b>
            </div>
            <div>
              <span>Configuration</span>
              <b>{p.bhk}</b>
            </div>
          </div>
        </div>
      </section>

      <div className="sub-n">
        <div className="w">
          {SECTIONS.map(([s, t]) => (
            <button key={s} className={act === s ? 'on' : ''} onClick={() => go(s)}>
              {t}
            </button>
          ))}
        </div>
        <i className="pdx-prog" style={{ width: prog + '%' }} />
      </div>

      <section id="overview" className="w sec two">
        <div>
          <small className="eb">About</small>
          <h2>{p.name}</h2>
          <blockquote>“{p.quote}”</blockquote>

          <p>{aboutTxt.trim()}</p>

          {cfgItems.length > 0 && (
            <div className="pdx-cfg">
              <h4>Configurations & Indicative Price</h4>
              {cfgItems.map((item, idx) => {
                const cIdx = item.indexOf(':');
                if (cIdx > -1) {
                  return (
                    <div className="pdx-cfg-row" key={idx}>
                      <span>{item.slice(0, cIdx).trim()}</span>
                      <b>{item.slice(cIdx + 1).trim()}</b>
                    </div>
                  );
                }
                return (
                  <div className="pdx-cfg-row" key={idx}>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="facts">
          <div>
            <span>Starting price</span>
            <b>{startPrice(p)}</b>
          </div>
          <div>
            <span>Completion</span>
            <b>{p.done}</b>
          </div>
          {p.sold > 0 && (
            <div>
              <span>Sales progress</span>
              <b>{p.sold}% sold</b>
              <i className="bar">
                <i style={{ width: p.sold + '%' }} />
              </i>
            </div>
          )}
          <div>
            <span>Property type</span>
            <b>
              {p.type} · {p.bhk}
            </b>
          </div>
          <button className="btn gold" onClick={() => go('enquire')}>
            Get price & floor plans
          </button>
          <p className="pdx-call">
            <Phone size={15} />
            <a href={projectPhone.href}>{projectPhone.display}</a>
          </p>
        </div>
      </section>

      <section id="gallery" className="w sec">
        <SectionHead eyebrow="Gallery" title={`${p.name} in pictures`} />
        <ProjectGallery imgs={p.gallery} videos={p.videos} alt={p.name} />
      </section>

      <section id="floor-plans" className="w sec">
        <SectionHead
          eyebrow="Layouts"
          title={`${p.name} floor plans`}
          sub="Indicative layouts. Detailed plans are shared on request."
        />
        <div className="tabs">
          {p.beds.map((b, k) => (
            <button key={b} className={k === fb ? 'on' : ''} onClick={() => setFb(k)}>
              {b} {u}
            </button>
          ))}
        </div>
        <div className="fps">
          {[0, 1, 2].map((n) => (
            <figure key={bed + '-' + n}>
              <FloorPlan beds={bed} n={n} />
              <figcaption>
                {bed} {u} — Layout {n + 1}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="location" className="w sec">
        <SectionHead eyebrow="Location" title={p.loc} />
        <div className="loc">
          <iframe
            title="Map"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.03}%2C${lat - 0.02}%2C${lng + 0.03}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lng}`}
          />
          <div>
            <ul className="tick">
              {p.near.map((n) => (
                <li key={n}>
                  <Check size={16} />
                  {n}
                </li>
              ))}
            </ul>
            <p className="fine">Approximate drive times.</p>
            <button className="btn" onClick={() => go('enquire')}>
              Ask about this location
            </button>
          </div>
        </div>
      </section>

      <section id="amenities" className="w sec">
        <SectionHead eyebrow="Lifestyle" title={`${p.name} amenities`} />
        <div className="am">
          {p.amenities.map((a) => (
            <div key={a}>
              <span className="pdx-ai">{amenityIcon(a)}</span>
              {a}
            </div>
          ))}
        </div>
      </section>

      <section id="payment-plan" className="w sec">
        <SectionHead
          eyebrow="Payment plan"
          title={`${p.name} payment plan`}
          sub="Indicative plans. Final terms are confirmed by the developer."
        />
        <div className="tabs">
          {PAYMENT_PLANS.map((x, k) => (
            <button key={x.k} className={k === pl ? 'on' : ''} onClick={() => setPl(k)}>
              {x.k}
            </button>
          ))}
        </div>
        <div className="pp">
          {PAYMENT_PLANS[pl].rows.map(([t, v]) => (
            <div key={t}>
              <b>{v}</b>
              <span>
                {t}
                {t === 'On completion' ? ` — ${p.done}` : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="enquire" className="w sec two enq">
        <div>
          <small className="eb">Register interest</small>
          <h2>Get the full details on {p.name}</h2>
          <p>
            Share your details and our team will follow up with floor plans, pricing and
            the latest availability.
          </p>
          <p className="cl">
            <Phone size={16} />{' '}
            <a href={projectPhone.href}>{projectPhone.display}</a>
          </p>
        </div>
        <div className="card">
          <EnquiryForm
            type="project"
            btn="Send enquiry"
            init={`Hi, please send me more details on ${p.name} in ${p.loc}.`}
            fields={ENQUIRY_FIELDS}
          />
        </div>
      </section>

      <div className="pdx-mcta">
        <button onClick={() => go('enquire')}>
          Register interest <ArrowRight size={16} />
        </button>
        <a href={projectPhone.href}>
          <Phone size={16} /> Call
        </a>
      </div>
    </div>
  );
}