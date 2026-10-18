export const siteConfig = {
  name: "Threadline",
  tagline: "Imported quality. Naija prices.",
  description:
    "Premium imported hoodies, sweaters and joggers for the cold. Retail and wholesale.",
  url: "https://threadline.vercel.app",
  whatsapp: "2348000000000",
  email: "hello@threadline.ng",
  instagram: "https://instagram.com/threadline",
  twitter: "https://twitter.com/threadline",
  announcement: "Free delivery on orders over ₦50,000 — Lagos & Abuja",
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};