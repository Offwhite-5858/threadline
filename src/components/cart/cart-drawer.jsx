"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/data/site";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-extrabold text-lg">Your bag ({items.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} className="text-muted-foreground/40 mb-4" />
              <p className="font-semibold mb-2">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mb-6">
                Add some pieces to get started.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.size} · {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="p-1.5 hover:bg-muted"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="p-1.5 hover:bg-muted"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">
                {formatPrice(subtotal())}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center"
            >
              Checkout
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full py-3.5 border border-border font-semibold rounded-lg hover:border-foreground transition-colors text-center text-sm"
            >
              View cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}