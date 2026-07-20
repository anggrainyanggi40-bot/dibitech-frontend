import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Client from "../api/Client";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setIsLoading(true);

        const response = await Client.get(`/products/${id}`);

        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Gagal mengambil detail produk");
      } finally {
        setIsLoading(false);
      }
    };

    getProductDetail();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#080D19] text-white flex items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return <div className="min-h-screen bg-[#080D19] text-white flex items-center justify-center">{error || "Produk tidak ditemukan"}</div>;
  }
  const handleBuyNow = async () => {
    try {
      // 1. Buat order
      const orderResponse = await Client.post("/orders", {
        product_id: product.id,
      });

      const orderId = orderResponse.data.data.id;

      // 2. Buat payment
      const paymentResponse = await Client.post(`/orders/${orderId}/payment`);

      // 3. Ambil Snap Token
      const snapToken = paymentResponse.data.data.snap_token;

      // 4. Buka popup Midtrans
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Pembayaran berhasil:", result);
        },

        onPending: (result) => {
          console.log("Pembayaran pending:", result);
        },

        onError: (result) => {
          console.log("Pembayaran gagal:", result);
        },

        onClose: () => {
          console.log("Popup pembayaran ditutup");
        },
      });
    } catch (error) {
      console.error("Gagal melakukan pembayaran:", error.response?.data || error);
    }
  };
  const handleAddToCart = async () => {
    try {
      const response = await Client.post("/carts", {
        product_id: product.id,
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menambahkan produk ke cart");
    }
  };
  return (
    <main className="min-h-screen bg-[#080D19] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="h-[400px] bg-[#111827] rounded-3xl flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>

          {/* Product Information */}
          <div>
            <span className="text-blue-400 text-sm">{product.category?.category_name}</span>

            <h1 className="text-4xl font-bold mt-3">{product.product_name}</h1>

            <p className="text-gray-400 mt-5 leading-7">{product.detail_product}</p>

            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <p>
                Seller: <span className="text-white">{product.seller?.name}</span>
              </p>

              <p>
                File Size: <span className="text-white">{product.file_size} MB</span>
              </p>
            </div>

            <p className="text-3xl font-bold mt-8">Rp {Number(product.price).toLocaleString("id-ID")}</p>

            <div className="mt-8 flex gap-3">
              <button onClick={handleAddToCart} className="rounded-xl border border-blue-500 px-10 py-3 font-semibold text-blue-400 transition hover:bg-blue-500/10">
                Add to Cart
              </button>

              <button onClick={handleBuyNow} className="rounded-xl bg-blue-600 px-10 py-3 font-semibold transition hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
