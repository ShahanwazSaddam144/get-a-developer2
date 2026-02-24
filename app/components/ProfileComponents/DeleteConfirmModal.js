const DeleteConfirmModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-700 w-96 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Delete Profile?</h2>
        <p className="text-gray-400 mb-8">
          This action cannot be undone. Your profile will be permanently deleted.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded-lg font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
