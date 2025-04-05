import React from 'react';
import PropTypes from 'prop-types';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="grid grid-cols-2 gap-4 border-t border-b mb-8 py-4">
      {steps.map((step) => (
        <div 
          key={step.number} 
          className={`flex items-center ${
            currentStep === step.number ? "bg-orange-50" : ""
          } p-3 rounded-lg transition-colors duration-200`}
        >
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3 ${
              currentStep === step.number 
                ? "bg-orange-500 text-white shadow-md" 
                : step.number < currentStep 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-200 text-gray-600"
            } transition-colors duration-200`}
          >
            {step.number < currentStep ? "✓" : step.number}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Step {step.number}</span>
            <span className={`text-sm ${
              currentStep === step.number ? "font-semibold text-orange-600" : "text-gray-700"
            } transition-colors duration-200`}>
              {step.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

StepIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default StepIndicator;