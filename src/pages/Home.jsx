import Hero from "../components/organisms/Hero";
import CategoriesSection from "../components/organisms/CategoriesSection";
import FeaturedProduct from "../components/organisms/FeaturedProduct";
import TrendingProducts from "../components/organisms/TrendingProducts";
import CTASection from "../components/organisms/CTASection";

function Home() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProduct />
      <TrendingProducts />
      <CTASection />
    </>
  );
}

export default Home;
