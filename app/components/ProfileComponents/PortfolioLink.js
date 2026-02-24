const PortfolioLink = ({ portfolio }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-500/60 transition-all group cursor-pointer">
      <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">View Complete Portfolio</p>
      <a
        href={portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold text-lg"
      >
        <span>{portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </div>
  );
};

export default PortfolioLink;
