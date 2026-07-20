function Button({ children, variant = "primary", className = "", type = "button", ...props }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 border border-blue-600",
    outline: "bg-transparent hover:bg-white/5 border border-slate-600",
  };

  return (
    <button
      type={type}
      {...props}
      className={`
        rounded-lg px-5 py-3
        text-sm font-medium text-white
        transition
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
