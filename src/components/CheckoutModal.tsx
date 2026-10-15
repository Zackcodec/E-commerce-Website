import React, { useState } from 'react';
import { X, CheckCircle, Shield, Truck, CreditCard, Smartphone, Banknote, Building2, Package, ArrowLeft, ArrowRight, ShieldCheck, Store, Zap, Ruler, QrCode } from 'lucide-react';
import { CartItem, Currency, Order, OrderCustomer, DeliveryMethodType, PaymentMethodType, StoreProfile } from '../types';
import { CURRENCIES, DELIVERY_OPTIONS, DEFAULT_LOCAL_STORES } from '../data/xureProducts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  couponDiscountINR: number;
  insiderDiscountINR: number;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  couponDiscountINR,
  insiderDiscountINR,
  onOrderPlaced,
}) => {
  const [step, setStep] = useState<'delivery' | 'address' | 'payment' | 'confirmed'>('delivery');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType>('store_pickup');
  const [selectedPickupStore, setSelectedPickupStore] = useState<string>(DEFAULT_LOCAL_STORES[0].storeName);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('snapmint');
  const [snapmintPlan, setSnapmintPlan] = useState<3 | 6>(3);
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: 'Julian Vance',
    email: 'julian.vance@cloutix.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Prestige Tower, 100 Feet Road, Indiranagar',
    apartment: 'Block B, 4th Floor',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
  });

  if (!isOpen) return null;

  const currencyInfo = CURRENCIES[currency];

  const totalMrpINR = items.reduce(
    (sum, item) => sum + item.product.originalMrpINR * item.quantity,
    0
  );
  const totalSellingPriceINR = items.reduce(
    (sum, item) => sum + item.product.priceINR * item.quantity,
    0
  );
  const mrpDiscountINR = totalMrpINR - totalSellingPriceINR;
  const platformFeeINR = items.length > 0 ? 20 : 0;
  
  // Delivery Fee calculation
  const deliveryOptionObj = DELIVERY_OPTIONS.find((d) => d.id === deliveryMethod);
  const shippingFeeINR = deliveryOptionObj ? deliveryOptionObj.costINR : 0;

  // Extra Snapmint discount if code or promo active
  const snapmintDiscountINR = paymentMethod === 'snapmint' ? 150 : 0;

  const finalTotalINR = Math.max(
    0,
    totalSellingPriceINR - couponDiscountINR - insiderDiscountINR - snapmintDiscountINR + platformFeeINR + shippingFeeINR
  );

  const convertedTotal = Math.round(finalTotalINR * currencyInfo.rate);
  const snapmintEmiAmount = Math.round(finalTotalINR / snapmintPlan);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `XUR-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const order: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        items: [...items],
        customer,
        totalMrp: totalMrpINR,
        mrpDiscount: mrpDiscountINR,
        couponDiscount: couponDiscountINR,
        insiderDiscount: insiderDiscountINR,
        shipping: shippingFeeINR,
        total: finalTotalINR,
        currency,
        paymentMethod,
        deliveryMethod,
        pickupStoreName: deliveryMethod === 'store_pickup' ? selectedPickupStore : undefined,
        pickupCode: deliveryMethod === 'store_pickup' ? `${Math.floor(100000 + Math.random() * 900000)}` : undefined,
        snapmintPlan: paymentMethod === 'snapmint' ? {
          months: snapmintPlan,
          monthlyEmiINR: snapmintEmiAmount,
          interestRate: '0%',
        } : undefined,
        status: 'confirmed',
        estimatedDeliveryDate: deliveryMethod === 'store_pickup' ? 'Today, Ready in 90 Mins' : deliveryMethod === 'express_hyperlocal' ? 'Today in 2 Hours' : 'Tomorrow by 5 PM',
        trackingSteps: [
          { title: 'Order & Fit Confirmed', date: 'Just Now', completed: true },
          { title: deliveryMethod === 'store_pickup' ? `Prepared at ${selectedPickupStore}` : 'Handcrafted by Master Tailor', date: 'Expected within 1 hour', completed: false },
          { title: deliveryMethod === 'store_pickup' ? 'Ready for In-Store Trial Room' : 'Dispatched with Courier', date: 'Expected Today', completed: false },
          { title: 'Completed', date: 'Expected Today', completed: false },
        ],
      };

      setConfirmedOrder(order);
      onOrderPlaced(order);
      setStep('confirmed');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border border-[#EAE8E0]">
        {/* Top Header with XURE Stepper */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1A1A1A] to-[#FF3F6C] flex items-center justify-center text-white font-black text-sm italic">
              X
            </div>
            <div>
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#282C3F]">
                XURE Express Checkout
              </span>
              <span className="text-[10px] text-[#71717A] block">
                Bespoke Tailoring & Verified Neighborhood Stores
              </span>
            </div>
          </div>

          {/* Stepper Header */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span className={step === 'delivery' ? 'text-[#FF3F6C]' : 'text-emerald-600'}>
              1. Fulfillment
            </span>
            <span className="text-[#D4D5D9]">———</span>
            <span className={step === 'address' ? 'text-[#FF3F6C]' : step === 'payment' || step === 'confirmed' ? 'text-emerald-600' : 'text-[#71717A]'}>
              2. Details
            </span>
            <span className="text-[#D4D5D9]">———</span>
            <span className={step === 'payment' ? 'text-[#FF3F6C]' : step === 'confirmed' ? 'text-emerald-600' : 'text-[#71717A]'}>
              3. Payment
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#282C3F] rounded-full hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF9F5]">
          {step === 'confirmed' && confirmedOrder ? (
            /* Order Confirmed Screen */
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE8E0] shadow-sm text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF3F6C]">
                  Order Placed Successfully
                </span>
                <h2 className="text-xl font-black text-[#282C3F]">Order #{confirmedOrder.id}</h2>
                <p className="text-xs text-[#71717A]">
                  Confirmation sent to <strong>{confirmedOrder.customer.email}</strong> and SMS to <strong>{confirmedOrder.customer.phone}</strong>
                </p>
              </div>

              {/* Store Pickup Digital Pass if pickup chosen */}
              {confirmedOrder.deliveryMethod === 'store_pickup' && (
                <div className="p-4 bg-[#FAF9F5] border-2 border-dashed border-emerald-300 rounded-2xl text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      In-Store Pickup Trial Pass
                    </span>
                    <span className="text-xs font-bold text-emerald-700">Ready in 90 Mins</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="block text-sm text-[#282C3F]">
                        {confirmedOrder.pickupStoreName}
                      </strong>
                      <span className="text-xs text-[#71717A]">
                        Trial Room Reserved for {confirmedOrder.customer.fullName}
                      </span>
                    </div>

                    <div className="p-2 bg-white border border-[#D4D5D9] rounded-xl flex items-center gap-2">
                      <QrCode className="w-8 h-8 text-[#282C3F]" />
                      <div className="text-left font-mono">
                        <span className="text-[9px] text-[#71717A] block">PIN</span>
                        <strong className="text-sm text-[#FF3F6C]">{confirmedOrder.pickupCode}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Snapmint Installment Confirmation if chosen */}
              {confirmedOrder.paymentMethod === 'snapmint' && confirmedOrder.snapmintPlan && (
                <div className="p-3.5 bg-[#E8FAF4] border border-[#00B785]/30 rounded-xl text-xs text-left flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00B785] text-white font-black text-xs flex items-center justify-center">S</span>
                    <div>
                      <strong className="text-[#0A8754]">Snapmint 0% Interest EMI Active</strong>
                      <span className="text-[#535766] block text-[11px]">
                        {confirmedOrder.snapmintPlan.months} installments of ₹{confirmedOrder.snapmintPlan.monthlyEmiINR.toLocaleString()} / mo
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Auto-Debited</span>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Flow Steps */}
              <div className="lg:col-span-8 space-y-5">
                {step === 'delivery' && (
                  /* Step 1: Delivery & Fulfillment Options */
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#282C3F]">
                          Select Delivery or Store Pickup Mode
                        </h3>
                        <p className="text-xs text-[#71717A] mt-0.5">
                          Collect in person for instant trial & alterations, or opt for doorstep courier
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {DELIVERY_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          onClick={() => setDeliveryMethod(opt.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                            deliveryMethod === opt.id
                              ? 'border-[#FF3F6C] bg-[#FFF0F4] ring-2 ring-[#FF3F6C]/20'
                              : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white border border-[#EAE8E0] flex items-center justify-center shrink-0 mt-0.5">
                              {opt.id === 'store_pickup' && <Store className="w-4 h-4 text-emerald-700" />}
                              {opt.id === 'express_hyperlocal' && <Zap className="w-4 h-4 text-amber-500" />}
                              {opt.id === 'standard' && <Truck className="w-4 h-4 text-blue-600" />}
                              {opt.id === 'tailor_home_visit' && <Ruler className="w-4 h-4 text-[#FF3F6C]" />}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-xs text-[#282C3F]">{opt.title}</strong>
                                {opt.badge && (
                                  <span className="text-[9px] font-bold text-[#FF3F6C] bg-white px-2 py-0.5 rounded-full border border-[#FF3F6C]/20 uppercase">
                                    {opt.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#71717A] mt-0.5">{opt.subtitle}</p>
                              <span className="text-[11px] font-bold text-emerald-700 block mt-1">
                                ETA: {opt.eta}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-bold text-xs text-[#282C3F] font-mono">
                              {opt.costINR === 0 ? 'FREE' : `+₹${opt.costINR}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* If Store Pickup selected, pick which store */}
                    {deliveryMethod === 'store_pickup' && (
                      <div className="mt-4 p-4 bg-[#FAF9F5] border border-[#EAE8E0] rounded-2xl space-y-2.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#282C3F] block">
                          Choose Pickup Boutique:
                        </label>
                        <select
                          value={selectedPickupStore}
                          onChange={(e) => setSelectedPickupStore(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#D4D5D9] rounded-xl text-xs font-bold text-[#282C3F] focus:outline-none"
                        >
                          {DEFAULT_LOCAL_STORES.map((st) => (
                            <option key={st.id} value={st.storeName}>
                              {st.storeName} — {st.neighborhood} (90-Min Ready)
                            </option>
                          ))}
                        </select>
                        <span className="text-[11px] text-[#71717A] block">
                          Includes dedicated trial suite reservation & free on-spot hem adjustments.
                        </span>
                      </div>
                    )}

                    <div className="pt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep('address')}
                        className="px-6 py-3 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                      >
                        <span>Continue to Customer Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 'address' && (
                  /* Step 2: Customer Contact & Delivery Address */
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#282C3F]">
                        {deliveryMethod === 'store_pickup' ? 'Contact Details for Store Pickup' : 'Delivery Address'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="text-xs font-bold text-[#FF3F6C] hover:underline"
                      >
                        ← Change Delivery
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-[#71717A] block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={customer.fullName}
                          onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#71717A] block mb-1">Mobile Phone (for OTP & Pickup SMS) *</label>
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs font-mono bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#71717A] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#71717A] block mb-1">
                        Street Address / Landmark
                      </label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-[#71717A] block mb-1">City</label>
                        <input
                          type="text"
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#71717A] block mb-1">State</label>
                        <input
                          type="text"
                          value={customer.state}
                          onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#71717A] block mb-1">Pincode</label>
                        <input
                          type="text"
                          value={customer.pincode}
                          onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                          className="w-full px-3 py-2 border border-[#D4D5D9] rounded-xl text-xs font-mono bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="text-xs font-bold text-[#71717A] hover:text-[#282C3F]"
                      >
                        ← Back
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep('payment')}
                        className="px-6 py-3 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                      >
                        <span>Proceed to Payment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 'payment' && (
                  /* Step 3: Payment with Snapmint Pay Later & Options */
                  <form onSubmit={handleCompleteOrder} className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#282C3F]">
                        Choose Payment Method
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep('address')}
                        className="text-xs font-bold text-[#FF3F6C] hover:underline"
                      >
                        ← Edit Details
                      </button>
                    </div>

                    {/* Featured: Snapmint Pay Later */}
                    <div
                      onClick={() => setPaymentMethod('snapmint')}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        paymentMethod === 'snapmint'
                          ? 'border-[#00B785] bg-[#E8FAF4] ring-2 ring-[#00B785]/30'
                          : 'border-[#EAE8E0] bg-white hover:border-[#A1A1AA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[#00B785] text-white font-black text-sm flex items-center justify-center">
                            S
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <strong className="text-xs text-[#282C3F]">Snapmint Pay Later</strong>
                              <span className="text-[9px] font-bold text-white bg-[#00B785] px-2 py-0.2 rounded-full uppercase">
                                0% Interest EMI
                              </span>
                            </div>
                            <span className="text-[11px] text-[#0A8754] block">
                              No credit card required · Instant approval on mobile number
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-emerald-800">Extra ₹150 OFF</span>
                      </div>

                      {paymentMethod === 'snapmint' && (
                        <div className="pt-2 border-t border-[#00B785]/20 grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSnapmintPlan(3);
                            }}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                              snapmintPlan === 3
                                ? 'bg-white border-[#00B785] font-bold text-[#0A8754] shadow-2xs'
                                : 'bg-[#FAF9F5] text-[#71717A] border-transparent'
                            }`}
                          >
                            <span className="block text-[10px] uppercase">3 Monthly EMIs</span>
                            <span className="text-sm font-mono font-black text-[#282C3F]">
                              ₹{Math.round(finalTotalINR / 3).toLocaleString()} / mo
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSnapmintPlan(6);
                            }}
                            className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                              snapmintPlan === 6
                                ? 'bg-white border-[#00B785] font-bold text-[#0A8754] shadow-2xs'
                                : 'bg-[#FAF9F5] text-[#71717A] border-transparent'
                            }`}
                          >
                            <span className="block text-[10px] uppercase">6 Monthly EMIs</span>
                            <span className="text-sm font-mono font-black text-[#282C3F]">
                              ₹{Math.round(finalTotalINR / 6).toLocaleString()} / mo
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Standard Payment Options */}
                    <div className="space-y-2">
                      <label
                        className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'border-[#FF3F6C] bg-[#FFF0F4]'
                            : 'border-[#EAE8E0] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payMethod"
                            checked={paymentMethod === 'upi'}
                            onChange={() => setPaymentMethod('upi')}
                            className="accent-[#FF3F6C]"
                          />
                          <Smartphone className="w-4 h-4 text-[#282C3F]" />
                          <span className="text-xs font-bold text-[#282C3F]">Instant UPI (GPay, PhonePe, Paytm)</span>
                        </div>
                        <span className="text-[10px] text-[#71717A]">Fast & Zero Surcharge</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#FF3F6C] bg-[#FFF0F4]'
                            : 'border-[#EAE8E0] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payMethod"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="accent-[#FF3F6C]"
                          />
                          <CreditCard className="w-4 h-4 text-[#282C3F]" />
                          <span className="text-xs font-bold text-[#282C3F]">Credit / Debit Card</span>
                        </div>
                        <span className="text-[10px] text-[#71717A]">Visa, Mastercard, Amex</span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all ${
                          paymentMethod === 'pay_at_store'
                            ? 'border-[#FF3F6C] bg-[#FFF0F4]'
                            : 'border-[#EAE8E0] bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payMethod"
                            checked={paymentMethod === 'pay_at_store'}
                            onChange={() => setPaymentMethod('pay_at_store')}
                            className="accent-[#FF3F6C]"
                          />
                          <Store className="w-4 h-4 text-emerald-700" />
                          <span className="text-xs font-bold text-[#282C3F]">
                            {deliveryMethod === 'store_pickup' ? 'Pay In-Store on Collection' : 'Cash on Delivery (COD)'}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold">Try First, Pay Later</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#FF3F6C] hover:bg-[#E0355E] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? (
                        <span>Processing with Master Draper...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>
                            {paymentMethod === 'snapmint'
                              ? `Confirm with Snapmint (₹${Math.round(finalTotalINR / snapmintPlan).toLocaleString()} today)`
                              : `Pay ₹${finalTotalINR.toLocaleString()} & Confirm Order`}
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white p-5 rounded-3xl border border-[#EAE8E0] shadow-xs space-y-4">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#282C3F] border-b border-[#F5F5F6] pb-2">
                    Order Summary ({items.length} items)
                  </h4>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                    {items.map((it) => (
                      <div key={it.id} className="text-xs flex justify-between items-start">
                        <div>
                          <strong className="block text-[#282C3F] truncate max-w-[170px]">{it.product.name}</strong>
                          <span className="text-[10px] text-[#71717A]">
                            Size: {it.selectedSize} · Qty: {it.quantity}
                          </span>
                          {it.isCustomFit && (
                            <span className="text-[9px] text-[#FF3F6C] font-bold block">
                              ✂️ Custom Tailored
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-bold text-[#282C3F]">
                          ₹{(it.product.priceINR * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#F5F5F6] pt-3 space-y-1.5 text-xs text-[#535766]">
                    <div className="flex justify-between">
                      <span>Total MRP</span>
                      <span className="font-mono">₹{totalMrpINR.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount on MRP</span>
                      <span className="font-mono">-₹{mrpDiscountINR.toLocaleString()}</span>
                    </div>
                    {couponDiscountINR > 0 && (
                      <div className="flex justify-between text-[#FF3F6C]">
                        <span>Coupon Savings</span>
                        <span className="font-mono">-₹{couponDiscountINR.toLocaleString()}</span>
                      </div>
                    )}
                    {paymentMethod === 'snapmint' && (
                      <div className="flex justify-between text-[#00B785] font-semibold">
                        <span>Snapmint Cashback</span>
                        <span className="font-mono">-₹150</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee ({deliveryOptionObj?.title.split('/')[0] || 'Standard'})</span>
                      <span className="font-mono">{shippingFeeINR === 0 ? 'FREE' : `₹${shippingFeeINR}`}</span>
                    </div>

                    <div className="border-t border-[#EAE8E0] pt-2 flex justify-between font-bold text-sm text-[#282C3F]">
                      <span>Final Payable</span>
                      <span className="font-mono font-black text-base text-[#FF3F6C]">
                        ₹{finalTotalINR.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust badge */}
                <div className="p-3.5 bg-white border border-[#EAE8E0] rounded-2xl flex items-center gap-3 text-xs text-[#71717A]">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-tight">
                    100% Secure Checkout · Encrypted Measurements & PCI-DSS Compliant
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
