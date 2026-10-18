"use client";

import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, Percent } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Authentic imports",
    desc: "Direct from trusted manufacturers. No fakes, no shortcuts.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    desc: "Lagos and Abuja in 1–2 days. Nationwide in 3–5 days.",
  },
  {
    icon: ShieldCheck,
    title: "Easy returns",
    desc: "Wrong size? Changed your mind? Return within 7 days.",
  },
  {
    icon: Percent,
    title: "Bulk discounts",
    desc: "Ordering 10+ pieces? Wholesale pricing available.",
  },
];

export default function BrandStory() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-threadline">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Our story
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight mb-6">
              Imported quality.
              <br />
              <span className="text-muted-foreground">Naija prices.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We got tired of paying ridiculous markups for basic streetwear.
                So we went straight to the source — the same factories that
                supply the brands you already know.
              </p>
              <p>
                Every hoodie, sweater and jogger is inspected before it ships.
                Heavyweight fabrics. Clean stitching. Fits that actually work.
              </p>
              <p>
                Whether you&apos;re buying one piece or stocking your own shop,
                you get the same quality at a price that makes sense.
              </p>
            </div>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 bg-card border border-border rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2 text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}