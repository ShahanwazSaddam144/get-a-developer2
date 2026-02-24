const NotificationToast = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transition-all z-50 ${
        type === "error"
          ? "bg-red-600 animate-pulse"
          : "bg-green-600 animate-bounce"
      }`}
    >
      {message}
    </div>
  );
};

export default NotificationToast;
