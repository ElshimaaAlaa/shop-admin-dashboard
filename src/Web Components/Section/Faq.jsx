import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
  return (
    <section className="ps-5 pe-5 lg:ps-32 lg:pe-32 pt-20 pb-10">
      <p className="bg-customOrange-mediumOrange text-primary w-20 text-center p-3 rounded-md">
        FAQ
      </p>
      <h1 className="font-bold text-2xl leading-normal lg:leading-normal mt-5 lg:text-2xl lg:w-3/4 md:text-2xl md:w-full">
        If you don’t see an answer to your question, you can
        <span className="text-primary ms-2">
          send us an email from our contact form
        </span>
      </h1>
      <div className="mt-5">
        {faqData.slice(0,4).map((item, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg mt-6 p-5 transition-all duration-300 ${
              openIndex === index
                ? "border-primary"
                : "border-gray-200 bg-customGray-grayLine"
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
              <p className="mt-5 text-darkGray">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
export default Faq;