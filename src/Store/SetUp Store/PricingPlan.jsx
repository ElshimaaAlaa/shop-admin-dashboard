import { FaArrowRightLong, FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import StepIndicator from "./StepIndicator";

const PLANS = [
  {
    id: 1,
    name: "Free",
    price: 0,
    period: "/mth",
    description: "Forever free",
    features: [
      "Basic store features",
      "Up to 50 products",
      "Basic analytics",
      "Email support",
      "Community access"
    ]
  },
  {
    id: 2,
    name: "Standard",
    price: 10,
    period: "/mo",
    description: "Billed monthly",
    features: [
      "All Free features",
      "Up to 500 products",
      "Advanced analytics",
      "Priority support",
      "Marketing tools"
    ]
  },
  {
    id: 3,
    name: "Pro",
    price: 22,
    period: "/mo",
    description: "Billed monthly",
    features: [
      "All Standard features",
      "Unlimited products",
      "Advanced reporting",
      "24/7 support",
      "Custom domain"
    ]
  }
];

export default function PricingPlan({ onNext, onBack, formData, updateFormData }) {
  const handlePlanSelect = (planId) => {
    updateFormData('plan_id', planId);
  };

  const handleNext = () => {
    if (!formData.plan_id) {
      alert("Please select a plan");
      return;
    }
    onNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-750 md:w-700px bg-white rounded-lg shadow-lg">
        {/* Header and Step Indicator */}
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center mb-6 ps-6">
          <div className="bg-white border-[6px] border-primary text-dark font-bold rounded-full h-10 w-10 p-5 flex items-center justify-center text-xs mr-2">
            3/4
          </div>
          <p className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store.
          </p>
        </div>
        <StepIndicator currentStep={3} />
        
        {/* Plans */}
        <h2 className="text-17 font-bold text-center mt-3">
          Our Product Packages
        </h2>
        <p className="text-12 mt-1 text-gray-600 text-center mb-8">
          Choose The Perfect Plan For Your Needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mb-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.plan_id === plan.id
                  ? "border-primary shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={`/assets/svgs/Featured icon (${plan.id-1}).svg`}
                  alt={`${plan.name} plan`}
                  className="w-9"
                />
                <p className="text-customOrange-darkOrange mt-3 font-bold">
                  {plan.name}
                </p>
                <h3 className="text-3xl font-bold mt-3">
                  ${plan.price}<span className="text-sm text-gray-400">{plan.period}</span>
                </h3>
                <p className="text-xs text-gray-400 mt-3">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="h-5 w-5 p-1 text-primary bg-customOrange-mediumOrange rounded-full mr-2 mt-0.5" />
                    <span className="text-xs text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-md font-bold ${
                  formData.plan_id === plan.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {formData.plan_id === plan.id ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-4 my-5 mx-5">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-dark px-6"
          >
            <FaArrowLeftLong size={15} /> Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-md"
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}