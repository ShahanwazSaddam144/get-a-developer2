"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const WelcomeHero = () => {
    const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          router.replace("/");
          return;
        }
    
        const checkAuth = async () => {
          try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (!res.ok) throw new Error("Unauthorized");
    
            const data = await res.json();
    
            if (!data.success) {
              router.replace("/");
            } else {
              setUser(data.user);
            }
          } catch (err) {
            localStorage.removeItem("token");
            router.replace("/");
          } finally {
            setLoading(false);
          }
        };
    
        checkAuth();
      }, [router]);
    
      if (loading) return null;

  return (
    <>
      <section className="text-white pt-24 px-6">
        {/* ✨ CLASSY WELCOME HEADER */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1e1e1e] to-[#151515] p-10 rounded-3xl border border-gray-800 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10">
          {/* Background Glow Effects */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome back, <span className="text-blue-500">{user?.name}</span>
              {""}
              👋
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mb-6">
              Manage your developer profile, showcase your skills, connect with
              clients, and grow your freelance career. This is your professional
              dashboard where opportunities meet talent.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push("/Profile")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-600/20"
              >
                Create Your Profile
              </button>

              <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                Browse Developers
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WelcomeHero;
