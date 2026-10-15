import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Globe, Store, Ruler, Tag, Image as ImageIcon } from 'lucide-react';
import { Product, ProductCategory, StoreProfile } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  stores: StoreProfile[];
  defaultStoreId?: string;
  onAddProduct: (product: Product, storeId?: string) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  stores,
  defaultStoreId,
  onAddProduct,
}) => {
  const [tab, setTab] = useState<'create' | 'import_online'>('create');

  // Form Fields
  const [name, setName] = useState('');
  const [brand, setBrand] = useState(
    stores.find((s) => s.id === defaultStoreId)?.storeName || 'XURE BESPOKE'
  );
  const [category, setCategory] = useState<ProductCategory>('custom_tailored');
  const [priceINR, setPriceINR] = useState('2499');
  const [mrpINR, setMrpINR] = useState('4999');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('100% Organic Long-Staple Cotton');
  const [weight, setWeight] = useState('180 GSM');
  const [origin, setOrigin] = useState('Como, Italy / Hand-tailored');
  const [silhouette, setSilhouette] = useState('shirt');
  const [selectedStoreId, setSelectedStoreId] = useState(defaultStoreId || stores[0]?.id || '');
  const [customFitAvailable, setCustomFitAvailable] = useState(true);
  const [colorName, setColorName] = useState('Midnight Navy');
  const [colorHex, setColorHex] = useState('#1B263B');
  const [onlineUrl, setOnlineUrl] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset online luxury templates for 1-click realistic addition
  const onlineTemplates = [
    {
      id: 'tmpl-cordovan-loafers',
      name: 'Horween Shell Cordovan Hand-Stitched Penny Loafers',
      brand: 'HERITAGE LEATHER CRAFT',
      category: 'footwear' as ProductCategory,
      priceINR: 6999,
      originalMrpINR: 13999,
      material: 'Genuine Horween Shell Cordovan',
      origin: 'Chicago, USA / Bench-crafted in Agra',
      silhouette: 'derby',
      colorName: 'Color 8 Deep Burgundy',
      colorHex: '#4A1521',
      description: 'Hand-sewn moccasin construction using world-renowned Horween shell cordovan with double oak-bark tanned leather soles.',
    },
    {
      id: 'tmpl-safari-jacket',
      name: 'Custom Canvassed Irish Linen Field Safari Jacket',
      brand: 'BESPOKE TAILORS',
      category: 'jackets' as ProductCategory,
      priceINR: 4899,
      originalMrpINR: 9799,
      material: 'Heavy 340 GSM Pure Irish Linen',
      origin: 'Belfast, Ireland / Milled in Indiranagar',
      silhouette: 'coat',
      colorName: 'Desert Sand Tan',
      colorHex: '#D2B48C',
      description: 'Features four pleated bellow cargo pockets, waist belt with solid horn buckle, and shoulder epaulettes. Ideal for travel and tropical evenings.',
    },
    {
      id: 'tmpl-cufflinks-guilloche',
      name: 'Hand-Engineered 925 Sterling Silver Guilloche Cufflinks',
      brand: 'XURE ACCESSORIES',
      category: 'accessories' as ProductCategory,
      priceINR: 1799,
      originalMrpINR: 3599,
      material: '925 Sterling Silver & Onyx',
      origin: 'Jaipur Silversmith Enclave',
      silhouette: 'accessories',
      colorName: 'Mirror Polished Silver',
      colorHex: '#E5E4E2',
      description: 'Engine-turned barleycorn guilloche pattern stamped into solid 925 sterling silver with swivel Whaleback closure.',
    },
  ];

  const handleApplyTemplate = (tmpl: (typeof onlineTemplates)[0]) => {
    setSelectedTemplate(tmpl.id);
    setName(tmpl.name);
    setBrand(tmpl.brand);
    setCategory(tmpl.category);
    setPriceINR(tmpl.priceINR.toString());
    setMrpINR(tmpl.originalMrpINR.toString());
    setMaterial(tmpl.material);
    setOrigin(tmpl.origin);
    setSilhouette(tmpl.silhouette);
    setColorName(tmpl.colorName);
    setColorHex(tmpl.colorHex);
    setDescription(tmpl.description);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pPrice = parseInt(priceINR, 10) || 1999;
    const pMrp = parseInt(mrpINR, 10) || pPrice * 2;
    const discount = Math.max(10, Math.round(((pMrp - pPrice) / pMrp) * 100));

    const storeObj = stores.find((s) => s.id === selectedStoreId);

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim() || 'Custom Tailored Piece',
      brand: brand.trim() || (storeObj ? storeObj.storeName : 'XURE ATELIER'),
      subtitle: storeObj ? `Listed by ${storeObj.storeName}` : 'Artisanal Made-to-Measure',
      category,
      priceINR: pPrice,
      originalMrpINR: pMrp,
      discountPercentage: discount,
      rating: 4.9,
      ratingCount: 1,
      description: description.trim() || 'Artisanal piece tailored with precision craftsmanship.',
      fabric: {
        material,
        weight,
        origin,
        composition: material,
        fit: customFitAvailable ? 'Custom Made-to-Measure' : 'Modern Relaxed',
        pattern: 'Solid',
      },
      details: [
        'Crafted with high-precision single needle construction',
        'Available for same-day in-store fitting or direct delivery',
        'Reinforced stress points and premium hardware',
      ],
      careInstructions: ['Dry clean recommended', 'Steam press on low'],
      colors: [
        { name: colorName, hex: colorHex },
        { name: 'Basalt Black', hex: '#1C1C1E' },
      ],
      sizes: customFitAvailable
        ? [
            { size: 'Custom Fit', inStock: true, stockCount: 50 },
            { size: '38 (S)', inStock: true, stockCount: 10 },
            { size: '40 (M)', inStock: true, stockCount: 15 },
          ]
        : [
            { size: 'S', inStock: true, stockCount: 12 },
            { size: 'M', inStock: true, stockCount: 20 },
            { size: 'L', inStock: true, stockCount: 15 },
          ],
      measurements: {
        chest: { 'Custom Fit': 'Exact to body', '38 (S)': '102 cm', '40 (M)': '108 cm' },
        shoulder: { 'Custom Fit': 'Exact to body', '38 (S)': '45 cm', '40 (M)': '47 cm' },
        length: { 'Custom Fit': 'Customised', '38 (S)': '74 cm', '40 (M)': '76 cm' },
      },
      silhouetteSvg: silhouette,
      deliveryDays: storeObj?.pickupAvailable ? 1 : 3,
      reviews: [],
      localStore: storeObj
        ? {
            storeId: storeObj.id,
            storeName: storeObj.storeName,
            city: storeObj.city,
            neighborhood: storeObj.neighborhood,
            distanceKm: storeObj.distanceKm,
            pickupAvailable: storeObj.pickupAvailable,
            storeRating: storeObj.storeRating,
            badge: storeObj.badge,
          }
        : undefined,
      customTailoring: customFitAvailable
        ? {
            available: true,
            additionalCostINR: 0,
            estimatedCraftDays: 3,
            monogrammingAvailable: true,
            customFields: {
              collarNeck: true,
              chestBust: true,
              shoulderWidth: true,
              sleeveLength: true,
              waistCircumference: true,
            },
          }
        : undefined,
      sourceType: tab === 'import_online' ? 'online_import' : 'local_boutique',
    };

    onAddProduct(newProd, selectedStoreId);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-product-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 border border-[#EAE8E0]">
        {/* Header */}
        <div className="p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFF0F4] text-[#FF3F6C] flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 id="add-product-title" className="font-extrabold text-base uppercase tracking-wider text-[#282C3F]">
                List New Product on XURE
              </h2>
              <span className="text-[11px] text-[#71717A] block">
                Add products from local boutiques or import real luxury designer items
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
            type="button"
            onClick={() => setTab('create')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'create'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#282C3F]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Store Inventory Listing</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('import_online')}
            className={`flex-1 py-3 text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              tab === 'import_online'
                ? 'bg-white border-b-2 border-[#FF3F6C] text-[#FF3F6C]'
                : 'text-[#71717A] hover:text-[#282C3F]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Quick Import Real Products</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#FAF9F5]">
          {tab === 'import_online' && (
            <div className="space-y-4 bg-white p-4 rounded-2xl border border-[#EAE8E0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF3F6C]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#282C3F]">
                  1-Click Curated Luxury Templates
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {onlineTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedTemplate === tmpl.id
                        ? 'border-[#FF3F6C] bg-[#FFF0F4] ring-2 ring-[#FF3F6C]/20'
                        : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#FF3F6C] uppercase tracking-wider">
                        {tmpl.brand}
                      </span>
                      <strong className="block text-xs text-[#282C3F] mt-0.5">{tmpl.name}</strong>
                      <span className="text-[11px] text-[#71717A] font-mono">
                        ₹{tmpl.priceINR.toLocaleString()} · {tmpl.material}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-lg uppercase">
                      Select
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EAE8E0]">
                <label className="text-[11px] font-bold text-[#71717A] block mb-1">
                  Or Paste External Product URL (Farfetch, Mr Porter, Boutique link)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={onlineUrl}
                    onChange={(e) => setOnlineUrl(e.target.value)}
                    placeholder="https://savilerow-tailors.com/pieces/double-breasted-blazer"
                    className="flex-1 px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!name) setName('Italian Virgin Wool Double-Breasted Suit');
                      if (!material) setMaterial('Vitale Barberis Super 130s Wool');
                    }}
                    className="px-4 py-2 bg-[#282C3F] text-white text-xs font-bold rounded-xl hover:bg-black cursor-pointer"
                  >
                    Fetch
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Specifications Form */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE8E0] shadow-xs space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#282C3F] block">
              Product Details & Attributes
            </span>

            {/* Title & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Handmade Irish Linen Camp Shirt"
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none focus:border-[#FF3F6C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. BESPOKE TAILORS"
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none focus:border-[#FF3F6C]"
                />
              </div>
            </div>

            {/* Store Association */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">
                  Assign to Local Store / Boutique
                </label>
                <select
                  value={selectedStoreId}
                  onChange={(e) => setSelectedStoreId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none font-medium"
                >
                  <option value="">No Store (Direct XURE Atelier)</option>
                  {stores.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.storeName} ({st.neighborhood})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                >
                  <option value="custom_tailored">Custom Tailored / Made-to-Measure</option>
                  <option value="accessories">Accessories & Leather Goods</option>
                  <option value="shirts">Shirts</option>
                  <option value="trousers">Trousers & Chinos</option>
                  <option value="jeans">Selvedge Jeans</option>
                  <option value="jackets">Jackets & Blazers</option>
                  <option value="footwear">Footwear & Boots</option>
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Price (₹ INR) *</label>
                <input
                  type="number"
                  required
                  value={priceINR}
                  onChange={(e) => setPriceINR(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs font-mono bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Original MRP (₹ INR)</label>
                <input
                  type="number"
                  value={mrpINR}
                  onChange={(e) => setMrpINR(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs font-mono bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Fabric & Origin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Fabric & Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. 100% Giza Cotton"
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Milled / Crafted Origin</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Como, Italy / Hand-tailored in Bangalore"
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Color & Visual Silhouette */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Colorway Name</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-[#D4D5D9] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                    placeholder="e.g. Olive Drab"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#535766] block mb-1">Garment Silhouette</label>
                <select
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white focus:outline-none"
                >
                  <option value="shirt">Shirt / Top</option>
                  <option value="trouser">Trouser / Pants</option>
                  <option value="coat">Blazer / Coat</option>
                  <option value="watch">Watch / Timepiece</option>
                  <option value="belt">Leather Belt</option>
                  <option value="accessories">Accessories / Tie / Bag</option>
                  <option value="derby">Shoes / Loafers / Boots</option>
                </select>
              </div>
            </div>

            {/* Custom Tailoring Toggle */}
            <div className="p-3.5 bg-[#FAF9F5] border border-[#EAE8E0] rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-xs text-[#282C3F] block">Custom Body Tailoring Available</strong>
                <span className="text-[10px] text-[#71717A]">
                  Allows buyers to specify custom collar, chest, waist and sleeve measurements
                </span>
              </div>
              <input
                type="checkbox"
                checked={customFitAvailable}
                onChange={(e) => setCustomFitAvailable(e.target.checked)}
                className="w-4 h-4 accent-[#FF3F6C] cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-[#71717A] hover:text-[#282C3F] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish & List Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
