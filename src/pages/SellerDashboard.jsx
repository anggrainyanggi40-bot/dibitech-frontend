import { useEffect, useState } from "react";
import { FiPlus, FiPackage, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

function SellerDashboard() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Apakah kamu yakin ingin menghapus produk ini?");

    if (!confirmed) return;

    try {
      await apiClient.delete(`/products/${productId}`);

      // Langsung hapus dari state tanpa reload halaman
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

      alert("Produk berhasil dihapus");
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Gagal menghapus produk");
    }
  };

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await apiClient.get("/seller/products");

        setProducts(response.data.data || []);
      } catch (error) {
        console.error("GET SELLER PRODUCTS ERROR:", error);

        setError(error.response?.data?.message || "Gagal mengambil produk seller");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>

            <p className="mt-2 text-gray-400">Welcome back, {user?.name}. Manage your digital products here.</p>
          </div>

          <button onClick={() => navigate("/seller/products/create")} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500">
            <FiPlus />
            Add Product
          </button>
        </div>

        {/* Total Products */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#26364A] bg-[#0D1928] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <FiPackage className="text-xl text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Total Products</p>

                <p className="mt-1 text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Products */}
        <div className="mt-10">
          <h2 className="text-xl font-bold">My Products</h2>

          {loading && <div className="mt-5 rounded-xl border border-[#26364A] bg-[#0D1928] p-10 text-center text-gray-400">Loading products...</div>}

          {!loading && error && <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">{error}</div>}

          {!loading && !error && products.length === 0 && (
            <div className="mt-5 rounded-xl border border-[#26364A] bg-[#0D1928] px-6 py-16 text-center">
              <FiPackage className="mx-auto text-4xl text-gray-500" />

              <h3 className="mt-4 font-semibold">No products yet</h3>

              <p className="mt-2 text-sm text-gray-400">Start selling by adding your first digital product.</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="rounded-xl border border-[#26364A] bg-[#0D1928] p-5">
                  <h3 className="font-semibold">{product.product_name}</h3>

                  <p className="mt-2 min-h-[40px] text-sm text-gray-400">{product.detail_product}</p>

                  <p className="mt-5 font-semibold text-blue-400">Rp {Number(product.price).toLocaleString("id-ID")}</p>

                  <div className="mt-5 flex gap-3 border-t border-[#26364A] pt-4">
                    <button
                      onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#26364A] px-4 py-2 text-sm transition hover:border-blue-500 hover:text-blue-400"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    <button onClick={() => handleDelete(product.id)} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10">
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SellerDashboard;
