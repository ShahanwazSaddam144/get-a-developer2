const FormNavigation = ({ currentStep, stepsLength, isEditing, onPrev, onNext, onCancel, onSubmit }) => {
  return (
    <div className="flex gap-4 mt-10 pt-8 border-t border-gray-700">
      <button
        type="button"
        onClick={isEditing ? onCancel : onPrev}
        disabled={currentStep === 1 && !isEditing}
        className={`flex-1 p-4 rounded-lg font-semibold transition ${
          currentStep === 1 && !isEditing
            ? "bg-gray-700/30 text-gray-600 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-600 text-white"
        }`}
      >
        {isEditing ? "Cancel" : "← Previous"}
      </button>

      {currentStep === stepsLength || isEditing ? (
        <button
          type="submit"
          onClick={onSubmit}
          className="flex-1 p-4 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition"
        >
          {isEditing ? "Update Profile ✨" : "Create Profile 🚀"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex-1 p-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Next →
        </button>
      )}
    </div>
  );
};

export default FormNavigation;
