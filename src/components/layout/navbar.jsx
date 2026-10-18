"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/lib/store/cart";
import { siteConfig } from "@/lib/data/site";
import CartDrawer from "@/components/cart/cart-drawer";
import ThemeToggle from "@/components/shared/theme-toggle";

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Hoodies", href: "/shop?category=hoodies" },
  { name: "Sweaters", href: "/shop?category=sweaters" },
  { name: "Joggers", href: "/shop?category=joggers" },
  { name: "Wholesale", href: "/wholesale" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCart((s) => s.totalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-foreground text-background text-center text-xs py-2 px-4 tracking-wide">
        {siteConfig.announcement}
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-border"
            : "bg-background"
        }`}
      >
        <div className="container-threadline">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="font-extrabold text-2xl tracking-tighter">
              THREAD<span className="text-primary">LINE</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:block">
                <Search size={20} strokeWidth={1.5} />
              </button>

              <ThemeToggle />

              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 border-t border-border" : "max-h-0"
          }`}
        >
          <nav className="container-threadline py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-base font-medium hover:bg-muted rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}