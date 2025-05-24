import { useState } from "react";
import * as Yup from "yup";
import { LuSend } from "react-icons/lu";
import MainBtn from "../../Components/Main Button/MainBtn";
import InputField from "../../Components/InputFields/InputField";
import { Formik, Form, Field } from "formik";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import { sendSupport } from "../../ApiServices/Support";
import { ClipLoader } from "react-spinners";

function SendSupport({ onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name should be at least 3 characters long")
      .max(50, "Name should not exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone number should be at least 10 digits long")
      .max(15, "Phone number should not exceed 15 digits")
      .required("Phone number is required"),
    message: Yup.string()
      .min(10, "Message should be at least 10 characters long")
      .max(500, "Message should not exceed 500 characters")
      .required("Message is required"),
  });

  const handleSubmit = async (values ,{resetForm}) => {
    setIsLoading(true);
    setError(null);
    try {
      await sendSupport(
        values.name,
        values.email,
        values.phone,
        values.message
      );
      onSuccess(); 
      resetForm()
    } catch (error) {
      setError("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-2">
            <InputField name="name" placeholder="Name" />
            <AuthInputField name="email" placeholder="Email" />
            <InputField name="phone" placeholder="Phone Number" />
            <Field
              as="textarea"
              placeholder="Description"
              name="message"
              className={`w-full bg-white outline-none border-2 rounded-lg p-2 h-24 block placeholder:text-14 
                      ${
                        errors.message && touched.message
                          ? "border-red-500 focus:border-red-500"
                          : touched.message
                          ? "border-green-500 focus:border-green-500"
                          : "border-gray-200 focus:border-primary"
                      }`}
            />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <MainBtn
              btnType={"submit"}
              text={
                isLoading ? (
                  <ClipLoader color="#fff" size={22} />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <LuSend />
                    Send Message
                  </div>
                )
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default SendSupport;