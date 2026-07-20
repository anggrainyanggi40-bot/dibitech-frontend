import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/molecules/ProductCard";

function CategoryProducts() {
  const { id } = useParams();

  const { products, loading, error } = useProducts();

  const categoryProducts = products.filter((product) => Number(product.category_id) === Number(id));

  if (loading) {
    return <div className="min-h-screen px-6 py-10 text-white">Loading products...</div>;
  }

  if (error) {
    return <div className="min-h-screen px-6 py-10 text-red-400">{error}</div>;
  }

  return (
    <section className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link to="/categories" className="mb-6 inline-block text-sm text-blue-400">
          ← Back to Categories
        </Link>

        <h1 className="text-3xl font-bold text-white">Products</h1>

        <p className="mt-2 text-sm text-gray-400">Explore products in this category.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} id={product.id} title={product.product_name} description={product.detail_product} price={product.price} />
          ))}
        </div>

        {categoryProducts.length === 0 && <div className="mt-8 rounded-xl border border-slate-700 bg-[#0D1928] p-10 text-center text-gray-400">No products found in this category.</div>}
      </div>
    </section>
  );
}

export default CategoryProducts;
