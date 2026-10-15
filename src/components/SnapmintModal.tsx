import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Smartphone, ArrowRight, Sparkles, CreditCard, Clock } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES } from '../data/xureProducts';

interface SnapmintModalProps {
  isOpen: boolean;
  onClose: () => void;
  productPriceINR?: number;
  currency?: Currency;
  userPhone?: string;
}

export const SnapmintModal: React.FC<SnapmintModalProps> = ({
  isOpen,
  onClose,
  productPriceINR = 1899,
  currency = 'INR',
  userPhone = '+91 98765 43210',
}) => {
  const [phoneInput, setPhoneInput] = useState(userPhone);
  const [panInput, setPanInput] = useState('ABCDE1234F');
  const [selectedPlan, setSelectedPlan] = useState<3 | 6>(3);
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const price = Math.round(productPriceINR * curr.rate);
  const emi3 = Math.round(price / 3);
  const emi6 = Math.round(price / 6);

  const handleCheckLimit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setEligibilityChecked(true);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="snapmint-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Top Header with Snapmint Distinct Branding */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00D09C] via-[#00B785] to-[#0A8754] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#00B785] font-black text-xl flex items-center justify-center shadow-md">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="snapmint-title" className="font-extrabold text-lg tracking-tight">
                  Snapmint Pay Later
                </h2>
                <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  0% Interest EMI
                </span>
              </div>
              <span className="text-xs text-white/90 block mt-0.5">
                Buy now, pay in flexible installments · No credit card required
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close Snapmint"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#FAF9F5]">
          {/* Item Price & Installment Simulation */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE8E0] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] block">
                  Order Amount
                </span>
                <span className="text-2xl font-black text-[#282C3F] font-mono">
                  {curr.symbol}{price.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Instant Approval
                </span>
                <span className="text-[10px] text-[#71717A] block mt-1">Zero Hidden Fees</span>
              </div>
            </div>

            {/* Installment Plan Selection */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedPlan(3)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 3
                    ? 'border-[#00B785] bg-[#E8FAF4] ring-2 ring-[#00B785]/30'
                    : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#282C3F]">3 Monthly EMIs</span>
                    <span className="text-[10px] font-bold text-[#00B785] uppercase">0% Interest</span>
                  </div>
                  <div className="text-base font-black text-[#282C3F] font-mono mt-1">
                    {curr.symbol}{emi3.toLocaleString()} <span className="text-xs font-normal text-[#71717A]">/ mo</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#71717A] mt-2 block">
                  Pay 1st EMI today, remaining over 2 months
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlan(6)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPlan === 6
                    ? 'border-[#00B785] bg-[#E8FAF4] ring-2 ring-[#00B785]/30'
                    : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#282C3F]">6 Monthly EMIs</span>
                    <span className="text-[10px] font-bold text-[#00B785] uppercase">Low Interest</span>
                  </div>
                  <div className="text-base font-black text-[#282C3F] font-mono mt-1">
                    {curr.symbol}{emi6.toLocaleString()} <span className="text-xs font-normal text-[#71717A]">/ mo</span>
                  </div>
                </div>
                <span className="text-[10px] text-[#71717A] mt-2 block">
                  Ultra-low payments across 6 months
                </span>
              </button>
            </div>
          </div>

          {/* Instant Eligibility Checker */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE8E0] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00B785]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#282C3F]">
                Check Your Pre-Approved Snapmint Limit
              </h3>
            </div>

            {eligibilityChecked ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <strong className="text-sm">Congratulations! Pre-Approved for ₹35,000</strong>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your Snapmint credit line is ready. You can purchase this order for <strong>{curr.symbol}{selectedPlan === 3 ? emi3 : emi6} today</strong> and the rest in automatic installments.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#71717A]">
                  <span>Voucher Code: <strong>SNAPMINT0</strong></span>
                  <span className="text-emerald-700 font-bold">Extra ₹350 Cashback</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckLimit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-[#535766] block mb-1">
                      Mobile Number
                    </label>
                    <div className="flex items-center border border-[#D4D5D9] rounded-xl px-3 py-2 bg-white">
                      <Smartphone className="w-3.5 h-3.5 text-[#71717A] mr-2" />
                      <input
                        type="text"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full text-xs font-mono focus:outline-none"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#535766] block mb-1">
                      PAN Card Number (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={panInput}
                      onChange={(e) => setPanInput(e.target.value.toUpperCase())}
                      className="w-full border border-[#D4D5D9] rounded-xl px-3 py-2 text-xs font-mono uppercase bg-white focus:outline-none"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-[#00B785] hover:bg-[#009E73] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <span>Verifying Bureau Data...</span>
                  ) : (
                    <>
                      <span>Check Pre-Approved Credit</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* 4 Snapmint Trust Pillars */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3 bg-white border border-[#EAE8E0] rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#00B785] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] text-[#282C3F]">No Credit Card</strong>
                <span className="text-[10px] text-[#71717A]">Works with standard UPI & debit cards</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 bg-white border border-[#EAE8E0] rounded-xl">
              <Clock className="w-4 h-4 text-[#00B785] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] text-[#282C3F]">Instant 2-Min Setup</strong>
                <span className="text-[10px] text-[#71717A]">Quick Aadhaar paperless verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#EAE8E0] flex items-center justify-between">
          <span className="text-[11px] text-[#71717A]">
            Powered by RBI-Registered NBFC Partners
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#282C3F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
