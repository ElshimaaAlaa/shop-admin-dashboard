export default function StepIndicator({ currentStep }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className={`flex items-center ${currentStep === 1 ? "bg-customOrange-mediumOrange" : ""} p-5`}>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center text-17 mr-2 ${
              currentStep === 1 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            1
          </div>
          <p className={`flex flex-col gap-2 text-11 font-bold ${currentStep === 1 ? "font-bold" : "text-dark"}`}>
            <span className="text-gray-400 font-light">Step 1</span>Store Theme
            </p>
        </div>
  
        <div className={`flex items-center ${currentStep === 2 ? "bg-customOrange-mediumOrange" : ""} p-5`}>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center text-17 mr-2 ${
              currentStep === 2 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            2
          </div>
          <p className={`flex flex-col gap-2 text-11 font-bold ${currentStep === 2 ? "font-bold" : "text-dark"}`}>
            <span className="text-gray-400 font-light">Step 2</span>Store Profile</p>
        </div>
  
        <div className={`flex items-center ${currentStep === 3 ? "bg-customOrange-mediumOrange" : ""} p-5`}>
          <div
            className={`rounded-full h-10 w-10 flex items-center justify-center text-17 mr-2 ${
              currentStep === 3 ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            3
          </div>
          <p className={`flex flex-col gap-2 text-11 font-bold ${currentStep === 3 ? "font-bold" : "text-dark"}`}>
            <span className="text-gray-400 font-light">Step 3</span>Pricing Plan</p>
        </div>
      </div>
    )
  }
  
  