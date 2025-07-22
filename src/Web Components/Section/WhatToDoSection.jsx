import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const cardData = (t) => [
  {
    id: 1,
    image: "/assets/images/task 1.png",
    title: t("tamplates"),
    description: t("lorem"),
  },
  {
    id: 2,
    image: "/assets/images/task 2.png",
    title: t("onePlace"),
    description: t("lorem"),
  },
  {
    id: 3,
    image: "/assets/images/task 3.png",
    title: t("effective"),
    description: t("lorem"),
  },
];

function WhatToDoSection() {
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  useEffect(() => {
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <section className="ps-5 pe-5 mt-20 mb-20 lg:pe-20 lg:ps-20">
      <p className="text-primary text-15 bg-customOrange-lightOrange p-2 rounded w-40 text-center cursor-pointer">
        {t("whatToDo")}
      </p>
      <h1 className="font-bold text-xl mt-4">
        {t("whyChoose")}
        <span className="ms-2 text-primary">{t("meetNeeds")}</span>
      </h1>
      <div className="flex flex-col gap-4 mt-6 lg:flex-row md:flex-row relative overflow-hidden">
        {cardData(t).map((card) => (
          <div
            key={card.id}
            className="relative group overflow-hidden rounded flex-1"
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="w-full h-80 transform transition-transform duration-500 group-hover:scale-105"
            />
            <p className="text-18 text-center pb-3 font-bold text-white absolute w-full h-full bg-gray-600 bg-opacity-15 top-0 flex items-end justify-center">
              {card.title}
            </p>
            <div className="flex flex-col  absolute rounded bg-primary w-full h-full text-white top-0 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
              <h1 className="font-bold text-2xl mt-7 ms-3">{card.title}</h1>
              <p className="ms-3 mt-5 leading-normal">{card.description}</p>
              <p className="text-18 flex items-center gap-3 ms-3 absolute bottom-2">
                {t("learnMore")}{" "}
                {isRTL ? (
                  <FaArrowLeftLong className="mt-1" />
                ) : (
                  <FaArrowRightLong className="mt-1" />
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default WhatToDoSection;