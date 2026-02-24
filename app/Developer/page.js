"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const Developer = () => {
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
      <Navbar />

      <section className="min-h-screen bg-[#121212] text-white pt-24 px-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 rounded-2xl shadow-xl mb-8">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name} 👋
          </h1>
          <p className="text-green-100 mt-2">
            Manage your gigs, projects and grow your freelance career.
          </p>
        </div>
      </section>
    </>
  );
};

export default Developer;