import React, { useState } from 'react';
import { X, Tag, Sparkles, Check, Copy, Gift, Percent, ArrowRight } from 'lucide-react';
import { AVAILABLE_COUPONS } from '../data/xureProducts';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [scratched, setScratched] = useState(false);

  if (!isOpen) return null;

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    onApplyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offers-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h2 id="offers-modal-title" className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                XURE Offers & Privilege Deals
              </h2>
              <span className="text-[11px] text-[#71717A] block">
                Exclusive coupons for customized fitting, local boutiques & luxury accessories
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#282C3F] transition-colors cursor-pointer"
            aria-label="Close offers"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FAF9F5]">
          {/* Interactive Mystery Scratch Card Perk */}
          <div className="p-4 bg-gradient-to-r from-[#FF3F6C] to-[#FF905A] rounded-xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/80 block">
                Mystery Tailoring Gift
              </span>
              <h3 className="font-bold text-base">Claim Today's Bespoke Styling Credit</h3>
              <p className="text-xs text-white/90">
                Unlock instant ₹300 off on your made-to-measure order
              </p>
            </div>

            {scratched ? (
              <div className="bg-white text-[#FF3F6C] px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-xs">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Voucher Code: <strong>TAILOR300</strong></span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setScratched(true);
                  handleCopyAndApply('TAILOR300');
                }}
                className="px-5 py-2.5 bg-white text-[#FF3F6C] hover:bg-[#FFF0F4] font-bold text-xs uppercase rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                Tap to Reveal Perk
              </button>
            )}
          </div>

          {/* Active Coupon Cards */}
          <div className="space-y-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
              Active Privilege Coupons ({AVAILABLE_COUPONS.length})
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_COUPONS.map((cp) => (
                <div
                  key={cp.code}
                  className="bg-white border border-[#EAE8E0] rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between hover:border-[#FF3F6C] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-xs text-[#FF3F6C] bg-[#FFF0F4] px-2.5 py-1 rounded-sm border border-[#FF3F6C]/20">
                        {cp.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-[#282C3F] font-semibold">{cp.description}</p>
                    <span className="text-[10px] text-[#71717A] block">
                      Min order: ₹{cp.minSpendINR.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyAndApply(cp.code)}
                    className="w-full py-2 bg-[#FAF9F5] hover:bg-[#FF3F6C] text-[#282C3F] hover:text-white border border-[#D4D2C9] hover:border-[#FF3F6C] text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedCode === cp.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Applied to Bag!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply Coupon</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
