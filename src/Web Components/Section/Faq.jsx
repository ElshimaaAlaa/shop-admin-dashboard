import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
    setOpenIndex(null);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqData(data);
      } catch (error) {
        console.error("Error fetching faqs", error);
      }
    };
    fetchFaqs();
  }, []);
  const faqsToShow = showAll ? faqData : faqData.slice(0, 5);
  return (
    <section className="ps-5 pe-5 lg:ps-20 lg:pe-20 pt-20 pb-10">
      <p className="bg-customOrange-mediumOrange text-primary w-20 text-center p-3 rounded-md">
        FAQ
      </p>
      <h1 className="font-bold text-2xl leading-normal lg:leading-normal mt-5 lg:text-xl lg:w-2/4 md:text-2xl md:w-full">
        If you don’t see an answer to your question, you can
        <span className="text-primary ms-2">
          send us an email from our contact form
        </span>
      </h1>
      <div className="mt-5">
        {faqsToShow.map((item, index) => (
          <div
            key={index}
            className={`border-1 rounded-lg mt-3 p-5 transition-all duration-300 ${
              openIndex === index
                ? "border-primary"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h1 className="font-bold text-lg">{item.question}</h1>
              <span className="text-lg">
                {openIndex === index ? (
                  <IoIosArrowUp className="text-primary" />
                ) : (
                  <IoIosArrowDown className="text-primary" />
                )}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-5 text-gray-500">{item.answer}</p>
            )}
          </div>
        ))}
        {faqData.length > 4 && (
          <div className="mt-6 text-center">
            <button
              onClick={toggleShowAll}
              className="bg-primary w-36 font-bold text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
export default Faq;