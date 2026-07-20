import { Outlet } from "react-router-dom";

import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#020914] p-4">
      {/* Wrapper seluruh website */}
      <div
        className="
          mx-auto
          min-h-screen
          max-w-[1440px]
          rounded-2xl
          border
          border-slate-700/60
          bg-[#020914]
          text-white
        "
      >
        <Navbar />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
