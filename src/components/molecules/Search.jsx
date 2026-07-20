import { FiSearch } from "react-icons/fi";

function Search({ value, onChange }) {
  return (
    <div className="relative w-full max-w-lg">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search users by name or email..."
        className="
          w-full rounded-lg
          border border-[#26364A]
          bg-[#0A1421]
          py-3 pl-11 pr-4
          text-sm text-white
          outline-none
          placeholder:text-slate-600
          focus:border-blue-500
        "
      />
    </div>
  );
}

export default Search;
