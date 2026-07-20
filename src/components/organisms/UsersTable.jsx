import { Link } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";

import RoleTag from "../atoms/RoleTag";

function UsersTable({ users, startIndex, onDelete }) {
  const handleDelete = async (user) => {
    const isConfirmed = window.confirm(`Apakah kamu yakin ingin menghapus user "${user.name}"?`);

    if (!isConfirmed) return;

    const result = await onDelete(user.id);

    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <table className="w-full min-w-[850px] text-left">
      <thead className="bg-[#0A1421]">
        <tr className="border-b border-[#26364A] text-xs text-slate-400">
          <th className="px-5 py-4">#</th>
          <th className="px-5 py-4">Name</th>
          <th className="px-5 py-4">Email</th>
          <th className="px-5 py-4">Phone Number</th>
          <th className="px-5 py-4">Role</th>
          <th className="px-5 py-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.id}
            className="
              border-b border-[#26364A]
              bg-[#07111F]
              text-sm
              last:border-b-0
              hover:bg-[#0A1625]
            "
          >
            <td className="px-5 py-4 text-slate-400">{startIndex + index + 1}</td>

            <td className="px-5 py-4 font-medium">{user.name}</td>

            <td className="px-5 py-4 text-slate-400">{user.email}</td>

            <td className="px-5 py-4 text-slate-400">{user.phone_number || "-"}</td>

            <td className="px-5 py-4">
              <RoleTag role={user.role} />
            </td>

            <td className="px-5 py-4">
              <div className="flex items-center justify-center gap-2">
                {/* Detail */}
                <Link
                  to={`/users/${user.id}`}
                  className="
                    inline-flex items-center gap-2
                    rounded-lg border border-[#26364A]
                    px-3 py-2 text-xs
                    transition
                    hover:border-blue-500
                    hover:text-blue-400
                  "
                >
                  <FiEye />
                  Detail
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(user)}
                  className="
                    inline-flex items-center gap-2
                    rounded-lg border border-red-500/30
                    px-3 py-2 text-xs text-red-400
                    transition
                    hover:border-red-500
                    hover:bg-red-500/10
                  "
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}

        {users.length === 0 && (
          <tr>
            <td colSpan="6" className="bg-[#07111F] px-5 py-10 text-center text-sm text-slate-400">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UsersTable;
