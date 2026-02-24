const ProfileActions = ({ onEdit, onDelete }) => {
  return (
    <div className="bg-[#161616] p-6 rounded-b-3xl border border-gray-800 border-t-0 flex gap-4">
      <button
        onClick={onEdit}
        className="flex-1 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 rounded-xl font-semibold transition-all duration-200"
      >
        ✏️ Edit Profile
      </button>
      <button
        onClick={onDelete}
        className="flex-1 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-xl font-semibold transition-all duration-200"
      >
        🗑️ Delete Profile
      </button>
    </div>
  );
};

export default ProfileActions;
