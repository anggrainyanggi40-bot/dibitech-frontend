import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/templates/AuthLayout";
import Button from "../components/atoms/Button";
import useLogin from "../hooks/useLogin";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { login, loading, error: serverError } = useLogin();
  const { login: saveAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const data = await login(form.email, form.password);

      console.log("LOGIN DATA:", data);

      saveAuth(data.token, data.user);

      navigate("/");
    } catch (error) {
      console.log("Login gagal:", error);
    }
  };

  return (
    <AuthLayout
      type="login"
      title={
        <>
          Sign in to your
          <br />
          DibiTech account
        </>
      }
      description="Access your account to continue exploring amazing digital products."
    >
      <div className="mb-7">
        <h2 className="text-xl font-bold text-white">Sign In</h2>

        <p className="mt-2 text-xs text-slate-400">Enter your credentials to access your account</p>
      </div>
      {serverError && <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{serverError}</div>}
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                border bg-[#0A1421]
                py-3 pl-11 pr-4
                text-sm text-white
                outline-none transition
                placeholder:text-slate-600
                focus:border-blue-500
                ${errors.email ? "border-red-500" : "border-[#26364A]"}
              `}
            />
          </div>

          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
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
              autoComplete="current-password"
              placeholder="••••••••"
              className={`
                w-full rounded-lg
                border bg-[#0A1421]
                py-3 pl-11 pr-11
                text-sm text-white
                outline-none
                focus:border-blue-500
                ${errors.password ? "border-red-500" : "border-[#26364A]"}
              `}
            />

            <FiEye className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500" />
          </div>

          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}

          <div className="mt-3 text-right">
            <button type="button" className="text-xs text-blue-400">
              Forgot password?
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      {/* Divider */}{" "}
      <div className="my-6 flex items-center gap-4">
        {" "}
        <div className="h-px flex-1 bg-slate-700" /> <span className="text-xs text-slate-500">or continue with</span> <div className="h-px flex-1 bg-slate-700" />{" "}
      </div>{" "}
      <button className=" flex w-full items-center justify-center gap-3 rounded-lg border border-[#26364A] py-3 text-sm transition hover:bg-white/5 ">
        {" "}
        <FcGoogle className="text-lg text-white" /> Continue with Google{" "}
      </button>{" "}
      <p className="mt-7 text-center text-xs text-slate-400">
        {" "}
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          {" "}
          Register{" "}
        </Link>{" "}
      </p>{" "}
    </AuthLayout>
  );
}

export default Login;
