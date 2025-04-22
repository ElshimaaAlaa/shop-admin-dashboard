import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

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

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const planId = localStorage.getItem("plan_id");
    if (planId) {
      const plan = PLANS.find((p) => p.id === Number(planId));
      if (plan) {
        setSelectedPlan(plan);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading your plan...</p>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No plan selected yet.</p>
          <button
            onClick={() => navigate("/Register/PricingPlan")}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          >
            Select a Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Helmet>
        <title>Your Pricing Plan</title>
      </Helmet>

      <div className="">
        <div className="flex justify-between">
          <h1 className="text-[20px] font-bold">Your Current Plan</h1>
          <button
            onClick={() => navigate("/Register/PricingPlan")}
            className="bg-primary font-bold w-44 text-white p-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            Change Plan
          </button>
        </div>
        <div className="border w-300 rounded-md p-5 mt-3">
          <div className="">
            <div className="flex flex-col items-center gap-3">
              <img
                src={selectedPlan.icon}
                alt={`${selectedPlan.name} plan`}
                className="w-12 h-12 mt-3"
              />
              <div>
                <h2 className="text-16 mt-2 text-center font-bold text-customOrange-darkOrange">
                  {selectedPlan.name} Plan
                </h2>
                <p className="text-center text-3xl my-3 font-bold">
                  ${selectedPlan.price}
                  <span className="text-sm text-gray-400 ml-1">
                    {selectedPlan.period}
                  </span>
                </p>
                <p className="text-gray-400 text-13">{selectedPlan.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ul className="space-y-3">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="h-5 w-5 p-1 text-primary bg-customOrange-mediumOrange rounded-full mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-14">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pricing;