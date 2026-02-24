const PortfolioStep = ({ formData, onPortfolioChange, onAvatarChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Portfolio Link</label>
        <input
          type="text"
          name="portfolio"
          value={formData.portfolio}
          onChange={onPortfolioChange}
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
          onChange={onAvatarChange}
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
  );
};

export default PortfolioStep;
