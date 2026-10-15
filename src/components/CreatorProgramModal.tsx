import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, TrendingUp, Award, Share2, Users } from 'lucide-react';

interface CreatorProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCreatorLook: (creatorHandle: string) => void;
}

export const CreatorProgramModal: React.FC<CreatorProgramModalProps> = ({
  isOpen,
  onClose,
  onSelectCreatorLook,
}) => {
  const [activeTab, setActiveTab] = useState<'closets' | 'join'>('closets');
  const [applied, setApplied] = useState(false);

  // Application fields
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('@');
  const [platform, setPlatform] = useState('Instagram');
  const [followers, setFollowers] = useState('50k - 100k');

  if (!isOpen) return null;

  const creators = [
    {
      name: 'Aryan Roy',
      handle: '@aryanfits',
      followers: '420K followers',
      niche: 'Architectural Minimalist Menswear & Boxy Silhouettes',
      quote: 'I wanted to co-design a heavy 260 GSM t-shirt that drapes with structure without losing shape after 50 washes.',
      curatedItem: 'Custom Heavyweight 260 GSM Boxy Drop-Shoulder Tee',
      avatarText: 'AR',
    },
    {
      name: 'Kabir Oberoi',
      handle: '@kabir.style',
      followers: '280K followers',
      niche: 'Classic Horology, Tailored Italian Flannels & Leather Goods',
      quote: 'Clean Bauhaus proportions with sapphire crystal. The watch speaks quietly without screaming for attention.',
      curatedItem: 'Minimalist Automatic Bauhaus Chronograph Watch',
      avatarText: 'KO',
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6A11CB] to-[#2575FC] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="creator-modal-title" className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                XURE Creator Collective
              </h2>
              <span className="text-[11px] text-[#71717A] block">
                Creator-curated wardrobe drops & affiliate partner program
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#282C3F] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#EAE8E0] bg-[#FAF9F5] text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('closets')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer ${
              activeTab === 'closets'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#282C3F]'
            }`}
          >
            Featured Creator Closets
          </button>
          <button
            onClick={() => setActiveTab('join')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'join'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#8C6D46] hover:text-[#282C3F]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span>Join Creator Program (Earn up to 18%)</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF9F5]">
          {activeTab === 'closets' ? (
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-[#282C3F] to-[#1A1A1A] text-white rounded-xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FFD700] tracking-wider block">
                    Creator Privilege Discount
                  </span>
                  <span className="text-sm font-bold block mt-0.5">Use Coupon Code: CREATOR20</span>
                  <span className="text-xs text-white/80">Get flat 20% OFF on all Creator Capsule drops</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-black text-[#FF3F6C]">20% OFF</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creators.map((c) => (
                  <div
                    key={c.handle}
                    className="bg-white border border-[#EAE8E0] rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6A11CB] to-[#2575FC] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                          {c.avatarText}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#282C3F]">{c.name}</h3>
                          <span className="text-xs text-[#FF3F6C] font-mono">{c.handle}</span>
                          <span className="text-[11px] text-[#71717A] ml-2">· {c.followers}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-[#FAF9F5] border border-[#EAE8E0] rounded-lg">
                        <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-bold block mb-1">
                          Curated Silhouette
                        </span>
                        <p className="text-xs font-semibold text-[#282C3F]">{c.curatedItem}</p>
                      </div>

                      <blockquote className="text-xs text-[#535766] italic leading-relaxed">
                        "{c.quote}"
                      </blockquote>
                    </div>

                    <button
                      onClick={() => {
                        onSelectCreatorLook(c.handle);
                        onClose();
                      }}
                      className="w-full py-2.5 px-4 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <span>Shop {c.name}'s Capsule</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Creator Program Application */
            <div className="max-w-lg mx-auto bg-white border border-[#EAE8E0] p-6 rounded-2xl shadow-xs space-y-5">
              {applied ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-base text-[#282C3F]">Creator Application Submitted!</h3>
                  <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                    Our creator partnerships team will review <strong>{handle}</strong> and email your custom affiliate storefront link within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setApplied(false);
                      setActiveTab('closets');
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-lg cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
                      Earn with XURE Creator Program
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                      Monetize your fashion aesthetic with custom tailored capsule drops and up to 18% commission on sales.
                    </p>
                  </div>

                  {/* Highlights Bar */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-[#FAF9F5] border border-[#EAE8E0] rounded-xl">
                    <div className="p-1">
                      <span className="font-black text-[#FF3F6C] block text-base">18%</span>
                      <span className="text-[10px] text-[#71717A]">Commission</span>
                    </div>
                    <div className="p-1 border-x border-[#EAE8E0]">
                      <span className="font-black text-[#282C3F] block text-base">₹0</span>
                      <span className="text-[10px] text-[#71717A]">Sampling Cost</span>
                    </div>
                    <div className="p-1">
                      <span className="font-black text-emerald-600 block text-base">Weekly</span>
                      <span className="text-[10px] text-[#71717A]">Payouts</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aryan Roy"
                      className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs focus:outline-none focus:border-[#FF3F6C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                        Social Handle *
                      </label>
                      <input
                        type="text"
                        required
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="@yourhandle"
                        className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs font-mono focus:outline-none focus:border-[#FF3F6C]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase text-[#535766] block mb-1">
                        Audience Size
                      </label>
                      <select
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value)}
                        className="w-full px-3 py-2 border border-[#D4D5D9] rounded-lg text-xs bg-white focus:outline-none"
                      >
                        <option value="10k - 50k">10k – 50k</option>
                        <option value="50k - 100k">50k – 100k</option>
                        <option value="100k - 500k">100k – 500k</option>
                        <option value="500k+">500k+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Submit Creator Application
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
