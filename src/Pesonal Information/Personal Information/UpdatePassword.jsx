import React, { useState } from "react";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./UpdatePassword.scss";
import MainBtn from "../../Components/Main Button/MainBtn";
import { ClipLoader } from "react-spinners";
import { handleUpdatePassword } from "../../ApiServices/UpdatePassword";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Password Input/PasswordInput";

function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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
    setIsLoading(true);
    setError(null);
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
      setError("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="flex items-center gap-4 border border-primary rounded-md p-3 text-primary font-bold mt-10"
        onClick={() => setShowModal(true)}
        aria-label="Update password"
      >
        <img
          src="/assets/images/password_svgrepo.com.png"
          alt="update-password"
          className="w-6 h-6"
        />
        Update Password
      </button>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h1 className="text-primary font-semibold text-2xl p-5">Update Password</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="pe-5 ps-5 pb-5">
            <PasswordInput
              name="password"
              placeholder="New Password"
              showPassword={showNewPassword}
              togglePasswordVisibility={() => setShowNewPassword(!showNewPassword)}
            />
            <PasswordInput
              name="password_confirmation"
              placeholder="Confirm New Password"
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {error && (
              <div className="text-red-600 text-sm mt-3">{error}</div>
            )}
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