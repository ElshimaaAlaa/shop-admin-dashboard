import React, { useState } from "react";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Form, Formik, Field } from "formik";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import Password from "../../Svgs/Password";
import * as Yup from "yup";
import "./UpdatePassword.scss";
import MainBtn from "../../Components/Main Button/MainBtn";
import { ClipLoader } from "react-spinners";
import { handleUpdatePassword } from "../../ApiServices/UpdatePassword";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const intialValues = {
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
    setIsLoading(true);
    try {
      await handleUpdatePassword(values.password, values.password_confirmation);
      setShowSuccessModal(true);
      setShowModal(false);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/Home/MainInfo");
      }, 2500);
    } catch (error) {
      console.error("Failed to update password", error);
      setShowModal(false);
      setShowSuccessModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-4 border border-primary rounded-md p-3 text-primary font-bold mt-10"
        onClick={() => setShowModal(true)}
      >
        <img
          src="/assets/images/password_svgrepo.com.png"
          alt="update-password"
          className="w-6 h-6"
        />
        Update Password
      </button>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-primary font-bold text-2xl p-5">Update Password</h1>
        <Formik
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="pe-5 ps-5 pb-5">
            <div className="relative mt-5">
              <Field
                name="password"
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="passwordInput pl-10 w-80 lg:w-400 md:w-390 sm:w-390 s:w-390"
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Password />
              </span>
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="relative mt-5">
              <Field
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="passwordInput pl-10 w-80 lg:w-400 md:w-390 sm:w-390 s:w-390"
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
            <div className="mt-5">
              <MainBtn
                text={
                  isLoading ? <ClipLoader color="#fff" size={22} /> : "Save"
                }
              />
            </div>
          </Form>
        </Formik>
      </SuccessModal>
      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center justify-center gap-3 w-350 p-5">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <h1 className="font-bold">Password Updated Successfully</h1>
        </div>
      </SuccessModal>
    </div>
  );
}
export default UpdatePassword;