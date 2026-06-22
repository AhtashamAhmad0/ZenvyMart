import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Clock, Send, Shield, Truck } from 'lucide-react';
import { PRODUCTS } from '../data.js';
import { ProductCard } from './ProductCard.jsx';
import { HeroCarousel } from './HeroCarousel.jsx';

const PACK_HUBS = [
  { city: 'Islamabad', time: '12 Hours Delivery', active: true, desc: 'Central Capital Premium Warehouse Hub' },
  { city: 'Lahore', time: '18 Hours Delivery', active: true, desc: 'Punjab Regional High-Volume Depot' },
  { city: 'Karachi', time: '24 Hours Delivery', active: true, desc: 'Southern Coastal Port Dispatch Hub' },
  { city: 'Peshawar', time: '36 Hours Delivery', active: false, desc: 'KPK Elite Logistics Node' },
  { city: 'Multan', time: '36 Hours Delivery', active: false, desc: 'Central Punjab Express Routing' }
];

// Approximate pin positions on the stylized map (SVG viewBox 0 0 300 380)
const HUB_COORDS = {
  Islamabad: [150, 55],
  Lahore: [195, 135],
  Peshawar: [75, 95],
  Multan: [140, 225],
  Karachi: [105, 335]
};

const CATEGORY_TILES = [
  {
    name: 'Watches',
    subtitle: 'Precision in every second',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7inlPHnRDaGV-gIUH7Wa9VAmfUg3SCQXkw7JVfK54x_rqxbTOprEAJoZSxdSfA4pOtRrWv33q106fBwW_-apTdGE0LxZWZU5uqjgMlop6jQ9H5p9QaUVxCPihkeAXmW2Sz9roKwavCkfppZVbboQVrfus1lfRao6citEIIDjJDUkOQUM8SFN42OefnYtPLJePpH5_WFzsBsVepkmk9shFP2cjq197HQCUUNdSsK-p0HqSnjbJc2Fx0yCxC3uzRVDhk4ay5j8R0Lg'
  },
  {
    name: 'Skincare',
    subtitle: 'Essential self-care',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmr6S3iljNPFfky2sztJTOC3LMHuhDhtFqHISymAYaNuzuFBvVCkWfu72CGpazcifJORAID3J-CgvFBgg2O2dDZKoOt7hdoUMLB3JUHN-a9Aejv3f6bI4Z9W_G1A-NNGlWr2I9gNF4lwV2DhiO9FPMhsMZBleKGh-eR7vCglWcNXbYnjOKjOyfqsSIiL9bUqfl3hh8oKelFEgn_gowPMuaqsm5HeB9e5TTA2Q4oOH0lGb3zp5pYQdhqKItlZUUaVgUDM-QWIh9RDw'
  },
  {
    name: 'Electronics',
    subtitle: 'Next-gen performance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPqvOXOY8hvi_eR9kdGxWJFahIBEbbsVoUgGPIFx2MQt324uUMcP_EaMhdzgYCCAp3Ix66fOC7RhMgN_PLlr01Un4rc0e3HO9n1mNQRzaFZ7mY0QXPd2JM3-F-F6ENZH8Jv2LhqeZ3aE3ZgVxqH7K7GcgxT-kVOoBOt6YkA4x1d17QwWlPOJ180OsohP6_mKQ17cA97VxmO-AJpxi_dWWYgVvc8JJEP3CvLq4VVJqPUNwn6q8dfTTK3VmyZ0awCCS4MZfG_LqQb7U'
  },
  {
    name: 'Fashion',
    subtitle: 'Modern tailoring',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB97BEzWB9NxLTgZ_v_IsgPYzNznyHu2QGHDz4KPyyIPTQuChE4WN8S52T_3ewnEPps6wMBVKCplogASyEvCOnFjpwAOFwst0-XMnpjB_8IFi1m5kyC2eJxGjZqrNT_suWa85k8lbX7GUJM-1rEOf5UF9Z45DLk3O4kHmbqh65oqsuLPva7fXSTOfiy8JGXZPG4csrkfQzpqQKd8nHFqCtRLE6NNlztsTXH07r_byJl1JTcM5wOTSOoMCbRAPpYUhKQ9AeaCjpzmSs'
  }
];

export const HomeScreen = ({ onGoToCollection, onViewProduct, onAddToCart, currency }) => {
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const justLanded = PRODUCTS.filter((p) => p.tags?.includes('New Arrival') || p.id === 'zenvy-signature-watch').slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setIsSubscribed(true);
      setNewsEmail('');
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO */}
      {/* HERO */}
      <HeroCarousel onGoToCollection={onGoToCollection} />
      {/* <section className="relative min-h-[560px] sm:min-h-[680px] bg-neutral-950 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwlXgT4OBCbjEdV9PTSSqaE8SrIk38yCtWof1HIsVUrjUjC04S_2i9YhPjm2sP76h67usP_xbp9yl8ZBoq-keDdbryuTpXOWY73bNiyIQxcLJZjF-Bg4EqHVSXaKQmgfqeJOK6eypHowTcK6cdvFDzOjcPqd3Kp7XR4zBleqWn6X7oK7VdfMvt-3DZIamxhZermdCaCNIohQe8RQMu6IltvF3JRhLw8LmmKdLH21FSn0Qx8hEpYhXBLTBTCEjFrMvx7KrdPlWVkIM"
            referrerPolicy="no-referrer"
            alt="Zenvy Mart curated collection"
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-screen"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(245,200,90,0.5) 39px, rgba(245,200,90,0.5) 40px)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
            <div className="max-w-2xl space-y-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-amber-400/70" />
                <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-amber-300/90">
                  The Autumn Curation
                </span>
              </div>

              <h1 className="font-serif leading-[1.02] tracking-tight">
                <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl text-white font-medium">
                  Shopping,
                </span>
                <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl text-amber-300 font-medium italic -mt-1 sm:-mt-2">
                  refined.
                </span>
              </h1>

              <p className="text-neutral-300 text-[15px] sm:text-base leading-relaxed font-sans max-w-md border-l border-neutral-700 pl-4">
                Zenvy Mart curates premium essentials for the modern lifestyle —
                considered pieces, delivered with the speed and care they deserve.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onGoToCollection}
                  className="group bg-amber-400 hover:bg-amber-300 text-neutral-950 font-sans text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                  Shop the Collection
                </button>

                <button
                  onClick={onGoToCollection}
                  className="text-sm font-semibold text-neutral-200 hover:text-amber-300 transition-colors underline-offset-4 hover:underline px-2 py-3.5"
                >
                  View Lookbook
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="ml-auto w-full max-w-xs bg-neutral-950/60 backdrop-blur-md border border-neutral-700/60 rounded-2xl p-6 space-y-5">
                <p className="text-[11px] tracking-[0.2em] uppercase font-mono text-neutral-400">
                  Why Zenvy
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-neutral-300 leading-relaxed">
                      Same-day dispatch from Islamabad, doorstep within 12&ndash;48 hours nationwide.
                    </p>
                  </div>
                  <div className="h-px bg-neutral-800" />
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-neutral-300 leading-relaxed">
                      Every parcel insured in transit, no exceptions.
                    </p>
                  </div>
                  <div className="h-px bg-neutral-800" />
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-amber-300 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-neutral-300 leading-relaxed">
                      Hand-curated catalog &mdash; nothing listed we wouldn&apos;t buy ourselves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent z-20" />
      </section> */}

      {/* FEATURED CATEGORIES (single, consolidated section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-mono font-bold text-amber-400 bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333]">
              <Sparkles className="w-3 h-3" />
              CURATED SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F0F0F0] tracking-tight mt-3">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={onGoToCollection}
            className="text-sm sm:text-base font-bold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
          >
            Browse All Categories →
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {CATEGORY_TILES.map((tile, idx) => {
            // Zig-zag widths: row1 = [wide, narrow] (Watches, Skincare), row2 = [narrow, wide] (Electronics, Fashion)
            const isRowOne = idx < 2;
            const isFirstInRow = idx % 2 === 0;
            const spanClass = isRowOne
              ? (isFirstInRow ? 'col-span-3' : 'col-span-2')
              : (isFirstInRow ? 'col-span-2' : 'col-span-3');
            return (
              <div
                key={tile.name}
                onClick={onGoToCollection}
                className={`group relative h-80 sm:h-96 rounded-xl overflow-hidden cursor-pointer border border-[#1f1f1f] shadow-md hover:shadow-xl transition-all duration-500 ${spanClass}`}
              >
                <img
                  src={tile.image}
                  alt={tile.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                  <h3 className="font-sans font-bold text-sm sm:text-base group-hover:text-amber-300 transition-colors">
                    {tile.name}
                  </h3>
                  <p className="text-[11px] text-neutral-300 font-medium">{tile.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2.5">
          <span className="inline-block text-[10px] tracking-widest uppercase font-mono font-bold bg-[#1A1A1A] text-amber-400 px-3 py-1 rounded-full border border-[#222]">
            Just Landed
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F0F0F0] tracking-tight">
            New Arrivals
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {justLanded.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              currency={currency}
              onViewDetail={onViewProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onGoToCollection}
            className="text-sm font-bold text-[#F0F0F0] hover:text-amber-400 transition-colors inline-flex items-center gap-1 bg-[#111111] hover:bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#222]"
          >
            <span>View All Curations</span>
            <span>&rarr;</span>
          </button>
        </div>
      </section>

      {/* FAST DELIVERY ACROSS PAKISTAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141414] border border-[#222] rounded-3xl p-6 sm:p-10 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F0F0F0] tracking-tight">
              Fast Delivery Across Pakistan
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md">
              We pride ourselves on the swiftest logistics network, ensuring your luxury purchases arrive at your doorstep in pristine condition within 24-48 hours.
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#F0F0F0]">Rapid Logistics</p>
                  <p className="text-xs text-neutral-500">Nationwide express</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#F0F0F0]">Insured Transit</p>
                  <p className="text-xs text-neutral-500">100% Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-64 sm:h-72 rounded-2xl bg-[#0d0d0d] border border-[#222] overflow-hidden">
              <svg viewBox="0 0 300 380" className="w-full h-full">
                <path
                  d="M110,15 L210,35 L235,140 L205,235 L185,260 L170,370 L95,345 L70,250 L35,190 L55,90 Z"
                  fill="#161616"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                />
                {PACK_HUBS.filter((h) => h.city !== 'Islamabad').map((hub) => {
                  const [x, y] = HUB_COORDS[hub.city];
                  const [ix, iy] = HUB_COORDS.Islamabad;
                  return (
                    <line
                      key={hub.city}
                      x1={ix}
                      y1={iy}
                      x2={x}
                      y2={y}
                      stroke="#d4a843"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                  );
                })}
                <circle cx={HUB_COORDS.Islamabad[0]} cy={HUB_COORDS.Islamabad[1]} r="6" fill="#f0b429" />
                {PACK_HUBS.filter((h) => h.city !== 'Islamabad').map((hub) => {
                  const [x, y] = HUB_COORDS[hub.city];
                  return <circle key={hub.city} cx={x} cy={y} r="5" fill={hub.active ? '#f0b429' : '#555'} />;
                })}
              </svg>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {PACK_HUBS.map((hub) => (
                <div
                  key={hub.city}
                  className={`flex items-center gap-1.5 text-xs ${hub.active ? 'text-amber-400' : 'text-neutral-500'}`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="font-semibold">{hub.city}</span>
                  <span className="text-neutral-600">·</span>
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{hub.time.replace(' Delivery', '')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE ELITE CIRCLE — newsletter (now actually rendered) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-[#F0F0F0] tracking-tight">
          Join the Elite Circle
        </h2>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Subscribe to receive early access to new collections and exclusive invitations to private sales events.
        </p>

        {isSubscribed ? (
          <p className="text-amber-400 font-semibold text-sm">You're in. Welcome to the Elite Circle.</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              value={newsEmail}
              onChange={(e) => setNewsEmail(e.target.value)}
              placeholder="Your premium email address"
              required
              className="flex-1 bg-[#111111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Join Now
            </button>
          </form>
        )}
      </section>
    </div>
  );
};