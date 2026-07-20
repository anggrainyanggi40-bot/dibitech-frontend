import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SellerRoute() {
  const { user, isLoggedIn } = useAuth();

  // Belum login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Login tapi bukan seller
  if (user?.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default SellerRoute;
