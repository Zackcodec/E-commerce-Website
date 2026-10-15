import React, { useState } from 'react';
import { X, MapPin, Store, Check, ArrowRight, Star, Clock, ShieldCheck, Sparkles, Plus } from 'lucide-react';
import { StoreProfile } from '../types';

interface LocalStoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: StoreProfile[];
  onSelectStoreFilter: (storeName: string) => void;
  onOpenStoreDetail: (store: StoreProfile) => void;
  onOpenAddProduct: (storeId?: string) => void;
}

export const LocalStoresModal: React.FC<LocalStoresModalProps> = ({
  isOpen,
  onClose,
  stores,
  onSelectStoreFilter,
  onOpenStoreDetail,
  onOpenAddProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'partner_onboarding'>('browse');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [partnerRegistered, setPartnerRegistered] = useState(false);

  // Partner Onboarding form state
  const [storeNameInput, setStoreNameInput] = useState('');
  const [ownerNameInput, setOwnerNameInput] = useState('');
  const [cityInput, setCityInput] = useState('Bangalore');
  const [phoneInput, setPhoneInput] = useState('');
  const [neighborhoodInput, setNeighborhoodInput] = useState('Indiranagar');
  const [specialtyInput, setSpecialtyInput] = useState('Bespoke Tailoring & Suiting');

  if (!isOpen) return null;

  const filteredStores = stores.filter(
    (s) => selectedCity === 'all' || s.city.toLowerCase() === selectedCity.toLowerCase()
  );

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerRegistered(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="local-stores-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 id="local-stores-title" className="font-extrabold text-base uppercase tracking-wider text-[#282C3F]">
                Neighborhood Boutiques & Local Stores
              </h2>
              <span className="text-[11px] text-[#71717A] block">
                Shop curated pieces with 90-min express pickup, dedicated store pages & custom listings
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#282C3F] rounded-full hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE8E0] bg-[#FAF9F5] text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'browse'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#282C3F]'
            }`}
          >
            Browse Verified Local Stores ({stores.length})
          </button>
          <button
            onClick={() => setActiveTab('partner_onboarding')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'partner_onboarding'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#8C6D46] hover:text-[#282C3F]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span>Sell on XURE (Partner Onboarding)</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF9F5]">
          {activeTab === 'browse' ? (
            <div className="space-y-5">
              {/* City Filter Pills */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 flex-wrap">
                <div className="flex items-center gap-2">
                  {['all', 'Bangalore', 'Mumbai', 'Delhi'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCity(c)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                        selectedCity === c
                          ? 'bg-[#282C3F] text-white shadow-xs'
                          : 'bg-white border border-[#EAE8E0] text-[#71717A] hover:text-[#282C3F]'
                      }`}
                    >
                      {c === 'all' ? 'All Cities' : c}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onOpenAddProduct()}
                  className="px-3.5 py-1.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase rounded-full flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>List New Product</span>
                </button>
              </div>

              {/* Stores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStores.map((st) => (
                  <div
                    key={st.id}
                    className="bg-white border border-[#EAE8E0] rounded-2xl p-5 shadow-xs hover:border-[#FF3F6C] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">
                            {st.badge}
                          </span>
                          <h3 className="font-bold text-sm text-[#282C3F] mt-1">{st.storeName}</h3>
                          <span className="text-[11px] text-[#71717A]">{st.tagline}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{st.storeRating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#535766] leading-relaxed font-light line-clamp-2">
                        {st.description}
                      </p>

                      <div className="pt-2 border-t border-[#F5F5F6] space-y-1.5 text-xs text-[#71717A]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#FF3F6C] shrink-0" />
                          <span className="truncate">{st.address} ({st.distanceKm} km away)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-emerald-700 font-medium">90-Minute Store Trial & Pickup Available</span>
                        </div>
                      </div>

                      {/* Specialty tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {st.specialtyTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-[#FAF9F5] border border-[#EAE8E0] text-[#535766] px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F5F5F6]">
                      <button
                        onClick={() => {
                          onOpenStoreDetail(st);
                          onClose();
                        }}
                        className="py-2.5 px-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Open Store Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onSelectStoreFilter(st.storeName);
                          onClose();
                        }}
                        className="py-2.5 px-3 bg-[#FAF9F5] hover:bg-[#EAE8E0] text-[#282C3F] border border-[#D4D5D9] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                      >
                        View Items ({st.listedProductIds.length})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Sell on XURE Partner Onboarding */
            <div className="max-w-lg mx-auto bg-white border border-[#EAE8E0] p-6 rounded-3xl shadow-xs space-y-5">
              {partnerRegistered ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-base text-[#282C3F]">Partner Application Received!</h3>
                  <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                    Our city merchant team will visit <strong>{storeNameInput || 'your boutique'}</strong> within 24 hours for catalog digitization and sample fabric photography.
                  </p>
                  <button
                    onClick={() => {
                      setPartnerRegistered(false);
                      setActiveTab('browse');
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-xl cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                      Partner with XURE Platform
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                      Join 200+ local master tailors and fashion boutiques selling to high-intent menswear shoppers in your city.
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                      Store / Boutique Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={storeNameInput}
                      onChange={(e) => setStoreNameInput(e.target.value)}
                      placeholder="e.g. Royal Draper Atelier"
                      className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none focus:border-[#FF3F6C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                        Master Draper / Owner Name
                      </label>
                      <input
                        type="text"
                        value={ownerNameInput}
                        onChange={(e) => setOwnerNameInput(e.target.value)}
                        placeholder="e.g. Master Rafiq"
                        className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                        City
                      </label>
                      <select
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                      >
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                      Neighborhood / Street
                    </label>
                    <input
                      type="text"
                      value={neighborhoodInput}
                      onChange={(e) => setNeighborhoodInput(e.target.value)}
                      placeholder="e.g. 100ft Road, Indiranagar"
                      className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                      Craft Specialty
                    </label>
                    <input
                      type="text"
                      value={specialtyInput}
                      onChange={(e) => setSpecialtyInput(e.target.value)}
                      placeholder="e.g. Linen tailoring, Raw denim, Canvassed suits"
                      className="w-full px-3.5 py-2.5 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Submit Partner Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
