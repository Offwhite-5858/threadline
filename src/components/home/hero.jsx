"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-foreground">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
  src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=90"
  alt="Streetwear"
  className="w-full h-full object-cover opacity-40"
/>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent" />
      </div>

      <div className="container-threadline relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full mb-8"
          >
            <Snowflake size={14} className="text-primary" />
            <span className="text-background/80 text-sm font-medium tracking-wide">
              Winter 2026 Collection
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-background leading-[0.95] tracking-tighter mb-6"
          >
            Wear the cold.
            <br />
            <span className="text-primary">Own the street.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-background/70 text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Premium imported hoodies, sweaters and joggers. Built for the cold,
            priced for Naija. Retail and wholesale available.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/shop"
              className="group px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-base"
            >
              Shop the Collection
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/wholesale"
              className="px-8 py-4 border-2 border-background/30 text-background font-semibold rounded-lg hover:bg-background/10 transition-colors text-base text-center"
            >
              Wholesale Enquiry
            </Link>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-6 mt-12 text-background/50 text-sm"
          >
            <span>✓ Authentic imports</span>
            <span>✓ Fast delivery</span>
            <span>✓ Bulk discounts</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}