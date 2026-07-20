import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/templates/MainLayout";
import AdminRoute from "./components/organisms/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import StartSelling from "./pages/StartSelling";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SellerRoute from "./components/organisms/SellerRoute";

function App() {
  return (
    <Routes>
      {/* Halaman dengan Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoryProducts />} />

        <Route path="/products" element={<Products />} />

        <Route path="/start-selling" element={<StartSelling />} />

        <Route path="/seller" element={<SellerDashboard />} />
        {/* Product Detail */}
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Seller */}
        <Route element={<SellerRoute />}>
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/products/create" element={<AddProduct />} />
          <Route path="/seller/products/:id/edit" element={<EditProduct />} />
        </Route>

        {/* Halaman khusus Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Route>
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
