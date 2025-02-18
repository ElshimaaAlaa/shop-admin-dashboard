import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import MainBtn from "../../Components/Main Button/MainBtn";
import Password from "../../Svgs/Password";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./CreateNewPassword.scss";
import { CreateNewPasswordService } from "../../ApiServices/CreateNewPasswordService";
function CreateNewPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    const email = localStorage.getItem("Email Admin");
    const token = localStorage.getItem("access token");
    try {
      await CreateNewPasswordService(
        values.password,
        values.password_confirmation,
        email,
        token
      );
      setShowSuccessModal(true);
      localStorage.removeItem("Email");
      setTimeout(() => navigate("/Login"), 2500);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 sm:p-8 md:p-16 bg-gradient-to-r from-customBlue-mediumBlue via-customOrange-mediumOrange to-customOrange-mediumOrange min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create New Password</title>
      </Helmet>
      <div className="CreateNewPasswordContainer lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-white">
        <div className="flex justify-center">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <h1 className="font-bold mt-10" style={{ fontSize: "22px" }}>
          Create New Password
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="mt-5 flex flex-col items-center">
              <div className="relative mt-5">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="passwordInput pl-10 w-80 lg:w-390 md:w-390 sm:w-390 s:w-390"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <Password />
                </span>
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div className="relative mt-5 mb-5">
                <Field
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="passwordInput pl-10 w-80 lg:w-390 md:w-390 sm:w-390 s:w-390"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <Password />
                </span>
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
                </span>
              </div>
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <MainBtn
                text={loading ? <ClipLoader color="#fff" size={22} /> : "Save"}
                btnType="submit"
              />
            </Form>
          )}
        </Formik>
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        >
          <div className="flex flex-col items-center justify-center rounded p-5">
            <img
              src="/assets/images/success.png"
              alt="success"
              className="w-32 mt-6"
            />
            <h2 className="font-bold text-2xl mt-2">Password Changed!</h2>
            <p className="w-80 text-secondary text-center mt-2">
              Your password has been changed successfully.
            </p>
          </div>
        </SuccessModal>
      </div>
    </div>
  );
}
export default CreateNewPassword;