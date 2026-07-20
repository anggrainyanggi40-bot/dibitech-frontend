import { useState } from "react";
import apiClient from "../api/client";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });

      return response.data;
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("ERROR DATA:", err.response?.data);

      setError(err.response?.data?.message || "Login failed");

      throw err;
    } finally {
      setLoading(false);
    }
  };
  return {
    login,
    loading,
    error,
  };
}

export default useLogin;
