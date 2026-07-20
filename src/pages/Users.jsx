import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import useUsers from "../hooks/useUsers";
import Search from "../components/molecules/Search";
import Pagination from "../components/molecules/Pagination";
import UsersTable from "../components/organisms/UsersTable";

function Users() {
  const { users, loading, error, deleteUser } = useUsers();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("all");
  const usersPerPage = 5;
  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    const matchesSearch = user.name?.toLowerCase().includes(keyword) || user.email?.toLowerCase().includes(keyword);

    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) {
    return <div className="min-h-screen bg-[#020914] p-10 text-white">Loading users...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#020914] p-10 text-red-400">{error}</div>;
  }

  return (
    <section className="min-h-screen bg-[#020914] px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="mt-1 text-sm text-slate-400">Manage and view all registered users.</p>
        </div>

        {/* Search & Filter */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <Search
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="flex items-center gap-2">
            <FiFilter className="text-slate-400" />

            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="
      rounded-lg border border-[#26364A]
      bg-[#020914] px-4 py-3
      text-sm text-white
      outline-none transition
      hover:bg-white/5
      focus:border-blue-500
    "
            >
              <option className="bg-[#0D1928]" value="all">
                All Roles
              </option>
              <option className="bg-[#0D1928]" value="buyer">
                Buyer
              </option>
              <option className="bg-[#0D1928]" value="seller">
                Seller
              </option>
              <option className="bg-[#0D1928]" value="admin">
                Admin
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#26364A]">
          {/* Table bisa scroll horizontal */}
          <div className="no-scrollbar overflow-x-auto">
            <UsersTable users={currentUsers} startIndex={startIndex} onDelete={deleteUser} />
          </div>

          {/* Pagination tidak ikut scroll */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} startIndex={startIndex} endIndex={endIndex} totalUsers={filteredUsers.length} />
        </div>
      </div>
    </section>
  );
}

export default Users;
