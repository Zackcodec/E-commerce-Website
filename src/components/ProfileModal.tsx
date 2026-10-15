import React, { useState } from 'react';
import { X, User, Ruler, Store, Sparkles, CreditCard, Check, ArrowRight, ShieldCheck, QrCode, Search, Edit3, Heart, ShoppingBag, Eye } from 'lucide-react';
import { UserProfile, CustomMeasurements, Product, Currency, Order } from '../types';
import { CURRENCIES } from '../data/xureProducts';
import { ProductCard } from './ProductCard';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  allProducts: Product[];
  orders: Order[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onQuickViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenSnapmint: () => void;
  onOpenLocalStores: () => void;
  onOpenTerms: () => void;
  onSearchTag: (query: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
  allProducts,
  orders,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickViewProduct,
  onAddToCart,
  onOpenSnapmint,
  onOpenLocalStores,
  onOpenTerms,
  onSearchTag,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'measurements' | 'avatars' | 'pickups'>('dashboard');
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState<CustomMeasurements>(
    currentUser.savedMeasurements || {
      collarNeck: '40',
      chestBust: '104',
      shoulderWidth: '46',
      sleeveLength: '66',
      waistCircumference: '84',
      trouserInseam: '81',
      fitPreference: 'tailored_european',
      monogramText: 'JV',
      monogramThreadColor: 'gold',
    }
  );

  // Avatar presets
  const avatarPresets = [
    {
      id: 'av-1',
      label: 'Sartorial Charcoal',
      svg: '🎩',
      gradient: 'from-[#1A1A1A] to-[#3A3D40]',
    },
    {
      id: 'av-2',
      label: 'Bespoke Camel',
      svg: '🧥',
      gradient: 'from-[#8C6D46] to-[#C2A649]',
    },
    {
      id: 'av-3',
      label: 'Contemporary Indigo',
      svg: '🕶️',
      gradient: 'from-[#162447] to-[#1F4068]',
    },
    {
      id: 'av-4',
      label: 'Minimalist Ivory',
      svg: '👔',
      gradient: 'from-[#4A5568] to-[#718096]',
    },
  ];

  if (!isOpen) return null;

  // Personalized recommendations based on user search history or style persona
  const recommendedProducts = allProducts.filter((p) => {
    if (currentUser.searchHistory && currentUser.searchHistory.length > 0) {
      const lastSearch = currentUser.searchHistory[0]?.toLowerCase() || '';
      if (
        p.name.toLowerCase().includes(lastSearch) ||
        p.category.toLowerCase().includes(lastSearch) ||
        p.fabric.material.toLowerCase().includes(lastSearch)
      ) {
        return true;
      }
    }
    return p.isTrending || p.customTailoring?.available;
  }).slice(0, 4);

  const handleSaveMeasurements = () => {
    onUpdateUser({
      ...currentUser,
      savedMeasurements: measurements,
    });
    setIsEditingMeasurements(false);
  };

  const handleSelectAvatar = (gradient: string) => {
    onUpdateUser({
      ...currentUser,
      avatarUrl: gradient,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-dashboard-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-[#EAE8E0] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar with preset gradient */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${
                currentUser.avatarUrl || 'from-[#1A1A1A] to-[#FF3F6C]'
              } text-white flex items-center justify-center text-xl font-bold shadow-md cursor-pointer relative group`}
              onClick={() => setActiveTab('avatars')}
              title="Change Profile Picture"
            >
              <span>{currentUser.fullName ? currentUser.fullName.charAt(0) : 'J'}</span>
              <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] uppercase font-bold transition-opacity">
                Edit
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 id="profile-dashboard-title" className="font-extrabold text-lg text-[#1A1A1A]">
                  {currentUser.fullName || 'Julian Vance'}
                </h2>
                <span className="bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  XURE Privileged Gentleman
                </span>
              </div>
              <div className="text-xs text-[#71717A] flex items-center gap-3 mt-0.5">
                <span>{currentUser.phone || '+91 98765 43210'}</span>
                <span>·</span>
                <span>{currentUser.email || 'julian.vance@cloutix.com'}</span>
                <span>·</span>
                <span className="font-mono text-[#FF3F6C] font-bold">
                  Monogram: [{measurements.monogramText || 'JV'}]
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#1A1A1A] rounded-full hover:bg-white transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE8E0] bg-white text-xs font-bold uppercase tracking-wider overflow-x-auto scrollbar-none px-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3.5 px-4 text-center transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            My Atelier Dashboard
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`py-3.5 px-4 text-center transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'measurements'
                ? 'border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Saved Measurements</span>
          </button>
          <button
            onClick={() => setActiveTab('pickups')}
            className={`py-3.5 px-4 text-center transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pickups'
                ? 'border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>Store Pickups ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('avatars')}
            className={`py-3.5 px-4 text-center transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'avatars'
                ? 'border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Avatars</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#FAF9F5]">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Snapmint Pay Later Limit Card */}
              <div className="p-5 bg-gradient-to-r from-[#00D09C] via-[#00B785] to-[#0A8754] text-white rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                      Pre-Approved Credit Line
                    </span>
                    <span className="text-[10px] font-bold text-white/90">0% Interest Active</span>
                  </div>
                  <h3 className="text-xl font-black font-mono">
                    ₹{currentUser.snapmintCreditLimitINR?.toLocaleString() || '25,000'} Available
                  </h3>
                  <p className="text-xs text-white/90 max-w-sm">
                    Snapmint Pay Later is pre-authorized for your phone number. Buy made-to-measure garments in 3 or 6 monthly installments.
                  </p>
                </div>

                <button
                  onClick={onOpenSnapmint}
                  className="px-5 py-2.5 bg-white text-[#0A8754] hover:bg-[#E8FAF4] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md whitespace-nowrap"
                >
                  View Plans & Repayments
                </button>
              </div>

              {/* Dynamic Recommendations Based on Searches */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF3F6C] block">
                      Curated For Your Wardrobe
                    </span>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                      Recommendations Based on Your Searches & Fit
                    </h3>
                  </div>

                  {currentUser.searchHistory && currentUser.searchHistory.length > 0 && (
                    <span className="text-xs text-[#71717A] bg-white border border-[#EAE8E0] px-2.5 py-1 rounded-lg">
                      Recent: <strong>"{currentUser.searchHistory[0]}"</strong>
                    </span>
                  )}
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => onQuickViewProduct(prod)}
                      className="bg-white border border-[#EAE8E0] rounded-2xl p-3 hover:border-[#FF3F6C] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[9px] font-bold text-[#FF3F6C] uppercase block truncate">
                          {prod.brand}
                        </span>
                        <h4 className="font-bold text-xs text-[#282C3F] truncate mt-0.5">{prod.name}</h4>
                        <span className="text-xs font-bold font-mono text-[#282C3F] block mt-1">
                          ₹{prod.priceINR.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod, prod.sizes[0]?.size || 'Custom Fit', prod.colors[0]?.name || '');
                        }}
                        className="mt-2.5 w-full py-1.5 bg-[#FAF9F5] hover:bg-[#FF3F6C] hover:text-white text-[#282C3F] text-[10px] font-bold uppercase rounded-lg border border-[#D4D5D9] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Quick Bag</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search History Tags Bar */}
              {currentUser.searchHistory && currentUser.searchHistory.length > 0 && (
                <div className="p-4 bg-white border border-[#EAE8E0] rounded-2xl space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    <span>Your Recent Searches & Topics</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.searchHistory.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSearchTag(q);
                          onClose();
                        }}
                        className="px-3 py-1 bg-[#FAF9F5] hover:bg-[#FFF0F4] hover:text-[#FF3F6C] border border-[#EAE8E0] rounded-full text-xs font-medium text-[#282C3F] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{q}</span>
                        <ArrowRight className="w-3 h-3 text-[#71717A]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => setActiveTab('measurements')}
                  className="p-4 bg-white border border-[#EAE8E0] rounded-2xl text-left hover:border-[#FF3F6C] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center">
                      <Ruler className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-[#282C3F] text-xs">Custom Fitting Dimensions</strong>
                      <span className="text-[11px] text-[#71717A]">Collar: {measurements.collarNeck}cm · Chest: {measurements.chestBust}cm</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#71717A]" />
                </button>

                <button
                  onClick={onOpenTerms}
                  className="p-4 bg-white border border-[#EAE8E0] rounded-2xl text-left hover:border-[#FF3F6C] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-[#282C3F] text-xs">14-Day Perfect Fit Policy</strong>
                      <span className="text-[11px] text-[#71717A]">Free alterations, pickups & terms</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#71717A]" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'measurements' && (
            <div className="bg-white p-6 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                    My Master Draper Measurements (cm)
                  </h3>
                  <span className="text-xs text-[#71717A]">
                    These dimensions are automatically transmitted to master tailors for your bespoke orders
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (isEditingMeasurements) {
                      handleSaveMeasurements();
                    } else {
                      setIsEditingMeasurements(true);
                    }
                  }}
                  className="px-4 py-2 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  {isEditingMeasurements ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Measurements</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Values</span>
                    </>
                  )}
                </button>
              </div>

              {/* Measurement Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Collar / Neck (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.collarNeck || ''}
                    onChange={(e) => setMeasurements({ ...measurements, collarNeck: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Chest / Bust (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.chestBust || ''}
                    onChange={(e) => setMeasurements({ ...measurements, chestBust: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Shoulder Width (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.shoulderWidth || ''}
                    onChange={(e) => setMeasurements({ ...measurements, shoulderWidth: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Sleeve Length (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.sleeveLength || ''}
                    onChange={(e) => setMeasurements({ ...measurements, sleeveLength: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.waistCircumference || ''}
                    onChange={(e) => setMeasurements({ ...measurements, waistCircumference: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#71717A] block mb-1">Trouser Inseam (cm)</label>
                  <input
                    type="number"
                    disabled={!isEditingMeasurements}
                    value={measurements.trouserInseam || ''}
                    onChange={(e) => setMeasurements({ ...measurements, trouserInseam: e.target.value })}
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl font-mono text-xs bg-[#FAF9F5] disabled:opacity-75 focus:bg-white"
                  />
                </div>
              </div>

              {/* Monogram settings */}
              <div className="p-4 bg-[#FAF9F5] border border-[#EAE8E0] rounded-2xl flex items-center justify-between">
                <div>
                  <strong className="text-xs text-[#282C3F] block">Personal Monogram Initial Stamp</strong>
                  <span className="text-[11px] text-[#71717A]">
                    Embroidered on cuffs, blazer inner breast pockets, and leather goods
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={3}
                  disabled={!isEditingMeasurements}
                  value={measurements.monogramText || 'JV'}
                  onChange={(e) => setMeasurements({ ...measurements, monogramText: e.target.value.toUpperCase() })}
                  className="w-16 p-2 text-center font-bold font-mono uppercase bg-white border border-[#D4D5D9] rounded-xl text-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'avatars' && (
            <div className="bg-white p-6 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-5">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                  Select Your Gentleman Profile Avatar
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Pick an aesthetic luxury gradient to represent your bespoke persona across XURE.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {avatarPresets.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => handleSelectAvatar(av.gradient)}
                    className="p-4 rounded-2xl border border-[#EAE8E0] hover:border-[#FF3F6C] hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center space-y-2 group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${av.gradient} text-white text-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <span>{av.svg}</span>
                    </div>
                    <span className="text-xs font-bold text-[#282C3F]">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pickups' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                    Local Boutique Orders & In-Store Pickups ({orders.length})
                  </h3>
                  <span className="text-xs text-[#71717A]">
                    Show your trial-room QR code upon arrival for instant service
                  </span>
                </div>
                <button
                  onClick={onOpenLocalStores}
                  className="text-xs font-bold text-[#FF3F6C] hover:underline"
                >
                  Browse Nearby Stores →
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white border border-[#EAE8E0] rounded-3xl">
                  <Store className="w-10 h-10 text-[#94969F] mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-[#282C3F]">No active store pickup orders</h4>
                  <p className="text-xs text-[#71717A] mt-1 max-w-sm mx-auto">
                    When you order from neighborhood boutiques, your 90-minute trial pass and pickup QR code will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-5 bg-white border border-[#EAE8E0] rounded-2xl shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {ord.deliveryMethod === 'store_pickup' ? 'Store Pickup Ready' : 'Confirmed Order'}
                          </span>
                          <h4 className="font-bold text-sm text-[#282C3F] mt-1">Order #{ord.id}</h4>
                          <span className="text-xs text-[#71717A]">
                            Placed on {ord.date} · {ord.items.length} items · Total ₹{ord.total.toLocaleString()}
                          </span>
                        </div>

                        {/* Digital QR Code Pill */}
                        <div className="p-2 bg-[#FAF9F5] border border-[#D4D5D9] rounded-xl flex items-center gap-2">
                          <QrCode className="w-6 h-6 text-[#282C3F]" />
                          <div className="text-left font-mono">
                            <span className="text-[9px] text-[#71717A] block">PIN CODE</span>
                            <strong className="text-xs text-[#FF3F6C]">482910</strong>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[#535766] space-y-1 pt-1 border-t border-[#F5F5F6]">
                        {ord.items.map((it) => (
                          <div key={it.id} className="flex justify-between">
                            <span>{it.product.name} ({it.selectedSize})</span>
                            <span className="font-mono">₹{it.product.priceINR.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
