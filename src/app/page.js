import Hero from "@/components/home/hero";
import Marquee from "@/components/home/marquee";
import FeaturedCategories from "@/components/home/featured-categories";
import FeaturedProducts from "@/components/home/featured-products";
import BrandStory from "@/components/home/brand-story";
import Newsletter from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandStory />
      <Newsletter />
    </>
  );
}