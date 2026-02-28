const MessageModal = ({ show, onClose, onSend, messageText, setMessageText, sending }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-700 w-96 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Send a Message</h2>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message here..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-[#121212] border border-gray-700 focus:border-blue-500 focus:outline-none text-white placeholder-gray-600 resize-none mb-6"
        />
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-semibold transition"
            disabled={sending}
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition text-white"
            disabled={sending || !messageText.trim()}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
