function RoleTag({ role }) {
  const variants = {
    admin: "bg-purple-500/15 text-purple-400",
    seller: "bg-green-500/15 text-green-400",
    buyer: "bg-blue-500/15 text-blue-400",
  };

  return (
    <span
      className={`
        rounded-full px-3 py-1
        text-xs font-medium capitalize
        ${variants[role] || "bg-slate-500/15 text-slate-400"}
      `}
    >
      {role}
    </span>
  );
}

export default RoleTag;
