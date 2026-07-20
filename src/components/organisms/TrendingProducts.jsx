import { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import Client from "../../api/Client";
import { Link } from "react-router-dom";

import product1 from "../../assets/images/Trending1.png";
import product2 from "../../assets/images/Trending2.png";
import product3 from "../../assets/images/Trending3.png";
import product4 from "../../assets/images/Trending4.png";

function TrendingProducts() {
  const [products, setProducts] = useState([]);

  const images = [product1, product2, product3, product4];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Client.get("/products");

        // Ambil 4 produk pertama untuk Trending
        setProducts(response.data.data.slice(0, 4));
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Product</h2>

          <Link to="/products" className="text-sm text-blue-400 transition hover:text-blue-300">
            View all products →
          </Link>
        </div>

        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} id={product.id} image={images[index]} title={product.product_name} description={product.detail_product} price={product.price} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingProducts;
