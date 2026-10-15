import React from 'react';
import { X, Trash2, ShoppingBag, Star, Heart } from 'lucide-react';
import { Product, Currency } from '../types';
import { CURRENCIES } from '../data/xureProducts';
import { GarmentVisual } from './GarmentVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: Currency;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onViewProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onAddToCart,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  const currencyInfo = CURRENCIES[currency];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
    >
      <div className="w-full max-w-md bg-white border-l border-[#EAE8E0] shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#FF3F6C] fill-[#FF3F6C]" />
            <h2 id="wishlist-drawer-title" className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
              My Wishlist
            </h2>
            <span className="text-xs text-[#71717A] font-mono">({wishlistProducts.length} Items)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#71717A] hover:text-[#282C3F] transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF9F5]">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#71717A]">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center mb-3">
                <Heart className="w-8 h-8" />
              </div>
              <p className="font-bold text-base text-[#282C3F]">Your wishlist is empty</p>
              <p className="text-xs text-[#71717A] mt-1 max-w-xs">
                Explore popular men's brands like Roadster, HRX, and Levi's to save your favorite styles.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const currentPrice = Math.round(product.priceINR * currencyInfo.rate);
              const originalMrp = Math.round(product.originalMrpINR * currencyInfo.rate);
              const defaultSize = product.sizes.find((s) => s.inStock)?.size || product.sizes[0].size;
              const defaultColor = product.colors[0]?.name || '';

              return (
                <div key={product.id} className="bg-white border border-[#EAE8E0] p-3 rounded-sm flex gap-3 shadow-2xs">
                  <div
                    onClick={() => {
                      onClose();
                      onViewProduct(product);
                    }}
                    className="w-20 h-24 bg-[#F4F3EE] shrink-0 border border-[#EAE8E0] overflow-hidden cursor-pointer rounded-xs"
                  >
                    <GarmentVisual
                      type={product.silhouetteSvg}
                      colorHex={product.colors[0].hex}
                      className="w-full h-full scale-105"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F]">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-[#94969F] hover:text-[#FF3F6C] transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p
                        onClick={() => {
                          onClose();
                          onViewProduct(product);
                        }}
                        className="text-xs text-[#535766] truncate mt-0.5 cursor-pointer hover:text-[#282C3F]"
                      >
                        {product.name}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="font-bold text-xs text-[#282C3F] font-mono">
                          {currencyInfo.symbol}{currentPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-[#7E818C] line-through font-mono">
                          {currencyInfo.symbol}{originalMrp.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-[#FF905A]">
                          ({product.discountPercentage}% OFF)
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product, defaultSize, defaultColor);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="w-full py-2 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-[11px] font-bold uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag ({defaultSize.split(' ')[0]})</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
