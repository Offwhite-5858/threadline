"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/shop/product-card";
import { getFeaturedProducts } from "@/lib/data/products";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container-threadline">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Featured
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
              This season&apos;s picks
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors group"
          >
            Shop all
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}