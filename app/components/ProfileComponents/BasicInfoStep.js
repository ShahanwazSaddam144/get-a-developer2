const BasicInfoStep = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Full Name</label>
        <input
          type="text"
          value={formData.name}
          disabled
          className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 text-gray-400 placeholder-gray-600"
        />
      </div>
      <div>
        <label className="text-gray-300 font-semibold mb-2 block">Email Address</label>
        <input
          type="email"
          value={formData.email}
          disabled
          className="w-full p-4 rounded-lg bg-[#121212] border border-gray-700 text-gray-400 placeholder-gray-600"
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
