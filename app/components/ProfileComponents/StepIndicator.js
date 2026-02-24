const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all mb-2 ${
                currentStep >= step.id
                  ? "bg-blue-600 text-white border-2 border-blue-600"
                  : "bg-[#1e1e1e] text-gray-500 border-2 border-gray-700"
              }`}
            >
              {step.icon}
            </div>
            <p
              className={`text-xs text-center transition-colors ${
                currentStep >= step.id ? "text-blue-400" : "text-gray-600"
              }`}
            >
              {step.title}
            </p>
            {step.id < steps.length && (
              <div
                className={`h-1 w-16 mt-3 transition-all ${
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-full bg-[#1e1e1e] h-1 rounded-full overflow-hidden border border-gray-700">
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
