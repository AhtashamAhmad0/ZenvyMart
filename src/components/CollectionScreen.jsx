import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Star, Info } from 'lucide-react';
import { PRODUCTS } from '../data.js';
import { ProductCard } from './ProductCard.jsx';
import { formatPrice } from '../utils.js';

const CATEGORIES_LIST = ['Watches', 'Skincare', 'Electronics', 'Footwear', 'Fashion'];

export const CollectionScreen = ({ onViewProduct, onAddToCart, currency, searchQuery, onSearchChange }) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1500],
    availability: 'all',
    search: searchQuery,
    sort: 'recommended',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeSearch = useMemo(() => searchQuery, [searchQuery]);

  const handleCategoryToggle = (category) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(category);
      const nextCategories = isSelected ? prev.categories.filter((c) => c !== category) : [...prev.categories, category];
      return { ...prev, categories: nextCategories };
    });
  };

  const resetFilters = () => {
    setFilters({ categories: [], priceRange: [0, 1500], availability: 'all', search: '', sort: 'recommended' });
    onSearchChange('');
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeSearch.trim()) {
      const query = activeSearch.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => {
        return filters.categories.some((c) => {
          if (c === 'Footwear') return p.category === 'Footwear' || p.category === 'Footwear_Home_Accessory';
          if (c === 'Fashion') return p.category === 'Fashion' || p.category === 'Footwear';
          return p.category.toLowerCase() === c.toLowerCase();
        });
      });
    }

    result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.availability === 'in_stock') result = result.filter((p) => p.availability === 'in_stock');
    else if (filters.availability === 'pre_order') result = result.filter((p) => p.availability === 'pre_order');

    if (filters.sort === 'price_low') result.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'price_high') result.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeSearch, filters.categories, filters.priceRange, filters.availability, filters.sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#222] pb-5 gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-amber-400 block mb-1">Zenvy Showcases</span>
          <h1 className="text-3xl font-sans font-extrabold text-white tracking-tight leading-none">Curated Treasures</h1>
          <p className="text-xs sm:text-sm text-[#888888] mt-1 max-w-sm">Genuine items selected from premier design-centric spaces around the globe.</p>
        </div>

        <div className="text-xs text-[#888888] font-mono flex items-center gap-1 bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-[#222]"><span className="font-bold text-white font-sans">{filteredProducts.length}</span> Premium Goods Displayed</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="bg-[#111111] rounded-xl border border-[#222222] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#222222] pb-2.5">
              <span className="font-sans font-bold text-[#F0F0F0] text-sm">Departments</span>
              <SlidersHorizontal className="w-4 h-4 text-[#888888]" />
            </div>

            <div className="space-y-2.5">
              {CATEGORIES_LIST.map((cat) => {
                const isChecked = filters.categories.includes(cat);
                return (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group text-sm text-[#888888]">
                    <input type="checkbox" checked={isChecked} onChange={() => handleCategoryToggle(cat)} className="w-4 h-4 rounded-md border-[#333333] text-amber-400 focus:ring-amber-400 cursor-pointer" />
                    <span className={`group-hover:text-amber-400 transition-colors ${isChecked ? 'font-semibold text-white' : ''}`}>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="bg-[#111111] rounded-xl border border-[#222222] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#222222] pb-2.5">
              <span className="font-sans font-bold text-[#F0F0F0] text-sm">Pricing (USD)</span>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="flex items-center justify-between font-mono">
                <span>0 USD</span>
                <span>1,500 USD</span>
              </div>
              <input type="range" min="0" max="1500" step="50" value={filters.priceRange[1]} onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] })} className="w-full accent-amber-400 cursor-pointer" />
              <div className="p-2.5 bg-[#1A1A1A] rounded-lg border border-[#222] flex justify-between font-mono"><span>Max:</span><span className="font-bold text-white">{formatPrice(filters.priceRange[1], currency)}</span></div>
            </div>
          </div>

          <div className="bg-[#111111] rounded-xl border border-[#222222] p-5 space-y-4 shadow-xs">
            <span className="font-sans font-bold text-[#F0F0F0] text-sm block border-b border-[#222222] pb-2.5">Delivery Preference</span>
            <div className="space-y-2.5 sm:space-y-3 text-sm text-[#888888]">
              <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="availability-desktop" checked={filters.availability === 'all'} onChange={() => setFilters({ ...filters, availability: 'all' })} className="text-amber-400 focus:ring-amber-400 accent-amber-400 cursor-pointer" /><span>All Statuses</span></label>
              <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="availability-desktop" checked={filters.availability === 'in_stock'} onChange={() => setFilters({ ...filters, availability: 'in_stock' })} className="text-amber-400 focus:ring-amber-400 accent-amber-400 cursor-pointer" /><span>Ready Stock</span></label>
              <label className="flex items-center gap-2.5 cursor-pointer"><input type="radio" name="availability-desktop" checked={filters.availability === 'pre_order'} onChange={() => setFilters({ ...filters, availability: 'pre_order' })} className="text-amber-400 focus:ring-amber-400 accent-amber-400 cursor-pointer" /><span>Secure Pre-orders</span></label>
            </div>
          </div>

          <button onClick={resetFilters} className="w-full border border-[#222] hover:border-[#444] bg-[#111] hover:bg-[#1A1A1A] text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xs cursor-pointer"><RefreshCw className="w-3.5 h-3.5" />Reset Filters</button>
        </aside>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111111] p-3 rounded-xl border border-[#222222]">
            <div className="flex items-center gap-2.5 lg:hidden"><button onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} className="flex items-center gap-2 border border-[#333] text-white bg-[#1A1A1A] hover:bg-[#222] px-4 py-2 rounded-lg text-xs font-semibold shadow-xs"><SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />Filter Options</button></div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#888888] font-medium"><Info className="w-3.5 h-3.5 text-[#555] shrink-0" /><span>Duties and customs covered during premium import routing.</span></div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs text-[#888888]"><ArrowUpDown className="w-3.5 h-3.5 text-[#555] shrink-0" /><span>Sort:</span><select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="border border-[#222] rounded-lg p-1.5 bg-[#1A1A1A] text-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"><option value="recommended">Best Match Curated</option><option value="price_low">Price: Low to High</option><option value="price_high">Price: High to Low</option><option value="rating">Stars & Reviews Ratings</option></select></div>
          </div>

          {mobileFiltersOpen && (<div className="lg:hidden p-5 bg-[#111111] rounded-xl border border-[#222222] space-y-4 animate-fadeIn shadow-lg">{/* simplified mobile filters shown earlier */}</div>)}

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center bg-[#111111] border border-[#222222] text-white rounded-2xl shadow-xs flex flex-col items-center justify-center">
              <RefreshCw className="w-12 h-12 text-[#333] animate-spin mb-4" />
              <h3 className="font-sans font-bold text-white text-lg mb-1">No products match your filters</h3>
              <p className="text-xs text-[#888888] max-w-xs mb-6">Try widening your price preferences, resetting active departments, or typing simple phrases (e.g. "serum" or "chrono").</p>
              <button onClick={resetFilters} className="bg-white hover:bg-neutral-200 text-black transition-all font-sans text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} currency={currency} onViewDetail={onViewProduct} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
