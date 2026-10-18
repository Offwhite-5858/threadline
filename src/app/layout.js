import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/shared/smooth-scroll";
import WhatsAppButton from "@/components/shared/whatsapp-button";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://threadline.vercel.app"),
  title: {
    default: "Threadline — Premium Streetwear. Imported Quality. Naija Prices.",
    template: "%s | Threadline",
  },
  description:
    "Premium imported hoodies, sweaters and joggers. Retail and wholesale. Fast delivery across Nigeria.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Threadline",
    title: "Threadline — Premium Streetwear",
    description:
      "Imported quality. Naija prices. Shop hoodies, sweaters & joggers.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${poppins.className} antialiased`}
      >
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="bottom-right" richColors />
        </SmoothScroll>
      </body>
    </html>
  );
}