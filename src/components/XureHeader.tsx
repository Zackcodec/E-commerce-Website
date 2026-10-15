import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Smartphone, Monitor, Percent, Sparkles, Store, Ruler, Tag, CreditCard, FileText, Plus } from 'lucide-react';
import { Currency, ProductCategory, UserProfile } from '../types';
import { CURRENCIES } from '../data/xureProducts';

interface XureHeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  currency: Currency;
  onSelectCurrency: (c: Currency) => void;
  isAppViewMode: boolean;
  onToggleAppViewMode: () => void;
  onOpenOrders: () => void;
  onOpenOffers: () => void;
  onOpenCreators: () => void;
  onOpenLocalStores: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenSnapmint: () => void;
  onOpenTerms: () => void;
  onOpenAddProduct: () => void;
  currentUser: UserProfile;
}

export const XureHeader: React.FC<XureHeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  currency,
  onSelectCurrency,
  isAppViewMode,
  onToggleAppViewMode,
  onOpenOrders,
  onOpenOffers,
  onOpenCreators,
  onOpenLocalStores,
  onOpenAuth,
  onOpenProfile,
  onOpenSnapmint,
  onOpenTerms,
  onOpenAddProduct,
  currentUser,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAE8E0] shadow-xs transition-all">
      {/* Top Banner Bar */}
      <div className="bg-[#FAF9F5] border-b border-[#EAE8E0] px-4 py-1.5 text-[11px] text-[#535766] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-black text-[#FF3F6C] tracking-wider uppercase">XURE BESPOKE</span>
          <span aria-hidden="true" className="text-[#D4D2C9]">|</span>
          <span className="truncate">
            Custom Tailored Fits & Local Neighborhood Boutiques · Free Alterations & Same-Day Pickup
          </span>
        </div>

        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={onOpenSnapmint}
            className="hidden md:flex items-center gap-1 font-bold text-[#00B785] hover:text-[#0A8754] cursor-pointer"
          >
            <CreditCard className="w-3 h-3" />
            <span>Snapmint 0% EMI</span>
          </button>

          <button
            onClick={onOpenOffers}
            className="flex items-center gap-1 font-bold text-[#FF3F6C] hover:underline cursor-pointer"
          >
            <Tag className="w-3 h-3" />
            <span>Offers Hub</span>
          </button>

          <button
            onClick={onOpenTerms}
            className="hidden lg:flex items-center gap-1 font-medium text-[#71717A] hover:text-[#282C3F] cursor-pointer"
          >
            <FileText className="w-3 h-3" />
            <span>Terms & Guarantee</span>
          </button>

          {/* Currency Selector */}
          <div className="flex items-center gap-1 text-[11px]">
            <span className="text-[#71717A]">Currency:</span>
            <select
              value={currency}
              onChange={(e) => onSelectCurrency(e.target.value as Currency)}
              aria-label="Select currency"
              className="bg-transparent border-none font-bold text-[#282C3F] cursor-pointer focus:outline-none"
            >
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                <option key={c} value={c}>
                  {c} ({CURRENCIES[c].symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: XURE Brand & Tabs */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* XURE Logo */}
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1A1A1A] via-[#333333] to-[#FF3F6C] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl italic tracking-tighter">X</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#1A1A1A] leading-none uppercase font-serif">
                XURE
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF3F6C] leading-tight">
                Custom Fit & Boutiques
              </span>
            </div>
          </button>

          {/* Department Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs uppercase font-bold tracking-wider text-[#282C3F]">
            <button
              onClick={() => onSelectCategory('all')}
              className={`py-6 border-b-4 transition-colors cursor-pointer ${
                currentCategory === 'all'
                  ? 'border-[#FF3F6C] text-[#FF3F6C]'
                  : 'border-transparent hover:border-[#FF3F6C]'
              }`}
            >
              All Men
            </button>

            <button
              onClick={() => onSelectCategory('custom_tailored')}
              className={`py-6 border-b-4 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentCategory === 'custom_tailored'
                  ? 'border-[#FF3F6C] text-[#FF3F6C]'
                  : 'border-transparent text-[#8C6D46] hover:border-[#FF3F6C]'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-[#FF3F6C]" />
              <span>Custom Fit</span>
            </button>

            <button
              onClick={onOpenLocalStores}
              className="py-6 border-b-4 border-transparent hover:border-[#FF3F6C] transition-colors cursor-pointer flex items-center gap-1.5 text-[#282C3F]"
            >
              <Store className="w-3.5 h-3.5 text-emerald-600" />
              <span>Local Stores</span>
            </button>

            <button
              onClick={() => onSelectCategory('accessories')}
              className={`py-6 border-b-4 transition-colors cursor-pointer ${
                currentCategory === 'accessories'
                  ? 'border-[#FF3F6C] text-[#FF3F6C]'
                  : 'border-transparent hover:border-[#FF3F6C]'
              }`}
            >
              Accessories
            </button>

            <button
              onClick={onOpenOffers}
              className="py-6 border-b-4 border-transparent hover:border-[#FF3F6C] transition-colors cursor-pointer text-[#FF3F6C]"
            >
              Offers
            </button>

            <button
              onClick={onOpenCreators}
              className="py-6 border-b-4 border-transparent hover:border-[#FF3F6C] transition-colors cursor-pointer flex items-center gap-1 text-[#282C3F]"
            >
              <Sparkles className="w-3 h-3 text-[#6A11CB]" />
              <span>Creator Drops</span>
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-[#696E79] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search custom shirts, leather belts, watches, local boutiques..."
              className="w-full bg-[#F5F5F6] border border-transparent rounded-full pl-10 pr-4 py-2.5 text-xs text-[#282C3F] placeholder:text-[#696E79] focus:outline-none focus:bg-white focus:border-[#D4D5D9] transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Quick List Product button for store partners */}
          <button
            onClick={onOpenAddProduct}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#FFF0F4] text-[#282C3F] hover:text-[#FF3F6C] border border-[#EAE8E0] hover:border-[#FF3F6C]/40 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="List a new product into store catalog"
          >
            <Plus className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span className="hidden md:inline">+ List Product</span>
          </button>

          {/* App / Desktop Simulator Toggle */}
          <button
            onClick={onToggleAppViewMode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F6] hover:bg-[#EAE8E0] text-[#282C3F] rounded-full text-xs font-bold transition-all cursor-pointer border border-[#EAE8E0]"
            title="Toggle between XURE Website and Mobile App view"
          >
            {isAppViewMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#FF3F6C]" />
                <span className="hidden sm:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#FF3F6C]" />
                <span className="hidden sm:inline">XURE App Mode</span>
              </>
            )}
          </button>

          {/* User Profile & Dashboard */}
          <div className="relative">
            <button
              onClick={() => {
                if (currentUser.isLoggedIn) {
                  onOpenProfile();
                } else {
                  setIsProfileOpen(!isProfileOpen);
                }
              }}
              className="flex flex-col items-center justify-center p-1 text-[#282C3F] hover:text-[#FF3F6C] transition-colors cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-tr ${
                  currentUser.avatarUrl || 'from-[#1A1A1A] to-[#FF3F6C]'
                } text-white flex items-center justify-center text-[10px] font-bold`}
              >
                {currentUser.isLoggedIn ? currentUser.fullName.charAt(0) : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="text-[10px] font-bold mt-0.5 hidden sm:inline">
                {currentUser.isLoggedIn ? currentUser.fullName.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {isProfileOpen && !currentUser.isLoggedIn && (
              <div
                className="absolute right-0 top-12 w-64 bg-white border border-[#EAE8E0] shadow-xl p-4 z-50 rounded-2xl animate-in fade-in duration-150"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="pb-3 border-b border-[#EAE8E0]">
                  <div className="font-bold text-xs text-[#282C3F]">Welcome to XURE</div>
                  <div className="text-[11px] text-[#71717A] mt-0.5">
                    Sign in to access custom measurements and Snapmint EMI
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full mt-3 py-2 bg-[#FF3F6C] text-white text-xs font-bold rounded-xl uppercase tracking-wider cursor-pointer"
                  >
                    Login / Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center justify-center p-1 text-[#282C3F] hover:text-[#FF3F6C] transition-colors cursor-pointer"
            aria-label={`Wishlist (${wishlistCount})`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-[10px] font-bold mt-0.5 hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center justify-center p-1 text-[#282C3F] hover:text-[#FF3F6C] transition-colors cursor-pointer"
            aria-label={`Bag (${cartCount})`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[10px] font-bold mt-0.5 hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
