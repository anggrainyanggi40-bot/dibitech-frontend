import { FiMonitor, FiCode, FiBookOpen, FiLayout, FiArrowRight } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";

function Categories() {
  const { categories, loading, error } = useCategories();

  const categoryStyles = {
    Productivity: {
      icon: FiMonitor,
      style: "bg-emerald-200 text-emerald-600",
    },
    Marketing: {
      icon: HiOutlineMegaphone,
      style: "bg-blue-100 text-blue-500",
    },
    Code: {
      icon: FiCode,
      style: "bg-purple-300 text-purple-700",
    },
    Design: {
      icon: PiPlant,
      style: "bg-green-200 text-green-600",
    },
    "AI Tools": {
      icon: RiRobot2Line,
      style: "bg-indigo-300 text-indigo-700",
    },
    Ebook: {
      icon: FiBookOpen,
      style: "bg-orange-200 text-orange-600",
    },
    Template: {
      icon: FiLayout,
      style: "bg-pink-200 text-pink-600",
    },
  };

  if (loading) {
    return <div className="min-h-screen px-6 py-10 text-white">Loading categories...</div>;
  }

  if (error) {
    return <div className="min-h-screen px-6 py-10 text-red-400">{error}</div>;
  }

  return (
    <section className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Explore Categories</h1>

          <p className="mt-2 text-sm text-gray-400">Browse digital products by category.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryStyle = categoryStyles[category.category_name] || {
              icon: FiLayout,
              style: "bg-slate-200 text-slate-600",
            };

            const Icon = categoryStyle.icon;

            return (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="
      group rounded-xl
      border border-slate-700
      bg-[#0D1928] p-6
      transition duration-300
      hover:-translate-y-1
      hover:border-blue-500
    "
              >
                <div
                  className={`
        mb-6 flex h-14 w-14
        items-center justify-center
        rounded-xl text-2xl
        ${categoryStyle.style}
      `}
                >
                  <Icon />
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-white">{category.category_name}</h2>

                  <FiArrowRight className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
