import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";
import { ClipLoader } from "react-spinners";

function AllFaqs({ refreshTrigger }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showMoreFaqs = () => {
    setDisplayCount(prev => prev + 5);
  };

  const showLessFaqs = () => {
    setDisplayCount(5);
    setOpenIndex(null); // Close all expanded FAQs when showing less
  };

  if (isLoading) {
    return (
      <section className="mt-5 w-[600px] flex justify-center items-center h-40">
        <ClipLoader color="#E0A75E" size={40} />
      </section>
    );
  }

  return (
    <section className="mt-5 w-[600px]">
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

      {/* Empty State */}
      {faqsData.length === 0 && !isLoading && (
        <div className="mt-5 p-5 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">No FAQs found</p>
        </div>
      )}

      {/* Show More/Less Buttons */}
      <div className="flex justify-center mt-5 gap-3">
        {displayCount < faqsData.length && (
          <button
            onClick={showMoreFaqs}
            className="text-center text-15 font-bold bg-primary text-white cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Show More (5)
          </button>
        )}
        {displayCount > 5 && (
          <button
            onClick={showLessFaqs}
            className="text-center text-15 font-bold bg-gray-300 text-gray-700 cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Show Less
          </button>
        )}
      </div>
    </section>
  );
}

export default AllFaqs;