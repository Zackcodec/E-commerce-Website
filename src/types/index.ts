export type ProductCategory = 
  | 'all'
  | 'shirts'
  | 'tshirts'
  | 'jeans'
  | 'trousers'
  | 'jackets'
  | 'sweatshirts'
  | 'footwear'
  | 'accessories'
  | 'custom_tailored';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  stockCount: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface LocalStoreInfo {
  storeId?: string;
  storeName: string;
  city: string;
  neighborhood: string;
  distanceKm: number;
  pickupAvailable: boolean;
  storeRating: number;
  badge?: string;
}

export interface CustomTailoringOptions {
  available: boolean;
  additionalCostINR: number;
  estimatedCraftDays: number;
  monogrammingAvailable: boolean;
  customFields: {
    collarNeck?: boolean;
    chestBust?: boolean;
    shoulderWidth?: boolean;
    sleeveLength?: boolean;
    waistCircumference?: boolean;
    trouserInseam?: boolean;
  };
}

export interface CustomMeasurements {
  collarNeck?: string;
  chestBust?: string;
  shoulderWidth?: string;
  sleeveLength?: string;
  waistCircumference?: string;
  trouserInseam?: string;
  fitPreference: 'ultra_slim' | 'tailored_european' | 'relaxed_modern';
  monogramText?: string;
  monogramThreadColor?: 'gold' | 'silver' | 'navy' | 'black';
}

export interface CreatorLook {
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorBio: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  subtitle: string;
  category: ProductCategory;
  priceINR: number;
  originalMrpINR: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  description: string;
  fabric: {
    material: string;
    weight?: string;
    origin: string;
    composition: string;
    fit: string;
    pattern: string;
  };
  details: string[];
  careInstructions: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  measurements: {
    chest?: Record<string, string>;
    shoulder?: Record<string, string>;
    length: Record<string, string>;
    sleeve?: Record<string, string>;
    waist?: Record<string, string>;
    inseam?: Record<string, string>;
  };
  silhouetteSvg: string; // 'coat' | 'sweater' | 'trouser' | 'shirt' | 'derby' | 'accessories' | 'watch' | 'belt'
  isTrending?: boolean;
  isExclusive?: boolean;
  deliveryDays: number;
  reviews: ProductReview[];
  localStore?: LocalStoreInfo;
  customTailoring?: CustomTailoringOptions;
  creatorLook?: CreatorLook;
  sourceType?: 'atelier' | 'local_boutique' | 'online_import';
}

export interface CartItem {
  id: string; // `${productId}-${selectedColor}-${selectedSize}-${isCustom ? 'custom' : 'std'}`
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  isCustomFit?: boolean;
  customMeasurements?: CustomMeasurements;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export type DeliveryMethodType = 
  | 'store_pickup' 
  | 'express_hyperlocal' 
  | 'standard' 
  | 'tailor_home_visit';

export interface DeliveryMethodOption {
  id: DeliveryMethodType;
  title: string;
  subtitle: string;
  eta: string;
  costINR: number;
  badge?: string;
  iconName: string;
}

export type PaymentMethodType = 
  | 'snapmint' 
  | 'upi' 
  | 'card' 
  | 'netbanking' 
  | 'cod' 
  | 'pay_at_store';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: OrderCustomer;
  totalMrp: number;
  mrpDiscount: number;
  couponDiscount: number;
  insiderDiscount: number;
  shipping: number;
  total: number;
  currency: Currency;
  paymentMethod: PaymentMethodType;
  deliveryMethod?: DeliveryMethodType;
  pickupStoreName?: string;
  pickupCode?: string;
  snapmintPlan?: {
    months: number;
    monthlyEmiINR: number;
    interestRate: string;
  };
  status: 'confirmed' | 'dispatched' | 'out_for_delivery' | 'delivered';
  estimatedDeliveryDate: string;
  trackingSteps: {
    title: string;
    date: string;
    completed: boolean;
  }[];
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minSpendINR: number;
  description: string;
  storeExclusive?: string;
}

export interface UserProfile {
  isLoggedIn: boolean;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  savedMeasurements?: CustomMeasurements;
  stylePersona?: 'quiet_luxury' | 'streetwear_modern' | 'sharp_formal' | 'smart_casual';
  preferredFit?: 'slim' | 'regular' | 'relaxed';
  heightCm?: string;
  weightKg?: string;
  savedStores: string[];
  searchHistory: string[];
  recentlyViewedIds: string[];
  snapmintCreditLimitINR: number;
  snapmintApproved: boolean;
}

export interface StoreProfile {
  id: string;
  storeName: string;
  tagline: string;
  ownerName: string;
  ownerTitle: string;
  ownerAvatar?: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  operatingHours: string;
  distanceKm: number;
  storeRating: number;
  ratingCount: number;
  badge: string;
  description: string;
  trialRoomsCount: number;
  masterTailorName: string;
  pickupPolicy: string;
  pickupAvailable: boolean;
  specialtyTags: string[];
  coverGradient: string;
  listedProductIds: string[];
}
