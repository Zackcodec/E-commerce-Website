import React from 'react';
import { Wifi, Battery, Search, Heart, ShoppingBag, Home, Ruler, Store, Tag, User, Sparkles, CreditCard, Plus, FileText, ArrowRight } from 'lucide-react';
import { Product, Currency, ProductCategory, StoreProfile } from '../types';
import { DEFAULT_LOCAL_STORES } from '../data/xureProducts';
import { ProductCard } from './ProductCard';
import { StoryReels } from './StoryReels';

interface MobileAppFrameProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  cartCount: number;
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleWishlist: (id: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onOpenOffers: () => void;
  onOpenCreators: () => void;
  onOpenLocalStores: () => void;
  onOpenAuth: () => void;
  onOpenProfile?: () => void;
  onOpenSnapmint?: () => void;
  onOpenTerms?: () => void;
  onOpenAddProduct?: () => void;
  onOpenStoreDetail?: (store: StoreProfile) => void;
  onCloseAppMode: () => void;
}

export const MobileAppFrame: React.FC<MobileAppFrameProps> = ({
  products,
  currency,
  wishlistIds,
  cartCount,
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenOffers,
  onOpenCreators,
  onOpenLocalStores,
  onOpenAuth,
  onOpenProfile,
  onOpenSnapmint,
  onOpenTerms,
  onOpenAddProduct,
  onOpenStoreDetail,
  onCloseAppMode,
}) => {
  const [mobileTab, setMobileTab] = React.useState<'home' | 'custom' | 'stores' | 'offers' | 'profile'>('home');

  const appCategories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Men' },
    { id: 'custom_tailored', label: '✂️ Custom Fit' },
    { id: 'accessories', label: '⌚ Accessories' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'trousers', label: 'Trousers' },
    { id: 'jeans', label: 'Selvedge' },
    { id: 'jackets', label: 'Blazers' },
  ];

  return (
    <div className="py-6 sm:py-10 flex flex-col items-center justify-center bg-[#1A1A1A]/95 min-h-screen px-2">
      {/* Top Floating Bar */}
      <div className="mb-4 flex items-center justify-between w-full max-w-sm text-white px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3F6C] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">XURE Mobile App Simulator</span>
        </div>
        <button
          onClick={onCloseAppMode}
          className="text-xs font-bold text-[#FF3F6C] hover:underline cursor-pointer bg-white/10 px-3 py-1 rounded-full"
        >
          Exit to Desktop View ✕
        </button>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[395px] h-[830px] bg-black rounded-[46px] p-3 shadow-2xl border-4 border-[#333333] flex flex-col overflow-hidden">
        {/* Dynamic Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end pr-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-white/20" />
        </div>

        {/* Screen */}
        <div className="relative w-full h-full bg-[#FAF9F5] rounded-[36px] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-[#282C3F] bg-white z-30 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* App Header */}
          <div className="bg-white border-b border-[#EAE8E0] px-4 py-2.5 flex items-center justify-between gap-3 z-30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1A1A1A] to-[#FF3F6C] flex items-center justify-center text-white font-black text-xs italic">
                X
              </div>
              <span className="font-serif font-black text-base text-[#1A1A1A] tracking-wider uppercase">
                XURE
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-[#282C3F]">
              <button
                onClick={onOpenAddProduct}
                className="p-1 bg-[#FAF9F5] hover:bg-[#FFF0F4] rounded-lg text-[#FF3F6C] border border-[#EAE8E0]"
                title="List product"
              >
                <Plus className="w-4 h-4" />
              </button>

              <button onClick={onOpenWishlist} className="relative p-1">
                <Heart className="w-4 h-4" />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF3F6C] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              <button onClick={onOpenCart} className="relative p-1">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF3F6C] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white px-3 py-2 border-b border-[#EAE8E0]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Custom shirts, leather belts, local stores..."
                className="w-full bg-[#F5F5F6] border-none rounded-full pl-9 pr-3 py-1.5 text-xs text-[#282C3F] focus:outline-none"
              />
            </div>
          </div>

          {/* Scrollable View Area */}
          <div className="flex-1 overflow-y-auto pb-16">
            {mobileTab === 'home' && (
              <>
                {/* Stories Reel */}
                <StoryReels products={products} onOpenProduct={onQuickView} />

                {/* Horizontal Category Pills */}
                <div className="p-3 bg-white border-b border-[#EAE8E0] flex items-center gap-2 overflow-x-auto scrollbar-none">
                  {appCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onSelectCategory(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                        currentCategory === c.id
                          ? 'bg-[#282C3F] text-white'
                          : 'bg-[#F5F5F6] text-[#535766]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Promotional Hero Cards & Snapmint banner */}
                <div className="p-3 space-y-2.5">
                  <div
                    onClick={onOpenOffers}
                    className="bg-gradient-to-r from-[#FF3F6C] to-[#FF905A] p-3.5 rounded-2xl text-white text-xs flex justify-between items-center shadow-xs cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 block">
                        First Order Bespoke Voucher
                      </span>
                      <span className="font-bold text-sm block">Flat ₹500 OFF (Code: XURE500)</span>
                      <span className="text-[10px] text-white/90">Free monogramming + Doorstep alterations</span>
                    </div>
                    <span className="text-lg font-black bg-white/20 px-2 py-1 rounded-lg">₹500</span>
                  </div>

                  {/* Snapmint Pay Later Trigger Card */}
                  <div
                    onClick={onOpenSnapmint}
                    className="bg-[#E8FAF4] border border-[#00B785]/30 p-3 rounded-2xl text-xs flex items-center justify-between shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#00B785] text-white font-black text-xs flex items-center justify-center">
                        S
                      </div>
                      <div>
                        <strong className="block text-[#0A8754] text-xs">Snapmint Pay Later Active</strong>
                        <span className="text-[10px] text-[#535766]">0% Interest EMI · ₹25,000 Pre-Approved</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#00B785]">Check →</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={onOpenLocalStores}
                      className="p-3 bg-white border border-[#EAE8E0] rounded-xl text-left shadow-2xs hover:border-[#FF3F6C] cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-emerald-600 mb-1" />
                      <strong className="block text-[#282C3F] text-xs">Local Stores</strong>
                      <span className="text-[10px] text-[#71717A]">90-Min Store Pickup</span>
                    </button>

                    <button
                      onClick={onOpenCreators}
                      className="p-3 bg-white border border-[#EAE8E0] rounded-xl text-left shadow-2xs hover:border-[#FF3F6C] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#6A11CB] mb-1" />
                      <strong className="block text-[#282C3F] text-xs">Creator Club</strong>
                      <span className="text-[10px] text-[#71717A]">Curated Drops</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Product Grid */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#282C3F]">
                      Custom Fit & Accessories ({products.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {products.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        currency={currency}
                        isWishlisted={wishlistIds.includes(p.id)}
                        onToggleWishlist={onToggleWishlist}
                        onQuickView={onQuickView}
                        onAddToCart={(prod, size, col) => onAddToCart(prod, size, col)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {mobileTab === 'custom' && (
              <div className="p-4 space-y-4">
                <div className="p-4 bg-gradient-to-r from-[#1A1A1A] to-[#333333] text-white rounded-2xl space-y-2">
                  <Ruler className="w-6 h-6 text-[#FF3F6C]" />
                  <h3 className="font-bold text-sm">XURE Made-to-Measure Studio</h3>
                  <p className="text-xs text-white/80">
                    Handcrafted to your exact collar, chest, shoulder, and sleeve measurements with free initials monogramming.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
                    Custom Tailored Garments
                  </span>
                  {products
                    .filter((p) => p.customTailoring?.available)
                    .map((p) => (
                      <div
                        key={p.id}
                        onClick={() => onQuickView(p)}
                        className="p-3 bg-white border border-[#EAE8E0] rounded-xl flex items-center justify-between shadow-2xs cursor-pointer hover:border-[#FF3F6C]"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-[#FF3F6C] uppercase">
                            Bespoke Fit
                          </span>
                          <h4 className="text-xs font-bold text-[#282C3F]">{p.name}</h4>
                          <span className="text-xs font-mono font-bold text-[#282C3F]">
                            ₹{p.priceINR.toLocaleString()}
                          </span>
                        </div>
                        <button className="px-3 py-1.5 bg-[#FF3F6C] text-white text-xs font-bold rounded-lg">
                          Customize
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {mobileTab === 'stores' && (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase text-[#282C3F]">Neighborhood Boutiques</span>
                  <button
                    onClick={onOpenAddProduct}
                    className="text-[11px] font-bold text-[#FF3F6C] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>List Product</span>
                  </button>
                </div>

                {DEFAULT_LOCAL_STORES.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => onOpenStoreDetail?.(st)}
                    className="p-4 bg-white border border-[#EAE8E0] rounded-2xl space-y-2 cursor-pointer shadow-2xs hover:border-[#FF3F6C] transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {st.badge}
                        </span>
                        <h4 className="text-xs font-bold text-[#282C3F] mt-1">{st.storeName}</h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        ★ {st.storeRating}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#71717A] flex items-center justify-between pt-1 border-t border-[#F5F5F6]">
                      <span>📍 {st.neighborhood} ({st.distanceKm} km)</span>
                      <span className="text-emerald-700 font-bold">90-min pickup →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mobileTab === 'offers' && (
              <div className="p-4 space-y-3">
                <button
                  onClick={onOpenOffers}
                  className="w-full p-4 bg-[#FFF0F4] border border-[#FF3F6C] rounded-2xl text-left"
                >
                  <span className="text-[10px] font-bold uppercase text-[#FF3F6C]">Vouchers Available</span>
                  <strong className="block text-sm text-[#282C3F] mt-0.5">Explore Privilege Offers & Coupons</strong>
                  <span className="text-xs text-[#71717A]">Tap to open the full deals hub →</span>
                </button>

                <button
                  onClick={onOpenSnapmint}
                  className="w-full p-4 bg-[#E8FAF4] border border-[#00B785] rounded-2xl text-left"
                >
                  <span className="text-[10px] font-bold uppercase text-[#00B785]">Snapmint Pay Later</span>
                  <strong className="block text-sm text-[#282C3F] mt-0.5">0% Interest EMI Plans</strong>
                  <span className="text-xs text-[#71717A]">Pre-approved credit calculator →</span>
                </button>
              </div>
            )}

            {mobileTab === 'profile' && (
              <div className="p-4 space-y-4">
                <div
                  onClick={onOpenProfile}
                  className="p-4 bg-white border border-[#EAE8E0] rounded-2xl flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1A1A1A] to-[#FF3F6C] text-white font-bold flex items-center justify-center text-lg">
                      J
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#282C3F] block">Julian Vance</span>
                      <span className="text-xs text-[#FF3F6C] font-semibold">Custom Fit Profile Active</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#71717A]" />
                </div>

                <div className="space-y-2 text-xs font-bold text-[#282C3F]">
                  <button
                    onClick={onOpenProfile}
                    className="w-full p-3.5 bg-white border border-[#EAE8E0] rounded-xl text-left flex justify-between items-center text-[#FF3F6C] cursor-pointer"
                  >
                    <span>My Custom Measurements Dashboard</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={onOpenOrders}
                    className="w-full p-3.5 bg-white border border-[#EAE8E0] rounded-xl text-left flex justify-between items-center cursor-pointer"
                  >
                    <span>Orders & In-Store Pickups</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={onOpenSnapmint}
                    className="w-full p-3.5 bg-white border border-[#EAE8E0] rounded-xl text-left flex justify-between items-center text-[#0A8754] cursor-pointer"
                  >
                    <span>Snapmint Pre-Approved Limit (₹25,000)</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={onOpenTerms}
                    className="w-full p-3.5 bg-white border border-[#EAE8E0] rounded-xl text-left flex justify-between items-center cursor-pointer"
                  >
                    <span>14-Day Free Remake Policy & Terms</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom App Navigation Bar */}
          <nav className="absolute bottom-0 inset-x-0 h-14 bg-white border-t border-[#EAE8E0] flex items-center justify-around z-40 text-[10px] font-bold">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                mobileTab === 'home' ? 'text-[#FF3F6C]' : 'text-[#71717A]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setMobileTab('custom')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                mobileTab === 'custom' ? 'text-[#FF3F6C]' : 'text-[#71717A]'
              }`}
            >
              <Ruler className="w-4 h-4" />
              <span>Custom Fit</span>
            </button>

            <button
              onClick={() => setMobileTab('stores')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                mobileTab === 'stores' ? 'text-[#FF3F6C]' : 'text-[#71717A]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Local Stores</span>
            </button>

            <button
              onClick={onOpenOffers}
              className="flex flex-col items-center gap-0.5 text-[#FF3F6C] cursor-pointer"
            >
              <Tag className="w-4 h-4" />
              <span>Offers</span>
            </button>

            <button
              onClick={() => {
                setMobileTab('profile');
                onOpenProfile?.();
              }}
              className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                mobileTab === 'profile' ? 'text-[#FF3F6C]' : 'text-[#71717A]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
