"use client";

import { X } from "lucide-react";

export default function Filters({
  categories,
  sizes,
  category,
  size,
  onCategoryChange,
  onSizeChange,
  onClear,
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm uppercase tracking-wider">Filters</h3>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("all")}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              category === "all"
                ? "bg-primary text-white font-medium"
                : "hover:bg-muted"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                category === cat.slug
                  ? "bg-primary text-white font-medium"
                  : "hover:bg-muted"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => onSizeChange(size === s ? "" : s)}
              className={`w-11 h-11 rounded-lg text-sm font-medium transition-colors ${
                size === s
                  ? "bg-primary text-white"
                  : "border border-border hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}