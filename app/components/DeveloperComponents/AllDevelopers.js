"use client";
import React, { useEffect, useState } from "react";

const AllDevelopers = () => {
  const [profiles, setProfiles] = useState([]);
  const [category, setCategory] = useState("Web Development");
  const categories = [
    "Keep Exploring",
    "Web Development",
    "Mobile App Development",
    "AI / ML",
  ];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user-profile");
        const data = await res.json();

        if (data.success) {
          const filtered =
            category === "Keep Exploring"
              ? data.data
              : data.data.filter((profile) => profile.category === category);
          setProfiles(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, [category]);

  return (
    <section className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        {/* Left Sidebar - Categories */}
        <div className="flex flex-col space-y-4 w-full md:w-2/5 bg-[#1e1e1e] p-6 rounded-xl shadow-lg">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCategory(cat)}
              className={`px-5 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                category === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Side - Developer Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center mt-10">
              No developers found in this category.
            </p>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-[#1e1e1e] rounded-2xl p-5 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {profile.name}
                </h2>
                <p className="text-gray-400 mb-2">{profile.role}</p>
                <p className="text-gray-400 mb-3">{profile.skills.join(", ")}</p>
                <p className="text-gray-500 text-sm mb-3">{profile.desc}</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-300">
                  View Profile
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllDevelopers;