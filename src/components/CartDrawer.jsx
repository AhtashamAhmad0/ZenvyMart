import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils.js';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, currency, onCheckout, onGoToCollection }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 150 ? 0 : currency === 'PKR' ? 0.9 : 0.9;
  const isFreeShipping = subtotal > 150;
  const deliveryCharges = isFreeShipping ? 0 : shippingCost;
  const total = subtotal + deliveryCharges;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-[#222222] flex flex-col shadow-2xl relative animate-slideIn text-[#F0F0F0]">
          <div className="px-5 py-5 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-sans font-bold text-white leading-6">Your Shopping Cart</h2>
              <span className="bg-[#1A1A1A] border border-[#333] text-amber-400 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors focus:outline-none" title="Close Panel"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#111111] flex items-center justify-center border border-dashed border-[#222] mb-4 animate-pulse"><ShoppingBag className="w-8 h-8 text-[#444]" /></div>
                <h3 className="font-sans font-semibold text-white text-base mb-1">Your cart is empty</h3>
                <p className="text-sm text-[#888888] mb-6 max-w-xs leading-relaxed">Explore our curated high-fashion selections, skincare, and luxury smart watches to add your first selection.</p>
                <button onClick={() => { onGoToCollection(); onClose(); }} className="bg-white hover:bg-neutral-200 text-black font-sans text-xs font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow">Browse Curated Items</button>
              </div>
            ) : (
              <div className="divide-y divide-[#222222]">
                {cartItems.map((item) => {
                  const productPrice = item.product.price;
                  const itemTotal = productPrice * item.quantity;
                  return (
                    <div key={item.product.id} className="py-4.5 flex gap-4 first:pt-0">
                      <div className="relative w-20 h-24 rounded-lg bg-[#111111] border border-[#222222] overflow-hidden shrink-0"><img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" /></div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-sm font-sans font-medium text-white line-clamp-1">{item.product.name}</h4>
                            <button onClick={() => onRemoveItem(item.product.id)} className="text-[#888888] hover:text-[#ff4a4a] p-1 rounded-md hover:bg-[#1A1A1A] transition-colors" title="Delete Item"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          <p className="text-[10px] uppercase font-semibold text-[#555] tracking-wider">{item.product.category}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#333] rounded-lg overflow-hidden bg-[#1D1D1D] shadow-xs">
                            <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 px-2 text-[#888888] hover:bg-[#2A2A2A] focus:outline-none disabled:opacity-30" disabled={item.quantity <= 1}><Minus className="w-3 h-3" /></button>
                            <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 px-2 text-[#888888] hover:bg-[#2A2A2A] focus:outline-none"><Plus className="w-3 h-3" /></button>
                          </div>

                          <div className="text-right"><span className="block font-sans font-bold text-sm text-white">{formatPrice(itemTotal, currency)}</span></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#222222] bg-[#111111] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#888888]"><span>Subtotal</span><span className="font-mono font-medium text-white">{formatPrice(subtotal, currency)}</span></div>
                <div className="flex justify-between text-[#888888] items-center"><div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald-400" /><span>Special Dispatch Fee</span></div><span className="font-mono font-medium text-emerald-400">{isFreeShipping ? 'FREE' : formatPrice(deliveryCharges, currency)}</span></div>

                {isFreeShipping ? (<p className="text-[11px] font-medium text-emerald-400 bg-emerald-950/20 border border-emerald-800/40 px-2.5 py-1 rounded">🎉 You qualify for FREE premium express shipping across Pakistan!</p>) : (<p className="text-[11px] text-[#888888]">Spend <b>{formatPrice(150, currency)}</b> more to unlock FREE expedited delivery.</p>)}

                <div className="pt-2.5 border-t border-[#222] flex justify-between text-white font-bold text-base"><span>Estimated Total</span><span className="font-sans text-amber-400 font-extrabold">{formatPrice(total, currency)}</span></div>
              </div>

              <div className="flex items-center gap-2 justify-center py-1 text-xs text-[#888888] bg-[#1A1A1A] border border-[#222] rounded-lg"><ShieldCheck className="w-4 h-4 text-amber-400" /><span>100% Genuine Luxury Imports Guarantee</span></div>

              <button onClick={onCheckout} className="w-full bg-white hover:bg-neutral-200 text-black font-sans text-sm font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-center cursor-pointer">Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
