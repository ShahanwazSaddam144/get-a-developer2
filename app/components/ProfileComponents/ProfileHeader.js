const ProfileHeader = ({ profile, expandDesc, setExpandDesc }) => {
  return (
    <div className="bg-gradient-to-br from-[#1e1e1e] to-[#161616] p-8 rounded-t-3xl border border-gray-800 border-b-0">
      <div className="flex items-end gap-6 pb-8 border-b border-gray-700/50">
        <div className="relative">
          <img
            src={profile.avator}
            alt="avatar"
            className="w-32 h-32 rounded-2xl object-cover border-3 border-blue-500 shadow-2xl"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-3 border-[#1e1e1e]" />
        </div>
        <div className="flex-1 pb-2">
          <h2 className="text-4xl font-bold text-white mb-2">{profile.name}</h2>
          <p className="text-blue-400 text-lg font-semibold mb-1">{profile.category}</p>
          <p className="text-gray-500 text-sm">{profile.email}</p>
          {profile.phone && <p className="text-gray-500 text-sm">{profile.phone}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
