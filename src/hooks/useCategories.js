import { useEffect, useState } from "react";
import apiClient from "../api/client";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/categories");

      setCategories(response.data.data || response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil data kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}

export default useCategories;
