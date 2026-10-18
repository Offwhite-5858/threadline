"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated subscribe — wire to Supabase later
    await new Promise((r) => setTimeout(r, 800));
    toast.success("You're in! Watch your inbox for drops.");
    setEmail("");
    setLoading(false);
  };

  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="container-threadline">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-background tracking-tighter mb-4">
            Get the drop first.
          </h2>
          <p className="text-background/60 mb-8 leading-relaxed">
            New arrivals, restocks and wholesale offers. No spam, just heat.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 bg-background/5 border border-background/20 text-background placeholder:text-background/40 rounded-lg outline-none focus:border-primary transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="group px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? "Subscribing..." : "Subscribe"}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}