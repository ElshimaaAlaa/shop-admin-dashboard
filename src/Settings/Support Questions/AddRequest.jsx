import React, { useState } from "react";
import "./Style.scss";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { AddNewRequest } from "../../ApiServices/AddRequest";
import { IoMdAddCircleOutline } from "react-icons/io";

function AddRequest({ isOpen, onClose, onSuccess, questionId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialValues = {
    answer: "",
  };

  const validationSchema = Yup.object({
    answer: Yup.string().required("Answer is required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AddNewRequest(questionId, values.answer);
      if (onSuccess) onSuccess(response);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add response");
      console.error("Error adding response:", error);
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
            className="w-16 mb-2 mt-4"
          />
          <h3 className="text-17 font-bold">Add Response</h3>
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
              <Field
                as="textarea"
                name="answer"
                placeholder="Your Response"
                className="w-full h-24 p-3 border-2 rounded-md outline-none transition-all duration-200 placeholder:text-14 focus:border-primary placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-primary text-white font-semibold rounded-md p-3 w-full flex items-center gap-1 justify-center disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader color="#fff" size={26} />
                ) : (
                  <>
                    <IoMdAddCircleOutline size={23} /> Add
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
export default AddRequest;