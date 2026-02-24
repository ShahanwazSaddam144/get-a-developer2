const SkillsSection = ({ profile }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
        <h3 className="text-lg font-bold text-white">Skills & Expertise</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {profile.skills.map((skill, i) => (
          <span
            key={i}
            className="bg-blue-600/15 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-600/25 hover:border-blue-500/50 transition-all duration-200 cursor-default"
          >
            ✨ {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
