import { useEffect, useState } from "react";
import ProductCard from "../components/molecules/ProductCard";
import Client from "../api/Client";

import product1 from "../assets/images/Trending1.png";
import product2 from "../assets/images/Trending2.png";
import product3 from "../assets/images/Trending3.png";
import product4 from "../assets/images/Trending4.png";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const images = [product1, product2, product3, product4];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([Client.get("/products"), Client.get("/categories")]);

        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter berdasarkan search dan category
  const filteredProducts = products.filter((product) => {
    const keyword = search.toLowerCase();

    const matchesSearch = product.product_name?.toLowerCase().includes(keyword) || product.detail_product?.toLowerCase().includes(keyword);

    const matchesCategory = selectedCategory === "all" || product.category_id === Number(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="min-h-screen bg-[#020914] p-10 text-white">Loading products...</div>;
  }

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">All Products</h1>

          <p className="mt-2 text-sm text-gray-400">Explore digital products from our creators.</p>
        </div>

        {/* Search dan Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full rounded-xl
              border border-slate-700
              bg-[#0D1928]
              px-4 py-3
              text-sm text-white
              outline-none
              placeholder:text-gray-500
              focus:border-blue-500
            "
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="
              rounded-xl
              border border-slate-700
              bg-[#0D1928]
              px-4 py-3
              text-sm text-white
              outline-none
              focus:border-blue-500
              sm:w-[220px]
            "
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah hasil */}
        <p className="mb-5 text-sm text-gray-400">Showing {filteredProducts.length} products</p>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-[#0D1928] py-16 text-center">
            <p className="text-gray-400">No products found.</p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-sm text-blue-400 hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} id={product.id} image={images[index % images.length]} title={product.product_name} description={product.detail_product} price={product.price} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
