import { Link } from "react-router-dom";

function ProductCard({ id, image, title, description, price }) {
  return (
    <Link to={`/products/${id}`} className="block w-[280px] shrink-0 md:w-auto">
      <div className="h-full overflow-hidden rounded-xl border border-slate-700 bg-[#0D1928] transition hover:-translate-y-1 hover:border-blue-500">
        {image && <img src={image} alt={title} className="h-48 w-full object-cover" />}

        <div className="p-5">
          <h3 className="mb-2 font-semibold text-white">{title}</h3>

          <p className="min-h-[60px] text-sm leading-relaxed text-gray-400">{description}</p>

          {price && <p className="mt-4 font-semibold text-blue-400">Rp {Number(price).toLocaleString("id-ID")}</p>}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
