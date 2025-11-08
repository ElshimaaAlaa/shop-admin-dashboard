import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/GetFaqs";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
function AllFaqs({ refreshTrigger }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        const data = await getFaqs();
        setFaqsData(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setFaqsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqs();
  }, [refreshTrigger]);

  useEffect(() => {
    if (containerRef.current && displayCount > 5) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayCount]);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showMoreFaqs = () => {
    setDisplayCount((prev) => Math.min(prev + 5, faqsData.length));
  };

  const showLessFaqs = () => {
    setDisplayCount(5);
    setOpenIndex(null);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  if (isLoading) {
    return (
      <section className="mt-5 w-full flex justify-center items-center h-40">
        <ClipLoader color="#E0A75E" size={40} />
      </section>
    );
  }
  return (
    <section className="my-5 w-full">
      <div
        ref={containerRef}
        className=""
      >
        {faqsData.slice(0, displayCount).map((item, index) => (
          <div
            key={index}
            className={`mt-5 p-5 bg-gray-50 rounded-lg transition-all duration-300 ${
              openIndex === index ? "border-2 border-primary" : ""
            }`}
          >
            <div
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h1 className="font-bold text-17">{item.question}</h1>
              <span>
                {openIndex === index ? (
                  <IoIosArrowUp color="#E0A75E" />
                ) : (
                  <IoIosArrowDown color="#E0A75E" />
                )}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-5 text-secondary text-14 font-light">
                {item.answer}
              </p>
            )}
          </div>
        ))}
        {faqsData.length === 0 && !isLoading && (
          <div className="mt-5 p-5 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-500">{t("noFaqs")}</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-5 gap-3">
        {displayCount < faqsData.length && (
          <button
            onClick={showMoreFaqs}
            className="text-center text-15 font-bold bg-primary text-white cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            {t("showMore")}
          </button>
        )}
        {displayCount > 5 && (
          <button
            onClick={showLessFaqs}
            className="text-center text-15 font-bold bg-gray-50 text-gray-500 cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            {t("showLess")}
          </button>
        )}
      </div>
    </section>
  );
}
export default AllFaqs;