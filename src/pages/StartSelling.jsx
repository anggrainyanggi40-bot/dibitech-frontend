import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import apiClient from "../api/client";
import { useAuth } from "../context/AuthContext";

function StartSelling() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBecomeSeller = async () => {
    try {
      setLoading(true);

      const response = await apiClient.post("/become-seller");

      updateUser(response.data.data);

      navigate("/seller");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mendaftar sebagai seller");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-[#26364A] bg-[#0D1928] p-8 sm:p-12">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">
            <FiShoppingBag className="text-2xl text-blue-400" />
          </div>

          <h1 className="text-3xl font-bold">Start Selling on DibiTech</h1>

          <p className="mt-4 leading-relaxed text-gray-400">Sell your digital products and reach customers through DibiTech.</p>

          <div className="mt-8 rounded-xl border border-[#26364A] p-5">
            <p className="text-sm text-gray-400">You are registering as</p>

            <p className="mt-1 font-semibold">{user?.name}</p>

            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <button
            onClick={handleBecomeSeller}
            disabled={loading}
            className="
              mt-8 w-full rounded-xl
              bg-blue-600 px-6 py-3
              font-semibold transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : "Become a Seller"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default StartSelling;
