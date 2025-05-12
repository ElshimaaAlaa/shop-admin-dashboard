import React ,{useState ,useEffect} from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFaqs } from "../../ApiServices/AllFaqs";

function AllFaqs() {
  const [openIndex, setOpenIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
      const [faqsData, setFaqsData] = useState([]);
    
  const initialDisplayCount = 5;
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs();
        setFaqsData(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setFaqsData([]);
      }
    };
    fetchFaqs();
  }, []);
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="mt-5 w-700">
      {(showAll ? faqsData : faqsData.slice(0, initialDisplayCount)).map(
        (item, index) => (
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
        )
      )}
      {/* Show More / Show Less Button */}
      {faqsData.length > initialDisplayCount && (
        <div className="flex justify-center mt-5">
          <p
            onClick={() => setShowAll(!showAll)}
            className="text-center text-15 font-bold bg-primary text-white cursor-pointer w-44 px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </p>
        </div>
      )}
    </section>
  );
}

export default AllFaqs;
