"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/data/site";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <ShoppingBag size={64} className="text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-3xl font-extrabold mb-3">Your bag is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some pieces to get started.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="container-threadline">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-8">
          Your bag
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.key}
                className="flex gap-4 p-4 border border-border rounded-xl"
              >
                <div className="w-24 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-semibold hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Size: {item.size} · Color: {item.color}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 border border-border rounded-xl p-6 sticky top-24">
              <h2 className="font-extrabold text-lg mb-4">Order summary</h2>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal())}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center"
              >
                Proceed to checkout
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Free delivery on orders over ₦50,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}