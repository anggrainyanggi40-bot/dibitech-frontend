import { Link, useParams } from "react-router-dom";
import { FiChevronRight, FiMail, FiPhone, FiUser } from "react-icons/fi";

import useUserDetail from "../hooks/useUserDetail";

function UserDetail() {
  const { id } = useParams();
  const { user, loading, error } = useUserDetail(id);

  if (loading) {
    return <div className="min-h-screen bg-[#020914] p-10 text-white">Loading user...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#020914] p-10 text-red-400">{error}</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-[#020914] p-10 text-white">User tidak ditemukan.</div>;
  }

  return (
    <section className="min-h-screen bg-[#020914] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs">
          <Link to="/users" className="text-blue-400 transition hover:text-blue-300">
            Users
          </Link>

          <FiChevronRight className="text-slate-600" />

          <span className="text-slate-400">User Detail</span>
        </div>

        {/* User Header */}
        <div className="mb-6 rounded-xl border border-[#26364A] bg-[#07111F] p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* User Profile */}
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600/20">
                <FiUser className="text-3xl text-blue-400" />
              </div>

              {/* User Data */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold">{user.name}</h1>

                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs capitalize text-blue-400">{user.role}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <FiMail />
                  <span>{user.email}</span>
                </div>

                <p className="mt-1 text-xs text-slate-500">User ID: #{user.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="overflow-hidden rounded-xl border border-[#26364A] bg-[#07111F]">
          {/* Tab */}
          <div className="border-b border-[#26364A] px-6">
            <button
              type="button"
              className="
                border-b-2 border-blue-500
                px-4 py-4
                text-sm text-blue-400
              "
            >
              Overview
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="rounded-xl border border-[#1E2D40] bg-[#0A1421] p-6">
              <h2 className="mb-8 text-base font-semibold">Information</h2>

              <div className="grid gap-x-16 gap-y-7 md:grid-cols-2">
                {/* Full Name */}
                <div>
                  <p className="mb-2 text-xs text-slate-500">Full Name</p>

                  <p className="text-sm text-slate-200">{user.name}</p>
                </div>

                {/* Email */}
                <div>
                  <p className="mb-2 text-xs text-slate-500">Email Address</p>

                  <p className="flex items-center gap-2 text-sm text-slate-200">
                    <FiMail className="text-slate-500" />
                    {user.email}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="mb-2 text-xs text-slate-500">Phone Number</p>

                  <p className="flex items-center gap-2 text-sm text-slate-200">
                    <FiPhone className="text-slate-500" />
                    {user.phone_number || "-"}
                  </p>
                </div>

                {/* Role */}
                <div>
                  <p className="mb-2 text-xs text-slate-500">Role</p>

                  <span
                    className={`
                      inline-flex rounded-full px-3 py-1
                      text-xs font-medium capitalize
                      ${user.role === "seller" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"}
                    `}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDetail;
