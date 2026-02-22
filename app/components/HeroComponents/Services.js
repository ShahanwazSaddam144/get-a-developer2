"use client";

import React from "react";
import {
  Code2,
  Database,
  Layers,
  Smartphone,
  Palette,
  Brain,
} from "lucide-react";

const services = [
  {
    name: "Frontend Development",
    description:
      "Build responsive and interactive user interfaces using React, Next.js, and modern web technologies.",
    icon: <Code2 size={28} className="text-[#1E90FF]" />,
  },
  {
    name: "Backend Development",
    description:
      "Develop secure, scalable APIs and server-side applications with Node.js, Express, and databases.",
    icon: <Database size={28} className="text-[#1E90FF]" />,
  },
  {
    name: "Full-Stack Development",
    description:
      "Complete web solutions covering both frontend and backend for seamless applications.",
    icon: <Layers size={28} className="text-[#1E90FF]" />,
  },
  {
    name: "Mobile App Development",
    description:
      "Create cross-platform or native mobile applications for iOS and Android.",
    icon: <Smartphone size={28} className="text-[#1E90FF]" />,
  },
  {
    name: "UI/UX Design",
    description:
      "Design intuitive and engaging interfaces with a focus on user experience.",
    icon: <Palette size={28} className="text-[#1E90FF]" />,
  },
  {
    name: "AI & Machine Learning",
    description:
      "Integrate AI solutions, machine learning models, and automation into projects.",
    icon: <Brain size={28} className="text-[#1E90FF]" />,
  },
];

const Services = () => {
  return (
    <section className="mt-20 px-6 mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Our <span className="text-[#1E90FF]">Services</span>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] p-8 rounded-2xl text-left hover:scale-105 transition shadow-lg shadow-black/30"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-3">{service.name}</h3>
            <p className="text-[#B0B0B0] leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;