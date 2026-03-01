"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FamousDevelopers = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/top-rated-developers");
        const data = await res.json();

        if (data.success) {
          setProfiles(data.data.slice(0, 5)); 
        }
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <>
      <section className="min-h-screen px-6 py-16 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Based on Our Highly Rated Developer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Discover our highly rated developer that match your interests and skills.
          </p>
          <div className="w-20 h-1 bg-blue-600 mt-4 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {profiles.length === 0 ? (
            <p className="text-gray-400 text-center mt-10 py-16">
              No Highly Rated Developers found.
            </p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={24}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {profiles.map((profile) => (
                <SwiperSlide key={profile._id}>
                  <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-blue-500/50 hover:shadow-blue-500/20 transition-all duration-300 flex flex-col h-full">
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
                        <p className="text-blue-400 text-sm font-semibold">
                          {profile.category}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 text-sm font-medium mb-2">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills?.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-600/50"
                          >
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
                        <p className="text-lg font-bold text-blue-400">
                          ${profile.price}/hr
                        </p>
                      </div>
                      <Link href={`/Developer/${profile._id}`}>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition duration-300 border border-blue-500">
                          View Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </>
  );
};

export default FamousDevelopers;