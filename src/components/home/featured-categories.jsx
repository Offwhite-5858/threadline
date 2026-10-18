"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/products";

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-threadline">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Categories
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
              Shop by category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors group"
          >
            View all
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/shop?category=${category.slug}`}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-background tracking-tight mb-1">
                    {category.name}
                  </h3>
                  <p className="text-background/70 text-sm">{category.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} className="text-background" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}