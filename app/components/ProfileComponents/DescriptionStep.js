const DescriptionStep = ({ formData, onDescChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Professional Description</label>
        <p className="text-gray-500 text-sm mb-4">Tell clients about your expertise and experience</p>

        <textarea
          name="desc"
          rows="6"
          value={formData.desc}
          onChange={onDescChange}
          placeholder="Write a compelling description about yourself..."
          className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 resize-none"
        />
        <p className="text-gray-500 text-xs mt-2">
          {formData.desc.length} characters
        </p>
      </div>
    </div>
  );
};

export default DescriptionStep;
