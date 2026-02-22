"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Code2,
  Database,
  Layers,
  Brain,
  Smartphone,
  Palette,
  ShieldCheck,
  CreditCard,
  Headphones,
} from "lucide-react";
import Features from "./HeroComponents/Features";
import Services from "./HeroComponents/Services";

const Hero = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Categories with Icons
  const categories = [
    { name: "Frontend Development", icon: <Code2 size={16} /> },
    { name: "Backend Development", icon: <Database size={16} /> },
    { name: "Full-Stack", icon: <Layers size={16} /> },
    { name: "AI & Machine Learning", icon: <Brain size={16} /> },
    { name: "Mobile Apps", icon: <Smartphone size={16} /> },
    { name: "UI/UX Design", icon: <Palette size={16} /> },
  ];


  // Autocomplete
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };
  
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data.success) {
          router.push("/Developer");
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    };

    checkUser();
  }, [router]);

  return (
    <>
    <section
      className="bg-[#121212] min-h-screen flex flex-col justify-start items-center text-center px-6"
      style={{ paddingTop: "calc(80px + 2rem)" }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white mt-8">
        Hire Top Developers <span className="text-[#1E90FF]">Instantly</span>
      </h1>

      <p className="text-lg md:text-xl text-[#B0B0B0] max-w-xl mb-8">
        Connect with expert developers across multiple technologies. Chat,
        review portfolios, and hire securely — all in one powerful platform.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          className="bg-[#1E90FF] hover:bg-[#3EA6FF] text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg shadow-blue-500/20"
          onClick={() => router.push("/Auth")}
        >
          Get Started
        </button>

        <button
          onClick={() => router.push("/Developer")}
          className="border border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF] hover:text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          Browse Developers
        </button>
      </div>

      {/* Search */}
      <div className="relative flex w-full max-w-2xl mb-12">
        <div className="flex items-center bg-[#1A1A1A] rounded-l-lg px-3">
          <Search size={18} className="text-[#B0B0B0]" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search developers, skills, technologies..."
          className="flex-grow p-3 text-white bg-[#1A1A1A] outline-none placeholder-[#B0B0B0]"
        />

        <button
          onClick={() =>
            router.push(`/Developer?search=${encodeURIComponent(searchTerm)}`)
          }
          className="bg-[#1E90FF] hover:bg-[#3EA6FF] text-white px-6 rounded-r-lg transition"
        >
          Search
        </button>

        {/* Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg mt-2 shadow-lg z-50">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push(
                    `/Developer?category=${encodeURIComponent(
                      suggestion.name
                    )}`
                  );
                }}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#1E90FF] cursor-pointer transition"
              >
                {suggestion.icon}
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat, index) => (
          <span
            key={index}
            onClick={() =>
              router.push(`/Developer?category=${encodeURIComponent(cat.name)}`)
            }
            className="flex items-center gap-2 bg-[#1E90FF]/20 text-[#1E90FF] border border-[#1E90FF]/40 px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1E90FF] hover:text-white transition cursor-pointer"
          >
            {cat.icon}
            {cat.name}
          </span>
        ))}
      </div>

      <Features />
      <Services />
    </section>
    </>
  );
};

export default Hero;