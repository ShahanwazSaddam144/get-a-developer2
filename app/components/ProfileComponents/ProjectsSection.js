const ProjectsSection = ({ profile }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full" />
        <h3 className="text-lg font-bold text-white">Featured Projects</h3>
        {profile.projects.length > 3 && (
          <span className="text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full ml-auto">
            +{profile.projects.length - 3} more in portfolio
          </span>
        )}
      </div>
      <div className="grid gap-3">
        {profile.projects.slice(0, 3).map((proj, i) => (
          <a
            key={i}
            href={proj}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-[#121212]/50 border border-gray-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-purple-400 text-lg font-bold shrink-0">#{i + 1}</span>
              <span className="text-gray-300 group-hover:text-purple-400 transition-colors truncate font-medium">
                {proj}
              </span>
            </div>
            <span className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0 ml-2">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
