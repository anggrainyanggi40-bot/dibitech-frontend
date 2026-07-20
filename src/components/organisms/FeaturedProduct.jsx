import { FiArrowRight, FiStar } from "react-icons/fi";

import Button from "../atoms/Button";
import featuredImage from "../../assets/images/Featured.png";

function FeaturedProduct() {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold">Featured Product</h2>

        <div className="grid overflow-hidden rounded-xl border border-slate-700 bg-[#0D1928] md:grid-cols-2">
          {/* Image */}
          <div className="h-[220px] sm:h-[280px] md:h-[320px]">
            <img src={featuredImage} alt="Featured Product" className="h-full w-full object-cover" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-5 sm:p-8">
            <span className="mb-4 flex w-fit items-center gap-2 rounded-full bg-blue-900 px-3 py-2 text-xs">
              <FiStar />
              Top Rated
            </span>

            <h3 className="mb-3 text-2xl font-bold sm:text-3xl">Top Rated AI Tool</h3>

            <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-400 sm:text-base">Revolutionize your workflow with this highly-rated AI tool. Experience unparalleled efficiency and innovation.</p>

            <div>
              <Button>
                <span className="flex items-center gap-2">
                  Learn More
                  <FiArrowRight />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProduct;
