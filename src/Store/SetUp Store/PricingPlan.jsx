import { useState } from "react";
import "./setUpStoreStyle.scss";
import { FaArrowRightLong, FaArrowLeftLong, FaCheck } from "react-icons/fa6";
import StepIndicator from "./StepIndicator";
import { useNavigate } from "react-router-dom";
export default function PricingPlan({ onNext, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange p-6 flex items-center justify-center">
      <div className="w-full lg:w-750 md:w-700px bg-white rounded-lg shadow-lg">
        <div className="flex justify-center my-7">
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-28" />
        </div>
        <div className="flex items-center mb-6 ps-6">
          <div className="bg-white border-[6px] border-primary text-dark font-bold rounded-full h-10 w-10 p-5 flex items-center justify-center text-xs mr-2">
            2/3
          </div>
          <p className="text-15 font-bold">
            Let's Get Started To Set Up Your Own Store .
          </p>
        </div>
        <StepIndicator currentStep={3} />
        <h2 className="text-17 font-bold text-center mt-3">
          Our Product Packages
        </h2>
        <p className="text-12 mt-1 text-gray-600 text-center mb-8">
          Choose The Perfect Plan For Your Needs
        </p>
        <div className="grid grid-cols-3 gap-4 px-6 mb-8">
          {/* Free Plan */}
          <div
            className={`border ${
              selectedPlan === "free" ? "border-primary" : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setSelectedPlan("free")}
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src="/assets/svgs/Featured icon.svg"
                alt="free plan"
                className="w-9"
              />
              <p className="text-customOrange-darkOrange mt-3 font-bold">
                Free
              </p>
              <h3 className="text-3xl font-bold mt-3">
                $0<span className="text-sm text-gray-400">/mth</span>
              </h3>
              <p className="text-xs text-gray-400 mt-3">Forever free</p>
            </div>

            <ul className="space-y-2 mb-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="flex items-center">
                  <FaCheck className="h-5 w-5 p-1 text-primary bg-customOrange-mediumOrange rounded-full p- mr-2 mt-0.5" />
                  <span className="text-xs text-gray-400">
                    Lorem ipsum dolor sit amet
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full ${
                selectedPlan === "free"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              } py-2 rounded-md font-bold`}
            >
              Select Plan
            </button>
          </div>

          {/* Standard Plan */}
          <div
            className={`border-1 ${
              selectedPlan === "standard" ? "border-primary" : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setSelectedPlan("standard")}
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src="/assets/svgs/Featured icon (1).svg"
                alt="standard plan"
                className="w-9"
              />
              <p className="text-customOrange-darkOrange font-bold mt-3">
                Standard
              </p>
              <h3 className="text-3xl font-bold mt-3">
                $10<span className="text-sm text-gray-400">/mo</span>
              </h3>
              <p className="text-xs text-gray-400 mt-3">Billed monthly</p>
            </div>

            <ul className="space-y-2 mb-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="flex items-start">
                  <FaCheck className="h-5 w-5 p-1 rounded-full text-primary bg-customOrange-mediumOrange mr-2 mt-0.5" />
                  <span className="text-xs text-gray-400">
                    Lorem ipsum dolor sit amet
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full ${
                selectedPlan === "standard"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              } py-2 rounded-md font-bold`}
            >
              Select Plan
            </button>
          </div>
          {/* Pro Plan */}
          <div
            className={`border-1 ${
              selectedPlan === "pro" ? "border-primary" : "border-gray-200"
            } rounded-lg p-4 cursor-pointer`}
            onClick={() => setSelectedPlan("pro")}
          >
            <div className="flex flex-col items-center mb-4">
              <img
                src="/assets/svgs/Featured icon (2).svg"
                alt="pro plan"
                className="w-9"
              />
              <p className="text-customOrange-darkOrange mt-3 font-bold">Pro</p>
              <h3 className="text-3xl mt-3 font-bold">
                $22<span className="text-sm text-gray-400">/mo</span>
              </h3>
              <p className="text-xs text-gray-400 mt-3">Billed monthly</p>
            </div>

            <ul className="space-y-2 mb-6">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="flex items-start">
                  <FaCheck className="h-5 w-5 p-1 text-primary bg-customOrange-mediumOrange rounded-full mr-2 mt-0.5" />
                  <span className="text-xs text-gray-400">
                    Lorem ipsum dolor sit amet
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full ${
                selectedPlan === "pro"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500"
              } py-2 rounded-md font-bold`}
            >
              Select Plan
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4 my-5 mx-5">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-dark px-6"
          >
            <FaArrowLeftLong size={15} /> Back
          </button>

          <button
            onClick={() => navigate("/PaymentInfo")}
            className="flex items-center gap-3 bg-primary text-white px-6 py-2 rounded-md"
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
}
