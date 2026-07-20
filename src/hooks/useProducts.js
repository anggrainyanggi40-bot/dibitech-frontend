import { useEffect, useState } from "react";
import apiClient from "../api/client";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/products");

      setProducts(response.data.data || response.data);
    } catch (err) {
      console.log("FETCH PRODUCTS ERROR:", err.response?.data);

      setError(err.response?.data?.message || "Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;
