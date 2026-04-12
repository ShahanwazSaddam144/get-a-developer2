"use client";
import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null); // {type: "success" | "error", message: ""}
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      showToast("error", "Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        showToast("success", data.message);
        setEmail("");
      } else {
        showToast("error", data.message);
      }
    } catch (err) {
      showToast("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, message) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <section className="mt-20 py-2 relative">
      <div className=" mx-auto bg-gradient-to-br from-[#1e1e1e] to-[#161616] border border-blue-900/40 shadow-xl p-8 sm:p-12 text-center">

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          Find Your Next Developer — Every Week
        </h1>

        <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
          Get handpicked developers, project ideas, and tech insights delivered
          straight to your inbox. Stay ahead in the world of development with
          curated opportunities and talent.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-[60%] px-5 py-3 rounded-lg bg-[#17181c] border border-blue-900/40 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-white font-semibold shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Subscribe"}
          </button>

        </div>

        <p className="text-gray-500 text-xs mt-4">
          No spam. Only valuable developer content.
        </p>
      </div>

      {/* 🔥 Side Popup Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-all duration-300
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
    </section>
  );
};

export default Newsletter;