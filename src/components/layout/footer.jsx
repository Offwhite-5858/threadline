import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data/site";

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container-threadline py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-extrabold text-3xl tracking-tighter mb-4">
              THREAD<span className="text-primary">LINE</span>
            </h3>
            <p className="text-background/60 text-sm max-w-md leading-relaxed">
              {siteConfig.tagline}. Premium imported streetwear for those who
              know quality when they see it.
            </p>
            <div className="flex gap-3 mt-6">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-background/20 rounded-full hover:bg-primary hover:border-primary transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border border-background/20 rounded-full hover:bg-primary hover:border-primary transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 border border-background/20 rounded-full hover:bg-primary hover:border-primary transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="p-2 border border-background/20 rounded-full hover:bg-primary hover:border-primary transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="text-background/70 hover:text-background transition-colors">All Products</Link></li>
              <li><Link href="/shop?category=hoodies" className="text-background/70 hover:text-background transition-colors">Hoodies</Link></li>
              <li><Link href="/shop?category=sweaters" className="text-background/70 hover:text-background transition-colors">Sweaters</Link></li>
              <li><Link href="/shop?category=joggers" className="text-background/70 hover:text-background transition-colors">Joggers</Link></li>
              <li><Link href="/wholesale" className="text-background/70 hover:text-background transition-colors">Wholesale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/40">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href={`mailto:${siteConfig.email}`} className="text-background/70 hover:text-background transition-colors">Contact</a></li>
              <li><Link href="/shipping" className="text-background/70 hover:text-background transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-background/70 hover:text-background transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="text-background/70 hover:text-background transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Threadline. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}