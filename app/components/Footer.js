"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] border-t border-[#1f2937] text-[#d1d5db] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Get-a-<span className="text-blue-600">Developer</span></h2>
          <p className="text-sm text-[#94a3b8] max-w-xl leading-relaxed">
            Build better teams, discover top developers, and get support with a clean, modern platform designed for ambitious makers.
          </p>
          <div className="mt-6 space-y-3 text-sm text-[#94a3b8]">
            <p>Need help? Reach us at</p>
            <a href="mailto:support@buttnetworks.com" className="text-blue-500 hover:text-blue-400 transition">
              support@buttnetworks.com
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-[#cbd5e1]">
            <li>
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Developer" className="hover:text-blue-400 transition">
                Developers
              </Link>
            </li>
            <li>
              <Link href="/Auth" className="hover:text-blue-400 transition">
                Join / Sign In
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-blue-400 transition">
                Support Center
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-3 text-sm text-[#cbd5e1]">
            <li>
              <Link href="/Profile" className="hover:text-blue-400 transition">
                Profile Dashboard
              </Link>
            </li>
            <li>
              <a href="https://buttnetworks.com" className="hover:text-blue-400 transition">
                Main Website
              </a>
            </li>
            <li>
              <a href="mailto:support@buttnetworks.com" className="hover:text-blue-400 transition">
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-[#1f2937] pt-6 text-center text-xs text-[#6b7280]">
        © {new Date().getFullYear()} Butt Networks. Crafted for developers and teams.
      </div>
    </footer>
  );
};

export default Footer;
