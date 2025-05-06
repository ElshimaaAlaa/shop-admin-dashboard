import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { Formik, Form, Field } from "formik";
import { getFaqs } from "../../ApiServices/AllFaqs";
import { LuSend } from "react-icons/lu";
import * as Yup from "yup";
import { addFaqs } from "../../ApiServices/AddFags";
import InputField from "../../Components/InputFields/InputField";
import MainBtn from "../../Components/Main Button/MainBtn";

function Faqs() {
  const [isLoading, setIsLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [faqsData, setFaqsData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 5;

  const initialValues = {
    question: "",
    answer: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const questionData = await addFaqs(values.question, values.answer);
      if (questionData && questionData.data) {
        setFaqsData((prevFaqs) => [questionData.data, ...prevFaqs]);
        resetForm();
      }
    } catch (error) {
      console.error("Failed to add FAQ:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="bg-white pb-5">
      <Helmet>
        <title>Frequently Asked Questions | VERTEX</title>
      </Helmet>
      <h2 className="font-bold text-center text-17 mt-8">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 text-center mt-2 text-15">
        We're here to help with any questions you have about plans, pricing,
        <br /> and supported features.
      </p>

      <div className="flex justify-center gap-5 mx-20">
        {/* FAQ Section */}
        <section className="mt-5 w-700">
          {(showAll ? faqsData : faqsData.slice(0, initialDisplayCount)).map((item, index) => (
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

        {/* Add Question Section */}
        <section className="bg-customOrange-mediumOrange rounded-md p-5 w-500 h-full mt-10">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chat-round-dots_svgrepo.com.svg"
              alt="chat"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1">
            Add Another Question
          </h2>
          <p className="text-gray-400 text-14 text-center mb-3">
            We are here to help you
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="question" placeholder="Question" />
                <Field
                  as="textarea"
                  name="answer"
                  placeholder="Your Answer"
                  className="w-full mt-2 mb-1 outline-none border-2 border-gray-200 rounded-md p-2 h-24 placeholder:text-14 focus:border-primary"
                />
                <MainBtn
                  btnType={"submit"}
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <LuSend /> Send Question
                      </div>
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </div>
  );
}

export default Faqs;