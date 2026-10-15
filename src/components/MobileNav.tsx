import React from 'react';
import { Compass, ShoppingBag, Heart, Ruler, Tag } from 'lucide-react';
import { ProductCategory } from '../types';

interface MobileNavProps {
  currentCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOffers: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOffers,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-[#EAE8E0] px-4 py-2 flex items-center justify-around h-14">
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          currentCategory === 'all' ? 'text-[#FF3F6C] font-bold' : 'text-[#71717A]'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Shop</span>
      </button>

      <button
        onClick={() => onSelectCategory('custom_tailored')}
        className={`flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
          currentCategory === 'custom_tailored' ? 'text-[#FF3F6C] font-bold' : 'text-[#71717A]'
        }`}
      >
        <Ruler className="w-4 h-4" />
        <span>Custom</span>
      </button>

      <button
        onClick={onOpenWishlist}
        className="relative flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase tracking-wider text-[#71717A] hover:text-[#FF3F6C] transition-colors cursor-pointer"
      >
        <Heart className="w-4 h-4" />
        <span>Saved</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-2 w-3.5 h-3.5 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenOffers}
        className="flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase tracking-wider text-[#FF3F6C] font-bold transition-colors cursor-pointer"
      >
        <Tag className="w-4 h-4" />
        <span>Offers</span>
      </button>

      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center gap-0.5 text-[10px] uppercase tracking-wider text-[#282C3F] font-bold transition-colors cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Bag</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-1 w-4 h-4 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full flex items-center justify-center tabular-nums">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};
