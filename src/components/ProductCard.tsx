import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Ruler, Store, Sparkles, MapPin } from 'lucide-react';
import { Product, Currency } from '../types';
import { CURRENCIES } from '../data/xureProducts';
import { GarmentVisual } from './GarmentVisual';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
  const currencyInfo = CURRENCIES[currency];

  const currentPrice = Math.round(product.priceINR * currencyInfo.rate);
  const originalMrp = Math.round(product.originalMrpINR * currencyInfo.rate);

  // Default size
  const defaultSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size;

  return (
    <article className="group relative flex flex-col bg-white border border-[#EAE8E0] hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
      {/* Product Image Canvas */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F3EE] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <GarmentVisual
          type={product.silhouetteSvg}
          colorHex={selectedColor.hex}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />

        {/* Feature Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.customTailoring?.available && (
            <span className="bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Ruler className="w-2.5 h-2.5 text-[#FF3F6C]" />
              <span>Custom Tailored</span>
            </span>
          )}

          {product.localStore && (
            <span className="bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Store className="w-2.5 h-2.5" />
              <span>{product.localStore.neighborhood.split(',')[0]}</span>
            </span>
          )}

          {product.creatorLook && (
            <span className="bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{product.creatorLook.creatorHandle}</span>
            </span>
          )}
        </div>

        {/* Rating Pill on Bottom Left */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-bold text-[#282C3F] shadow-xs">
          <span>{product.rating}</span>
          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
          <span className="text-[#94969F] font-normal text-[10px]">|</span>
          <span className="text-[#94969F] font-normal text-[10px]">
            {product.ratingCount >= 1000
              ? `${(product.ratingCount / 1000).toFixed(1)}k`
              : product.ratingCount}
          </span>
        </div>

        {/* Wishlist Heart on Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs shadow-xs transition-transform active:scale-125 cursor-pointer z-10 ${
            isWishlisted ? 'text-[#FF3F6C]' : 'text-[#71717A] hover:text-[#FF3F6C]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF3F6C]' : ''}`} />
        </button>

        {/* Hover View Details Button */}
        <div className="absolute inset-x-3 bottom-10 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-xs text-[#282C3F] text-xs font-bold uppercase tracking-wider shadow-md hover:bg-white flex items-center justify-center gap-1.5 cursor-pointer border border-[#D4D5D9] rounded-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span>{product.customTailoring?.available ? 'Customize & View' : 'View Details'}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#282C3F] truncate">
              {product.brand}
            </h3>
            {product.localStore && (
              <span className="text-[10px] text-emerald-700 font-mono flex items-center gap-0.5 shrink-0">
                <MapPin className="w-2.5 h-2.5" />
                {product.localStore.distanceKm} km
              </span>
            )}
          </div>

          <p
            onClick={() => onQuickView(product)}
            className="text-xs text-[#535766] truncate mt-0.5 hover:text-[#282C3F] cursor-pointer"
          >
            {product.name}
          </p>
        </div>

        {/* Pricing Row */}
        <div className="mt-2.5 pt-2 border-t border-[#F5F5F6] flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-xs sm:text-sm text-[#282C3F] font-mono tabular-nums">
              {currencyInfo.symbol}{currentPrice.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#7E818C] line-through font-mono tabular-nums">
              {currencyInfo.symbol}{originalMrp.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-[#FF905A] tracking-tight">
              ({product.discountPercentage}% OFF)
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product, defaultSize, selectedColor.name)}
            className="p-1.5 bg-[#FFF0F4] hover:bg-[#FF3F6C] text-[#FF3F6C] hover:text-white rounded-lg transition-colors cursor-pointer"
            title={`Quick add ${defaultSize}`}
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sizes / Custom Tag */}
        <div className="mt-2 text-[10px] text-[#71717A] flex items-center justify-between font-mono">
          <span>
            {product.customTailoring?.available ? (
              <strong className="text-[#FF3F6C]">Custom Fit + Ready Sizes</strong>
            ) : (
              <span>Sizes: {product.sizes.slice(0, 3).map((s) => s.size.split(' ')[0]).join(', ')}</span>
            )}
          </span>
          {product.localStore?.pickupAvailable && (
            <span className="text-emerald-700 font-semibold">90-min pickup</span>
          )}
        </div>
      </div>
    </article>
  );
};
