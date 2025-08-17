import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { Formik, Form, Field } from "formik";
import { getFaqs } from "../../ApiServices/AllFaqs-Web";
import { LuSend } from "react-icons/lu";
import * as Yup from "yup";
import { addFaqs } from "../../ApiServices/AddFags";
import InputField from "../../Components/InputFields/InputField";
import MainBtn from "../../Components/Main Button/MainBtn";
import AllFaqs from "./AllFaqs";
import { useTranslation } from "react-i18next";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
function Faqs() {
  const [isLoading, setIsLoading] = useState(false);
  const [faqsData, setFaqsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const initialValues = {
    question: "",
    answer: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string(),
    answer: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const questionData = await addFaqs(values.question, values.answer);
      if (questionData && questionData.data) {
        setFaqsData((prevFaqs) => [questionData.data, ...prevFaqs]);
      }
      resetForm();
      setShowModal(true);
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

  return (
    <div className="">
      <Helmet>
        <title>
          {t("faq")} | {t("vertex")}
        </title>
      </Helmet>
      <h2 className="font-bold text-center text-17 mt-4 rtl:text-[20px]">
        {t("faq")}
      </h2>
      <p className="text-gray-400 text-center mt-2 text-15 w-500px m-auto rtl:w-390 rtl:text-[17px]">
        {t("faqsP")}
      </p>
      <div className="flex justify-center gap-5 mx-20 rtl:flex-row-reverse">
        {/* FAQ Section */}
        <AllFaqs />
        {/* Add Question Section */}
        <section className="bg-customOrange-mediumOrange rounded-md p-5 w-700 h-full mt-10">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chat-round-dots_svgrepo.com.svg"
              alt="chat"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1">
            {t("addQuestion")}
          </h2>
          <p className="text-gray-400 text-14 text-center mb-3">
            {t("helpYou")}
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="question" placeholder={t("question")} />
                <Field
                  as="textarea"
                  name="answer"
                  placeholder={t("answer")}
                  className="w-full mt-2 mb-1 outline-none border-2 border-gray-200 rounded-lg p-2 h-32 placeholder:text-13 focus:border-primary"
                />
                <MainBtn
                  btnType={"submit"}
                  text={
                    isLoading ? (
                      <ClipLoader color="#fff" size={22} />
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <LuSend /> {t("sendQ")}
                      </div>
                    )
                  }
                />
              </Form>
            )}
          </Formik>
        </section>
      </div>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col w-370 items-center">
          <img
            src="/assets/images/success.png"
            alt="Success"
            className="w-32 mt-6"
          />
          <p className="font-bold text-16 mt-5 text-center rtl:text-[18px]">
            {t("successMessage")}
          </p>
          <button
            className="bg-primary text-white rounded-md px-2 py-2 text-14 mt-4 w-24 font-bold rtl:text-[15px]"
            onClick={() => setShowModal(false)}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default Faqs;