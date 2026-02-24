const CategoryStep = ({ formData, onCategoryChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Professional Category</label>
        <p className="text-gray-500 text-sm mb-4">Select the category that best describes you</p>

        <select
          name="category"
          value={formData.category}
          onChange={onCategoryChange}
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
  );
};

export default CategoryStep;
