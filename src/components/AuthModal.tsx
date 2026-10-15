import React, { useState } from 'react';
import { X, User, Sparkles, Check, ArrowRight, ShieldCheck, Phone, Mail, Ruler } from 'lucide-react';
import { UserProfile, CustomMeasurements } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'personalize'>('login');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  // Login / Signup inputs
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [email, setEmail] = useState(currentUser.email || 'julian.vance@cloutix.com');
  const [fullName, setFullName] = useState(currentUser.fullName || 'Julian Vance');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Personalization settings
  const [stylePersona, setStylePersona] = useState<UserProfile['stylePersona']>(
    currentUser.stylePersona || 'quiet_luxury'
  );
  const [preferredFit, setPreferredFit] = useState<UserProfile['preferredFit']>(
    currentUser.preferredFit || 'slim'
  );
  const [heightCm, setHeightCm] = useState(currentUser.heightCm || '180');
  const [weightKg, setWeightKg] = useState(currentUser.weightKg || '74');

  // Custom Measurements
  const [measurements, setMeasurements] = useState<CustomMeasurements>(
    currentUser.savedMeasurements || {
      collarNeck: '40',
      chestBust: '102',
      shoulderWidth: '46',
      sleeveLength: '66',
      waistCircumference: '84',
      trouserInseam: '81',
      fitPreference: 'tailored_european',
      monogramText: 'JV',
      monogramThreadColor: 'gold',
    }
  );

  if (!isOpen) return null;

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('4829'); // Simulated instant OTP
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      isLoggedIn: true,
      fullName: fullName.trim() || 'Julian Vance',
      email: email.trim(),
      phone: phone.trim(),
      stylePersona,
      preferredFit,
      heightCm,
      weightKg,
      savedMeasurements: measurements,
      savedStores: currentUser.savedStores || ['Bespoke Tailors Indiranagar'],
      searchHistory: currentUser.searchHistory || ['Linen', 'Custom Shirt'],
      recentlyViewedIds: currentUser.recentlyViewedIds || [],
      snapmintCreditLimitINR: currentUser.snapmintCreditLimitINR || 25000,
      snapmintApproved: currentUser.snapmintApproved ?? true,
    };
    onUpdateUser(updated);
    setMode('personalize');
  };

  const handleSavePersonalization = () => {
    const updated: UserProfile = {
      ...currentUser,
      isLoggedIn: true,
      fullName,
      email,
      phone,
      stylePersona,
      preferredFit,
      heightCm,
      weightKg,
      savedMeasurements: measurements,
    };
    onUpdateUser(updated);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1A1A1A] to-[#FF3F6C] flex items-center justify-center text-white font-black text-sm italic">
              X
            </div>
            <div>
              <h2 id="auth-modal-title" className="font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">
                {mode === 'personalize' ? 'Fit & Style Persona' : 'Welcome to XURE'}
              </h2>
              <span className="text-[10px] text-[#71717A] block">
                {mode === 'personalize' ? 'Curating custom tailored clothes for you' : 'Sign in to sync your custom measurements'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs if not logged in */}
        {mode !== 'personalize' && (
          <div className="flex border-b border-[#EAE8E0] bg-[#FAF9F5] text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'login' ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]' : 'text-[#71717A] hover:text-[#1A1A1A]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
                mode === 'signup' ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]' : 'text-[#71717A] hover:text-[#1A1A1A]'
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => setMode('personalize')}
              className="py-3 px-4 text-center text-[#8C6D46] hover:text-[#1A1A1A] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF3F6C]" />
              <span>Fit Profile</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {mode === 'personalize' ? (
            /* Style & Custom Fit Personalization Wizard */
            <div className="space-y-6">
              <div className="p-3.5 bg-[#FFF0F4] border border-[#FF3F6C]/20 rounded-xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#FF3F6C] shrink-0" />
                <p className="text-xs text-[#282C3F] leading-relaxed">
                  Your personalized profile informs our <strong>Custom Made-to-Measure atelier</strong> and highlights stores nearby in your neighborhood.
                </p>
              </div>

              {/* 1. Style Persona Selection */}
              <div className="space-y-2.5">
                <label className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
                  1. Your Fashion Persona
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'quiet_luxury', label: 'Quiet Luxury', sub: 'Minimal, cashmere & neutral tones' },
                    { id: 'streetwear_modern', label: 'Streetwear Modern', sub: 'Boxy tees, raw selvedge & sneakers' },
                    { id: 'sharp_formal', label: 'Executive Formal', sub: 'Tailored suits, silk ties & derbies' },
                    { id: 'smart_casual', label: 'Smart Casual', sub: 'Linen trousers, knitwear & loafers' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setStylePersona(p.id as any)}
                      className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                        stylePersona === p.id
                          ? 'border-[#FF3F6C] bg-[#FFF0F4] ring-2 ring-[#FF3F6C]/20'
                          : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                      }`}
                    >
                      <span className="font-bold text-xs text-[#282C3F] block">{p.label}</span>
                      <span className="text-[10px] text-[#71717A] block mt-0.5">{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Body Metrics */}
              <div className="space-y-2.5">
                <label className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
                  2. Height & Weight
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] text-[#71717A] block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#71717A] block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Saved Custom Tailoring Measurements */}
              <div className="space-y-2.5 bg-[#FAF9F5] p-4 border border-[#EAE8E0] rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    <span>Saved Bespoke Dimensions (cm)</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">Auto-Applied</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-[#71717A] block">Collar (cm)</label>
                    <input
                      type="number"
                      value={measurements.collarNeck || ''}
                      onChange={(e) => setMeasurements({ ...measurements, collarNeck: e.target.value })}
                      className="w-full p-1.5 border border-[#D4D2C9] bg-white rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#71717A] block">Chest (cm)</label>
                    <input
                      type="number"
                      value={measurements.chestBust || ''}
                      onChange={(e) => setMeasurements({ ...measurements, chestBust: e.target.value })}
                      className="w-full p-1.5 border border-[#D4D2C9] bg-white rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#71717A] block">Waist (cm)</label>
                    <input
                      type="number"
                      value={measurements.waistCircumference || ''}
                      onChange={(e) => setMeasurements({ ...measurements, waistCircumference: e.target.value })}
                      className="w-full p-1.5 border border-[#D4D2C9] bg-white rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EAE8E0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#71717A]">Monogram Initials:</span>
                  <input
                    type="text"
                    maxLength={3}
                    value={measurements.monogramText || ''}
                    onChange={(e) => setMeasurements({ ...measurements, monogramText: e.target.value.toUpperCase() })}
                    placeholder="e.g. JV"
                    className="w-16 p-1 text-center font-bold uppercase border border-[#D4D2C9] bg-white rounded"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSavePersonalization}
                className="w-full py-3.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile & Personalize XURE</span>
              </button>
            </div>
          ) : (
            /* Login & Sign Up Form */
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Method Switcher */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === 'phone'
                      ? 'border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C]'
                      : 'border-[#D4D5D9] bg-white text-[#71717A]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginMethod === 'email'
                      ? 'border-[#FF3F6C] bg-[#FFF0F4] text-[#FF3F6C]'
                      : 'border-[#D4D5D9] bg-white text-[#71717A]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Julian Vance"
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
              )}

              {loginMethod === 'phone' ? (
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="flex-1 px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF3F6C]"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3 py-2 bg-[#282C3F] hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                  {otpSent && (
                    <div className="mt-2.5">
                      <label className="text-[10px] text-emerald-700 font-bold block mb-1">
                        ✓ OTP auto-detected: 4829
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 4-digit OTP"
                        className="w-full px-3 py-2 border border-emerald-400 rounded-lg text-xs font-mono tracking-widest text-center"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="julian@cloutix.com"
                    className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs focus:outline-none focus:border-[#FF3F6C]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>{mode === 'signup' ? 'Create Account & Set Fit' : 'Sign In to XURE'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#71717A] pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your custom body measurements are stored with end-to-end privacy.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
