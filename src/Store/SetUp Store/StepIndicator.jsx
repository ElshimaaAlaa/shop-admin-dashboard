import React from "react";
import PropTypes from "prop-types";

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between border-t border-b items-center mt-2 rounded-md mb-6">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex gap-3 w-[230px] justify-center  items-center p-4 relative ${
            step.number === currentStep
              ? "bg-orange-50 border-b border-primary  font-bold"
              : step.number < currentStep
              ? "text-gray-600"
              : "text-gray-400"
          }`}
        >
          <div
            className={` rounded-full h-10 w-10 flex items-center justify-center text-sm font-medium ${
              step.number === currentStep
                ? "bg-primary text-white"
                : step.number < currentStep
                ? "bg-customOrange-mediumOrange text-primary font-bold"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {step.number < currentStep ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              step.number
            )}
          </div>
          <div className="flex flex-col gap-2 text-xs mt-3">
            <p className="text-gray-400 text-12  font-light text-left">{`Step ${step.number}`}</p>
            <p className="font-bold text-black">{step.title}</p>
          </div>
          {step.number === currentStep && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"></div>
          )}
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
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default StepIndicator;