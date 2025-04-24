import React, { useState } from "react";
import "./Style.scss";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import InputField from "../../Components/InputFields/InputField";
import { FaCircleCheck } from "react-icons/fa6";
import { AddNewSupportQuestion } from "../../ApiServices/AddSupportQuestion";

function AddSupportQuestion({ isOpen, onClose, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialValues = {
    question: "",
    answer: "",
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question is required"),
    answer: Yup.string(),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuestion = await AddNewSupportQuestion(values.question, values.answer);
      if (onSuccess) onSuccess(newQuestion);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add question");
      console.error("Error adding question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay rounded">
      <div className="modalContent modal-width rounded" id="modal-width">
        <div className="modal-content flex flex-col justify-center items-center">
          <img
            src="/assets/svgs/chat-round-dots_svgrepo.com.svg"
            alt="chat"
            className="w-14 my-4"
          />
          <h3 className="text-17 font-bold">Add Another Question</h3>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="w-350 ms-3 mt-3 flex flex-col gap-3">
              <InputField name={"question"} placeholder={"Question"} />
              <Field
                as="textarea"
                name={"answer"}
                placeholder={"Response"}
                className={`w-full h-24 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400`}
              />
              <button
                type={"submit"}
                className="bg-primary text-white font-semibold rounded-md p-3 w-full flex items-center gap-2 justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={33} />
                ) : (
                  <>
                    <FaCircleCheck /> {"Add Question"}
                  </>
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default AddSupportQuestion;