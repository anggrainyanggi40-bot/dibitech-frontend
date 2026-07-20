import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

import Logo from "../atoms/Logo";
import Button from "../atoms/Button";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  // State untuk membuka dan menutup menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  // Menutup menu setelah link diklik
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 rounded-t-2xl border-b border-gray-800 bg-[#020914]">
      {/* Navbar */}
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* Menu Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          <Link to="/" className="text-sm text-white hover:text-blue-400">
            Explore
          </Link>

          <Link to="/categories" className="text-sm text-white hover:text-blue-400">
            Categories
          </Link>

          <Link to="/cart" className="text-sm text-white hover:text-blue-400">
            Cart
          </Link>

          {user?.role === "admin" && (
            <Link to="/users" className="text-sm text-white hover:text-blue-400">
              Users
            </Link>
          )}
        </div>

        {/* Login / User Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          {isLoggedIn ? (
            <>
              <p className="text-sm text-white">
                Hi, <span className="font-semibold">{user?.name}</span>
              </p>

              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-3 md:hidden">
          {isLoggedIn && (
            <p className="max-w-28 truncate text-sm text-white">
              Hi, <span className="font-semibold">{user?.name}</span>
            </p>
          )}

          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex h-10 w-10 items-center justify-center text-2xl text-white" aria-label="Toggle menu">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="border-t border-gray-800 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            <Link to="/" onClick={closeMenu} className="text-sm text-white hover:text-blue-400">
              Explore
            </Link>

            <Link to="/categories" onClick={closeMenu} className="text-sm text-white hover:text-blue-400">
              Categories
            </Link>

            <Link to="/cart" onClick={closeMenu} className="text-sm text-white hover:text-blue-400">
              Cart
            </Link>

            {/* Hanya muncul untuk Admin */}
            {user?.role === "admin" && (
              <Link to="/users" onClick={closeMenu} className="text-sm text-white hover:text-blue-400">
                Users
              </Link>
            )}

            {/* Garis pemisah */}
            <div className="border-t border-gray-800" />

            {/* Authentication */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
