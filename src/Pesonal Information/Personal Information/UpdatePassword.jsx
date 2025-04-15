import React, { useState, useEffect } from "react";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./UpdatePassword.scss";
import { ClipLoader } from "react-spinners";
import { handleUpdatePassword } from "../../ApiServices/UpdatePassword";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Password Input/PasswordInput";
import { FaCircleCheck } from "react-icons/fa6";

function UpdatePassword() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showModal || showSuccessModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal, showSuccessModal]);

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
        navigate("/Dashboard/MainInfo");
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
        className="flex items-center gap-2 border border-primary rounded-md p-3 text-primary mt-5"
        onClick={() => setShowModal(true)}
        aria-label="Update password"
      >
        <img
          src="/assets/images/password_svgrepo.com.png"
          alt="update-password"
          className="w-5 h-5"
        />
        Update Password
      </button>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="w-400">
          <h1 className="text-primary text-center font-semibold text-xl p-5">
            Update Password
          </h1>
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
                togglePasswordVisibility={() =>
                  setShowNewPassword(!showNewPassword)
                }
              />
              <PasswordInput
                name="password_confirmation"
                placeholder="Confirm New Password"
                showPassword={showConfirmPassword}
                togglePasswordVisibility={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              {error && (
                <div className="text-red-600 text-sm mt-3">{error}</div>
              )}
              <div className="mt-5 flex gap-3">
                <button
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white rounded-md font-bold"
                  type="submit"
                >
                  {isLoading ? (
                    <ClipLoader color="#fff" size={22} />
                  ) : (
                    <>
                      <FaCircleCheck />
                      Save
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="bg-gray-100 text-gray-400 p-3 rounded-md font-bold w-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </SuccessModal>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      >
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