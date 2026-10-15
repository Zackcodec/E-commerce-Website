import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Award, MapPin, Check } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { CURRENCIES, AVAILABLE_COUPONS } from '../data/xureProducts';
import { GarmentVisual } from './GarmentVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  couponDiscountINR: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  insiderPoints: number;
  useInsiderPoints: boolean;
  onToggleInsiderPoints: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  couponDiscountINR,
  onApplyCoupon,
  onRemoveCoupon,
  insiderPoints,
  useInsiderPoints,
  onToggleInsiderPoints,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currencyInfo = CURRENCIES[currency];

  // Price calculations in INR
  const totalMrpINR = items.reduce(
    (sum, item) => sum + item.product.originalMrpINR * item.quantity,
    0
  );
  const totalSellingPriceINR = items.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );
  const mrpDiscountINR = totalMrpINR - totalSellingPriceINR;

  const insiderDiscountINR = useInsiderPoints ? Math.min(insiderPoints, totalSellingPriceINR - couponDiscountINR) : 0;
  const platformFeeINR = items.length > 0 ? 20 : 0;
  const shippingFeeINR = 0; // Free shipping on Myntra

  const finalTotalINR = Math.max(
    0,
    totalSellingPriceINR - couponDiscountINR - insiderDiscountINR + platformFeeINR + shippingFeeINR
  );

  const convertedTotalMrp = Math.round(totalMrpINR * currencyInfo.rate);
  const convertedMrpDiscount = Math.round(mrpDiscountINR * currencyInfo.rate);
  const convertedCouponDiscount = Math.round(couponDiscountINR * currencyInfo.rate);
  const convertedInsiderDiscount = Math.round(insiderDiscountINR * currencyInfo.rate);
  const convertedPlatformFee = Math.round(platformFeeINR * currencyInfo.rate);
  const convertedFinalTotal = Math.round(finalTotalINR * currencyInfo.rate);

  const handleApply = (code: string) => {
    setCouponError(null);
    const ok = onApplyCoupon(code);
    if (!ok) {
      setCouponError('Invalid code or minimum spend requirement not met.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="myntra-bag-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
    >
      <div className="w-full max-w-md bg-white border-l border-[#EAE8E0] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h2 id="myntra-bag-title" className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#71717A] font-mono">
              ({items.reduce((acc, it) => acc + it.quantity, 0)} Items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#282C3F] transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Destination Strip */}
        <div className="bg-[#FAF9F5] px-4 py-2.5 border-b border-[#EAE8E0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#FF3F6C] shrink-0" />
            <span className="text-[#282C3F] truncate">
              Deliver to: <strong>Julian Vance, 560001</strong> (Bangalore)
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#FF3F6C] uppercase shrink-0">
            Default
          </span>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F6]/40">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#71717A]">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center mb-3">
                <Tag className="w-7 h-7" />
              </div>
              <p className="font-bold text-base text-[#282C3F]">Hey, it feels so light!</p>
              <p className="text-xs text-[#71717A] mt-1 max-w-xs">
                There is nothing in your bag. Let's add some items.
              </p>
              <button
                onClick={onClose}
                className="mt-5 py-2.5 px-6 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-md tracking-wider hover:bg-[#E0355E] transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const currentPrice = Math.round(item.product.priceINR * currencyInfo.rate);
              const originalMrp = Math.round(item.product.originalMrpINR * currencyInfo.rate);
              const colorObj =
                item.product.colors.find((c) => c.name === item.selectedColor) || item.product.colors[0];

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#EAE8E0] p-3 rounded-sm flex gap-3 shadow-2xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#F4F3EE] shrink-0 border border-[#EAE8E0] overflow-hidden rounded-xs">
                    <GarmentVisual
                      type={item.product.silhouetteSvg}
                      colorHex={colorObj.hex}
                      className="w-full h-full scale-105"
                    />
                  </div>

                  {/* Item Specs */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F]">
                          {item.product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#94969F] hover:text-[#FF3F6C] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#535766] truncate mt-0.5">
                        {item.product.name}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-[#71717A] mt-1 font-mono">
                        <span className="bg-[#F5F5F6] px-1.5 py-0.5 rounded-xs">
                          Size: <strong>{item.selectedSize.split(' ')[0]}</strong>
                        </span>
                        <span>{item.selectedColor}</span>
                      </div>

                      {item.isCustomFit && item.customMeasurements && (
                        <div className="mt-1.5 p-1.5 bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded text-[10px] space-y-0.5 text-[#282C3F]">
                          <div className="font-bold text-[#FF3F6C] flex items-center gap-1">
                            <span>Bespoke Made-to-Measure</span>
                            {item.customMeasurements.monogramText && (
                              <span>· Monogram: [{item.customMeasurements.monogramText}]</span>
                            )}
                          </div>
                          <div className="text-[#535766]">
                            Collar: {item.customMeasurements.collarNeck}cm · Chest: {item.customMeasurements.chestBust}cm · Sleeve: {item.customMeasurements.sleeveLength}cm
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F6]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D4D5D9] rounded-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#282C3F] hover:bg-[#F5F5F6] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#282C3F] hover:bg-[#F5F5F6] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="font-bold text-xs text-[#282C3F] font-mono tabular-nums">
                          {currencyInfo.symbol}{(currentPrice * item.quantity).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#7E818C] line-through ml-1.5 font-mono">
                          {currencyInfo.symbol}{(originalMrp * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Price Calculations */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#EAE8E0] bg-white space-y-3.5 shadow-lg">
            {/* Coupons Section */}
            <div className="space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#FF3F6C]" />
                <span>Apply Coupons</span>
              </span>

              {appliedCoupon ? (
                <div className="p-2.5 bg-[#FFF0F4] border border-[#FF3F6C]/40 rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#FF3F6C]" />
                    <span className="font-bold text-[#FF3F6C] font-mono">{appliedCoupon}</span>
                    <span className="text-emerald-700 font-semibold text-[11px]">
                      (Saved {currencyInfo.symbol}{convertedCouponDiscount})
                    </span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon (e.g. MYNTRA200)"
                    className="flex-1 px-3 py-1.5 text-xs uppercase font-mono border border-[#D4D5D9] rounded-sm focus:outline-none focus:border-[#FF3F6C]"
                  />
                  <button
                    onClick={() => handleApply(couponInput)}
                    className="px-4 py-1.5 bg-[#282C3F] text-white text-xs font-bold uppercase rounded-sm hover:bg-black cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
            </div>

            {/* Myntra Insider SuperCoins Redemption */}
            <div className="p-2.5 bg-[#FAF9F5] border border-[#EAE8E0] rounded-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FF3F6C]" />
                <div>
                  <span className="font-bold text-[#282C3F]">Myntra Insider Points</span>
                  <p className="text-[10px] text-[#71717A]">You have {insiderPoints} SuperCoins</p>
                </div>
              </div>
              <button
                onClick={onToggleInsiderPoints}
                className={`px-3 py-1 text-[11px] font-bold uppercase rounded-sm cursor-pointer border ${
                  useInsiderPoints
                    ? 'bg-[#FF3F6C] text-white border-[#FF3F6C]'
                    : 'bg-white text-[#282C3F] border-[#D4D5D9]'
                }`}
              >
                {useInsiderPoints ? 'Redeemed' : 'Redeem 200'}
              </button>
            </div>

            {/* Price Details Breakdown */}
            <div className="border-t border-[#F5F5F6] pt-2.5 space-y-1.5 text-xs text-[#535766]">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#282C3F] block">
                Price Details ({items.length} Items)
              </span>
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span className="font-mono tabular-nums text-[#282C3F]">
                  {currencyInfo.symbol}{convertedTotalMrp.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Discount on MRP</span>
                <span className="font-mono tabular-nums">
                  -{currencyInfo.symbol}{convertedMrpDiscount.toLocaleString()}
                </span>
              </div>
              {couponDiscountINR > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">
                    -{currencyInfo.symbol}{convertedCouponDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              {insiderDiscountINR > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Insider SuperCoins</span>
                  <span className="font-mono tabular-nums">
                    -{currencyInfo.symbol}{convertedInsiderDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-mono tabular-nums text-[#282C3F]">
                  {currencyInfo.symbol}{convertedPlatformFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE8E0] font-bold text-sm text-[#282C3F]">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums text-base text-[#282C3F]">
                  {currencyInfo.symbol}{convertedFinalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order Primary Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#71717A] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Safe and Secure Payments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
