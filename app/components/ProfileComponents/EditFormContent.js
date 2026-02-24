const EditFormContent = ({ formData, skillOptions, onChange, onSkillAdd, onSkillRemove, onProjectChange, onAddProject, onRemoveProject }) => {
  return (
    <div className="space-y-8">
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
        />
      </div>

      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
        />
      </div>

      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Professional Description</label>
        <textarea
          name="desc"
          rows="5"
          value={formData.desc}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={(e) => onChange({ target: { name: 'skillInput', value: e.target.value } })}
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
                    onProjectChange(i, "title", e.target.value)
                  }
                  placeholder="Project Title"
                  className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                />
                <input
                  type="text"
                  value={proj.link}
                  onChange={(e) =>
                    onProjectChange(i, "link", e.target.value)
                  }
                  placeholder="Project Link"
                  className="w-full p-3 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600"
                />
              </div>
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => onRemoveProject(i)}
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
          onClick={onAddProject}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
};

export default EditFormContent;
