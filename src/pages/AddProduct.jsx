import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

function AddProduct() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    detail_product: "",
    category_id: "",
    price: "",
    file_size: "",
    file_url: "",
    stock: 1,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await apiClient.post("/products", {
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        file_size: Number(form.file_size),
        stock: Number(form.stock),
      });

      alert("Produk berhasil ditambahkan");

      navigate("/seller");
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Gagal menambahkan produk");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-xl border border-[#26364A] bg-[#07111F] px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-blue-500";

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate("/seller")} className="mb-6 text-sm text-blue-400 hover:text-blue-300">
          ← Back to Seller Dashboard
        </button>

        <div className="rounded-2xl border border-[#26364A] bg-[#0D1928] p-8">
          <h1 className="text-3xl font-bold">Add Product</h1>

          <p className="mt-2 text-gray-400">Add a new digital product to your store.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="text-sm text-gray-300">Product Name</label>

              <input type="text" name="product_name" value={form.product_name} onChange={handleChange} placeholder="Enter product name" className={inputClass} required />
            </div>

            <div>
              <label className="text-sm text-gray-300">Description</label>

              <textarea name="detail_product" value={form.detail_product} onChange={handleChange} placeholder="Describe your product" rows="4" className={inputClass} />
            </div>

            <div>
              <label className="text-sm text-gray-300">Category</label>

              <select name="category_id" value={form.category_id} onChange={handleChange} className={inputClass} required>
                <option value="">Select category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-[#07111F]">
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm text-gray-300">Price</label>

                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="50000" min="0" className={inputClass} required />
              </div>

              <div>
                <label className="text-sm text-gray-300">File Size (MB)</label>

                <input type="number" name="file_size" value={form.file_size} onChange={handleChange} placeholder="5" min="0" className={inputClass} required />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300">Product File</label>

              <input type="text" name="file_url" value={form.file_url} onChange={handleChange} placeholder="example-product.zip" className={inputClass} required />

              <p className="mt-2 text-xs text-gray-500">Untuk sementara kita simpan nama/path file terlebih dahulu.</p>
            </div>

            <div>
              <label className="text-sm text-gray-300">Stock</label>

              <input type="number" name="stock" value={form.stock} onChange={handleChange} min="1" className={inputClass} required />
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddProduct;
