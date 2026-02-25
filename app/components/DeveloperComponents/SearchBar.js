import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "UI/UX Designer",
    "AI / ML Engineer",
  ];

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
  };

  const handleSearch = () => {
  };

  return (
    <section className="mt-20 mb-10 px-6 flex flex-col items-center justify-center text-center">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Find the Perfect Developer for Your Project
      </h1>

      <p className="text-gray-400 mb-8 max-w-2xl">
        Hire verified developers for web, mobile, and software projects.
        Fast, secure, and reliable.
      </p>

      {/* Search Box */}
      <div className="w-full max-w-2xl flex items-center bg-[#1e1e1e] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
        <input
          type="text"
          placeholder="Search for developers, skills, technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 bg-transparent text-white outline-none placeholder-gray-500"
        />
        <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 transition duration-300 flex items-center gap-2 text-white font-medium">
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="px-5 py-2 bg-[#1e1e1e] border border-gray-700 text-gray-300 rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SearchBar;