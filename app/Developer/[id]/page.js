"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import CommentsSection from "../../components/DeveloperComponents/CommentsSection";

const DeveloperProfile = () => {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); 

  
useEffect(() => {
  const fetchProfile = async () => {
    try {
      // Fetch profile by profile ID
      const res = await fetch(`http://localhost:5000/api/profile/${params.id}`);
      const data = await res.json();

      if (data.success) {
        const profileData = data.profile;
        setProfile(profileData);

        // Fetch status using the user ID (not profile _id)
        if (profileData.user) {
          try {
            const statusRes = await fetch(
              `http://localhost:5000/api/profilestatus/${profileData.user}`
            );
            const statusData = await statusRes.json();

            if (statusData.success) {
              setStatus(statusData.status);
            } else {
              // Default to Available if not found
              setStatus({ availability: "Available" });
            }
          } catch (err) {
            console.error("Failed to fetch profile status:", err);
            setStatus({ availability: "Available" });
          }
        } else {
          setStatus({ availability: "Available" });
        }

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
      <div className="bg-[#121212] text-white py-8 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Back Button */}
          <button
            onClick={() => router.back()}
            className="text-blue-400 hover:text-blue-300 text-sm mb-6 flex items-center gap-2 transition"
          >
            ← Back to Developers
          </button>

          {/* Main Container - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Section - Professional Card */}
              <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 border border-gray-800 shadow-xl">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative">
                    <img
                      src={profile.avator}
                      alt={profile.name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover border-3 border-blue-500 shadow-2xl"
                    />
                    <div
                      className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-[#1e1e1e] shadow-lg ${
                        status?.availability === "Available" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{profile.name}</h1>
                      <p className="text-blue-400 text-xl font-semibold">{profile.category}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            status?.availability === "Available" ? "text-green-400" : "text-gray-500"
                          }`}
                        >
                          ● {status?.availability || "Not Available"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-gray-300 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span>{profile.email}</span>
                      </div>
                      {profile.phone && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.418 1.02 1.730 2.747 2.896 3.922 1.167 1.18 2.905 2.462 3.923 2.88l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57c-8.835 0-16-7.165-16-16V3z" />
                          </svg>
                          <span>{profile.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 border border-gray-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">About</h2>
                <p className="text-gray-300 leading-relaxed text-base">{profile.desc}</p>
              </div>

              {/* Skills Section */}
              <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 border border-gray-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-blue-600/30 text-blue-300 rounded-full border border-blue-600/50 text-sm font-medium hover:bg-blue-600/40 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              {profile.projects && profile.projects.length > 0 && (
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 border border-gray-800 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-gray-700">Portfolio & Projects</h2>
                  <div className="space-y-3">
                    {profile.projects.map((project, idx) => (
                      <a
                        key={idx}
                        href={project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[#121212] rounded-xl border border-gray-700/50 hover:border-blue-500 hover:bg-blue-600/5 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition" />
                          <span className="text-gray-300 group-hover:text-blue-400 transition font-medium truncate">
                            Project {idx + 1}
                          </span>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l4-4m0 0l4 4m-4-4v12"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Link */}
              {profile.portfolio && (
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-8 border border-gray-800 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-4 pb-4 border-b border-gray-700">View Portfolio</h2>
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
                  >
                    Visit Full Portfolio
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Comments Section */}
              <CommentsSection profileId={profile._id} />
            </div>

            {/* Right Column - Sidebar (UNCHANGED) */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                {/* Pricing Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl">
                  <div className="mb-6">
                    <p className="text-blue-100 text-sm mb-2">Starting from</p>
                    <p className="text-4xl font-bold text-white">
                      {profile.price ? `$${profile.price}` : "Custom"}
                    </p>
                    <p className="text-blue-100 text-sm">{profile.price ? "/hour" : "pricing"}</p>
                  </div>

                  <button className="w-full px-6 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-lg transition shadow-lg mb-3">
                    Hire Now
                  </button>

                  <button className="w-full px-6 py-3 bg-blue-500/30 hover:bg-blue-500/40 text-white font-semibold rounded-lg border border-white/30 transition">
                    Message Seller
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-6 border border-gray-800 shadow-xl">
                  <h3 className="font-bold text-white mb-4">Trusted Professional</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 3.062v6.372a3.066 3.066 0 01-2.812 3.062 3.066 3.066 0 01-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 01-1.745-.723 3.066 3.066 0 01-2.812-3.062V6.517a3.066 3.066 0 012.812-3.062zM9 11a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">Verified Member</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">Quick Responder</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-300">Top Rated</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-6 border border-gray-800 shadow-xl">
                  <h3 className="font-bold text-white mb-4">Quick Contact</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">Response time: <span className="text-green-400 font-semibold">Within 2 hours</span></p>
                    <p className="text-gray-400">Member since: <span className="text-gray-300">Jan 2024</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperProfile;