import { useState } from "react";
import apiClient from "../api/client";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/register", formData);

      return response.data;
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("ERROR DATA:", err.response?.data);

      setError(err.response?.data?.message || "Register gagal");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
  };
}

export default useRegister;
