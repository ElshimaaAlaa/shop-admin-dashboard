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
        // Update state with new FAQ from API response
        setFaqsData((prevFaqs) => [questionData.data, ...prevFaqs]);
        resetForm(); // Reset the form after submission
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
    <div className="bg-white min-h-screen pb-10">
      <Helmet>
        <title>Frequently Asked Questions | VERTEX</title>
      </Helmet>
      <h2 className="font-bold text-center text-xl pt-10">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 text-center mt-3">
        We're here to help with any questions you have about plans, pricing,
        <br /> and supported features.
      </p>
      <div className="flex justify-center gap-5">
        {/* FAQ Section */}
        <section className=" mt-5 w-500px">
          {faqsData.map((item, index) => (
            <div
              key={index}
              className={`border-2 mt-5 p-5 rounded-lg transition-all duration-300 ${
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
          ))}
        </section>
        {/* Add Question Section */}
        <section className="bg-customOrange-mediumOrange rounded-md p-5 w-430 h-full mt-10">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chat-round-dots_svgrepo.com.svg"
              alt="chat"
              className="w-16 mb-2"
            />
          </div>
          <h2 className="font-bold text-lg text-center mb-1">
            Add Another Question
          </h2>
          <p className="text-gray-400 text-15 text-center mb-3">
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
