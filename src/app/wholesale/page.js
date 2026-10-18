"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Package, TrendingDown, Truck, MessageCircle } from "lucide-react";
import { siteConfig, formatPrice } from "@/lib/data/site";

const schema = z.object({
  businessName: z.string().min(2, "Business name required"),
  contactName: z.string().min(2, "Contact name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  productInterest: z.string().min(1, "Please select a product"),
  quantity: z.string().min(1, "Quantity required"),
  message: z.string().optional(),
});

const tiers = [
  { quantity: "10–24 units", discount: "20% off retail", example: "Hoodies from ₦36,000" },
  { quantity: "25–49 units", discount: "28% off retail", example: "Hoodies from ₦32,400" },
  { quantity: "50+ units", discount: "35% off retail", example: "Hoodies from ₦29,250" },
];

export default function WholesalePage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Quote request received! We'll be in touch within 24 hours.");
    setSubmitted(true);
    reset();
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container-threadline">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Wholesale
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tighter mb-6">
              Buy in bulk.
              <br />
              <span className="text-primary">Save more.</span>
            </h1>
            <p className="text-background/70 text-lg max-w-xl mb-8">
              Stock your shop, boutique or online store with authentic imported
              streetwear. Tiered pricing from 10 units up.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hi Threadline! I'm interested in wholesale pricing."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container-threadline">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter mb-10">
            Pricing tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 rounded-2xl border ${
                  i === 2
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border"
                }`}
              >
                <p className="text-3xl md:text-4xl font-extrabold mb-1">
                  {tier.quantity}
                </p>
                <p className={`text-sm mb-4 ${i === 2 ? "text-white/80" : "text-muted-foreground"}`}>
                  {tier.example}
                </p>
                <div className="flex items-center gap-2 font-semibold">
                  <TrendingDown size={18} />
                  {tier.discount}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            All wholesale orders include free delivery within Lagos and Abuja.
            Nationwide shipping available.
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 md:py-24">
        <div className="container-threadline">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                Quote request
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">
                Tell us what you need.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Fill the form and we&apos;ll send you a custom quote within 24
                hours. Include your product interest and quantity for the
                fastest response.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <Package size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Authentic imports only</p>
                    <p className="text-xs text-muted-foreground">
                      Same factories that supply the major brands. No fakes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                  <Truck size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Fast bulk delivery</p>
                    <p className="text-xs text-muted-foreground">
                      1–2 days Lagos &amp; Abuja. 3–5 days nationwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="p-8 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2">Request received!</h3>
                  <p className="text-muted-foreground mb-6">
                    We&apos;ll review your request and get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Business name *
                    </label>
                    <input
                      {...register("businessName")}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="Your shop or store name"
                    />
                    {errors.businessName && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.businessName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Contact name *
                      </label>
                      <input
                        {...register("contactName")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        placeholder="Your name"
                      />
                      {errors.contactName && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.contactName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Phone *
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

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      placeholder="you@business.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Product interest *
                      </label>
                      <select
                        {...register("productInterest")}
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Select</option>
                        <option value="hoodies">Hoodies</option>
                        <option value="sweaters">Sweaters</option>
                        <option value="joggers">Joggers</option>
                        <option value="mixed">Mixed order</option>
                      </select>
                      {errors.productInterest && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.productInterest.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Quantity *
                      </label>
                      <input
                        {...register("quantity")}
                        type="number"
                        className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        placeholder="Minimum 10"
                      />
                      {errors.quantity && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Message (optional)
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Sizes, colors, delivery timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Request quote"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}