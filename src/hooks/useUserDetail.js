import { useEffect, useState } from "react";
import apiClient from "../api/client";

function useUserDetail(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get(`/users/${id}`);

      // Menyesuaikan jika API mengembalikan:
      // { data: {...} } atau langsung {...}
      setUser(response.data.data || response.data);
    } catch (err) {
      console.log("FETCH USER DETAIL ERROR:", err.response?.data);

      setError(err.response?.data?.message || "Gagal mengambil detail user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail();
    }
  }, [id]);

  return {
    user,
    loading,
    error,
    refetch: fetchUserDetail,
  };
}

export default useUserDetail;
