const ProjectsStep = ({ formData, onProjectChange, onAddProject, onRemoveProject }) => {
  return (
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
    </div>
  );
};

export default ProjectsStep;
