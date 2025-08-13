import React from 'react';

const ProgressTracker = ({ currentStep }) => {
  const steps = ['Aadhaar Validation', 'PAN Validation'];
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-start">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center w-28">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 z-10 ${
              currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            1
          </div>
          <p className={`mt-2 text-xs font-semibold ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>{steps[0]}</p>
        </div>

        {/* Connector */}
        <div className="flex-1 h-1 bg-gray-300 mt-5 relative">
          <div
            className="h-1 bg-blue-600 absolute top-0 left-0 transition-all duration-500"
            style={{ width: currentStep > 1 ? '100%' : '0%' }}
          ></div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center w-28">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 z-10 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          >
            2
          </div>
          <p className={`mt-2 text-xs font-semibold ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>{steps[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;