"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/data/site";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const image = hovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-muted mb-3">
        <img
          src={image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded">
            {product.badge}
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-background font-bold text-sm uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-sm md:text-base leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}