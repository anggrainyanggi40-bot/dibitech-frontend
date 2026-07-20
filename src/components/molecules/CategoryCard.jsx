function CategoryCard({ icon, title, description, iconStyle }) {
  const Icon = icon;

  return (
    <div className="w-[240px] shrink-0 rounded-xl border border-slate-700 bg-[#0D1928] p-5 md:w-auto">
      <div
        className={`
          mb-5 flex h-16 w-16
          items-center justify-center
          rounded-xl text-3xl
          ${iconStyle}
        `}
      >
        <Icon />
      </div>

      <h3 className="mb-2 font-semibold text-white">{title}</h3>

      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  );
}

export default CategoryCard;
