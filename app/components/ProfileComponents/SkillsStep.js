const SkillsStep = ({ formData, skillOptions, onSkillAdd, onSkillRemove, onInputChange }) => {
  return (
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
                onClick={() => onSkillRemove(skill)}
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
          onChange={(e) => onInputChange(e.target.value)}
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
                  onClick={() => onSkillAdd(s)}
                >
                  {s}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsStep;
