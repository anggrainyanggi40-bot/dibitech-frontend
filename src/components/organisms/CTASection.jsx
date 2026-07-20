import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Button from "../atoms/Button";

function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="px-6 py-6">
      <div
        className="
          mx-auto max-w-7xl
          rounded-xl
          border border-blue-500/40
          bg-gradient-to-r
          from-purple-950
          via-[#101B3A]
          to-blue-950
          p-8
        "
      >
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div
              className="
                flex h-16 w-16 shrink-0
                items-center justify-center
                rounded-xl
                bg-purple-500/20
              "
            >
              <HiOutlineRocketLaunch className="text-3xl" />
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">Ready to transform your workflow?</h2>

              <p className="text-sm text-gray-300">Explore thousands of AI-powered tools or start selling your own products today.</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex gap-4">
            <Button onClick={() => navigate("/products")}>
              <span className="flex items-center gap-2">
                Explore Products
                <FiArrowRight />
              </span>
            </Button>

            <Button variant="outline" onClick={() => navigate("/start-selling")}>
              <span className="flex items-center gap-2">
                Start Selling
                <FiShoppingBag />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
