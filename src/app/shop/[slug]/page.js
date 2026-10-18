"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { formatPrice, siteConfig } from "@/lib/data/site";
import { getProductBySlug, getProductsByCategory, products } from "@/lib/data/products";
import ProductCard from "@/components/shop/product-card";

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((s) => s.addItem);

  if (!product) {
    return (
      <div className="container-threadline py-32 text-center">
        <h1 className="text-3xl font-extrabold mb-4">Product not found</h1>
        <Link
          href="/shop"
          className="text-primary font-medium hover:underline"
        >
          ← Back to shop
        </Link>
      </div>
    );
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to bag`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    router.push("/cart");
  };

  return (
    <main className="min-h-screen">
      <div className="container-threadline py-6 md:py-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-3">
              {product.name}
            </h1>

            <p className="text-2xl font-bold mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Size</h3>
                <button className="text-xs text-muted-foreground underline">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-foreground text-background"
                        : "border border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">
                Color{selectedColor && `: ${selectedColor}`}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-foreground text-background"
                        : "border border-border hover:border-foreground"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-3 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                {product.stock === 0 ? "Sold Out" : "Add to Bag"}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                `Hi Threadline! I'm interested in: ${product.name} (${formatPrice(product.price)})`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:border-primary transition-colors mb-8"
            >
              <MessageCircle size={16} />
              Ask on WhatsApp
            </a>

            {/* Trust */}
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Truck size={16} className="text-primary" />
                Free delivery on orders over ₦50,000
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ShieldCheck size={16} className="text-primary" />
                Authentic imports — quality guaranteed
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RotateCcw size={16} className="text-primary" />
                7-day easy returns
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}