import React, { useState } from "react";
import { Formik, Form} from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import MainBtn from "../../Components/Main Button/MainBtn";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./CreateNewPassword.scss";
import { CreateNewPasswordService } from "../../ApiServices/CreateNewPasswordService";
import PasswordInput from "../../Components/Password Input/PasswordInput";
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
      setTimeout(() => navigate("/"), 2500);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 sm:p-8 md:p-16 main-container min-h-screen flex items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Create New Password</title>
      </Helmet>
      <div className="CreateNewPasswordContainer lg:w-450 md:w-450 sm:w-450 xs:w-450 s:w-450 bg-white">
        <div>
          <img src="/assets/svgs/vertex.svg" alt="logo" className="w-44"/>
        </div>
        <h1 className="font-bold mt-5 text-xl">
          Create New Password
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-center ">
              <PasswordInput
                name={"password"}
                placeholder={"Password"}
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              <PasswordInput
                name={"password_confirmation"}
                placeholder={"Confirm Password"}
                showPassword={showPassword}
                togglePasswordVisibility={() => setShowPassword(!showPassword)}
              />
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              <div className="mt-5">
                <MainBtn
                  text={
                    loading ? <ClipLoader color="#fff" size={22} /> : "Save"
                  }
                  btnType="submit"
                />
              </div>
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
            <h2 className="font-bold text-xl mt-4">Password Changed!</h2>
            <p className="w-80 text-secondary text-14 text-center mt-2">
              Your password has been changed successfully.
            </p>
          </div>
        </SuccessModal>
      </div>
    </div>
  );
}
export default CreateNewPassword;