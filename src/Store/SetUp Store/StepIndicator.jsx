export default function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, title: "Store Theme" },
    { number: 2, title: "Store Profile" },
    { number: 3, title: "Pricing Plan" },
    { number: 4, title: "Payment" }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 border-t border-b mb-5">
      {steps.map((step) => (
        <div 
          key={step.number} 
          className={`flex items-center ${currentStep === step.number ? "bg-customOrange-mediumOrange" : ""} p-3`}
        >
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center text-17 mr-2 ${
              currentStep === step.number ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            {step.number}
          </div>
          <p className={`flex flex-col gap-2 text-11 font-bold ${currentStep === step.number ? "font-bold" : "text-dark"}`}>
            <span className="text-gray-400 font-light">Step {step.number}</span>
            {step.title}
          </p>
        </div>
      ))}
    </div>
  );
}