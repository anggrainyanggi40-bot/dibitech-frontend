import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";

function AuthLayout({ children, type, title, description }) {
  const isLogin = type === "login";

  return (
    <div className="min-h-screen bg-[#010711] p-4">
      <div className="mx-auto min-h-[calc(100vh-32px)] max-w-6xl overflow-hidden rounded-2xl border border-[#1E3045] bg-[#020914]">
        {/* Logo */}
        <header className="flex h-20 items-center border-b border-[#1E3045] px-8">
          <Link to="/">
            <Logo />
          </Link>
        </header>

        <div className="grid min-h-[calc(100vh-112px)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Section */}
          <section
            className="
              relative overflow-hidden
              border-b border-[#1E3045]
              bg-gradient-to-br
              from-[#061630]
              via-[#0B1740]
              to-[#17103D]
              p-8
              lg:border-b-0 lg:border-r
              lg:p-12
            "
          >
            {/* Glow */}
            <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />

            <div className="relative z-10 flex h-full max-w-md flex-col justify-center">
              <p className="mb-3 text-sm text-blue-400">{isLogin ? "Welcome back!" : "Create your account"}</p>

              <h1 className="mb-5 text-3xl font-bold text-white leading-tight lg:text-4xl">{title}</h1>

              <p className="max-w-sm text-sm leading-relaxed text-slate-300">{description}</p>
            </div>
          </section>

          {/* Form Section */}
          <section className="flex items-center text-white justify-center p-6 md:p-10">
            <div className="w-full max-w-md rounded-xl border border-[#26364A] bg-[#0B1625] p-6 md:p-8">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
