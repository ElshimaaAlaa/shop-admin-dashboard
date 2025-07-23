import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
function OurProcess() {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const steps = [
    {
      number: "01",
      title: t("createAcc"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/login_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-7"
          />
        </div>
      ),
    },
    {
      number: "02",
      title: t("tamplates"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/customize_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-6"
          />
        </div>
      ),
    },
    {
      number: "03",
      title: t("choosePlan"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/payment-method-pay_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-7"
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <section className={`px-5 lg:px-20 mt-10 ${isRTL?"rtl":"ltr"}`}>
      <div>
        <p className="text-primary text-17 bg-customOrange-lightOrange p-2 w-32 text-center rounded">
          {t("ourProceess")}
        </p>
        <h2 className="text-xl md:text-xl font-bold mt-5 text-center md:text-left rtl:text-start">
          {t("design")}
          <span className="text-primary block md:inline ms-3">
            {t("e-commerce")}
          </span>
        </h2>
      </div>

      <div className="relative mt-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center md:items- gap-8 mb-16 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Section */}
            <div className={`flex-1 text-center ${index % 2 === 1 ? "" : ""}`}>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-center">
                {step.title}
              </h3>
              <p className="text-gray-400  m-auto max-w-80 text-14">
                {step.description}
              </p>
            </div>

            {/* Icon & Badge */}
            <div className="relative">
              {/* Hexagon shape */}
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div
                  className="absolute inset-0 bg-customOrange-mediumOrange"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Number badge */}
              <div className="absolute -top-2 left-24 md:left-28 w-8 h-8 md:w-10 md:h-10 rounded-full bg-customOrange-darkOrange font-bold p-2 text-white flex items-center justify-center text-sm">
                {step.number}
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-28 left-1/2 w-px h-16 bg-orange-200"></div>
              )}
            </div>

            <div className="flex-1"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default OurProcess;
