import React from 'react';
import { X, Package, Truck, CheckCircle2 } from 'lucide-react';
import { Order, Currency } from '../types';
import { CURRENCIES } from '../data/xureProducts';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  currency: Currency;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  currency,
}) => {
  if (!isOpen) return null;

  const currencyInfo = CURRENCIES[currency];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="orders-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FF3F6C]" />
            <h2 id="orders-modal-title" className="font-bold text-sm uppercase tracking-wider text-[#282C3F]">
              My Orders & Live Tracking
            </h2>
            <span className="text-xs text-[#71717A] font-mono">({orders.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#71717A] hover:text-[#282C3F] transition-colors cursor-pointer"
            aria-label="Close orders"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF9F5]">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-[#71717A]">
              <Package className="w-12 h-12 mx-auto text-[#D4D5D9] mb-3" />
              <p className="font-bold text-sm text-[#282C3F]">No orders placed yet</p>
              <p className="text-xs mt-1">
                Browse our collection of men's shirts, jeans, and overcoats to place your first order.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div key={ord.id} className="bg-white border border-[#EAE8E0] p-4 rounded-md shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#F5F5F6] text-xs">
                  <div>
                    <span className="font-bold text-[#282C3F]">Order ID: {ord.id}</span>
                    <span className="text-[#71717A] block text-[11px]">Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFF0F4] text-[#FF3F6C] font-bold text-[10px] uppercase rounded-full">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{ord.estimatedDeliveryDate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {ord.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-[#282C3F] uppercase text-[11px] mr-1.5">
                          {it.product.brand}
                        </span>
                        <span className="text-[#535766]">{it.product.name}</span>
                        <div className="text-[11px] text-[#71717A]">
                          Size: {it.selectedSize.split(' ')[0]} | Qty: {it.quantity}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#282C3F]">
                        {currencyInfo.symbol}{Math.round(it.product.priceINR * it.quantity * currencyInfo.rate).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#F5F5F6] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Payment ({ord.paymentMethod.toUpperCase()})</span>
                  </div>
                  <div className="font-bold text-sm text-[#282C3F] font-mono">
                    Total: {currencyInfo.symbol}{Math.round(ord.total * currencyInfo.rate).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
