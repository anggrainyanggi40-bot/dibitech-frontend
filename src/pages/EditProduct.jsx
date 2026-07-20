import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../api/client";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    product_name: "",
    detail_product: "",
    category_id: "",
    price: "",
    file_size: "",
    file_url: "",
    stock: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([apiClient.get(`/products/${id}`), apiClient.get("/categories")]);

        const product = productResponse.data.data;

        setForm({
          product_name: product.product_name || "",
          detail_product: product.detail_product || "",
          category_id: product.category_id || "",
          price: product.price || "",
          file_size: product.file_size || "",
          file_url: product.file_url || "",
          stock: product.stock || "",
        });

        setCategories(categoryResponse.data.data || []);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data produk");
        navigate("/seller");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

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
      setSaving(true);

      await apiClient.put(`/products/${id}`, {
        ...form,
        category_id: Number(form.category_id),
        price: Number(form.price),
        file_size: Number(form.file_size),
        stock: Number(form.stock),
      });

      alert("Produk berhasil diupdate");
      navigate("/seller");
    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data);

      alert(error.response?.data?.message || "Gagal mengupdate produk");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "mt-2 w-full rounded-xl border border-[#26364A] bg-[#07111F] px-4 py-3 text-white outline-none focus:border-blue-500";

  if (loading) {
    return <div className="min-h-screen bg-[#020914] p-10 text-white">Loading product...</div>;
  }

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate("/seller")} className="mb-6 text-sm text-blue-400">
          ← Back to Seller Dashboard
        </button>

        <div className="rounded-2xl border border-[#26364A] bg-[#0D1928] p-8">
          <h1 className="text-3xl font-bold">Edit Product</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label>Product Name</label>
              <input name="product_name" value={form.product_name} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label>Description</label>
              <textarea name="detail_product" value={form.detail_product} onChange={handleChange} rows="4" className={inputClass} />
            </div>

            <div>
              <label>Category</label>
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
                <label>Price</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} required />
              </div>

              <div>
                <label>File Size (MB)</label>
                <input type="number" name="file_size" value={form.file_size} onChange={handleChange} className={inputClass} required />
              </div>
            </div>

            <div>
              <label>Product File</label>
              <input name="file_url" value={form.file_url} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label>Stock</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} className={inputClass} required />
            </div>

            <button type="submit" disabled={saving} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditProduct;
