import { useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { Formik, Form, Field } from "formik";
import { LuSend } from "react-icons/lu";
import * as Yup from "yup";
import { addFaqs } from "../../ApiServices/AddFags";
import InputField from "../../Components/InputFields/InputField";
import MainBtn from "../../Components/Main Button/MainBtn";
import AllFaqs from "./AllFaqs";

function Faqs() {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
      await addFaqs(values.question, values.answer);
      resetForm();
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Failed to add FAQ:", error);
    } finally {
      setIsLoading(false);
    }
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
        <AllFaqs refreshTrigger={refreshTrigger} />
        
        <section className="bg-customOrange-mediumOrange rounded-md p-5 w-450 h-full mt-10">
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
            {() => (
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