import { Formik, Form} from "formik";
import React, { useState } from "react";
import MainBtn from "../../Components/Main Button/MainBtn";
import Email from "../../Svgs/Email";
import "./forgotpassword.scss";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import { ForgotPasswordService } from "../../ApiServices/ForgotPasswordService";
import { useNavigate } from "react-router-dom";
import InputField from "../../Components/Input Field/InputField";
function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const intialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (value) => {
    setIsLoading(true);
    try {
      await ForgotPasswordService(value.email);
      console.log("OTP sent successfully!");
      navigate("/VerifayPassword");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" main-container min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>
      <div className="forgotpasswordContainer w-96 lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-white rounded-lg">
        <div className="flex justify-center">
          <img src="/assets/images/logo (2).png" alt="logo" />
        </div>
        <h1 className="font-bold text-xl mt-10">Forget Password</h1>
        <p className="text-secondary mt-3 text-16">
          Please enter the email address linked with your account.
        </p>
        <Formik
          initialValues={intialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="mt-5 flex  flex-col items-center">
            <InputField name={"email"} placeholder={"Enter Your Email"} icon={Email}/>
            <div className="mt-5">
              <MainBtn
                text={isLoading ? <ClipLoader color="#fff" size={22}/> : "Send Code"}
                btnType={"submit"}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default ForgotPassword;