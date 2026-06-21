import React from 'react';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils.js';

export const ProductCard = ({
  product,
  currency,
  onViewDetail,
  onAddToCart,
}) => {
  const isPreorder = product.availability === 'pre_order';
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="group relative bg-[#111111] border border-[#222222] rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#333333] transition-all duration-300 flex flex-col h-full">
      <div className="relative overflow-hidden bg-[#1A1A1A] pt-[110%] cursor-pointer" onClick={() => onViewDetail(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-[#1a1a1a] text-[#F0F0F0] border border-[#333] rounded shadow-xs"
            >
              {tag}
            </span>
          ))}
          {isPreorder && (
            <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-amber-400 text-neutral-950 rounded shadow-xs">
              Pre-Order
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-rose-600 text-white rounded shadow-xs">
              Sale
            </span>
          )}
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex-1 bg-[#0D0D0D] hover:bg-white hover:text-black hover:border-transparent text-[#F0F0F0] border border-[#222] py-2 px-2 rounded-lg font-sans text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[10px] tracking-wider uppercase font-semibold text-[#555555] mb-1">
            {product.category}
          </div>
          
          <h3
            onClick={() => onViewDetail(product)}
            className="font-sans font-medium text-sm sm:text-base text-[#F0F0F0] group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#333333]'}`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#888888] font-mono font-medium">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#222222] mt-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs text-[#555555] line-through font-mono">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
            <span className="font-sans font-bold text-[#F0F0F0] text-sm sm:text-base">
              {formatPrice(product.price, currency)}
            </span>
          </div>

          <button
            onClick={() => onViewDetail(product)}
            className="p-1.5 sm:p-2 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] text-[#888888] hover:text-[#F0F0F0] border border-[#222222] transition-colors text-xs flex items-center gap-1 font-medium"
            title="View Details"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
