import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
const faqData = [
  {
    question: "Can users promote items offline ?",
    answer:
      "You can return any item within 30 days of purchase for a full refund.",
  },
  {
    question: "Can users promote items offline ?",
    answer:
      "Yes, after the successful payment, admin will approve and your item will be promoted.",
  },
  {
    question: "Can users promote items offline ?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email.",
  },
  {
    question: "Can users promote items offline ?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email.",
  },
];
function Faqs() {
  const [isLoading, setIsLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const initialValues = {
    message: "",
  };
  const validationSchema = Yup.object({
    message: Yup.string().required("Message is required"),
  });
  const handleSubmit = async (values) => {
    setIsLoading(true);
  };
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
        <Helmet>
            <title>Frequently Asked Questions | VERTEX</title>
            <meta name="description" content="Frequently asked questions about VERTEX" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="Frequently Asked Questions | VERTEX" />
            <meta property="og:description" content="Frequently asked questions about VERTEX" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.vertex.io/faq" />
            <meta property="og:image" content="https://www.vertex.io/og-image.jpg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Frequently Asked Questions | VERTEX" />
        </Helmet>
      <h2 className="font-bold text-center text-xl pt-10">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-400 text-center mt-3">
        We're here to help with any questions you have about plans, pricing,
        <br /> and supported features.
      </p>
      <div className="flex justify-center gap-5">
        <section className="h-96 mt-5 w-500px">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 bg-customGray-grayLine mt-6 p-5 rounded-md"
            >
              <div
                onClick={() => toggleFaq(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  color: openIndex === index ? "black" : "black",
                }}
              >
                <h1 className="font-bold text-lg">{item.question}</h1>
                <span>
                  {openIndex === index ? <IoIosArrowUp color="#E0A75E"/> : <IoIosArrowDown color="#E0A75E" />}
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
        <section className="bg-customOrange-mediumOrange rounded-md p-5 w-450 h-full mt-10">
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
            <Form>
              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                className="w-full outline-none border-2 border-gray-200 rounded-md p-2 h-24 placeholder:text-14 focus:border-primary"
              />
              <button
                aria-label="Send message"
                className=" mt-2 bg-primary w-full text-white flex items-center justify-center gap-3 p-3 rounded-md text-lg font-semibold"
                type="submit"
              >
                <img
                  src="/assets/svgs/send message.svg"
                  alt="send-message"
                  className="w-5 h-5"
                />
                {isLoading ? (
                  <ClipLoader color="#E0A75E" size={22} />
                ) : (
                  " Send Message"
                )}
              </button>
            </Form>
          </Formik>
        </section>
      </div>
    </div>
  );
}
export default Faqs;
