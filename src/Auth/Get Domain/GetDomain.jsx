import React, { useState } from "react";
import "./getDomainStyle.scss";
import { Helmet } from "react-helmet";
import AuthInputField from "../../Components/AuthInput Field/AuthInputField";
import { Form, Formik } from "formik";
import MainBtn from "../../Components/Main Button/MainBtn";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { getDomain } from "../../ApiServices/GetDomainSeivce";

function GetDomain() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const intialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email is required"),
  });
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await getDomain(values.email);
      setIsLoading(false);
      setTimeout(() => {
        navigate('/Main');
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="main-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Get Domain</title>
      </Helmet>
      <div className="getDomainContainer w-96 lg:w-450 md:w-450 sm:w-80 xs:w-450 s:w-80 bg-white rounded-md">
        <img src="/assets/svgs/vertex.svg" alt="logo" className="w-44 mb-5" />
        <Formik
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h1 className="font-bold text-xl mt-5">Get Your Domain</h1>
            <p className="text-secondary mt-3 text-15 mb-3">
              Enter your email to get your domain and start your business
            </p>
            <AuthInputField name="email" placeholder={"Enter Email"} />
            <div className="mt-3">
              <MainBtn
                text={
                  isLoading ? <ClipLoader size={22} color="#fff" /> : "Save"
                }
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default GetDomain;