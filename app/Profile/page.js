"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const skillOptions = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Firebase",
  "GraphQL",
  "REST API",
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Sass",
  "Less",
  "C",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "C++",
  "C#",
  "Ruby",
  "Rails",
  "PHP",
  "Laravel",
  "Swift",
  "Kotlin",
  "Flutter",
  "Angular",
  "Vue.js",
  "Svelte",
  "AWS",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "CI/CD",
  "Redux",
  "MobX",
  "Jest",
  "Cypress",
  "Figma",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "SEO",
  "WordPress",
  "Shopify",
  "UI/UX Design",
  "Mobile App Development",
  "Game Development",
  "Machine Learning",
  "AI",
  "Data Science"
];

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [expandDesc, setExpandDesc] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    skillInput: "",
    desc: "",
    category: "",
    projects: [{ title: "", link: "" }],
    portfolio: "",
    avator: "",
  });

  const steps = [
    { id: 1, title: "Basic Info", icon: "👤" },
    { id: 2, title: "Skills", icon: "⚡" },
    { id: 3, title: "Category", icon: "🎯" },
    { id: 4, title: "Description", icon: "📝" },
    { id: 5, title: "Projects", icon: "💼" },
    { id: 6, title: "Portfolio", icon: "🎨" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.replace("/");

    fetch("http://localhost:5000/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) router.replace("/");
        setUser(data.user);
        setFormData((prev) => ({ ...prev, name: data.user.name, email: data.user.email }));
      })
      .then(() => {
        fetch("http://localhost:5000/api/my-profile", { headers: { Authorization: `Bearer ${token}` } })
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
      const timer = setTimeout(() => setPopup({ show: false, message: "", type: "" }), 4000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSkillAdd = (skill) => {
    if (!formData.skills.includes(skill))
      setFormData({ ...formData, skills: [...formData.skills, skill], skillInput: "" });
  };
  const handleSkillRemove = (skill) =>
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });

  const handleProjectChange = (index, key, value) => {
    const projects = [...formData.projects];
    projects[index][key] = value;
    setFormData({ ...formData, projects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", link: "" }],
    });
  };

  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.skills.length > 0;
      case 3:
        return formData.category;
      case 4:
        return formData.desc;
      case 5:
        return formData.projects.some((p) => p.title && p.link);
      case 6:
        return formData.portfolio && formData.avator;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    } else {
      setPopup({
        show: true,
        message: "Please complete this step before proceeding",
        type: "error",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentStep(1);
    setFormData({
      name: profile.name,
      email: profile.email,
      skills: Array.isArray(profile.skills) ? profile.skills : [],
      skillInput: "",
      desc: profile.desc,
      category: profile.category,
      projects: Array.isArray(profile.projects) ? profile.projects.map((p) => ({ title: p, link: p })) : [{ title: "", link: "" }],
      portfolio: profile.portfolio,
      avator: profile.avator,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.desc ||
      !formData.category ||
      formData.skills.length === 0 ||
      formData.projects.some((p) => !p.title || !p.link) ||
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
    const url = isEditing ? "http://localhost:5000/api/my-profile" : "http://localhost:5000/api/profile";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        skills: formData.skills,
        projects: formData.projects.map((p) => p.title),
      }),
    });

    const data = await res.json();
    if (data.success) {
      setProfile(data.profile);
      setPopup({
        show: true,
        message: isEditing ? "Profile Updated Successfully" : "Profile Created Successfully",
        type: "success",
      });
      setCurrentStep(1);
      setIsEditing(false);
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
    const res = await fetch("http://localhost:5000/api/my-profile-delete", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
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
      <main className="min-h-screen bg-[#121212] text-white pt-24 px-6 pb-12 flex justify-center">
        {profile && !isEditing ? (
          <div className="w-full max-w-4xl">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] p-8 rounded-t-3xl border border-gray-800 border-b-0">
              <div className="flex items-end gap-6 pb-8 border-b border-gray-700/50">
                <div className="relative">
                  <img
                    src={profile.avator}
                    alt="avatar"
                    className="w-32 h-32 rounded-2xl object-cover border-3 border-blue-500 shadow-2xl"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-3 border-[#1e1e1e]" />
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-4xl font-bold text-white mb-2">{profile.name}</h2>
                  <p className="text-blue-400 text-lg font-semibold mb-1">{profile.category}</p>
                  <p className="text-gray-500 text-sm">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-[#1e1e1e] border border-gray-800 border-t-0 px-8 py-8 space-y-8">
              {/* Description */}
              <div
                onClick={() => setExpandDesc(!expandDesc)}
                className="bg-[#121212]/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur cursor-pointer hover:border-gray-600 hover:bg-[#121212]/70 transition-all group"
              >
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                <p
                  className={`text-gray-300 leading-relaxed text-base transition-all ${
                    expandDesc ? "" : "line-clamp-4"
                  }`}
                >
                  {profile.desc}
                </p>
                <p className="text-xs text-gray-500 mt-3 group-hover:text-gray-400 transition-colors">
                  {expandDesc ? "Click to collapse" : "Click to expand"}
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                  <h3 className="text-lg font-bold text-white">Skills & Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-600/15 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-600/25 hover:border-blue-500/50 transition-all duration-200 cursor-default"
                    >
                      ✨ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full" />
                  <h3 className="text-lg font-bold text-white">Featured Projects</h3>
                  {profile.projects.length > 3 && (
                    <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full ml-auto">
                      +{profile.projects.length - 3} more in portfolio
                    </span>
                  )}
                </div>
                <div className="grid gap-3">
                  {profile.projects.slice(0, 3).map((proj, i) => (
                    <a
                      key={i}
                      href={proj}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-4 bg-[#121212]/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="text-purple-400 text-lg font-bold shrink-0">#{i + 1}</span>
                        <span className="text-gray-300 group-hover:text-purple-400 transition-colors truncate font-medium">
                          {proj}
                        </span>
                      </div>
                      <span className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0 ml-2">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all group cursor-pointer">
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">View Complete Portfolio</p>
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold text-lg"
                >
                  <span>{profile.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-[#161616] p-6 rounded-b-3xl border border-gray-800 border-t-0 flex gap-4">
              <button
                onClick={handleEdit}
                className="flex-1 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 rounded-xl font-semibold transition-all duration-200"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex-1 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-xl font-semibold transition-all duration-200"
              >
                🗑️ Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            {/* Step Indicator */}
            {!isEditing && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all mb-2 ${
                        currentStep >= step.id
                          ? "bg-blue-600 text-white border-2 border-blue-600"
                          : "bg-[#1e1e1e] text-gray-500 border-2 border-gray-700"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p
                      className={`text-xs text-center transition-colors ${
                        currentStep >= step.id ? "text-blue-400" : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.id < steps.length && (
                      <div
                        className={`h-1 w-16 mt-3 transition-all ${
                          currentStep > step.id ? "bg-blue-600" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#1e1e1e] h-1 rounded-full overflow-hidden border border-gray-700">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>
            )}

            {/* Form Container */}
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-800 shadow-xl">
              <h1 className="text-3xl font-bold mb-2 text-blue-500">
                {isEditing ? "Edit Profile" : steps[currentStep - 1].title}
              </h1>
              <p className="text-gray-400 mb-8">
                {isEditing ? "Update your profile information" : `Step ${currentStep} of ${steps.length}`}
              </p>

              <form onSubmit={(e) => {
                if (currentStep === steps.length || isEditing) {
                  handleSubmit(e);
                } else {
                  e.preventDefault();
                }
              }}>
                {!isEditing ? (
                  <>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        disabled
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 text-gray-400 placeholder-gray-600"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 text-gray-400 placeholder-gray-600"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Skills */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Select Your Skills</label>
                      <p className="text-gray-500 text-sm mb-4">Choose skills that match your expertise</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.skills.map((skill, i) => (
                          <div
                            key={i}
                            className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm border border-blue-600/50 flex items-center gap-2 group"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleSkillRemove(skill)}
                              className="cursor-pointer text-lg group-hover:scale-125 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <input
                        type="text"
                        value={formData.skillInput}
                        onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                        placeholder="Type skill name..."
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                      />

                      {formData.skillInput && (
                        <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg mt-2 max-h-48 overflow-y-auto">
                          {skillOptions
                            .filter((s) =>
                              s.toLowerCase().includes(formData.skillInput.toLowerCase())
                            )
                            .map((s, i) => (
                              <div
                                key={i}
                                className="p-3 hover:bg-blue-600/30 cursor-pointer border-b border-gray-700/50 last:border-b-0 transition"
                                onClick={() => handleSkillAdd(s)}
                              >
                                {s}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Category */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Professional Category</label>
                      <p className="text-gray-500 text-sm mb-4">Select the category that best describes you</p>

                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      >
                        <option value="">Select your category...</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>Full Stack Developer</option>
                        <option>UI/UX Designer</option>
                        <option>Mobile App Developer</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 4: Description */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Professional Description</label>
                      <p className="text-gray-500 text-sm mb-4">Tell clients about your expertise and experience</p>

                      <textarea
                        name="desc"
                        rows="6"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Write a compelling description about yourself..."
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 resize-none"
                      />
                      <p className="text-gray-500 text-xs mt-2">
                        {formData.desc.length} characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 5: Projects */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Your Projects</label>
                      <p className="text-gray-500 text-sm mb-4">Add at least one project to showcase your work</p>

                      <div className="space-y-4">
                        {formData.projects.map((proj, i) => (
                          <div
                            key={i}
                            className="p-6 bg-[#121212] border border-gray-700 rounded-lg hover:border-gray-600 transition"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-blue-500 font-bold">#{i + 1}</span>
                              <h3 className="text-gray-300 font-semibold">Project</h3>
                            </div>
                            <div className="space-y-4">
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) =>
                                  handleProjectChange(i, "title", e.target.value)
                                }
                                placeholder="Project Title"
                                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                              />
                              <input
                                type="text"
                                value={proj.link}
                                onChange={(e) =>
                                  handleProjectChange(i, "link", e.target.value)
                                }
                                placeholder="Project Link"
                                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                              />
                            </div>

                            {i > 0 && (
                              <button
                                type="button"
                                onClick={() => removeProject(i)}
                                className="mt-4 w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-lg transition text-sm"
                              >
                                Remove Project
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addProject}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-white font-semibold transition"
                      >
                        + Add Another Project
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 6: Portfolio */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Portfolio Link</label>
                      <input
                        type="text"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 transition"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Avatar Image URL</label>
                      <input
                        type="text"
                        name="avator"
                        value={formData.avator}
                        onChange={handleChange}
                        placeholder="https://example.com/your-avatar.jpg"
                        className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 mb-4 transition"
                      />
                      {formData.avator && (
                        <div className="p-4 bg-[#121212] rounded-lg border border-gray-700">
                          <p className="text-gray-400 text-sm mb-2">Preview:</p>
                          <img
                            src={formData.avator}
                            alt="avatar preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                            onError={() => {}}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                  </>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Professional Description</label>
                      <textarea
                        name="desc"
                        rows="5"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Write a compelling description about yourself..."
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 resize-none"
                      />
                      <p className="text-gray-500 text-xs mt-2">
                        {formData.desc.length} characters
                      </p>
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Professional Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white"
                      >
                        <option value="">Select your category...</option>
                        <option>Frontend Developer</option>
                        <option>Backend Developer</option>
                        <option>Full Stack Developer</option>
                        <option>UI/UX Designer</option>
                        <option>Mobile App Developer</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Select Your Skills</label>
                      <p className="text-gray-500 text-sm mb-4">Choose skills that match your expertise</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.skills.map((skill, i) => (
                          <div
                            key={i}
                            className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm border border-blue-600/50 flex items-center gap-2 group"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleSkillRemove(skill)}
                              className="cursor-pointer text-lg group-hover:scale-125 transition"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={formData.skillInput}
                        onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                        placeholder="Type skill name..."
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                      />
                      {formData.skillInput && (
                        <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg mt-2 max-h-48 overflow-y-auto">
                          {skillOptions
                            .filter((s) =>
                              s.toLowerCase().includes(formData.skillInput.toLowerCase())
                            )
                            .map((s, i) => (
                              <div
                                key={i}
                                className="p-3 hover:bg-blue-600/30 cursor-pointer border-b border-gray-700/50 last:border-b-0 transition"
                                onClick={() => handleSkillAdd(s)}
                              >
                                {s}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Your Projects</label>
                      <p className="text-gray-500 text-sm mb-4">Add at least one project to showcase your work</p>
                      <div className="space-y-4">
                        {formData.projects.map((proj, i) => (
                          <div
                            key={i}
                            className="p-6 bg-[#121212] border border-gray-700 rounded-lg hover:border-gray-600 transition"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <span className="text-blue-500 font-bold">#{i + 1}</span>
                              <h3 className="text-gray-300 font-semibold">Project</h3>
                            </div>
                            <div className="space-y-4">
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) =>
                                  handleProjectChange(i, "title", e.target.value)
                                }
                                placeholder="Project Title"
                                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                              />
                              <input
                                type="text"
                                value={proj.link}
                                onChange={(e) =>
                                  handleProjectChange(i, "link", e.target.value)
                                }
                                placeholder="Project Link"
                                className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                              />
                            </div>
                            {i > 0 && (
                              <button
                                type="button"
                                onClick={() => removeProject(i)}
                                className="mt-4 w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-lg transition text-sm"
                              >
                                Remove Project
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addProject}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-white font-semibold transition"
                      >
                        + Add Another Project
                      </button>
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Portfolio Link</label>
                      <input
                        type="text"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold mb-2 block">Avatar Image URL</label>
                      <input
                        type="text"
                        name="avator"
                        value={formData.avator}
                        onChange={handleChange}
                        placeholder="https://example.com/your-avatar.jpg"
                        className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 mb-4"
                      />
                      {formData.avator && (
                        <div className="p-4 bg-[#121212] rounded-lg border border-gray-700">
                          <p className="text-gray-400 text-sm mb-2">Preview:</p>
                          <img
                            src={formData.avator}
                            alt="avatar preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                            onError={() => {}}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-10 pt-8 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={isEditing ? () => setIsEditing(false) : handlePrev}
                    disabled={currentStep === 1 && !isEditing}
                    className={`flex-1 p-4 rounded-lg font-semibold transition ${
                      currentStep === 1 && !isEditing
                        ? "bg-gray-700/30 text-gray-600 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                    }`}
                  >
                    {isEditing ? "Cancel" : "← Previous"}
                  </button>

                  {currentStep === steps.length || isEditing ? (
                    <button
                      type="submit"
                      className="flex-1 p-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition"
                    >
                      {isEditing ? "Update Profile ✨" : "Create Profile 🚀"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 p-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-700 w-96 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Delete Profile?</h2>
              <p className="text-gray-400 mb-8">
                This action cannot be undone. Your profile will be permanently deleted.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {popup.show && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transition-all z-50 ${
              popup.type === "error"
                ? "bg-red-600 animate-pulse"
                : "bg-green-600 animate-bounce"
            }`}
          >
            {popup.message}
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;