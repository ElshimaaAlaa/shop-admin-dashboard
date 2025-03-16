import { Formik, Form } from "formik";
import React, { useState } from "react";
import MainBtn from "../../Components/Main Button/MainBtn";
import Email from "../../Svgs/Email";
import "./forgotpassword.scss";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { ForgotPasswordService } from "../../ApiServices/ForgotPasswordService";
import { useNavigate } from "react-router-dom";
// import InputField from "../../Components/Input Field/InputField";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    try {
      await ForgotPasswordService(values.email);
      console.log("OTP sent successfully!");
      navigate("/VerifayPassword");
    } catch (error) {
      console.error(error.message);
      setErrors({ email: "Failed to send OTP. Please try again." });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="main-container min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>
      <div className="forgotpasswordContainer w-96 lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-white rounded-lg p-6">
        <div>
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-44" />
        </div>
        <h1 className="font-bold text-xl mt-5">Forgot Password</h1>
        <p className="text-secondary mt-3 text-15">
          Please enter the email address linked with your account.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-5 flex flex-col items-center w-full">
              <AuthInputField
                name="email"
                placeholder="Enter Your Email"
                icon={Email}
                error={touched.email && errors.email}
                active={touched.email}
              />
              {/* {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )} */}
              <div className="mt-5 w-full">
                <MainBtn
                  text={isLoading ? <ClipLoader color="#fff" size={22} /> : "Send Code"}
                  btnType="submit"
                  disabled={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
