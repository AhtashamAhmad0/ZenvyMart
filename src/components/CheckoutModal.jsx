import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, ClipboardList, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils.js';

const PAKISTAN_CITIES = [
  'Lahore','Karachi','Islamabad','Rawalpindi','Peshawar','Faisalabad','Sialkot','Quetta','Multan','Gujranwala','Hyderabad'
];

export const CheckoutModal = ({ isOpen, onClose, cartItems, currency, onOrderSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: PAKISTAN_CITIES[0], paymentMethod: 'cod' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = subtotal > 150 ? 0 : currency === 'PKR' ? 0.9 : 0.9;
  const isFreeShipping = subtotal > 150;
  const deliveryCharges = isFreeShipping ? 0 : shippingCost;
  const total = subtotal + deliveryCharges;

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid Email Address';
    if (!formData.phone.trim()) tempErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9\s-]{10,13}$/.test(formData.phone)) tempErrors.phone = 'Enter a valid Pakistani contact number (e.g. 03001234567)';
    if (!formData.address.trim()) tempErrors.address = 'Detailed shipping address is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `ZM-${Math.floor(100000 + Math.random() * 900000)}`;
      onOrderSuccess({ orderId: generatedId, name: formData.name, email: formData.email, phone: formData.phone, address: formData.address, city: formData.city, items: [...cartItems], total, date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative bg-[#0D0D0D] border border-[#222222] text-[#F0F0F0] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 animate-scaleUp">
        <div className="flex-1 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222222]">
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-white flex items-center gap-2"><ClipboardList className="w-5 h-5 text-amber-400" />Delivery Information</h2>
              <p className="text-xs text-[#888888]">Premium express dispatch from our custom storehouse hubs</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors focus:outline-none" title="Close modal"><X className="w-5 h-5" /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Full Name <span className="text-rose-400">*</span></label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`w-full px-4 py-2 text-sm border ${errors.name ? 'border-rose-500 bg-rose-950/20' : 'border-[#222]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-[#111111] text-white`} placeholder="M. Bilal" />
              {errors.name && <span className="text-[11px] text-rose-400 font-medium mt-0.5 block">{errors.name}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Email Address <span className="text-rose-400">*</span></label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full px-4 py-2 text-sm border ${errors.email ? 'border-rose-500 bg-rose-950/20' : 'border-[#222]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-[#111111] text-white`} placeholder="name@domain.com" />
                {errors.email && <span className="text-[11px] text-rose-400 font-medium mt-0.5 block">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Phone Number <span className="text-rose-400">*</span></label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`w-full px-4 py-2 text-sm border ${errors.phone ? 'border-rose-500 bg-rose-950/20' : 'border-[#222]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-[#111111] text-white`} placeholder="03001234567" />
                {errors.phone && <span className="text-[11px] text-rose-400 font-medium mt-0.5 block">{errors.phone}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">Detailed Address <span className="text-rose-400">*</span></label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={`w-full px-4 py-2 text-sm border ${errors.address ? 'border-rose-500 bg-rose-950/20' : 'border-[#222]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-[#111111] text-white`} placeholder="Apartment/House/Street description" />
                {errors.address && <span className="text-[11px] text-rose-400 font-medium mt-0.5 block">{errors.address}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1">City <span className="text-rose-400">*</span></label>
                <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2 text-sm border border-[#222] rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 bg-[#111111] text-white cursor-pointer">
                  {PAKISTAN_CITIES.map((city) => (<option key={city} value={city} className="bg-[#111111] text-white">{city}</option>))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#888888] uppercase tracking-wider mb-1.5">Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'cod' ? 'border-amber-400 bg-[#111111] shadow-sm font-medium text-white' : 'border-[#222] hover:border-[#333] text-[#888888]'}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })} className="text-amber-400 focus:ring-amber-400 accent-amber-400" />
                    <div className="text-left"><span className="block text-sm font-medium">Cash on Delivery (COD)</span><span className="block text-[10px] text-[#555]">Pay cash upon secure delivery</span></div>
                  </div>
                  <CheckCircle className={`w-4 h-4 text-amber-400 ${formData.paymentMethod === 'cod' ? 'opacity-100' : 'opacity-0'}`} />
                </label>

                <label className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'card' ? 'border-amber-400 bg-[#111111] shadow-sm font-medium text-white' : 'border-[#222] hover:border-[#333] text-[#888888]'}`}>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={() => setFormData({ ...formData, paymentMethod: 'card' })} className="text-amber-400 focus:ring-amber-400 accent-amber-400" />
                    <div className="text-left"><span className="block text-sm font-medium">Credit / Debit Card</span><span className="block text-[10px] text-[#555]">Secure simulated online routing</span></div>
                  </div>
                  <CheckCircle className={`w-4 h-4 text-amber-400 ${formData.paymentMethod === 'card' ? 'opacity-100' : 'opacity-0'}`} />
                </label>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-white hover:bg-neutral-200 text-black transition-all duration-300 py-3.5 font-sans text-sm font-bold rounded-xl shadow-md disabled:bg-[#444] disabled:text-[#888] focus:outline-none mt-4 flex items-center justify-center gap-2 cursor-pointer">{isSubmitting ? (<><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div><span>Verifying Credentials & Stock...</span></>) : (<span>Confirm Order ({formatPrice(total, currency)})</span>)}</button>
          </form>
        </div>

        <div className="w-full md:w-80 bg-[#111111] p-6 sm:p-8 border-t md:border-t-0 md:border-l border-[#222222] flex flex-col justify-between shrink-0">
          <div>
            <h3 className="font-sans font-bold text-white text-lg mb-4 flex items-center gap-2 pb-2 border-b border-[#222222]"><ShoppingBag className="w-5 h-5 text-amber-400" />Order Summary</h3>

            <div className="divide-y divide-[#222222] max-h-60 overflow-y-auto mb-4 pr-1">
              {cartItems.map((item) => (<div key={item.product.id} className="py-2.5 flex justify-between gap-3 text-xs first:pt-0"><div className="flex-1"><span className="font-medium text-[#F0F0F0] block leading-tight">{item.product.name}</span><span className="text-[10px] text-[#888888]">Qty: {item.quantity}</span></div><span className="font-mono text-white font-semibold shrink-0">{formatPrice(item.product.price * item.quantity, currency)}</span></div>))}
            </div>

            <div className="border-t border-[#222222] pt-3.5 space-y-2 text-xs">
              <div className="flex justify-between text-[#888888]"><span>Subtotal</span><span className="font-mono text-white">{formatPrice(subtotal, currency)}</span></div>
              <div className="flex justify-between text-[#888888]"><span>Delivery Charge</span><span className="font-mono text-emerald-400">{isFreeShipping ? 'FREE' : formatPrice(shippingCost, currency)}</span></div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-[#222222]"><span>Grand Total</span><span className="font-mono text-amber-400">{formatPrice(total, currency)}</span></div>
            </div>
          </div>

          <div className="mt-8 space-y-3.5 text-[11px] text-[#888888] border-t border-[#222222] pt-4">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-amber-400 shrink-0" /><span>Dispatches in 24 hours to major hubs.</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" /><span>Full cash payment on delivery checked.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
