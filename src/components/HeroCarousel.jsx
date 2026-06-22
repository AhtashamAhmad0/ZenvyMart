import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Shield, Truck } from 'lucide-react';

const HERO_SLIDES = [
  {
    eyebrow: 'The Autumn Curation',
    title: 'Shopping,',
    titleAccent: 'refined.',
    desc: 'Zenvy Mart curates premium essentials for the modern lifestyle — considered pieces, delivered with the speed and care they deserve.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwlXgT4OBCbjEdV9PTSSqaE8SrIk38yCtWof1HIsVUrjUjC04S_2i9YhPjm2sP76h67usP_xbp9yl8ZBoq-keDdbryuTpXOWY73bNiyIQxcLJZjF-Bg4EqHVSXaKQmgfqeJOK6eypHowTcK6cdvFDzOjcPqd3Kp7XR4zBleqWn6X7oK7VdfMvt-3DZIamxhZermdCaCNIohQe8RQMu6IltvF3JRhLw8LmmKdLH21FSn0Qx8hEpYhXBLTBTCEjFrMvx7KrdPlWVkIM',
    cta: 'Shop the Collection'
  },
  {
    eyebrow: 'New Season',
    title: 'Timeless',
    titleAccent: 'tailoring.',
    desc: 'Discover fashion pieces designed for everyday confidence, cut from fabrics that move with you.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB97BEzWB9NxLTgZ_v_IsgPYzNznyHu2QGHDz4KPyyIPTQuChE4WN8S52T_3ewnEPps6wMBVKCplogASyEvCOnFjpwAOFwst0-XMnpjB_8IFi1m5kyC2eJxGjZqrNT_suWa85k8lbX7GUJM-1rEOf5UF9Z45DLk3O4kHmbqh65oqsuLPva7fXSTOfiy8JGXZPG4csrkfQzpqQKd8nHFqCtRLE6NNlztsTXH07r_byJl1JTcM5wOTSOoMCbRAPpYUhKQ9AeaCjpzmSs',
    cta: 'Explore Fashion'
  },
  {
    eyebrow: 'Precision Engineering',
    title: 'Crafted',
    titleAccent: 'to last.',
    desc: 'A curated selection of watches built on heritage craftsmanship, where every detail earns its place.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7inlPHnRDaGV-gIUH7Wa9VAmfUg3SCQXkw7JVfK54x_rqxbTOprEAJoZSxdSfA4pOtRrWv33q106fBwW_-apTdGE0LxZWZU5uqjgMlop6jQ9H5p9QaUVxCPihkeAXmW2Sz9roKwavCkfppZVbboQVrfus1lfRao6citEIIDjJDUkOQUM8SFN42OefnYtPLJePpH5_WFzsBsVepkmk9shFP2cjq197HQCUUNdSsK-p0HqSnjbJc2Fx0yCxC3uzRVDhk4ay5j8R0Lg',
    cta: 'Shop Watches'
  }
];

export const HeroCarousel = ({ onGoToCollection }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[active];

  return (
    <section className="relative min-h-[560px] sm:min-h-[680px] bg-neutral-950 text-white overflow-hidden flex items-center">
      {/* Background images — all slides stacked, crossfade via opacity */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            referrerPolicy="no-referrer"
            alt=""
            className={`absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${
              i === active ? 'opacity-40' : 'opacity-0'
            }`}
          />
        ))}
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
          <div className="max-w-2xl space-y-7" key={active}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-amber-400/70" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-amber-300/90">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="font-serif leading-[1.02] tracking-tight">
              <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl text-white font-medium">
                {slide.title}
              </span>
              <span className="block text-[2.6rem] sm:text-6xl lg:text-7xl text-amber-300 font-medium italic -mt-1 sm:-mt-2">
                {slide.titleAccent}
              </span>
            </h1>

            <p className="text-neutral-300 text-[15px] sm:text-base leading-relaxed font-sans max-w-md border-l border-neutral-700 pl-4">
              {slide.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onGoToCollection}
                className="group bg-amber-400 hover:bg-amber-300 text-neutral-950 font-sans text-sm font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                {slide.cta}
              </button>

              <button
                onClick={onGoToCollection}
                className="text-sm font-semibold text-neutral-200 hover:text-amber-300 transition-colors underline-offset-4 hover:underline px-2 py-3.5"
              >
                View Lookbook
              </button>
            </div>

            {/* Slide indicator buttons */}
            <div className="flex items-center gap-2 pt-4">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-amber-400' : 'w-3 bg-neutral-600 hover:bg-neutral-500'
                  }`}
                />
              ))}
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
    </section>
  );
};