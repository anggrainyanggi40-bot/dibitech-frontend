function Pagination({ currentPage, totalPages, onPageChange, startIndex, endIndex, totalUsers }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col gap-4 border-t border-[#26364A] bg-[#07111F] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-400">
        Showing <span className="text-white">{startIndex + 1}</span>
        {" to "}
        <span className="text-white">{Math.min(endIndex, totalUsers)}</span>
        {" of "}
        <span className="text-white">{totalUsers}</span>
        {" users"}
      </p>

      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto sm:w-auto">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                flex h-9 w-9 items-center justify-center
                rounded-lg border text-sm transition
                ${currentPage === page ? "border-blue-600 bg-blue-600 text-white" : "border-[#26364A] bg-[#0A1421] text-slate-400 hover:text-white"}
              `}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Pagination;
