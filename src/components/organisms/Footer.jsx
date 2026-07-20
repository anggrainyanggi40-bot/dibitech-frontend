import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import Logo from "../atoms/Logo";

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 text-sm leading-relaxed text-gray-400">Your trusted marketplace for AI-powered digital products.</p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="mb-4 font-semibold">Marketplace</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">Explore</a>
              <a href="#">Categories</a>
              <a href="#">Trending</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">FAQ</a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>

            <div className="flex gap-5 text-xl text-gray-400">
              <FaTwitter />
              <FaLinkedinIn />
              <FaGithub />
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-gray-600">© 2026 DibiTech. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
