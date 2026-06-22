import React from 'react';
import { Search, ShoppingBag, Sparkles, SlidersHorizontal, Menu } from 'lucide-react';

export const Header = ({
  activeScreen,
  setActiveScreen,
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  onSearchChange,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#222222] transition-all duration-300">
      <div className="bg-[#111111] text-[#F0F0F0] py-1.5 px-4 text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 border-b border-[#222222]">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Express Delivery across Pakistan in 24 - 48 hours</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => { setActiveScreen('home'); setMobileMenuOpen(false); }}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-mono font-bold text-base sm:text-lg border border-[#333333] shadow-sm relative overflow-hidden group">
              <span className="z-10 text-amber-400 group-hover:scale-110 transition-transform duration-300">Z</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white flex items-center gap-1.5">
              ZENVY <span className="text-xs tracking-widest font-mono text-amber-400 bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#333333]">MART</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-[#888888]">
            <button
              onClick={() => setActiveScreen('home')}
              className={`hover:text-white transition-colors relative py-1 ${activeScreen === 'home' ? 'text-white font-semibold' : ''}`}
            >
              Home
              {activeScreen === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveScreen('collection')}
              className={`hover:text-white transition-colors relative py-1 ${activeScreen === 'collection' ? 'text-white font-semibold' : ''}`}
            >
              Curated Collection
              {activeScreen === 'collection' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveScreen('about')}
              className={`hover:text-white transition-colors relative py-1 ${activeScreen === 'about' ? 'text-white font-semibold' : ''}`}
            >
              About us
              {activeScreen === 'about' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          </nav>

          <div className="hidden lg:flex items-center relative w-64 xl:w-80">
            <input
              type="text"
              placeholder="Search elegance..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeScreen !== 'collection') {
                  setActiveScreen('collection');
                }
              }}
              className="w-full pl-9 pr-4 py-1.5 border border-[#222222] rounded-full text-xs bg-[#1A1A1A] text-white focus:bg-[#222222] focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all placeholder:text-[#555555]"
            />
            <Search className="w-4 h-4 text-[#888888] absolute left-3 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="flex bg-[#1A1A1A] p-0.5 rounded-full border border-[#222222]">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-300 ${
                  currency === 'USD'
                    ? 'bg-[#222222] text-[#F0F0F0] shadow-sm'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-300 ${
                  currency === 'PKR'
                    ? 'bg-[#222222] text-[#F0F0F0] shadow-sm'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                PKR (₨)
              </button>
            </div>

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#222222] text-[#F0F0F0] hover:bg-[#1A1A1A] hover:text-white transition-colors focus:outline-none"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-950 font-bold text-[9px] sm:text-[10px] w-5 h-5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-neutral-950 animate-bounce shadow">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-[#222222] text-[#F0F0F0] hover:bg-[#1A1A1A] transition-colors focus:outline-none"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

          </div>
        </div>

        <div className="lg:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search luxury collections..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeScreen !== 'collection') {
                  setActiveScreen('collection');
                }
              }}
              className="w-full pl-9 pr-4 py-2 border border-[#222222] rounded-full text-xs bg-[#1A1A1A] text-[#F0F0F0] focus:bg-[#222222] focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder:text-[#555555]"
            />
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#222222] py-3 space-y-2 animate-fadeIn">
            <button
              onClick={() => { setActiveScreen('home'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'home' ? 'bg-[#1A1A1A] text-amber-400' : 'text-[#888888] hover:bg-[#111111]'}`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveScreen('collection'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'collection' ? 'bg-[#1A1A1A] text-amber-400' : 'text-[#888888] hover:bg-[#111111]'}`}
            >
              Curated Collection
            </button>
            <button
              onClick={() => { setActiveScreen('about'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'about' ? 'bg-[#1A1A1A] text-amber-400' : 'text-[#888888] hover:bg-[#111111]'}`}
            >
              About us
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
