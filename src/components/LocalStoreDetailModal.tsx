import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Star, Store, Plus, Check, Sparkles, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { StoreProfile, Product, Currency } from '../types';
import { ProductCard } from './ProductCard';

interface LocalStoreDetailModalProps {
  store: StoreProfile | null;
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onQuickViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenAddProductForStore: (storeId: string) => void;
  onSelectStorePickup?: (storeName: string) => void;
}

export const LocalStoreDetailModal: React.FC<LocalStoreDetailModalProps> = ({
  store,
  products,
  currency,
  wishlistIds,
  isOpen,
  onClose,
  onToggleWishlist,
  onQuickViewProduct,
  onAddToCart,
  onOpenAddProductForStore,
  onSelectStorePickup,
}) => {
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Today at 4:30 PM');

  if (!isOpen || !store) return null;

  // Filter products for this store
  const storeProducts = products.filter(
    (p) =>
      p.localStore?.storeId === store.id ||
      p.localStore?.storeName.toLowerCase() === store.storeName.toLowerCase() ||
      store.listedProductIds.includes(p.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close store page"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Store Editorial Hero Banner */}
        <div className={`relative p-6 sm:p-8 bg-gradient-to-r ${store.coverGradient} text-white shrink-0`}>
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                {store.badge}
              </span>
              <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-400/30">
                <Store className="w-3 h-3" />
                <span>90-Min Store Pickup & Trial Ready</span>
              </span>
              <div className="flex items-center gap-1 text-xs font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{store.storeRating}</span>
                <span className="text-white/60 font-normal">({store.ratingCount} reviews)</span>
              </div>
            </div>

            <h1 id="store-detail-title" className="font-serif font-black text-2xl sm:text-3xl tracking-tight">
              {store.storeName}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-light leading-relaxed">
              {store.description}
            </p>

            {/* Quick Metadata Pill Strip */}
            <div className="pt-2 flex items-center gap-4 text-xs text-white/80 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF3F6C]" />
                <span>{store.address} ({store.distanceKm} km away)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{store.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/90">Master Tailor on Duty:</span>
              <span className="text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg">
                {store.masterTailorName} ({store.trialRoomsCount} Private Trial Rooms)
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAddProductForStore(store.id)}
                className="px-4 py-2 bg-white text-[#1A1A1A] hover:bg-[#FAF9F5] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#FF3F6C]" />
                <span>+ List Store Product</span>
              </button>

              {onSelectStorePickup && (
                <button
                  onClick={() => {
                    onSelectStorePickup(store.storeName);
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Select for 90-Min Pickup
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FAF9F5]">
          {/* Trial Room Appointment Booking Card */}
          <div className="p-4 sm:p-5 bg-white border border-[#EAE8E0] rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                Complimentary Service
              </span>
              <h3 className="font-bold text-sm text-[#282C3F]">
                Reserve a Private Trial Room & Master Draper Consultation
              </h3>
              <p className="text-xs text-[#71717A]">
                Have your reserved garments steamed, pressed, and ready for you with free spot pin-fitting.
              </p>
            </div>

            {appointmentBooked ? (
              <div className="bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-xl border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Appointment Confirmed ({selectedSlot})</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="bg-[#FAF9F5] border border-[#D4D5D9] px-3 py-2 rounded-xl text-xs font-bold text-[#282C3F] focus:outline-none"
                >
                  <option value="Today at 4:30 PM">Today at 4:30 PM</option>
                  <option value="Today at 6:00 PM">Today at 6:00 PM</option>
                  <option value="Tomorrow at 11:30 AM">Tomorrow at 11:30 AM</option>
                  <option value="Tomorrow at 3:00 PM">Tomorrow at 3:00 PM</option>
                </select>
                <button
                  onClick={() => setAppointmentBooked(true)}
                  className="px-4 py-2 bg-[#282C3F] hover:bg-black text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Book Slot
                </button>
              </div>
            )}
          </div>

          {/* Catalog Section Header */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <h2 className="font-bold text-base uppercase tracking-wider text-[#282C3F]">
                Products Available in This Store ({storeProducts.length})
              </h2>
              <span className="text-xs text-[#71717A]">
                All garments can be picked up in 90 minutes or delivered via 2-hour express courier
              </span>
            </div>

            <button
              onClick={() => onOpenAddProductForStore(store.id)}
              className="text-xs font-bold text-[#FF3F6C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product to Store</span>
            </button>
          </div>

          {/* Store Products Grid */}
          {storeProducts.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#EAE8E0] rounded-2xl p-6">
              <Store className="w-10 h-10 text-[#94969F] mx-auto mb-2" />
              <h3 className="font-bold text-sm text-[#282C3F]">No items listed yet in this boutique</h3>
              <p className="text-xs text-[#71717A] mt-1 max-w-sm mx-auto">
                Be the first to list custom shirts, Irish linen trousers, or raw denim pieces for this store.
              </p>
              <button
                onClick={() => onOpenAddProductForStore(store.id)}
                className="mt-4 px-5 py-2.5 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-xl cursor-pointer"
              >
                + List Product Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {storeProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickViewProduct}
                  onAddToCart={(p, size, col) => onAddToCart(p, size, col)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
