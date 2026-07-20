import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiLock, FiMail, FiUser, FiPhone } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import AuthLayout from "../components/templates/AuthLayout";
import Button from "../components/atoms/Button";
import useRegister from "../hooks/useRegister";

function Register() {
  const navigate = useNavigate();

  // Menyimpan data input form
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  // Menyimpan error validasi frontend
  const [errors, setErrors] = useState({});

  // Custom hook register
  const { register, loading, error: serverError } = useRegister();

  // Mengubah state sesuai input yang diketik
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Hapus error field ketika user mulai mengetik lagi
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validasi form
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validasi nama
    if (!form.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    // Validasi email
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Validasi nomor telpon
    if (!form.phone_number.trim()) {
      newErrors.phone_number = "Nomor telepon wajib diisi";
    }

    // Validasi password
    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    } else if (form.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }

    // Validasi konfirmasi password
    if (!form.password_confirmation) {
      newErrors.password_confirmation = "Konfirmasi password wajib diisi";
    } else if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Konfirmasi password tidak sama";
    }

    return newErrors;
  };

  // Ketika form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    // Kalau ada error, hentikan proses
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Kirim data ke Laravel melalui custom hook
      await register(form);

      // Kalau berhasil, pindah ke login
      navigate("/login");
    } catch (error) {
      console.log("Register gagal:", error);
    }
  };

  return (
    <AuthLayout
      type="register"
      title={
        <>
          Join DibiTech
          <br />
          today
        </>
      }
      description="Create an account to start exploring thousands of AI-powered tools and digital products."
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Create Account</h2>

        <p className="mt-2 text-xs text-slate-400">Fill in the details below to create your account</p>
      </div>

      {/* Server Error */}
      {serverError && <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{serverError}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium text-white">
            Full Name
          </label>

          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Enter your full name"
              className={`
                w-full rounded-lg
                border
                bg-[#0A1421]
                py-3 pl-11 pr-4
                text-sm text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500
                ${errors.name ? "border-red-500" : "border-[#26364A]"}
              `}
            />
          </div>

          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-white">
            Email Address
          </label>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              className={`
                w-full rounded-lg
                border
                bg-[#0A1421]
                py-3 pl-11 pr-4
                text-sm text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500
                ${errors.email ? "border-red-500" : "border-[#26364A]"}
              `}
            />
          </div>

          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        {/* Phone Number */}
        <div>
          <label htmlFor="phone_number" className="mb-2 block text-xs font-medium text-white">
            Phone Number
          </label>

          <div className="relative">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={form.phone_number}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="Enter your phone number"
              className={`
        w-full rounded-lg border
        bg-[#0A1421]
        py-3 pl-11 pr-4
        text-sm text-white
        outline-none transition
        placeholder:text-slate-600
        focus:border-blue-500
        ${errors.phone_number ? "border-red-500" : "border-[#26364A]"}
      `}
            />
          </div>

          {errors.phone_number && <p className="mt-1 text-xs text-red-400">{errors.phone_number}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="mb-2 block text-xs font-medium text-white">
            Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
              className={`
                w-full rounded-lg
                border
                bg-[#0A1421]
                py-3 pl-11 pr-11
                text-sm text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500
                ${errors.password ? "border-red-500" : "border-[#26364A]"}
              `}
            />

            <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500" />
          </div>

          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="password_confirmation" className="mb-2 block text-xs font-medium text-white">
            Confirm Password
          </label>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className={`
                w-full rounded-lg
                border
                bg-[#0A1421]
                py-3 pl-11 pr-11
                text-sm text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-blue-500
                ${errors.password_confirmation ? "border-red-500" : "border-[#26364A]"}
              `}
            />

            <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500" />
          </div>

          {errors.password_confirmation && <p className="mt-1 text-xs text-red-400">{errors.password_confirmation}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700" />

        <span className="text-xs text-slate-500">or continue with</span>

        <div className="h-px flex-1 bg-slate-700" />
      </div>

      {/* Google */}
      <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#26364A] py-3 text-sm text-white transition hover:bg-white/5">
        <FcGoogle className="text-lg" />
        Continue with Google
      </button>

      {/* Login Link */}
      <p className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
