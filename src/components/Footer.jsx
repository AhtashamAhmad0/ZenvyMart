import React from 'react';
import { Sparkles, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] text-white border-t border-[#222222] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-[#222222]">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center font-mono font-bold text-amber-400">
                Z
              </div>
              <span className="text-lg font-bold tracking-tight">
                ZENVY <span className="text-xs text-amber-400 font-mono">MART</span>
              </span>
            </div>
            <p className="text-xs text-[#888888] leading-relaxed">
              Curating genuine high-end watches, clinical skincare serums, and daily lifestyle instruments with safe delivery across Pakistan.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">Logistics Concierge</h4>
            <ul className="space-y-2 text-xs text-[#888888] font-mono">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@zenvymart.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+92 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lahore, Islamabad, Karachi Hubs</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono">Genuine luxury pledge</h4>
            <div className="p-3.5 bg-[#111111] rounded-xl border border-[#222222] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-white">Expert-Audited Curation</p>
                <p className="text-[10px] text-[#888888] mt-0.5 leading-relaxed">
                  We verify serial batch tags and box accessories prior to custom release. Receive a 100% money-back check if authenticity indicators ever fail verification.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} ZENVY MART LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">TERMS OF SALE</span>
            <span>•</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">ANTI-PIRACY PLEDGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
