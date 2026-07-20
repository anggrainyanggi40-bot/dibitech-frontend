import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import Button from "../atoms/Button";
import heroImage from "../../assets/images/hero.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative flex min-h-[520px] items-center overflow-hidden bg-cover bg-center px-6"
      style={{
        backgroundImage: `
      linear-gradient(
        90deg,
        rgba(2, 9, 20, 0.95) 0%,
        rgba(2, 9, 20, 0.85) 40%,
        rgba(2, 9, 20, 0.2) 100%
      ),
      url(${heroImage})
    `,
      }}
    >
      {/* Glow biru di kiri */}
      <div
        className="
    pointer-events-none
    absolute
    -left-10
    top-1/2
    h-[400px]
    w-[300px]
    -translate-y-1/2
    rounded-full
    bg-blue-600/40
    blur-[100px]
  "
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-xl">
          <span className="rounded-full bg-white/10 px-4 py-2 text-xs">AI-Powered Marketplace</span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Discover the
            <br />
            Future of Work
            <br />
            with <span className="text-blue-500">AI</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">Explore a curated marketplace of AI-powered tools designed to transform your workflow and unlock new possibilities.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button className="w-full sm:w-auto" onClick={() => navigate("/products")}>
              <span className="flex items-center justify-center gap-2">
                Explore Products
                <FiArrowRight />
              </span>
            </Button>

            <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate("/start-selling")}>
              <span className="flex items-center justify-center gap-2">
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

export default Hero;
