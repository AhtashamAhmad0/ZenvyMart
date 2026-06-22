import React, { useState } from 'react';
import { ShieldAlert, Sparkles, MapPin, Award, CheckCircle, Clock } from 'lucide-react';

export const AboutScreen = () => {
  const [freetext, setFreetext] = useState('');
  const [sent, setSent] = useState(false);

  const handleSourcingInquiry = (e) => {
    e.preventDefault();
    if (freetext.trim()) {
      setSent(true);
      setFreetext('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      <section className="text-center space-y-4">
        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#333]">OUR MISSION & METHODOLOGY</span>
        <h1 className="text-3xl sm:text-5xl font-sans font-extrabold text-[#F0F0F0] tracking-tight leading-tight">The Sourcing House <br />of Pure Authenticity</h1>
        <p className="text-sm sm:text-base text-[#888888] max-w-xl mx-auto leading-relaxed">Founded on the simple belief that global luxury shouldn’t get tangled in borders or customs blocks, Zenvy Mart curates verified high-end lifestyle items for discerning collectors.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-[#111111] rounded-2xl border border-[#222222] space-y-3 shadow-xs"><div className="p-2.5 bg-[#1A1A1A] text-amber-400 border border-[#333] rounded-xl w-fit"><Award className="w-5 h-5" /></div><h3 className="font-sans font-bold text-[#F0F0F0] text-sm sm:text-base">Elite Sourcing Curation</h3><p className="text-xs text-[#888888] leading-relaxed">Our teams are based in Tokyo, Geneva, and Milan. We scout boutique, clinical skincare laboratories, and mechanical horology studios.</p></div>

        <div className="p-6 bg-[#111111] rounded-2xl border border-[#222222] space-y-3 shadow-xs"><div className="p-2.5 bg-[#1A1A1A] text-amber-500 border border-[#333] rounded-xl w-fit"><CheckCircle className="w-5 h-5" /></div><h3 className="font-sans font-bold text-[#F0F0F0] text-sm sm:text-base">100% Genuine Audited</h3><p className="text-xs text-[#888888] leading-relaxed">Each timepiece and formula is cross-referenced with production logs, batch checked on physical counters, and sealed with custom verification ribbons.</p></div>

        <div className="p-6 bg-[#111111] rounded-2xl border border-[#222222] space-y-3 shadow-xs"><div className="p-2.5 bg-emerald-950/40 text-emerald-400 border border-emerald-800/30 rounded-xl w-fit"><Clock className="w-5 h-5" /></div><h3 className="font-sans font-bold text-[#F0F0F0] text-sm sm:text-base">24-Hr Pakistan Delivery</h3><p className="text-xs text-[#888888] leading-relaxed">Due to our ahead-of-time bulk custom clearing, purchases are dispatched locally in 24 hours from Lahore, Islamabad and Karachi hubs.</p></div>
      </section>

      <section className="bg-[#111] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-[#222]">
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-xl mx-auto space-y-6 text-center relative z-10">
          <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#F0F0F0]">Custom Procurement Requests</h3>
          <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">Sought-after watches, special luxury leather luggage, or botanical hydration creams not currently in our catalog? Our global networks can procure it securely and deliver locally.</p>

          {sent ? (
            <div className="p-4 bg-emerald-500/10 border border-emerald-400 text-emerald-400 text-xs font-bold rounded-xl">Thank you! Our specialty concierge procurement department has registered your boutique inquiry.</div>
          ) : (
            <form onSubmit={handleSourcingInquiry} className="space-y-3 text-left">
              <label className="block text-[10px] uppercase font-mono font-bold text-neutral-400">Sourcing Item Description, Model, or Scent Node specifics:</label>
              <div className="flex gap-2 text-sm flex-col sm:flex-row">
                <input type="text" required value={freetext} onChange={(e) => setFreetext(e.target.value)} placeholder="e.g. Rolex Submariner Date 126610LN, clean tags, full papers..." className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#222] rounded-xl text-[#F0F0F0] placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors" />
                <button type="submit" className="bg-white hover:bg-amber-400 hover:text-neutral-950 font-bold px-6 py-3 rounded-xl text-neutral-950 text-xs sm:text-sm transition-all duration-300">Sourcing Request</button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
