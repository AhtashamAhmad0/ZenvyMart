import React, { useState, useMemo } from 'react';
import { ArrowLeft, Star, Shield, Truck, Heart, MessageSquare, Plus, Minus } from 'lucide-react';
import { PRODUCTS } from '../data.js';
import { formatPrice } from '../utils.js';
import { ProductCard } from './ProductCard.jsx';

export const DetailScreen = ({ product, currency, onBack, onAddToCart, onViewProduct, onOpenReviewModal, reviews }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const recommendedProducts = useMemo(() => PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || (p.tags && p.tags.includes('New Arrival')))).slice(0, 3), [product]);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const ratingsAverage = useMemo(() => {
    if (!reviews || reviews.length === 0) return product.rating;
    const combined = reviews.reduce((sum, r) => sum + r.rating, 0);
    return parseFloat((combined / reviews.length).toFixed(1));
  }, [reviews, product.rating]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 bg-[#0A0A0A] text-[#F0F0F0]">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-white hover:text-amber-400 transition-colors bg-[#111111] hover:bg-[#1A1A1A] px-4 py-2 rounded-lg border border-[#222222]"><ArrowLeft className="w-4 h-4" /><span>Back to Collections</span></button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="relative bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden pt-[90%] shadow-xs">
            <img src={product.images[selectedImageIndex] || product.image} alt={product.name} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
            {product.tags && product.tags.map((tag) => (<span key={tag} className="absolute top-4 left-4 px-2.5 py-1 text-[10px] uppercase font-mono font-bold bg-[#1A1A1A] text-white rounded border border-[#333333] shadow z-10">{tag}</span>))}
          </div>

          {product.images && product.images.length > 1 && (<div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">{product.images.map((img, idx) => (<button key={idx} onClick={() => setSelectedImageIndex(idx)} className={`relative w-20 h-24 rounded-lg bg-[#111111] border overflow-hidden shrink-0 filter hover:brightness-95 transition-all duration-300 ${idx === selectedImageIndex ? 'border-amber-400 ring-1 ring-amber-400' : 'border-[#222222]'}`}><img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" /></button>))}</div>)}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3 pb-5 border-b border-[#222222]">
            <span className="text-[11px] tracking-wider uppercase font-mono font-bold text-amber-400 block bg-[#1A1A1A] rounded-md px-2.5 py-1 w-fit border border-[#333]">{product.category} Showcases</span>
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < Math.floor(ratingsAverage) ? 'fill-current' : 'text-neutral-800'}`} />))}</div>
              <span className="font-mono text-sm font-bold text-white mt-0.5">{ratingsAverage} Rating</span>
              <span className="text-xs text-[#333] mt-0.5">|</span>
              <span className="flex items-center gap-1 text-xs text-[#888888] font-medium underline cursor-pointer hover:text-amber-400"><MessageSquare className="w-3.5 h-3.5 text-[#555]" />{reviews ? reviews.length : 0} Verified Reviews</span>
            </div>
          </div>

          <div className="space-y-1.5 bg-[#111111] py-4 px-5 rounded-2xl border border-[#222222] shadow-xs">
            <span className="block text-[10px] font-mono uppercase font-bold text-[#888888]">EXPRESS WAREHOUSE PRICING</span>
            <div className="flex items-baseline gap-3"><span className="text-2xl sm:text-3.5xl font-sans font-extrabold text-white tracking-tight">{formatPrice(product.price, currency)}</span>{hasDiscount && (<span className="text-xs sm:text-sm text-[#555] line-through font-mono">{formatPrice(product.originalPrice, currency)}</span>)}</div>
            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 pt-1"><Truck className="w-3.5 h-3.5 animate-pulse" /><span>Duties and clearance customs fully paid by importer house.</span></div>
          </div>

          <p className="text-sm text-[#888888] leading-relaxed font-sans mt-2.5">{product.description}</p>

          {product.features && product.features.length > 0 && (<div className="bg-[#111111] p-4 rounded-xl border border-[#222222] space-y-2"><h4 className="text-xs font-bold uppercase tracking-wider text-[#F0F0F0] font-mono">Key Parameters</h4><ul className="space-y-2 text-xs text-[#888888]">{product.features.map((feat, index) => (<li key={index} className="flex gap-2.5 items-start"><span className="text-amber-400 shrink-0 font-bold">✔</span><span className="leading-tight">{feat}</span></li>))}</ul></div>)}

          <div className="space-y-4 pt-4 border-t border-[#222222]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Quantity</span>
              <div className="flex items-center border border-[#333] rounded-xl overflow-hidden bg-[#1A1A1A] shadow-xs">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 px-3.5 text-[#888888] hover:bg-[#222] hover:text-white transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                <span className="px-3.5 text-sm font-mono font-bold text-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 px-3.5 text-[#888888] hover:bg-[#222] hover:text-white transition-colors"><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <div className="flex gap-3 grid grid-cols-1 sm:grid-cols-4 items-center">
              <button onClick={() => { onAddToCart(product, quantity); setQuantity(1); }} className="col-span-3 bg-white hover:bg-neutral-200 text-black font-sans text-sm font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"> <span>Add Selected Curations to Cart</span></button>
              <button onClick={() => setIsFavorite(!isFavorite)} className={`col-span-1 p-3.5 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${isFavorite ? 'border-rose-550 text-rose-400 bg-rose-950/20' : 'border-[#222] hover:border-[#555] text-white bg-[#111111]'}`} title="Favorite"><Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} /></button>
            </div>
          </div>

          <div className="border border-[#222222] rounded-xl overflow-hidden">
            <div className="flex bg-[#111111] border-b border-[#222222] text-xs font-bold">
              <button onClick={() => setActiveTab('details')} className={`flex-1 py-3 text-center border-r border-[#222222] transition-colors ${activeTab === 'details' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#888888] hover:text-white'}`}>Guarantee details</button>
              <button onClick={() => setActiveTab('shipping')} className={`flex-1 py-3 text-center border-r border-[#222222] transition-colors ${activeTab === 'shipping' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#888888] hover:text-white'}`}>Pakistan Shipping</button>
              <button onClick={() => setActiveTab('returns')} className={`flex-1 py-3 text-center transition-colors ${activeTab === 'returns' ? 'bg-[#1A1A1A] text-white font-semibold' : 'text-[#888888] hover:text-white'}`}>Secure Return Policy</button>
            </div>
            <div className="p-4 text-xs text-[#888888] leading-relaxed bg-[#111111]">{activeTab === 'details' && (<p>Every import is verified by on-staff luxury experts. We guarantee <b className="text-white">100% authenticity</b> with full luxury packaging box sets, standard compliance papers, serial markers, and warranty coverage where applicable.</p>)}{activeTab === 'shipping' && (<p>Dispatch occurs across Pakistan via dedicated premium express logistics lines within 24 hours. Transit averages <b className="text-white font-bold">12-24 hours for Lahore, Islamabad and Karachi</b>, with Cash on Delivery secured seamlessly.</p>)}{activeTab === 'returns' && (<p>Not matching expectations? Return item within <b className="text-white font-bold">7 days in pristine, unworn packaging condition</b> to claim instant store credits or full cash return checks with zero shipping fees.</p>)}</div>
          </div>

        </div>
      </div>

      <section className="bg-[#111111] rounded-2xl border border-[#222222] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#222222] pb-4">
          <div>
            <h3 className="font-sans font-bold text-white text-lg sm:text-xl flex items-center gap-2"><MessageSquare className="w-5 h-5 text-amber-400" />Verified User Experience</h3>
            <p className="text-xs text-[#888888]">Read what critical collectors say about this curation</p>
          </div>

          <button onClick={onOpenReviewModal} className="bg-[#1A1A1A] hover:bg-[#222] border border-[#222] text-white transition-all font-sans text-xs font-bold px-4 py-2 rounded-lg shadow-xs">Leave Your Review</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews && reviews.map((rev) => (<div key={rev.id} className="bg-[#1A1A1A] p-4.5 rounded-xl border border-[#222222] shadow-xs space-y-2 flex flex-col justify-between"><div><div className="flex items-center justify-between"><span className="font-semibold text-white text-sm">{rev.userName}</span><span className="text-[10px] text-[#555] font-mono font-medium">{rev.date}</span></div><div className="flex text-amber-400 py-1">{Array.from({ length: 5 }).map((_, idx) => (<Star key={idx} className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-current' : 'text-neutral-800'}`} />))}</div><p className="text-xs text-[#888888] leading-relaxed font-sans mt-1.5 italic">"{rev.comment}"</p></div><div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold pt-2.5 mt-2 border-t border-[#222]"><span className="w-3 h-3 text-emerald-400 animate-pulse">★</span><span>Verified Collector Purchase</span></div></div>))}
        </div>
      </section>

      {recommendedProducts.length > 0 && (<section className="space-y-6 pt-6 border-t border-[#222222]"><div className="text-center sm:text-left"><h3 className="font-sans font-bold text-white text-xl sm:text-2xl tracking-tight">Collectors Also Selected</h3><p className="text-xs text-[#888888] mt-0.5">Complimentary elegance designs you might find intriguing.</p></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{recommendedProducts.map((prod) => (<ProductCard key={prod.id} product={prod} currency={currency} onViewDetail={onViewProduct} onAddToCart={onAddToCart} />))}</div></section>)}
    </div>
  );
};
