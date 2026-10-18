"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/data/site";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  notes: z.string().optional(),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-3">Nothing to checkout</h1>
          <Link href="/shop" className="text-primary font-medium hover:underline">
            ← Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      // Placeholder for Paystack integration
      await new Promise((r) => setTimeout(r, 1500));

      toast.success("Order placed! Check your email for confirmation.");
      clearCart();
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="container-threadline">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-extrabold mb-4">Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full name
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="john@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="+234 800 000 0000"
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-extrabold mb-4">Delivery address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Street address
                    </label>
                    <input
                      {...register("address")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        City
                      </label>
                      <input
                        {...register("city")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        placeholder="Lagos"
                      />
                      {errors.city && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        State
                      </label>
                      <input
                        {...register("state")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        placeholder="Lagos"
                      />
                      {errors.state && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Order notes (optional)
                    </label>
                    <textarea
                      {...register("notes")}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Delivery instructions, gift note, etc."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 border border-border rounded-xl p-6">
                <h2 className="font-extrabold mb-4">Payment</h2>
                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <CreditCard size={20} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">
                      Secure checkout via Paystack
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You&apos;ll be redirected to complete payment securely.
                      Card, bank transfer and USSD supported.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-extrabold mb-4">
                  Order summary ({items.length})
                </h2>

                <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-3 text-sm">
                      <div className="w-12 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-primary">Free</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-4 mb-6 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {processing ? "Processing..." : "Pay now"}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck size={14} className="text-primary" />
                  Secure 256-bit SSL encrypted checkout
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}