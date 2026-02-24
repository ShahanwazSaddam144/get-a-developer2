const AboutSection = ({ profile, expandDesc, setExpandDesc }) => {
  return (
    <div
      onClick={() => setExpandDesc(!expandDesc)}
      className="bg-[#121212]/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur cursor-pointer hover:border-gray-600 hover:bg-[#121212]/70 transition-all group"
    >
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">About</h3>
      <p
        className={`text-gray-300 leading-relaxed text-base transition-all ${
          expandDesc ? "" : "line-clamp-4"
        }`}
      >
        {profile.desc}
      </p>
      <p className="text-xs text-gray-500 mt-3 group-hover:text-gray-400 transition-colors">
        {expandDesc ? "Click to collapse" : "Click to expand"}
      </p>
    </div>
  );
};

export default AboutSection;
