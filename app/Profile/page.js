"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const Profile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    desc: "",
    category: "",
    projects: "",
    portfolio: "",
    avator: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) router.replace("/");
        setUser(data.user);
        setFormData((prev) => ({
          ...prev,
          name: data.user.name,
          email: data.user.email,
        }));
      })
      .then(() => {
        fetch("http://localhost:5000/api/my-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) setProfile(data.profile);
          })
          .finally(() => setLoading(false));
      })
      .catch(() => router.replace("/"));
  }, [router]);

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, message: "", type: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.skills ||
      !formData.desc ||
      !formData.category ||
      !formData.projects ||
      !formData.portfolio ||
      !formData.avator
    ) {
      setPopup({
        show: true,
        message: "Please fill all fields",
        type: "error",
      });
      return;
    }

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        skills: formData.skills.split(","),
        projects: formData.projects.split(","),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setProfile(data.profile);
      setPopup({
        show: true,
        message: "Profile Created Successfully",
        type: "success",
      });
    } else {
      setPopup({
        show: true,
        message: data.message || "Something went wrong",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      "http://localhost:5000/api/my-profile-delete",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (data.success) {
      setProfile(null);
      setShowConfirm(false);
      setPopup({
        show: true,
        message: "Profile Deleted Successfully",
        type: "success",
      });
    }
  };

  if (loading) return null;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#121212] text-white pt-24 px-6 flex justify-center">

        {profile ? (
          <div className="w-full max-w-3xl bg-[#1e1e1e] p-8 rounded-2xl border border-gray-800 shadow-xl">

            <div className="flex items-center gap-6 mb-6">
              <img
                src={profile.avator}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-blue-500">
                  {profile.name}
                </h2>
                <p className="text-gray-400">{profile.email}</p>
                <p className="text-gray-300 mt-2">{profile.category}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{profile.desc}</p>

            <div className="mb-4">
              <h3 className="text-blue-500 font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-blue-500 font-semibold mb-2">Projects</h3>
              <ul className="list-disc list-inside text-gray-300">
                {profile.projects.map((proj, i) => (
                  <li key={i}>{proj}</li>
                ))}
              </ul>
            </div>

            <a
              href={profile.portfolio}
              target="_blank"
              className="text-blue-400 underline"
            >
              View Portfolio
            </a>

            <button
              onClick={() => setShowConfirm(true)}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold"
            >
              Delete Profile
            </button>
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-[#1e1e1e] p-8 rounded-2xl border border-gray-800 shadow-xl">

            <h1 className="text-3xl font-bold mb-6 text-blue-500">
              Create Your Professional Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

              <input type="text" value={formData.name} disabled className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 text-gray-400" />

              <input type="email" value={formData.email} disabled className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 text-gray-400" />

              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none" />

              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500">
                <option value="">Select Category</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>UI/UX Designer</option>
                <option>Mobile App Developer</option>
              </select>

              <textarea name="desc" rows="4" value={formData.desc} onChange={handleChange} placeholder="Description" className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500" />

              <input type="text" name="projects" value={formData.projects} onChange={handleChange} placeholder="Projects (comma separated)" className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500" />

              <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Portfolio Link" className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500" />

              <input type="text" name="avator" value={formData.avator} onChange={handleChange} placeholder="Avatar Image URL" className="w-full p-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500" />

              <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold">
                Create Profile
              </button>

            </form>
          </div>
        )}

        {showConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-700 w-80 text-center">
              <h2 className="text-lg font-bold text-white mb-4">Are you sure?</h2>
              <div className="flex gap-4">
                <button onClick={() => setShowConfirm(false)} className="flex-1 bg-gray-700 p-2 rounded">Cancel</button>
                <button onClick={handleDelete} className="flex-1 bg-red-600 p-2 rounded">Delete</button>
              </div>
            </div>
          </div>
        )}

        {popup.show && (
          <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white ${popup.type === "error" ? "bg-red-600" : "bg-green-600"}`}>
            {popup.message}
          </div>
        )}

      </main>
    </>
  );
};

export default Profile;