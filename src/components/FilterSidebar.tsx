import React from 'react';
import { Star, X } from 'lucide-react';
import { ProductCategory } from '../types';

export interface FilterState {
  category: ProductCategory;
  selectedBrands: string[];
  priceRange: 'all' | 'under_1000' | '1000_2500' | '2500_5000' | 'above_5000';
  minDiscount: number;
  minRating: number;
  onlyCustomFit?: boolean;
  onlyLocalStores?: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onUpdateFilters: (updater: (prev: FilterState) => FilterState) => void;
  onResetFilters: () => void;
  availableBrands: string[];
  totalResults: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  availableBrands,
  totalResults,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Men’s Wardrobe' },
    { id: 'custom_tailored', label: '✂️ Custom Made-to-Measure' },
    { id: 'accessories', label: '⌚ Accessories, Belts & Watches' },
    { id: 'shirts', label: 'Casual & Formal Shirts' },
    { id: 'tshirts', label: 'T-Shirts & Drop Shoulders' },
    { id: 'jeans', label: 'Selvedge & Stretch Jeans' },
    { id: 'trousers', label: 'Irish Linen & Trousers' },
    { id: 'jackets', label: 'Bespoke Blazers & Coats' },
    { id: 'sweatshirts', label: 'Hoodies & Sweaters' },
    { id: 'footwear', label: 'Leather Derbies & Shoes' },
  ];

  const discounts = [
    { label: '10% and above', val: 10 },
    { label: '30% and above', val: 30 },
    { label: '40% and above', val: 40 },
    { label: '50% and above', val: 50 },
    { label: '60% and above', val: 60 },
  ];

  const priceRanges: { id: FilterState['priceRange']; label: string }[] = [
    { id: 'all', label: 'All Prices' },
    { id: 'under_1000', label: 'Under ₹1,000' },
    { id: '1000_2500', label: '₹1,000 to ₹2,500' },
    { id: '2500_5000', label: '₹2,500 to ₹5,000' },
    { id: 'above_5000', label: 'Above ₹5,000' },
  ];

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) +
    filters.selectedBrands.length +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0);

  const toggleBrand = (brand: string) => {
    onUpdateFilters((prev) => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists
          ? prev.selectedBrands.filter((b) => b !== brand)
          : [...prev.selectedBrands, brand],
      };
    });
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-xs text-[#282C3F]">
            Filters
          </span>
          {activeFiltersCount > 0 && (
            <span className="bg-[#FF3F6C] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-[11px] font-bold text-[#FF3F6C] hover:underline uppercase cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Special Highlights: Custom Fitting & Local Stores */}
      <div className="p-3 bg-[#FAF9F5] border border-[#EAE8E0] rounded-xl space-y-2 text-xs">
        <label className="flex items-center gap-2 text-[#282C3F] font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(filters.onlyCustomFit)}
            onChange={(e) =>
              onUpdateFilters((prev) => ({ ...prev, onlyCustomFit: e.target.checked }))
            }
            className="accent-[#FF3F6C] cursor-pointer"
          />
          <span>✂️ Custom Fitting Only</span>
        </label>

        <label className="flex items-center gap-2 text-emerald-800 font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(filters.onlyLocalStores)}
            onChange={(e) =>
              onUpdateFilters((prev) => ({ ...prev, onlyLocalStores: e.target.checked }))
            }
            className="accent-emerald-600 cursor-pointer"
          />
          <span>🏪 Local Stores Only</span>
        </label>
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5 pb-5 border-b border-[#EAE8E0]">
        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
          Categories
        </span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {categories.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-2.5 text-xs text-[#282C3F] hover:text-[#FF3F6C] cursor-pointer"
            >
              <input
                type="radio"
                name="category_filter"
                checked={filters.category === c.id}
                onChange={() => onUpdateFilters((prev) => ({ ...prev, category: c.id }))}
                className="accent-[#FF3F6C] cursor-pointer"
              />
              <span className={filters.category === c.id ? 'font-semibold text-[#FF3F6C]' : ''}>
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-2.5 pb-5 border-b border-[#EAE8E0]">
        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
          Brand ({availableBrands.length})
        </span>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-xs text-[#282C3F] hover:text-[#FF3F6C] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="accent-[#FF3F6C] cursor-pointer rounded-xs"
              />
              <span className={filters.selectedBrands.includes(brand) ? 'font-semibold text-[#1A1A1A]' : ''}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Ranges */}
      <div className="space-y-2.5 pb-5 border-b border-[#EAE8E0]">
        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
          Price Range
        </span>
        <div className="space-y-1.5">
          {priceRanges.map((pr) => (
            <label
              key={pr.id}
              className="flex items-center gap-2.5 text-xs text-[#282C3F] hover:text-[#FF3F6C] cursor-pointer"
            >
              <input
                type="radio"
                name="price_filter"
                checked={filters.priceRange === pr.id}
                onChange={() => onUpdateFilters((prev) => ({ ...prev, priceRange: pr.id }))}
                className="accent-[#FF3F6C] cursor-pointer"
              />
              <span className={filters.priceRange === pr.id ? 'font-semibold text-[#FF3F6C]' : ''}>
                {pr.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Discount Percentage */}
      <div className="space-y-2.5 pb-5 border-b border-[#EAE8E0]">
        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
          Discount
        </span>
        <div className="space-y-1.5">
          {discounts.map((d) => (
            <label
              key={d.val}
              className="flex items-center gap-2.5 text-xs text-[#282C3F] hover:text-[#FF3F6C] cursor-pointer"
            >
              <input
                type="radio"
                name="discount_filter"
                checked={filters.minDiscount === d.val}
                onChange={() =>
                  onUpdateFilters((prev) => ({
                    ...prev,
                    minDiscount: prev.minDiscount === d.val ? 0 : d.val,
                  }))
                }
                className="accent-[#FF3F6C] cursor-pointer"
              />
              <span className={filters.minDiscount === d.val ? 'font-semibold text-[#FF3F6C]' : ''}>
                {d.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2.5">
        <span className="font-bold text-xs uppercase tracking-wider text-[#282C3F] block">
          Customer Rating
        </span>
        <div className="flex flex-col gap-1.5">
          {[4.5, 4.0, 3.5].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-xs text-[#282C3F] hover:text-[#FF3F6C] cursor-pointer"
            >
              <input
                type="radio"
                name="rating_filter"
                checked={filters.minRating === rating}
                onChange={() =>
                  onUpdateFilters((prev) => ({
                    ...prev,
                    minRating: prev.minRating === rating ? 0 : rating,
                  }))
                }
                className="accent-[#FF3F6C] cursor-pointer"
              />
              <div className="flex items-center gap-1 font-medium">
                <span>{rating}★ & above</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (isOpenMobile) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
      >
        <div className="w-4/5 max-w-xs bg-white h-full p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0] mb-4">
            <span className="font-bold uppercase text-sm text-[#282C3F]">Filter Products</span>
            <button
              onClick={onCloseMobile}
              className="p-1 text-[#71717A] hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
          <div className="sticky bottom-0 pt-4 bg-white mt-6 border-t border-[#EAE8E0]">
            <button
              onClick={onCloseMobile}
              className="w-full py-3 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-md tracking-wider cursor-pointer"
            >
              Apply Filters ({totalResults} Items)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden lg:block w-64 bg-white border border-[#EAE8E0] p-4 shrink-0 shadow-xs rounded-sm">
      {content}
    </aside>
  );
};
