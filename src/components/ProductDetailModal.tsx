import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, Truck, RotateCcw, ShieldCheck, Tag, Ruler, Check, Store, Sparkles, MapPin, Zap, ArrowRight, CreditCard } from 'lucide-react';
import { Product, Currency, CustomMeasurements } from '../types';
import { CURRENCIES, AVAILABLE_COUPONS } from '../data/xureProducts';
import { GarmentVisual } from './GarmentVisual';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    isCustomFit?: boolean,
    customMeasurements?: CustomMeasurements
  ) => void;
  onOpenSnapmint?: (priceINR: number) => void;
  onOpenStorePage?: (storeId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onOpenSnapmint,
  onOpenStorePage,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product.customTailoring?.available
      ? 'Custom Made-to-Measure'
      : product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || ''
  );

  const [isCustomMode, setIsCustomMode] = useState(Boolean(product.customTailoring?.available));
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    collarNeck: '40',
    chestBust: '104',
    shoulderWidth: '46',
    sleeveLength: '66',
    waistCircumference: '84',
    trouserInseam: '81',
    fitPreference: 'tailored_european',
    monogramText: 'JV',
    monogramThreadColor: 'gold',
  });

  const [pincodeInput, setPincodeInput] = useState('560001');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [addedJustNow, setAddedJustNow] = useState(false);

  const currentColorHex =
    product.colors.find((c) => c.name === selectedColor)?.hex || product.colors[0]?.hex;
  const currencyInfo = CURRENCIES[currency];

  const currentPrice = Math.round(product.priceINR * currencyInfo.rate);
  const originalMrp = Math.round(product.originalMrpINR * currencyInfo.rate);
  const emi3 = Math.round(currentPrice / 3);

  const handleAdd = () => {
    onAddToCart(
      product,
      isCustomMode ? 'Custom Tailored' : selectedSize,
      selectedColor,
      1,
      isCustomMode,
      isCustomMode ? customMeasurements : undefined
    );
    setAddedJustNow(true);
    setTimeout(() => setAddedJustNow(false), 2400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="xure-pdp-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[94vh] border border-[#EAE8E0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 hover:bg-white text-[#282C3F] rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Brand Stamp */}
        <div className="md:w-1/2 bg-[#F5F5F6] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE8E0] overflow-y-auto">
          <div className="relative aspect-[3/4] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-[#EAE8E0]">
            <GarmentVisual
              type={product.silhouetteSvg}
              colorHex={currentColorHex}
              className="w-full h-full"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
              {product.customTailoring?.available && (
                <div className="bg-[#1A1A1A] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Ruler className="w-3 h-3 text-[#FF3F6C]" />
                  <span>Custom Made-to-Measure</span>
                </div>
              )}
              {product.localStore && (
                <button
                  onClick={() => product.localStore?.storeId && onOpenStorePage?.(product.localStore.storeId)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                >
                  <Store className="w-3 h-3" />
                  <span>{product.localStore.storeName}</span>
                </button>
              )}
            </div>
          </div>

          {/* Colorway Switcher Thumbnails */}
          <div className="mt-4 pt-3 border-t border-[#EAE8E0] flex items-center justify-between">
            <span className="text-xs font-bold text-[#282C3F]">Colorways:</span>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                    selectedColor === c.name ? 'scale-115 border-[#FF3F6C]' : 'border-white shadow-xs'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: PDP Controls & Custom Fit Engine */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-[94vh] space-y-5">
          {/* Header & Brand */}
          <div className="border-b border-[#F5F5F6] pb-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#FF3F6C]">
                {product.brand}
              </span>
              {product.localStore && (
                <button
                  onClick={() => product.localStore?.storeId && onOpenStorePage?.(product.localStore.storeId)}
                  className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <MapPin className="w-3 h-3" />
                  {product.localStore.neighborhood} ({product.localStore.distanceKm} km away)
                </button>
              )}
            </div>

            <h1 id="xure-pdp-title" className="font-bold text-lg sm:text-xl text-[#282C3F] mt-1">
              {product.name}
            </h1>

            {/* Rating Strip */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#EAE8E0] text-xs font-bold text-[#282C3F]">
              <span>{product.rating}</span>
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span className="text-[#D4D5D9]">|</span>
              <span className="text-[#535766] font-normal">{product.ratingCount.toLocaleString()} Verified Reviews</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="border-b border-[#F5F5F6] pb-4">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="font-bold text-2xl text-[#282C3F] font-mono tabular-nums">
                {currencyInfo.symbol}{currentPrice.toLocaleString()}
              </span>
              <span className="text-sm text-[#7E818C] line-through font-mono tabular-nums">
                MRP {currencyInfo.symbol}{originalMrp.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[#FF905A]">
                ({product.discountPercentage}% OFF)
              </span>
            </div>

            {/* Snapmint Pay Later Installment Banner */}
            <div className="mt-3 p-3 bg-gradient-to-r from-[#E8FAF4] to-emerald-50/70 border border-[#00B785]/30 rounded-2xl flex items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#00B785] text-white font-black text-xs flex items-center justify-center shrink-0">
                  S
                </div>
                <div>
                  <span className="text-xs font-bold text-[#282C3F] block">
                    Or 3 monthly installments of {currencyInfo.symbol}{emi3.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#0A8754] font-medium block">
                    0% Interest with Snapmint · No credit card required
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenSnapmint?.(product.priceINR)}
                className="text-xs font-bold text-[#00B785] hover:text-[#0A8754] hover:underline cursor-pointer whitespace-nowrap"
              >
                Know More →
              </button>
            </div>
          </div>

          {/* Custom Tailoring vs Standard Size Selector */}
          <div className="space-y-3">
            {product.customTailoring?.available ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-xs text-[#282C3F] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    <span>Choose Fit Type:</span>
                  </span>
                  <div className="flex items-center gap-1 bg-[#FAF9F5] p-1 border border-[#EAE8E0] rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setIsCustomMode(true)}
                      className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                        isCustomMode ? 'bg-[#FF3F6C] text-white shadow-xs' : 'text-[#71717A]'
                      }`}
                    >
                      Bespoke Custom Fit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCustomMode(false)}
                      className={`px-3 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                        !isCustomMode ? 'bg-[#282C3F] text-white shadow-xs' : 'text-[#71717A]'
                      }`}
                    >
                      Standard Sizes
                    </button>
                  </div>
                </div>

                {isCustomMode ? (
                  /* Custom Measurement Form */
                  <div className="bg-[#FAF9F5] border border-[#EAE8E0] p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase text-[#282C3F]">
                        Custom Body Dimensions (cm)
                      </span>
                      <span className="text-[10px] text-[#FF3F6C] font-bold">14-Day Free Remake</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-[#71717A] block">Collar (cm)</label>
                        <input
                          type="number"
                          value={customMeasurements.collarNeck}
                          onChange={(e) =>
                            setCustomMeasurements({ ...customMeasurements, collarNeck: e.target.value })
                          }
                          className="w-full p-2 bg-white border border-[#D4D2C9] rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#71717A] block">Chest (cm)</label>
                        <input
                          type="number"
                          value={customMeasurements.chestBust}
                          onChange={(e) =>
                            setCustomMeasurements({ ...customMeasurements, chestBust: e.target.value })
                          }
                          className="w-full p-2 bg-white border border-[#D4D2C9] rounded-lg font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#71717A] block">Sleeve (cm)</label>
                        <input
                          type="number"
                          value={customMeasurements.sleeveLength}
                          onChange={(e) =>
                            setCustomMeasurements({ ...customMeasurements, sleeveLength: e.target.value })
                          }
                          className="w-full p-2 bg-white border border-[#D4D2C9] rounded-lg font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EAE8E0] flex items-center justify-between gap-3 text-xs">
                      <div className="flex-1">
                        <label className="text-[10px] text-[#71717A] block">Fit Silhouette</label>
                        <select
                          value={customMeasurements.fitPreference}
                          onChange={(e) =>
                            setCustomMeasurements({
                              ...customMeasurements,
                              fitPreference: e.target.value as any,
                            })
                          }
                          className="w-full p-1.5 bg-white border border-[#D4D2C9] rounded-lg text-xs"
                        >
                          <option value="tailored_european">Tailored European</option>
                          <option value="ultra_slim">Ultra Slim</option>
                          <option value="relaxed_modern">Relaxed Modern</option>
                        </select>
                      </div>

                      {product.customTailoring.monogrammingAvailable && (
                        <div>
                          <label className="text-[10px] text-[#71717A] block">Free Monogram Initials</label>
                          <input
                            type="text"
                            maxLength={3}
                            value={customMeasurements.monogramText || ''}
                            onChange={(e) =>
                              setCustomMeasurements({
                                ...customMeasurements,
                                monogramText: e.target.value.toUpperCase(),
                              })
                            }
                            placeholder="e.g. JV"
                            className="w-20 p-1.5 text-center font-bold uppercase bg-white border border-[#D4D2C9] rounded-lg text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Standard Size Buttons */
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.size}
                        type="button"
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedSize === s.size
                            ? 'border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C] ring-2 ring-[#FF3F6C]/20'
                            : s.inStock
                            ? 'border-[#EAE8E0] bg-white text-[#282C3F] hover:border-[#A1A1AA]'
                            : 'border-[#EAE8E0] bg-[#F5F5F6] text-[#A1A1AA] cursor-not-allowed'
                        }`}
                      >
                        <span>{s.size}</span>
                        {!s.inStock && (
                          <span className="block text-[8px] font-normal uppercase">Out of stock</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Ready-to-Wear Sizes */
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-xs text-[#282C3F] block">
                  Select Size
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedSize === s.size
                          ? 'border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C] ring-2 ring-[#FF3F6C]/20'
                          : s.inStock
                          ? 'border-[#EAE8E0] bg-white text-[#282C3F] hover:border-[#A1A1AA]'
                          : 'border-[#EAE8E0] bg-[#F5F5F6] text-[#A1A1AA] cursor-not-allowed'
                      }`}
                    >
                      <span>{s.size}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Add to Bag & Wishlist */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 px-6 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {addedJustNow ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added To Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isCustomMode ? 'Add Custom Tailored Order' : 'Add To Bag'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`py-3.5 px-6 border rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isWishlisted
                  ? 'border-[#FF3F6C] text-[#FF3F6C] bg-[#FFF0F4]'
                  : 'border-[#D4D5D9] text-[#282C3F] hover:border-[#282C3F]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF3F6C]' : ''}`} />
              <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>
          </div>

          {/* Local Store Partner Card if applicable */}
          {product.localStore && (
            <div
              onClick={() => product.localStore?.storeId && onOpenStorePage?.(product.localStore.storeId)}
              className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs cursor-pointer hover:border-emerald-400 transition-all shadow-2xs"
            >
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-emerald-700" />
                  {product.localStore.storeName}
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>View Store Page</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                📍 {product.localStore.neighborhood} ({product.localStore.distanceKm} km away) · In-store trial room ready in 90 minutes.
              </p>
            </div>
          )}

          {/* Delivery & Pickup Options */}
          <div className="border-t border-[#F5F5F6] pt-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#282C3F]">
              <Truck className="w-4 h-4 text-[#FF3F6C]" />
              <span>Delivery & Fulfillment Modes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-white border border-[#EAE8E0] rounded-xl flex items-start gap-2.5">
                <Store className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] text-[#282C3F]">Collect in 90 Mins</strong>
                  <span className="text-[10px] text-[#71717A]">Self-pickup with dedicated fitting room</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#EAE8E0] rounded-xl flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] text-[#282C3F]">Hyperlocal 2-Hr Express</strong>
                  <span className="text-[10px] text-[#71717A]">Rider delivery straight from store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
