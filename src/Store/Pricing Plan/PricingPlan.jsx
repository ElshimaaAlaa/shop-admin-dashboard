import { useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Move PLANS inside the component and use useMemo
  const PLANS = useMemo(
    () => [
      {
        id: 1,
        name: t("free"),
        price: 0,
        period: t("perMonth"),
        description: t("foreverFree"),
        features: [
          t("basicStoreFeatures"),
          t("upTo50Products"),
          t("basicAnalytics"),
          t("emailSupport"),
          t("communityAccess"),
        ],
        icon: "/assets/svgs/Featured icon.svg",
      },
      {
        id: 2,
        name: t("standard"),
        price: 10,
        period: t("perMonth"),
        description: t("billedMonthly"),
        features: [
          t("allFreeFeatures"),
          t("upTo500Products"),
          t("advancedAnalytics"),
          t("prioritySupport"),
          t("marketingTools"),
        ],
        icon: "/assets/svgs/Featured icon (1).svg",
      },
      {
        id: 3,
        name: t("pro"),
        price: 22,
        period: t("perMonth"),
        description: t("billedMonthly"),
        features: [
          t("allStandardFeatures"),
          t("unlimitedProducts"),
          t("advancedReporting"),
          t("247Support"),
          t("customDomain"),
        ],
        icon: "/assets/svgs/Featured icon (2).svg",
      },
    ],
    [t]
  );

  useEffect(() => {
    const planId = localStorage.getItem("plan_id");
    if (planId) {
      const plan = PLANS.find((p) => p.id === Number(planId));
      if (plan) {
        setSelectedPlan({
          ...plan,
          // Translate the features when setting the selected plan
          features: plan.features.map(feature => t(feature)),
          description: t(plan.description)
        });
      }
    }
    setLoading(false);
  }, [PLANS, t]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>{t("loadPlan")}</p>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-bold">{t("noPlan")}</p>
          <button
            onClick={() => navigate("/Register/PricingPlan")}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
          >
            {t("selectPlan")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Helmet>
        <title>{t("yourPlan")}</title>
      </Helmet>

      <div className="">
        <div className="flex justify-between">
          <h1 className="text-[18px] font-bold">{t("yourPlan")}</h1>
          <button
            onClick={() => navigate("/Register/PricingPlan")}
            className="bg-primary w-36 font-bold text-white p-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            {t("changePlan")}
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
                  {selectedPlan.name}
                </h2>
                <p className="text-center text-3xl my-3 font-bold">
                  ${selectedPlan.price}
                  <span className="text-sm text-gray-400 ml-1">
                    {selectedPlan.period}
                  </span>
                </p>
                <p className="text-gray-400 text-13">
                  {selectedPlan.description}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <ul className="space-y-3">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="h-5 w-5 p-1 text-primary bg-customOrange-mediumOrange rounded-full mr-2 rtl:me-2 mt-0.5 flex-shrink-0" />
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