"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileComponents/ProfileHeader";
import AboutSection from "../components/ProfileComponents/AboutSection";
import SkillsSection from "../components/ProfileComponents/SkillsSection";
import ProjectsSection from "../components/ProfileComponents/ProjectsSection";
import PortfolioLink from "../components/ProfileComponents/PortfolioLink";
import ProfileActions from "../components/ProfileComponents/ProfileActions";
import DeleteConfirmModal from "../components/ProfileComponents/DeleteConfirmModal";
import NotificationToast from "../components/ProfileComponents/NotificationToast";
import StepIndicator from "../components/ProfileComponents/StepIndicator";
import BasicInfoStep from "../components/ProfileComponents/BasicInfoStep";
import SkillsStep from "../components/ProfileComponents/SkillsStep";
import CategoryStep from "../components/ProfileComponents/CategoryStep";
import DescriptionStep from "../components/ProfileComponents/DescriptionStep";
import ProjectsStep from "../components/ProfileComponents/ProjectsStep";
import PortfolioStep from "../components/ProfileComponents/PortfolioStep";
import EditFormContent from "../components/ProfileComponents/EditFormContent";
import FormNavigation from "../components/ProfileComponents/FormNavigation";

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
    price: "",
    phone: "",
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
      price: profile.price,
      phone: profile.phone
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
      !formData.avator ||
      !formData.price ||
      !formData.phone
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
        projects: formData.projects.map((p) => p.link),
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
            <ProfileHeader profile={profile} expandDesc={expandDesc} setExpandDesc={setExpandDesc} />

            <div className="bg-[#1e1e1e] border border-gray-800 border-t-0 px-8 py-8 space-y-8">
              <AboutSection profile={profile} expandDesc={expandDesc} setExpandDesc={setExpandDesc} />
              <SkillsSection profile={profile} />
              <ProjectsSection profile={profile} />
              <PortfolioLink portfolio={profile.portfolio} />
            </div>

            <ProfileActions onEdit={handleEdit} onDelete={() => setShowConfirm(true)} />
          </div>
        ) : (
          <div className="w-full max-w-3xl">
            {!isEditing && <StepIndicator steps={steps} currentStep={currentStep} />}

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
                    {currentStep === 1 && <BasicInfoStep formData={formData} />}
                    {currentStep === 2 && (
                      <SkillsStep 
                        formData={formData} 
                        skillOptions={skillOptions} 
                        onSkillAdd={handleSkillAdd}
                        onSkillRemove={handleSkillRemove}
                        onInputChange={(value) => setFormData({ ...formData, skillInput: value })}
                      />
                    )}
                    {currentStep === 3 && <CategoryStep formData={formData} onCategoryChange={handleChange} />}
                    {currentStep === 4 && <DescriptionStep formData={formData} onDescChange={handleChange} />}
                    {currentStep === 5 && (
                      <ProjectsStep 
                        formData={formData}
                        onProjectChange={handleProjectChange}
                        onAddProject={addProject}
                        onRemoveProject={removeProject}
                      />
                    )}
                    {currentStep === 6 && (
                      <PortfolioStep 
                        formData={formData}
                        onPortfolioChange={handleChange}
                        onAvatarChange={handleChange}
                      />
                    )}
                  </>
                ) : (
                  <EditFormContent 
                    formData={formData}
                    skillOptions={skillOptions}
                    onChange={handleChange}
                    onSkillAdd={handleSkillAdd}
                    onSkillRemove={handleSkillRemove}
                    onProjectChange={handleProjectChange}
                    onAddProject={addProject}
                    onRemoveProject={removeProject}
                  />
                )}

                <FormNavigation
                  currentStep={currentStep}
                  stepsLength={steps.length}
                  isEditing={isEditing}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onCancel={() => setIsEditing(false)}
                  onSubmit={handleSubmit}
                />
              </form>
            </div>
          </div>
        )}

        <DeleteConfirmModal
          show={showConfirm}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />

        <NotificationToast
          show={popup.show}
          message={popup.message}
          type={popup.type}
        />
      </main>
    </>
  );
};

export default Profile;