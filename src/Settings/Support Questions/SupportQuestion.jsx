import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GoMail } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getSupportQusetions } from "../../ApiServices/SupportQuestions";
import AddSupportQuestion from "./AddSupportQuestion";
import { ClipLoader } from "react-spinners";
import DeleteQuestion from "./DeleteQuestion";
import { useNavigate } from "react-router-dom";

function SupportQuestion() {
  const [faqsData, setFaqsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSupportQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSupportQusetions();
      setFaqsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setError("Failed to load questions. Please try again.");
      setFaqsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportQuestions();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleDeleteQuestion = async (questionId) => {
    setFaqsData(prevQuestions => prevQuestions.filter(q => q.id !== questionId));
    try {
      await fetchSupportQuestions();
    } catch (error) {
      console.error("Failed to refresh questions after deletion:", error);
    }
  };

  const handleAddSuccess = (newQuestion) => {
    setFaqsData(prev => [...prev, newQuestion]);
    fetchSupportQuestions(); 
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[89vh]">
      <Helmet>
        <title>Support Questions | vertex</title>
      </Helmet>
      <div className="rounded-md p-5 mx-7 bg-white mt-5 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-12">
            Menu / Customers / Support Questions
          </p>
          <h1 className="text-17 font-bold mt-2">Support Questions</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border-2 border-primary text-primary font-bold flex items-center gap-2 p-3"
            onClick={() => setShowAddQuestionModal(true)}
          >
            <IoMdAddCircleOutline size={24} />
            Add Question
          </button>
          <button
            className="font-bold text-white flex items-center justify-center gap-3 p-3 rounded-md bg-primary w-40"
            onClick={() => navigate("/Dashboard/Requests")}
          >
            <GoMail size={20} />
            Requests
          </button>
        </div>
      </div>

      <AddSupportQuestion
        isOpen={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        onSuccess={handleAddSuccess}
      />

      <section className="bg-white mx-7 p-5 mt-3 rounded-md">
        <h3 className="text-16 font-bold">Questions</h3>
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : error ? (
          <div className="mt-5 text-red-500">{error}</div>
        ) : faqsData.length === 0 ? (
          <p className="mt-5 text-gray-400">No questions found</p>
        ) : (
          faqsData.slice(0, 4).map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex gap-3 justify-between"
            >
              <div
                className={`border-2 mt-5 w-full p-5 rounded-lg transition-all duration-300 ${
                  openIndex === index
                    ? "border-2 border-primary"
                    : "border-2 border-gray-200 bg-customGray-grayLine"
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
              <div>
                <button className="border-red-600 border bg-red-50 rounded-md p-3 mt-6">
                  <DeleteQuestion
                    id={item.id}
                    onDelete={handleDeleteQuestion}
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default SupportQuestion;