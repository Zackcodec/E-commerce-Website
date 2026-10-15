import React from 'react';
import { ShieldCheck, RotateCcw, Smartphone, Ruler, Store, Sparkles, Tag, CreditCard, FileText, Plus } from 'lucide-react';
import { ProductCategory } from '../types';

interface XureFooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onToggleAppViewMode: () => void;
  onOpenOffers: () => void;
  onOpenCreators: () => void;
  onOpenLocalStores: () => void;
  onOpenAuth: () => void;
  onOpenSnapmint?: () => void;
  onOpenTerms?: () => void;
  onOpenAddProduct?: () => void;
}

export const XureFooter: React.FC<XureFooterProps> = ({
  onSelectCategory,
  onToggleAppViewMode,
  onOpenOffers,
  onOpenCreators,
  onOpenLocalStores,
  onOpenAuth,
  onOpenSnapmint,
  onOpenTerms,
  onOpenAddProduct,
}) => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[#EAE8E0] text-[#535766] text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#EAE8E0]">
          {/* Column 1: Online Shopping */}
          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#282C3F] block">
              Custom Fit & Wardrobe
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('custom_tailored')}
                  className="hover:text-[#FF3F6C] transition-colors cursor-pointer text-left font-bold text-[#8C6D46]"
                >
                  ✂️ Bespoke Made-to-Measure Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-[#282C3F] transition-colors cursor-pointer text-left"
                >
                  ⌚ Watches, Leather Belts & Ties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('jeans')}
                  className="hover:text-[#282C3F] transition-colors cursor-pointer text-left"
                >
                  Selvedge & Raw Denim Jeans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('trousers')}
                  className="hover:text-[#282C3F] transition-colors cursor-pointer text-left"
                >
                  Irish Linen & Pleat Trousers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('jackets')}
                  className="hover:text-[#282C3F] transition-colors cursor-pointer text-left"
                >
                  Neapolitan Blazers & Cashmere Coats
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Ecosystem & Programs */}
          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#282C3F] block">
              XURE Programs & Local Boutiques
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenLocalStores}
                  className="hover:text-[#FF3F6C] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Store className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Neighborhood Store Pickup (90-Min)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAddProduct}
                  className="hover:text-[#FF3F6C] transition-colors cursor-pointer text-left flex items-center gap-1.5 font-bold text-[#282C3F]"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FF3F6C]" />
                  <span>+ List Your Boutique Product</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSnapmint}
                  className="hover:text-[#0A8754] transition-colors cursor-pointer text-left flex items-center gap-1.5 font-bold text-[#00B785]"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#00B785]" />
                  <span>Snapmint Pay Later (0% EMI)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCreators}
                  className="hover:text-[#FF3F6C] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6A11CB]" />
                  <span>XURE Creator Collective</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOffers}
                  className="hover:text-[#FF3F6C] transition-colors cursor-pointer text-left flex items-center gap-1.5 text-[#FF3F6C] font-semibold"
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Privilege Deals & Coupons</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: App Experience & Installments */}
          <div className="space-y-3">
            <span className="font-bold uppercase tracking-wider text-[11px] text-[#282C3F] block">
              Experience XURE Mobile App
            </span>
            <p className="text-[11px] text-[#71717A] leading-relaxed">
              Order customized garments with instant phone measurement guidance, 1-touch FaceID reordering, and neighborhood store notifications.
            </p>
            <div className="pt-1">
              <button
                onClick={onToggleAppViewMode}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#282C3F] text-white text-xs font-bold rounded-xl hover:bg-black transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#FF3F6C]" />
                <span>Launch XURE Mobile App View</span>
              </button>
            </div>
          </div>

          {/* Column 4: Trust Guarantees */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center shrink-0">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs text-[#282C3F] block">Perfect Fit Guarantee</strong>
                <button
                  onClick={onOpenTerms}
                  className="text-[11px] text-[#71717A] hover:underline text-left"
                >
                  Free doorstep alterations or 14-day remake on custom garments
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs text-[#282C3F] block">Support Local Artisans</strong>
                <span className="text-[11px] text-[#71717A]">
                  Every local order directly supports neighborhood master tailors
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="pt-6 pb-6 border-b border-[#EAE8E0] space-y-2 text-[11px]">
          <span className="font-bold text-[#282C3F] block uppercase tracking-wider">
            Popular Searches
          </span>
          <p className="text-[#71717A] leading-relaxed">
            Custom Tailored Egyptian Cotton Shirts · Irish Linen Trousers Indiranagar · 13.5oz Kuroki Selvedge Denim Fort Mumbai · Minimalist Bauhaus Chronograph Watches · Full-Grain Leather Belts · Hand-Rolled Mulberry Silk Ties · Snapmint 0% EMI Installments · Local Boutique 90-Min Pickup · Bespoke Suiting Alterations · XURE Offers & Coupons
          </p>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#94969F]">
          <div className="flex items-center gap-2">
            <span>© 2026 XURE ATELIER INC. All rights reserved.</span>
            <span>·</span>
            <span>Made with precision tailoring</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenTerms} className="hover:text-[#282C3F] cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={onOpenSnapmint} className="hover:text-[#282C3F] cursor-pointer">
              Snapmint Pay Later Rules
            </button>
            <button onClick={onOpenLocalStores} className="hover:text-[#282C3F] font-bold text-emerald-700 cursor-pointer">
              Partner Store Sign Up
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
