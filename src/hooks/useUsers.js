import { useEffect, useState } from "react";
import apiClient from "../api/client";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/users");

      setUsers(response.data.data || response.data);
    } catch (err) {
      console.log("FETCH USERS ERROR:", err.response?.data);

      setError(err.response?.data?.message || "Gagal mengambil data users");
    } finally {
      setLoading(false);
    }
  };

  // Hapus user
  const deleteUser = async (id) => {
    try {
      await apiClient.delete(`/users/${id}`);

      // Hapus user dari tampilan tanpa fetch ulang
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      return {
        success: true,
        message: "User berhasil dihapus",
      };
    } catch (err) {
      console.log("DELETE USER ERROR:", err.response?.data);

      return {
        success: false,
        message: err.response?.data?.message || "Gagal menghapus user",
      };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    deleteUser,
  };
}

export default useUsers;
