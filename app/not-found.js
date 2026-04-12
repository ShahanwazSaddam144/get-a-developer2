"use client";

import Link from "next/link";
import { Home, Code2, LifeBuoy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-6 text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Display */}
        <div className="mb-8">
          <p className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
            404
          </p>
          <p className="text-2xl sm:text-4xl font-bold text-white mb-3">
            Page Not Found
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Oops! Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition shadow-lg shadow-blue-500/20"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/Developer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-blue-600/50 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg font-semibold transition"
          >
            <Code2 size={18} />
            Browse Developers
          </Link>

          <Link
            href="/support"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 bg-gray-800/20 hover:bg-gray-800/40 text-gray-300 rounded-lg font-semibold transition"
          >
            <LifeBuoy size={18} />
            Get Support
          </Link>
        </div>

        {/* Info Box */}
        <div className="bg-[#1e1e1e] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">What can you do?</h3>
          <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-1">→</span>
              <span>Check the URL for typos and try again.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-1">→</span>
              <span>Visit our home page to explore available developers and opportunities.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold mt-1">→</span>
              <span>Contact support if you believe this is an error on our end.</span>
            </li>
          </ul>
        </div>

        {/* Footer Info */}
        <p className="mt-10 text-gray-500 text-sm">
          Error Code: <span className="text-gray-400">404</span> • <span className="text-gray-400">Page Not Found</span>
        </p>
      </div>
    </div>
  );
}
