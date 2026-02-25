"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const DeveloperProfile = () => {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/${params.id}`);
        const data = await res.json();

        if (data.success) {
          setProfile(data.profile);
        } else {
          router.push("/Developer");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        router.push("/Developer");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProfile();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
          <p className="text-gray-400">Profile not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-3xl p-8 mb-8 border border-gray-800 shadow-lg">
            <div className="flex flex-col md:flex-row items-start gap-8 pb-8 border-b border-gray-700/50">
              <img
                src={profile.avator}
                alt={profile.name}
                className="w-40 h-40 rounded-2xl object-cover border-3 border-blue-500 shadow-2xl"
              />
              <div className="flex-1">
                <h1 className="text-5xl font-bold text-white mb-3">{profile.name}</h1>
                <p className="text-blue-400 text-2xl font-semibold mb-2">{profile.category}</p>
                <p className="text-gray-400 text-lg mb-4">{profile.email}</p>
                <div className="flex items-center gap-6">
                  <div className="bg-blue-600/20 px-6 py-3 rounded-lg border border-blue-600/50">
                    <p className="text-gray-400 text-sm mb-1">Hourly Rate</p>
                    <p className="text-3xl font-bold text-blue-400">${profile.price}/hr</p>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition duration-300 border border-blue-500">
                    Hire Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 mb-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">About</h2>
            <p className="text-gray-300 text-lg leading-relaxed">{profile.desc}</p>
          </div>

          {/* Skills Section */}
          <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 mb-8 border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/50 font-medium hover:bg-blue-600/30 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          {profile.projects && profile.projects.length > 0 && (
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 mb-8 border border-gray-800 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">Projects</h2>
              <div className="space-y-4">
                {profile.projects.map((project, idx) => (
                  <a
                    key={idx}
                    href={project}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-lg border border-gray-700 hover:border-blue-500/50 hover:bg-blue-600/10 transition group"
                  >
                    <span className="text-white font-medium group-hover:text-blue-400 transition">
                      Project {idx + 1}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 6h3m0 0a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Section */}
          {profile.portfolio && (
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 mb-8 border border-gray-800 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">Portfolio</h2>
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-600/50 hover:bg-blue-600/30 transition font-medium"
              >
                Visit Portfolio
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition border border-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default DeveloperProfile;
