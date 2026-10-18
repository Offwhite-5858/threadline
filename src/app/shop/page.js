"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/shop/product-card";
import Filters from "@/components/shop/filters";
import SearchBar from "@/components/shop/search-bar";
import SortDropdown from "@/components/shop/sort-dropdown";
import { products, categories } from "@/lib/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allSizes = useMemo(() => {
    const s = new Set();
    products.forEach((p) => p.sizes.forEach((size) => s.add(size)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (size) {
      list = list.filter((p) => p.sizes.includes(size));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [category, size, search, sort]);

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) + (size ? 1 : 0) + (search ? 1 : 0);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container-threadline py-12 md:py-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Shop
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
            All products
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}{" "}
            available. Premium imported streetwear, ready to ship.
          </p>
        </div>
      </div>

      <div className="container-threadline py-8 md:py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex gap-2">
            <SortDropdown value={sort} onChange={setSort} />
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border border-border rounded-lg text-sm font-medium hover:border-primary transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <Filters
              categories={categories}
              sizes={allSizes}
              category={category}
              size={size}
              onCategoryChange={setCategory}
              onSizeChange={setSize}
              onClear={() => {
                setCategory("all");
                setSize("");
                setSearch("");
              }}
            />
          </aside>

          {/* Mobile filters drawer */}
          {mobileFiltersOpen && (
            <>
              <div
                className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background z-50 p-6 overflow-y-auto lg:hidden shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>
                <Filters
                  categories={categories}
                  sizes={allSizes}
                  category={category}
                  size={size}
                  onCategoryChange={(c) => {
                    setCategory(c);
                    setMobileFiltersOpen(false);
                  }}
                  onSizeChange={(s) => {
                    setSize(s);
                    setMobileFiltersOpen(false);
                  }}
                  onClear={() => {
                    setCategory("all");
                    setSize("");
                    setSearch("");
                    setMobileFiltersOpen(false);
                  }}
                />
              </div>
            </>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Try adjusting your filters or search.
                </p>
                <button
                  onClick={() => {
                    setCategory("all");
                    setSize("");
                    setSearch("");
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="container-threadline py-20 text-center text-muted-foreground">
          Loading products...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}