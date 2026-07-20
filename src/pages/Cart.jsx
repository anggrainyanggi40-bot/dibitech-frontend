import { useEffect, useState } from "react";
import Client from "../api/Client";

function Cart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data cart saat halaman pertama kali dibuka
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await Client.get("/carts");

        setCarts(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  // Menghapus produk dari cart
  const handleDelete = async (id) => {
    try {
      await Client.delete(`/carts/${id}`);

      // Hapus item dari tampilan
      setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
    } catch (error) {
      console.error("Gagal menghapus cart:", error);
    }
  };

  // Menghitung total harga semua produk
  const totalPrice = carts.reduce((total, cart) => total + Number(cart.product.price) * cart.quantity, 0);

  // Tampilan ketika data sedang diambil
  if (loading) {
    return <div className="min-h-screen bg-[#050B16] p-10 text-white">Loading...</div>;
  }
  const handleCheckout = async () => {
    try {
      // 1. Buat order dari isi cart
      const orderResponse = await Client.post("/orders/checkout-cart");

      const orderId = orderResponse.data.data.id;

      // 2. Buat transaksi pembayaran Midtrans
      const paymentResponse = await Client.post(`/orders/${orderId}/payment`);

      const snapToken = paymentResponse.data.data.snap_token;

      // 3. Buka popup Midtrans
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log("Pembayaran berhasil:", result);
        },

        onPending: function (result) {
          console.log("Pembayaran pending:", result);
        },

        onError: function (result) {
          console.log("Pembayaran gagal:", result);
        },

        onClose: function () {
          console.log("Popup pembayaran ditutup");
        },
      });
    } catch (error) {
      console.error("Checkout gagal:", error);

      alert(error.response?.data?.message || "Checkout gagal");
    }
  };

  return (
    <section className="min-h-screen bg-[#050B16] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">My Cart</h1>

        {/* Jika cart kosong */}
        {carts.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            {/* Daftar produk */}
            <div className="space-y-4">
              {carts.map((cart) => (
                <div key={cart.id} className="flex items-center justify-between rounded-xl border border-slate-700 bg-[#0D1928] p-5">
                  <div>
                    {/* Nama produk */}
                    <h2 className="text-lg font-semibold">{cart.product.product_name}</h2>

                    {/* Deskripsi produk */}
                    <p className="mt-1 text-sm text-gray-400">{cart.product.detail_product}</p>

                    {/* Harga produk */}
                    <p className="mt-3 font-semibold text-blue-400">Rp {Number(cart.product.price).toLocaleString("id-ID")}</p>
                  </div>

                  {/* Tombol hapus */}
                  <button onClick={() => handleDelete(cart.id)} className="text-sm text-red-400 transition hover:text-red-300">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-xl border border-slate-700 bg-[#0D1928] p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>

              <div className="my-6 flex justify-between">
                <span className="text-gray-400">Total</span>

                <span className="text-xl font-bold">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>

              {/* Tombol Checkout */}
              <button onClick={handleCheckout} className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
