import { FaArrowRightLong, FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import StepIndicator from "./StepIndicator";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { setUpStore } from "../../ApiServices/setUpStore";

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
      "Community access",
    ],
    icon: "/assets/svgs/Featured icon.svg",
  },
  {
    id: 2,
    name: "Standard",
    price: 10,
    period: "/mth",
    description: "Billed monthly",
    features: [
      "All Free features",
      "Up to 500 products",
      "Advanced analytics",
      "Priority support",
      "Marketing tools",
    ],
    icon: "/assets/svgs/Featured icon (1).svg",
  },
  {
    id: 3,
    name: "Pro",
    price: 22,
    period: "/mth",
    description: "Billed monthly",
    features: [
      "All Standard features",
      "Unlimited products",
      "Advanced reporting",
      "24/7 support",
      "Custom domain",
    ],
    icon: "/assets/svgs/Featured icon (2).svg",
  },
];

const PricingPlan = ({
  onNext,
  onBack,
  formData = {},
  updateFormData = () => {},
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(
    location.state?.plan_id
      ? PLANS.find((p) => p.id === location.state.plan_id)
      : null
  );
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const steps = [
    { number: 1, title: "Store Theme" },
    { number: 2, title: "Store Profile" },
    { number: 3, title: "Pricing Plan" },
  ];

  const handlePlanSelect = (planId) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
      setError(null);
      updateFormData("plan_id", plan.id);
      localStorage.setItem("plan_id" , plan.id)
    }
  };

  const handleNext = async () => {
    if (!selectedPlan) {
      setError("Please select a plan");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("plan_id", selectedPlan.id);
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      const response = await setUpStore(formDataToSend);
      console.log("pricing response", response);
      navigate("/Register/PaymentInfo", {
        state: {
          ...formData,
          plan_id: selectedPlan.id,
          ...response.data,
        },
      });

      if (onNext) {
        onNext({
          ...formData,
          plan_id: selectedPlan.id,
          ...response.data,
        });
      }
    } catch (error) {
      console.error("Error setting up store:", error);
      setError(error.message || "Failed to setup store. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <Helmet>
        <title>Set Up Store - Pricing Plan</title>
      </Helmet>
      <div className="w-full lg:w-750 md:w-700px bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center gap-3 mb-5 px-6">
          <div className="rounded-full border-[5px] border-primary p-2 font-bold">
            1/3
          </div>
          <h3 className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store.
          </h3>
        </div>
        <StepIndicator currentStep={3} steps={steps} />

        <h2 className="text-17 font-bold text-center mt-3">
          Our Product Packages
        </h2>
        <p className="text-12 mt-1 text-gray-600 text-center mb-8">
          Choose The Perfect Plan For Your Needs
        </p>

        {error && (
          <div className="mx-6 mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mb-8">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedPlan?.id === plan.id
                  ? "border-primary shadow-lg bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={plan.icon}
                  alt={`${plan.name} plan`}
                  className="w-9"
                />
                <p className="text-customOrange-darkOrange mt-3 font-bold">
                  {plan.name}
                </p>
                <h3 className="text-3xl font-bold mt-3">
                  ${plan.price}
                  <span className="text-sm text-gray-400">{plan.period}</span>
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
                  selectedPlan?.id === plan.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 my-5 mx-5">
          <button
            onClick={() => navigate("/Register/StoreProfile")}
            className="flex items-center font-bold gap-3 text-dark px-6 py-2"
          >
            <FaArrowLeftLong size={15} /> Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-3 w-32 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={22} color="#fff" />
            ) : (
              <>
                Next <FaArrowRightLong />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
PricingPlan.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  formData: PropTypes.object,
  updateFormData: PropTypes.func.isRequired,
};
PricingPlan.defaultProps = {
  formData: {},
};
export default PricingPlan;