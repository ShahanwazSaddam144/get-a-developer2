"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <section className="min-h-screen px-6 py-16 bg-[#121212] text-white">
      <div className="flex flex-col md:flex-row gap-8 items-stretch max-w-7xl mx-auto">
        {/* Left Sidebar - Categories */}
        <div className="flex flex-col space-y-3 w-full md:w-1/4 bg-gradient-to-br from-[#1e1e1e] to-[#161616] p-6 rounded-2xl shadow-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 pb-4 border-b border-gray-700">Categories</h3>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCategory(cat)}
              className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                category === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-500"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-blue-600/20 hover:border-blue-500 border border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Side - Developer Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center mt-10 py-16">
              No developers found in this category.
            </p>
          ) : (
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={profile.avator}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {profile.name}
                    </h2>
                    <p className="text-blue-400 text-sm font-semibold">{profile.category}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 text-sm font-medium mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/50">
                        {skill}
                      </span>
                    ))}
                    {profile.skills?.length > 3 && (
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/50">
                        +{profile.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {profile.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <p className="text-gray-500 text-xs">Rate</p>
                    <p className="text-lg font-bold text-blue-400">${profile.price}/hr</p>
                  </div>
                  <Link href={`/Developer/${profile._id}`}>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-300 border border-blue-500">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllDevelopers;