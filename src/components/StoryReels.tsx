import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, ShoppingBag, Ruler, Store } from 'lucide-react';
import { Product } from '../types';

interface Story {
  id: string;
  title: string;
  tag: string;
  gradient: string;
  headline: string;
  subtitle: string;
  productId: string;
}

interface StoryReelsProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

export const StoryReels: React.FC<StoryReelsProps> = ({ products, onOpenProduct }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const stories: Story[] = [
    {
      id: 'story-1',
      title: 'Custom Fit',
      tag: 'Made-to-Measure',
      gradient: 'from-[#FF3F6C] via-[#FF527B] to-[#FF905A]',
      headline: 'Precision Made-to-Measure Shirts',
      subtitle: 'Tailored to your collar, chest and sleeve with free initials monogramming',
      productId: 'xure-custom-poplin-shirt',
    },
    {
      id: 'story-2',
      title: 'Local Stores',
      tag: 'Neighborhood Atelier',
      gradient: 'from-[#11998E] to-[#38EF7D]',
      headline: 'Indiranagar Master Drapers',
      subtitle: '100% Irish linen trousers with 90-min pickup & in-store trial',
      productId: 'xure-local-linen-trouser',
    },
    {
      id: 'story-3',
      title: 'Accessories',
      tag: 'Fine Leather & Steel',
      gradient: 'from-[#141E30] to-[#243B55]',
      headline: 'Bridle Leather & Bauhaus Timepieces',
      subtitle: '4mm vegetable-tanned leather belts and double-domed sapphire watches',
      productId: 'xure-leather-belt',
    },
    {
      id: 'story-4',
      title: 'Creator Drop',
      tag: 'Aryan Roy × XURE',
      gradient: 'from-[#6A11CB] to-[#2575FC]',
      headline: 'Heavy 260 GSM Boxy Drop Tees',
      subtitle: 'Architectural streetwear cut curated by menswear stylist Aryan Roy',
      productId: 'xure-creator-boxy-tee',
    },
    {
      id: 'story-5',
      title: 'Bespoke Suiting',
      tag: 'Vitale Barberis',
      gradient: 'from-[#8E2DE2] to-[#4A00E0]',
      headline: 'Neapolitan Soft-Shoulder Blazers',
      subtitle: 'Super 120s virgin wool contouring for effortless drape',
      productId: 'xure-custom-wool-blazer',
    },
  ];

  const currentStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;
  const featuredProduct = currentStory
    ? products.find((p) => p.id === currentStory.productId) || products[0]
    : null;

  return (
    <div className="border-b border-[#EAE8E0] bg-white py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1">
        {stories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => setActiveStoryIndex(idx)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            {/* Story Gradient Ring */}
            <div className={`p-0.5 rounded-full bg-gradient-to-tr ${story.gradient} transition-transform group-hover:scale-105 duration-200`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF9F5] p-0.5 border-2 border-white flex items-center justify-center overflow-hidden">
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-[10px] font-bold text-center px-1 leading-tight`}>
                  {story.title}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#282C3F] max-w-[75px] truncate text-center">
              {story.title}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Story Viewer Modal */}
      {currentStory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3"
        >
          <div className="relative w-full max-w-sm aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between text-white p-5 bg-gradient-to-b from-black/80 via-black/40 to-black/90">
            {/* Top Story Progress Bar */}
            <div className="absolute top-3 inset-x-4 flex gap-1 z-20">
              {stories.map((_, i) => (
                <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all duration-300 ${
                      i === activeStoryIndex
                        ? 'w-full animate-pulse'
                        : activeStoryIndex !== null && i < activeStoryIndex
                        ? 'w-full'
                        : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mt-3 z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#FF3F6C] text-white text-[10px] uppercase font-bold rounded-full">
                  {currentStory.tag}
                </span>
                <span className="text-xs font-bold text-white/90">XURE Atelier</span>
              </div>
              <button
                onClick={() => setActiveStoryIndex(null)}
                className="p-1 rounded-full bg-black/40 hover:bg-black/70 text-white cursor-pointer"
                aria-label="Close story"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Story Visual Card */}
            <div className="my-auto text-center space-y-3 z-10">
              <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2">
                <Sparkles className="w-6 h-6 text-[#FFD700]" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white leading-tight">
                {currentStory.headline}
              </h3>
              <p className="text-xs text-white/80 max-w-xs mx-auto leading-relaxed">
                {currentStory.subtitle}
              </p>
            </div>

            {/* Tap Navigation Zones */}
            <button
              onClick={() =>
                setActiveStoryIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : stories.length - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full z-20 text-white/70 hover:text-white"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActiveStoryIndex((prev) =>
                  prev !== null && prev < stories.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full z-20 text-white/70 hover:text-white"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Featured Product Attachment Bar */}
            {featuredProduct && (
              <div className="z-20 bg-white/15 backdrop-blur-xl border border-white/20 p-3 rounded-xl flex items-center justify-between gap-3">
                <div className="truncate">
                  <div className="text-[10px] uppercase font-bold text-[#FFD700] tracking-wider">
                    {featuredProduct.brand}
                  </div>
                  <div className="text-xs font-semibold text-white truncate">
                    {featuredProduct.name}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    ₹{featuredProduct.priceINR.toLocaleString()}
                    <span className="text-[10px] text-white/60 line-through ml-1.5 font-normal">
                      ₹{featuredProduct.originalMrpINR.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveStoryIndex(null);
                    onOpenProduct(featuredProduct);
                  }}
                  className="px-3.5 py-2 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer shadow-lg"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
