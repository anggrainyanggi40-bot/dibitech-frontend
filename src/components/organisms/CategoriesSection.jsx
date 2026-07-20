import { FiMonitor, FiCode } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi";
import { RiRobot2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import CategoryCard from "../molecules/CategoryCard";

function CategoriesSection() {
  const categories = [
    {
      id: 1,
      title: "Productivity",
      description: "Boost efficiency with AI-powered productivity tools.",
      icon: FiMonitor,
      iconStyle: "bg-emerald-200 text-emerald-600",
    },
    {
      id: 2,
      title: "Marketing",
      description: "Enhance your marketing strategy with AI-driven insights.",
      icon: HiOutlineMegaphone,
      iconStyle: "bg-blue-100 text-blue-500",
    },
    {
      id: 3,
      title: "Code",
      description: "Accelerate your coding with intelligent AI assistants.",
      icon: FiCode,
      iconStyle: "bg-purple-300 text-purple-700",
    },
    {
      id: 4,
      title: "Design",
      description: "Unleash your creativity with AI-enhanced design tools.",
      icon: PiPlant,
      iconStyle: "bg-green-200 text-green-600",
    },
    {
      id: 5,
      title: "AI Tools",
      description: "Explore a wide range of innovative AI tools.",
      icon: RiRobot2Line,
      iconStyle: "bg-indigo-300 text-indigo-700",
    },
  ];

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Categories</h2>

          <Link to="/categories" className="text-sm text-blue-400 hover:text-blue-300">
            View all categories →
          </Link>
        </div>

        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} icon={category.icon} title={category.title} description={category.description} iconStyle={category.iconStyle} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
