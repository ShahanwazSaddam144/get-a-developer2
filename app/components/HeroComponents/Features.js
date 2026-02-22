import React from "react";
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

// Features with Icons
const features = [
  {
    title: "Verified Developers",
    description:
      "Every developer is manually reviewed to ensure quality and professionalism.",
    icon: <ShieldCheck size={28} className="text-[#1E90FF]" />,
  },
  {
    title: "Secure Payments",
    description:
      "Protected transactions with milestone-based payment releases.",
    icon: <CreditCard size={28} className="text-[#1E90FF]" />,
  },
  {
    title: "24/7 Support",
    description:
      "Our team is available anytime to help resolve issues instantly.",
    icon: <Headphones size={28} className="text-[#1E90FF]" />,
  },
];

const Features = () => {
  return (
    <>
      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#1A1A1A] p-8 rounded-2xl text-left hover:scale-105 transition shadow-lg shadow-black/30"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-[#B0B0B0] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
