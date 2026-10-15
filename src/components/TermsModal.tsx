import React, { useState } from 'react';
import { X, ShieldCheck, Ruler, Store, CreditCard, RotateCcw, Truck, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'terms' | 'custom_fit' | 'store_pickup' | 'snapmint';
}

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'terms',
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'custom_fit' | 'store_pickup' | 'snapmint'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF9F5] border border-[#EAE8E0] text-[#1A1A1A] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#FF3F6C]" />
            </div>
            <div>
              <h2 id="terms-modal-title" className="font-extrabold text-base uppercase tracking-wider text-[#1A1A1A]">
                XURE Policies, Terms & Client Guarantees
              </h2>
              <span className="text-[11px] text-[#71717A] block">
                Legal transparency for custom tailoring, local store pickups & installments
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#1A1A1A] rounded-full hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            aria-label="Close Terms"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE8E0] bg-[#FAF9F5] text-xs font-bold uppercase tracking-wider overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-3 text-center transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            Platform Terms
          </button>
          <button
            onClick={() => setActiveTab('custom_fit')}
            className={`px-5 py-3 text-center transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'custom_fit'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Perfect Fit Guarantee</span>
          </button>
          <button
            onClick={() => setActiveTab('store_pickup')}
            className={`px-5 py-3 text-center transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'store_pickup'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-emerald-600" />
            <span>Local Store Pickup</span>
          </button>
          <button
            onClick={() => setActiveTab('snapmint')}
            className={`px-5 py-3 text-center transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'snapmint'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#1A1A1A]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#00B785]" />
            <span>Snapmint 0% EMI</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#282C3F] leading-relaxed bg-[#FAF9F5]">
          {activeTab === 'terms' && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#EAE8E0]">
              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A] mb-1">1. Acceptance of Terms & Conditions</h3>
                <p className="text-[#535766]">
                  By accessing or purchasing from XURE Atelier Inc., whether through our web flagship or mobile application, you agree to be bound by these Terms of Service. XURE operates as a premium fashion house and marketplace connecting discerning gentlemen with master tailors and vetted neighborhood boutiques.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A] mb-1">2. Pricing, Taxes & Currencies</h3>
                <p className="text-[#535766]">
                  All catalog prices are displayed inclusive of GST (Goods and Services Tax) in Indian Rupees (INR) and dynamic currency conversion for international clientele. Prices include standard bespoke styling consultations.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#1A1A1A] mb-1">3. Privacy & Data Security</h3>
                <p className="text-[#535766]">
                  Your bodily dimensions, fitting preferences, and contact details are encrypted and treated with strict confidentiality. Measurements are solely shared with the designated master tailor crafting your garment. We never sell personal data.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'custom_fit' && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#EAE8E0]">
              <div className="p-4 bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded-xl flex items-center gap-3">
                <Ruler className="w-6 h-6 text-[#FF3F6C] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#282C3F]">XURE 14-Day Free Remake Guarantee</h4>
                  <p className="text-xs text-[#71717A] mt-0.5">
                    If your custom made-to-measure shirt, trouser, or blazer does not fit flawlessly, we will alter or remake it at zero cost to you.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  How the Perfect Fit Guarantee Works:
                </h4>
                <ul className="space-y-2 list-disc pl-5 text-[#535766]">
                  <li>
                    <strong>Doorstep Alterations:</strong> Request a complimentary tailor pickup within 14 days of delivery.
                  </li>
                  <li>
                    <strong>Local Boutique Walk-in:</strong> Walk into any partner boutique (e.g. Indiranagar, Kala Ghoda) with your XURE order ID for instant spot adjustments.
                  </li>
                  <li>
                    <strong>Measurement Profile Update:</strong> Once your garment fits perfectly, your profile dimensions are auto-updated for seamless 1-click reorders in the future.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'store_pickup' && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#EAE8E0]">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <Store className="w-6 h-6 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">Neighborhood Boutique 90-Min Pickup Rules</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Order online and collect in-store today. Try the garment in dedicated luxury fitting suites.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  Pickup Guidelines:
                </h4>
                <ul className="space-y-2 list-disc pl-5 text-[#535766]">
                  <li>
                    <strong>Hold Duration:</strong> Stores hold reserved orders for up to <strong>48 hours</strong> from order confirmation.
                  </li>
                  <li>
                    <strong>Try & Buy:</strong> You can try on the garment upon arrival. If the size or fit isn't right, the store tailor will adjust it or exchange it on the spot.
                  </li>
                  <li>
                    <strong>Verification:</strong> Present the digital Pickup QR code or 6-digit confirmation PIN from your XURE app profile.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'snapmint' && (
            <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#EAE8E0]">
              <div className="p-4 bg-[#E8FAF4] border border-[#00B785]/30 rounded-xl flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#00B785] shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-[#0A8754]">Snapmint 0% Interest EMI Terms</h4>
                  <p className="text-xs text-[#0A8754]/90 mt-0.5">
                    Financing facilitated through RBI-regulated non-banking financial companies (NBFCs).
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  Key Installment Terms:
                </h4>
                <ul className="space-y-2 list-disc pl-5 text-[#535766]">
                  <li>
                    <strong>Eligibility:</strong> Open to Indian residents aged 18+ with a valid bank account or UPI Autopay.
                  </li>
                  <li>
                    <strong>0% Interest on 3-Month Plan:</strong> No hidden processing fees or interest when paid on time.
                  </li>
                  <li>
                    <strong>Repayment Schedule:</strong> First installment is paid at checkout; subsequent installments are debited automatically each month.
                  </li>
                  <li>
                    <strong>Pre-Closure:</strong> Zero penalty on paying off your balance early.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#EAE8E0] flex items-center justify-between">
          <span className="text-[11px] text-[#71717A]">
            Last updated: October 2026 · XURE Atelier Inc.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
