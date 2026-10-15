/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, Check, Store, Ruler, Sparkles, Tag, CreditCard, Plus, FileText, Search, ArrowRight } from 'lucide-react';
import { Product, CartItem, Currency, Order, ProductCategory, UserProfile, CustomMeasurements, StoreProfile } from './types';
import { XURE_PRODUCTS, AVAILABLE_COUPONS, DEFAULT_LOCAL_STORES } from './data/xureProducts';
import { XureHeader } from './components/XureHeader';
import { StoryReels } from './components/StoryReels';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LocalStoreDetailModal } from './components/LocalStoreDetailModal';
import { SnapmintModal } from './components/SnapmintModal';
import { TermsModal } from './components/TermsModal';
import { ProfileModal } from './components/ProfileModal';
import { AddProductModal } from './components/AddProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrdersModal } from './components/OrdersModal';
import { AuthModal } from './components/AuthModal';
import { LocalStoresModal } from './components/LocalStoresModal';
import { CreatorProgramModal } from './components/CreatorProgramModal';
import { OffersModal } from './components/OffersModal';
import { MobileAppFrame } from './components/MobileAppFrame';
import { MobileNav } from './components/MobileNav';
import { XureFooter } from './components/XureFooter';

export default function App() {
  // Navigation & Category
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'discount' | 'rating'>('recommended');

  // Products state (persisted so store additions appear immediately)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('xure_products');
      return saved ? JSON.parse(saved) : XURE_PRODUCTS;
    } catch {
      return XURE_PRODUCTS;
    }
  });

  // Local Stores state (persisted)
  const [stores, setStores] = useState<StoreProfile[]>(() => {
    try {
      const saved = localStorage.getItem('xure_stores');
      return saved ? JSON.parse(saved) : DEFAULT_LOCAL_STORES;
    } catch {
      return DEFAULT_LOCAL_STORES;
    }
  });

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    selectedBrands: [],
    priceRange: 'all',
    minDiscount: 0,
    minRating: 0,
    onlyCustomFit: false,
    onlyLocalStores: false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isAppViewMode, setIsAppViewMode] = useState(false);

  // Currency
  const [currency, setCurrency] = useState<Currency>('INR');

  // Loyalty & Insider Points
  const [insiderPoints, setInsiderPoints] = useState(500);
  const [useInsiderPoints, setUseInsiderPoints] = useState(false);

  // User Profile & Personalization State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('xure_user');
      return saved
        ? JSON.parse(saved)
        : {
            isLoggedIn: true,
            fullName: 'Julian Vance',
            email: 'julian.vance@cloutix.com',
            phone: '+91 98765 43210',
            avatarUrl: 'from-[#1A1A1A] to-[#3A3D40]',
            stylePersona: 'quiet_luxury',
            preferredFit: 'tailored_european',
            heightCm: '180',
            weightKg: '74',
            searchHistory: ['Irish Linen', 'Bespoke Shirts', 'Indiranagar'],
            recentlyViewedIds: ['xure-custom-poplin-shirt', 'xure-local-linen-trouser'],
            snapmintCreditLimitINR: 25000,
            snapmintApproved: true,
            savedMeasurements: {
              collarNeck: '40',
              chestBust: '104',
              shoulderWidth: '46',
              sleeveLength: '66',
              waistCircumference: '84',
              trouserInseam: '81',
              fitPreference: 'tailored_european',
              monogramText: 'JV',
              monogramThreadColor: 'gold',
            },
            savedStores: ['Bespoke Tailors Indiranagar'],
          };
    } catch {
      return {
        isLoggedIn: false,
        fullName: 'Julian Vance',
        email: 'julian.vance@cloutix.com',
        phone: '+91 98765 43210',
        searchHistory: ['Linen', 'Shirts'],
        recentlyViewedIds: [],
        snapmintCreditLimitINR: 25000,
        snapmintApproved: true,
        savedStores: [],
      };
    }
  });

  // Cart, Wishlist, Orders with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('xure_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('xure_wishlist');
      return saved ? JSON.parse(saved) : ['xure-custom-poplin-shirt', 'xure-leather-belt'];
    } catch {
      return ['xure-custom-poplin-shirt', 'xure-leather-belt'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('xure_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('XURE500');
  const [couponDiscountINR, setCouponDiscountINR] = useState<number>(500);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isCreatorsOpen, setIsCreatorsOpen] = useState(false);
  const [isLocalStoresOpen, setIsLocalStoresOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // New Modals for Local Store page, Snapmint, Terms, Profile, and Add Product
  const [selectedStore, setSelectedStore] = useState<StoreProfile | null>(null);
  const [isStoreDetailOpen, setIsStoreDetailOpen] = useState(false);
  const [isSnapmintOpen, setIsSnapmintOpen] = useState(false);
  const [snapmintPriceTarget, setSnapmintPriceTarget] = useState(1899);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [addProductTargetStoreId, setAddProductTargetStoreId] = useState<string | undefined>(undefined);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('xure_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('xure_stores', JSON.stringify(stores));
    } catch (e) {
      console.error(e);
    }
  }, [stores]);

  useEffect(() => {
    try {
      localStorage.setItem('xure_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('xure_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('xure_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('xure_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync category state with filters
  const handleSelectCategory = (cat: ProductCategory) => {
    setCurrentCategory(cat);
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  // Search query with search history logging for recommendations
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length >= 3) {
      setCurrentUser((prev) => {
        const existing = prev.searchHistory || [];
        const clean = query.trim();
        const updated = [clean, ...existing.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
        return { ...prev, searchHistory: updated };
      });
    }
  };

  // Cart operations with Custom Measurements support
  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity = 1,
    isCustomFit = false,
    customMeasurements?: CustomMeasurements
  ) => {
    const itemId = `${product.id}-${color}-${size}-${isCustomFit ? 'custom' : 'std'}`;
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === itemId);
      if (existing) {
        return prev.map((it) =>
          it.id === itemId ? { ...it, quantity: it.quantity + quantity } : it
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          isCustomFit,
          customMeasurements: isCustomFit
            ? customMeasurements || currentUser.savedMeasurements
            : undefined,
        },
      ];
    });

    if (isCustomFit) {
      showToast(`Custom Tailored order added to bag with your personal measurements`);
    } else {
      showToast(`Added ${product.brand} (${size.split(' ')[0]}) to bag`);
    }
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((it) => it.id !== itemId));
      showToast('Item removed from bag');
      return;
    }
    setCartItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));
    showToast('Item removed from bag');
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wishlist');
        return [...prev, productId];
      }
    });
  };

  // Coupon handling
  const handleApplyCoupon = (code: string): boolean => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (!found) {
      if (code.trim().toUpperCase() === 'TAILOR300') {
        setAppliedCoupon('TAILOR300');
        setCouponDiscountINR(300);
        showToast(`Voucher TAILOR300 applied! Saved ₹300`);
        return true;
      }
      return false;
    }

    setAppliedCoupon(found.code);
    setCouponDiscountINR(found.value);
    showToast(`Coupon ${found.code} applied! Saved ₹${found.value}`);
    return true;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountINR(0);
    showToast('Coupon removed');
  };

  // Order Placement
  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    if (useInsiderPoints) {
      setInsiderPoints((prev) => Math.max(0, prev - 200));
      setUseInsiderPoints(false);
    }
    if (order.deliveryMethod === 'store_pickup') {
      showToast(`Order confirmed! Ready for pickup at ${order.pickupStoreName} in 90 mins.`);
    } else {
      showToast(`Order confirmed! Dispatched with master draper.`);
    }
  };

  // Add Product from Store or Online Import
  const handleAddProduct = (newProd: Product, storeId?: string) => {
    setProducts((prev) => [newProd, ...prev]);
    if (storeId) {
      setStores((prev) =>
        prev.map((st) =>
          st.id === storeId
            ? { ...st, listedProductIds: [newProd.id, ...st.listedProductIds] }
            : st
        )
      );
    }
    showToast(`"${newProd.name}" published to catalog successfully!`);
  };

  // Extract all available brands
  const availableBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      const matchCat =
        filters.category === 'all' || p.category === filters.category;

      // Brand
      const matchBrand =
        filters.selectedBrands.length === 0 ||
        filters.selectedBrands.includes(p.brand);

      // Price range
      let matchPrice = true;
      if (filters.priceRange === 'under_1000') matchPrice = p.priceINR < 1000;
      else if (filters.priceRange === '1000_2500')
        matchPrice = p.priceINR >= 1000 && p.priceINR <= 2500;
      else if (filters.priceRange === '2500_5000')
        matchPrice = p.priceINR > 2500 && p.priceINR <= 5000;
      else if (filters.priceRange === 'above_5000') matchPrice = p.priceINR > 5000;

      // Discount
      const matchDiscount = p.discountPercentage >= filters.minDiscount;

      // Rating
      const matchRating = p.rating >= filters.minRating;

      // Custom Fit Only toggle
      const matchCustomFit = !filters.onlyCustomFit || Boolean(p.customTailoring?.available);

      // Local Stores Only toggle
      const matchLocalStore = !filters.onlyLocalStores || Boolean(p.localStore);

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.localStore && p.localStore.storeName.toLowerCase().includes(q)) ||
        (p.creatorLook && p.creatorLook.creatorName.toLowerCase().includes(q));

      return (
        matchCat &&
        matchBrand &&
        matchPrice &&
        matchDiscount &&
        matchRating &&
        matchCustomFit &&
        matchLocalStore &&
        matchSearch
      );
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price_asc':
          return a.priceINR - b.priceINR;
        case 'price_desc':
          return b.priceINR - a.priceINR;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'rating':
          return b.rating - a.rating;
        case 'recommended':
        default:
          return b.ratingCount - a.ratingCount;
      }
    });
  }, [products, filters, searchQuery, sortBy]);

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // If App View Mode is toggled on, show the real smartphone simulator
  if (isAppViewMode) {
    return (
      <div className="font-sans antialiased">
        <MobileAppFrame
          products={filteredProducts}
          currency={currency}
          wishlistIds={wishlistIds}
          cartCount={totalCartCount}
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setSelectedProduct}
          onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenOrders={() => setIsOrdersOpen(true)}
          onOpenOffers={() => setIsOffersOpen(true)}
          onOpenCreators={() => setIsCreatorsOpen(true)}
          onOpenLocalStores={() => setIsLocalStoresOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenSnapmint={() => {
            setSnapmintPriceTarget(1899);
            setIsSnapmintOpen(true);
          }}
          onOpenTerms={() => setIsTermsOpen(true)}
          onOpenAddProduct={() => {
            setAddProductTargetStoreId(undefined);
            setIsAddProductOpen(true);
          }}
          onOpenStoreDetail={(store) => {
            setSelectedStore(store);
            setIsStoreDetailOpen(true);
          }}
          onCloseAppMode={() => setIsAppViewMode(false)}
        />

        {/* Global Modals for App Mode */}
        <ProductDetailModal
          product={selectedProduct}
          currency={currency}
          isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
          onToggleWishlist={handleToggleWishlist}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenSnapmint={(pr) => {
            setSnapmintPriceTarget(pr);
            setIsSnapmintOpen(true);
          }}
          onOpenStorePage={(stId) => {
            const foundStore = stores.find((s) => s.id === stId);
            if (foundStore) {
              setSelectedStore(foundStore);
              setIsStoreDetailOpen(true);
            }
          }}
        />

        <LocalStoreDetailModal
          store={selectedStore}
          products={products}
          currency={currency}
          wishlistIds={wishlistIds}
          isOpen={isStoreDetailOpen}
          onClose={() => setIsStoreDetailOpen(false)}
          onToggleWishlist={handleToggleWishlist}
          onQuickViewProduct={setSelectedProduct}
          onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
          onOpenAddProductForStore={(stId) => {
            setAddProductTargetStoreId(stId);
            setIsAddProductOpen(true);
          }}
          onSelectStorePickup={(stName) => {
            setSearchQuery(stName);
            setFilters((prev) => ({ ...prev, onlyLocalStores: true }));
            showToast(`Filtering items available at ${stName} for 90-min pickup`);
          }}
        />

        <SnapmintModal
          isOpen={isSnapmintOpen}
          onClose={() => setIsSnapmintOpen(false)}
          productPriceINR={snapmintPriceTarget}
          currency={currency}
          userPhone={currentUser.phone}
        />

        <TermsModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currentUser={currentUser}
          onUpdateUser={setCurrentUser}
          allProducts={products}
          orders={orders}
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickViewProduct={setSelectedProduct}
          onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
          onOpenSnapmint={() => setIsSnapmintOpen(true)}
          onOpenLocalStores={() => setIsLocalStoresOpen(true)}
          onOpenTerms={() => setIsTermsOpen(true)}
          onSearchTag={(tag) => {
            setSearchQuery(tag);
          }}
        />

        <AddProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          stores={stores}
          defaultStoreId={addProductTargetStoreId}
          onAddProduct={handleAddProduct}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          currency={currency}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={() => setIsCheckoutOpen(true)}
          appliedCoupon={appliedCoupon}
          couponDiscountINR={couponDiscountINR}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={handleRemoveCoupon}
          insiderPoints={insiderPoints}
          useInsiderPoints={useInsiderPoints}
          onToggleInsiderPoints={() => setUseInsiderPoints(!useInsiderPoints)}
        />

        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistProducts={wishlistProducts}
          currency={currency}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onViewProduct={setSelectedProduct}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          currency={currency}
          couponDiscountINR={couponDiscountINR}
          insiderDiscountINR={useInsiderPoints ? Math.min(200, insiderPoints) : 0}
          onOrderPlaced={handleOrderPlaced}
        />

        <OrdersModal
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          orders={orders}
          currency={currency}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          currentUser={currentUser}
          onUpdateUser={setCurrentUser}
        />

        <LocalStoresModal
          isOpen={isLocalStoresOpen}
          onClose={() => setIsLocalStoresOpen(false)}
          stores={stores}
          onSelectStoreFilter={(storeName) => {
            setSearchQuery(storeName);
            setFilters((prev) => ({ ...prev, onlyLocalStores: true }));
          }}
          onOpenStoreDetail={(store) => {
            setSelectedStore(store);
            setIsStoreDetailOpen(true);
          }}
          onOpenAddProduct={(stId) => {
            setAddProductTargetStoreId(stId);
            setIsAddProductOpen(true);
          }}
        />

        <CreatorProgramModal
          isOpen={isCreatorsOpen}
          onClose={() => setIsCreatorsOpen(false)}
          onSelectCreatorLook={(handle) => {
            setSearchQuery(handle);
          }}
        />

        <OffersModal
          isOpen={isOffersOpen}
          onClose={() => setIsOffersOpen(false)}
          onApplyCoupon={handleApplyCoupon}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#282C3F] font-sans antialiased flex flex-col selection:bg-[#FF3F6C] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#1A1A1A] text-white text-xs font-bold py-3 px-5 shadow-2xl rounded-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200 border border-white/10">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* XURE Header */}
      <XureHeader
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currency={currency}
        onSelectCurrency={setCurrency}
        isAppViewMode={isAppViewMode}
        onToggleAppViewMode={() => setIsAppViewMode(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenOffers={() => setIsOffersOpen(true)}
        onOpenCreators={() => setIsCreatorsOpen(true)}
        onOpenLocalStores={() => setIsLocalStoresOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSnapmint={() => {
          setSnapmintPriceTarget(1899);
          setIsSnapmintOpen(true);
        }}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenAddProduct={() => {
          setAddProductTargetStoreId(undefined);
          setIsAddProductOpen(true);
        }}
        currentUser={currentUser}
      />

      {/* Story Reels */}
      <StoryReels products={products} onOpenProduct={setSelectedProduct} />

      {/* Breadcrumb, Search Insight Strip & Program Triggers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#71717A] flex-wrap">
          <span className="font-bold text-[#1A1A1A]">XURE</span>
          <span>/</span>
          <span>Men's Atelier</span>
          <span>/</span>
          <span className="font-bold text-[#282C3F] capitalize">
            {currentCategory === 'all'
              ? 'Complete Collection'
              : currentCategory.replace('_', ' ')}
          </span>
          <span className="font-mono text-[#94969F]">({filteredProducts.length} items)</span>

          {currentUser.searchHistory && currentUser.searchHistory.length > 0 && (
            <span className="hidden md:inline-flex items-center gap-1 ml-2 text-[11px] bg-white border border-[#EAE8E0] px-2.5 py-0.5 rounded-full text-[#535766]">
              <Search className="w-3 h-3 text-[#FF3F6C]" />
              <span>Personalized for: <strong>{currentUser.searchHistory[0]}</strong></span>
            </span>
          )}
        </div>

        {/* Quick Program Triggers */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <button
            onClick={() => {
              setAddProductTargetStoreId(undefined);
              setIsAddProductOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#FFF0F4] text-[#282C3F] hover:text-[#FF3F6C] border border-[#EAE8E0] rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span className="hidden sm:inline">+ List Product</span>
          </button>

          <button
            onClick={() => {
              setSnapmintPriceTarget(1899);
              setIsSnapmintOpen(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#E8FAF4] hover:bg-[#D5F5EC] text-[#0A8754] border border-[#00B785]/30 rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Snapmint (0% EMI)</span>
            <span className="sm:hidden">0% EMI</span>
          </button>

          <button
            onClick={() => setIsLocalStoresOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Local Stores (90-Min Pickup)</span>
            <span className="sm:hidden">Stores</span>
          </button>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-[#D4D5D9] bg-white rounded-xl text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF3F6C]" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 bg-white border border-[#D4D5D9] px-3 py-1.5 rounded-xl">
            <span className="text-[#71717A] text-[11px] font-bold uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products"
              className="bg-transparent border-none text-xs font-bold text-[#282C3F] cursor-pointer focus:outline-none"
            >
              <option value="recommended">Curated Atelier Order</option>
              <option value="discount">Better Discount</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full flex gap-6 lg:gap-8">
        {/* Desktop Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onUpdateFilters={setFilters}
          onResetFilters={() =>
            setFilters({
              category: 'all',
              selectedBrands: [],
              priceRange: 'all',
              minDiscount: 0,
              minRating: 0,
              onlyCustomFit: false,
              onlyLocalStores: false,
            })
          }
          availableBrands={availableBrands}
          totalResults={filteredProducts.length}
        />

        {/* Mobile Filter Sheet */}
        <FilterSidebar
          filters={filters}
          onUpdateFilters={setFilters}
          onResetFilters={() =>
            setFilters({
              category: 'all',
              selectedBrands: [],
              priceRange: 'all',
              minDiscount: 0,
              minRating: 0,
              onlyCustomFit: false,
              onlyLocalStores: false,
            })
          }
          availableBrands={availableBrands}
          totalResults={filteredProducts.length}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Product Grid Area */}
        <div className="flex-1 space-y-5">
          {/* Subtle Neighborhood Stores Quick Bar */}
          <div className="p-4 bg-white border border-[#EAE8E0] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs text-[#282C3F] block">
                  Neighborhood Boutiques in Bangalore, Mumbai & Delhi
                </strong>
                <span className="text-[11px] text-[#71717A]">
                  Reserve in-store trial rooms with 90-min express pickup and free spot alterations.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsLocalStoresOpen(true)}
                className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Explore Stores
              </button>
              <button
                onClick={() => {
                  setAddProductTargetStoreId(undefined);
                  setIsAddProductOpen(true);
                }}
                className="px-3.5 py-1.5 bg-[#FAF9F5] hover:bg-[#FFF0F4] text-[#FF3F6C] border border-[#EAE8E0] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                + List Item
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center bg-white border border-[#EAE8E0] p-8 rounded-2xl">
              <span className="text-3xl block mb-2">🔍</span>
              <h3 className="font-bold text-base text-[#282C3F]">No items match your criteria</h3>
              <p className="text-xs text-[#71717A] mt-1 max-w-xs mx-auto">
                Try searching for made-to-measure shirts, leather belts, or explore neighborhood partner stores.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    category: 'all',
                    selectedBrands: [],
                    priceRange: 'all',
                    minDiscount: 0,
                    minRating: 0,
                    onlyCustomFit: false,
                    onlyLocalStores: false,
                  });
                }}
                className="mt-4 px-6 py-2.5 bg-[#FF3F6C] text-white text-xs font-bold uppercase rounded-xl cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setSelectedProduct}
                  onAddToCart={(p, size, color) => handleAddToCart(p, size, color, 1)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* XURE Global Footer */}
      <XureFooter
        onSelectCategory={handleSelectCategory}
        onToggleAppViewMode={() => setIsAppViewMode(true)}
        onOpenOffers={() => setIsOffersOpen(true)}
        onOpenCreators={() => setIsCreatorsOpen(true)}
        onOpenLocalStores={() => setIsLocalStoresOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSnapmint={() => {
          setSnapmintPriceTarget(1899);
          setIsSnapmintOpen(true);
        }}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenAddProduct={() => {
          setAddProductTargetStoreId(undefined);
          setIsAddProductOpen(true);
        }}
      />

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileNav
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOffers={() => setIsOffersOpen(true)}
      />

      {/* Global Modals */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSnapmint={(pr) => {
          setSnapmintPriceTarget(pr);
          setIsSnapmintOpen(true);
        }}
        onOpenStorePage={(stId) => {
          const foundStore = stores.find((s) => s.id === stId);
          if (foundStore) {
            setSelectedStore(foundStore);
            setIsStoreDetailOpen(true);
          }
        }}
      />

      <LocalStoreDetailModal
        store={selectedStore}
        products={products}
        currency={currency}
        wishlistIds={wishlistIds}
        isOpen={isStoreDetailOpen}
        onClose={() => setIsStoreDetailOpen(false)}
        onToggleWishlist={handleToggleWishlist}
        onQuickViewProduct={setSelectedProduct}
        onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
        onOpenAddProductForStore={(stId) => {
          setAddProductTargetStoreId(stId);
          setIsAddProductOpen(true);
        }}
        onSelectStorePickup={(stName) => {
          setSearchQuery(stName);
          setFilters((prev) => ({ ...prev, onlyLocalStores: true }));
          showToast(`Filtering items available at ${stName} for 90-min pickup`);
        }}
      />

      <SnapmintModal
        isOpen={isSnapmintOpen}
        onClose={() => setIsSnapmintOpen(false)}
        productPriceINR={snapmintPriceTarget}
        currency={currency}
        userPhone={currentUser.phone}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onUpdateUser={setCurrentUser}
        allProducts={products}
        orders={orders}
        currency={currency}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onQuickViewProduct={setSelectedProduct}
        onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
        onOpenSnapmint={() => setIsSnapmintOpen(true)}
        onOpenLocalStores={() => setIsLocalStoresOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onSearchTag={(tag) => {
          setSearchQuery(tag);
        }}
      />

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        stores={stores}
        defaultStoreId={addProductTargetStoreId}
        onAddProduct={handleAddProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedCoupon={appliedCoupon}
        couponDiscountINR={couponDiscountINR}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        insiderPoints={insiderPoints}
        useInsiderPoints={useInsiderPoints}
        onToggleInsiderPoints={() => setUseInsiderPoints(!useInsiderPoints)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onViewProduct={setSelectedProduct}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        couponDiscountINR={couponDiscountINR}
        insiderDiscountINR={useInsiderPoints ? Math.min(200, insiderPoints) : 0}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        currency={currency}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onUpdateUser={setCurrentUser}
      />

      <LocalStoresModal
        isOpen={isLocalStoresOpen}
        onClose={() => setIsLocalStoresOpen(false)}
        stores={stores}
        onSelectStoreFilter={(storeName) => {
          setSearchQuery(storeName);
          setFilters((prev) => ({ ...prev, onlyLocalStores: true }));
        }}
        onOpenStoreDetail={(store) => {
          setSelectedStore(store);
          setIsStoreDetailOpen(true);
        }}
        onOpenAddProduct={(stId) => {
          setAddProductTargetStoreId(stId);
          setIsAddProductOpen(true);
        }}
      />

      <CreatorProgramModal
        isOpen={isCreatorsOpen}
        onClose={() => setIsCreatorsOpen(false)}
        onSelectCreatorLook={(handle) => {
          setSearchQuery(handle);
        }}
      />

      <OffersModal
        isOpen={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        onApplyCoupon={handleApplyCoupon}
      />
    </div>
  );
}
